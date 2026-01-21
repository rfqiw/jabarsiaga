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
        
        for (let i = 1; i < lines.length - 1; i++) {
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
            
            if (total > 0 && region !== 'Jawa Barat') {
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
        
        // Update data source text
        this.updateDataSource();
    }
    
    updateDataSource() {
        const dataSource = document.querySelector('.data-source p');
        if (dataSource) {
            dataSource.innerHTML = `<i class="fas fa-database"></i> <strong>Sumber Data:</strong> Badan Pusat Statistik (BPS) Provinsi Jawa Barat`;
        }
    }
    
    // ... (sisanya tetap sama seperti file charts.js sebelumnya)
    // Hanya bagian data-source yang diubah
    
    renderDisasterChart() {
        // ... (kode tetap sama)
    }
    
    renderTypeChart() {
        // ... (kode tetap sama)
    }
    
    renderTopDisasters() {
        // ... (kode tetap sama)
    }
    
    updateStats() {
        // ... (kode tetap sama)
    }
    
    animateValue(elementId, start, end, duration) {
        // ... (kode tetap sama)
    }
    
    getDisasterSummary() {
        // ... (kode tetap sama)
    }
    
    getDisasterTypes() {
        // ... (kode tetap sama)
    }
}

// Initialize chart manager
document.addEventListener('DOMContentLoaded', () => {
    window.chartManager = new ChartManager();
    
    // Log summary to console
    const summary = window.chartManager.getDisasterSummary();
    console.log(`📊 Ringkasan Data Bencana Jawa Barat 2024 (Sumber: BPS):`);
    console.log(`   • Total Bencana: ${summary.totalDisasters}`);
    console.log(`   • Daerah Terdampak: ${summary.affectedRegions} kabupaten/kota`);
    console.log(`   • Rata-rata per daerah: ${summary.averagePerRegion} bencana`);
});
