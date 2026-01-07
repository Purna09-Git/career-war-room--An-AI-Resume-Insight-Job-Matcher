from google import genai
from google.genai import types
from models import ResumeData, JobRecommendation, CareerInsight
import json
import os
from dotenv import load_dotenv

load_dotenv()


class GeminiService:
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        self.client = genai.Client(api_key=api_key)
        self.model = 'gemini-2.5-flash'
    
    async def parse_resume(self, text: str) -> ResumeData:
        """Parse resume text and extract structured data"""
        prompt = f"""Parse the following resume text and extract key details into valid JSON format.
        Return ONLY valid JSON, no markdown formatting or additional text.
        
        Required JSON structure:
        {{
            "name": "string",
            "email": "string",
            "summary": "string",
            "skills": ["string"],
            "experience": [
                {{
                    "title": "string",
                    "company": "string",
                    "duration": "string",
                    "highlights": ["string"]
                }}
            ],
            "education": [
                {{
                    "degree": "string",
                    "institution": "string",
                    "year": "string"
                }}
            ]
        }}
        
        Resume Text:
        {text}
        """
        
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )
        result_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if result_text.startswith('```'):
            result_text = result_text.split('\n', 1)[1]
            result_text = result_text.rsplit('```', 1)[0]
        
        result_text = result_text.strip()
        parsed_data = json.loads(result_text)
        return ResumeData(**parsed_data)
    
    async def get_job_recommendations(self, profile: ResumeData) -> list[JobRecommendation]:
        """Generate job recommendations based on resume"""
        prompt = f"""Based on the following candidate profile, generate 5 realistic job recommendations.
        Return ONLY valid JSON array, no markdown formatting or additional text.
        
        Profile:
        Summary: {profile.summary}
        Skills: {', '.join(profile.skills)}
        Experience: {json.dumps([exp.dict() for exp in profile.experience])}
        
        Required JSON structure (array of 5 jobs):
        [
            {{
                "id": "unique-string",
                "title": "string",
                "company": "string",
                "location": "string",
                "matchScore": 85,
                "reason": "string explaining why this is a good match",
                "skillsFound": ["skill1", "skill2"],
                "skillsMissing": ["skill1", "skill2"],
                "salaryEstimate": "$120k - $150k"
            }}
        ]
        """
        
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )
        result_text = response.text.strip()
        
        if result_text.startswith('```'):
            result_text = result_text.split('\n', 1)[1]
            result_text = result_text.rsplit('```', 1)[0]
        
        result_text = result_text.strip()
        jobs_data = json.loads(result_text)
        return [JobRecommendation(**job) for job in jobs_data]
    
    async def get_career_insights(self, profile: ResumeData) -> CareerInsight:
        """Generate career insights and gap analysis"""
        prompt = f"""Analyze the candidate's profile and provide strategic career insights.
        Return ONLY valid JSON, no markdown formatting or additional text.
        
        Profile:
        Skills: {', '.join(profile.skills)}
        Experience: {json.dumps([exp.dict() for exp in profile.experience])}
        
        Required JSON structure:
        {{
            "score": 85,
            "marketDemand": "High",
            "topRecommendations": [
                "Recommendation 1",
                "Recommendation 2",
                "Recommendation 3"
            ],
            "gapAnalysis": [
                "Missing skill 1",
                "Missing skill 2"
            ]
        }}
        
        Note: marketDemand must be one of: "Low", "Medium", "High", "Very High"
        """
        
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )
        result_text = response.text.strip()
        
        if result_text.startswith('```'):
            result_text = result_text.split('\n', 1)[1]
            result_text = result_text.rsplit('```', 1)[0]
        
        result_text = result_text.strip()
        insights_data = json.loads(result_text)
        return CareerInsight(**insights_data)
