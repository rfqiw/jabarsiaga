// Charts for Disaster Data Visualization
class ChartManager {
    constructor() {
        this.disasterData = this.parseCSVData();
        this.init();
    }
    
    parseCSVData() {
        // CSV data from the provided string
        const csvData = `Kabupaten/Kota,Jumlah Bencana Alam - Gempa Bumi,Jumlah Bencana Alam - Tsunami,Jumlah Bencana Alam - Gempa Bumi dan Tsunami,Jumlah Bencana Alam - Letusan Gunung Api,Jumlah Bencana Alam - Tanah Longsor,Jumlah Bencana Alam - Banjir,Jumlah Bencana Alam - Kekeringan,Jumlah Bencana Alam - Kebakaran Hutan dan Lahan,Jumlah Bencana Alam - Cuaca Ekstrem,Jumlah Bencana Alam - Gelombang Pasang/Abrasi
Bogor,3,,,,14,15,5,,65,
Sukabumi,3,,,,8,6,,,5,1
Cianjur,1,,,,5,2,,,1,
Bandung,3,,,,3,8,1,,8,
Garut,3,,,,1,,,1,1,
Tasikmalaya,1,,,,2,,,,,
Ciamis,1,,,,2,1,,,5,
Kuningan,1,,,,1,1,,1,,
Cirebon,,,,,,6,1,3,2,
Majalengka,1,,,,2,1,,2,1,
Sumedang,1,,,,,3,,,1,
Indramayu,,,,,,4,,,2,
Subang,1,,,,1,4,,4,1,
Purwakarta,2,,,,2,1,,,,
Karawang,,,,,,11,2,,,
Bekasi,,,,,1,4,1,,1,
Bandung Barat,3,,,,5,2,,,4,
Pangandaran,1,,,,,,,,,
Kota Bogor,,,,,1,1,,,2,
Kota Sukabumi,1,,,,1,2,,,2,
Kota Bandung,2,,,,1,1,,,,
Kota Cirebon,,,,,,1,,,,
Kota Bekasi,,,,,,4,,,,
Kota Depok,,,,,,,,,,
Kota Cimahi,2,,,,,,,,,
Kota Tasikmalaya,1,,,,,1,,,,
Kota Banjar,1,,,,,,,,,
Jawa Barat,6,,,,50,79,10,11,101,1`;
        
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const data = [];
        
        for (let i = 1; i < lines.length - 1; i++) { // Skip last line (Jawa Barat total)
            const values = lines[i].split(',');
            const region = values[0];
            
            // Calculate total disasters
            let total = 0;
            for (let j = 1; j < values.length; j++) {
                const val = values[j].trim();
                if (val && !isNaN(parseInt(val))) {
                    total += parseInt(val);
                }
            }
            
            if (total > 0 && region !== 'Jawa Barat') { // Only include regions with disasters
                data.push({
                    region: region,
                    total: total,
                    details: {
                        gempa: parseInt(values[1]) || 0,
                        tsunami: parseInt(values[2]) || 0,
                        gempaTsunami: parseInt(values[3]) || 0,
                        gunungApi: parseInt(values[4]) || 0,
                        tanahLongsor: parseInt(values[5]) || 0,
                        banjir: parseInt(values[6]) || 0,
                        kekeringan: parseInt(values[7]) || 0,
                        kebakaran: parseInt(values[8]) || 0,
                        cuacaEkstrem: parseInt(values[9]) || 0,
                        gelombangPasang: parseInt(values[10]) || 0
                    }
                });
            }
        }
        
        // Sort by total disasters
        data.sort((a, b) => b.total - a.total);
        
        return data;
    }
    
    init() {
        this.renderDisasterChart();
        this.renderTypeChart();
        this.renderTopDisasters();
        this.updateStats();
    }
    
    renderDisasterChart() {
        const ctx = document.getElementById('disasterChart');
        if (!ctx) return;
        
        // Get top 15 regions
        const topRegions = this.disasterData.slice(0, 15);
        const labels = topRegions.map(d => d.region);
        const data = topRegions.map(d => d.total);
        
        // Create gradient
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 102, 204, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 102, 204, 0.2)');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Jumlah Bencana',
                    data: data,
                    backgroundColor: gradient,
                    borderColor: '#0066cc',
                    borderWidth: 1,
                    borderRadius: 5,
                    hoverBackgroundColor: '#ff6600'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Jumlah Bencana per Kabupaten/Kota (Top 15)',
                        color: '#ffffff',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah Bencana',
                            color: '#b8c7e0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#8ca3c7'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#8ca3c7',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    renderTypeChart() {
        const ctx = document.getElementById('typeChart');
        if (!ctx) return;
        
