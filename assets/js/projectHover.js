// ProjectHover.js - Interactive Project Card Effects
class ProjectHoverEffects {
    constructor() {
        this.projectCards = [];
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        try {
            this.findProjectCards();
            this.setupEventListeners();
            this.handleResize();
        } catch (error) {
            console.warn('Error initializing project hover effects:', error);
        }
    }

    findProjectCards() {
        try {
            this.projectCards = document.querySelectorAll('.project-card');
            this.enhanceProjectCards();
        } catch (error) {
            console.warn('Error finding project cards:', error);
        }
    }

    enhanceProjectCards() {
        try {
            this.projectCards.forEach(card => {
                // Get project image container
                const imageContainer = card.querySelector('.project-image-container');
                if (!imageContainer) return;

                // Get image and overlay
                const image = imageContainer.querySelector('.project-image');
                const overlay = imageContainer.querySelector('.project-overlay');
                const actions = imageContainer.querySelector('.project-actions');

                // Add GPU acceleration
                card.classList.add('gpu-accelerated');
                if (image) image.classList.add('gpu-accelerated');
                if (overlay) overlay.classList.add('gpu-accelerated');
                if (actions) actions.classList.add('gpu-accelerated');
            });
        } catch (error) {
            console.warn('Error enhancing project cards:', error);
        }
    }

    setupEventListeners() {
        try {
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
        } catch (error) {
            console.warn('Error setting up event listeners:', error);
        }
    }

    handleCardHover(card, isHovering) {
        try {
            const image = card.querySelector('.project-image');
            const overlay = card.querySelector('.project-overlay');
            const actions = card.querySelector('.project-actions');

            if (isHovering) {
                // Hover effects
                card.style.transform = 'translateY(-5px)';
                if (image) {
                    image.style.transform = 'scale(1.1)';
                    image.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                if (actions) {
                    actions.style.opacity = '1';
                    actions.style.transform = 'translateY(0)';
                    actions.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s';
                }
            } else {
                // Reset effects
                card.style.transform = 'translateY(0)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                if (image) {
                    image.style.transform = 'scale(1)';
                    image.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                if (actions) {
                    actions.style.opacity = '0';
                    actions.style.transform = 'translateY(20px)';
                    actions.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s';
                }
            }
        } catch (error) {
            console.warn('Error handling card hover:', error);
        }
    }

    handleCardTouch(card, event) {
        try {
            // Simple touch effect for mobile
            const image = card.querySelector('.project-image');
            
            // Brief scale effect on touch
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    image.style.transform = 'scale(1)';
                }, 200);
            }
        } catch (error) {
            console.warn('Error handling card touch:', error);
        }
    }

    handleResize() {
        try {
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
                        
                        if (image) {
                            image.style.transform = 'scale(1)';
                            image.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        }
                        if (overlay) {
                            overlay.style.opacity = '0';
                            overlay.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        }
                        if (actions) {
                            actions.style.opacity = '0';
                            actions.style.transform = 'translateY(20px)';
                            actions.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s';
                        }
                    });
                }, 250);
            });
        } catch (error) {
            console.warn('Error handling resize:', error);
        }
    }

    destroy() {
        try {
            // Clean up event listeners
            this.projectCards.forEach(card => {
                card.removeEventListener('mouseenter', this.handleCardHover);
                card.removeEventListener('mouseleave', this.handleCardHover);
                card.removeEventListener('touchstart', this.handleCardTouch);
            });
        } catch (error) {
            console.warn('Error destroying project hover effects:', error);
        }
    }
}

// Initialize project hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.projectHoverEffects = new ProjectHoverEffects();
    } catch (error) {
        console.warn('Error initializing project hover effects:', error);
    }
});
