// Game Edukasi Simulasi Bencana

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
                title: "Pra-Kejadian",
                description: "BMKG mengeluarkan peringatan potensi gempa susulan setelah gempa utama 6.2 SR. Apa yang Anda lakukan?",
                context: "Anda baru saja merasakan gempa dengan intensitas sedang. Gempa susulan berpotensi terjadi dalam beberapa jam ke depan.",
                decisions: [
                    {
                        id: "A1",
                        title: "Siapkan Tas Siaga",
                        text: "Menyiapkan tas siaga berisi makanan, air, obat-obatan, dan dokumen penting",
                        correct: true,
                        impact: {
                            preparedness: 25,
                            injuryRisk: -10,
                            timeToSafety: -2,
                            compliance: 15
                        },
                        feedback: "Tepat! Menyiapkan tas siaga mempersingkat waktu evakuasi dan mengurangi risiko."
                    },
                    {
                        id: "A2",
                        title: "Cek Kerusakan Rumah",
                        text: "Memeriksa seluruh rumah untuk melihat kerusakan struktural",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 20,
                            timeToSafety: 5,
                            compliance: 5
                        },
                        feedback: "Berbahaya! Memeriksa rumah saat masih berpotensi gempa susulan meningkatkan risiko cedera."
                    },
                    {
                        id: "A3",
                        title: "Abaikan Peringatan",
                        text: "Menganggap gempa susulan tidak akan terjadi dan beraktivitas normal",
                        correct: false,
                        impact: {
                            preparedness: -20,
                            injuryRisk: 30,
                            timeToSafety: 10,
                            compliance: -20
                        },
                        feedback: "Sangat berisiko! Mengabaikan peringatan meningkatkan kerentanan saat gempa susulan terjadi."
                    }
                ]
            },
            {
                id: 2,
                title: "Saat Kejadian",
                description: "Gempa susulan terjadi dengan guncangan kuat. Apa tindakan pertama Anda?",
                context: "Anda sedang berada di lantai dua rumah ketika gempa terjadi. Guncangan cukup kuat membuat perabotan bergeser.",
                decisions: [
                    {
                        id: "B1",
                        title: "Drop - Cover - Hold On",
                        text: "Berlutut, berlindung di bawah meja yang kokoh, dan berpegangan",
                        correct: true,
                        impact: {
                            preparedness: 15,
                            injuryRisk: -25,
                            timeToSafety: 0,
                            compliance: 20
                        },
                        feedback: "Tepat! Drop-Cover-Hold On adalah SOP yang direkomendasikan untuk mengurangi risiko cedera."
                    },
                    {
                        id: "B2",
                        title: "Lari ke Luar",
                        text: "Segera berlari keluar rumah menuju halaman",
                        correct: false,
                        impact: {
                            preparedness: -10,
                            injuryRisk: 40,
                            timeToSafety: 2,
                            compliance: -15
                        },
                        feedback: "Berbahaya! Berlari saat gempa meningkatkan risiko tertimpa atau terjatuh."
                    },
                    {
                        id: "B3",
                        title: "Menyelamatkan Barang",
                        text: "Menyelamatkan barang berharga sebelum mencari perlindungan",
                        correct: false,
                        impact: {
                            preparedness: -15,
                            injuryRisk: 50,
                            timeToSafety: 5,
                            compliance: -20
                        },
                        feedback: "Sangat berisiko! Keselamatan jiwa harus menjadi prioritas utama."
                    }
                ]
            },
            {
                id: 3,
                title: "Evakuasi",
                description: "Guncangan sudah berhenti. Apa yang Anda lakukan untuk evakuasi?",
                context: "Gempa telah berhenti, tetapi masih ada potensi gempa susulan dan kerusakan bangunan.",
                decisions: [
                    {
                        id: "C1",
                        title: "Evakuasi ke Titik Kumpul",
                        text: "Mengambil tas siaga dan menuju titik kumpul yang telah ditentukan",
                        correct: true,
                        impact: {
                            preparedness: 20,
                            injuryRisk: -15,
                            timeToSafety: -5,
                            compliance: 25
                        },
                        feedback: "Tepat! Evakuasi terorganisir ke titik kumpul mengurangi waktu pencarian bantuan."
                    },
                    {
                        id: "C2",
                        title: "Tunggu di Dalam",
                        text: "Tetap di dalam rumah menunggu keadaan benar-benar aman",
                        correct: false,
                        impact: {
                            preparedness: 0,
                            injuryRisk: 25,
                            timeToSafety: 15,
                            compliance: -10
                        },
                        feedback: "Berisiko! Bangunan bisa runtuh akibat gempa susulan."
                    },
                    {
                        id: "C3",
                        title: "Cari Keluarga",
                        text: "Mencari anggota keluarga di dalam rumah sebelum evakuasi",
                        correct: false,
                        impact: {
                            preparedness: 5,
                            injuryRisk: 30,
                            timeToSafety: 10,
                            compliance: 5
                        },
                        feedback: "Berbahaya! Komunikasi pra-kejadian penting untuk menentukan titik temu."
                    }
                ]
            },
            {
                id: 4,
                title: "Pasca-Kejadian",
                description: "Anda telah sampai di titik kumpul. Apa langkah komunikasi yang tepat?",
                context: "Anda berada di titik kumpul bersama warga lainnya. Sinyal telepon masih tersedia.",
                decisions: [
                    {
                        id: "D1",
                        title: "Hubungi 112",
                        text: "Menghubungi nomor darurat 112 untuk melaporkan lokasi dan kebutuhan",
                        correct: true,
                        impact: {
                            preparedness: 10,
                            injuryRisk: -5,
                            timeToSafety: -2,
                            compliance: 30
                        },
                        feedback: "Tepat! 112 adalah nomor darurat terpadu untuk koordinasi bantuan."
                    },
                    {
                        id: "D2",
                        title: "Sebarkan Info di Media Sosial",
                        text: "Membagikan informasi dan foto di media sosial untuk viral",
                        correct: false,
                        impact: {
                            preparedness: -5,
                            injuryRisk: 0,
                            timeToSafety: 0,
                            compliance: -25
                        },
                        feedback: "Tidak tepat! Informasi yang tidak terverifikasi bisa menimbulkan kepanikan."
                    },
                    {
                        id: "D3",
                        title: "Pulang ke Rumah",
                        text: "Kembali ke rumah untuk melihat kerusakan",
                        correct: false,
                        impact: {
                            preparedness: -10,
                            injuryRisk: 20,
                            timeToSafety: 5,
                            compliance: -15
                        },
                        feedback: "Berbahaya! Bangunan masih berpotensi runtuh dan zona belum dinyatakan aman."
                    }
                ]
            }
        ];
    }
    
    getBanjirPhases() {
        return [
            {
                id: 1,
                title: "Pra-Kejadian",
                description: "BMKG mengeluarkan peringatan hujan lebat selama 3 hari berturut-turut. Apa tindakan Anda?",
                decisions: [
                    {
                        id: "A1",
                        title: "Siapkan Tas Siaga",
                        text: "Menyiapkan tas siaga berisi makanan, air, dan dokumen penting",
                        correct: true,
                        impact: { preparedness: 30, injuryRisk: -15, timeToSafety: -3, compliance: 20 }
                    },
                    {
                        id: "A2",
                        title: "Tinggikan Barang Berharga",
                        text: "Memindahkan barang elektronik dan berharga ke tempat tinggi",
                        correct: true,
                        impact: { preparedness: 15, injuryRisk: -5, timeToSafety: 2, compliance: 10 }
                    },
                    {
                        id: "A3",
                        title: "Abaikan Peringatan",
                        text: "Menganggap banjir tidak akan terjadi di wilayah Anda",
                        correct: false,
                        impact: { preparedness: -25, injuryRisk: 35, timeToSafety: 10, compliance: -25 }
                    }
                ]
            },
            {
                id: 2,
                title: "Saat Kejadian",
                description: "Air mulai masuk ke dalam rumah dengan cepat. Apa yang Anda lakukan?",
                decisions: [
                    {
                        id: "B1",
                        title: "Matikan Listrik",
                        text: "Segera mematikan listrik utama untuk mencegah konsleting",
                        correct: true,
                        impact: { preparedness: 20, injuryRisk: -20, timeToSafety: 0, compliance: 25 }
                    },
                    {
                        id: "B2",
                        title: "Menyelamatkan Barang",
                        text: "Menyelamatkan barang-barang sebelum air naik",
                        correct: false,
                        impact: { preparedness: -10, injuryRisk: 40, timeToSafety: 5, compliance: -10 }
                    }
                ]
            },
            {
                id: 3,
                title: "Evakuasi",
                description: "Air sudah setinggi pinggang. Bagaimana Anda mengevakuasi?",
                decisions: [
                    {
                        id: "C1",
                        title: "Gunakan Perahu",
                        text: "Menggunakan perahu atau pelampung darurat",
                        correct: true,
                        impact: { preparedness: 25, injuryRisk: -20, timeToSafety: -8, compliance: 30 }
                    },
                    {
                        id: "C2",
                        title: "Berjalan di Air",
                        text: "Berjalan melalui air banjir menuju tempat tinggi",
                        correct: false,
                        impact: { preparedness: -15, injuryRisk: 50, timeToSafety: 5, compliance: -20 }
                    }
                ]
            }
        ];
    }
    
    getLongsorPhases() {
        return [
            {
                id: 1,
                title: "Pra-Kejadian",
                description: "Anda melihat retakan tanah di lereng bukit dekat rumah. Apa tindakan Anda?",
                decisions: [
                    {
                        id: "A1",
                        title: "Laporkan ke BPBD",
                        text: "Segera melaporkan ke BPBD setempat",
                        correct: true,
                        impact: { preparedness: 25, injuryRisk: -20, timeToSafety: -2, compliance: 30 }
                    },
                    {
                        id: "A2",
                        title: "Abaikan Saja",
                        text: "Menganggap retakan itu normal",
                        correct: false,
                        impact: { preparedness: -20, injuryRisk: 40, timeToSafety: 10, compliance: -25 }
                    }
                ]
            }
        ];
    }
    
    getCuacaPhases() {
        return [
            {
                id: 1,
                title: "Pra-Kejadian",
                description: "BMKG mengeluarkan peringatan angin kencang dan petir. Apa yang Anda lakukan?",
                decisions: [
                    {
                        id: "A1",
                        title: "Amankan Barang Luar",
                        text: "Mengamankan barang-barang di luar rumah yang bisa terbang",
                        correct: true,
                        impact: { preparedness: 20, injuryRisk: -15, timeToSafety: -1, compliance: 15 }
                    }
                ]
            }
        ];
    }
    
    init() {
        this.bindEvents();
        this.updateTimer();
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
        
        // Show game progress
        document.getElementById('game-progress').style.display = 'block';
        
        // Show game content
        document.getElementById('game-content').style.display = 'block';
        
        // Show game controls
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
                        <h4><i class="fas fa-info-circle"></i> Konteks Situasi</h4>
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
                            <span class="decision-impact">Pilih keputusan ini</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="feedback-container" id="feedback-container" style="display: none;">
                    <div class="feedback-header">
                        <i class="fas fa-comment-dots"></i>
                        <h4>Feedback</h4>
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
        
        feedbackText.textContent = decision.feedback || "Keputusan telah dicatat.";
        
        // Create impact summary
        let impactHTML = '';
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
        
        if (decision.impact.injuryRisk !== 0) {
            const sign = decision.impact.injuryRisk > 0 ? '+' : '';
            impactHTML += `
                <div class="impact-item">
                    <span class="impact-label">Risiko Cedera</span>
                    <span class="impact-value ${decision.impact.injuryRisk < 0 ? 'positive' : 'negative'}">
                        ${sign}${decision.impact.injuryRisk}
                    </span>
                </div>
            `;
        }
        
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
            alert(`💡 Petunjuk:\n\nPada fase ini, perhatikan:\n"${correctDecisions[0].text}"\n\nKeputusan ini akan memberikan dampak positif pada skor Anda.`);
        }
    }
    
    nextPhase() {
        if (this.currentDecision === null && this.gameStarted) {
            alert('Pilih keputusan terlebih dahulu sebelum melanjutkan!');
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
            this.currentPhase--;
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
            (Math.max(0, 100 - this.score.timeToSafety * 2) * 0.2) +
            (this.score.compliance * 0.2)
        );
        
        // Determine badge
        let badge = "latihan";
        let badgeText = "Perlu Latihan";
        
        if (totalScore >= 80) {
            badge = "siaga";
            badgeText = "Siaga";
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
                `${worstDecision.impact.preparedness < 0 ? '' : '+'}${worstImpact} Skor`;
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
        
        // Hide results screen
        document.getElementById('phase-results').classList.remove('active');
        
        // Show selection screen
        document.getElementById('phase-selection').classList.add('active');
        
        // Reset timer display
        document.getElementById('timer').textContent = '00:00';
        
        console.log('Game restarted');
    }
    
    shareResults() {
        const scenario = this.scenarios[this.currentScenario];
        const totalScore = document.getElementById('total-score').textContent;
        const badge = document.getElementById('result-badge').textContent;
        
        const shareText = `🎮 Hasil Simulasi Bencana Jabar Siaga\n\n` +
                         `Skenario: ${scenario.name}\n` +
                         `Skor Total: ${totalScore}/100\n` +
                         `Status: ${badge}\n\n` +
                         `Latih kemampuanmu di: ${window.location.href}`;
        
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
