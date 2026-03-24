// Sample data for categories and quizzes
const categories = [
    { id: 1, name: 'Mathematics', icon: 'fa-calculator', quizCount: 24, color: '#6366f1', description: 'Algebra, Calculus, Geometry' },
    { id: 2, name: 'Science', icon: 'fa-flask', quizCount: 32, color: '#8b5cf6', description: 'Physics, Chemistry, Biology' },
    { id: 3, name: 'History', icon: 'fa-landmark', quizCount: 18, color: '#ec4899', description: 'World History, Ancient Civilizations' },
    { id: 4, name: 'Geography', icon: 'fa-globe', quizCount: 21, color: '#10b981', description: 'Countries, Capitals, Landmarks' },
    { id: 5, name: 'Literature', icon: 'fa-book', quizCount: 15, color: '#f59e0b', description: 'Classic and Modern Literature' },
    { id: 6, name: 'Technology', icon: 'fa-laptop-code', quizCount: 28, color: '#ef4444', description: 'Programming, AI, Web Development' }
];

const quizzes = [
    { 
        id: 1, 
        title: 'Basic Algebra', 
        category: 'Mathematics', 
        questions: 20, 
        time: '15 mins', 
        difficulty: 'Easy', 
        icon: 'fa-calculator',
        taken: 1234,
        rating: 4.5,
        description: 'Test your knowledge of basic algebraic concepts'
    },
    { 
        id: 2, 
        title: 'Physics Fundamentals', 
        category: 'Science', 
        questions: 25, 
        time: '20 mins', 
        difficulty: 'Medium', 
        icon: 'fa-flask',
        taken: 2567,
        rating: 4.7,
        description: 'Explore the basics of physics and mechanics'
    },
    { 
        id: 3, 
        title: 'World History', 
        category: 'History', 
        questions: 30, 
        time: '25 mins', 
        difficulty: 'Hard', 
        icon: 'fa-landmark',
        taken: 3789,
        rating: 4.8,
        description: 'Challenge yourself with world history questions'
    },
    { 
        id: 4, 
        title: 'Country Capitals', 
        category: 'Geography', 
        questions: 15, 
        time: '10 mins', 
        difficulty: 'Easy', 
        icon: 'fa-globe',
        taken: 4567,
        rating: 4.6,
        description: 'Test your knowledge of world capitals'
    },
    { 
        id: 5, 
        title: 'Biology Basics', 
        category: 'Science', 
        questions: 20, 
        time: '15 mins', 
        difficulty: 'Medium', 
        icon: 'fa-dna',
        taken: 1890,
        rating: 4.4,
        description: 'Explore the fundamentals of biology'
    },
    { 
        id: 6, 
        title: 'JavaScript Mastery', 
        category: 'Technology', 
        questions: 25, 
        time: '20 mins', 
        difficulty: 'Hard', 
        icon: 'fa-code',
        taken: 2345,
        rating: 4.9,
        description: 'Advanced JavaScript concepts and patterns'
    }
];

// Sample quiz questions for the quiz taking functionality
const quizQuestions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
        correct: 2
    },
    {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        id: 5,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1
    }
];

// Sample leaderboard data
const leaderboardData = {
    weekly: [
        { name: 'Sarah Johnson', initials: 'SJ', score: 2850, quizzes: 15, accuracy: 92, grade: '10th' },
        { name: 'Michael Chen', initials: 'MC', score: 2450, quizzes: 12, accuracy: 88, grade: '11th' },
        { name: 'Emily Davis', initials: 'ED', score: 2310, quizzes: 11, accuracy: 85, grade: '10th' },
        { name: 'James Wilson', initials: 'JW', score: 2180, quizzes: 10, accuracy: 82, grade: '9th' },
        { name: 'Alex Rodriguez', initials: 'AR', score: 2050, quizzes: 9, accuracy: 79, grade: '11th' },
        { name: 'Lisa Thompson', initials: 'LT', score: 1980, quizzes: 8, accuracy: 72, grade: '10th' },
        { name: 'David Kim', initials: 'DK', score: 1890, quizzes: 7, accuracy: 68, grade: '12th' },
        { name: 'Rachel Patel', initials: 'RP', score: 1750, quizzes: 6, accuracy: 65, grade: '9th' },
        { name: 'Maria Brown', initials: 'MB', score: 1620, quizzes: 5, accuracy: 62, grade: '10th' },
        { name: 'Chris Taylor', initials: 'CT', score: 1500, quizzes: 4, accuracy: 58, grade: '11th' }
    ],
    monthly: [
        { name: 'Sarah Johnson', initials: 'SJ', score: 8250, quizzes: 42, accuracy: 91, grade: '10th' },
        { name: 'Michael Chen', initials: 'MC', score: 7900, quizzes: 38, accuracy: 89, grade: '11th' },
        { name: 'Emily Davis', initials: 'ED', score: 7450, quizzes: 35, accuracy: 87, grade: '10th' }
    ],
    allTime: [
        { name: 'Sarah Johnson', initials: 'SJ', score: 24500, quizzes: 120, accuracy: 93, grade: '10th' },
        { name: 'Michael Chen', initials: 'MC', score: 23800, quizzes: 115, accuracy: 91, grade: '11th' },
        { name: 'Emily Davis', initials: 'ED', score: 22100, quizzes: 108, accuracy: 89, grade: '10th' }
    ]
};

