// Game Edukasi Simulasi Bencana - Revisi Lengkap

class DisasterSimulationGame {
    constructor() {
        this.currentScenario = null;
        this.currentPhase = 0;
        this.currentDecision = null;
        this.score = {
            preparedness: 0,    // Kesiapsiagaan (0-100)
            injuryRisk: 0,      // Risiko Cedera (0-100, semakin rendah越好)
            timeToSafety: 0,    // Waktu Aman (dalam menit, semakin rendah越好)
            compliance: 0       // Kepatuhan Informasi (0-100)
        };
        this.phaseHistory = [];
        this.gameStarted = false;
        this.gameCompleted = false;
        this.startTime = null;
        this.timerInterval = null;
        
        this.scenarios = this.getScenarios();
        this.init();
    }
    
    getScenarios() {
        return {
            gempa: {
                name: "Gempa Bumi",
                icon: "fas fa-mountain",
                description: "Anda berada di rumah ketika terjadi gempa dengan intensitas sedang-kuat. Latih respons yang tepat untuk menyelamatkan diri.",
                phases: this.getGempaPhases(),
                recommendations: [
                    "Selalu siapkan tas siaga di tempat yang mudah dijangkau",
                    "Kenali titik aman di setiap ruangan (di bawah meja, sudut yang kokoh)",
                    "Setelah gempa berhenti, segera evakuasi ke titik kumpul",
                    "Jangan gunakan lift saat terjadi gempa",
                    "Periksa kerusakan infrastruktur sebelum kembali ke dalam"
                ]
            },
            banjir: {
                name: "Banjir",
                icon: "fas fa-water",
                description: "Hujan deras terus menerus menyebabkan potensi banjir bandang di wilayah Anda. Ambil keputusan yang tepat untuk menyelamatkan diri.",
                phases: this.getBanjirPhases(),
                recommendations: [
                    "Pantau informasi ketinggian air dari sumber resmi",
                    "Siapkan perahu karet atau pelampung darurat",
                    "Matikan aliran listrik di rumah jika air mulai masuk",
                    "Hindari berjalan di air yang mengalir deras",
                    "Simpan dokumen penting dalam wadah kedap air"
                ]
            },
            longsor: {
                name: "Tanah Longsor",
                icon: "fas fa-sliders-h",
                description: "Curah hujan tinggi menyebabkan tanah di lereng bukit mulai jenuh. Kenali tanda-tanda dan ambil tindakan yang tepat.",
                phases: this.getLongsorPhases(),
                recommendations: [
                    "Kenali tanda-tanda longsor: retakan tanah, air keruh, pohon miring",
                    "Evakuasi ke zona aman yang lebih tinggi",
                    "Hindari daerah lereng curam saat hujan lebat",
                    "Laporkan tanda-tanda longsor kepada pihak berwenang",
                    "Jangan kembali ke zona berisiko sebelum dinyatakan aman"
                ]
            },
            cuaca: {
                name: "Cuaca Ekstrem",
                icon: "fas fa-bolt",
                description: "Badai petir disertai angin kencang melanda wilayah Anda. Latih kesiapsiagaan menghadapi cuaca ekstrem.",
                phases: this.getCuacaPhases(),
                recommendations: [
                    "Cari tempat berlindung yang kokoh saat badai",
                    "Jangan berdiri di bawah pohon atau tiang listrik",
                    "Matikan peralatan elektronik yang tidak perlu",
                    "Siapkan sumber penerangan alternatif",
                    "Pantau peringatan dini dari BMKG"
                ]
            }
        };
    }
    
