function initTeacherDashboard() {
    // Load teacher data
    const teacher = JSON.parse(localStorage.getItem('currentTeacher')) || { name: 'John Teacher' };
    const initials = teacher.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    document.getElementById('profileInitials').textContent = initials;
    document.getElementById('profileName').textContent = teacher.name;
    document.getElementById('teacherName').textContent = teacher.name.split(' ')[0];
    
    // Initialize chart
    initializeClassChart();
}

function initializeClassChart() {
    const ctx = document.getElementById('classChart');
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const classScores = [78, 81, 79, 85, 87, 84, 82];
    const classParticipation = [35, 38, 36, 42, 43, 40, 39];
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Class Average Score (%)',
                    data: classScores,
                    backgroundColor: '#4f46e5',
                    borderRadius: 8,
                    borderSkipped: false,
                    yAxisID: 'y'
                },
                {
                    label: 'Students Attempted',
                    data: classParticipation,
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
                        text: 'Average Score (%)',
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
                        text: 'Student Count',
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

function viewStudent(studentId) {
    alert(`Viewing detailed report for student: ${studentId}`);
    // In a real app, redirect to student detail page
    // window.location.href = `student-report.html?id=${studentId}`;
}

function downloadReport() {
    alert('Downloading class report... (This feature would generate a PDF in production)');
    // In a real app, generate and download a PDF report
}

function logout() {
    localStorage.removeItem('currentTeacher');
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', initTeacherDashboard);
