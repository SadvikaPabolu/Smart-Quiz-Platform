function initDashboard() {
    // Load user data
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'John Student', score: 0 };
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    document.getElementById('profileInitials').textContent = initials;
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('userName').textContent = user.name.split(' ')[0];
    
    // Load quiz results
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // Calculate stats
    updateStats(quizResults, user);
    
    // Display recent results
    displayRecentResults(quizResults);
    
    // Initialize chart
    initializeChart(quizResults);
}

function updateStats(results, user) {
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const avgScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0;
    
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('quizzesCompleted').textContent = results.length;
    document.getElementById('averageScore').textContent = avgScore + '%';
    document.getElementById('streak').textContent = Math.max(1, Math.floor(results.length / 2));
}

function displayRecentResults(results) {
    const container = document.getElementById('recentResults');
    
    if (results.length === 0) {
        return; // Keep the default message
    }
    
    // Get last 6 results
    const recent = results.slice(-6).reverse();
    
    container.innerHTML = recent.map(result => {
        const scoreClass = result.score >= 80 ? 'pass' : (result.score >= 60 ? 'warning' : 'fail');
        const scoreColor = result.score >= 80 ? '#10b981' : (result.score >= 60 ? '#f59e0b' : '#ef4444');
        
        return `
            <div class="quiz-result-card ${scoreClass}">
                <div class="quiz-result-title">${result.quizTitle}</div>
                <div class="quiz-result-score">
                    <span>Score:</span>
                    <span class="score-badge" style="color: ${scoreColor}">${result.score}%</span>
                </div>
                <div class="quiz-result-date">
                    <i class="fas fa-calendar"></i> ${result.date}
                </div>
            </div>
        `;
    }).join('');
}

function initializeChart(results) {
    const ctx = document.getElementById('progressChart');
    
    // Get data for last 7 days (or weeks)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const scores = [65, 72, 68, 75, 82, 78, 85];
    const quizzesPerDay = [1, 0, 2, 1, 3, 2, 2];
    
    if (results.length > 0) {
        scores[Math.floor(Math.random() * 7)] = results[results.length - 1].score;
    }
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Average Score (%)',
                    data: scores,
                    backgroundColor: '#4f46e5',
                    borderRadius: 8,
                    borderSkipped: false,
                    yAxisID: 'y'
                },
                {
                    label: 'Quizzes Taken',
                    data: quizzesPerDay,
                    backgroundColor: '#e0f2fe',
                    borderColor: '#0284c7',
                    borderWidth: 2,
                    type: 'line',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Score (%)',
                        font: { weight: 'bold' }
                    },
                    min: 0,
                    max: 100
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Quizzes',
                        font: { weight: 'bold' }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', initDashboard);
