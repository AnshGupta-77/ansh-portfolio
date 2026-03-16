// GSAP ScrollTrigger Animations
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
        if (typeof gsap !== 'undefined') {
            this.setupAnimations();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
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

        // Horizontal scroll for projects
        this.setupHorizontalScroll();

        // Animate skill bars
        this.animateSkillBars();

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
            this.setupMobileAnimations();
            return;
        }

        // Desktop animations with ScrollTrigger
        const sections = [
            '#about',
            '#skills', 
            '#projects',
            '#certifications',
            '#experience',
            '#contact'
        ];

        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
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
    }

    setupHorizontalScroll() {
        if (this.isMobile) return;

        const projectTrack = document.querySelector('.project-track');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        if (!projectTrack) return;

        let currentIndex = 0;
        const totalProjects = 3;

        // Update scroll position based on page scroll
        gsap.to(projectTrack, {
            x: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#projects',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    currentIndex = Math.floor(progress * (totalProjects - 1));
                    this.updateScrollDots(currentIndex, scrollDots);
                    
                    // Move track horizontally
                    gsap.set(projectTrack, {
                        x: -currentIndex * (352 + 32) // card width + gap
                    });
                }
            }
        });
    }

    updateScrollDots(index, dots) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.style.opacity = '1';
            } else {
                dot.style.opacity = '0.5';
            }
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            
            gsap.fromTo(bar,
                {
                    width: '0%'
                },
                {
                    width: targetWidth,
                    duration: 1,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: bar,
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