    getGempaPhases() {
        return [
            {
                id: 1,
                title: "Peringatan Dini",
                description: "BMKG mengeluarkan peringatan potensi gempa susulan setelah gempa utama 6.2 SR. Apa yang Anda lakukan?",
                context: "Gempa utama terjadi 30 menit lalu dengan intensitas 6.2 SR. BMKG memprediksi kemungkinan gempa susulan dalam 2 jam ke depan.",
                decisions: [
                    {
                        id: "A3",
                        title: "Tunggu Instruksi Resmi",
                        text: "Menunggu instruksi resmi dari pemerintah sebelum melakukan apapun",
                        correct: false,
                        impact: {
                            preparedness: -15,
                            injuryRisk: 35,
                            timeToSafety: 15,
                            compliance: 5
                        },
                        feedback: "SALAH! Dalam situasi darurat gempa, waktu sangat berharga. Menunggu instruksi resmi bisa membuat Anda terjebak saat gempa susulan terjadi. Evakuasi proaktif lebih aman."
                    },
                    {
                        id: "A1",
                        title: "Siapkan Tas Siaga dan Evakuasi",
                        text: "Segera ambil tas siaga yang sudah disiapkan dan mulai evakuasi ke titik kumpul",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -20,
                            timeToSafety: -5,
                            compliance: 25
                        },
                        feedback: "TEPAT! Dengan segera mengambil tas siaga dan evakuasi, Anda mengurangi waktu respon dan risiko terkena gempa susulan. Tas siaga harus berisi: air minum 3L, makanan tahan lama, P3K, senter, radio, dokumen penting, dan uang tunai."
                    },
                    {
                        id: "A4",
                        title: "Kumpulkan Barang Berharga",
                        text: "Mengumpulkan barang elektronik dan dokumen penting sebelum evakuasi",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 50,
                            timeToSafety: 12,
                            compliance: -15
                        },
                        feedback: "SANGAT BERBAHAYA! Mengumpulkan barang berharga meningkatkan waktu evakuasi dan risiko tertimpa bangunan. Nyawa lebih berharga dari apapun. Tinggalkan barang dan segera evakuasi."
                    },
                    {
                        id: "A2",
                        title: "Periksa Kerusakan Bangunan",
                        text: "Memeriksa struktur bangunan untuk melihat kerusakan sebelum mengambil tindakan",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 40,
                            timeToSafety: 10,
                            compliance: -10
                        },
                        feedback: "SALAH! Memeriksa bangunan saat masih berpotensi gempa susulan sangat berbahaya. Struktur bisa runtuh kapan saja. Prioritas utama adalah evakuasi, bukan pemeriksaan."
                    }
                ]
            },
            {
                id: 2,
                title: "Saat Gempa Terjadi",
                description: "Gempa susulan terjadi dengan guncangan kuat saat Anda masih di dalam rumah. Apa yang Anda lakukan?",
                context: "Anda sedang di lantai dua rumah ketika gempa susulan 5.8 SR terjadi. Guncangan sangat kuat, perabotan berjatuhan, dan lampu mati.",
                decisions: [
                    {
                        id: "B3",
                        title: "Berdiri di Pintu",
                        text: "Berdiri di bawah kusen pintu yang dianggap paling kuat",
                        correct: false,
                        impact: {
                            preparedness: -10,
                            injuryRisk: 25,
                            timeToSafety: 1,
                            compliance: -15
                        },
                        feedback: "MITOS! Konsep 'berdiri di pintu' berasal dari konstruksi lama. Pada bangunan modern, kusen pintu tidak lebih kuat dari bagian rumah lain dan bisa runtuh. Teknik Drop-Cover-Hold On tetap yang terbaik karena melindungi dari benda jatuh."
                    },
                    {
                        id: "B4",
                        title: "Lindungi Kepala dan Leher",
                        text: "Berlutut dan lindungi kepala dengan tangan sambil mencari tempat aman",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -25,
                            timeToSafety: 0,
                            compliance: 20
                        },
                        feedback: "BENAR! Melindungi kepala dan leher adalah prioritas utama. Area ini paling rentan terhadap cedera fatal. Kombinasi berlindung dan melindungi kepala memberikan perlindungan optimal."
                    },
                    {
                        id: "B2",
                        title: "Lari ke Tangga Darurat",
                        text: "Berlari menuju tangga darurat untuk keluar dari bangunan",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 60,
                            timeToSafety: 3,
                            compliance: -20
                        },
                        feedback: "SALAH! Berlari saat gempa sangat berbahaya karena: 1) Anda bisa jatuh karena guncangan, 2) Tertimpa benda jatuh, 3) Tangga bisa rusak/roboh. Tetap di tempat dan berlindung lebih aman."
                    },
                    {
                        id: "B1",
                        title: "Drop - Cover - Hold On",
                        text: "Segera berlindung di bawah meja yang kokoh, pegang kaki meja erat-erat",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -35,
                            timeToSafety: 0,
                            compliance: 30
                        },
                        feedback: "TEPAT! Teknik Drop-Cover-Hold On adalah STANDAR INTERNASIONAL untuk menyelamatkan diri saat gempa. Posisi ini melindungi dari benda jatuh dan memberikan stabilitas. Pastikan meja yang dipilih kokoh dan jauh dari jendela."
                    }
                ]
            },
            {
                id: 3,
                title: "Evakuasi Pasca-Gempa",
                description: "Guncangan sudah berhenti. Bangunan mulai retak dan berdebu. Bagaimana Anda mengevakuasi?",
                context: "Gempa telah berhenti, tetapi masih ada suara retakan. Listrik padam, dan asap terlihat dari bangunan tetangga.",
                decisions: [
                    {
                        id: "C4",
                        title: "Tunggu di Tempat Sampai Bantuan Datang",
                        text: "Tetap di dalam rumah menunggu tim penyelamat",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 40,
                            timeToSafety: 30,
                            compliance: -10
                        },
                        feedback: "SALAH! Evakuasi mandiri lebih efektif jika memungkinkan. Tim SAR memprioritaskan korban yang terjebak/tidak bisa evakuasi sendiri. Jika bisa evakuasi, lakukan untuk mengurangi beban tim penyelamat."
                    },
                    {
                        id: "C2",
                        title: "Cari Keluarga di Dalam Rumah",
                        text: "Mencari anggota keluarga yang masih di dalam rumah sebelum evakuasi",
                        correct: false,
                        impact: {
                            preparedness: -5,
                            injuryRisk: 45,
                            timeToSafety: 15,
                            compliance: 0
                        },
                        feedback: "BERRISIKO! Pencarian tanpa pelatihan bisa membahayakan Anda dan korban. Sistem komunikasi keluarga harus ditetapkan SEBELUM bencana: 1) Titik kumpul darurat, 2) Kontak darurat, 3) Rute evakuasi."
                    },
                    {
                        id: "C1",
                        title: "Ambil Tas Siaga, Evakuasi ke Titik Kumpul",
                        text: "Ambil tas siaga jika dekat, evakuasi ke titik kumpul melalui rute aman",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -20,
                            timeToSafety: -8,
                            compliance: 35
                        },
                        feedback: "TEPAT! Evakuasi terorganisir ke titik kumpul memudahkan tim SAR menemukan Anda. Tas siaga memastikan kebutuhan dasar terpenuhi. Rute evakuasi harus menghindari: bangunan tinggi, tiang listrik, jembatan, dan tebing."
                    },
                    {
                        id: "C3",
                        title: "Gunakan Lift untuk Cepat Keluar",
                        text: "Menggunakan lift untuk cepat mencapai lantai dasar",
                        correct: false,
                        impact: {
                            preparedness: -30,
                            injuryRisk: 70,
                            timeToSafety: 2,
                            compliance: -25
                        },
                        feedback: "SANGAT BERBAHAYA! Lift adalah JEBAKAN MAUT saat gempa: 1) Bisa mati mendadak, 2) Terjebak di antara lantai, 3) Kabel bisa putus. SELALU gunakan tangga darurat, bahkan di lantai tinggi."
                    }
                ]
            },
            {
                id: 4,
                title: "Komunikasi dan Bantuan",
                description: "Anda telah sampai di titik kumpul. Banyak warga panik dan terluka. Apa yang Anda lakukan?",
                context: "Titik kumpul sudah diisi 50+ warga. Beberapa terluka, anak-anak menangis. Sinyal telepon lemah.",
                decisions: [
                    {
                        id: "D2",
                        title: "Sebarkan Info di Media Sosial",
                        text: "Posting foto dan video di media sosial untuk menarik perhatian",
                        correct: false,
                        impact: {
                            preparedness: -15,
                            injuryRisk: 5,
                            timeToSafety: 0,
                            compliance: -30
                        },
                        feedback: "SALAH! Media sosial dapat menyebabkan informasi yang tidak akurat dan kepanikan. Prioritas: 1) Hubungi 112 untuk bantuan medis darurat, 2) Gunakan radio darurat atau aplikasi resmi BPBD untuk informasi terkini, 3) Hanya sebarkan informasi yang sudah diverifikasi kebenarannya."
                    },
                    {
                        id: "D4",
                        title: "Kembali ke Rumah Ambil Barang",
                        text: "Kembali ke rumah untuk mengambil barang yang tertinggal",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 55,
                            timeToSafety: 20,
                            compliance: -20
                        },
                        feedback: "SANGAT BERBAHAYA! Kembali ke zona bencana tanpa izin tim SAR: 1) Bangunan bisa runtuh kapan saja, 2) Menghambat operasi penyelamatan, 3) Menambah korban. Tunggu pengumuman resmi 'zona aman'."
                    },
                    {
                        id: "D1",
                        title: "Hubungi 112 dan Berikan Informasi Akurat",
                        text: "Hubungi 112, berikan lokasi, jumlah korban, dan kebutuhan mendesak",
                        correct: true,
                        impact: {
                            preparedness: 15,
                            injuryRisk: -10,
                            timeToSafety: -5,
                            compliance: 40
                        },
                        feedback: "TEPAT! 112 adalah nomor darurat terpadu. Informasi yang akurat membantu prioritisasi bantuan: 1) Lokasi GPS, 2) Jumlah korban, 3) Kondisi cedera, 4) Kebutuhan mendesak (obat, selimut, air)."
                    },
                    {
                        id: "D3",
                        title: "Bantu Korban dengan P3K Dasar",
                        text: "Memberikan pertolongan pertama sesuai kemampuan dengan P3K tas siaga",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -15,
                            timeToSafety: -3,
                            compliance: 25
                        },
                        feedback: "BENAR! Pertolongan pertama dasar menyelamatkan nyawa. Prioritaskan: 1) Hentikan pendarahan, 2) Jaga jalan napas, 3) Rawat luka bakar. Hanya lakukan yang sesuai kemampuan untuk hindari kesalahan fatal."
                    }
                ]
            }
        ];
    }
    
    getBanjirPhases() {
        return [
            {
                id: 1,
                title: "Peringatan Banjir Bandang",
                description: "BMKG mengeluarkan peringatan banjir bandang level merah. Air mulai naik cepat. Apa tindakan Anda?",
                context: "Hujan deras 4 jam non-stop. Sungai meluap, air masuk ke permukiman dengan kecepatan 10cm/jam.",
                decisions: [
                    {
                        id: "A2",
                        title: "Buat Tanggul Darurat",
                        text: "Menggunakan karung pasir untuk menahan air masuk ke rumah",
                        correct: false,
                        impact: {
                            preparedness: 10,
                            injuryRisk: 40,
                            timeToSafety: 25,
                            compliance: -5
                        },
                        feedback: "SALAH! Membuat tanggul darurat saat banjir sudah masuk membutuhkan waktu dan tenaga besar. Risiko tenggelam atau kelelahan sangat tinggi. Evakuasi dini ke tempat tinggi lebih aman dan efektif."
                    },
                    {
                        id: "A1",
                        title: "Matikan Listrik dan Evakuasi",
                        text: "Segera matikan MCB listrik, ambil tas siaga, evakuasi ke tempat tinggi",
                        correct: true,
                        impact: {
                            preparedness: 35,
                            injuryRisk: -25,
                            timeToSafety: -6,
                            compliance: 30
                        },
                        feedback: "TEPAT! Matikan listrik menghindari konsleting dan sengatan listrik. Evakuasi dini ke tempat tinggi mengurangi risiko tersapu arus. Tas siaga banjir harus tahan air dan mengapung."
                    },
                    {
                        id: "A3",
                        title: "Naikkan Barang ke Lantai 2",
                        text: "Memindahkan perabotan dan barang elektronik ke lantai atas",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 35,
                            timeToSafety: 20,
                            compliance: -10
                        },
                        feedback: "SALAH! Waktu sangat berharga saat banjir datang cepat. Prioritas utama adalah keselamatan jiwa, bukan barang. Jika air naik dengan cepat, Anda bisa terjebak di dalam rumah."
                    },
                    {
                        id: "A4",
                        title: "Tunggu Petugas Evakuasi",
                        text: "Menunggu tim SAR datang menjemput dengan perahu",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 30,
                            timeToSafety: 30,
                            compliance: 5
                        },
                        feedback: "BERISIKO! Menunggu bantuan saat air naik cepat bisa berbahaya. Tim SAR mungkin tidak bisa menjangkau semua lokasi dengan cepat. Evakuasi mandiri ke tempat tinggi lebih direkomendasikan jika memungkinkan."
                    }
                ]
            },
            {
                id: 2,
                title: "Tersapu Arus Banjir",
                description: "Anda terjebak di arus banjir saat menuju tempat evakuasi. Bagaimana menyelamatkan diri?",
                context: "Arus banjir setinggi dada dengan kecepatan tinggi membawa sampah dan puing.",
                decisions: [
                    {
                        id: "B2",
                        title: "Berenang Melawan Arus",
                        text: "Berenang sekuat tenaga melawan arus menuju tempat aman",
                        correct: false,
                        impact: {
                            preparedness: -30,
                            injuryRisk: 50,
                            timeToSafety: 10,
                            compliance: -25
                        },
                        feedback: "SANGAT BERBAHAYA! Melawan arus banjir menyebabkan kelelahan cepat dan tenggelam. Arus banjir bisa mencapai 10-20 km/jam - manusia tidak mungkin mengalahkannya."
                    },
                    {
                        id: "B1",
                        title: "Berpegangan pada Benda Kokoh",
                        text: "Cari tiang/pohon yang kokoh, berpegangan erat sambil berteriak minta tolong",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -30,
                            timeToSafety: 5,
                            compliance: 25
                        },
                        feedback: "TEPAT! Berpegangan pada benda kokoh mencegah terseret arus. Angkat kaki untuk mengurangi daya seret. Jangan melawan arus - hemat tenaga untuk bertahan sampai bantuan datang."
                    },
                    {
                        id: "B3",
                        title: "Buat Pelampung Darurat",
                        text: "Menggunakan ember kosong atau jerigen sebagai pelampung",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -20,
                            timeToSafety: 3,
                            compliance: 20
                        },
                        feedback: "CERDAS! Membuat pelampung darurat bisa menyelamatkan nyawa. Ember plastik besar, jerigen kosong, atau ban dalam bisa digunakan. Pegang erat dan biarkan arus membawa sambil berteriak minta tolong."
                    },
                    {
                        id: "B4",
                        title: "Buang Sepatu dan Pakaian",
                        text: "Membuang sepatu dan pakaian berat agar lebih mudah berenang",
                        correct: false,
                        impact: {
                            preparedness: -15,
                            injuryRisk: 25,
                            timeToSafety: 2,
                            compliance: -15
                        },
                        feedback: "SALAH! Sepatu melindungi kaki dari benda tajam di air banjir. Pakaian memberikan sedikit daya apung dan melindungi dari luka. Lebih baik tetap menggunakan sepatu dan pakaian."
                    }
                ]
            },
            {
                id: 3,
                title: "Evakuasi dengan Perahu",
                description: "Tim SAR datang dengan perahu karet. Bagaimana cara naik yang aman?",
                context: "Perahu SAR mendekat, arus masih kuat, kapasitas perahu terbatas.",
                decisions: [
                    {
                        id: "C2",
                        title: "Berenang Menuju Perahu",
                        text: "Berenang secepatnya menuju perahu untuk mempercepat evakuasi",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 40,
                            timeToSafety: 2,
                            compliance: -25
                        },
                        feedback: "BERBAHAYA! Berenang menuju perahu bisa menyebabkan tabrakan atau terhisap baling-baling. Selalu tunggu perahu mendekat dan ikuti instruksi tim SAR."
                    },
                    {
                        id: "C1",
                        title: "Tunggu Instruksi, Naik Perlahan",
                        text: "Tunggu instruksi tim SAR, naik satu per satu dengan bantuan mereka",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -20,
                            timeToSafety: -10,
                            compliance: 35
                        },
                        feedback: "TEPAT! Mengikuti instruksi tim SAR sangat penting. Kepanikan bisa membuat perahu oleng. Prioritas naik: anak-anak, lansia, ibu hamil, kemudian dewasa."
                    },
                    {
                        id: "C3",
                        title: "Lempar Barang ke Perahu",
                        text: "Melempar tas dan barang bawaan ke perahu sebelum naik",
                        correct: false,
                        impact: {
                            preparedness: -10,
                            injuryRisk: 15,
                            timeToSafety: 3,
                            compliance: -20
                        },
                        feedback: "SALAH! Barang bisa melukai penumpang di perahu atau merusak perahu karet. Bawa tas di tangan saat naik, atau serahkan setelah Anda aman di perahu."
                    },
                    {
                        id: "C4",
                        title: "Tolak Bantuan untuk Tunggu Keluarga",
                        text: "Menolak naik perahu sambil menunggu anggota keluarga lain",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 45,
                            timeToSafety: 15,
                            compliance: -15
                        },
                        feedback: "SALAH! Setiap tempat di perahu sangat berharga. Dengan naik, Anda mengurangi beban tim SAR dan memberi kesempatan pada orang lain. Informasikan pada tim SAR tentang anggota keluarga lain yang perlu dievakuasi."
                    }
                ]
            },
            {
                id: 4,
                title: "Pasca Banjir - Kesehatan",
                description: "Air mulai surut. Apa yang harus diperhatikan untuk kesehatan?",
                context: "Genangan air kotor, sampah berserakan, bau busuk mulai tercium.",
                decisions: [
                    {
                        id: "D3",
                        title: "Bersihkan Rumah Tanpa APD",
                        text: "Segera bersihkan rumah tanpa alat pelindung karena kondisi mendesak",
                        correct: false,
                        impact: {
                            preparedness: -30,
                            injuryRisk: 50,
                            timeToSafety: 0,
                            compliance: -30
                        },
                        feedback: "SANGAT BERBAHAYA! Air banjir mengandung bakteri E.coli, leptospirosis, bahan kimia berbahaya. Tanpa APD, risiko infeksi dan keracunan sangat tinggi."
                    },
                    {
                        id: "D1",
                        title: "Hindari Kontak Air, Gunakan APD",
                        text: "Gunakan sepatu boot dan sarung tangan, hindari kontak langsung dengan air",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -25,
                            timeToSafety: -2,
                            compliance: 30
                        },
                        feedback: "TEPAT! Air banjir mengandung: bakteri E.coli, leptospirosis, bahan kimia berbahaya. APD minimal: sepatu boot, sarung tangan karet, masker. Segera mandi dengan sabun setelah kontak."
                    },
                    {
                        id: "D2",
                        title: "Minum Air dari Sumber Tercemar",
                        text: "Memasak air banjir untuk diminum karena persediaan air bersih habis",
                        correct: false,
                        impact: {
                            preparedness: -40,
                            injuryRisk: 60,
                            timeToSafety: 5,
                            compliance: -35
                        },
                        feedback: "SANGAT BERBAHAYA! Air banjir mengandung bahan kimia yang tidak hilang dengan merebus. Gunakan hanya air kemasan atau air dari sumber yang disertifikasi aman oleh dinas kesehatan."
                    },
                    {
                        id: "D4",
                        title: "Periksa Instalasi Listrik",
                        text: "Memeriksa dan membersihkan instalasi listrik sebelum digunakan kembali",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -30,
                            timeToSafety: -5,
                            compliance: 25
                        },
                        feedback: "PENTING! Instalasi listrik yang terendam berisiko konsleting dan kebakaran. Matikan MCB utama, keringkan semua peralatan, dan mintalah teknisi berlisensi untuk memeriksa sebelum menyalakan kembali."
                    }
                ]
            }
        ];
    }
    
    getLongsorPhases() {
        return [
            {
                id: 1,
                title: "Deteksi Dini Longsor",
                description: "Anda melihat tanda-tanda awal longsor di bukit dekat rumah. Apa yang dilakukan?",
                context: "Retakan tanah 5cm lebar muncul, pohon miring 30 derajat, air keruh keluar dari tanah.",
                decisions: [
                    {
                        id: "A2",
                        title: "Pindahkan Barang ke Tempat Tinggi",
                        text: "Menyelamatkan barang berharga dan dokumen ke lantai atas sebelum evakuasi",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 45,
                            timeToSafety: 15,
                            compliance: -20
                        },
                        feedback: "SANGAT BERBAHAYA! Waktu sangat kritis saat ada tanda longsor. Setiap detik berharga untuk evakuasi. Barang dapat diganti, nyawa tidak. Segera evakuasi tanpa menunda!"
                    },
                    {
                        id: "A1",
                        title: "Laporkan dan Evakuasi Segera",
                        text: "Laporkan ke BPBD setempat via telepon, kemudian evakuasi keluarga",
                        correct: true,
                        impact: {
                            preparedness: 40,
                            injuryRisk: -30,
                            timeToSafety: -8,
                            compliance: 35
                        },
                        feedback: "TEPAT! Longsor bisa terjadi tiba-tiba. Evakuasi dini menyelamatkan nyawa. Laporkan detail: lokasi GPS, lebar retakan, arah kemiringan pohon. BPBD akan memantau dan evakuasi warga lain."
                    },
                    {
                        id: "A3",
                        title: "Ambil Foto Bukti dan Tunggu",
                        text: "Mendokumentasikan tanda-tanda untuk laporan resmi sebelum bertindak",
                        correct: false,
                        impact: {
                            preparedness: -15,
                            injuryRisk: 40,
                            timeToSafety: 10,
                            compliance: -10
                        },
                        feedback: "BERISIKO! Mendekati zona longsor untuk mengambil foto sangat berbahaya. Tanah bisa longsor tiba-tiba saat Anda berada di dekatnya. Ambil foto dari jarak aman sambil evakuasi."
                    },
                    {
                        id: "A4",
                        title: "Perbaiki Drainase Air",
                        text: "Membersihkan saluran air di sekitar rumah untuk mengurangi aliran air",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 35,
                            timeToSafety: 20,
                            compliance: -15
                        },
                        feedback: "TERLAMBAT! Perbaikan drainase harus dilakukan SEBELUM musim hujan. Saat tanda longsor sudah muncul, tindakan ini tidak efektif dan membahayakan. Evakuasi adalah satu-satunya pilihan aman."
                    }
                ]
            },
            {
                id: 2,
                title: "Saat Longsor Terjadi",
                description: "Tanah mulai bergerak cepat menuju rumah. Waktu sangat terbatas!",
                context: "Suara gemuruh dari bukit, tanah bergerak 2m/menit, rumah mulai retak.",
                decisions: [
                    {
                        id: "B3",
                        title: "Masuk ke Dalam Rumah",
                        text: "Masuk ke dalam rumah dan berlindung di lantai atas",
                        correct: false,
                        impact: {
                            preparedness: -40,
                            injuryRisk: 70,
                            timeToSafety: 25,
                            compliance: -30
                        },
                        feedback: "SANGAT FATAL! Rumah bisa hancur tertimpa longsoran. Berlindung di dalam bangunan saat longsor seperti bunuh diri. Keluar dan lari ke tempat aman."
                    },
                    {
                        id: "B1",
                        title: "Lari Tegak Lurus dari Arah Longsor",
                        text: "Lari ke samping (tegak lurus) arah longsor menuju tanah stabil",
                        correct: true,
                        impact: {
                            preparedness: 35,
                            injuryRisk: -40,
                            timeToSafety: -5,
                            compliance: 30
                        },
                        feedback: "TEPAT! Berlari tegak lurus dari arah longsor adalah satu-satunya cara selamat. Jangan lari searah atau berlawanan arah - Anda tidak bisa mengalahkan kecepatan longsor (bisa mencapai 50km/jam!)."
                    },
                    {
                        id: "B2",
                        title: "Lari ke Atas Bukit",
                        text: "Berlari menuju puncak bukit untuk menghindari longsoran",
                        correct: false,
                        impact: {
                            preparedness: -35,
                            injuryRisk: 65,
                            timeToSafety: 20,
                            compliance: -25
                        },
                        feedback: "SALAH! Berlari ke atas justru mendekati sumber longsor. Area di atas lebih tidak stabil. Selain itu, mendaki bukit membutuhkan waktu lebih lama dibanding lari ke samping."
                    },
                    {
                        id: "B4",
                        title: "Berpegangan pada Pohon Besar",
                        text: "Mencari pohon besar dan berpegangan erat-erat",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 55,
                            timeToSafety: 15,
                            compliance: -20
                        },
                        feedback: "BERBAHAYA! Kekuatan longsor bisa mencabut pohon besar sekalipun. Selain itu, Anda bisa tertimpa pohon yang tumbang. Lebih aman lari ke zona stabil di samping arah longsor."
                    }
                ]
            },
            {
                id: 3,
                title: "Pasca Longsor - Pertolongan",
                description: "Longsor telah berhenti. Beberapa warga tertimbun. Apa yang Anda lakukan?",
                context: "Area longsor seluas 100m, beberapa rumah tertimbun, korban berteriak minta tolong.",
                decisions: [
                    {
                        id: "C4",
                        title: "Gali Sendiri dengan Tangan",
                        text: "Segera menggali korban dengan tangan tanpa alat",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 40,
                            timeToSafety: 10,
                            compliance: -30
                        },
                        feedback: "BERBAHAYA! Menggali tanpa rencana bisa: 1) Melukai korban, 2) Menyebabkan longsoran susulan, 3) Menghambat tim SAR profesional. Evakuasi dulu ke tempat aman dan hubungi tim SAR."
                    },
                    {
                        id: "C1",
                        title: "Hubungi 112 dan Tunggu Instruksi",
                        text: "Menghubungi nomor darurat 112 dan mengikuti instruksi tim SAR",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -25,
                            timeToSafety: -8,
                            compliance: 40
                        },
                        feedback: "TEPAT! Tim SAR memiliki peralatan dan pelatihan khusus. Berikan informasi: 1) Lokasi tepat (koordinat GPS jika ada), 2) Perkiraan jumlah korban tertimbun, 3) Kondisi area sekitar."
                    },
                    {
                        id: "C2",
                        title: "Beri Tanda Area Berbahaya",
                        text: "Memberi tanda peringatan di sekitar area longsor untuk warga lain",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -15,
                            timeToSafety: -3,
                            compliance: 30
                        },
                        feedback: "BAIK! Memberi tanda peringatan mencegah korban tambahan. Gunakan kain warna mencolok, papan, atau benda lain yang mudah dilihat. Tulis 'DAERAH LONGSOR - BERBAHAYA'."
                    },
                    {
                        id: "C3",
                        title: "Cari Jalur Alternatif",
                        text: "Mencari jalan lain untuk evakuasi warga yang selamat",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -10,
                            timeToSafety: -5,
                            compliance: 25
                        },
                        feedback: "PENTING! Longsor sering merusak jalan utama. Mencari jalur alternatif membantu evakuasi korban yang terluka dan akses tim SAR. Prioritaskan jalan yang jauh dari tebing dan lereng curam."
                    }
                ]
            }
        ];
    }
    
    getCuacaPhases() {
        return [
            {
                id: 1,
                title: "Peringatan Angin Puting Beliung",
                description: "BMKG keluarkan peringatan angin puting beliung. Langit menghitam cepat. Tindakan?",
                context: "Kecepatan angin meningkat drastis, debu berterbangan, tekanan udara turun tiba-tiba.",
                decisions: [
                    {
                        id: "A3",
                        title: "Naik ke Atap Rumah",
                        text: "Naik ke atap untuk melihat arah puting beliung",
                        correct: false,
                        impact: {
                            preparedness: -40,
                            injuryRisk: 70,
                            timeToSafety: 10,
                            compliance: -35
                        },
                        feedback: "SANGAT BERBAHAYA! Puting beliung bisa menyedot orang dari atap. Selain itu, atap bisa roboh atau terlepas. JANGAN PERNAH naik ke atap saat ada peringatan angin kencang."
                    },
                    {
                        id: "A1",
                        title: "Masuk Ruangan Bebas Jendela",
                        text: "Cari ruangan di tengah bangunan tanpa jendela (bathroom, closet)",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -35,
                            timeToSafety: -3,
                            compliance: 25
                        },
                        feedback: "TEPAT! Ruangan tanpa jendela melindungi dari serpihan kaca yang beterbangan dengan kecepatan tinggi. Jauhi jendela, pintu eksterior, dan dinding luar. Lindungi kepala dengan bantal atau helm."
                    },
                    {
                        id: "A2",
                        title: "Parkir Mobil di Bawah Pohon",
                        text: "Memarkir kendaraan di bawah pohon besar untuk perlindungan",
                        correct: false,
                        impact: {
                            preparedness: -30,
                            injuryRisk: 50,
                            timeToSafety: 8,
                            compliance: -25
                        },
                        feedback: "SALAH! Pohon bisa tumbang atau patah dan menimpa kendaraan. Parkir di tempat terbuka jauh dari pohon, bangunan, dan tiang listrik. Masuk ke dalam bangunan yang kokoh."
                    },
                    {
                        id: "A4",
                        title: "Tutup Jendela dengan Papan",
                        text: "Memasang papan kayu pada jendela untuk memperkuat",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 30,
                            timeToSafety: 15,
                            compliance: -10
                        },
                        feedback: "TERLAMBAT! Memasang penguat jendela harus dilakukan SEBELUM badai datang. Saat angin sudah kencang, beraktivitas di luar sangat berbahaya. Segera cari tempat berlindung."
                    }
                ]
            },
            {
                id: 2,
                title: "Sambaran Petir",
                description: "Petir menyambar sekitar rumah selama badai. Bagaimana menghindari sambaran?",
                context: "Petir menyambar setiap 10 detik, listrik padam, bau ozon tercium.",
                decisions: [
                    {
                        id: "B2",
                        title: "Pakai Telepon Kabel",
                        text: "Menggunakan telepon kabel untuk menghubungi keluarga",
                        correct: false,
                        impact: {
                            preparedness: -25,
                            injuryRisk: 40,
                            timeToSafety: 3,
                            compliance: -20
                        },
                        feedback: "SANGAT BERBAHAYA! Sambaran petir bisa merambat melalui kabel telepon dan menyetrum pengguna. Jangan sentuh peralatan yang terhubung ke kabel luar selama badai petir."
                    },
                    {
                        id: "B1",
                        title: "Jauhi Logam dan Air",
                        text: "Jauhi pipa air, kabel listrik, peralatan elektronik, dan air mengalir",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -30,
                            timeToSafety: 0,
                            compliance: 20
                        },
                        feedback: "TEPAT! Logam dan air menghantarkan listrik petir. Jangan: 1) Mandi/bekerja dengan air, 2) Pakai telepon kabel, 3) Sentuh peralatan elektronik. Tunggu 30 menit setelah petir terakhir sebelum beraktivitas normal."
                    },
                    {
                        id: "B3",
                        title: "Berdiri di Tengah Lapangan",
                        text: "Berdiri di area terbuka untuk mengurangi risiko tersambar",
                        correct: false,
                        impact: {
                            preparedness: -35,
                            injuryRisk: 60,
                            timeToSafety: 5,
                            compliance: -30
                        },
                        feedback: "SANGAT SALAH! Justru area terbuka meningkatkan risiko tersambar petir. Petir mencari titik tertinggi di area terbuka. Cepat cari bangunan tertutup atau mobil (bukan convertible)."
                    },
                    {
                        id: "B4",
                        title: "Posisi Jongkok dengan Kaki Rapat",
                        text: "Berjongkok dengan kaki merapat jika terpaksa di luar ruangan",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -20,
                            timeToSafety: 1,
                            compliance: 15
                        },
                        feedback: "TEKNIK DARURAT! Jika terpaksa di luar tanpa tempat berlindung: 1) Jongkok dengan kaki merapat, 2) Jangan berbaring, 3) Jauhi pohon tinggi, 4) Turun dari tempat tinggi. Teknik ini mengurangi risiko tapi tetap berbahaya."
                    }
                ]
            },
            {
                id: 3,
                title: "Pemadaman Listrik",
                description: "Listrik padam total akibat badai. Malam semakin gelap. Persiapan?",
                context: "Listrik padam, hujan masih deras, persediaan baterai terbatas.",
                decisions: [
                    {
                        id: "C4",
                        title: "Nyalakan Lilin di Seluruh Ruangan",
                        text: "Menyalakan banyak lilin untuk penerangan maksimal",
                        correct: false,
                        impact: {
                            preparedness: -30,
                            injuryRisk: 45,
                            timeToSafety: 5,
                            compliance: -25
                        },
                        feedback: "SANGAT BERBAHAYA! Lilin bisa menyebabkan kebakaran, terutama jika ditinggal atau tertiup angin. Gunakan senter atau lampu darurat bertenaga baterai yang lebih aman."
                    },
                    {
                        id: "C1",
                        title: "Gunakan Senter Darurat",
                        text: "Menggunakan senter atau headlamp bertenaga baterai",
                        correct: true,
                        impact: {
                            preparedness: 30,
                            injuryRisk: -25,
                            timeToSafety: -3,
                            compliance: 30
                        },
                        feedback: "TEPAT! Senter lebih aman dari lilin dan tidak menguras oksigen. Simpan senter dan baterai cadangan di tempat mudah dijangkau. Headlamp membebaskan kedua tangan untuk aktivitas lain."
                    },
                    {
                        id: "C2",
                        title: "Matikan Peralatan Elektronik",
                        text: "Mencabut stop kontak peralatan elektronik penting",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -15,
                            timeToSafety: -2,
                            compliance: 25
                        },
                        feedback: "PENTING! Matikan dan cabut peralatan elektronik untuk menghindari kerusakan saat listrik hidup kembali dengan tegangan tidak stabil. Terutama kulkas, TV, komputer, dan charger ponsel."
                    },
                    {
                        id: "C3",
                        title: "Buka Kulkas Terus-menerus",
                        text: "Membuka kulkas berkala untuk memeriksa makanan",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 10,
                            timeToSafety: 0,
                            compliance: -15
                        },
                        feedback: "SALAH! Membuka kulkas mengeluarkan udara dingin dan mempercepat pembusukan makanan. Kulkas tertutup rapat bisa menjaga suhu selama 4-6 jam. Tulis waktu pemadaman dan jangan buka tanpa perlu."
                    }
                ]
            }
        ];
    }
    
    init() {
        this.bindEvents();
        console.log('🎮 Game Disaster Simulation initialized');
    }
    
    bindEvents() {
        // Scenario selection
        document.querySelectorAll('.scenario-card').forEach(card => {
            card.addEventListener('click', () => this.selectScenario(card));
        });
        
        // Start simulation
        document.getElementById('start-simulation').addEventListener('click', () => this.startGame());
        
        // Game controls
        document.getElementById('btn-prev').addEventListener('click', () => this.previousPhase());
        document.getElementById('btn-next').addEventListener('click', () => this.nextPhase());
        document.getElementById('btn-hint').addEventListener('click', () => this.showHint());
        
        // Restart game
        document.getElementById('btn-restart').addEventListener('click', () => this.restartGame());
        
        // Share results
        document.getElementById('btn-share').addEventListener('click', () => this.shareResults());
    }
    
    selectScenario(card) {
        // Remove active class from all cards
        document.querySelectorAll('.scenario-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to selected card
        card.classList.add('active');
        
        // Store selected scenario
        this.currentScenario = card.dataset.scenario;
        
        console.log(`Scenario selected: ${this.currentScenario}`);
    }
    
    startGame() {
        if (!this.currentScenario) {
            alert('Pilih skenario bencana terlebih dahulu!');
            return;
        }
        
        this.gameStarted = true;
        this.currentPhase = 1;
        this.startTime = new Date();
        
        // Start timer
        this.startTimer();
        
        // Hide selection phase
        document.getElementById('phase-selection').classList.remove('active');
        
        // Show game elements
        document.getElementById('game-progress').style.display = 'block';
        document.getElementById('game-content').style.display = 'block';
        document.getElementById('game-controls').style.display = 'flex';
        
        // Load first phase
        this.loadPhase();
        
        console.log(`Game started with scenario: ${this.currentScenario}`);
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        if (!this.startTime) return;
        
        const now = new Date();
        const diff = Math.floor((now - this.startTime) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    loadPhase() {
        if (!this.currentScenario || !this.gameStarted) return;
        
        const scenario = this.scenarios[this.currentScenario];
        const phase = scenario.phases[this.currentPhase - 1];
        
        if (!phase) {
            this.completeGame();
            return;
        }
        
        // Update progress bar
        this.updateProgressBar();
        
        // Update phase markers
        this.updatePhaseMarkers();
        
        // Update scores display
        this.updateScores();
        
        // Reset decision
        this.currentDecision = null;
        
        // Enable/disable buttons
        document.getElementById('btn-next').disabled = true;
        document.getElementById('btn-prev').disabled = (this.currentPhase === 1);
        
        // Create phase content
        const content = document.getElementById('game-content');
        content.innerHTML = this.createPhaseContent(phase);
        
        // Bind decision events
        this.bindDecisionEvents();
        
        console.log(`Loaded phase ${this.currentPhase}: ${phase.title}`);
    }
    
    createPhaseContent(phase) {
        const scenario = this.scenarios[this.currentScenario];
        
        return `
            <div class="scenario-intro">
                <h3>Fase ${phase.id}: ${phase.title}</h3>
                <p class="scenario-description">${phase.description}</p>
                
                ${phase.context ? `
                    <div class="scenario-context">
                        <h4><i class="fas fa-info-circle"></i> Situasi Saat Ini</h4>
                        <p class="context-text">${phase.context}</p>
                    </div>
                ` : ''}
                
                <div class="decision-options" id="decision-options">
                    ${phase.decisions.map(decision => `
                        <div class="decision-card" data-decision="${decision.id}">
                            <div class="decision-header">
                                <div class="decision-icon">${String.fromCharCode(64 + parseInt(decision.id[1]))}</div>
                                <h4 class="decision-title">${decision.title}</h4>
                            </div>
                            <p class="decision-text">${decision.text}</p>
                            <span class="decision-impact">Klik untuk memilih</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="feedback-container" id="feedback-container" style="display: none;">
                    <div class="feedback-header">
                        <i class="fas fa-comment-dots"></i>
                        <h4>Analisis Jawaban</h4>
                    </div>
                    <p class="feedback-text" id="feedback-text"></p>
                    <div class="feedback-impact" id="feedback-impact"></div>
                </div>
            </div>
        `;
    }
    
    bindDecisionEvents() {
        document.querySelectorAll('.decision-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (card.classList.contains('selected') || card.classList.contains('wrong')) {
                    return; // Already selected
                }
                
                const decisionId = card.dataset.decision;
                this.makeDecision(decisionId);
            });
        });
    }
    
    makeDecision(decisionId) {
        const scenario = this.scenarios[this.currentScenario];
        const phase = scenario.phases[this.currentPhase - 1];
        const decision = phase.decisions.find(d => d.id === decisionId);
        
        if (!decision) return;
        
        // Store decision
        this.currentDecision = decision;
        
        // Store decision in history
        this.phaseHistory.push({
            phase: this.currentPhase,
            decision: decision,
            timestamp: new Date()
        });
        
        // Apply impact to scores
        this.applyImpact(decision.impact);
        
        // Update UI for selected decision
        document.querySelectorAll('.decision-card').forEach(card => {
            card.classList.remove('selected', 'wrong');
            
            const cardDecisionId = card.dataset.decision;
            const cardDecision = phase.decisions.find(d => d.id === cardDecisionId);
            
            if (cardDecisionId === decisionId) {
                card.classList.add(decision.correct ? 'selected' : 'wrong');
            } else if (!decision.correct && cardDecision.correct) {
                card.classList.add('selected');
            }
        });
        
        // Show feedback
        this.showFeedback(decision);
        
        // Enable next button
        document.getElementById('btn-next').disabled = false;
        
        console.log(`Decision made: ${decisionId} (correct: ${decision.correct})`);
    }
    
    applyImpact(impact) {
        // Update scores
        this.score.preparedness = Math.min(100, Math.max(0, this.score.preparedness + impact.preparedness));
        this.score.injuryRisk = Math.min(100, Math.max(0, this.score.injuryRisk + impact.injuryRisk));
        this.score.timeToSafety = Math.max(0, this.score.timeToSafety + impact.timeToSafety);
        this.score.compliance = Math.min(100, Math.max(0, this.score.compliance + impact.compliance));
        
        // Update UI
        this.updateScores();
    }
    
    updateScores() {
        // Update score values
        document.getElementById('score-preparedness').textContent = Math.round(this.score.preparedness);
        document.getElementById('score-injury').textContent = this.getInjuryRiskLevel();
        document.getElementById('score-time').textContent = `${Math.round(this.score.timeToSafety)} menit`;
        document.getElementById('score-compliance').textContent = Math.round(this.score.compliance);
        
        // Update progress bars
        document.getElementById('bar-preparedness').style.width = `${this.score.preparedness}%`;
        document.getElementById('bar-injury').style.width = `${this.score.injuryRisk}%`;
        document.getElementById('bar-time').style.width = `${Math.min(100, this.score.timeToSafety * 2)}%`;
        document.getElementById('bar-compliance').style.width = `${this.score.compliance}%`;
    }
    
    getInjuryRiskLevel() {
        if (this.score.injuryRisk < 30) return "Rendah";
        if (this.score.injuryRisk < 60) return "Sedang";
        return "Tinggi";
    }
    
    showFeedback(decision) {
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackImpact = document.getElementById('feedback-impact');
        
        feedbackText.textContent = decision.feedback;
        
        // Create impact summary
        let impactHTML = '';
        
        // Preparedness impact
        if (decision.impact.preparedness !== 0) {
            const sign = decision.impact.preparedness > 0 ? '+' : '';
            impactHTML += `
                <div class="impact-item">
                    <span class="impact-label">Kesiapsiagaan</span>
                    <span class="impact-value ${decision.impact.preparedness > 0 ? 'positive' : 'negative'}">
                        ${sign}${decision.impact.preparedness}
                    </span>
                </div>
            `;
        }
        
        // Injury risk impact
        if (decision.impact.injuryRisk !== 0) {
            const sign = decision.impact.injuryRisk > 0 ? '+' : '';
            impactHTML += `
                <div class="impact-item">
                    <span class="impact-label">Risiko Cedera</span>
                    <span class="impact-value ${decision.impact.injuryRisk < 0 ? 'positive' : 'negative'}">
                        ${sign}${Math.abs(decision.impact.injuryRisk)}
                    </span>
                </div>
            `;
        }
        
        // Time to safety impact
        if (decision.impact.timeToSafety !== 0) {
            const sign = decision.impact.timeToSafety > 0 ? '+' : '';
            impactHTML += `
                <div class="impact-item">
                    <span class="impact-label">Waktu Aman</span>
                    <span class="impact-value ${decision.impact.timeToSafety < 0 ? 'positive' : 'negative'}">
                        ${sign}${Math.abs(decision.impact.timeToSafety)} menit
                    </span>
                </div>
            `;
        }
        
        // Compliance impact
        if (decision.impact.compliance !== 0) {
            const sign = decision.impact.compliance > 0 ? '+' : '';
            impactHTML += `
                <div class="impact-item">
                    <span class="impact-label">Kepatuhan</span>
                    <span class="impact-value ${decision.impact.compliance > 0 ? 'positive' : 'negative'}">
                        ${sign}${decision.impact.compliance}
                    </span>
                </div>
            `;
        }
        
        feedbackImpact.innerHTML = impactHTML;
        feedbackContainer.style.display = 'block';
        
        // Scroll to feedback
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    showHint() {
        const scenario = this.scenarios[this.currentScenario];
        const phase = scenario.phases[this.currentPhase - 1];
        
        if (!phase) return;
        
        const correctDecisions = phase.decisions.filter(d => d.correct);
        
        if (correctDecisions.length > 0) {
            alert(`💡 PETUNJUK:\n\nFase ini menguji: "${phase.title}"\n\nPrinsip dasar: ${correctDecisions[0].text}\n\nPertimbangkan faktor keselamatan, waktu, dan kepatuhan pada prosedur.`);
        }
    }
    
    nextPhase() {
        if (!this.currentDecision && this.gameStarted) {
            alert('Silakan pilih jawaban terlebih dahulu sebelum melanjutkan!');
            return;
        }
        
        const scenario = this.scenarios[this.currentScenario];
        
        if (this.currentPhase < scenario.phases.length) {
            this.currentPhase++;
            this.currentDecision = null;
            document.getElementById('btn-next').disabled = true;
            this.loadPhase();
        } else {
            this.completeGame();
        }
    }
    
    previousPhase() {
        if (this.currentPhase > 1) {
            // Remove last decision from history
            this.phaseHistory = this.phaseHistory.filter(h => h.phase !== this.currentPhase);
            
            this.currentPhase--;
            this.currentDecision = null;
            this.loadPhase();
        }
    }
    
    updateProgressBar() {
        const scenario = this.scenarios[this.currentScenario];
        const progressPercentage = (this.currentPhase / scenario.phases.length) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    }
    
    updatePhaseMarkers() {
        document.querySelectorAll('.phase-marker').forEach(marker => {
            const phaseNum = parseInt(marker.dataset.phase);
            
            marker.classList.remove('active', 'completed');
            
            if (phaseNum < this.currentPhase) {
                marker.classList.add('completed');
            } else if (phaseNum === this.currentPhase) {
                marker.classList.add('active');
            }
        });
    }
    
    completeGame() {
        this.gameCompleted = true;
        clearInterval(this.timerInterval);
        
        // Calculate total score
        const totalScore = Math.round(
            (this.score.preparedness * 0.3) +
            ((100 - this.score.injuryRisk) * 0.3) +
            (Math.max(0, 100 - this.score.timeToSafety) * 0.2) +
            (this.score.compliance * 0.2)
        );
        
        // Determine badge
        let badge = "latihan";
        let badgeText = "Perlu Latihan";
        
        if (totalScore >= 80) {
            badge = "siaga";
            badgeText = "SIAGA";
        } else if (totalScore >= 60) {
            badge = "waspada";
            badgeText = "Waspada";
        }
        
        // Find best and worst decisions
        const bestDecision = this.findBestDecision();
        const worstDecision = this.findWorstDecision();
        
        // Update results screen
        document.getElementById('result-scenario').innerHTML = `
            <i class="${this.scenarios[this.currentScenario].icon}"></i>
            <span>${this.scenarios[this.currentScenario].name}</span>
        `;
        
        document.getElementById('total-score').textContent = totalScore;
        document.getElementById('result-badge').textContent = badgeText;
        document.getElementById('result-badge').className = `result-badge ${badge}`;
        
        // Update best decision
        if (bestDecision) {
            document.querySelector('#best-decision .decision-text').textContent = bestDecision.text;
            const bestImpact = bestDecision.impact.preparedness + 
                              (bestDecision.impact.injuryRisk * -1) + 
                              (bestDecision.impact.compliance || 0);
            document.querySelector('#best-decision .decision-impact').textContent = 
                `+${Math.max(0, bestImpact)} Skor`;
        }
        
        // Update worst decision
        if (worstDecision) {
            document.querySelector('#worst-decision .decision-text').textContent = worstDecision.text;
            const worstImpact = worstDecision.impact.preparedness + 
                               worstDecision.impact.injuryRisk + 
                               (worstDecision.impact.compliance || 0);
            document.querySelector('#worst-decision .decision-impact').textContent = 
                `${worstImpact} Skor`;
        }
        
        // Update SOP list
        const sopList = document.getElementById('sop-list');
        sopList.innerHTML = this.scenarios[this.currentScenario].recommendations
            .map(rec => `<li><i class="fas fa-check"></i> ${rec}</li>`)
            .join('');
        
        // Hide game elements
        document.getElementById('game-progress').style.display = 'none';
        document.getElementById('game-content').style.display = 'none';
        document.getElementById('game-controls').style.display = 'none';
        
        // Show results screen
        document.getElementById('phase-results').classList.add('active');
        
        console.log(`Game completed! Total score: ${totalScore}`);
    }
    
    findBestDecision() {
        let bestScore = -Infinity;
        let bestDecision = null;
        
        this.phaseHistory.forEach(record => {
            const decision = record.decision;
            if (decision.correct) {
                const score = decision.impact.preparedness + 
                            (decision.impact.injuryRisk * -1) + 
                            (decision.impact.compliance || 0);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestDecision = decision;
                }
            }
        });
        
        return bestDecision;
    }
    
    findWorstDecision() {
        let worstScore = Infinity;
        let worstDecision = null;
        
        this.phaseHistory.forEach(record => {
            const decision = record.decision;
            if (!decision.correct) {
                const score = decision.impact.preparedness + 
                            decision.impact.injuryRisk + 
                            (decision.impact.compliance || 0);
                
                if (score < worstScore) {
                    worstScore = score;
                    worstDecision = decision;
                }
            }
        });
        
        return worstDecision;
    }
    
    restartGame() {
        // Reset game state
        this.currentScenario = null;
        this.currentPhase = 0;
        this.currentDecision = null;
        this.score = {
            preparedness: 0,
            injuryRisk: 0,
            timeToSafety: 0,
            compliance: 0
        };
        this.phaseHistory = [];
        this.gameStarted = false;
        this.gameCompleted = false;
        clearInterval(this.timerInterval);
        this.startTime = null;
        
        // Reset scenario selection
        document.querySelectorAll('.scenario-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Hide results screen
        document.getElementById('phase-results').classList.remove('active');
        
        // Hide game elements
        document.getElementById('game-progress').style.display = 'none';
        document.getElementById('game-content').style.display = 'none';
        document.getElementById('game-controls').style.display = 'none';
        
        // Show selection screen
        document.getElementById('phase-selection').classList.add('active');
        
        // Reset timer display
        document.getElementById('timer').textContent = '00:00';
        
        // Reset scores display
        this.updateScores();
        
        console.log('Game restarted');
    }
    
    shareResults() {
        const scenario = this.scenarios[this.currentScenario];
        const totalScore = document.getElementById('total-score').textContent;
        const badge = document.getElementById('result-badge').textContent;
        
        const shareText = `🎮 HASIL SIMULASI BENCANA - JABAR SIAGA\n\n` +
                         `Skenario: ${scenario.name}\n` +
                         `Skor Total: ${totalScore}/100\n` +
                         `Status: ${badge}\n\n` +
                         `Tingkatkan kesiapsiagaan Anda di: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Hasil Simulasi Bencana - Jabar Siaga',
                text: shareText,
                url: window.location.href
            }).catch(error => {
                console.log('Error sharing:', error);
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }
    
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        alert('Hasil simulasi telah disalin ke clipboard!');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new DisasterSimulationGame();
    
    console.log('🚨 Disaster Simulation Game Loaded');
    console.log('🎮 Ready for training scenarios');
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    if (window.game && window.game.gameStarted) {
        // Re-render phase content if needed
        window.game.loadPhase();
    }
});
