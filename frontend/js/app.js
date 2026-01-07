// Configuration
const BACKEND_URL = "http://127.0.0.1:8000";
const API_URL = `${BACKEND_URL}/api`;

// State
let currentAuthMode = 'login';
let analysisData = null;
let currentUser = null; // Add this line

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeFileUpload();
    initializeAuthForm();
});

// File Upload Handlers
function initializeFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const fileUploadZone = document.getElementById('fileUploadZone');

    // Button click
    uploadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // Zone click
    fileUploadZone.addEventListener('click', () => {
        fileInput.click();
    });

    // File selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and drop
    fileUploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadZone.classList.add('dragging');
    });

    fileUploadZone.addEventListener('dragleave', () => {
        fileUploadZone.classList.remove('dragging');
    });

    fileUploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadZone.classList.remove('dragging');
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
}

// Handle File Upload
async function handleFileUpload(file) {
    // Validate file type
    const validTypes = ['.pdf', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
        showError('Unsupported file type. Please upload PDF, DOCX, or TXT file.');
        return;
    }

    // Show loading
    showLoading();

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/analyze-resume`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to analyze resume');
        }

        const data = await response.json();
        analysisData = data;
        showDashboard(data);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Strategic analysis failed. Intelligence link may be offline.');
        hideLoading();
    }
}

// Show/Hide Loading
function showLoading() {
    document.getElementById('fileUploadZone').style.display = 'none';
    document.getElementById('loadingState').style.display = 'flex';
    document.getElementById('errorMessage').style.display = 'none';
}

function hideLoading() {
    document.getElementById('fileUploadZone').style.display = 'flex';
    document.getElementById('loadingState').style.display = 'none';
}

// Show Error
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.style.display = 'flex';
}

// Show Dashboard
function showDashboard(data) {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'block';
    renderDashboard(data);
}

// Render Dashboard
function renderDashboard(data) {
    const { resume, jobs, insights } = data;

    const html = `
        <div class="dashboard-container">
            <!-- Dashboard Header -->
            <div class="dashboard-header">
                <div class="dashboard-header-left">
                    <div class="dashboard-badges">
                        <span class="badge-confidential">Confidential</span>
                        <span class="badge-deployment">Deployment: Active</span>
                    </div>
                    <h1 class="dashboard-main-title">Strategic Profile: ${resume.name}</h1>
                    <p class="dashboard-subtitle">Intelligence analysis completed via <span class="text-blue">NEXT STEP v2.5</span></p>
                </div>
                <button class="dashboard-reset-btn" onclick="resetDashboard()">
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                    New Tactical Upload
                </button>
            </div>

            <!-- KPI Grid -->
            <div class="kpi-grid">
                <div class="kpi-card kpi-border-slate">
                    <p class="kpi-label">Combat Readiness</p>
                    <p class="kpi-value">${insights.score}<span class="kpi-unit">%</span></p>
                    <div class="kpi-progress-bar">
                        <div class="kpi-progress-fill" style="width: ${insights.score}%"></div>
                    </div>
                </div>
                <div class="kpi-card kpi-border-blue">
                    <p class="kpi-label">Market Position</p>
                    <p class="kpi-value-text kpi-value-blue">${insights.marketDemand}</p>
                    <p class="kpi-status">Field Intel Status</p>
                </div>
                <div class="kpi-card kpi-border-indigo">
                    <p class="kpi-label">Weaponry (Skills)</p>
                    <p class="kpi-value-text kpi-value-indigo">${resume.skills.length}</p>
                    <p class="kpi-status">Active Proficiencies</p>
                </div>
                <div class="kpi-card kpi-border-emerald">
                    <p class="kpi-label">Match Potential</p>
                    <p class="kpi-value-text kpi-value-emerald">${jobs.length}</p>
                    <p class="kpi-status">High Probability Targets</p>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="dashboard-grid">
                <!-- Left Column -->
                <div class="dashboard-left">
                    <!-- Experience Section -->
                    <section class="dashboard-card">
                        <h2 class="dashboard-section-title">
                            <i class="fa-solid fa-timeline text-blue"></i>
                            Operational History
                        </h2>
                        <div class="experience-list">
                            ${resume.experience.map((exp, i) => `
                                <div class="experience-item">
                                    <div class="experience-timeline">
                                        <div class="experience-badge ${i === resume.experience.length - 1 ? 'experience-badge-current' : ''}">${i + 1}</div>
                                        ${i < resume.experience.length - 1 ? '<div class="experience-line"></div>' : ''}
                                    </div>
                                    <div class="experience-content">
                                        <h3 class="experience-title">${exp.title}</h3>
                                        <p class="experience-company">${exp.company} \u2022 ${exp.duration}</p>
                                        <div class="experience-highlights">
                                            ${exp.highlights.slice(0, 4).map(h => `
                                                <div class="experience-highlight">
                                                    <i class="fa-solid fa-check"></i>
                                                    ${h}
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>

                <!-- Right Column -->
                <div class="dashboard-right">
                    <!-- Campaign Roadmap -->
                    <section class="campaign-card">
                        <h2 class="campaign-title">
                            <i class="fa-solid fa-map-location-dot"></i>
                            Campaign Roadmap
                        </h2>
                        <div class="campaign-recommendations">
                            ${insights.topRecommendations.map((rec, i) => `
                                <div class="campaign-item">
                                    <div class="campaign-number">${i + 1}</div>
                                    <p class="campaign-text">${rec}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="campaign-gaps">
                            <h3 class="campaign-gaps-title">Vulnerabilities (Gaps)</h3>
                            <div class="campaign-gaps-list">
                                ${insights.gapAnalysis.map(gap => `
                                    <span class="campaign-gap-tag">${gap}</span>
                                `).join('')}
                            </div>
                        </div>
                    </section>

                    <!-- Skills Section -->
                    <section class="dashboard-card">
                        <h2 class="dashboard-section-title">
                            <i class="fa-solid fa-screwdriver-wrench text-blue"></i>
                            Tool Inventory
                        </h2>
                        <div class="skills-list">
                            ${resume.skills.map(skill => `
                                <span class="skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </section>
                </div>
            </div>

            <!-- Job Recommendations -->
            <section class="jobs-section">
                <div class="jobs-header">
                    <h2 class="jobs-title">Identified Targets</h2>
                    <div class="jobs-status">
                        <i class="fa-solid fa-satellite"></i>
                        Live Match Engine
                    </div>
                </div>
                <div class="jobs-grid">
                    ${jobs.map(job => `
                        <div class="job-card">
                            <div class="job-card-header">
                                <div class="job-icon">
                                    <i class="fa-solid fa-building-shield"></i>
                                </div>
                                <div class="job-match">
                                    <span class="job-match-score">${job.matchScore}<span class="job-match-unit">%</span></span>
                                    <p class="job-match-label">Confidence</p>
                                </div>
                            </div>
                            
                            <h3 class="job-title">${job.title}</h3>
                            <p class="job-company">${job.company} \u2022 ${job.location}</p>
                            
                            <div class="job-content">
                                <div class="job-reason">
                                    <p class="job-reason-text">"${job.reason}"</p>
                                </div>
                                <div class="job-skills">
                                    ${job.skillsFound.slice(0, 3).map(s => `
                                        <span class="job-skill-tag">\u2713 ${s}</span>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="job-footer">
                                <span class="job-salary">${job.salaryEstimate || '$120k - $150k'}</span>
                                <button class="job-engage-btn">Engage</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;

    document.getElementById('dashboardPage').innerHTML = html;
}

// Reset Dashboard
function resetDashboard() {
    analysisData = null;
    document.getElementById('landingPage').style.display = 'block';
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('fileUploadZone').style.display = 'flex';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('fileInput').value = '';
}

// Auth Modal Handlers
function openAuthModal(mode) {
    currentAuthMode = mode;
    const modal = document.getElementById('authModal');
    const cardTitle = document.getElementById('authCardTitle');
    const nameField = document.getElementById('nameField');
    const submitText = document.getElementById('submitText');
    const toggleBtn = document.getElementById('authToggle');

    if (mode === 'login') {
        cardTitle.textContent = 'Commander Login';
        nameField.style.display = 'none';
        submitText.textContent = 'Initialize Session';
        toggleBtn.textContent = 'No Credentials? Create Command';
    } else {
        cardTitle.textContent = 'New Deployment';
        nameField.style.display = 'block';
        submitText.textContent = 'Deploy Assets';
        toggleBtn.textContent = 'Existing Commander? Authenticate';
    }

    modal.style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function toggleAuthMode() {
    currentAuthMode = currentAuthMode === 'login' ? 'signup' : 'login';
    openAuthModal(currentAuthMode);
}
function initializeAuthForm() {
    const authForm = document.getElementById('authForm');
    
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Collect Data
        const email = authForm.querySelector('input[type="email"]').value;
        const password = authForm.querySelector('input[type="password"]').value;
        const nameInput = document.getElementById('nameField').querySelector('input');
        const name = nameInput ? nameInput.value : '';

        // 2. Determine URL (Login vs Signup)
        const endpoint = currentAuthMode === 'signup' ? '/signup' : '/login';
        const url = `${API_URL}${endpoint}`;

        // 3. Prepare Payload
        const payload = currentAuthMode === 'signup' 
            ? { name, email, password }
            : { email, password };

        // 4. Send Request
        try {
            const button = authForm.querySelector('button[type="submit"]');
            button.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            button.disabled = true;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            // 5. Success! - CALL THE NEW UI FUNCTION HERE
            closeAuthModal();
            updateUIForLogin(data);
            alert(`System Online. Welcome, ${data.name}.`);

        } catch (error) {
            alert(error.message);
        } finally {
            // Reset Button
            const button = authForm.querySelector('button[type="submit"]');
            button.innerHTML = '<span id="submitText">Initialize Session</span> <i class="fa-solid fa-chevron-right"></i>';
            button.disabled = false;
        }
    });
}

// --- New Auth UI Functions ---

function updateUIForLogin(user) {
    currentUser = user;
    
    // 1. Update Top Right Buttons (Show Name + Disconnect)
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-badge" style="display: inline-flex; align-items: center; gap: 10px; margin-right: 15px;">
                <i class="fa-solid fa-user-astronaut" style="color: var(--accent);"></i> 
                <span style="font-weight: 600;">${user.name}</span>
            </div>
            <button onclick="logout()" class="btn-secondary" style="border: 1px solid var(--glass-border); padding: 8px 16px;">
                <i class="fa-solid fa-power-off"></i> Disconnect
            </button>
        `;
    }

    // 2. Unlock the Upload Section
    const uploadSection = document.getElementById('upload-section');
    const lockedMessage = document.getElementById('locked-message');
    
    if (uploadSection) uploadSection.style.display = 'block';
    if (lockedMessage) lockedMessage.style.display = 'none';

    // 3. Update Hero Title (Optional Polish)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.innerHTML = `Welcome back, <span class="text-gradient">Commander ${user.name}</span>`;
    }
}

function logout() {
    currentUser = null;
    
    // 1. Reset Top Right Buttons
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <button class="btn-secondary" onclick="openAuthModal('login')">Sign In</button>
            <button class="btn-primary" onclick="openAuthModal('signup')">Enter the Room</button>
        `;
    }

    // 2. Lock the Upload Section
    const uploadSection = document.getElementById('upload-section');
    const lockedMessage = document.getElementById('locked-message');
    
    if (uploadSection) uploadSection.style.display = 'none';
    if (lockedMessage) lockedMessage.style.display = 'block';

    // 3. Reset Hero Title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.innerHTML = `Master Your <span class="text-gradient">Career Battlefield.</span>`;
    }

    alert("System Disconnected. Session Ended.");
}