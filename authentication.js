document.addEventListener('DOMContentLoaded', function() {
    // Simulated user database
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            
            // Clear previous errors
            document.getElementById('emailError').textContent = '';
            document.getElementById('passwordError').textContent = '';
            
            // Email validation
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Password validation
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            if (isValid) {
                // Check if user exists
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Simulate successful login
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Login successful! Redirecting to dashboard...');
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('passwordError').textContent = 'Invalid email or password';
                }
            }
        });
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            let isValid = true;
            
            // Clear previous errors
            document.getElementById('nameError').textContent = '';
            document.getElementById('regEmailError').textContent = '';
            document.getElementById('regPasswordError').textContent = '';
            document.getElementById('confirmError').textContent = '';
            
            // Name validation
            if (!name) {
                document.getElementById('nameError').textContent = 'Full name is required';
                isValid = false;
            }
            
            // Email validation
            if (!email) {
                document.getElementById('regEmailError').textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('regEmailError').textContent = 'Please enter a valid email';
                isValid = false;
            } else if (users.some(u => u.email === email)) {
                document.getElementById('regEmailError').textContent = 'Email already registered';
                isValid = false;
            }
            
            // Password validation
            if (!password) {
                document.getElementById('regPasswordError').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            // Confirm password validation
            if (password !== confirmPassword) {
                document.getElementById('confirmError').textContent = 'Passwords do not match';
                isValid = false;
            }
            
            // Terms validation
            if (!agreeTerms) {
                alert('You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Create new user
                const newUser = {
                    id: Date.now(),
                    name,
                    email,
                    password // Note: In real app, never store plain passwords
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                
                alert('Registration successful! You are now logged in.');
                window.location.href = 'index.html';
            }
        });
    }
    
    // Check if user is logged in (for other pages)
    function checkAuth() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser && !['login.html', 'register.html'].includes(window.location.pathname.split('/').pop())) {
            window.location.href = 'login.html';
        }
    }
    
    // Uncomment to enable auth check on all pages
    // checkAuth();
});