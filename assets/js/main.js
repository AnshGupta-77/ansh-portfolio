// Custom Cursor and Enhanced Interactions
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        if (this.isMobile) return;

        document.addEventListener('mousemove', (e) => this.moveCursor(e));
        document.addEventListener('mousedown', () => this.clickCursor());
        document.addEventListener('mouseup', () => this.releaseCursor());
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .cert-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.addGlow());
            el.addEventListener('mouseleave', () => this.removeGlow());
        });
    }

    moveCursor(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
    }

    clickCursor() {
        this.cursor.classList.add('click');
    }

    releaseCursor() {
        this.cursor.classList.remove('click');
    }

    addGlow() {
        this.cursor.classList.add('glow');
    }

    removeGlow() {
        this.cursor.classList.remove('glow');
    }
}

// Enhanced Scroll Animations
class EnhancedScrollAnimations {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        if (this.isMobile) {
            // Disable heavy animations on mobile
            document.body.classList.add('mobile-optimized');
            return;
        }

        this.setupScrollReveal();
        this.setupSmoothScroll();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Project Hover Effects
class ProjectHoverEffects {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (this.isMobile) {
                // Simple touch effect for mobile
                card.addEventListener('touchstart', () => {
                    this.addMobileEffect(card);
                });
            } else {
                // Desktop hover effects
                card.addEventListener('mouseenter', () => {
                    this.addHoverEffect(card);
                });
                
                card.addEventListener('mouseleave', () => {
                    this.removeHoverEffect(card);
                });
            }
        });
    }

    addHoverEffect(card) {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        
        if (image) {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.4s ease';
        }
        
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transition = 'opacity 0.3s ease';
        }
    }

    removeHoverEffect(card) {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        
        if (image) {
            image.style.transform = 'scale(1)';
        }
        
        if (overlay) {
            overlay.style.opacity = '0';
        }
    }

    addMobileEffect(card) {
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                image.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Contact Section Glow Effects
class ContactGlowEffects {
    constructor() {
        this.init();
    }

    init() {
        const contactLinks = document.querySelectorAll('.contact-link');
        const resumeBtn = document.querySelector('.resume-btn');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.addGlowEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeGlowEffect(link);
            });
        });

        if (resumeBtn) {
            resumeBtn.addEventListener('mouseenter', () => {
                this.addGlowEffect(resumeBtn);
            });
            
            resumeBtn.addEventListener('mouseleave', () => {
                this.removeGlowEffect(resumeBtn);
            });
        }
    }

    addGlowEffect(element) {
        element.style.boxShadow = 'var(--shadow-glow)';
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'all 0.3s ease';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    try {
        new CustomCursor();
        new EnhancedScrollAnimations();
        new ProjectHoverEffects();
        new ContactGlowEffects();
        console.log('Enhanced interactions initialized');
    } catch (error) {
        console.warn('Error initializing enhanced interactions:', error);
    }
});
