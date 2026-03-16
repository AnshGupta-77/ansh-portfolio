// Particles.js - Hero Section Animated Background
class ParticlesBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        // Don't initialize on mobile devices
        if (this.isMobile) {
            console.log('Particles disabled on mobile for performance');
            return;
        }

        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.id = 'particles-js';
        
        const heroSection = document.querySelector('[id="hero"]');
        if (heroSection) {
            heroSection.style.position = 'relative';
            heroSection.insertBefore(this.canvas, heroSection.firstChild);
        }

        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    createParticles() {
        const particleCount = this.isMobile ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            // Draw particle (glowing blue dot)
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Draw connecting lines
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }

            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    animate() {
        if (this.isMobile) return;
        
        this.drawParticles();
        this.updateParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.isMobile = window.innerWidth < 768;
            
            if (this.isMobile && this.animationId) {
                cancelAnimationFrame(this.animationId);
                if (this.canvas) {
                    this.canvas.remove();
                }
            }
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.particlesBackground = new ParticlesBackground();
});
