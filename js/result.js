function initResult() {
    const params = new URLSearchParams(window.location.search);
    const score = parseInt(params.get('score')) || 0;
    
    // Update displays
    document.getElementById('scoreNumber').textContent = score;
    document.getElementById('scoreBarFill').style.width = score + '%';
    document.getElementById('percentageScore').textContent = score + '%';
    
    // Get latest quiz result from localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    if (quizResults.length > 0) {
        const lastResult = quizResults[quizResults.length - 1];
        document.getElementById('correctCount').textContent = lastResult.correct;
        document.getElementById('totalCount').textContent = lastResult.total;
    }
    
    // Determine result message based on score
    const resultTitle = document.getElementById('resultTitle');
    const resultIcon = document.getElementById('resultIcon');
    const progressMsg = document.getElementById('progressMsg');
    
    if (score >= 80) {
        resultTitle.textContent = 'Excellent!';
        resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #10b981;"></i>';
        resultIcon.classList.add('pass');
        progressMsg.textContent = 'Outstanding performance! You\'ve mastered this topic!';
        progressMsg.style.color = '#10b981';
    } else if (score >= 60) {
        resultTitle.textContent = 'Good Job!';
        resultIcon.innerHTML = '<i class="fas fa-star" style="color: #f59e0b;"></i>';
        resultIcon.classList.add('pass');
        progressMsg.textContent = 'Great effort! Keep practicing.';
        progressMsg.style.color = '#f59e0b';
    } else if (score >= 40) {
        resultTitle.textContent = 'Keep Trying!';
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up" style="color: #6b7280;"></i>';
        progressMsg.textContent = 'You\'re making progress. Review and try again!';
        progressMsg.style.color = '#6b7280';
    } else {
        resultTitle.textContent = 'Need More Practice';
        resultIcon.innerHTML = '<i class="fas fa-book" style="color: #ef4444;"></i>';
        resultIcon.classList.add('fail');
        progressMsg.textContent = 'Revisit the concepts and give it another try!';
        progressMsg.style.color = '#ef4444';
    }
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function retakeQuiz() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('quiz');
    window.location.href = `exam.html?quiz=${quizId}`;
}

function goToQuizzes() {
    window.location.href = 'available-quizzes.html';
}

document.addEventListener('DOMContentLoaded', initResult);
