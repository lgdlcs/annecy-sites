// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-menu-open');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 21, 18, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(26, 21, 18, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Gallery lightbox effect (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });

    // Contact form enhancement (if needed in future)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call clicks (for analytics if needed)
            console.log('Phone call initiated: ' + this.href);
        });
    });

    // Intersection Observer for counting animation
    const summaryNumbers = document.querySelectorAll('.summary-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateNumber(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    summaryNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // Performance: Lazy load images (if needed)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Create simple lightbox
function createLightbox(src, alt) {
    // Check if lightbox already exists
    if (document.querySelector('.lightbox')) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        </div>
    `;

    // Add lightbox styles
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: lightboxFadeIn 0.3s ease;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            cursor: pointer;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            z-index: 10001;
        }
        
        .lightbox img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            border: none;
            background: rgba(212, 175, 55, 0.9);
            color: white;
            font-size: 24px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            background: rgba(212, 175, 55, 1);
            transform: scale(1.1);
        }
        
        @keyframes lightboxFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes lightboxFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('#lightbox-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'lightbox-styles';
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(lightbox);

    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    function closeLightbox() {
        lightbox.style.animation = 'lightboxFadeOut 0.3s ease';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Animate numbers
function animateNumber(element) {
    const finalNumber = parseFloat(element.textContent.replace(/[^\d.]/g, ''));
    const suffix = element.textContent.replace(/[\d.]/g, '');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentNumber = Math.floor(finalNumber * easedProgress);
        
        if (suffix.includes('%')) {
            element.textContent = currentNumber + '%';
        } else if (finalNumber % 1 !== 0) {
            // Has decimal places
            element.textContent = (finalNumber * easedProgress).toFixed(1);
        } else {
            element.textContent = currentNumber + suffix.replace(/\d/g, '');
        }

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = finalNumber + suffix.replace(/[\d.]/g, '');
        }
    }

    requestAnimationFrame(updateNumber);
}

// Mobile menu styles
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: rgba(26, 21, 18, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    
    .nav-menu.nav-menu-open {
        display: flex;
        transform: translateX(0);
    }
    
    .nav-menu .nav-link {
        font-size: 1.2rem;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(139, 90, 60, 0.2);
        width: 200px;
        text-align: center;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Add mobile menu styles
const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyleSheet);

// Disable right-click on images (optional, for a more professional feel)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Console log for debugging (remove in production)
console.log('Y Menuiserie Annecy - Website loaded successfully! 🪚🏠');