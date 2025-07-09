// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Generate initial consumer ID
    document.getElementById('consumer-id').value = generateConsumerId();
    
    // Set login view content
    updateQuoteSection('login');
    
    // Initialize floating elements animation
    initFloatingElements();
});

// Generate a random 13-digit consumer ID
function generateConsumerId() {
    return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
}

// Update left section content based on active tab
function updateQuoteSection(tab) {
    const quoteSection = document.getElementById('quote-section');
    const quoteTitle = document.getElementById('quote-title');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const features = document.getElementById('features');
    
    if (tab === 'register') {
        // Registration view content
        quoteTitle.textContent = "Join Our Power Community";
        quoteText.textContent = "Register now to access your electricity account online, view consumption history, pay bills instantly, and report issues with just a few clicks.";
        quoteAuthor.textContent = "- PowerGrid Solutions Team";
        
        // Update features for registration
        features.innerHTML = `
            <div class="feature">
                <div class="feature-icon">🔐</div>
                <div>Secure Account Management</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💡</div>
                <div>Energy Usage Analytics</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💰</div>
                <div>Instant Bill Payments</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🛠️</div>
                <div>Quick Service Requests</div>
            </div>
        `;
        
        // Change background for registration view
        quoteSection.style.background = "linear-gradient(90deg, #4da6ff, #006994);";
    } else {
        // Login view content
        quoteTitle.textContent = "Empowering Communities, Energizing Lives";
        quoteText.textContent = "Electricity is the modern magic that lights our homes, powers our industries, and connects our world. We are committed to delivering this essential service reliably and sustainably.";
        quoteAuthor.textContent = "- Thomas Edison, Electrical Innovator";
        
        // Update features for login
        features.innerHTML = `
            <div class="feature">
                <div class="feature-icon">⚡</div>
                <div>24/7 Reliable Power Supply</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🛡️</div>
                <div>Advanced Safety Systems</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🌿</div>
                <div>Sustainable Energy Solutions</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📞</div>
                <div>24/7 Customer Support</div>
            </div>
        `;
        
        // Revert background to original
        quoteSection.style.background = "linear-gradient(135deg, #4da6ff, #006994)";
    }
}

// Show active tab
function showTab(tabName) {
    // Update left section content
    updateQuoteSection(tabName);
    
    // Hide all pages
    document.querySelectorAll('.form-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Reset active tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the requested tab
    if(tabName === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('login-tab').classList.add('active');
    } else if(tabName === 'register') {
        document.getElementById('register-form').classList.add('active');
        document.getElementById('register-tab').classList.add('active');
        // Generate new ID for each registration
        document.getElementById('consumer-id').value = generateConsumerId();
    }
    
    // Always hide success page when switching tabs
    document.getElementById('success-page').classList.remove('active');
}

// Reset login form
function resetLoginForm() {
    document.getElementById('login-userid').value = '';
    document.getElementById('login-password').value = '';
    hideErrors();
}

// Reset registration form
function resetRegistrationForm() {
    document.getElementById('bill-number').value = '';
    document.getElementById('title').value = '';
    document.getElementById('customer-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('user-id').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    hideErrors();
    // Generate new ID when resetting
    document.getElementById('consumer-id').value = generateConsumerId();
}

// Hide all error messages
function hideErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
}

// Show specific error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    return false;
}

// Validate registration form
function validateRegistration() {
    hideErrors();
    let isValid = true;
    
    // Bill number validation (5 digits)
    const billNumber = document.getElementById('bill-number').value;
    if(!billNumber || billNumber.length !== 5 || isNaN(billNumber)) {
        isValid = showError('bill-number-error', 'Please enter a valid 5-digit bill number');
    }
    
    // Title validation
    const title = document.getElementById('title').value;
    if(!title) {
        isValid = showError('title-error', 'Please select a title');
    }
    
    // Customer name validation
    const customerName = document.getElementById('customer-name').value;
    if(!customerName || customerName.length > 50) {
        isValid = showError('customer-name-error', 'Name is required (max 50 characters)');
    }
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)) {
        isValid = showError('email-error', 'Please enter a valid email address');
    }
    
    // Mobile validation
    const mobile = document.getElementById('mobile').value;
    if(!mobile || mobile.length !== 10 || isNaN(mobile)) {
        isValid = showError('mobile-error', 'Please enter a valid 10-digit mobile number');
    }
    
    // User ID validation
    const userId = document.getElementById('user-id').value;
    if(!userId || userId.length < 5 || userId.length > 20) {
        isValid = showError('user-id-error', 'User ID must be 5-20 characters');
    }
    
    // Password validation
    const password = document.getElementById('password').value;
    if(!password || password.length > 30) {
        isValid = showError('password-error', 'Password is required (max 30 characters)');
    }
    
    // Confirm password validation
    const confirmPassword = document.getElementById('confirm-password').value;
    if(password !== confirmPassword) {
        isValid = showError('confirm-password-error', 'Passwords do not match');
    }
    
    return isValid;
}

// Register new consumer
function register() {
    if(!validateRegistration()) return;
    
    // Get form values
    const consumerId = document.getElementById('consumer-id').value;
    const billNumber = document.getElementById('bill-number').value;
    const title = document.getElementById('title').value;
    const customerName = document.getElementById('customer-name').value;
    const email = document.getElementById('email').value;
    const countryCode = document.getElementById('country-code').value;
    const mobile = document.getElementById('mobile').value;
    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    
    // Create consumer object
    const consumer = {
        consumerId,
        billNumber,
        title,
        customerName,
        email,
        mobile: countryCode + mobile,
        userId,
        password
    };
    
    // Save to local storage
    saveConsumer(consumer);
    
    // Show success page
    showSuccessPage(consumer);
}

// Save consumer to local storage
function saveConsumer(consumer) {
    let consumers = JSON.parse(localStorage.getItem('consumers')) || [];
    consumers.push(consumer);
    localStorage.setItem('consumers', JSON.stringify(consumers));
}

// Show success page
function showSuccessPage(consumer) {
    // Hide all other pages
    document.querySelectorAll('.form-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Set success details
    document.getElementById('success-consumer-id').textContent = consumer.consumerId;
    document.getElementById('success-name').textContent = consumer.customerName;
    document.getElementById('success-mobile').textContent = consumer.mobile;
    
    // Show success page
    document.getElementById('success-page').classList.add('active');
}

// Login functionality
function login() {
    hideErrors();
    
    const userId = document.getElementById('login-userid').value;
    const password = document.getElementById('login-password').value;
    
    if(!userId) {
        showError('login-userid-error', 'User ID is required');
        return;
    }
    
    if(!password) {
        showError('login-password-error', 'Password is required');
        return;
    }
    
    const consumers = JSON.parse(localStorage.getItem('consumers')) || [];
    const consumer = consumers.find(c => c.userId === userId && c.password === password);
    
    if(consumer) {
        alert(`🔌 Welcome back, ${consumer.customerName}!`);
        resetLoginForm();
    } else {
        showError('login-password-error', 'Invalid User ID or Password');
    }
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    
    const sizes = [80, 120, 60, 100];
    const positions = [
        { top: '10%', left: '5%' },
        { top: '70%', left: '80%' },
        { top: '40%', left: '90%' },
        { top: '80%', left: '15%' }
    ];
    
    sizes.forEach((size, index) => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = positions[index].top;
        element.style.left = positions[index].left;
        element.style.animationDuration = `${15 + index * 3}s`;
        element.style.animationDelay = `${index * 2}s`;
        floatingContainer.appendChild(element);
    });
    
    document.body.appendChild(floatingContainer);
}