// News Data for Jabar Siaga
class NewsManager {
    constructor() {
        this.newsData = [
            {
                title: '18 Bencana Terjang Jabar di Awal 2026, Karawang Jadi Titik Terparah',
                description: 'Sebanyak 18 bencana alam terjadi di Jawa Barat sejak awal tahun 2026 dengan Kabupaten Karawang sebagai daerah terdampak paling parah.',
                source: 'detik.com',
                date: '2026-01-15',
                url: 'https://www.detik.com/jabar/berita/d-8305133/18-bencana-terjang-jabar-di-awal-2026-karawang-jadi-titik-terparah'
            },
            {
                title: 'Jawa Barat Status Tanggap Darurat Bencana hingga April 2026',
                description: 'Pemprov Jabar menetapkan status tanggap darurat bencana hingga April 2026 dengan menyiapkan langkah-langkah khusus selama 72 jam pertama.',
                source: 'ayobandung.com',
                date: '2026-01-18',
                url: 'https://www.ayobandung.com/umum/7916597315/jawa-barat-status-tanggap-darurat-bencana-hingga-april-2026-ini-beberapa-jenis-bencana-dan-langkah-pertama-selama-72-jam'
            },
            {
                title: 'Awal Tahun 2026, BPBD Catat 26.318 Warga Jawa Barat Terdampak Bencana Alam',
                description: 'Badan Penanggulangan Bencana Daerah Jawa Barat mencatat sebanyak 26.318 warga terdampak bencana alam sejak awal tahun 2026.',
                source: 'jabar.nu.or.id',
                date: '2026-01-20',
                url: 'https://jabar.nu.or.id/seputar-jabar/awal-tahun-2026-bpbd-catat-26-318-warga-jawa-barat-terdampak-bencana-alam-flmuC'
            },
            {
                title: 'Daerah Provinsi Jawa Barat Rawan Bencana, Seluruh Pemerintah Kabupaten/Kota Menyatakan Siaga',
                description: 'Seluruh pemerintah kabupaten/kota di Jawa Barat menyatakan status siaga bencana mengingat tingginya potensi bencana alam di wilayah ini.',
                source: 'pikiran-rakyat.com',
                date: '2026-01-22',
                url: 'https://www.pikiran-rakyat.com/news/pr-019945008/daerah-provinsi-jawa-barat-rawan-bencana-seluruh-pemerintah-kabupatenkota-menyatakan-siaga-menghadapinya?page=all'
            },
            {
                title: 'Banjir hingga Longsor Melanda Sejumlah Daerah Jawa Barat, Pemprov Jabar Siapkan Rp328 Miliar Dana BTT 2026',
                description: 'Pemprov Jawa Barat menyiapkan dana sebesar Rp328 miliar untuk penanggulangan bencana tahun 2026 menyusul meningkatnya kejadian banjir dan longsor.',
                source: 'aksarajabar.pikiran-rakyat.com',
                date: '2026-01-25',
                url: 'https://aksarajabar.pikiran-rakyat.com/jabar/pr-999946075/banjir-hingga-longsor-melanda-sejumlah-daerah-jawa-barat-pemprov-jabar-siapkan-rp328-miliar-dana-btt-2026'
            },
            {
                title: 'Banjir Terparah di Jawa Barat: Karawang dan Bekasi Terendam Banjir, Ribuan Warga Dievakuasi',
                description: 'Banjir terparah sejak awal tahun melanda Karawang dan Bekasi, menyebabkan ribuan warga terpaksa dievakuasi ke tempat yang lebih aman.',
                source: 'transindonesia.co',
                date: '2026-01-20',
                url: 'https://transindonesia.co/2026/01/20/banjir-terparah-di-jawa-barat-karawang-dan-bekasi-terendam-banjir-ribuan-warga-dievakuasi/'
            },
            {
                title: 'Rentetan Bencana masih Terjadi di Jawa Barat',
                description: 'Rentetan bencana alam masih terus terjadi di berbagai wilayah Jawa Barat, membutuhkan perhatian dan penanganan serius dari semua pihak.',
                source: 'mediaindonesia.com',
                date: '2026-01-28',
                url: 'https://mediaindonesia.com/nusantara/850651/rentetan-bencana-masih-terjadi-di-jawa-barat'
            },
            {
                title: 'Pemprov Jabar Optimalkan Sistem Peringatan Dini Bencana',
                description: 'Pemerintah Provinsi Jawa Barat mengoptimalkan sistem peringatan dini bencana untuk meminimalisir korban jiwa dan kerugian material.',
                source: 'bpbd.jabarprov.go.id',
                date: '2026-01-30',
                url: 'https://bpbd.jabarprov.go.id'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderNews();
        
        // Refresh news every 2 hours
        setInterval(() => this.refreshNews(), 2 * 60 * 60 * 1000);
    }
    
    renderNews() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;
        
        newsGrid.innerHTML = '';
        
        this.newsData.forEach((news, index) => {
            const card = this.createNewsCard(news, index);
            newsGrid.appendChild(card);
        });
    }
    
    createNewsCard(news, index) {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        // Format date
        const date = new Date(news.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get random gradient for card
        const gradients = [
            'linear-gradient(135deg, #0066cc, #7209b7)',
            'linear-gradient(135deg, #ff6600, #e63946)',
            'linear-gradient(135deg, #2a9d8f, #4cc9f0)',
            'linear-gradient(135deg, #7209b7, #f9c74f)'
        ];
        const gradient = gradients[index % gradients.length];
        
        card.innerHTML = `
            <div class="news-image" style="background: ${gradient};">
                <div class="news-date">
                    <i class="far fa-calendar"></i> ${formattedDate}
                </div>
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-content">
                <span class="news-source">${news.source}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-description">${news.description}</p>
                <div class="news-actions">
                    <a href="${news.url}" target="_blank" class="news-btn primary">
                        <i class="fas fa-external-link-alt"></i> Baca Selengkapnya
                    </a>
                    <button class="news-btn secondary share-btn" data-title="${news.title}" data-url="${news.url}">
                        <i class="fas fa-share-alt"></i> Bagikan
                    </button>
                </div>
            </div>
        `;
        
        // Add share functionality
        const shareBtn = card.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareNews(
                shareBtn.dataset.title,
                shareBtn.dataset.url
            ));
        }
        
        return card;
    }
    
    refreshNews() {
        // Simulate fetching new news
        console.log('Memperbarui berita...');
        this.renderNews();
    }
    
    shareNews(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Berita kebencanaan dari Jabar Siaga',
                url: url
            }).catch(error => {
                console.log('Error sharing:', error);
                this.copyToClipboard(url);
            });
        } else {
            this.copyToClipboard(url);
        }
    }
    
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Show notification
        this.showNotification('Link berhasil disalin ke clipboard');
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0066cc;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize news manager
document.addEventListener('DOMContentLoaded', () => {
    window.newsManager = new NewsManager();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
