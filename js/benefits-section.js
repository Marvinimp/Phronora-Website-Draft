// Benefits Section - Tab Switching Logic

class BenefitsSection {
    constructor() {
        this.tabButtons = document.querySelectorAll('.benefits-tab');
        this.grids = document.querySelectorAll('.benefits-grid');
        
        this.init();
    }

    init() {
        // Set initial state
        this.showGrid('wissensträger');

        // Add click handlers
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.switchTab(target);
            });

            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const target = e.currentTarget.dataset.target;
                    this.switchTab(target);
                }
            });
        });
    }

    switchTab(target) {
        // Update tab states
        this.tabButtons.forEach(button => {
            const isActive = button.dataset.target === target;
            button.setAttribute('aria-selected', isActive);
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        // Switch grids with animation
        this.showGrid(target);
    }

    showGrid(target) {
        this.grids.forEach(grid => {
            const isTarget = grid.dataset.group === target;
            
            if (isTarget) {
                // Show target grid
                grid.setAttribute('aria-hidden', 'false');
                grid.style.pointerEvents = 'auto';
            } else {
                // Hide other grids
                grid.setAttribute('aria-hidden', 'true');
                grid.style.pointerEvents = 'none';
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new BenefitsSection();
    });
} else {
    new BenefitsSection();
}