// Current quiz state
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizTimer = null;
let timeLeft = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Load page-specific content
    loadPageContent();
    
    // Initialize modal if it exists
    initializeModal();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Load user profile
    loadUserProfile();
});

// Check if user is authenticated
function checkAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const publicPages = ['index.html', 'login.html', 'signup.html'];
    
    if (!publicPages.includes(currentPage)) {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            // Redirect to login if not authenticated
            window.location.href = '../index.html';
        }
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (currentPage === 'index.html' && href === '#home') {
            link.classList.add('active');
        } else if (currentPage === 'dashboard.html' && href.includes('dashboard')) {
            link.classList.add('active');
        } else if (currentPage === 'available-quizzes.html' && href.includes('available-quizzes')) {
            link.classList.add('active');
        } else if (currentPage === 'leaderboard.html' && href.includes('leaderboard')) {
            link.classList.add('active');
        } else if (currentPage === 'create-quiz.html' && href.includes('create-quiz')) {
            link.classList.add('active');
        } else if (currentPage === 'manage-quizzes.html' && href.includes('manage-quizzes')) {
            link.classList.add('active');
        } else if (currentPage === 'student-performance.html' && href.includes('student-performance')) {
            link.classList.add('active');
        }
    });
}

// Load page-specific content
function loadPageContent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'available-quizzes.html') {
        loadAllQuizzes();
    } else if (currentPage === 'leaderboard.html') {
        loadLeaderboard();
    }
}

// Load user profile in navbar
function loadUserProfile() {
    const profileInitials = document.getElementById('profileInitials');
    if (profileInitials) {
        const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Guest User' };
        profileInitials.textContent = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}

// Load all quizzes for available-quizzes page
function loadAllQuizzes() {
    const quizzesGrid = document.getElementById('allQuizzesGrid');
    if (!quizzesGrid) return;
    
    quizzesGrid.innerHTML = '';
    
    quizzes.forEach(quiz => {
        const quizCard = createQuizCard(quiz);
        quizzesGrid.appendChild(quizCard);
    });
}

// Create quiz card element
function createQuizCard(quiz) {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.onclick = () => startQuiz(quiz.id);
    
    const difficultyClass = quiz.difficulty.toLowerCase();
    
    card.innerHTML = `
        <div class="quiz-header">
            <i class="fas ${quiz.icon}"></i>
            <span class="difficulty-badge ${difficultyClass}">${quiz.difficulty}</span>
        </div>
        <div class="quiz-body">
            <h3>${quiz.title}</h3>
            <div class="quiz-meta">
                <span><i class="fas fa-question-circle"></i> ${quiz.questions} Questions</span>
                <span><i class="fas fa-clock"></i> ${quiz.time}</span>
            </div>
            <p>${quiz.description}</p>
            <div class="quiz-stats">
                <span><i class="fas fa-users"></i> ${quiz.taken.toLocaleString()} taken</span>
                <span class="rating"><i class="fas fa-star"></i> ${quiz.rating}</span>
            </div>
            <button class="btn-start" onclick="event.stopPropagation(); startQuiz(${quiz.id})">Start Quiz</button>
        </div>
    `;
    
    return card;
}

// Load leaderboard data
function loadLeaderboard(period = 'weekly') {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;
    
    leaderboardBody.innerHTML = '';
    
    const data = leaderboardData[period] || leaderboardData.weekly;
    
    data.forEach((user, index) => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        // Check if current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.name === user.name) {
            row.classList.add('current-user');
        }
        
        let rankClass = '';
        if (index === 0) rankClass = 'top-1';
        else if (index === 1) rankClass = 'top-2';
        else if (index === 2) rankClass = 'top-3';
        
        let accuracyClass = 'low';
        if (user.accuracy >= 90) accuracyClass = 'high';
        else if (user.accuracy >= 75) accuracyClass = 'medium';
        
        row.innerHTML = `
            <div class="rank-cell ${rankClass}">${index + 1}</div>
            <div class="user-cell">
                <div class="user-avatar">${user.initials}</div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>Grade ${user.grade}</p>
                </div>
            </div>
            <div class="score-cell">${user.score.toLocaleString()}</div>
            <div class="quizzes-cell">${user.quizzes}</div>
            <div class="accuracy-cell ${accuracyClass}">${user.accuracy}%</div>
        `;
        
        leaderboardBody.appendChild(row);
    });
}

