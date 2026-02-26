// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(15, 15, 15, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });

    // Phone number click tracking (optional analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here if needed
            console.log('Phone number clicked:', this.href);
        });
    });

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Review cards hover effect enhancement
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mobile menu toggle (if needed for future enhancement)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const header = document.querySelector('.header .container');
        
        // Only create mobile menu if screen is small
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    color: #ff6b35;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                // Insert toggle button
                header.insertBefore(mobileToggle, nav);
                
                // Hide nav by default on mobile
                nav.style.display = 'none';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'rgba(15, 15, 15, 0.98)';
                nav.style.padding = '1rem';
                nav.style.flexDirection = 'column';
                nav.style.borderTop = '2px solid #333';
                
                mobileToggle.addEventListener('click', function() {
                    if (nav.style.display === 'none') {
                        nav.style.display = 'flex';
                        this.innerHTML = '✕';
                    } else {
                        nav.style.display = 'none';
                        this.innerHTML = '☰';
                    }
                });
                
                // Close menu when link is clicked
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        nav.style.display = 'none';
                        mobileToggle.innerHTML = '☰';
                    });
                });
            }
        }
    }

    // Initialize mobile menu
    createMobileMenu();
    
    // Reinitialize mobile menu on resize
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        createMobileMenu();
    });

    // Lazy loading for map iframe (performance optimization)
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Map is visible, ensure it's loaded
                    if (!mapIframe.src.includes('embed')) {
                        mapIframe.src = mapIframe.src;
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(mapIframe);
    }

    // Add click-to-call tracking for better UX
    function addCallButtonEffects() {
        const callButtons = document.querySelectorAll('a[href^="tel:"]');
        callButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add a subtle visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    addCallButtonEffects();

    // Performance: Debounced scroll handler
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

    // Replace the scroll event with debounced version
    window.removeEventListener('scroll', updateHeader);
    window.addEventListener('scroll', debounce(updateHeader, 10), { passive: true });

    console.log('Garage du Rhône website initialized successfully! 🚗🔧');
});