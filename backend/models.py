from pydantic import BaseModel, Field
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


class Experience(BaseModel):
    title: str
    company: str
    duration: str
    highlights: List[str]


class Education(BaseModel):
    degree: str
    institution: str
    year: str


class ResumeData(BaseModel):
    name: str
    email: str
    summary: str
    skills: List[str]
    experience: List[Experience]
    education: List[Education]


class JobRecommendation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    matchScore: int
    reason: str
    skillsFound: List[str]
    skillsMissing: List[str]
    salaryEstimate: Optional[str] = None


class CareerInsight(BaseModel):
    score: int
    marketDemand: str
    topRecommendations: List[str]
    gapAnalysis: List[str]


class AnalysisResult(BaseModel):
    resume: ResumeData
    jobs: List[JobRecommendation]
    insights: CareerInsight
# --- Add this to backend/models.py ---

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str