// Filter leaderboard by time period
window.filterLeaderboard = function(period) {
    // Update active button
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reload leaderboard data
    loadLeaderboard(period);
};

// Start quiz
window.startQuiz = function(quizId) {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    // Store current quiz in session
    sessionStorage.setItem('currentQuiz', JSON.stringify(quiz));
    sessionStorage.setItem('currentQuestionIndex', '0');
    sessionStorage.setItem('userAnswers', JSON.stringify(new Array(quizQuestions.length).fill(null)));
    
    // Redirect to quiz page or open modal
    const modal = document.getElementById('quizModal');
    if (modal) {
        openQuizModal(quiz);
    } else {
        // If no modal, redirect to quiz detail page
        window.location.href = `quiz-detail.html?id=${quizId}`;
    }
};

// Open quiz modal
function openQuizModal(quiz) {
    const modal = document.getElementById('quizModal');
    const modalTitle = document.getElementById('modalTitle');
    const quizContent = document.getElementById('quizContent');
    
    if (!modal || !modalTitle || !quizContent) return;
    
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    modalTitle.textContent = quiz.title;
    modal.style.display = 'flex';
    
    loadQuizQuestion();
}

// Load quiz question in modal
function loadQuizQuestion() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    const question = quizQuestions[currentQuestionIndex];
    
    let html = `
        <div class="quiz-question">
            <div class="question-text">${currentQuestionIndex + 1}. ${question.question}</div>
            <div class="options-list">
    `;
    
    question.options.forEach((option, index) => {
        const isSelected = userAnswers[currentQuestionIndex] === index;
        const optionLetter = String.fromCharCode(65 + index);
        html += `
            <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                <span class="option-prefix">${optionLetter}</span>
                <span class="option-text">${option}</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        <div class="quiz-footer">
            <button class="btn-prev" onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-left"></i> Previous
            </button>
            <span class="question-counter">Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</span>
            ${currentQuestionIndex === quizQuestions.length - 1 
                ? '<button class="btn-submit" onclick="submitQuiz()">Submit Quiz</button>'
                : '<button class="btn-next" onclick="nextQuestion()">Next <i class="fas fa-arrow-right"></i></button>'
            }
        </div>
    `;
    
    quizContent.innerHTML = html;
}

// Select option
window.selectOption = function(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    const options = document.querySelectorAll('.option-item');
    options.forEach(opt => opt.classList.remove('selected'));
    if (options[optionIndex]) {
        options[optionIndex].classList.add('selected');
    }
};

// Next question
window.nextQuestion = function() {
    if (userAnswers[currentQuestionIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuizQuestion();
    }
};

// Previous question
window.previousQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuizQuestion();
    }
};

// Submit quiz
window.submitQuiz = function() {
    const unanswered = userAnswers.findIndex(answer => answer === null);
    if (unanswered !== -1) {
        alert(`Please answer question ${unanswered + 1} before submitting.`);
        currentQuestionIndex = unanswered;
        loadQuizQuestion();
        return;
    }
    
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
        return count + (answer === quizQuestions[index].correct ? 1 : 0);
    }, 0);
    
    const score = (correctAnswers / quizQuestions.length) * 100;
    
    showQuizResults(correctAnswers, score);
};

