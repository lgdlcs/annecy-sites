// DB Paysages - Les Fleurs du Bien
// JavaScript pour l'interactivité du site

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 50
    });

    // Navigation mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Fermer le menu mobile quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Navigation sticky avec effet de transparence
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(248, 255, 254, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(74, 124, 89, 0.1)';
        } else {
            navbar.style.background = 'rgba(248, 255, 254, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Cacher la navbar quand on scroll vers le bas (optionnel)
        // if (scrollTop > lastScrollTop && scrollTop > 200) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Hauteur de la navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                closeMobileMenu();
            }
        });
    });

    // Highlight du lien de navigation actuel
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);

    function highlightCurrentSection() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightCurrentSection);

    // Animation des compteurs dans les stats du hero
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            
            stats.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('5.0★')) {
                    animateRating(stat);
                } else if (text.includes('100%')) {
                    animatePercentage(stat);
                }
            });
        }
    }

    function animateRating(element) {
        let current = 0;
        const target = 5.0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + '★';
        }, 20);
    }

    function animatePercentage(element) {
        let current = 0;
        const target = 100;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, 20);
    }

    window.addEventListener('scroll', animateStats);

    // Parallax effect léger pour le hero
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent && heroImage && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
        }
    });

    // Animation de typing pour le titre principal (optionnel)
    function typeWriterEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Lazy loading pour les iframes (Google Maps)
    const iframe = document.querySelector('iframe');
    if (iframe) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'iframe est déjà chargée dans le HTML, on pourrait ajouter
                    // un loading différé ici si nécessaire
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(iframe);
    }

    // Gestion des erreurs pour le chargement des images
    const placeholderSvgs = document.querySelectorAll('.image-placeholder svg');
    
    placeholderSvgs.forEach(svg => {
        // Ajouter des animations subtiles aux SVG placeholders
        svg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        svg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Fonction utilitaire pour debounce
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

    // Optimisation du scroll avec debounce
    const debouncedScroll = debounce(() => {
        highlightCurrentSection();
        animateStats();
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Easter egg : animation spéciale quand on clique plusieurs fois sur le logo
    let clickCount = 0;
    const logo = document.querySelector('.nav-brand');
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                // Animation "fleurs qui poussent"
                document.body.style.animation = 'flowerGrow 2s ease-in-out';
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    clickCount = 0;
                }, 2000);
            }
        });
    }

    // Animation CSS pour l'easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flowerGrow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg) brightness(1.2); }
            50% { filter: hue-rotate(180deg) brightness(1.4); }
            75% { filter: hue-rotate(270deg) brightness(1.2); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .nav-menu a.active {
            color: var(--primary-green);
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Préchargement des polices pour éviter le FOIT
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 16px "Inter"'),
            document.fonts.load('700 16px "Playfair Display"')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }

    // Gestion de la performance : réduire les animations si demandé par l'utilisateur
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Désactiver les animations pour les utilisateurs qui préfèrent moins de mouvement
        AOS.init({
            duration: 0,
            easing: 'linear',
            once: true,
            offset: 0
        });
    }

    console.log('🌿 DB Paysages - Les Fleurs du Bien | Site chargé avec succès');
});

// Service Worker pour le cache (optionnel, pour une version PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Enregistrement du service worker commenté pour le moment
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Fonction utilitaire pour logger les interactions (pour analytics futur)
function trackInteraction(action, element) {
    // Placeholder pour Google Analytics ou autre système de tracking
    console.log(`Interaction: ${action} sur ${element}`);
    
    // Exemple d'usage :
    // gtag('event', action, {
    //     'event_category': 'engagement',
    //     'event_label': element
    // });
}

// Ajouter le tracking aux boutons CTA
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        trackInteraction('click_cta', this.textContent.trim());
    });
});

// Tracking des clics sur les liens de contact
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        trackInteraction('contact_click', this.getAttribute('href'));
    });
});