// ScrollAnimations.js - GSAP ScrollTrigger Animations
class ScrollAnimations {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        // Load GSAP and ScrollTrigger
        this.loadGSAP();
    }

    loadGSAP() {
        // Check if GSAP is already loaded
        if (typeof gsap !== 'undefined') {
            this.setupAnimations();
            return;
        }

        // Load GSAP from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            // Load ScrollTrigger
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.onload = () => {
                this.setupAnimations();
            };
            document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(script);
    }

    setupAnimations() {
        // Hero text animation on page load
        this.animateHeroText();

        // Scroll-triggered animations for sections
        this.setupScrollAnimations();

        // Handle resize
        this.handleResize();
    }

    animateHeroText() {
        const heroElements = document.querySelectorAll('.hero-animate');
        
        gsap.fromTo(heroElements, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                delay: 0.3
            }
        );
    }

    setupScrollAnimations() {
        if (this.isMobile) {
            // Simple fade animations for mobile
            this.setupMobileAnimations();
            return;
        }

        // Desktop animations with ScrollTrigger
        const sections = [
            '#about',
            '#skills', 
            '#projects',
            '#education',
            '#experience',
            '#certifications',
            '#contact'
        ];

        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // Add animation class
                element.classList.add('scroll-animate', 'gpu-accelerated');

                gsap.fromTo(element,
                    {
                        opacity: 0,
                        y: 40
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none none',
                            once: true
                        }
                    }
                );
            }
        });

        // Animate project cards individually
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('scroll-animate', 'gpu-accelerated');
            
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });
    }

    setupMobileAnimations() {
        // Simple fade animations for mobile
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.4s ease-in-out';
            observer.observe(section);
        });
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth < 768;
                
                // Refresh ScrollTrigger on resize
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 250);
        });
    }

    destroy() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new ScrollAnimations();
});
