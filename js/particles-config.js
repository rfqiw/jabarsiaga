// tsParticles Configuration for Jabar Siaga - Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const particlesConfig = {
        "autoPlay": true,
        "background": {
            "color": {
                "value": "transparent" // Changed from #0d47a1 to transparent for overlay effect
            },
            "image": "",
            "position": "",
            "repeat": "",
            "size": "",
            "opacity": 1
        },
        "backgroundMask": {
            "composite": "destination-out",
            "cover": {
                "opacity": 1,
                "color": {
                    "value": ""
                }
            },
            "enable": false
        },
        "clear": true,
        "defaultThemes": {},
        "delay": 0,
        "fullScreen": {
            "enable": true,
            "zIndex": -2 // Changed to -2 to be behind content but above background
        },
        "detectRetina": true,
        "duration": 0,
        "fpsLimit": 120,
        "interactivity": {
            "detectsOn": "window",
            "events": {
                "onClick": {
                    "enable": true,
                    "mode": "push"
                },
                "onDiv": {
                    "selectors": {},
                    "enable": false,
                    "mode": {},
                    "type": "circle"
                },
                "onHover": {
                    "enable": true,
                    "mode": "grab",
                    "parallax": {
                        "enable": true,
                        "force": 60,
                        "smooth": 10
                    }
                },
                "resize": {
                    "delay": 0.5,
                    "enable": true
                }
            },
            "modes": {
                "trail": {
                    "delay": 1,
                    "pauseOnStop": false,
                    "quantity": 1
                },
                "attract": {
                    "distance": 200,
                    "duration": 0.4,
                    "easing": "ease-out-quad",
                    "factor": 1,
                    "maxSpeed": 50,
                    "speed": 1
                },
                "bounce": {
                    "distance": 200
                },
                "bubble": {
                    "distance": 400,
                    "duration": 2,
                    "mix": false,
                    "opacity": 0.8,
                    "size": 40,
                    "divs": {
                        "distance": 200,
                        "duration": 0.4,
                        "mix": false,
                        "selectors": {}
                    }
                },
                "connect": {
                    "distance": 80,
                    "links": {
                        "opacity": 0.5
                    },
                    "radius": 60
                },
                "grab": {
                    "distance": 400,
                    "links": {
                        "blink": false,
                        "consent": false,
                        "opacity": 1
                    }
                },
                "push": {
                    "default": true,
                    "groups": [],
                    "quantity": 4
                },
                "remove": {
                    "quantity": 2
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4,
                    "factor": 100,
                    "speed": 1,
                    "maxSpeed": 50,
                    "easing": "ease-out-quad",
                    "divs": {
                        "distance": 200,
                        "duration": 0.4,
                        "factor": 100,
                        "speed": 1,
                        "maxSpeed": 50,
                        "easing": "ease-out-quad",
                        "selectors": {}
                    }
                },
                "slow": {
                    "factor": 3,
                    "radius": 200
                },
                "particle": {
                    "replaceCursor": false,
                    "pauseOnStop": false,
                    "stopDelay": 0
                },
                "light": {
                    "area": {
                        "gradient": {
                            "start": {
                                "value": "#ffffff"
                            },
                            "stop": {
                                "value": "#000000"
                            }
                        },
                        "radius": 1000
                    },
                    "shadow": {
                        "color": {
                            "value": "#000000"
                        },
                        "length": 2000
                    }
                }
            }
        },
        "manualParticles": [],
        "particles": {
            "bounce": {
                "horizontal": {
                    "value": 1
                },
                "vertical": {
                    "value": 1
                }
            },
            "collisions": {
                "absorb": {
                    "speed": 2
                },
                "bounce": {
                    "horizontal": {
                        "value": 1
                    },
                    "vertical": {
                        "value": 1
                    }
                },
                "enable": false,
                "maxSpeed": 50,
                "mode": "bounce",
                "overlap": {
                    "enable": true,
                    "retries": 0
                }
            },
            "color": {
                "value": ["#0066cc", "#ff6600", "#2a9d8f", "#7209b7", "#e63946"], // Multiple colors for disaster theme
                "animation": {
                    "h": {
                        "count": 0,
                        "enable": false,
                        "speed": 1,
                        "decay": 0,
                        "delay": 0,
                        "sync": true,
                        "offset": 0
                    },
                    "s": {
                        "count": 0,
                        "enable": false,
                        "speed": 1,
                        "decay": 0,
                        "delay": 0,
                        "sync": true,
                        "offset": 0
                    },
                    "l": {
                        "count": 0,
                        "enable": false,
                        "speed": 1,
                        "decay": 0,
                        "delay": 0,
                        "sync": true,
                        "offset": 0
                    }
                }
            },
            "effect": {
                "close": true,
                "fill": true,
                "options": {},
                "type": {}
            },
            "groups": [],
            "move": {
                "angle": {
                    "offset": 0,
                    "value": 90
                },
                "attract": {
                    "distance": 200,
                    "enable": false,
                    "rotate": {
                        "x": 3000,
                        "y": 3000
                    }
                },
                "center": {
                    "x": 50,
                    "y": 50,
                    "mode": "percent",
                    "radius": 0
                },
                "decay": 0,
                "distance": {},
                "direction": "none",
                "drift": 0,
                "enable": true,
                "gravity": {
                    "acceleration": 9.81,
                    "enable": false,
                    "inverse": false,
                    "maxSpeed": 50
                },
                "path": {
                    "clamp": true,
                    "delay": {
                        "value": 0
                    },
                    "enable": false,
                    "options": {}
                },
                "outModes": {
                    "default": "out",
                    "bottom": "out",
                    "left": "out",
                    "right": "out",
                    "top": "out"
                },
                "random": false,
                "size": false,
                "speed": 2,
                "spin": {
                    "acceleration": 0,
                    "enable": false
                },
                "straight": false,
                "trail": {
                    "enable": false,
                    "length": 10,
                    "fill": {}
                },
                "vibrate": false,
                "warp": false
            },
            "number": {
                "density": {
                    "enable": true,
                    "width": 1920,
                    "height": 1080
                },
                "limit": {
                    "mode": "delete",
                    "value": 0
                },
                "value": 100
            },
            "opacity": {
                "value": {
                    "min": 0.1,
                    "max": 0.8 // Increased max for better visibility
                },
                "animation": {
                    "count": 0,
                    "enable": true,
                    "speed": 3,
                    "decay": 0,
                    "delay": 0,
                    "sync": false,
                    "mode": "auto",
                    "startValue": "random",
                    "destroy": "none"
                }
            },
            "reduceDuplicates": false,
            "shadow": {
                "blur": 0,
                "color": {
                    "value": "#000"
                },
                "enable": false,
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            "shape": {
                "close": true,
                "fill": true,
                "options": {},
                "type": "circle"
            },
            "size": {
                "value": {
                    "min": 1,
                    "max": 10
                },
                "animation": {
                    "count": 0,
                    "enable": true,
                    "speed": 20,
                    "decay": 0,
                    "delay": 0,
                    "sync": false,
                    "mode": "auto",
                    "startValue": "random",
                    "destroy": "none"
                }
            },
            "stroke": {
                "width": 0
            },
            "zIndex": {
                "value": 0,
                "opacityRate": 1,
                "sizeRate": 1,
                "velocityRate": 1
            },
            "destroy": {
                "bounds": {},
                "mode": "none",
                "split": {
                    "count": 1,
                    "factor": {
                        "value": 3
                    },
                    "rate": {
                        "value": {
                            "min": 4,
                            "max": 9
                        }
                    },
                    "sizeOffset": true,
                    "particles": {}
                }
            },
            "roll": {
                "darken": {
                    "enable": false,
                    "value": 0
                },
                "enable": false,
                "enlighten": {
                    "enable": false,
                    "value": 0
                },
                "mode": "vertical",
                "speed": 25
            },
            "tilt": {
                "value": 0,
                "animation": {
                    "enable": false,
                    "speed": 0,
                    "decay": 0,
                    "sync": false
                },
                "direction": "clockwise",
                "enable": false
            },
            "twinkle": {
                "lines": {
                    "enable": false,
                    "frequency": 0.05,
                    "opacity": 1
                },
                "particles": {
                    "enable": true,
                    "frequency": 0.05,
                    "opacity": 1
                }
            },
            "wobble": {
                "distance": 5,
                "enable": false,
                "speed": {
                    "angle": 50,
                    "move": 10
                }
            },
            "life": {
                "count": 0,
                "delay": {
                    "value": 0,
                    "sync": false
                },
                "duration": {
                    "value": 0,
                    "sync": false
                }
            },
            "rotate": {
                "value": 0,
                "animation": {
                    "enable": false,
                    "speed": 0,
                    "decay": 0,
                    "sync": false
                },
                "direction": "clockwise",
                "path": false
            },
            "orbit": {
                "animation": {
                    "count": 0,
                    "enable": false,
                    "speed": 1,
                    "decay": 0,
                    "delay": 0,
                    "sync": false
                },
                "enable": false,
                "opacity": 1,
                "rotation": {
                    "value": 45
                },
                "width": 1
            },
            "links": {
                "blink": false,
                "color": {
                    "value": "#ffffff"
                },
                "consent": false,
                "distance": 150,
                "enable": true,
                "frequency": 1,
                "opacity": 0.4,
                "shadow": {
                    "blur": 5,
                    "color": {
                        "value": "#000"
                    },
                    "enable": false
                },
                "triangles": {
                    "enable": false,
                    "frequency": 1
                },
                "width": 1,
                "warp": false
            },
            "repulse": {
                "value": 0,
                "enabled": false,
                "distance": 1,
                "duration": 1,
                "factor": 1,
                "speed": 1
            }
        },
        "pauseOnBlur": true,
        "pauseOnOutsideViewport": true,
        "responsive": [],
        "smooth": false,
        "style": {},
        "themes": [],
        "zLayers": 100,
        "motion": {
            "disable": false,
            "reduce": {
                "factor": 4,
                "value": true
            }
        }
    };

    // Initialize tsParticles
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('tsparticles', particlesConfig).then(container => {
            console.log('tsParticles loaded successfully with parallax effect');
            
            // Add custom interactions
            setupCustomInteractions(container);
        }).catch(error => {
            console.error('Error loading tsParticles:', error);
            createFallbackParticles();
        });
    } else {
        console.error('tsParticles library not found');
        createFallbackParticles();
    }
});

