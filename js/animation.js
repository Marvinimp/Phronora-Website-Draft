// Network Animation - Recreating the design from the reference image
class NetworkAnimation {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.arrows = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationFrame = 0;
        
        this.init();
        this.createNetwork();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        if (this.nodes.length === 0) {
            this.createNetwork();
        }
    }
    
    createNetwork() {
        this.nodes = [];
        this.connections = [];
        this.arrows = [];
        
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // Position nodes on the right side (similar to reference image)
        const rightOffset = w * 0.5;
        
        // Create nodes with specific positioning to match the curved network pattern
        const nodePositions = [
            { x: rightOffset + 100, y: h * 0.15, size: 8, isPrimary: true },
            { x: rightOffset + 250, y: h * 0.25, size: 10, isPrimary: true },
            { x: rightOffset + 320, y: h * 0.45, size: 8, isPrimary: true },
            { x: rightOffset + 280, y: h * 0.65, size: 9, isPrimary: true },
            { x: rightOffset + 150, y: h * 0.75, size: 8, isPrimary: true },
            { x: rightOffset - 50, y: h * 0.55, size: 10, isPrimary: true },
            { x: rightOffset - 20, y: h * 0.35, size: 8, isPrimary: true },
            
            // Secondary nodes (smaller, gray)
            { x: rightOffset + 180, y: h * 0.08, size: 5, isPrimary: false },
            { x: rightOffset + 350, y: h * 0.18, size: 5, isPrimary: false },
            { x: rightOffset + 400, y: h * 0.38, size: 5, isPrimary: false },
            { x: rightOffset + 380, y: h * 0.58, size: 5, isPrimary: false },
            { x: rightOffset + 340, y: h * 0.78, size: 5, isPrimary: false },
            { x: rightOffset + 180, y: h * 0.88, size: 5, isPrimary: false },
            { x: rightOffset + 30, y: h * 0.80, size: 5, isPrimary: false },
            { x: rightOffset - 100, y: h * 0.68, size: 5, isPrimary: false },
            { x: rightOffset - 80, y: h * 0.42, size: 5, isPrimary: false },
            { x: rightOffset + 50, y: h * 0.20, size: 5, isPrimary: false },
        ];
        
        nodePositions.forEach((pos, index) => {
            this.nodes.push({
                x: pos.x,
                y: pos.y,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: pos.size,
                isPrimary: pos.isPrimary,
                originalX: pos.x,
                originalY: pos.y,
                pulsePhase: Math.random() * Math.PI * 2
            });
        });
        
        // Create curved connections (like in the reference image)
        const primaryIndices = [0, 1, 2, 3, 4, 5, 6];
        const connectionPairs = [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
            [0, 2], [1, 5], [2, 5], [3, 5], [1, 3], [2, 4]
        ];
        
        connectionPairs.forEach(pair => {
            this.connections.push({
                from: pair[0],
                to: pair[1],
                opacity: 0.6 + Math.random() * 0.4
            });
        });
        
        // Create arrows for visual flow
        for (let i = 0; i < 8; i++) {
            this.arrows.push({
                x: rightOffset + Math.random() * 400 - 100,
                y: Math.random() * h,
                angle: Math.random() * Math.PI * 2,
                size: 12 + Math.random() * 8,
                speed: 0.3 + Math.random() * 0.5,
                opacity: 0.15 + Math.random() * 0.15
            });
        }
    }
    
    drawCurvedLine(x1, y1, x2, y2, isPrimary, opacity) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Control point for curve
        const curvature = 0.3;
        const cx = (x1 + x2) / 2 - dy * curvature;
        const cy = (y1 + y2) / 2 + dx * curvature;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.quadraticCurveTo(cx, cy, x2, y2);
        
        if (isPrimary) {
            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, `rgba(180, 136, 212, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(155, 107, 197, ${opacity})`);
            gradient.addColorStop(1, `rgba(180, 136, 212, ${opacity * 0.6})`);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2.5;
        } else {
            this.ctx.strokeStyle = `rgba(200, 200, 200, ${opacity * 0.3})`;
            this.ctx.lineWidth = 1.5;
        }
        
        this.ctx.stroke();
    }
    
    drawArrow(x, y, angle, size, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-size, -size / 2);
        this.ctx.lineTo(-size, size / 2);
        this.ctx.closePath();
        
        this.ctx.fillStyle = `rgba(200, 200, 200, ${opacity})`;
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    animate() {
        this.animationFrame++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw arrows
        this.arrows.forEach(arrow => {
            arrow.x += Math.cos(arrow.angle) * arrow.speed;
            arrow.y += Math.sin(arrow.angle) * arrow.speed;
            
            // Wrap around screen
            if (arrow.x < 0) arrow.x = this.canvas.width;
            if (arrow.x > this.canvas.width) arrow.x = 0;
            if (arrow.y < 0) arrow.y = this.canvas.height;
            if (arrow.y > this.canvas.height) arrow.y = 0;
            
            this.drawArrow(arrow.x, arrow.y, arrow.angle, arrow.size, arrow.opacity);
        });
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const isPrimary = from.isPrimary && to.isPrimary;
            
            // Animate opacity
            const animatedOpacity = conn.opacity * (0.7 + Math.sin(this.animationFrame * 0.02 + conn.from) * 0.3);
            
            this.drawCurvedLine(from.x, from.y, to.x, to.y, isPrimary, animatedOpacity);
        });
        
        // Update and draw nodes
        this.nodes.forEach((node, index) => {
            // Gentle floating animation
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary check with soft return to original position
            const returnForce = 0.02;
            node.vx += (node.originalX - node.x) * returnForce;
            node.vy += (node.originalY - node.y) * returnForce;
            
            // Damping
            node.vx *= 0.95;
            node.vy *= 0.95;
            
            // Pulsing effect
            const pulse = Math.sin(this.animationFrame * 0.05 + node.pulsePhase) * 0.5 + 0.5;
            const currentSize = node.size * (1 + pulse * 0.2);
            
            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
            
            if (node.isPrimary) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, currentSize
                );
                gradient.addColorStop(0, `rgba(180, 136, 212, ${0.9 + pulse * 0.1})`);
                gradient.addColorStop(1, `rgba(155, 107, 197, ${0.6 + pulse * 0.2})`);
                this.ctx.fillStyle = gradient;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = 'rgba(155, 107, 197, 0.6)';
            } else {
                this.ctx.fillStyle = `rgba(180, 180, 180, ${0.4 + pulse * 0.1})`;
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = 'rgba(180, 180, 180, 0.3)';
            }
            
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            // Interactive node repulsion
            this.nodes.forEach(node => {
                const dx = node.x - this.mouseX;
                const dy = node.y - this.mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 2;
                    node.vx += (dx / dist) * force;
                    node.vy += (dy / dist) * force;
                }
            });
        });
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NetworkAnimation();
});
