// Weather Data for 27 Cities in West Java
class WeatherManager {
    constructor() {
        this.cities = [
            { name: 'Bandung', temp: 24, condition: 'Berawan', humidity: 75, wind: 10 },
            { name: 'Bogor', temp: 25, condition: 'Hujan Ringan', humidity: 80, wind: 8 },
            { name: 'Bekasi', temp: 28, condition: 'Cerah Berawan', humidity: 70, wind: 12 },
            { name: 'Depok', temp: 26, condition: 'Berawan', humidity: 78, wind: 9 },
            { name: 'Cimahi', temp: 23, condition: 'Cerah', humidity: 72, wind: 11 },
            { name: 'Tasikmalaya', temp: 26, condition: 'Berawan', humidity: 77, wind: 9 },
            { name: 'Cirebon', temp: 30, condition: 'Cerah', humidity: 65, wind: 15 },
            { name: 'Sukabumi', temp: 24, condition: 'Hujan Ringan', humidity: 82, wind: 7 },
            { name: 'Garut', temp: 25, condition: 'Hujan Ringan', humidity: 77, wind: 11 },
            { name: 'Purwakarta', temp: 27, condition: 'Cerah Berawan', humidity: 68, wind: 13 },
            { name: 'Subang', temp: 29, condition: 'Cerah', humidity: 66, wind: 14 },
            { name: 'Sumedang', temp: 25, condition: 'Berawan', humidity: 74, wind: 10 },
            { name: 'Indramayu', temp: 31, condition: 'Cerah', humidity: 63, wind: 16 },
            { name: 'Karawang', temp: 30, condition: 'Cerah Berawan', humidity: 64, wind: 15 },
            { name: 'Cianjur', temp: 24, condition: 'Hujan Ringan', humidity: 79, wind: 8 },
            { name: 'Kuningan', temp: 26, condition: 'Berawan', humidity: 73, wind: 11 },
            { name: 'Majalengka', temp: 27, condition: 'Cerah Berawan', humidity: 69, wind: 12 },
            { name: 'Pangandaran', temp: 28, condition: 'Cerah', humidity: 67, wind: 14 },
            { name: 'Kota Bandung', temp: 24, condition: 'Berawan', humidity: 75, wind: 10 },
            { name: 'Kota Bogor', temp: 25, condition: 'Hujan Ringan', humidity: 80, wind: 8 },
            { name: 'Kota Bekasi', temp: 28, condition: 'Cerah Berawan', humidity: 70, wind: 12 },
            { name: 'Kota Depok', temp: 26, condition: 'Berawan', humidity: 78, wind: 9 },
            { name: 'Kota Cimahi', temp: 23, condition: 'Cerah', humidity: 72, wind: 11 },
            { name: 'Kota Tasikmalaya', temp: 26, condition: 'Berawan', humidity: 77, wind: 9 },
            { name: 'Kota Cirebon', temp: 30, condition: 'Cerah', humidity: 65, wind: 15 },
            { name: 'Kota Sukabumi', temp: 24, condition: 'Hujan Ringan', humidity: 82, wind: 7 },
            { name: 'Kota Banjar', temp: 27, condition: 'Cerah Berawan', humidity: 71, wind: 12 }
        ];
        
        this.init();
    }
    
    init() {
        this.renderWeather();
        this.updateLastUpdated();
        
        // Update weather every 30 minutes
        setInterval(() => this.updateWeather(), 30 * 60 * 1000);
    }
    
    renderWeather() {
        const weatherGrid = document.getElementById('weatherGrid');
        if (!weatherGrid) return;
        
        weatherGrid.innerHTML = '';
        
        this.cities.forEach(city => {
            const card = this.createWeatherCard(city);
            weatherGrid.appendChild(card);
        });
    }
    
    createWeatherCard(city) {
        const card = document.createElement('div');
        card.className = 'weather-card';
        
        // Get weather icon based on condition
        const icon = this.getWeatherIcon(city.condition);
        
        card.innerHTML = `
            <div class="weather-card-header">
                <div class="city-name">${city.name}</div>
                <div class="weather-icon">${icon}</div>
            </div>
            <div class="weather-temp">${city.temp}°C</div>
            <div class="weather-condition">${city.condition}</div>
            <div class="weather-details">
                <span>💧 ${city.humidity}%</span>
                <span>💨 ${city.wind} km/j</span>
            </div>
        `;
        
        return card;
    }
    
    getWeatherIcon(condition) {
        if (condition.includes('Cerah')) return '☀️';
        if (condition.includes('Berawan')) return '⛅';
        if (condition.includes('Hujan')) return '🌧️';
        return '☁️';
    }
    
    updateWeather() {
        // Simulate weather changes
        this.cities = this.cities.map(city => {
            const tempChange = Math.random() * 2 - 1; // -1 to +1
            const newTemp = Math.max(22, Math.min(32, city.temp + tempChange));
            
            return {
                ...city,
                temp: Math.round(newTemp * 10) / 10,
                humidity: Math.max(60, Math.min(85, city.humidity + (Math.random() * 10 - 5)))
            };
        });
        
        this.renderWeather();
        this.updateLastUpdated();
    }
    
    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('weatherLastUpdated');
        if (lastUpdatedElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            
            lastUpdatedElement.innerHTML = `
                <i class="fas fa-sync-alt"></i> Terakhir diperbarui: ${timeString}
            `;
        }
    }
}

// Initialize weather manager
document.addEventListener('DOMContentLoaded', () => {
    window.weatherManager = new WeatherManager();
});
