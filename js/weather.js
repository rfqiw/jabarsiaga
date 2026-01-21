// Weather Data for 27 Cities in West Java
class WeatherManager {
    constructor() {
        this.cities = [
            { name: 'Bandung', temp: 24, condition: 'Berawan', humidity: 75, wind: 10, icon: '⛅' },
            { name: 'Bogor', temp: 25, condition: 'Hujan Ringan', humidity: 80, wind: 8, icon: '🌧️' },
            { name: 'Bekasi', temp: 28, condition: 'Cerah Berawan', humidity: 70, wind: 12, icon: '⛅' },
            { name: 'Depok', temp: 26, condition: 'Berawan', humidity: 78, wind: 9, icon: '☁️' },
            { name: 'Cimahi', temp: 23, condition: 'Cerah', humidity: 72, wind: 11, icon: '☀️' },
            { name: 'Tasikmalaya', temp: 26, condition: 'Berawan', humidity: 77, wind: 9, icon: '☁️' },
            { name: 'Cirebon', temp: 30, condition: 'Cerah', humidity: 65, wind: 15, icon: '☀️' },
            { name: 'Sukabumi', temp: 24, condition: 'Hujan Ringan', humidity: 82, wind: 7, icon: '🌧️' },
            { name: 'Garut', temp: 25, condition: 'Hujan Ringan', humidity: 77, wind: 11, icon: '🌧️' },
            { name: 'Purwakarta', temp: 27, condition: 'Cerah Berawan', humidity: 68, wind: 13, icon: '⛅' },
            { name: 'Subang', temp: 29, condition: 'Cerah', humidity: 66, wind: 14, icon: '☀️' },
            { name: 'Sumedang', temp: 25, condition: 'Berawan', humidity: 74, wind: 10, icon: '☁️' },
            { name: 'Indramayu', temp: 31, condition: 'Cerah', humidity: 63, wind: 16, icon: '☀️' },
            { name: 'Karawang', temp: 30, condition: 'Cerah Berawan', humidity: 64, wind: 15, icon: '⛅' },
            { name: 'Cianjur', temp: 24, condition: 'Hujan Ringan', humidity: 79, wind: 8, icon: '🌧️' },
            { name: 'Kuningan', temp: 26, condition: 'Berawan', humidity: 73, wind: 11, icon: '☁️' },
            { name: 'Majalengka', temp: 27, condition: 'Cerah Berawan', humidity: 69, wind: 12, icon: '⛅' },
            { name: 'Pangandaran', temp: 28, condition: 'Cerah', humidity: 67, wind: 14, icon: '☀️' },
            { name: 'Kota Bandung', temp: 24, condition: 'Berawan', humidity: 75, wind: 10, icon: '☁️' },
            { name: 'Kota Bogor', temp: 25, condition: 'Hujan Ringan', humidity: 80, wind: 8, icon: '🌧️' },
            { name: 'Kota Bekasi', temp: 28, condition: 'Cerah Berawan', humidity: 70, wind: 12, icon: '⛅' },
            { name: 'Kota Depok', temp: 26, condition: 'Berawan', humidity: 78, wind: 9, icon: '☁️' },
            { name: 'Kota Cimahi', temp: 23, condition: 'Cerah', humidity: 72, wind: 11, icon: '☀️' },
            { name: 'Kota Tasikmalaya', temp: 26, condition: 'Berawan', humidity: 77, wind: 9, icon: '☁️' },
            { name: 'Kota Cirebon', temp: 30, condition: 'Cerah', humidity: 65, wind: 15, icon: '☀️' },
            { name: 'Kota Sukabumi', temp: 24, condition: 'Hujan Ringan', humidity: 82, wind: 7, icon: '🌧️' },
            { name: 'Kota Banjar', temp: 27, condition: 'Cerah Berawan', humidity: 71, wind: 12, icon: '⛅' }
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
        
        card.innerHTML = `
            <div class="weather-card-header">
                <div class="city-name">${city.name}</div>
                <div class="weather-icon">${city.icon}</div>
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
    
    updateWeather() {
        // Simulate weather changes
        this.cities = this.cities.map(city => {
            const tempChange = (Math.random() * 2 - 1); // -1 to +1
            const newTemp = Math.max(22, Math.min(32, city.temp + tempChange));
            
            // Randomly change condition occasionally
            let newCondition = city.condition;
            if (Math.random() > 0.8) {
                const conditions = ['Cerah', 'Berawan', 'Hujan Ringan', 'Cerah Berawan'];
                newCondition = conditions[Math.floor(Math.random() * conditions.length)];
            }
            
            return {
                ...city,
                temp: Math.round(newTemp * 10) / 10,
                condition: newCondition,
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
