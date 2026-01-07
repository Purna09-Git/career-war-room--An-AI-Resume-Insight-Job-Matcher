# 🚀 Local Setup Guide - AI Resume Insight & Job Matcher

## 📥 Step 1: Download the Project

### Option A: Download ZIP from Emergent
1. In Emergent interface, navigate to Files
2. Download `/app/ai-resume-complete.zip` OR `/app/standalone_project/` folder
3. Extract to your desired location

### Option B: Manual File Download
Download these folders from `/app/standalone_project/`:
- `frontend/` folder
- `backend/` folder
- `README.md`
- `start.sh` (Mac/Linux) or `start.bat` (Windows)

---

## 💻 Step 2: Open in VS Code

```bash
# Navigate to your project folder
cd path/to/standalone_project

# Open in VS Code
code .
```

---

## 🔧 Step 3: Install Prerequisites

### Install Required Software:

**1. Python 3.11+**
```bash
# Check if Python is installed
python --version
# or
python3 --version

# If not installed, download from: https://www.python.org/downloads/
```

**2. MongoDB**
```bash
# Option A: Using Docker (Recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option B: Install MongoDB Community Edition
# Visit: https://www.mongodb.com/docs/manual/installation/
```

**3. Node.js (Optional - for frontend dev server)**
```bash
# Check if installed
node --version

# Download from: https://nodejs.org/
```

---

## ⚙️ Step 4: Configure Environment Variables

**Edit `backend/.env` file:**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ai_resume_app
GEMINI_API_KEY=AIzaSyAD5Sc2AILJkzyxOEGQ6iNqPFzq-_lkL3M
```

✅ Your Gemini API key is already in the file!

---

## 🏃 Step 5: Install Dependencies

### Backend Dependencies:
```bash
cd backend
pip install -r requirements.txt
# or
pip3 install -r requirements.txt
```

### Dependencies that will be installed:
- fastapi==0.110.1
- uvicorn==0.25.0
- motor==3.3.1 (MongoDB async driver)
- pydantic>=2.6.4
- PyPDF2==3.0.1
- python-docx==1.2.0
- google-genai>=1.56.0
- And more...

---

## 🚀 Step 6: Run the Application

### Option A: Automatic Startup (Easy!)

**Mac/Linux:**
```bash
# Make script executable
chmod +x start.sh

# Run the startup script
./start.sh
```

**Windows:**
```cmd
start.bat
```

The script will:
- Start MongoDB (if Docker is available)
- Start Backend on port 8001
- Start Frontend on port 3000

---

### Option B: Manual Startup

**Terminal 1 - Start Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
python -m http.server 3000
# or
python3 -m http.server 3000
```

---

## 🌐 Step 7: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

---

## 📁 Project Structure in VS Code

```
standalone_project/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All styles (NO BLUR!)
│   └── js/
│       └── app.js          # Application logic
├── backend/
│   ├── server.py           # FastAPI server
│   ├── models.py           # Data models
│   ├── gemini_service.py   # AI integration
│   ├── file_parser.py      # File parsing
│   ├── requirements.txt    # Dependencies
│   └── .env                # Your config (has API key)
├── README.md               # Documentation
├── start.sh                # Mac/Linux startup
└── start.bat               # Windows startup
```

---

## ✅ Testing the Application

1. **Test Backend API:**
```bash
# In a new terminal
curl http://localhost:8001/api/

# Expected response:
# {"message":"AI Resume Insight & Job Matcher API"}
```

2. **Test File Upload:**
- Go to http://localhost:3000
- Click "BROWSE LOCAL COMMAND" or drag & drop a resume file
- Wait 20-30 seconds for AI analysis
- View results dashboard with job recommendations

3. **Test Authentication UI:**
- Click "SIGN IN" button
- Modal should open with login form
- Click "ENTER THE ROOM" button
- Modal should switch to signup mode

---

## 🔍 VS Code Recommended Extensions

Install these extensions for better development:
- **Python** (Microsoft)
- **Prettier** (Code formatter)
- **ESLint** (JavaScript linting)
- **Live Server** (Alternative to python http.server)

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if port 8001 is already in use
lsof -i :8001  # Mac/Linux
netstat -ano | findstr :8001  # Windows

# Kill the process if needed
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### Frontend won't load?
```bash
# Check if port 3000 is in use
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

### MongoDB connection error?
```bash
# Make sure MongoDB is running
docker ps  # Check if Docker container is running

# Or check MongoDB service
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # Mac
```

### Module not found error?
```bash
# Reinstall Python dependencies
cd backend
pip install --upgrade -r requirements.txt
```

---

## 📝 Development Workflow

### Making Changes:

**Frontend Changes:**
1. Edit files in `frontend/` folder
2. Refresh browser (http://localhost:3000)
3. Changes appear immediately

**Backend Changes:**
1. Edit files in `backend/` folder
2. Server auto-reloads (--reload flag)
3. Test API at http://localhost:8001/docs

**CSS Changes:**
- Edit `frontend/css/styles.css`
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🚢 Pushing to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Resume Insight & Job Matcher"

# Create repository on GitHub
# Then add remote and push
git remote add origin https://github.com/yourusername/ai-resume-matcher.git
git branch -M main
git push -u origin main
```

---

## 📊 Features Ready to Use

✅ **Resume Upload** - PDF, DOCX, TXT
✅ **AI Parsing** - Google Gemini 2.5 Flash
✅ **Job Recommendations** - 5 personalized matches
✅ **Career Insights** - Score, market demand, gaps
✅ **Authentication UI** - Login/Signup modals
✅ **Military Theme** - Career War Room design
✅ **NO BLUR** - Crystal clear interface

---

## 💡 Tips for VS Code

1. **Open Integrated Terminal:**
   - Press `` Ctrl+` `` (backtick)
   - Or: View → Terminal

2. **Split Terminal:**
   - Click split icon in terminal
   - Run backend in one, frontend in another

3. **Quick File Navigation:**
   - Press `Ctrl+P` (Cmd+P on Mac)
   - Type filename to quickly open

4. **Multi-cursor Editing:**
   - Hold `Alt` and click (Windows/Linux)
   - Hold `Option` and click (Mac)

---

## 🎯 What to Show in Resume

**Project Highlights:**
- Full-stack web application with AI integration
- RESTful API with FastAPI
- Google Gemini AI for NLP
- Document parsing (PDF, DOCX)
- Async operations with Motor (MongoDB)
- Modern vanilla JavaScript (no framework)
- Responsive UI design

**Tech Stack:**
- Frontend: HTML5, CSS3, JavaScript
- Backend: Python 3.11+, FastAPI
- AI: Google Generative AI (Gemini 2.5 Flash)
- Database: MongoDB
- File Processing: PyPDF2, python-docx

---

## 📞 Need Help?

If you encounter issues:
1. Check `README.md` for detailed documentation
2. Check `PROJECT_STRUCTURE.md` for architecture
3. Review `BLUR_FIX_COMPLETE.md` for UI fixes
4. Verify `.env` file has correct API key
5. Ensure MongoDB is running

---

## ✨ You're All Set!

Your AI Resume Insight & Job Matcher is ready to:
- Analyze resumes with AI
- Generate job recommendations
- Show career insights
- Impress recruiters on GitHub!

**Happy coding! 🚀**
