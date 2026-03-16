// GSAP ScrollTrigger Animations
class ScrollAnimations {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        // Load GSAP and ScrollTrigger with error handling
        this.loadGSAP();
    }

    loadGSAP() {
        try {
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
                scrollTriggerScript.onerror = () => {
                    console.warn('Failed to load ScrollTrigger, using fallback animations');
                    this.setupFallbackAnimations();
                };
                document.head.appendChild(scrollTriggerScript);
            };
            script.onerror = () => {
                console.warn('Failed to load GSAP, using fallback animations');
                this.setupFallbackAnimations();
            };
            document.head.appendChild(script);
        } catch (error) {
            console.warn('Error loading GSAP:', error);
            this.setupFallbackAnimations();
        }
    }

    setupAnimations() {
        try {
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
        } catch (error) {
            console.warn('Error setting up animations:', error);
            this.setupFallbackAnimations();
        }
    }

    setupFallbackAnimations() {
        try {
            // Simple CSS-based animations if GSAP fails
            console.log('Using fallback animations');
            this.setupSimpleScrollAnimations();
        } catch (error) {
            console.warn('Error setting up fallback animations:', error);
        }
    }

    setupSimpleScrollAnimations() {
        // Simple intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe all animated elements
        document.querySelectorAll('.hero-animate, .skill-progress').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    animateHeroText() {
        try {
            const heroElements = document.querySelectorAll('.hero-animate');
            
            if (typeof gsap !== 'undefined') {
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
            } else {
                // Fallback CSS animation
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        } catch (error) {
            console.warn('Error animating hero text:', error);
        }
    }

    setupScrollAnimations() {
        try {
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
                if (element && typeof gsap !== 'undefined') {
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
        } catch (error) {
            console.warn('Error setting up scroll animations:', error);
        }
    }

    setupHorizontalScroll() {
        try {
            if (this.isMobile) return;

            const projectTrack = document.querySelector('.project-track');
            const scrollDots = document.querySelectorAll('.scroll-dot');
            if (!projectTrack) return;

            let currentIndex = 0;
            const totalProjects = 3;

            // Update scroll position based on page scroll
            if (typeof gsap !== 'undefined') {
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
        } catch (error) {
            console.warn('Error setting up horizontal scroll:', error);
        }
    }

    updateScrollDots(index, dots) {
        try {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.style.opacity = '1';
                } else {
                    dot.style.opacity = '0.5';
                }
            });
        } catch (error) {
            console.warn('Error updating scroll dots:', error);
        }
    }

    animateSkillBars() {
        try {
            const skillBars = document.querySelectorAll('.skill-bar');
            
            skillBars.forEach((bar, index) => {
                const targetWidth = bar.getAttribute('data-width');
                
                if (typeof gsap !== 'undefined') {
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
                } else {
                    // Fallback CSS animation
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    bar.style.width = targetWidth;
                                }, index * 100);
                            }
                        });
                    }, { threshold: 0.5 });
                    observer.observe(bar);
                }
            });
        } catch (error) {
            console.warn('Error animating skill bars:', error);
        }
    }

    setupMobileAnimations() {
        try {
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
        } catch (error) {
            console.warn('Error setting up mobile animations:', error);
        }
    }

    handleResize() {
        try {
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
        } catch (error) {
            console.warn('Error handling resize:', error);
        }
    }

    destroy() {
        try {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        } catch (error) {
            console.warn('Error destroying animations:', error);
        }
    }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.scrollAnimations = new ScrollAnimations();
    } catch (error) {
        console.warn('Error initializing scroll animations:', error);
    }
});
