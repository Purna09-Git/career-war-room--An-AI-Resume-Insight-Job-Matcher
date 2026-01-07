# AI Resume Insight & Job Matcher

> **Career War Room** - An AI-powered resume analysis and job matching platform built with Python backend and vanilla JavaScript frontend.

![Tech Stack](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## 🎯 Features

- **Neural Resume Parsing**: AI-powered extraction of skills, experience, and education from resume documents
- **Job Matching Engine**: Intelligent job recommendations with match scores based on your profile
- **Career Insights**: Market demand analysis and skill gap identification
- **Multi-Format Support**: Upload resumes in PDF, DOCX, or TXT format
- **Military-Tactical Theme**: Unique "War Room" inspired UI/UX design

## 📁 Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with glass morphism effects
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript for all functionality

### Backend
- **Python 3.11+**
- **FastAPI**: Modern, fast web framework
- **Motor**: Async MongoDB driver
- **Google Gemini AI (gemini-2.5-flash)**: Resume parsing and analysis
- **PyPDF2**: PDF text extraction
- **python-docx**: DOCX file parsing

### Database
- **MongoDB**: Document storage for analysis results

## 🚀 Getting Started

### Prerequisites

- Python 3.11 or higher
- MongoDB running locally or remote connection
- Google Gemini API key
- Node.js (for frontend development server, optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-resume-insight-job-matcher
   ```

2. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=ai_resume_app
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the backend server**
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```

   The API will be available at `http://localhost:8001`

### Frontend Setup

1. **Open the frontend**
   
   Simply open `index.html` in your browser, or use a local server:
   
   ```bash
   # Using Python's built-in server
   cd frontend
   python -m http.server 3000
   ```

   Or use any other local server:
   ```bash
   # Using npx (no installation needed)
   npx serve .
   ```

2. **Access the application**
   
   Navigate to `http://localhost:3000` in your web browser

## 📝 API Endpoints

### `GET /api/`
Health check endpoint

**Response:**
```json
{
  "message": "AI Resume Insight & Job Matcher API"
}
```

### `POST /api/analyze-resume`
Upload and analyze a resume file

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (PDF, DOCX, or TXT)

**Response:**
```json
{
  "resume": {
    "name": "John Doe",
    "email": "john@example.com",
    "summary": "...",
    "skills": [...],
    "experience": [...],
    "education": [...]
  },
  "jobs": [
    {
      "id": "...",
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "matchScore": 92,
      "reason": "...",
      "skillsFound": [...],
      "skillsMissing": [...],
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

### `GET /api/analyses`
Retrieve past analyses

**Response:**
```json
[
  {
    "id": "...",
    "resume": {...},
    "jobs": [...],
    "insights": {...},
    "timestamp": "2025-01-15T10:30:00Z"
  }
]
```

## 🎨 Project Structure

```
ai-resume-insight-job-matcher/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All styles
│   └── js/
│       └── app.js          # Application logic
├── backend/
│   ├── server.py           # FastAPI application
│   ├── models.py           # Pydantic models
│   ├── gemini_service.py   # AI service
│   ├── file_parser.py      # File parsing utilities
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables (create this)
└── README.md
```

## 🔧 Configuration

### MongoDB Setup

If you don't have MongoDB installed:

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB Community Edition
# Visit: https://www.mongodb.com/docs/manual/installation/
```

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `.env` file

## 💡 Usage

1. **Upload Your Resume**: Click on the upload zone or drag and drop your resume file
2. **Wait for Analysis**: The AI will parse your resume and generate insights (usually takes 5-10 seconds)
3. **View Results**: See your parsed resume, job recommendations with match scores, and career insights
4. **Review Recommendations**: Check suggested actions and skill gaps to improve your profile

## 🎯 Features Breakdown

### Resume Parsing
- Extracts name, email, summary
- Identifies all technical and soft skills
- Parses work experience with highlights
- Captures education details

### Job Recommendations
- 5 personalized job matches
- Match score (0-100%)
- Required skills analysis
- Missing skills identification
- Salary estimates

### Career Insights
- Overall profile strength score
- Market demand assessment
- Top 3 recommended actions
- Skill gap analysis

## 🛡️ Security Notes

- API keys should never be committed to version control
- Use environment variables for sensitive data
- The `.env` file is gitignored by default
- Resume data is stored in your MongoDB instance

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Python, FastAPI, and Google Gemini AI**