// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Simple validation
        const name = this.querySelector('input[type="text"]').value.trim();
        const phone = this.querySelector('input[type="tel"]').value.trim();
        const projectType = this.querySelector('select').value;
        
        if (!name || !phone || !projectType) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Phone validation (French format)
        const phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
        if (!phoneRegex.test(phone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Create email subject and body
            const subject = `Demande de devis - ${projectType}`;
            const body = `Bonjour,\n\nJe souhaite obtenir un devis pour :\n\n` +
                        `Nom : ${name}\n` +
                        `Téléphone : ${phone}\n` +
                        `Email : ${this.querySelector('input[type="email"]').value || 'Non renseigné'}\n` +
                        `Type de projet : ${projectType}\n` +
                        `Description : ${this.querySelector('textarea').value || 'Non renseignée'}\n\n` +
                        `Merci de me recontacter pour convenir d'un rendez-vous.\n\n` +
                        `Cordialement`;
            
            // Open email client or show success message
            const emailLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = emailLink;
            
            // Show success message
            alert('Votre demande a été préparée. Votre client email va s\'ouvrir pour envoyer le message.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h4').textContent;
        const description = overlay.querySelector('p').textContent;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxContent = document.createElement('div');
        lightboxContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: calc(100% - 60px);
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        
        const lightboxText = document.createElement('div');
        lightboxText.style.cssText = `
            color: white;
            margin-top: 1rem;
        `;
        lightboxText.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        lightboxContent.appendChild(lightboxImg);
        lightboxContent.appendChild(lightboxText);
        lightbox.appendChild(lightboxContent);
        
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    });
});

// Add mobile menu styles if not already present
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: start;
            padding: 2rem;
            transition: right 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-links a {
            padding: 1rem 0;
            border-bottom: 1px solid #e9ecef;
            width: 100%;
            text-align: center;
            font-size: 1.1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    }
    
    .header {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add click to call tracking for analytics (placeholder)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone call initiated:', this.href);
        // Add analytics tracking here if needed
    });
});

// Intersection Observer for counting animation (reviews section)
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const ratingElement = entry.target.querySelector('.rating-display span');
            if (ratingElement && !ratingElement.classList.contains('animated')) {
                ratingElement.classList.add('animated');
                animateRating(ratingElement);
            }
        }
    });
}, observerOptions);

const reviewsSection = document.querySelector('.reviews .section-header');
if (reviewsSection) {
    observer.observe(reviewsSection);
}

function animateRating(element) {
    const finalText = element.textContent;
    const match = finalText.match(/(\d+\.?\d*)/);
    if (match) {
        const finalNumber = parseFloat(match[1]);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = finalText.replace(/\d+\.?\d*/, currentNumber.toFixed(1));
        }, 30);
    }
}

// Add some interactive micro-animations
document.querySelectorAll('.service-card, .review-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (simple implementation)
const images = document.querySelectorAll('img[src*="picsum"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            const newImg = new Image();
            newImg.onload = function() {
                img.style.opacity = '1';
            };
            newImg.src = img.src;
            
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

console.log('DOD Peinture website loaded successfully! 🎨');