// ===== DOM CONTENT LOADED ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSmoothScrolling();
    initContactForm();
    initPortfolioGallery();
});

// ===== NAVIGATION ===== //
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== SCROLL EFFECTS ===== //
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class to navbar
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScrollY = currentScrollY;
    });
}

// ===== UPDATE ACTIVE NAV LINK ===== //
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING ===== //
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FUNCTIONALITY ===== //
function initContactForm() {
    // Phone number formatting
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks (you can add analytics here)
            console.log('Phone number clicked:', this.href);
        });
    });

    // Add click tracking for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track button clicks (you can add analytics here)
            console.log('CTA button clicked:', this.textContent.trim());
            
            // Add a subtle feedback effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// ===== PORTFOLIO GALLERY ===== //
function initPortfolioGallery() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Future: Could open a modal with full-size images
            console.log('Portfolio item clicked');
        });
    });
}

// ===== UTILITY FUNCTIONS ===== //

// Throttle function for performance optimization
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for performance optimization
function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== //
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .review-card');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PERFORMANCE OPTIMIZATIONS ===== //

// Optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    // Handle scroll-based animations or effects here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ===== ACCESSIBILITY ENHANCEMENTS ===== //
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Add focus management for mobile menu
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu?.querySelectorAll('.nav-link');
    
    if (navLinks) {
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = index === 0 ? navLinks.length - 1 : index - 1;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== ERROR HANDLING ===== //
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== PRELOAD CRITICAL RESOURCES ===== //
function preloadCriticalResources() {
    // Preload fonts
    const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
    ];
    
    fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// ===== PAGE LOAD OPTIMIZATION ===== //
window.addEventListener('load', function() {
    // Remove loading states, initialize non-critical features
    document.body.classList.add('loaded');
    
    // Initialize intersection observer after page load for better performance
    if ('IntersectionObserver' in window) {
        initIntersectionObserver();
    }
    
    // Initialize other non-critical features
    setTimeout(() => {
        preloadCriticalResources();
    }, 1000);
});

// ===== MODERN FEATURES WITH FALLBACKS ===== //

// Service Worker registration (if you add one later)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add viewport meta tag adjustments for better mobile experience
function adjustViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Prevent zoom on iPhone when focusing inputs
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }
}

adjustViewport();

// ===== ANALYTICS PLACEHOLDER ===== //
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    // Replace with your preferred analytics solution (GA, Mixpanel, etc.)
    console.log('Event tracked:', eventName, eventData);
}

// Example usage:
// trackEvent('cta_clicked', { button: 'devis_gratuit', location: 'hero' });

// ===== EXPORT FOR TESTING ===== //
// If you need to test functions, you can export them
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        trackEvent
    };
}