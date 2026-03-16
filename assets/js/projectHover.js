// ProjectHover.js - Interactive Project Card Effects
class ProjectHoverEffects {
    constructor() {
        this.projectCards = [];
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        this.findProjectCards();
        this.setupEventListeners();
        this.handleResize();
    }

    findProjectCards() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.enhanceProjectCards();
    }

    enhanceProjectCards() {
        this.projectCards.forEach(card => {
            // Get the project image
            const imageContainer = card.querySelector('.h-48');
            if (!imageContainer) return;

            // Wrap image for better control
            const image = imageContainer.querySelector('img');
            if (!image) return;

            // Create image wrapper
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'project-image-container';
            imageWrapper.style.position = 'relative';
            imageWrapper.style.overflow = 'hidden';
            imageWrapper.style.height = '100%';

            // Add project-image class to image
            image.classList.add('project-image');
            image.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            overlay.innerHTML = `
                <div class="project-actions">
                    <a href="${card.querySelector('a[href*="github"]')?.href || '#'}" 
                       target="_blank" 
                       class="bg-yellow text-primary px-4 py-2 rounded font-semibold hover:bg-white transition-colors">
                        <i class="bx bxl-github mr-1"></i> Code
                    </a>
                </div>
            `;

            // Rebuild the structure
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(overlay);
            imageContainer.innerHTML = '';
            imageContainer.appendChild(imageWrapper);

            // Add GPU acceleration
            card.classList.add('gpu-accelerated');
        });
    }

    setupEventListeners() {
        this.projectCards.forEach(card => {
            // Mouse enter
            card.addEventListener('mouseenter', (e) => {
                if (this.isMobile) return;
                this.handleCardHover(card, true);
            });

            // Mouse leave
            card.addEventListener('mouseleave', (e) => {
                if (this.isMobile) return;
                this.handleCardHover(card, false);
            });

            // Touch events for mobile
            card.addEventListener('touchstart', (e) => {
                if (!this.isMobile) return;
                this.handleCardTouch(card, e);
            });
        });
    }

    handleCardHover(card, isHovering) {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const actions = card.querySelector('.project-actions');

        if (isHovering) {
            // Hover effects
            card.style.transform = 'translateY(-5px)';
            if (image) image.style.transform = 'scale(1.1)';
            if (overlay) overlay.style.opacity = '1';
            if (actions) {
                actions.style.opacity = '1';
                actions.style.transform = 'translateY(0)';
            }
        } else {
            // Reset effects
            card.style.transform = 'translateY(0)';
            if (image) image.style.transform = 'scale(1)';
            if (overlay) overlay.style.opacity = '0';
            if (actions) {
                actions.style.opacity = '0';
                actions.style.transform = 'translateY(20px)';
            }
        }
    }

    handleCardTouch(card, event) {
        // Simple touch effect for mobile
        const image = card.querySelector('.project-image');
        
        // Brief scale effect on touch
        if (image) {
            image.style.transform = 'scale(1.05)';
            setTimeout(() => {
                image.style.transform = 'scale(1)';
            }, 200);
        }
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth < 768;
                
                // Reset all cards on resize
                this.projectCards.forEach(card => {
                    card.style.transform = 'translateY(0)';
                    const image = card.querySelector('.project-image');
                    const overlay = card.querySelector('.project-overlay');
                    const actions = card.querySelector('.project-actions');
                    
                    if (image) image.style.transform = 'scale(1)';
                    if (overlay) overlay.style.opacity = '0';
                    if (actions) {
                        actions.style.opacity = '0';
                        actions.style.transform = 'translateY(20px)';
                    }
                });
            }, 250);
        });
    }

    destroy() {
        // Clean up event listeners
        this.projectCards.forEach(card => {
            card.removeEventListener('mouseenter', this.handleCardHover);
            card.removeEventListener('mouseleave', this.handleCardHover);
            card.removeEventListener('touchstart', this.handleCardTouch);
        });
    }
}

// Initialize project hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.projectHoverEffects = new ProjectHoverEffects();
});
