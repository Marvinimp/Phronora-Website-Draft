/**
 * TESTIMONIALS CAROUSEL - CENTER MODE INFINITE LOOP
 * Professional implementation with seamless looping
 */

class TestimonialsCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.track = this.carousel.querySelector('.testimonials-track');
        this.slides = Array.from(this.carousel.querySelectorAll('.testimonial-card'));
        this.prevBtn = document.querySelector('.carousel-nav-prev');
        this.nextBtn = document.querySelector('.carousel-nav-next');
        this.indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
        
        // Configuration
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = 5000; // 5 seconds
        this.autoPlayTimer = null;
        this.isTransitioning = false;
        this.isPaused = false;
        
        // Responsive configuration
        this.updateResponsiveSettings();
        
        // Clone slides for infinite loop
        this.cloneSlides();
        
        // Initialize
        this.init();
    }
    
    updateResponsiveSettings() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            this.slidesToShow = 1;
            this.slideWidth = 316; // 300 + 16 (margins)
        } else if (width <= 968) {
            this.slidesToShow = 2;
            this.slideWidth = 364; // 340 + 24 (margins)
        } else if (width <= 1200) {
            this.slidesToShow = 3;
            this.slideWidth = 392; // 360 + 32 (margins)
        } else {
            this.slidesToShow = 3;
            this.slideWidth = 432; // 400 + 32 (margins)
        }
    }
    
    cloneSlides() {
        // Clone slides for seamless infinite loop
        const cloneCount = this.slidesToShow + 1;
        
        // Clone slides at the end
        for (let i = 0; i < cloneCount; i++) {
            const clone = this.slides[i].cloneNode(true);
            clone.classList.add('clone');
            clone.setAttribute('aria-hidden', 'true');
            this.track.appendChild(clone);
        }
        
        // Clone slides at the beginning
        for (let i = this.totalSlides - 1; i >= this.totalSlides - cloneCount; i--) {
            const clone = this.slides[i].cloneNode(true);
            clone.classList.add('clone');
            clone.setAttribute('aria-hidden', 'true');
            this.track.insertBefore(clone, this.track.firstChild);
        }
        
        // Update slides array to include clones
        this.allSlides = Array.from(this.track.querySelectorAll('.testimonial-card'));
        
        // Set initial position to first real slide (after prepended clones)
        this.currentIndex = cloneCount;
        this.updatePosition(false);
    }
    
    init() {
        // Set initial active state
        this.updateActiveStates();
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Pause on hover/focus
        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => this.resume());
        this.carousel.addEventListener('focusin', () => this.pause());
        this.carousel.addEventListener('focusout', () => this.resume());
        
        // Responsive handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateResponsiveSettings();
                this.updatePosition(false);
            }, 250);
        });
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            this.startAutoPlay();
        }
        
        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (!this.isPaused) {
                this.resume();
            }
        });
    }
    
    updatePosition(animate = true) {
        // Calculate center offset
        const containerWidth = this.carousel.offsetWidth;
        const centerOffset = (containerWidth - this.slideWidth) / 2;
        
        // Calculate translation
        const offset = -(this.currentIndex * this.slideWidth) + centerOffset;
        
        // Apply transition
        if (animate) {
            this.track.style.transition = 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translate3d(${offset}px, 0, 0)`;
        
        // Update active states
        if (animate) {
            this.isTransitioning = true;
            setTimeout(() => {
                this.isTransitioning = false;
                this.checkInfiniteLoop();
            }, 450);
        }
        
        this.updateActiveStates();
    }
    
    checkInfiniteLoop() {
        const cloneCount = this.slidesToShow + 1;
        
        // If we're on a clone at the end, jump to the real slide at the beginning
        if (this.currentIndex >= this.totalSlides + cloneCount) {
            this.currentIndex = cloneCount;
            this.updatePosition(false);
        }
        
        // If we're on a clone at the beginning, jump to the real slide at the end
        if (this.currentIndex < cloneCount) {
            this.currentIndex = this.totalSlides + cloneCount - 1;
            this.updatePosition(false);
        }
    }
    
    updateActiveStates() {
        // Remove all active states
        this.allSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });
        
        // Set active state
        const activeSlide = this.allSlides[this.currentIndex];
        if (activeSlide) {
            activeSlide.classList.add('active');
            activeSlide.setAttribute('aria-hidden', 'false');
        }
        
        // Update indicators
        const cloneCount = this.slidesToShow + 1;
        let realIndex = this.currentIndex - cloneCount;
        
        // Wrap around for indicators
        if (realIndex < 0) realIndex = this.totalSlides + realIndex;
        if (realIndex >= this.totalSlides) realIndex = realIndex - this.totalSlides;
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
            indicator.setAttribute('aria-selected', index === realIndex);
        });
    }
    
    next() {
        if (this.isTransitioning) return;
        this.currentIndex++;
        this.updatePosition(true);
        this.restartAutoPlay();
    }
    
    prev() {
        if (this.isTransitioning) return;
        this.currentIndex--;
        this.updatePosition(true);
        this.restartAutoPlay();
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        const cloneCount = this.slidesToShow + 1;
        this.currentIndex = index + cloneCount;
        this.updatePosition(true);
        this.restartAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            if (!this.isPaused) {
                this.next();
            }
        }, this.autoPlayInterval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            this.startAutoPlay();
        }
    }
    
    pause() {
        this.isPaused = true;
        this.carousel.classList.add('paused');
    }
    
    resume() {
        this.isPaused = false;
        this.carousel.classList.remove('paused');
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.testimonials-carousel');
    if (carouselElement) {
        new TestimonialsCarousel(carouselElement);
    }
});
