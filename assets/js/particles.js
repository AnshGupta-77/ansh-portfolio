// tsParticles configuration for hero section
class ParticlesBackground {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        // Don't initialize on mobile devices
        if (this.isMobile) {
            console.log('Particles disabled on mobile for performance');
            return;
        }

        // Load tsParticles from CDN
        this.loadTsParticles();
    }

    loadTsParticles() {
        if (typeof tsParticles !== 'undefined') {
            this.setupParticles();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tsparticles-slim@2.12.0/tsparticles.slim.bundle.min.js';
        script.onload = () => {
            this.setupParticles();
        };
        document.head.appendChild(script);
    }

    setupParticles() {
        const heroSection = document.querySelector('#hero');
        if (!heroSection) return;

        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'tsparticles';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '1';
        
        heroSection.insertBefore(particlesContainer, heroSection.firstChild);

        // Initialize tsParticles
        tsParticles.load('tsparticles', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#3b82f6" // Blue color matching theme
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#3b82f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 768;
            if (this.isMobile) {
                const particles = document.getElementById('tsparticles');
                if (particles) {
                    particles.remove();
                }
            } else {
                this.setupParticles();
            }
        });
    }

    destroy() {
        const particles = document.getElementById('tsparticles');
        if (particles) {
            particles.remove();
        }
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.particlesBackground = new ParticlesBackground();
});
