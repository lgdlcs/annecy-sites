// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Mobile navigation
    initMobileNav();
    
    // Parallax effects
    initParallax();
    
    // Form handling
    initForm();
    
    // Scroll animations
    initScrollAnimations();
    
    // Enhanced interactions
    initEnhancedInteractions();
    
    // Performance optimizations
    initPerformanceOptimizations();
});

// Smooth Scroll Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile Navigation
function initMobileNav() {
    const burger = document.querySelector('.nav__burger');
    const navLinks = document.querySelector('.nav__links');
    const nav = document.querySelector('.nav');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('nav--open')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on resize if window becomes large
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav__links');
    const burger = document.querySelector('.nav__burger');
    
    navLinks.classList.toggle('nav--open');
    burger.classList.toggle('nav__burger--open');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('nav--open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav__links');
    const burger = document.querySelector('.nav__burger');
    
    navLinks.classList.remove('nav--open');
    burger.classList.remove('nav__burger--open');
    document.body.style.overflow = '';
}

// Parallax Effects
function initParallax() {
    const heroImage = document.querySelector('.hero__image');
    const organicShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Hero parallax
        if (heroImage) {
            heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
        }
        
        // Organic shapes parallax
        organicShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
        });
    }, 16));
}

// Form Handling
function initForm() {
    const form = document.querySelector('.contact__form');
    
    if (form) {
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Floating labels
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                updateFloatingLabel(this);
            });
            
            input.addEventListener('blur', function() {
                updateFloatingLabel(this);
            });
            
            // Initialize label position
            updateFloatingLabel(input);
        });
        
        // Phone number formatting
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                formatPhoneNumber(e.target);
            });
        }
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.service || !data.message) {
        showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // For demo purposes - in real implementation, send to server
        console.log('Form Data:', data);
        
        showFormMessage('Merci ! Votre demande a été envoyée. Je vous recontacte sous 24h.', 'success');
        form.reset();
        
        // Reset form labels
        form.querySelectorAll('input, textarea').forEach(input => {
            updateFloatingLabel(input);
        });
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    const form = document.querySelector('.contact__form');
    form.appendChild(messageElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

function updateFloatingLabel(input) {
    const label = input.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
        if (input.value.trim() !== '' || input === document.activeElement) {
            label.classList.add('label--float');
        } else {
            label.classList.remove('label--float');
        }
    }
}

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Format as French phone number
    if (value.length >= 2) {
        value = value.replace(/(\d{2})(?=\d)/g, '$1 ');
    }
    
    input.value = value.trim();
}

// Scroll Animations
function initScrollAnimations() {
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navigation background opacity
        if (scrollTop > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        
        // Hide/show nav on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16));
    
    // Reveal sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section--visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced Interactions
function initEnhancedInteractions() {
    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Service cards enhanced hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Review cards interaction
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('review-card--expanded');
        });
    });
    
    // Hero rating animation
    const stars = document.querySelector('.hero__rating .stars');
    if (stars) {
        animateStars(stars);
    }
    
    // Scroll to top functionality
    addScrollToTop();
}

function animateStars(starsElement) {
    const stars = starsElement.textContent.split('');
    starsElement.textContent = '';
    
    stars.forEach((star, index) => {
        const span = document.createElement('span');
        span.textContent = star;
        span.style.display = 'inline-block';
        span.style.animationDelay = `${index * 200}ms`;
        span.classList.add('star-animation');
        starsElement.appendChild(span);
    });
}

function addScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-top';
    scrollBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('scroll-top--visible');
        } else {
            scrollBtn.classList.remove('scroll-top--visible');
        }
    }, 100));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Additional CSS for enhanced interactions (injected dynamically)
const additionalStyles = `
    .nav {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .nav--scrolled {
        background: rgba(247, 245, 240, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(45, 90, 39, 0.1);
    }
    
    .nav__links--open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(247, 245, 240, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        gap: 1.5rem;
        border-top: 1px solid rgba(45, 90, 39, 0.1);
    }
    
    .nav__burger--open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav__burger--open span:nth-child(2) {
        opacity: 0;
    }
    
    .nav__burger--open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .section--visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .star-animation {
        animation: starPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }
    
    @keyframes starPop {
        0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.3) rotate(90deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    .review-card--expanded {
        transform: scale(1.02);
        z-index: 10;
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        font-weight: 500;
        animation: slideDown 0.3s ease-out;
    }
    
    .form-message--success {
        background: rgba(46, 125, 50, 0.1);
        border: 1px solid rgba(46, 125, 50, 0.3);
        color: #2e7d32;
    }
    
    .form-message--error {
        background: rgba(211, 47, 47, 0.1);
        border: 1px solid rgba(211, 47, 47, 0.3);
        color: #d32f2f;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-green);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .scroll-top--visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-top:hover {
        background: var(--forest-green);
        transform: translateY(-5px);
    }
    
    .label--float {
        top: -0.5rem !important;
        left: 0.5rem !important;
        font-size: var(--text-sm) !important;
        color: var(--gold) !important;
        background: var(--primary-green) !important;
        padding: 0 0.5rem !important;
        border-radius: 4px !important;
    }
    
    @media (max-width: 768px) {
        .nav__links {
            display: none;
        }
        
        .scroll-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg: Make organic shapes dance
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.animation = 'float 2s infinite ease-in-out, spin 3s infinite linear';
        });
        
        setTimeout(() => {
            shapes.forEach(shape => {
                shape.style.animation = 'float 20s infinite ease-in-out';
            });
        }, 10000);
        
        konamiCode = [];
    }
});

// Add spin animation for easter egg
const spinKeyframes = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
const spinStyle = document.createElement('style');
spinStyle.textContent = spinKeyframes;
document.head.appendChild(spinStyle);