// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Phone number click tracking (for analytics if needed)
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        // Track phone clicks if analytics is implemented
        console.log('Phone number clicked:', this.getAttribute('href'));
        
        // Optional: Add Google Analytics event tracking
        // gtag('event', 'phone_call', {
        //     'event_category': 'contact',
        //     'event_label': 'header_phone'
        // });
    });
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation for Google Maps iframe
document.addEventListener('DOMContentLoaded', function() {
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease-in-out';
        });
        
        // Set initial opacity
        mapIframe.style.opacity = '0';
    }
});

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special animation for stats
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Observe stat numbers for counting animation
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Number counting animation
function animateNumber(element) {
    const finalNumber = element.textContent;
    const isDecimal = finalNumber.includes('.');
    const duration = 2000;
    const increment = isDecimal ? parseFloat(finalNumber) / 100 : parseInt(finalNumber) / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= parseFloat(finalNumber)) {
            element.textContent = finalNumber;
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
    }, duration / 100);
}

// Add floating animation to hero features
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
        feature.classList.add('floating');
    });
});

// CSS for floating animation (added dynamically)
const style = document.createElement('style');
style.textContent = `
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    .stat-number {
        transition: all 0.3s ease;
    }
    
    .visible .stat-number {
        transform: scale(1.1);
        color: #f1c40f;
    }
`;

document.head.appendChild(style);

// Add click-to-call functionality with user feedback
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function(e) {
        // Show a brief visual feedback
        const originalText = this.textContent;
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // For desktop users, show the phone number briefly
        if (window.innerWidth > 768) {
            const isPhoneClickable = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (!isPhoneClickable) {
                e.preventDefault();
                alert(`Appelez-nous au ${this.textContent.trim()}`);
            }
        }
    });
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}