// Custom interactions for the particle system
function setupCustomInteractions(container) {
    // Add click effect for disaster alerts
    document.addEventListener('click', (event) => {
        if (!container || !container.particles) return;
        
        const rect = container.canvas.element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Create a ripple effect on click
        createRippleEffect(container, x, y);
    });

    // Add mouse move effect for parallax enhancement
    document.addEventListener('mousemove', (event) => {
        if (!container || !container.particles) return;
        
        const rect = container.canvas.element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Enhance parallax effect based on mouse position
        enhanceParallax(container, x, y);
    });

    // Add scroll effect for dynamic particle movement
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (!container || !container.particles) return;
        
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Adjust particle speed based on scroll
        adjustParticlesOnScroll(container, scrollDelta);
        
        lastScrollY = currentScrollY;
    });
}

// Create ripple effect on click
function createRippleEffect(container, x, y) {
    const particles = container.particles.array;
    
    // Create multiple particles at click location
    for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const velocity = Math.random() * 5 + 2;
        
        const particle = container.particles.addParticle({
            x: x,
            y: y,
            color: getRandomDisasterColor(),
            size: Math.random() * 8 + 2
        });
        
        if (particle) {
            particle.velocity.x = Math.cos(angle) * velocity;
            particle.velocity.y = Math.sin(angle) * velocity;
        }
    }
}

