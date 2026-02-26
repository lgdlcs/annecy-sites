// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Custom Cursor
    initCustomCursor();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Navigation Scroll Effect
    initNavScrollEffect();
    
    // Parallax Effects
    initParallaxEffects();
    
    // Contact Form
    initContactForm();
    
    // Portfolio Hover Effects
    initPortfolioEffects();
    
    // Service Cards Animation
    initServiceCards();
    
    // Hero Title Animation
    initHeroAnimation();
});

// Custom Cursor Implementation
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollow = document.querySelector('.cursor-follow');
    
    if (!cursor || !cursorFollow) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followX = 0, followY = 0;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        // Main cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        // Follow cursor lags behind
        followX += (mouseX - followX) * 0.1;
        followY += (mouseY - followY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorFollow.style.transform = `translate(${followX - 20}px, ${followY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorFollow.style.transform += ' scale(1.2)';
            cursorFollow.style.border = '2px solid #ff6b35';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorFollow.style.transform = cursorFollow.style.transform.replace(' scale(1.2)', '');
            cursorFollow.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation Scroll Effect
function initNavScrollEffect() {
    const nav = document.querySelector('.nav-main');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(30px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Parallax Effects
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroImage.style.transform = `scale(1.1) translateY(${parallax}px)`;
        });
    }
    
    // Section parallax elements
    const parallaxElements = document.querySelectorAll('.section-title');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach((el, index) => {
            const elementTop = el.offsetTop;
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const elementHeight = el.offsetHeight;
            
            if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
                const parallax = (scrolled - elementTop + windowHeight) * 0.1;
                el.style.transform = `translateY(${parallax}px)`;
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Animate submit button
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message envoyé !</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #ff6b35, #ff8c42)';
                }, 3000);
            }, 2000);
        });
        
        // Input focus effects
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                input.parentNode.style.transform = 'translateY(0)';
            });
        });
    }
}

// Portfolio Hover Effects
function initPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            portfolioItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            portfolioItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
    });
}

// Service Cards Animation
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(255,107,53,0.3), transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.8s ease-out;
                pointer-events: none;
                z-index: -1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Hero Title Animation
function initHeroAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    // Stagger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                titleLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.animationPlayState = 'running';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (titleLines.length > 0) {
        observer.observe(titleLines[0].parentElement);
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Magnetic effect for buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-submit, .nav-links a');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// Text reveal effect
function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-subtitle, .review-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.innerHTML = '';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.animationDelay = `${index * 20}ms`;
                    span.style.animation = 'fadeInChar 0.8s ease forwards';
                    span.style.opacity = '0';
                    entry.target.appendChild(span);
                });
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => observer.observe(el));
    
    // Add CSS for character animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInChar {
            to {
                opacity: 1;
                transform: translateY(0);
            }
            from {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional effects
window.addEventListener('load', () => {
    initScrollAnimations();
    initMagneticEffect();
    initTextReveal();
    
    // Preloader effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Your scroll-based animations here
}, 16)); // ~60fps