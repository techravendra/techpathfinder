/**
 * EduManage - Student Data Management System
 * Main Application JavaScript
 * Handles theme switching, navigation, and general utilities
 */

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the entire application
 */
function initializeApp() {
    // Load theme preference
    loadTheme();

    // Setup event listeners
    setupEventListeners();

    // Load sample data if localStorage is empty
    initializeSampleData();
}

// ================================
// THEME MANAGEMENT
// ================================

/**
 * Load saved theme preference from localStorage
 */
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    applyTheme(theme);
}

/**
 * Apply theme to the application
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    const html = document.documentElement;

    if (theme === 'dark') {
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ================================
// EVENT LISTENERS
// ================================

/**
 * Setup all event listeners for the application
 */
function setupEventListeners() {
    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Sidebar toggle on mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking on a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeSidebarMobile();
        });
    });
}

/**
 * Toggle sidebar visibility on mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

/**
 * Close sidebar on mobile devices
 */
function closeSidebarMobile() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
}

// Close sidebar when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
});

// ================================
// SAMPLE DATA INITIALIZATION
// ================================

/**
 * Initialize sample student data if localStorage is empty
 */
function initializeSampleData() {
    const existingStudents = localStorage.getItem('students');

    if (!existingStudents) {
        const sampleStudents = [
            {
                studentId: 'STU001',
                fullName: 'Aarav Kumar',
                fatherName: 'Rajesh Kumar',
                motherName: 'Priya Kumar',
                dob: '2003-05-15',
                gender: 'Male',
                mobile: '9876543210',
                email: 'aarav.kumar@college.edu',
                address: '123 Main Street, New Delhi, India',
                course: 'B.Tech',
                branch: 'Computer Science',
                semester: '6',
                section: 'A',
                admissionYear: 2021,
                attendance: 92,
                marks: 8.5,
                photo: 'https://via.placeholder.com/150?text=Aarav+Kumar',
                createdAt: new Date(2023, 0, 15).toISOString()
            },
            {
                studentId: 'STU002',
                fullName: 'Priya Sharma',
                fatherName: 'Vikram Sharma',
                motherName: 'Anjali Sharma',
                dob: '2003-08-22',
                gender: 'Female',
                mobile: '9876543211',
                email: 'priya.sharma@college.edu',
                address: '456 Park Avenue, Mumbai, India',
                course: 'B.Tech',
                branch: 'Information Technology',
                semester: '5',
                section: 'B',
                admissionYear: 2021,
                attendance: 88,
                marks: 7.8,
                photo: 'https://via.placeholder.com/150?text=Priya+Sharma',
                createdAt: new Date(2023, 1, 20).toISOString()
            },
            {
                studentId: 'STU003',
                fullName: 'Rohan Patel',
                fatherName: 'Amit Patel',
                motherName: 'Deepa Patel',
                dob: '2004-01-10',
                gender: 'Male',
                mobile: '9876543212',
                email: 'rohan.patel@college.edu',
                address: '789 Garden Road, Bangalore, India',
                course: 'B.Tech',
                branch: 'Electronics',
                semester: '4',
                section: 'C',
                admissionYear: 2021,
                attendance: 95,
                marks: 8.2,
                photo: 'https://via.placeholder.com/150?text=Rohan+Patel',
                createdAt: new Date(2023, 2, 10).toISOString()
            },
            {
                studentId: 'STU004',
                fullName: 'Neha Singh',
                fatherName: 'Suresh Singh',
                motherName: 'Meera Singh',
                dob: '2003-11-18',
                gender: 'Female',
                mobile: '9876543213',
                email: 'neha.singh@college.edu',
                address: '321 Oak Lane, Pune, India',
                course: 'B.Tech',
                branch: 'Mechanical',
                semester: '3',
                section: 'A',
                admissionYear: 2022,
                attendance: 78,
                marks: 6.9,
                photo: 'https://via.placeholder.com/150?text=Neha+Singh',
                createdAt: new Date(2023, 3, 25).toISOString()
            },
            {
                studentId: 'STU005',
                fullName: 'Arjun Reddy',
                fatherName: 'Rajesh Reddy',
                motherName: 'Sunita Reddy',
                dob: '2004-03-05',
                gender: 'Male',
                mobile: '9876543214',
                email: 'arjun.reddy@college.edu',
                address: '654 Elm Street, Hyderabad, India',
                course: 'B.Tech',
                branch: 'Civil',
                semester: '2',
                section: 'B',
                admissionYear: 2022,
                attendance: 85,
                marks: 7.3,
                photo: 'https://via.placeholder.com/150?text=Arjun+Reddy',
                createdAt: new Date(2023, 4, 12).toISOString()
            },
            {
                studentId: 'STU006',
                fullName: 'Divya Nair',
                fatherName: 'Ravi Nair',
                motherName: 'Sneha Nair',
                dob: '2003-09-14',
                gender: 'Female',
                mobile: '9876543215',
                email: 'divya.nair@college.edu',
                address: '987 Birch Road, Kochi, India',
                course: 'B.Tech',
                branch: 'Computer Science',
                semester: '5',
                section: 'C',
                admissionYear: 2021,
                attendance: 91,
                marks: 8.7,
                photo: 'https://via.placeholder.com/150?text=Divya+Nair',
                createdAt: new Date(2023, 5, 8).toISOString()
            },
            {
                studentId: 'STU007',
                fullName: 'Sanjay Verma',
                fatherName: 'Ashok Verma',
                motherName: 'Kavya Verma',
                dob: '2004-06-21',
                gender: 'Male',
                mobile: '9876543216',
                email: 'sanjay.verma@college.edu',
                address: '147 Maple Drive, Lucknow, India',
                course: 'B.Tech',
                branch: 'Information Technology',
                semester: '3',
                section: 'A',
                admissionYear: 2022,
                attendance: 72,
                marks: 6.1,
                photo: 'https://via.placeholder.com/150?text=Sanjay+Verma',
                createdAt: new Date(2023, 6, 3).toISOString()
            },
            {
                studentId: 'STU008',
                fullName: 'Zara Khan',
                fatherName: 'Amir Khan',
                motherName: 'Fatima Khan',
                dob: '2003-12-27',
                gender: 'Female',
                mobile: '9876543217',
                email: 'zara.khan@college.edu',
                address: '258 Cedar Street, Ahmedabad, India',
                course: 'B.Tech',
                branch: 'Electronics',
                semester: '6',
                section: 'B',
                admissionYear: 2021,
                attendance: 89,
                marks: 7.6,
                photo: 'https://via.placeholder.com/150?text=Zara+Khan',
                createdAt: new Date(2023, 7, 19).toISOString()
            },
            {
                studentId: 'STU009',
                fullName: 'Karan Desai',
                fatherName: 'Nitin Desai',
                motherName: 'Pooja Desai',
                dob: '2004-04-11',
                gender: 'Male',
                mobile: '9876543218',
                email: 'karan.desai@college.edu',
                address: '369 Spruce Lane, Surat, India',
                course: 'B.Tech',
                branch: 'Mechanical',
                semester: '4',
                section: 'C',
                admissionYear: 2022,
                attendance: 82,
                marks: 7.1,
                photo: 'https://via.placeholder.com/150?text=Karan+Desai',
                createdAt: new Date(2023, 8, 5).toISOString()
            },
            {
                studentId: 'STU010',
                fullName: 'Isha Gupta',
                fatherName: 'Rajeev Gupta',
                motherName: 'Neelam Gupta',
                dob: '2003-07-30',
                gender: 'Female',
                mobile: '9876543219',
                email: 'isha.gupta@college.edu',
                address: '741 Willow Street, Jaipur, India',
                course: 'B.Tech',
                branch: 'Civil',
                semester: '5',
                section: 'A',
                admissionYear: 2021,
                attendance: 94,
                marks: 8.4,
                photo: 'https://via.placeholder.com/150?text=Isha+Gupta',
                createdAt: new Date(2023, 9, 22).toISOString()
            }
        ];

        localStorage.setItem('students', JSON.stringify(sampleStudents));
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Format a date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Format a time ago string
 * @param {string} dateString - ISO date string
 * @returns {string} Time ago string (e.g., "2 days ago")
 */
function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
}

/**
 * Get all students from localStorage
 * @returns {array} Array of student objects
 */
function getAllStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
}

