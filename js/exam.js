// exam.js – loads quiz from localStorage and runs the exam with perfect streak tracking

function getQuizzes() {
    return JSON.parse(localStorage.getItem('smartquiz_quizzes')) || [];
}

// Helper: get today's date in YYYY-MM-DD
function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// --- Robust streak update ---
function updateUserStreak() {
    // Get current user from localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        console.error('No logged-in user found.');
        return null;
    }

    const today = getTodayString();
    const lastDate = currentUser.lastQuizDate || null;
    let newStreak = currentUser.streak || 0;
    let increased = false;

    if (!lastDate) {
        // First quiz ever for this user
        newStreak = 1;
        increased = true;
    } else {
        const last = new Date(lastDate);
        const current = new Date(today);
        const diffTime = current - last;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays >= 1 && diffDays < 2) {
            // Consecutive day
            newStreak += 1;
            increased = true;
        } else if (diffDays >= 2) {
            // Missed one or more days – reset to 1
            newStreak = 1;
            increased = true;
        }
        // else same day: no change, streak remains same
    }

    // Update user object
    currentUser.streak = newStreak;
    currentUser.lastQuizDate = today;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Also update the master users list so streak persists across logins
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].streak = newStreak;
        users[userIndex].lastQuizDate = today;
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        // If user not found in master list (shouldn't happen), add them
        users.push(currentUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Return the new streak if it increased, otherwise null
    return increased ? newStreak : null;
}

function initExam() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');
    
    if (!quizId) {
        alert('No quiz specified');
        window.location.href = 'available-quizzes.html';
        return;
    }

    const quizzes = getQuizzes();
    const quiz = quizzes.find(q => q.id == quizId);

    if (!quiz) {
        alert('Quiz not found');
        window.location.href = 'available-quizzes.html';
        return;
    }

    // Set quiz title
    document.getElementById('quizTitle').textContent = quiz.title;

    // Set total questions
    document.getElementById('totalQ').textContent = quiz.questions.length;

    // Timer setup (timeLimit is in minutes, convert to seconds)
    let timeLeft = quiz.timeLimit * 60;
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz(); // auto-submit when time runs out
        }
        updateTimerDisplay(timeLeft);
    }, 1000);

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timeLeft').textContent = 
            `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (seconds < 60) {
            document.getElementById('timeLeft').classList.add('timer-danger');
        }
    }

    // Initialize answers array
    let answers = new Array(quiz.questions.length).fill(null);
    let currentIndex = 0;

    // Render first question
    renderQuestion(currentIndex);

    function renderQuestion(index) {
        const q = quiz.questions[index];
        const container = document.getElementById('questionsContainer');
        let optionsHtml = '';
        q.options.forEach((opt, i) => {
            const checked = answers[index] === i ? 'checked' : '';
            optionsHtml += `
                <label class="option">
                    <input type="radio" name="question${index}" value="${i}" ${checked} onchange="selectAnswer(${index}, ${i})">
                    <span>${opt}</span>
                </label>
            `;
        });
        container.innerHTML = `
            <div class="question-card">
                <div class="question-number">Question ${index+1}</div>
                <div class="question-text">${q.question}</div>
                <div class="options">${optionsHtml}</div>
            </div>
        `;
        document.getElementById('currentQ').textContent = index+1;
        // Update progress bar
        const progress = ((index+1) / quiz.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // Update answered count
        const answered = answers.filter(a => a !== null).length;
        document.getElementById('answeredCount').textContent = answered;

        // Update navigation buttons
        document.getElementById('prevBtn').disabled = index === 0;
        if (index === quiz.questions.length - 1) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'block';
        } else {
            document.getElementById('nextBtn').style.display = 'flex';
            document.getElementById('submitBtn').style.display = 'none';
        }

        // Update nav buttons
        renderNavButtons(index);
    }

    function renderNavButtons(activeIndex) {
        const navContainer = document.getElementById('questionButtonsContainer');
        let html = '';
        for (let i = 0; i < quiz.questions.length; i++) {
            const answeredClass = answers[i] !== null ? 'answered' : '';
            const activeClass = i === activeIndex ? 'active' : '';
            html += `<button class="question-nav-item ${answeredClass} ${activeClass}" onclick="goToQuestion(${i})">${i+1}</button>`;
        }
        navContainer.innerHTML = html;
    }

    window.selectAnswer = function(index, value) {
        answers[index] = parseInt(value);
        renderQuestion(currentIndex); // re-render to update checked state and nav
        const answered = answers.filter(a => a !== null).length;
        document.getElementById('answeredCount').textContent = answered;
    };

    window.goToQuestion = function(index) {
        currentIndex = index;
        renderQuestion(currentIndex);
    };

    window.previousQuestion = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion(currentIndex);
        }
    };

    window.nextQuestion = function() {
        if (currentIndex < quiz.questions.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        }
    };

    window.submitQuiz = function() {
        clearInterval(timerInterval); // stop timer
        // Check if all questions answered
        const unanswered = answers.findIndex(a => a === null);
        if (unanswered !== -1) {
            alert(`Please answer question ${unanswered+1} before submitting.`);
            currentIndex = unanswered;
            renderQuestion(currentIndex);
            return;
        }
        // Calculate score
        let correct = 0;
        answers.forEach((ans, idx) => {
            if (ans === quiz.questions[idx].correct) correct++;
        });
        const score = (correct / quiz.questions.length) * 100;

        // --- CRITICAL: Update streak for this user ---
        const newStreak = updateUserStreak();
        if (newStreak) {
            // Set flag for dashboard to show a beautiful toast
            localStorage.setItem('streakToast', JSON.stringify({
                date: new Date().toISOString(),
                streak: newStreak
            }));
        }

        // Save attempt (so it appears in dashboard history)
        const attempts = JSON.parse(localStorage.getItem('student_attempts')) || [];
        attempts.push({
            quizId: quiz.id,
            quizTitle: quiz.title,
            score: score,
            date: new Date().toISOString(),
            timeSpent: quiz.timeLimit * 60 - timeLeft // optional
        });
        localStorage.setItem('student_attempts', JSON.stringify(attempts));

        // Generic submission flag for other notifications (if any)
        localStorage.setItem('submissionSuccess', 'true');

        // Redirect to dashboard – the streak will now be updated
        window.location.href = 'dashboard.html';
    };

    // Expose functions globally for onclick handlers
    window.selectAnswer = selectAnswer;
    window.goToQuestion = goToQuestion;
    window.previousQuestion = previousQuestion;
    window.nextQuestion = nextQuestion;
    window.submitQuiz = submitQuiz;

    updateTimerDisplay(timeLeft);
}

document.addEventListener('DOMContentLoaded', initExam);