// Enhance parallax effect based on mouse position
function enhanceParallax(container, mouseX, mouseY) {
    const particles = container.particles.array;
    const canvas = container.canvas.element;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    
    // Calculate parallax intensity based on mouse distance from center
    const intensity = Math.sqrt(dx * dx + dy * dy) / Math.max(canvas.width, canvas.height);
    
    particles.forEach(particle => {
        if (!particle) return;
        
        // Calculate distance from particle to mouse
        const pdx = particle.position.x - mouseX;
        const pdy = particle.position.y - mouseY;
        const distance = Math.sqrt(pdx * pdx + pdy * pdy);
        
        // Only affect particles within 200px of mouse
        if (distance < 200) {
            const force = (200 - distance) / 200 * intensity * 0.5;
            const angle = Math.atan2(pdy, pdx);
            
            // Apply gentle push away from cursor
            particle.velocity.x += Math.cos(angle) * force;
            particle.velocity.y += Math.sin(angle) * force;
            
            // Limit velocity
            const maxSpeed = 5;
            const currentSpeed = Math.sqrt(
                particle.velocity.x * particle.velocity.x + 
                particle.velocity.y * particle.velocity.y
            );
            
            if (currentSpeed > maxSpeed) {
                particle.velocity.x = (particle.velocity.x / currentSpeed) * maxSpeed;
                particle.velocity.y = (particle.velocity.y / currentSpeed) * maxSpeed;
            }
        }
    });
}

