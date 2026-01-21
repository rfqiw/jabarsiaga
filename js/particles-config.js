// Particles.js Configuration for Jabar Siaga
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#0066cc", "#ff6600", "#2a9d8f", "#7209b7", "#e63946"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.3
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Add mouse move effect for parallax
    document.addEventListener('mousemove', function(e) {
        const particles = window.pJSDom[0].pJS.particles;
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Adjust particle movement based on mouse position
        particles.array.forEach(particle => {
            const dx = mouseX - (particle.x / window.innerWidth);
            const dy = mouseY - (particle.y / window.innerHeight);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.3) {
                const force = (0.3 - distance) * 2;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.canvasSize();
            window.pJSDom[0].pJS.fn.canvasPaint();
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    });
});
