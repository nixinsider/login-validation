$(function() {
    const loginForm = $('#loginForm');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const rememberMeCheckbox = $('#rememberMe');
    const loginBtn = $('.login-btn');

    // Add input focus effects
    const inputs = $('.custom-input');
    inputs.on('focus', function() {
        $(this).parent().addClass('focused');
    });

    inputs.on('blur', function() {
        $(this).parent().removeClass('focused');
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        // Reset previous error states
        usernameInput.removeClass('is-invalid');
        passwordInput.removeClass('is-invalid');

        // Validate username
        if (username === '') {
            usernameInput.addClass('is-invalid');
            isValid = false;
        }

        // Validate password
        if (password === '') {
            passwordInput.addClass('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    loginForm.on('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'https://dummyjson.com/auth/login',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                console.log('Login successful');
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log('Login failed');
                console.log(xhr.responseText);
            }
        });

    });
    
    // Add CSS animations for messages
    const style = $('<style>');
    style.text(`
        .custom-input.is-invalid {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }

        .input-group.focused .input-icon {
            color: #ff6b9d !important;
        }
    `);
    $('head').append(style);

    // Handle "forgot password" link
    $('.forgot-password').on('click', function(e) {
        e.preventDefault();
    });

    // Handle "create account" link
    $('.create-account').on('click', function(e) {
        e.preventDefault();
    });

    // Add subtle parallax effect to background elements
    $(document).on('mousemove', function(e) {
        const mouseX = e.clientX / $(window).width();
        const mouseY = e.clientY / $(window).height();

        const stars = $('.stars');
        const mountains = $('.mountains');
        const planet = $('.planet');

        if (stars.length) {
            stars.css('transform', `translate(${mouseX * 10}px, ${mouseY * 10}px)`);
        }

        if (mountains.length) {
            mountains.css('transform', `translateX(${mouseX * 5}px)`);
        }

        if (planet.length) {
            planet.css('transform', `translate(${mouseX * 3}px, ${mouseY * 3}px)`);
        }
    });

    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'Enter' && $(document.activeElement).prop('tagName') !== 'BUTTON') {
            const nextInput = getNextInput($(document.activeElement));
            if (nextInput.length) {
                nextInput.focus();
            } else {
                loginBtn.trigger('click');
            }
        }
    });

    function getNextInput(currentElement) {
        const inputs = $('input[type="text"], input[type="password"]');
        const currentIndex = inputs.index(currentElement);
        return inputs.eq(currentIndex + 1);
    }
});