/**
 * Get a specific student by ID
 * @param {string} studentId - Student ID
 * @returns {object} Student object or null
 */
function getStudentById(studentId) {
    const students = getAllStudents();
    return students.find(s => s.studentId === studentId) || null;
}

/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth string
 * @returns {number} Age in years
 */
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * Get student status based on marks
 * @param {number} marks - Student marks/CGPA
 * @returns {string} 'Pass' or 'Fail'
 */
function getStudentStatus(marks) {
    return marks >= 5 ? 'Pass' : 'Fail';
}

/**
 * Get attendance status
 * @param {number} attendance - Attendance percentage
 * @returns {string} Status string
 */
function getAttendanceStatus(attendance) {
    if (attendance >= 90) return '✓ Excellent';
    if (attendance >= 75) return '✓ Good';
    if (attendance >= 60) return '⚠ Average';
    return '✗ Low';
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
function validatePhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

/**
 * Export data to CSV format
 * @param {array} data - Array of objects to export
 * @param {string} filename - Name of the exported file
 */
function exportToCSV(data, filename = 'export.csv') {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';

    // Add data rows
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in values
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        });
        csvContent += values.join(',') + '\n';
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Create a copy of an object (deep clone)
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Show a toast/notification message
 * @param {string} message - Message to show
 * @param {string} type - Type: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        background-color: ${getNotificationColor(type)};
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Get notification color based on type
 * @param {string} type - Notification type
 * @returns {string} Color value
 */
function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    return colors[type] || colors.info;
}

// ================================
// EXPORT FUNCTIONS
// ================================

// Make functions globally accessible for inline event handlers
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
window.formatDate = formatDate;
window.getAllStudents = getAllStudents;
window.getStudentById = getStudentById;
window.getStudentStatus = getStudentStatus;
window.getAttendanceStatus = getAttendanceStatus;
window.exportToCSV = exportToCSV;
window.showNotification = showNotification;
