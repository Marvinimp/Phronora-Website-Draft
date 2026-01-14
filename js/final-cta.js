/**
 * FINAL CTA SECTION - FORM HANDLING & CALENDLY INTEGRATION
 * Professional contact form with validation and Calendly inline widget
 */

class FinalCTASection {
    constructor() {
        this.form = document.getElementById('ctaContactForm');
        this.submitButton = document.querySelector('.cta-primary-button');
        this.calendlyLoaded = false;
        
        if (this.form) {
            this.init();
        }
        
        this.initCalendly();
    }
    
    init() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('.cta-form-input, .cta-form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Mobile sticky CTA scroll behavior
        this.initMobileStickyBehavior();
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Email validation (only required field)
        if (fieldName === 'email') {
            if (!value) {
                isValid = false;
                errorMessage = 'E-Mail ist erforderlich';
            } else if (!this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        // RFC 5322 simplified regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            display: block;
            color: rgba(255, 100, 100, 0.9);
            font-size: 13px;
            margin-top: 4px;
        `;
        
        field.style.borderColor = 'rgba(255, 100, 100, 0.5)';
        field.parentElement.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const emailInput = this.form.querySelector('[name="email"]');
        if (!this.validateField(emailInput)) {
            emailInput.focus();
            return;
        }
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            company: formData.get('company'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Disable button and show loading state
        this.submitButton.disabled = true;
        const originalText = this.submitButton.textContent;
        this.submitButton.textContent = 'Wird gesendet...';
        
        try {
            // Here you would send to your backend
            // For now, we'll simulate and log to console
            await this.simulateSubmission(data);
            
            // Success
            this.showSuccessMessage();
            this.form.reset();
            
        } catch (error) {
            // Error
            this.showErrorMessage();
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            setTimeout(() => {
                this.submitButton.disabled = false;
                this.submitButton.textContent = originalText;
            }, 2000);
        }
    }
    
    async simulateSubmission(data) {
        // Simulate API call
        console.log('Form submission data:', data);
        
        // In production, replace with actual API call:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // if (!response.ok) throw new Error('Submission failed');
        
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'cta-form-message cta-form-success';
        message.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; margin-right: 12px;">
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Vielen Dank! Wir melden uns in Kürze bei Ihnen.</span>
        `;
        message.style.cssText = `
            display: flex;
            align-items: center;
            padding: 16px;
            background: rgba(100, 255, 150, 0.15);
            border: 1px solid rgba(100, 255, 150, 0.3);
            border-radius: 12px;
            color: rgba(100, 255, 150, 0.95);
            font-size: 14px;
            margin-bottom: 16px;
        `;
        
        this.form.insertBefore(message, this.form.firstChild);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }
    
    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'cta-form-message cta-form-error';
        message.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; margin-right: 12px;">
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</span>
        `;
        message.style.cssText = `
            display: flex;
            align-items: center;
            padding: 16px;
            background: rgba(255, 100, 100, 0.15);
            border: 1px solid rgba(255, 100, 100, 0.3);
            border-radius: 12px;
            color: rgba(255, 100, 100, 0.95);
            font-size: 14px;
            margin-bottom: 16px;
        `;
        
        this.form.insertBefore(message, this.form.firstChild);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }
    
    initCalendly() {
        // Check if Calendly script is loaded
        if (typeof Calendly !== 'undefined') {
            this.calendlyLoaded = true;
            this.hideCalendlyLoading();
        } else {
            // Load Calendly script if not already loaded
            if (!document.querySelector('script[src*="calendly"]')) {
                const script = document.createElement('script');
                script.src = 'https://assets.calendly.com/assets/external/widget.js';
                script.async = true;
                script.onload = () => {
                    this.calendlyLoaded = true;
                    this.hideCalendlyLoading();
                };
                document.head.appendChild(script);
                
                // Also load CSS
                const link = document.createElement('link');
                link.href = 'https://assets.calendly.com/assets/external/widget.css';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
        }
    }
    
    hideCalendlyLoading() {
        const loadingElements = document.querySelectorAll('.cta-calendly-loading');
        loadingElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';
            setTimeout(() => el.remove(), 300);
        });
    }
    
    initMobileStickyBehavior() {
        const stickyButton = document.querySelector('.mobile-sticky-cta .cta-primary-button');
        if (!stickyButton) return;
        
        // Scroll to form on mobile sticky button click
        stickyButton.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                const formSection = document.querySelector('.final-cta-section');
                if (formSection) {
                    formSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                    // Focus on first input after scroll
                    setTimeout(() => {
                        const firstInput = document.querySelector('.cta-form-input');
                        if (firstInput) firstInput.focus();
                    }, 600);
                }
            }
        });
        
        // Show/hide sticky button based on scroll
        const observer = new IntersectionObserver(
            ([entry]) => {
                const stickyWrapper = document.querySelector('.mobile-sticky-cta');
                if (stickyWrapper) {
                    if (entry.isIntersecting) {
                        stickyWrapper.style.transform = 'translateY(100%)';
                    } else {
                        stickyWrapper.style.transform = 'translateY(0)';
                    }
                }
            },
            { threshold: 0.1 }
        );
        
        const ctaSection = document.querySelector('.final-cta-section');
        if (ctaSection) {
            observer.observe(ctaSection);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FinalCTASection();
});
