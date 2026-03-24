// quiz-detail.js – loads quiz data from localStorage (created by teacher)

function getQuizzes() {
    return JSON.parse(localStorage.getItem('smartquiz_quizzes')) || [];
}

function initQuizDetail() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');
    
    if (!quizId) {
        window.location.href = 'available-quizzes.html';
        return;
    }

    const quizzes = getQuizzes();
    const quiz = quizzes.find(q => q.id == quizId);

    if (!quiz) {
        window.location.href = 'available-quizzes.html';
        return;
    }

    // Update page content – adjust IDs if your HTML uses different names
    document.getElementById('quizTitle').textContent = quiz.title;
    document.getElementById('quizCategory').textContent = quiz.category;
    document.getElementById('quizDescription').textContent = quiz.description;
    
    const iconEl = document.getElementById('quizIcon');
    if (iconEl) iconEl.className = `fas ${quiz.icon || 'fa-question-circle'}`;
    
    const difficultyEl = document.getElementById('difficultyBadge');
    if (difficultyEl) {
        difficultyEl.textContent = quiz.difficulty;
        difficultyEl.className = `difficulty-badge ${quiz.difficulty.toLowerCase()}`;
    }
    
    const qCountEl = document.getElementById('questionCount');
    if (qCountEl) qCountEl.textContent = quiz.questions.length;
    
    const timeEl = document.getElementById('durationTime');
    if (timeEl) timeEl.textContent = `${quiz.timeLimit} mins`;
    
    const takenEl = document.getElementById('usersTaken');
    if (takenEl) {
        const taken = quiz.taken || 0;
        takenEl.textContent = taken > 1000 ? (taken/1000).toFixed(1) + 'K' : taken;
    }
    
    const ratingEl = document.getElementById('ratingScore');
    if (ratingEl) ratingEl.textContent = quiz.rating || 'New';
    
    const conceptsList = document.getElementById('conceptsList');
    if (conceptsList) {
        // If you store concepts per question, extract unique ones
        const uniqueConcepts = [...new Set(quiz.questions.map(q => q.concept).filter(Boolean))];
        if (uniqueConcepts.length > 0) {
            conceptsList.innerHTML = uniqueConcepts.map(c => `<div class="concept-item">${c}</div>`).join('');
        } else {
            conceptsList.innerHTML = '<div class="concept-item">General Knowledge</div>';
        }
    }
}

function startQuiz() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');
    window.location.href = `exam.html?id=${quizId}`;
}

document.addEventListener('DOMContentLoaded', initQuizDetail);