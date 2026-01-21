// Main JavaScript File - Jabar Siaga Portal WebGIS Kebencanaan

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initSmoothScroll();
    initLazyLoading();
    initFullscreenMaps();
    initRippleButtons();
    initButtonFunctions();
    
    // Initialize infografis
    if (typeof window.initInfografis === 'function') {
        window.initInfografis();
    }
    
    // Initialize dashboard charts
    initDashboardCharts();
    
    // Show system notice in console
    console.log('%c🌐 Jabar Siaga - Portal WebGIS Kebencanaan Jawa Barat', 'color: #0066cc; font-size: 16px; font-weight: bold;');
    console.log('%cSistem Informasi 7 Peta Rawan Bencana Jawa Barat', 'color: #ff6600;');
    console.log('%cData KRB 27 kabupaten/kota tersedia untuk analisis risiko', 'color: #2a9d8f;');
});

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate minimum loading time for better UX
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 1500);
}

// Navigation Initialization
function initNavigation() {
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Active link management
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // If it's an anchor link, handle smooth scroll
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll Initialization
function initSmoothScroll() {
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
}

// Initialize Button Functions
function initButtonFunctions() {
    // Akses Peta button
    const aksesPetaBtn = document.getElementById('aksesPetaBtn');
    if (aksesPetaBtn) {
        aksesPetaBtn.addEventListener('click', () => {
            const mapsSection = document.getElementById('maps');
            if (mapsSection) {
                const headerOffset = 80;
                const elementPosition = mapsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector('a[href="#maps"]').classList.add('active');
            }
        });
    }
    
    // Dashboard button
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            const dashboardSection = document.getElementById('dashboard');
            if (dashboardSection) {
                const headerOffset = 80;
                const elementPosition = dashboardSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector('a[href="#dashboard"]').classList.add('active');
            }
        });
    }
}

// Lazy Loading for 3D Map
function initLazyLoading() {
    const lazyIframes = document.querySelectorAll('.lazy-load');
    const loadButtons = document.querySelectorAll('.load-map-btn');
    
    // Load iframe when button is clicked
    loadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.lazy-load-placeholder');
            const iframe = container.previousElementSibling;
            
            if (iframe && iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                container.style.opacity = '0';
                
                setTimeout(() => {
                    container.style.display = 'none';
                }, 400);
            }
        });
    });
    
    // Load iframe when scrolled into view
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                
                if (iframe.dataset.src) {
                    // Small delay for better UX
                    setTimeout(() => {
                        iframe.src = iframe.dataset.src;
                        iframe.classList.remove('lazy-load');
                    }, 300);
                }
                
                lazyObserver.unobserve(iframe);
            }
        });
    }, { rootMargin: '100px' });
    
    lazyIframes.forEach(iframe => {
        lazyObserver.observe(iframe);
    });
}

// Fullscreen Map Functionality
function initFullscreenMaps() {
    const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');
    
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const iframe = document.getElementById(targetId);
            
            if (iframe) {
                openFullscreenMap(iframe.src, iframe.title);
            }
        });
    });
    
    // Close fullscreen with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFullscreenMap();
        }
    });
}

function openFullscreenMap(src, title) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.innerHTML = `
        <div class="fullscreen-header">
            <h3 style="margin: 0; color: white;">${title}</h3>
            <button class="fullscreen-close">
                <i class="fas fa-times"></i> Tutup Layar Penuh
            </button>
        </div>
        <div class="fullscreen-content">
            <iframe class="fullscreen-iframe" src="${src}" title="${title}"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add active class for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close button functionality
    const closeBtn = modal.querySelector('.fullscreen-close');
    closeBtn.addEventListener('click', closeFullscreenMap);
}

function closeFullscreenMap() {
    const modal = document.querySelector('.fullscreen-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Ripple Button Effect
function initRippleButtons() {
    const buttons = document.querySelectorAll('.glow-button, .outline-button, .map-action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.button-ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';
            
            // Calculate ripple position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Dashboard Charts
function initDashboardCharts() {
    // Wait for KRB data to be loaded
    if (!window.krbData || !window.krbData.length) {
        setTimeout(initDashboardCharts, 500);
        return;
    }
    
    // Chart 1: Distribution of Risk Levels
    const riskDistributionChart = document.getElementById('riskDistributionChart');
    if (riskDistributionChart) {
        createRiskDistributionChart();
    }
    
    // Chart 2: Average Index by Disaster Type
    const bencanaChart = document.getElementById('bencanaChart');
    if (bencanaChart) {
        createBencanaChart();
    }
}

function createRiskDistributionChart() {
    const ctx = document.getElementById('riskDistributionChart').getContext('2d');
    
    // Calculate risk levels for all cities
    let rendah = 0, sedang = 0, tinggi = 0;
    
    window.krbData.forEach(city => {
        const avgRisk = calculateAverageRisk(city);
        if (avgRisk <= 3) rendah++;
        else if (avgRisk <= 6) sedang++;
        else tinggi++;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Rendah', 'Sedang', 'Tinggi'],
            datasets: [{
                data: [rendah, sedang, tinggi],
                backgroundColor: [
                    '#2a9d8f',
                    '#f4a261',
                    '#e63946'
                ],
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#b8c7e0',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} kota (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createBencanaChart() {
    const ctx = document.getElementById('bencanaChart').getContext('2d');
    
    // Calculate average for each disaster type
    const averages = {
        longsor: 0,
        banjir: 0,
        kebakaran: 0,
        tsunami: 0,
        kekeringan: 0,
        gunung_api: 0,
        gerakan_tanah: 0
    };
    
    window.krbData.forEach(city => {
        averages.longsor += city.longsor;
        averages.banjir += city.banjir;
        averages.kebakaran += city.kebakaran_hutan;
        averages.tsunami += city.tsunami;
        averages.kekeringan += city.kekeringan;
        averages.gunung_api += city.gunung_api;
        averages.gerakan_tanah += city.gerakan_tanah;
    });
    
    const totalCities = window.krbData.length;
    Object.keys(averages).forEach(key => {
        averages[key] = parseFloat((averages[key] / totalCities).toFixed(1));
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Longsor', 'Banjir', 'Kebakaran Hutan', 'Tsunami', 'Kekeringan', 'Gunung Api', 'Gerakan Tanah'],
            datasets: [{
                data: [
                    averages.longsor,
                    averages.banjir,
                    averages.kebakaran,
                    averages.tsunami,
                    averages.kekeringan,
                    averages.gunung_api,
                    averages.gerakan_tanah
                ],
                backgroundColor: [
                    '#7209b7',
                    '#4361ee',
                    '#f94144',
                    '#4cc9f0',
                    '#ffd166',
                    '#e63946',
                    '#f4a261'
                ],
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Rata-rata: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        color: '#b8c7e0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#b8c7e0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function calculateAverageRisk(city) {
    const risks = [
        city.longsor,
        city.banjir,
        city.kebakaran_hutan,
        city.tsunami,
        city.kekeringan,
        city.gunung_api,
        city.gerakan_tanah
    ];
    
    const sum = risks.reduce((a, b) => a + b, 0);
    return parseFloat((sum / risks.length).toFixed(1));
}

// Utility function for date formatting
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('id-ID', options);
}

// Utility function for number formatting
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize on window load
window.addEventListener('load', function() {
    // Update copyright year
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
    
    // Check for console errors
    console.log('%c✅ Semua sistem Jabar Siaga berhasil dimuat', 'color: #2a9d8f; font-weight: bold;');
    console.log('%c📊 Data KRB 27 kabupaten/kota siap digunakan', 'color: #7209b7;');
});
