from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import List
import uuid
from datetime import datetime

# Security Imports
from passlib.context import CryptContext

# Import your models
# Ensure models.py has UserCreate and UserLogin classes defined!
from models import (
    ResumeData, 
    JobRecommendation, 
    CareerInsight, 
    AnalysisResult,
    UserCreate, 
    UserLogin
)
from gemini_service import GeminiService
from file_parser import FileParser

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize Gemini Service
gemini_service = GeminiService()
file_parser = FileParser()

# Create the main app
app = FastAPI()

# --- Security Configuration ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# --- Existing Routes ---

@api_router.get("/")
async def root():
    return {"message": "AI Resume Insight & Job Matcher API"}

@api_router.post("/analyze-resume", response_model=AnalysisResult)
async def analyze_resume(file: UploadFile = File(...)):
    """Upload and analyze resume file"""
    try:
        # Read file content
        file_content = await file.read()
        
        # Parse file based on type
        filename = file.filename.lower()
        if filename.endswith('.pdf'):
            text = file_parser.parse_pdf(file_content)
        elif filename.endswith('.docx'):
            text = file_parser.parse_docx(file_content)
        elif filename.endswith('.txt'):
            text = file_parser.parse_txt(file_content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF, DOCX, or TXT file.")
        
        # Analyze with Gemini
        resume_data = await gemini_service.parse_resume(text)
        jobs = await gemini_service.get_job_recommendations(resume_data)
        insights = await gemini_service.get_career_insights(resume_data)
        
        # Store in database
        analysis = {
            "id": str(uuid.uuid4()),
            "resume": resume_data.dict(),
            "jobs": [job.dict() for job in jobs],
            "insights": insights.dict(),
            "timestamp": datetime.utcnow()
        }
        await db.analyses.insert_one(analysis)
        
        return AnalysisResult(
            resume=resume_data,
            jobs=jobs,
            insights=insights
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.error(f"Error analyzing resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze resume. Please try again.")

@api_router.get("/analyses", response_model=List[dict])
async def get_analyses():
    """Get all analyses"""
    analyses = await db.analyses.find().sort("timestamp", -1).limit(10).to_list(10)
    for analysis in analyses:
        analysis['_id'] = str(analysis['_id'])
    return analyses

# --- New Authentication Routes ---

@api_router.post("/signup")
async def signup(user: UserCreate):
    # 1. Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Hash the password
    hashed_password = get_password_hash(user.password)

    # 3. Save to MongoDB
    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    result = await db.users.insert_one(user_dict)
    
    return {
        "message": "User created successfully", 
        "userId": str(result.inserted_id), 
        "name": user.name
    }

@api_router.post("/login")
async def login(user: UserLogin):
    # 1. Find user by email
    db_user = await db.users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 2. Check password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {
        "message": "Login successful", 
        "name": db_user["name"], 
        "email": db_user["email"]
    }

# --- App Configuration ---

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()