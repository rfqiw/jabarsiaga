// Weather Data Handler - BMKG Jawa Barat (27 Kota)

class WeatherManager {
    constructor() {
        this.weatherData = [];
        this.currentSlide = 0;
        this.slidesToShow = 4;
        this.autoSlideInterval = null;
        this.slideInterval = 6000; // 6 seconds
        
        // 27 Kabupaten/Kota di Jawa Barat
        this.jabarCities = [
            { name: 'Bandung', type: 'Kota' },
            { name: 'Bandung', type: 'Kabupaten' },
            { name: 'Bekasi', type: 'Kota' },
            { name: 'Bekasi', type: 'Kabupaten' },
            { name: 'Bogor', type: 'Kota' },
            { name: 'Bogor', type: 'Kabupaten' },
            { name: 'Cimahi', type: 'Kota' },
            { name: 'Cirebon', type: 'Kota' },
            { name: 'Cirebon', type: 'Kabupaten' },
            { name: 'Depok', type: 'Kota' },
            { name: 'Sukabumi', type: 'Kota' },
            { name: 'Sukabumi', type: 'Kabupaten' },
            { name: 'Tasikmalaya', type: 'Kota' },
            { name: 'Tasikmalaya', type: 'Kabupaten' },
            { name: 'Banjar', type: 'Kota' },
            { name: 'Garut', type: 'Kabupaten' },
            { name: 'Karawang', type: 'Kabupaten' },
            { name: 'Purwakarta', type: 'Kabupaten' },
            { name: 'Subang', type: 'Kabupaten' },
            { name: 'Indramayu', type: 'Kabupaten' },
            { name: 'Sumedang', type: 'Kabupaten' },
            { name: 'Majalengka', type: 'Kabupaten' },
            { name: 'Kuningan', type: 'Kabupaten' },
            { name: 'Ciamis', type: 'Kabupaten' },
            { name: 'Pangandaran', type: 'Kabupaten' },
            { name: 'Cianjur', type: 'Kabupaten' },
            { name: 'West Bandung', type: 'Kabupaten' }
        ];
        
        this.init();
    }
    
    async init() {
        // Initialize carousel
        this.initCarouselControls();
        
        // Load weather data
        await this.fetchWeatherData();
        
        // Start auto slide
        this.startAutoSlide();
        
        // Update last updated time
        this.updateLastUpdated();
    }
    
    async fetchWeatherData() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Simulate API call with sample data for 27 cities
            // In production, this would call BMKG API
            await this.generateSampleWeatherData();
            
