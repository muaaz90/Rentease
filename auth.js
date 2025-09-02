// Authentication functionality for login and register pages

// Check if user is on login or register page
const currentPage = window.location.pathname.split('/').pop();

// Login form handling
if (currentPage === 'login.html') {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
      showAlert('Please fill in all fields', 'danger');
      return;
    }
    
    // Simulate login process
    showAlert('Login successful! Redirecting...', 'success');
    
    // Store user session (in a real app, this would be handled by backend)
    if (rememberMe) {
      localStorage.setItem('userEmail', email);
    }
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    
    // Redirect to home page after 1.5 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

// Register form handling
if (currentPage === 'register.html') {
  const registerForm = document.getElementById('registerForm');
  
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !userType) {
      showAlert('Please fill in all fields', 'danger');
      return;
    }
    
    if (password.length < 8) {
      showAlert('Password must be at least 8 characters long', 'danger');
      return;
    }
    
    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'danger');
      return;
    }
    
    if (!agreeTerms) {
      showAlert('Please agree to the terms and conditions', 'danger');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address', 'danger');
      return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      showAlert('Please enter a valid phone number', 'danger');
      return;
    }
    
    // Simulate registration process
    showAlert('Registration successful! Redirecting to login...', 'success');
    
    // Store user data (in a real app, this would be sent to backend)
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      userType,
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
}

// Function to show alert messages
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Insert alert at the top of the form
  const form = document.querySelector('form');
  form.insertBefore(alertDiv, form.firstChild);
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Check if user is already logged in and redirect accordingly
function checkAuthStatus() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
  
  if (currentPage === 'login.html' || currentPage === 'register.html') {
    if (isLoggedIn && userEmail) {
      // User is already logged in, redirect to home
      window.location.href = 'index.html';
    }
  }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);
