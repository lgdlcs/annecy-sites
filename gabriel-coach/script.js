// Gabriel Coach Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        mirror: false
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 70; // Height of fixed navigation
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add/remove background based on scroll position
        if (scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        }
        
        // Hide/show navbar on scroll direction (optional)
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    }
    
    // Throttled scroll event
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Active navigation link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Animate numbers on scroll (for statistics)
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        
        numbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/[^0-9]/g, ''));
            let current = 0;
            const increment = target / 50; // Adjust speed here
            const isVisible = isElementInViewport(number);
            
            if (isVisible && !number.classList.contains('animated')) {
                number.classList.add('animated');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Preserve original formatting (stars, percentage, etc.)
                    const originalText = number.textContent;
                    const suffix = originalText.replace(/^[0-9\.]+/, '');
                    number.textContent = Math.floor(current) + suffix;
                }, 50);
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Throttled scroll event for number animation
    let numberAnimationTicking = false;
    function handleNumberAnimation() {
        if (!numberAnimationTicking) {
            requestAnimationFrame(animateNumbers);
            numberAnimationTicking = true;
            setTimeout(() => { numberAnimationTicking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', handleNumberAnimation);
    
    // Contact form interaction (if form is added later)
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add form submission logic here
                showNotification('Message envoyé avec succès !', 'success');
            });
        }
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Phone number click tracking (analytics placeholder)
    function trackPhoneClick() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Analytics tracking code would go here
                console.log('Phone number clicked:', this.href);
            });
        });
    }
    
    // Map interaction
    function initMap() {
        const mapContainer = document.querySelector('.contact-map');
        const mapOverlay = document.querySelector('.map-overlay');
        
        if (mapContainer && mapOverlay) {
            mapContainer.addEventListener('click', function() {
                // Optional: Open map in new window or show full-screen map
                window.open('https://www.google.com/maps/search/Gabriel+Coach+annecy', '_blank');
            });
            
            mapOverlay.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering parent click
            });
        }
    }
    
    // Testimonials carousel (if needed in future)
    function initTestimonialCarousel() {
        const testimonials = document.querySelector('.testimonials-grid');
        if (testimonials && testimonials.children.length > 3) {
            // Add carousel functionality here if needed
            console.log('Testimonial carousel can be initialized');
        }
    }
    
    // Service cards hover effects enhancement
    function enhanceServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle animation or effect
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Scroll to top button (optional)
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-medium);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Performance optimization: Lazy load images if added
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('fade-in');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('fade-in');
            });
        }
    }
    
    // Initialize all features
    initContactForm();
    trackPhoneClick();
    initMap();
    initTestimonialCarousel();
    enhanceServiceCards();
    createScrollToTopButton();
    initLazyLoading();
    
    // Initial calls
    highlightActiveSection();
    animateNumbers();
    
    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Focus management for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    // Console message for developers
    console.log('🏋️ Gabriel Coach Website loaded successfully!');
    console.log('💪 Ready to help clients transform their lives.');
    
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if user prefers reduced motion
    prefersReducedMotion: function() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// Export utils for potential future use
window.GabrielCoachUtils = utils;