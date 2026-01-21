// Main JavaScript File - Jabar Siaga

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initSmoothScroll();
    initButtonActions();
    initFullscreenMaps();
    initRippleButtons();
    
    // Show console welcome message
    console.log('%c🚨 Jabar Siaga - Portal Kebencanaan Jawa Barat', 'color: #0066cc; font-size: 18px; font-weight: bold;');
    console.log('%c7 Peta Rawan Bencana | Sistem Pemantauan Real-time', 'color: #ff6600;');
    console.log('%cData resmi BPBD, BNPB, dan BMKG', 'color: #2a9d8f;');
});

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Minimum loading time for better UX
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
                scrollToSection(targetId);
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
                const targetIdClean = targetId.substring(1);
                scrollToSection(targetIdClean);
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

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
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

// Button Actions
function initButtonActions() {
    // Access Map Button
    const accessMapBtn = document.getElementById('accessMapBtn');
    if (accessMapBtn) {
        accessMapBtn.addEventListener('click', () => {
            scrollToSection('maps');
        });
    }
    
    // Dashboard Button
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            scrollToSection('dashboard');
        });
    }
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
    const buttons = document.querySelectorAll('.glow-button, .outline-button');
    
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

// Initialize on window load
window.addEventListener('load', function() {
    // Update copyright year
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
    
    // Check for console errors
    console.log('%c✅ Sistem Jabar Siaga berhasil dimuat', 'color: #2a9d8f; font-weight: bold;');
});
