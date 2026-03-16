// Main.js - Portfolio Core Functionality
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('Portfolio initialized');
        this.setupSmoothScroll();
        this.setupMobileMenu();
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

    setupMobileMenu() {
        // Mobile menu functionality is handled by Alpine.js
        // This is a placeholder for any additional mobile functionality
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});