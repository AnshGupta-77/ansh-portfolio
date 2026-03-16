// Enhanced Custom Cursor with Trailing Ring
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorRing = document.querySelector('.cursor-ring');
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
        this.cursorRing.style.left = e.clientX + 'px';
        this.cursorRing.style.top = e.clientY + 'px';
    }

    clickCursor() {
        this.cursor.classList.add('click');
        this.cursorRing.classList.add('click');
    }

    releaseCursor() {
        this.cursor.classList.remove('click');
        this.cursorRing.classList.remove('click');
    }

    addGlow() {
        this.cursor.classList.add('glow');
        this.cursorRing.classList.add('glow');
    }

    removeGlow() {
        this.cursor.classList.remove('glow');
        this.cursorRing.classList.remove('glow');
    }
}

// Enhanced Scroll Animations with Multiple Types
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

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
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

// Enhanced Project Hover Effects with Horizontal Scroll
class ProjectHoverEffects {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        this.setupHorizontalScroll();
        this.setupProjectHover();
    }

    setupHorizontalScroll() {
        const container = document.querySelector('.projects-container');
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }

    setupProjectHover() {
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

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations for better performance
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    try {
        new CustomCursor();
        new EnhancedScrollAnimations();
        new ProjectHoverEffects();
        new PerformanceOptimizer();
        console.log('Enhanced interactions initialized');
    } catch (error) {
        console.warn('Error initializing enhanced interactions:', error);
    }
});
