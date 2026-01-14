// Reality Section - Scroll Animations & Knowledge Loss Visual

// Scroll Animation for Reality Cards
class ScrollAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.reality-card[data-animate]');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        this.cards.forEach(card => {
            this.observer.observe(card);
        });
    }
}

// Knowledge Loss Visual Animation
class KnowledgeLossVisual {
    constructor() {
        this.canvas = document.getElementById('knowledgeLossCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.silhouettes = [];
        this.animationFrame = 0;
        
        this.init();
        this.createScene();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    createScene() {
        // Create silhouettes (abstract human forms)
        const silhouetteCount = 5;
        const spacing = this.width / (silhouetteCount + 1);
        
        for (let i = 0; i < silhouetteCount; i++) {
            this.silhouettes.push({
                x: spacing * (i + 1),
                y: this.height / 2,
                size: 40 + Math.random() * 20,
                opacity: 0.6 + Math.random() * 0.4,
                speed: 0.2 + Math.random() * 0.3,
                phase: Math.random() * Math.PI * 2,
                leaving: i < 2 // First two are leaving
            });
        }

        // Create knowledge particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const silhouette = this.silhouettes[Math.floor(Math.random() * this.silhouettes.length)];
        
        this.particles.push({
            x: silhouette.x + (Math.random() - 0.5) * 100,
            y: silhouette.y + (Math.random() - 0.5) * 100,
            size: 3 + Math.random() * 6,
            vx: (Math.random() - 0.5) * 2,
            vy: -0.5 - Math.random() * 1.5,
            opacity: 0.6 + Math.random() * 0.4,
            life: 1.0,
            decay: 0.003 + Math.random() * 0.005,
            color: Math.random() > 0.5 ? 'primary' : 'secondary',
            fromLeaving: silhouette.leaving
        });
    }

    drawSilhouette(silhouette) {
        const { x, y, size, opacity, phase } = silhouette;
        
        // Simple abstract silhouette (circle with shoulder suggestion)
        this.ctx.save();
        
        // Body
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + size * 0.3, size * 0.7, size * 1.2, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(100, 100, 100, ${opacity * 0.15})`;
        this.ctx.fill();
        
        // Head
        this.ctx.beginPath();
        this.ctx.arc(x, y - size * 0.5, size * 0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(120, 120, 120, ${opacity * 0.2})`;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawParticle(particle) {
        const colors = {
            primary: {
                r: 180,
                g: 136,
                b: 212
            },
            secondary: {
                r: 220,
                g: 200,
                b: 180
            }
        };
        
        const color = colors[particle.color];
        
        // Draw particle with glow
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
        );
        
        const alpha = particle.opacity * particle.life;
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.restore();

        // Draw subtle connecting lines between nearby particles
        this.particles.forEach(other => {
            if (particle === other) return;
            
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 80 && particle.life > 0.3 && other.life > 0.3) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(other.x, other.y);
                
                const lineAlpha = (1 - dist / 80) * 0.1 * Math.min(particle.life, other.life);
                this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
    }

    animate() {
        this.animationFrame++;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update and draw silhouettes
        this.silhouettes.forEach((silhouette, index) => {
            // Subtle floating animation
            silhouette.y = this.height / 2 + Math.sin(this.animationFrame * 0.02 + silhouette.phase) * 10;
            
            // Leaving silhouettes move slowly to the right
            if (silhouette.leaving) {
                silhouette.x += silhouette.speed;
                silhouette.opacity -= 0.001;
                
                // Reset if moved too far
                if (silhouette.x > this.width + 100) {
                    silhouette.x = -100;
                    silhouette.opacity = 0.3;
                }
            }
            
            this.drawSilhouette(silhouette);
        });

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Gravity and drift
            particle.vy += 0.02;
            particle.vx *= 0.99;
            
            // Decay life
            particle.life -= particle.decay;
            
            // Draw if still alive
            if (particle.life > 0) {
                this.drawParticle(particle);
            } else {
                // Remove dead particle and create new one
                this.particles.splice(index, 1);
                if (Math.random() > 0.3) {
                    this.createParticle();
                }
            }
        });

        // Occasionally create new particles from leaving silhouettes
        if (this.animationFrame % 20 === 0) {
            this.createParticle();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
    
    // Optional: Uncomment to use Canvas animation instead of image
    // new KnowledgeLossVisual();
});
