# AI Resume Insight & Job Matcher - Complete Project Structure

This document shows the complete file structure of your AI Resume Analysis application that you can push to GitHub.

## 📁 Project Structure

```
ai-resume-insight-job-matcher/
│
├── README.md                    # Main documentation
├── .gitignore                   # Git ignore file
│
├── frontend/                    # Frontend application (Vanilla HTML/CSS/JS)
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   └── styles.css          # All application styles
│   └── js/
│       └── app.js              # Application logic and API calls
│
└── backend/                     # Backend API (Python FastAPI)
    ├── server.py               # FastAPI application with routes
    ├── models.py               # Pydantic data models
    ├── gemini_service.py       # Google Gemini AI service
    ├── file_parser.py          # PDF/DOCX/TXT parsing utilities
    ├── requirements.txt        # Python dependencies
    ├── .env                    # Environment variables (DO NOT COMMIT)
    └── .env.example            # Example environment file
```

## 📝 Tech Stack Summary

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla - No frameworks)
- Font Awesome for icons
- Glass morphism design effects
- Responsive layout

**Backend:**
- Python 3.11+
- FastAPI (REST API)
- Motor (Async MongoDB driver)
- Google Gemini AI (gemini-2.5-flash)
- PyPDF2, python-docx (File parsing)

**Database:**
- MongoDB

**AI:**
- Google Generative AI (Gemini 2.5 Flash)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ai-resume-insight-job-matcher
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt

# Create .env file with:
MONGO_URL=mongodb://localhost:27017
DB_NAME=ai_resume_app
GEMINI_API_KEY=your_api_key_here

# Run server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Setup Frontend
```bash
cd frontend
# Open index.html in browser or use a local server
python -m http.server 3000
```

## 🎯 Key Features

1. **AI Resume Parsing**
   - Extract name, email, summary
   - Parse skills automatically
   - Identify work experience and highlights
   - Capture education details

2. **Smart Job Matching**
   - 5 personalized job recommendations
   - Match scores (0-100%)
   - Skills found vs missing analysis
   - Salary estimates

3. **Career Insights**
   - Profile strength score
   - Market demand assessment
   - Top recommendations for improvement
   - Skill gap analysis

4. **File Support**
   - PDF documents
   - Microsoft Word (DOCX)
   - Plain text (TXT)

## 📄 Important Files

### Backend Files

**server.py** - Main API application
- Health check endpoint (`GET /api/`)
- Resume upload and analysis (`POST /api/analyze-resume`)
- Get past analyses (`GET /api/analyses`)

**gemini_service.py** - AI Integration
- Resume parsing with Gemini AI
- Job recommendation generation
- Career insights analysis

**file_parser.py** - File Processing
- PDF text extraction (PyPDF2)
- DOCX parsing (python-docx)
- TXT file reading

**models.py** - Data Models
- ResumeData
- JobRecommendation
- CareerInsight
- Experience, Education

### Frontend Files

**index.html** - Main Interface
- Navigation with branding
- File upload zone with drag-and-drop
- Results dashboard
- Authentication modal (UI only)

**css/styles.css** - Complete Styling
- Military/tactical theme
- Glass morphism effects
- Responsive design
- Animations and transitions

**js/app.js** - Application Logic
- File upload handling
- API communication
- Dynamic dashboard rendering
- Modal interactions

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=ai_resume_app

# Google Gemini API Key
GEMINI_API_KEY=your_api_key_here
```

**Getting Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and paste into `.env`

## 🧪 Testing

The backend has been thoroughly tested:
- ✅ Health check endpoint
- ✅ Resume upload and parsing
- ✅ Job recommendations generation
- ✅ Career insights analysis
- ✅ Database storage and retrieval
- ✅ File parsing (PDF, DOCX, TXT)

All tests passing with response times under 30 seconds.

## 🎨 Design Theme

**"Career War Room"** - Military/Tactical Inspired
- Dark slate colors (#0f172a, #1e293b)
- Blue accents (#2563eb, #3b82f6)
- Glass morphism effects
- Uppercase typography
- Bold, tactical language

## 📊 API Response Example

```json
{
  "resume": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "summary": "Experienced Software Engineer...",
    "skills": ["Python", "JavaScript", "React"],
    "experience": [...],
    "education": [...]
  },
  "jobs": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "matchScore": 92,
      "salaryEstimate": "$150k - $180k"
    }
  ],
  "insights": {
    "score": 85,
    "marketDemand": "High",
    "topRecommendations": [...],
    "gapAnalysis": [...]
  }
}
```

## 🛡️ Security Notes

- Never commit `.env` file
- API keys in environment variables only
- Use `.gitignore` for sensitive files
- MongoDB connection secured
- CORS configured for development

## 📦 Dependencies

### Python (requirements.txt)
```
fastapi==0.110.1
uvicorn==0.25.0
motor==3.3.1
pydantic>=2.6.4
python-dotenv>=1.0.1
PyPDF2==3.0.1
python-docx==1.2.0
google-genai>=1.56.0
pytesseract==0.3.13
pillow==12.0.0
```

### Frontend
- No npm packages required
- Pure vanilla JavaScript
- CDN: Font Awesome 6.4.0

## 🎓 For Your Resume

This project demonstrates:
- ✅ Full-stack development (Python + JavaScript)
- ✅ AI integration (Google Gemini)
- ✅ RESTful API design (FastAPI)
- ✅ Document processing (PDF/DOCX parsing)
- ✅ Database operations (MongoDB)
- ✅ Modern UI/UX design
- ✅ Async programming (Python async/await)
- ✅ File upload handling
- ✅ Responsive web design

## 📞 Support

For issues or questions:
1. Check the README
2. Review `.env.example` for configuration
3. Ensure MongoDB is running
4. Verify Gemini API key is valid

## 📄 License

MIT License - Free to use for personal or commercial projects

---

**Built with ❤️ using Python, FastAPI, and Google Gemini AI**

*Note: The complete source code is ready to push to GitHub. Make sure to add your Gemini API key to `.env` before running.*