        // Calculate totals for each disaster type
        const types = {
            'Tanah Longsor': 0,
            'Banjir': 0,
            'Cuaca Ekstrem': 0,
            'Gempa Bumi': 0,
            'Kebakaran Hutan': 0,
            'Kekeringan': 0,
            'Lainnya': 0
        };
        
        this.disasterData.forEach(region => {
            types['Tanah Longsor'] += region.details.tanahLongsor;
            types['Banjir'] += region.details.banjir;
            types['Cuaca Ekstrem'] += region.details.cuacaEkstrem;
            types['Gempa Bumi'] += region.details.gempa;
            types['Kebakaran Hutan'] += region.details.kebakaran;
            types['Kekeringan'] += region.details.kekeringan;
            types['Lainnya'] += region.details.tsunami + region.details.gempaTsunami + 
                               region.details.gunungApi + region.details.gelombangPasang;
        });
        
        const labels = Object.keys(types);
        const data = Object.values(types);
        const colors = [
            '#e63946', '#0066cc', '#ff6600', '#2a9d8f', 
            '#7209b7', '#f9c74f', '#8ca3c7'
        ];
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            color: '#ffffff',
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribusi Jenis Bencana',
                        color: '#ffffff',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff'
                    }
                }
            }
        });
    }
    
    renderTopDisasters() {
        const container = document.getElementById('topDisasters');
        if (!container) return;
        
        // Get top 10 regions
        const top10 = this.disasterData.slice(0, 10);
        
        container.innerHTML = '';
        
        top10.forEach((region, index) => {
            const item = document.createElement('div');
            item.className = 'disaster-item';
            
            // Color based on rank
            let rankColor = '#8ca3c7';
            if (index === 0) rankColor = '#e63946';
            else if (index === 1) rankColor = '#ff6600';
            else if (index === 2) rankColor = '#f9c74f';
            
            item.innerHTML = `
                <div class="disaster-rank" style="background: ${rankColor}">${index + 1}</div>
                <div class="disaster-name">${region.region}</div>
                <div class="disaster-count">${region.total} bencana</div>
            `;
            
            container.appendChild(item);
        });
    }
    
    updateStats() {
        const summary = this.getDisasterSummary();
        
        // Update stat boxes with animation
        this.animateValue('totalDisasters', 0, summary.totalDisasters, 1500);
        this.animateValue('affectedRegions', 0, summary.affectedRegions, 1500);
        this.animateValue('avgDisasters', 0, summary.averagePerRegion, 1500);
        
        // Find top disaster type
        const types = this.getDisasterTypes();
        const topType = Object.entries(types).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        document.getElementById('topDisasterType').textContent = topType;
    }
    
    animateValue(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString('id-ID');
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    getDisasterSummary() {
        const totalDisasters = this.disasterData.reduce((sum, region) => sum + region.total, 0);
        const affectedRegions = this.disasterData.length;
        
        return {
            totalDisasters,
            affectedRegions,
            averagePerRegion: parseFloat((totalDisasters / affectedRegions).toFixed(1))
        };
    }
    
    getDisasterTypes() {
        const types = {
            'Tanah Longsor': 0,
            'Banjir': 0,
            'Cuaca Ekstrem': 0,
            'Gempa Bumi': 0,
            'Kebakaran Hutan': 0,
            'Kekeringan': 0,
            'Lainnya': 0
        };
        
        this.disasterData.forEach(region => {
            types['Tanah Longsor'] += region.details.tanahLongsor;
            types['Banjir'] += region.details.banjir;
            types['Cuaca Ekstrem'] += region.details.cuacaEkstrem;
            types['Gempa Bumi'] += region.details.gempa;
            types['Kebakaran Hutan'] += region.details.kebakaran;
            types['Kekeringan'] += region.details.kekeringan;
            types['Lainnya'] += region.details.tsunami + region.details.gempaTsunami + 
                               region.details.gunungApi + region.details.gelombangPasang;
        });
        
        return types;
    }
}

// Initialize chart manager
document.addEventListener('DOMContentLoaded', () => {
    window.chartManager = new ChartManager();
    
    // Log summary to console
    const summary = window.chartManager.getDisasterSummary();
    console.log(`📊 Ringkasan Data Bencana Jawa Barat 2024:`);
    console.log(`   • Total Bencana: ${summary.totalDisasters}`);
    console.log(`   • Daerah Terdampak: ${summary.affectedRegions} kabupaten/kota`);
    console.log(`   • Rata-rata per daerah: ${summary.averagePerRegion} bencana`);
});