            // Update carousel
            this.updateWeatherCarousel();
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showErrorState();
        }
    }
    
    async generateSampleWeatherData() {
        this.weatherData = [];
        
        // Generate sample weather data for each city
        const weatherConditions = [
            { condition: 'Cerah', icon: 'fa-sun', tempRange: { min: 25, max: 32 } },
            { condition: 'Cerah Berawan', icon: 'fa-cloud-sun', tempRange: { min: 24, max: 30 } },
            { condition: 'Berawan', icon: 'fa-cloud', tempRange: { min: 23, max: 29 } },
            { condition: 'Hujan Ringan', icon: 'fa-cloud-rain', tempRange: { min: 22, max: 27 } },
            { condition: 'Hujan Sedang', icon: 'fa-cloud-showers-heavy', tempRange: { min: 21, max: 26 } },
            { condition: 'Hujan Lebat', icon: 'fa-poo-storm', tempRange: { min: 20, max: 25 } }
        ];
        
        const windDirections = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
        
        this.jabarCities.forEach(city => {
            const weatherType = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            const temp = Math.floor(Math.random() * 
                (weatherType.tempRange.max - weatherType.tempRange.min + 1)) + weatherType.tempRange.min;
            const humidity = Math.floor(Math.random() * 30) + 60; // 60-90%
            const windSpeed = Math.floor(Math.random() * 15) + 5; // 5-20 km/jam
            const windDirection = windDirections[Math.floor(Math.random() * windDirections.length)];
            
            this.weatherData.push({
                city: `${city.type} ${city.name}`,
                timestamp: new Date().toISOString(),
                temperature: `${temp}°C`,
                humidity: `${humidity}%`,
                windSpeed: `${windSpeed} km/jam`,
                windDirection: windDirection,
                weatherCondition: weatherType.condition,
                icon: weatherType.icon
            });
        });
        
        // Sort alphabetically
        this.weatherData.sort((a, b) => a.city.localeCompare(b.city));
    }
    
    updateWeatherCarousel() {
        const carousel = document.getElementById('weatherCarousel');
        
        if (!carousel || this.weatherData.length === 0) return;
        
        // Clear loading state
        carousel.innerHTML = '';
        
        // Create weather cards
        this.weatherData.forEach((weather, index) => {
            const card = this.createWeatherCard(weather, index);
            carousel.appendChild(card);
        });
        
        // Update dots
        this.updateCarouselDots();
        
        // Show first slide
        this.showSlide(0);
    }
    
    createWeatherCard(weather, index) {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.dataset.index = index;
        
        const time = new Date(weather.timestamp).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Determine background color based on weather
        let weatherClass = '';
        if (weather.weatherCondition.includes('Hujan')) {
            weatherClass = 'rainy';
        } else if (weather.weatherCondition.includes('Cerah')) {
            weatherClass = 'sunny';
        } else {
            weatherClass = 'cloudy';
        }
        
        card.innerHTML = `
            <div class="weather-location">
                <div class="location-name">${weather.city}</div>
                <div class="location-time">${time}</div>
            </div>
            <div class="weather-main">
                <div class="temperature">${weather.temperature}</div>
                <div class="weather-icon">
                    <i class="fas ${weather.icon}"></i>
                </div>
            </div>
            <div class="weather-condition">${weather.weatherCondition}</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <div class="detail-icon">
                        <i class="fas fa-tint"></i>
                    </div>
                    <div>
                        <div class="detail-label">Kelembapan</div>
                        <div class="detail-value">${weather.humidity}</div>
                    </div>
                </div>
                <div class="weather-detail">
                    <div class="detail-icon">
                        <i class="fas fa-wind"></i>
                    </div>
                    <div>
                        <div class="detail-label">Angin</div>
                        <div class="detail-value">${weather.windSpeed}</div>
                    </div>
                </div>
                <div class="weather-detail">
                    <div class="detail-icon">
                        <i class="fas fa-compass"></i>
                    </div>
                    <div>
                        <div class="detail-label">Arah</div>
                        <div class="detail-value">${weather.windDirection}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Add weather class for styling
        card.classList.add(weatherClass);
        
        return card;
    }
    
    initCarouselControls() {
        const prevBtn = document.getElementById('weatherPrev');
        const nextBtn = document.getElementById('weatherNext');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Pause auto slide on hover
        const carousel = document.getElementById('weatherCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoSlide());
            carousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        // Touch events for mobile
        let startX = 0;
        let endX = 0;
        
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                this.pauseAutoSlide();
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) {
                    this.nextSlide();
                } else if (endX - startX > 50) {
                    this.prevSlide();
                }
                this.startAutoSlide();
            });
        }
    }
    
    updateCarouselDots() {
        const dotsContainer = document.getElementById('weatherDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const slideCount = Math.ceil(this.weatherData.length / this.slidesToShow);
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dot.addEventListener('click', () => this.showSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    showSlide(slideIndex) {
        const carousel = document.getElementById('weatherCarousel');
        if (!carousel || this.weatherData.length === 0) return;
        
        const slideCount = Math.ceil(this.weatherData.length / this.slidesToShow);
        const normalizedIndex = ((slideIndex % slideCount) + slideCount) % slideCount;
        
        this.currentSlide = normalizedIndex;
        
        // Calculate scroll position
        const cardWidth = 280 + 16; // card width + gap
        const scrollPosition = normalizedIndex * this.slidesToShow * cardWidth;
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === normalizedIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    nextSlide() {
        const slideCount = Math.ceil(this.weatherData.length / this.slidesToShow);
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        const slideCount = Math.ceil(this.weatherData.length / this.slidesToShow);
        this.showSlide(this.currentSlide - 1);
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    showLoadingState() {
        const carousel = document.getElementById('weatherCarousel');
        if (carousel) {
            carousel.innerHTML = `
                <div class="weather-loading">
                    <div class="loading-spinner small"></div>
                    <p>Memuat data cuaca 27 kota dari BMKG...</p>
                </div>
            `;
        }
    }
    
    showErrorState() {
        const carousel = document.getElementById('weatherCarousel');
        if (carousel) {
            carousel.innerHTML = `
                <div class="weather-loading" style="color: #e63946;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Gagal memuat data cuaca.</p>
                    <button id="retryWeather" style="margin-top: 1rem; padding: 0.8rem 1.5rem; background: #0066cc; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Coba Lagi
                    </button>
                </div>
            `;
            
            const retryBtn = document.getElementById('retryWeather');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => this.fetchWeatherData());
            }
        }
    }
    
    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('weatherLastUpdated');
        if (lastUpdatedElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            const dateString = now.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            lastUpdatedElement.innerHTML = `
                <i class="fas fa-sync-alt"></i> Diperbarui: ${dateString}, ${timeString}
            `;
            
            // Update every minute
            setInterval(() => {
                const newNow = new Date();
                const newTimeString = newNow.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                });
                const newDateString = newNow.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                lastUpdatedElement.innerHTML = `
                    <i class="fas fa-sync-alt"></i> Diperbarui: ${newDateString}, ${newTimeString}
                `;
            }, 60000); // Update every minute
        }
    }
    
    // Refresh weather data
    async refreshWeatherData() {
        this.showLoadingState();
        await this.fetchWeatherData();
    }
}

// Initialize weather manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherManager = new WeatherManager();
    
    // Auto-refresh every 30 minutes
    setInterval(() => {
        if (window.weatherManager) {
            window.weatherManager.refreshWeatherData();
        }
    }, 30 * 60 * 1000);
});