// Adjust particles based on scroll
function adjustParticlesOnScroll(container, scrollDelta) {
    const particles = container.particles.array;
    
    // Only adjust if significant scroll
    if (Math.abs(scrollDelta) > 10) {
        const scrollFactor = scrollDelta * 0.01;
        
        particles.forEach(particle => {
            if (!particle) return;
            
            // Add slight vertical movement based on scroll direction
            particle.velocity.y += scrollFactor * 0.5;
            
            // Add slight opacity change
            if (particle.opacity) {
                const newOpacity = particle.opacity.value + (scrollFactor * 0.02);
                particle.opacity.value = Math.max(0.1, Math.min(0.8, newOpacity));
            }
        });
    }
}

// Get random color for disaster theme
function getRandomDisasterColor() {
    const colors = [
        "#0066cc",  // Blue - Water/Flood
        "#ff6600",  // Orange - Fire
        "#2a9d8f",  // Green - Land/Earth
        "#7209b7",  // Purple - Volcanic
        "#e63946",  // Red - Emergency
        "#f9c74f",  // Yellow - Warning
        "#4cc9f0"   // Light Blue - Weather
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fallback particle system if tsParticles fails
function createFallbackParticles() {
    const container = document.getElementById('tsparticles');
    if (!container) return;
    
    container.innerHTML = `
        <div class="fallback-particles">
            <style>
                .fallback-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: -2;
                }
                
                .fallback-particle {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(135deg, 
                        rgba(0, 102, 204, 0.6), 
                        rgba(114, 9, 183, 0.4));
                    animation: float 20s infinite linear;
                    opacity: 0.3;
                }
                
                @keyframes float {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(100px, 100px) rotate(90deg);
                    }
                    50% {
                        transform: translate(200px, 0) rotate(180deg);
                    }
                    75% {
                        transform: translate(100px, -100px) rotate(270deg);
                    }
                    100% {
                        transform: translate(0, 0) rotate(360deg);
                    }
                }
            </style>
        </div>
    `;
    
    const particleContainer = container.querySelector('.fallback-particles');
    
    // Create fallback particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'fallback-particle';
        
        // Random properties
        const size = Math.random() * 80 + 20;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        // Add random color
        const color = getRandomDisasterColor();
        particle.style.background = `radial-gradient(circle, ${color}30, ${color}10)`;
        
        particleContainer.appendChild(particle);
    }
    
    console.log('Fallback particle system created');
}

// Handle window resize
window.addEventListener('resize', function() {
    // tsParticles automatically handles resize
    console.log('Window resized - tsParticles adjusting');
});

// Add particle control functions for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🔧 Particle Controls Available:', 'color: #ff6600; font-weight: bold;');
    console.log('- Change particle count: changeParticleCount(number)');
    console.log('- Toggle links: toggleLinks()');
    console.log('- Change speed: changeParticleSpeed(value)');
    
    window.changeParticleCount = function(count) {
        const container = tsParticles.domItem(0);
        if (container) {
            container.options.particles.number.value = count;
            container.refresh();
        }
    };
    
    window.toggleLinks = function() {
        const container = tsParticles.domItem(0);
        if (container) {
            container.options.particles.links.enable = !container.options.particles.links.enable;
            container.refresh();
        }
    };
    
    window.changeParticleSpeed = function(speed) {
        const container = tsParticles.domItem(0);
        if (container) {
            container.options.particles.move.speed = speed;
            container.refresh();
        }
    };
}
