// Scroll-basierte Lösungsdarstellung - Geführte Navigation

class SolutionExplanationController {
    constructor() {
        this.currentState = 'input'; // 'input' oder 'output'
        this.phaseContainer = document.querySelector('.phase-detail-container');
        this.inputContent = document.getElementById('phase-input-content');
        this.outputContent = document.getElementById('phase-output-content');
        this.inputOverview = document.getElementById('overview-input');
        this.outputOverview = document.getElementById('overview-output');
        
        this.initObservers();
        this.initScrollTrigger();
    }

    initObservers() {
        // Intersection Observer für Fade-In Animationen
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        this.fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Alle Elemente beobachten
        document.querySelectorAll('.phase-content').forEach(el => {
            this.fadeObserver.observe(el);
        });

        document.querySelectorAll('.io-card').forEach((card, index) => {
            setTimeout(() => {
                this.fadeObserver.observe(card);
            }, index * 200);
        });
    }

    initScrollTrigger() {
        if (!this.phaseContainer) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateDetailPhase();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Initial update
        this.updateDetailPhase();
    }

    updateDetailPhase() {
        const rect = this.phaseContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerHeight = this.phaseContainer.offsetHeight;

        // Berechne Scroll-Progress innerhalb der Phase (0 bis 1)
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (containerHeight + windowHeight * 0.5)
        ));

        // Zustandswechsel bei 50% Scroll-Progress
        const newState = scrollProgress < 0.5 ? 'input' : 'output';

        if (newState !== this.currentState) {
            this.currentState = newState;
            this.switchState(newState);
        }
    }

    switchState(state) {
        if (state === 'input') {
            // Input aktiv
            this.inputContent.classList.add('active');
            this.outputContent.classList.remove('active');
            
            this.inputOverview.classList.add('active');
            this.inputOverview.classList.remove('inactive');
            
            this.outputOverview.classList.remove('active');
            this.outputOverview.classList.add('inactive');
        } else {
            // Output aktiv
            this.inputContent.classList.remove('active');
            this.outputContent.classList.add('active');
            
            this.inputOverview.classList.remove('active');
            this.inputOverview.classList.add('inactive');
            
            this.outputOverview.classList.add('active');
            this.outputOverview.classList.remove('inactive');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SolutionExplanationController();
});
