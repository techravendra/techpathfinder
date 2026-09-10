/**
 * Dashboard Module
 * Handles dashboard statistics, charts, and visualizations
 */

// Global chart instances to prevent memory leaks
let genderChartInstance;
let passFailChartInstance;
let attendanceChartInstance;
let semesterChartInstance;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('genderChart')) {
        initializeDashboard();
    }
});

/**
 * Initialize the dashboard
 */
function initializeDashboard() {
    updateDashboardStats();
    initializeCharts();
}

/**
 * Update all dashboard statistics
 */
function updateDashboardStats() {
    const students = getAllStudents();

    // Calculate statistics
    const totalStudents = students.length;
    const maleCount = students.filter(s => s.gender === 'Male').length;
    const femaleCount = students.filter(s => s.gender === 'Female').length;
    const passedCount = students.filter(s => s.marks >= 5).length;
    const failedCount = students.filter(s => s.marks < 5).length;
    const avgAttendance = students.length > 0
        ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
        : 0;

    // Update DOM
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('maleStudents').textContent = maleCount;
    document.getElementById('femaleStudents').textContent = femaleCount;
    document.getElementById('passedStudents').textContent = passedCount;
    document.getElementById('failedStudents').textContent = failedCount;
    document.getElementById('avgAttendance').textContent = avgAttendance + '%';

    // Update recent students section
    updateRecentStudents(students);
}

/**
 * Display recent students
 * @param {array} students - Array of all students
 */
function updateRecentStudents(students) {
    const recentContainer = document.getElementById('recentStudents');

    if (students.length === 0) {
        recentContainer.innerHTML = '<p class="empty-message">No students yet. Add your first student!</p>';
        return;
    }

    // Get last 6 added students
    const recentStudentsList = students
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    let html = '';
    recentStudentsList.forEach(student => {
        const status = getStudentStatus(student.marks);
        const statusColor = status === 'Pass' ? '#27ae60' : '#e74c3c';

        html += `
            <div class="student-card">
                <img src="${student.photo}" alt="${student.fullName}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                <h4>${student.fullName}</h4>
                <p><strong>${student.studentId}</strong></p>
                <p>${student.branch}</p>
                <p style="color: ${statusColor}; font-weight: bold;">
                    ${status}
                </p>
                <a href="profile.html?id=${student.studentId}" style="color: #3498db; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
                    View Profile →
                </a>
            </div>
        `;
    });

    recentContainer.innerHTML = html;
}

/**
 * Initialize all dashboard charts
 */
function initializeCharts() {
    const students = getAllStudents();

    if (students.length === 0) {
        // Show message if no data
        const chartsContainer = document.querySelector('.charts-grid');
        if (chartsContainer) {
            chartsContainer.innerHTML = '<p class="empty-message" style="grid-column: 1/-1; text-align: center; padding: 40px;">Add students to see charts</p>';
        }
        return;
    }

    // Initialize individual charts
    initGenderChart(students);
    initPassFailChart(students);
    initAttendanceChart(students);
    initSemesterChart(students);
}

/**
 * Initialize gender distribution chart
 * @param {array} students - Array of student objects
 */
function initGenderChart(students) {
    const ctx = document.getElementById('genderChart')?.getContext('2d');
    if (!ctx) return;

    // Destroy previous instance if exists
    if (genderChartInstance) {
        genderChartInstance.destroy();
    }

    const maleCount = students.filter(s => s.gender === 'Male').length;
    const femaleCount = students.filter(s => s.gender === 'Female').length;
    const otherCount = students.filter(s => s.gender === 'Other').length;

    genderChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                data: [maleCount, femaleCount, otherCount],
                backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
                borderColor: ['#2980b9', '#c0392b', '#d68910'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize pass/fail distribution chart
 * @param {array} students - Array of student objects
 */
function initPassFailChart(students) {
    const ctx = document.getElementById('passFailChart')?.getContext('2d');
    if (!ctx) return;

    // Destroy previous instance if exists
    if (passFailChartInstance) {
        passFailChartInstance.destroy();
    }

    const passedCount = students.filter(s => s.marks >= 5).length;
    const failedCount = students.filter(s => s.marks < 5).length;

    passFailChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Passed', 'Failed'],
            datasets: [{
                data: [passedCount, failedCount],
                backgroundColor: ['#27ae60', '#e74c3c'],
                borderColor: ['#229954', '#c0392b'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize attendance distribution chart
 * @param {array} students - Array of student objects
 */
function initAttendanceChart(students) {
    const ctx = document.getElementById('attendanceChart')?.getContext('2d');
    if (!ctx) return;

    // Destroy previous instance if exists
    if (attendanceChartInstance) {
        attendanceChartInstance.destroy();
    }

    // Categorize students by attendance
    const excellent = students.filter(s => s.attendance >= 90).length;
    const good = students.filter(s => s.attendance >= 75 && s.attendance < 90).length;
    const average = students.filter(s => s.attendance >= 60 && s.attendance < 75).length;
    const poor = students.filter(s => s.attendance < 60).length;

    attendanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['90-100%', '75-90%', '60-75%', 'Below 60%'],
            datasets: [{
                label: 'Number of Students',
                data: [excellent, good, average, poor],
                backgroundColor: [
                    '#27ae60',
                    '#f39c12',
                    '#e67e22',
                    '#e74c3c'
                ],
                borderColor: [
                    '#229954',
                    '#d68910',
                    '#d35400',
                    '#c0392b'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Initialize semester distribution chart
 * @param {array} students - Array of student objects
 */
function initSemesterChart(students) {
    const ctx = document.getElementById('semesterChart')?.getContext('2d');
    if (!ctx) return;

    // Destroy previous instance if exists
    if (semesterChartInstance) {
        semesterChartInstance.destroy();
    }

    // Count students by semester
    const semesterCounts = {};
    for (let i = 1; i <= 8; i++) {
        semesterCounts[i] = students.filter(s => s.semester === String(i)).length;
    }

    const labels = Object.keys(semesterCounts).map(s => `Sem ${s}`);
    const data = Object.values(semesterCounts);

    semesterChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Students per Semester',
                data: data,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#2980b9',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Refresh dashboard data (call when data changes)
 */
function refreshDashboard() {
    updateDashboardStats();
    initializeCharts();
}

// Make functions globally accessible
window.refreshDashboard = refreshDashboard;