// Show quiz results
function showQuizResults(correctAnswers, score) {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    let grade = 'F';
    let message = '';
    let emoji = '';
    
    if (score >= 90) {
        grade = 'A';
        message = 'Excellent! You\'re a genius!';
        emoji = '🏆';
    } else if (score >= 80) {
        grade = 'B';
        message = 'Great job! Keep it up!';
        emoji = '🌟';
    } else if (score >= 70) {
        grade = 'C';
        message = 'Good effort! Practice more!';
        emoji = '📚';
    } else if (score >= 60) {
        grade = 'D';
        message = 'Fair attempt! Keep learning!';
        emoji = '💪';
    } else {
        grade = 'F';
        message = 'Keep practicing! You\'ll do better!';
        emoji = '🎯';
    }
    
    quizContent.innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Completed! ${emoji}</h2>
            <div class="score-circle">
                <h3>${Math.round(score)}%</h3>
                <p>Grade ${grade}</p>
            </div>
            <div class="results-details">
                <div class="result-item">
                    <span class="result-label">Correct Answers:</span>
                    <span class="result-value">${correctAnswers}/${quizQuestions.length}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Incorrect Answers:</span>
                    <span class="result-value">${quizQuestions.length - correctAnswers}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Accuracy:</span>
                    <span class="result-value">${Math.round(score)}%</span>
                </div>
            </div>
            <p class="result-message">${message}</p>
            <button class="btn-restart" onclick="restartQuiz()">Try Again</button>
            <button class="btn-close" onclick="closeQuizModal()" style="margin-left: 1rem; padding: 0.8rem 2rem; background: #e5e7eb; color: #333; border: none; border-radius: 10px; cursor: pointer;">Close</button>
        </div>
    `;
}

// Restart quiz
window.restartQuiz = function() {
    if (!currentQuiz) return;
    
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    loadQuizQuestion();
};

// Close quiz modal
window.closeQuizModal = function() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

// Initialize modal
function initializeModal() {
    const modal = document.getElementById('quizModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) return;
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        if (quizTimer) {
            clearInterval(quizTimer);
        }
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (quizTimer) {
                clearInterval(quizTimer);
            }
        }
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '70px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.backgroundColor = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navMenu.style.zIndex = '1000';
        }
    });
}

// Filter quizzes by category
window.filterByCategory = function(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
        // Trigger filter change event
        const event = new Event('change');
        categoryFilter.dispatchEvent(event);
    }
};

// Search quizzes
window.searchQuizzes = function() {
    const searchInput = document.getElementById('searchQuiz');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const quizCards = document.querySelectorAll('.quiz-card');
    
    quizCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Logout function
window.logout = function() {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    window.location.href = '../index.html';
};

// Handle login (for index.html)
window.handleLogin = function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const selectedRole = document.querySelector('.role-card.selected')?.id?.replace('Role', '') || 'student';

    // Demo credentials
    const demoStudents = [
        { email: 'student@demo.com', password: 'student123', name: 'John Student' },
        { email: 'john@student.com', password: 'pass123', name: 'John Doe' }
    ];

    const demoTeachers = [
        { email: 'teacher@demo.com', password: 'teacher123', name: 'Prof. Smith' },
        { email: 'sarah@teacher.com', password: 'teach123', name: 'Sarah Johnson' }
    ];

    // Check credentials based on selected role
    if (selectedRole === 'student') {
        const user = demoStudents.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                ...user,
                role: 'student'
            }));
            window.location.href = 'student/dashboard.html';
        } else {
            alert('Invalid credentials! Try student@demo.com / student123');
        }
    } else {
        const user = demoTeachers.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                ...user,
                role: 'teacher'
            }));
            window.location.href = 'teacher/dashboard.html';
        } else {
            alert('Invalid credentials! Try teacher@demo.com / teacher123');
        }
    }
};

// Handle signup (for index.html)
window.handleSignup = function(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const selectedRole = document.querySelector('.role-card.selected')?.id?.replace('Role', '') || 'student';

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Store user data (demo purpose)
    localStorage.setItem('currentUser', JSON.stringify({
        name,
        email,
        role: selectedRole
    }));

    alert('Account created successfully! Please login.');
    switchAuthTab('login');
};

// Switch between login and signup tabs
window.switchAuthTab = function(tab) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginTab && signupTab && loginForm && signupForm) {
        if (tab === 'login') {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        }
    }
};

// Select role (student/teacher)
window.selectRole = function(role) {
    const studentRole = document.getElementById('studentRole');
    const teacherRole = document.getElementById('teacherRole');
    
    if (studentRole && teacherRole) {
        studentRole.classList.remove('selected');
        teacherRole.classList.remove('selected');
        document.getElementById(role + 'Role').classList.add('selected');
    }
};

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categories,
        quizzes,
        quizQuestions,
        leaderboardData,
        startQuiz,
        logout
    };
}