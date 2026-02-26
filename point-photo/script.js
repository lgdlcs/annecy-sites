// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile' // Disable on mobile for performance
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// Toggle mobile navigation
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileNav();
    }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Portfolio Image Loading Optimization
function optimizePortfolioImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.style.opacity = '1';
                };
                tempImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    portfolioItems.forEach(img => {
        imageObserver.observe(img);
    });
}

// Call image optimization when DOM is loaded
document.addEventListener('DOMContentLoaded', optimizePortfolioImages);

// Contact Form Enhancement (if needed later)
function enhanceContactSection() {
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const mapIframe = document.querySelector('.contact-map iframe');
    
    // Add click tracking for phone number (analytics ready)
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            // Analytics tracking can be added here
            console.log('Phone number clicked');
        });
    }
    
    // Lazy load map iframe for better performance
    if (mapIframe) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (!iframe.src) {
                        iframe.src = iframe.dataset.src;
                    }
                    mapObserver.unobserve(iframe);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        // Store original src in data attribute and remove src for lazy loading
        if (mapIframe.src) {
            mapIframe.dataset.src = mapIframe.src;
            mapIframe.src = '';
        }
        
        mapObserver.observe(mapIframe);
    }
}

document.addEventListener('DOMContentLoaded', enhanceContactSection);

// Scroll to Top Functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--accent-gold);
        color: var(--bg-primary);
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    function toggleScrollTopBtn() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'scale(0.8)';
        }
    }
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.background = 'var(--accent-hover)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.background = 'var(--accent-gold)';
        this.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', toggleScrollTopBtn);
}

document.addEventListener('DOMContentLoaded', addScrollToTop);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedNavUpdate = debounce(updateNavbarOnScroll, 10);
const debouncedActiveLink = debounce(updateActiveNavLink, 10);

window.removeEventListener('scroll', updateNavbarOnScroll);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedNavUpdate);
window.addEventListener('scroll', debouncedActiveLink);

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Close mobile nav with Escape key
    if (e.key === 'Escape') {
        closeMobileNav();
    }
    
    // Navigate through sections with arrow keys (when focused)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let targetIndex;
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetIndex = currentIndex + 1;
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            }
            
            if (targetIndex !== undefined) {
                const targetSection = sections[targetIndex];
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                e.preventDefault();
            }
        }
    }
});

// Add loading state management
window.addEventListener('load', function() {
    // Hide any loading indicators
    document.body.classList.add('loaded');
    
    // Refresh AOS to ensure all animations work properly
    AOS.refresh();
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Console welcome message
console.log(`
🎯 Point Photo Website
📍 Studio professionnel à Annecy
⭐ 4.7/5 sur 60 avis clients
📞 04 50 51 65 02

Built with ❤️ using vanilla HTML/CSS/JS + AOS animations
`);