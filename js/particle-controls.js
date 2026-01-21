// particle-controls.js - Additional particle interactions

class ParticleControls {
    constructor() {
        this.particleContainer = null;
        this.init();
    }
    
    async init() {
        // Wait for tsParticles to load
        await this.waitForParticles();
        this.setupControls();
    }
    
    async waitForParticles() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                const container = tsParticles.domItem(0);
                if (container) {
                    this.particleContainer = container;
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                console.warn('tsParticles not found, using fallback');
            }, 5000);
        });
    }
    
    setupControls() {
        // Add keyboard controls for particle effects
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P') {
                this.toggleParticles();
            }
            if (e.key === 'l' || e.key === 'L') {
                this.toggleLinks();
            }
            if (e.key === 's' || e.key === 'S') {
                this.changeSpeed();
            }
        });
        
        // Add mouse wheel control for particle density
        document.addEventListener('wheel', (e) => {
            if (e.ctrlKey) { // Only when Ctrl is pressed
                e.preventDefault();
                this.adjustParticleDensity(e.deltaY);
            }
        }, { passive: false });
    }
    
    toggleParticles() {
        if (this.particleContainer) {
            const particles = this.particleContainer.particles;
            if (particles) {
                particles.paused = !particles.paused;
                if (particles.paused) {
                    particles.pause();
                    console.log('Particles paused');
                } else {
                    particles.play();
                    console.log('Particles resumed');
                }
            }
        }
    }
    
    toggleLinks() {
        if (this.particleContainer) {
            this.particleContainer.options.particles.links.enable = 
                !this.particleContainer.options.particles.links.enable;
            this.particleContainer.refresh();
            console.log('Links toggled:', this.particleContainer.options.particles.links.enable);
        }
    }
    
    changeSpeed() {
        if (this.particleContainer) {
            const currentSpeed = this.particleContainer.options.particles.move.speed;
            const newSpeed = currentSpeed === 2 ? 4 : currentSpeed === 4 ? 0.5 : 2;
            this.particleContainer.options.particles.move.speed = newSpeed;
            this.particleContainer.refresh();
            console.log('Particle speed changed to:', newSpeed);
        }
    }
    
    adjustParticleDensity(deltaY) {
        if (this.particleContainer) {
            const currentCount = this.particleContainer.options.particles.number.value;
            const change = deltaY > 0 ? -10 : 10;
            const newCount = Math.max(20, Math.min(200, currentCount + change));
            
            this.particleContainer.options.particles.number.value = newCount;
            this.particleContainer.refresh();
            console.log('Particle count adjusted to:', newCount);
        }
    }
    
    // Create special effects for different sections
    createSectionEffect(sectionId, effectType = 'attract') {
        const section = document.getElementById(sectionId);
        if (!section || !this.particleContainer) return;
        
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        switch(effectType) {
            case 'attract':
                this.createAttractionField(centerX, centerY, 300);
                break;
            case 'repulse':
                this.createRepulsionField(centerX, centerY, 300);
                break;
            case 'swirl':
                this.createSwirlEffect(centerX, centerY, 200);
                break;
        }
    }
    
    createAttractionField(x, y, radius) {
        if (!this.particleContainer) return;
        
        const particles = this.particleContainer.particles.array;
        particles.forEach(particle => {
            if (!particle) return;
            
            const dx = particle.position.x - x;
            const dy = particle.position.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                const force = (radius - distance) / radius * 0.5;
                const angle = Math.atan2(dy, dx);
                
                particle.velocity.x -= Math.cos(angle) * force;
                particle.velocity.y -= Math.sin(angle) * force;
            }
        });
    }
    
    createRepulsionField(x, y, radius) {
        if (!this.particleContainer) return;
        
        const particles = this.particleContainer.particles.array;
        particles.forEach(particle => {
            if (!particle) return;
            
            const dx = particle.position.x - x;
            const dy = particle.position.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                const force = (radius - distance) / radius;
                const angle = Math.atan2(dy, dx);
                
                particle.velocity.x += Math.cos(angle) * force;
                particle.velocity.y += Math.sin(angle) * force;
            }
        });
    }
    
    createSwirlEffect(x, y, radius) {
        if (!this.particleContainer) return;
        
        const particles = this.particleContainer.particles.array;
        particles.forEach(particle => {
            if (!particle) return;
            
            const dx = particle.position.x - x;
            const dy = particle.position.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                const force = (radius - distance) / radius * 2;
                const angle = Math.atan2(dy, dx);
                
                // Create swirl effect by adding perpendicular force
                particle.velocity.x += Math.cos(angle + Math.PI/2) * force;
                particle.velocity.y += Math.sin(angle + Math.PI/2) * force;
            }
        });
    }
}

// Initialize particle controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.particleControls = new ParticleControls();
    
    // Add effects to specific sections on hover
    const sections = ['hero-section', 'analysis', 'dashboard', 'emergency'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.addEventListener('mouseenter', () => {
                if (window.particleControls) {
                    window.particleControls.createSectionEffect(sectionId, 'attract');
                }
            });
            
            section.addEventListener('mouseleave', () => {
                // Reset particles after leaving section
                setTimeout(() => {
                    if (window.particleControls && window.particleControls.particleContainer) {
                        window.particleControls.particleContainer.refresh();
                    }
                }, 1000);
            });
        }
    });
});
