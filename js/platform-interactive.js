// Interactive Platform - Tab Navigation & Content Management

// Content Templates for each view
const contentTemplates = {
    dashboard: `
        <div class="content-header">
            <h2 class="content-title">Dashboard</h2>
            <p class="content-subtitle">Überblick über Ihren Wissenstransfer-Fortschritt</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="kpi-card">
                <div class="kpi-label">Interviews durchgeführt</div>
                <div class="kpi-value">24</div>
                <div class="kpi-description">+3 diese Woche</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 80%"></div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-label">Interview-Minuten</div>
                <div class="kpi-value">1.247</div>
                <div class="kpi-description">Durchschnitt: 52 Min.</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 65%"></div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-label">Gesprochene Wörter</div>
                <div class="kpi-value">89.5K</div>
                <div class="kpi-description">~3.7K pro Interview</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 90%"></div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-label">Wissensbereiche</div>
                <div class="kpi-value">12</div>
                <div class="kpi-description">8 vollständig dokumentiert</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 67%"></div>
                </div>
            </div>
        </div>
        
        <div class="map-preview">
            <svg width="600" height="300" viewBox="0 0 600 300">
                <!-- Central Node -->
                <circle cx="300" cy="150" r="40" fill="rgba(155, 107, 197, 0.2)" stroke="#9B6BC5" stroke-width="3"/>
                <text x="300" y="155" text-anchor="middle" font-size="14" font-weight="600" fill="#9B6BC5">Rolle</text>
                
                <!-- Branch Nodes -->
                <line x1="300" y1="150" x2="200" y2="80" stroke="rgba(155, 107, 197, 0.3)" stroke-width="2"/>
                <circle cx="200" cy="80" r="30" fill="rgba(180, 136, 212, 0.15)" stroke="#B488D4" stroke-width="2"/>
                <text x="200" y="85" text-anchor="middle" font-size="12" fill="#6B4C7A">Prozesse</text>
                
                <line x1="300" y1="150" x2="400" y2="80" stroke="rgba(155, 107, 197, 0.3)" stroke-width="2"/>
                <circle cx="400" cy="80" r="30" fill="rgba(180, 136, 212, 0.15)" stroke="#B488D4" stroke-width="2"/>
                <text x="400" y="85" text-anchor="middle" font-size="12" fill="#6B4C7A">Kontakte</text>
                
                <line x1="300" y1="150" x2="200" y2="220" stroke="rgba(155, 107, 197, 0.3)" stroke-width="2"/>
                <circle cx="200" cy="220" r="30" fill="rgba(180, 136, 212, 0.15)" stroke="#B488D4" stroke-width="2"/>
                <text x="200" y="225" text-anchor="middle" font-size="12" fill="#6B4C7A">Tools</text>
                
                <line x1="300" y1="150" x2="400" y2="220" stroke="rgba(155, 107, 197, 0.3)" stroke-width="2"/>
                <circle cx="400" cy="220" r="30" fill="rgba(180, 136, 212, 0.15)" stroke="#B488D4" stroke-width="2"/>
                <text x="400" y="225" text-anchor="middle" font-size="12" fill="#6B4C7A">Best Practices</text>
            </svg>
        </div>
    `,
    
    interviews: `
        <div class="content-header">
            <h2 class="content-title">Interview</h2>
            <p class="content-subtitle">Projektmanagement Wissen sichern</p>
        </div>
        
        <div class="interview-container">
            <div class="chat-area">
                <div class="chat-message-wrapper agent">
                    <div class="message-content">
                        Welche Schritte durchlaufen Sie typischerweise bei der Projektplanung?
                    </div>
                </div>
                
                <div class="chat-message-wrapper user">
                    <div class="message-content">
                        Ich starte immer mit einer Stakeholder-Analyse und definiere dann klare Meilensteine. Besonders wichtig ist mir dabei die frühe Einbindung aller relevanten Abteilungen.
                    </div>
                </div>
                
                <div class="chat-message-wrapper agent">
                    <div class="message-content">
                        Interessant! Können Sie mir mehr über Ihre Stakeholder-Analyse erzählen? Welche Methoden nutzen Sie dabei?
                    </div>
                </div>
                
                <div class="chat-message-wrapper user">
                    <div class="message-content">
                        Ich nutze eine Matrix, in der ich Einfluss und Interesse bewerte. Dann führe ich meist Einzelgespräche mit den wichtigsten Stakeholdern, um ihre Erwartungen und Befürchtungen zu verstehen.
                    </div>
                </div>
                
                <div class="chat-message-wrapper agent">
                    <div class="message-content">
                        Das klingt sehr strukturiert. Wie gehen Sie mit widersprüchlichen Erwartungen verschiedener Stakeholder um?
                    </div>
                </div>
                
                <div class="chat-message-wrapper user">
                    <div class="message-content">
                        Das ist tatsächlich eine der größten Herausforderungen. Ich versuche, frühzeitig einen Workshop zu organisieren, in dem alle relevanten Parteien zusammenkommen. Transparenz und offene Kommunikation sind hier der Schlüssel.
                    </div>
                </div>
                
                <div class="recording-bar">
                    <div class="rec-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1C11.4477 1 11 1.44772 11 2V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V2C13 1.44772 12.5523 1 12 1Z" fill="currentColor"/>
                            <path d="M8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7V11C16 12.6569 14.6569 14 13 14H11C9.34315 14 8 12.6569 8 11V7Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 18V22M8 22H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="waveform-display">
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                        <div class="wave-line"></div>
                    </div>
                    <span class="rec-status">Recording...</span>
                </div>
                
                <div class="chat-message-wrapper agent">
                    <div class="message-content">
                        Welche Tools oder Methoden nutzen Sie, um die Projektkommunikation zu strukturieren?
                    </div>
                </div>
                
                <div class="chat-message-wrapper user">
                    <div class="message-content">
                        Wir arbeiten hauptsächlich mit JIRA für das Task-Management und Confluence für die Dokumentation. Zusätzlich haben wir wöchentliche Status-Calls und nutzen Slack für die tägliche Kommunikation.
                    </div>
                </div>
            </div>
            
            <div class="interview-controls">
                <button class="control-button secondary">Pause</button>
                <button class="control-button mic">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C11.4477 1 11 1.44772 11 2V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V2C13 1.44772 12.5523 1 12 1Z" fill="currentColor"/>
                        <path d="M8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7V11C16 12.6569 14.6569 14 13 14H11C9.34315 14 8 12.6569 8 11V7Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 18V22M8 22H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <button class="control-button primary">Continue</button>
            </div>
        </div>
    `,
    
    'knowledge-pages': `
        <div class="content-header">
            <h2 class="content-title">Knowledge Pages</h2>
            <p class="content-subtitle">Dokumentierte Wissensbereiche aus Ihren Interviews</p>
        </div>
        
        <div class="knowledge-grid">
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Projektplanung & Setup</h3>
                <p class="knowledge-card-desc">Methoden und Best Practices für die initiale Projektplanung, Stakeholder-Analyse und Ressourcenallokation.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Risikomanagement</h3>
                <p class="knowledge-card-desc">Strategien zur Identifikation, Bewertung und Mitigation von Projektrisiken in verschiedenen Phasen.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge unverified">Ungeprüft</span>
                <h3 class="knowledge-card-title">Team-Kommunikation</h3>
                <p class="knowledge-card-desc">Bewährte Kommunikationsstrukturen, Meeting-Formate und Reporting-Mechanismen für Projektteams.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Vendor Management</h3>
                <p class="knowledge-card-desc">Prozesse für die Auswahl, Steuerung und Bewertung externer Dienstleister und Lieferanten.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Budget & Controlling</h3>
                <p class="knowledge-card-desc">Methoden zur Budgetplanung, Kostenüberwachung und finanziellen Steuerung von Projekten.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge unverified">Ungeprüft</span>
                <h3 class="knowledge-card-title">Change Management</h3>
                <p class="knowledge-card-desc">Strategien für den Umgang mit Scope Changes, Priorisierung und Kommunikation von Änderungen.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Agile Methoden</h3>
                <p class="knowledge-card-desc">Scrum, Kanban und hybride Ansätze - welche Methodik für welche Projektsituation am besten geeignet ist.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge unverified">Ungeprüft</span>
                <h3 class="knowledge-card-title">Stakeholder Engagement</h3>
                <p class="knowledge-card-desc">Techniken zur kontinuierlichen Einbindung und Kommunikation mit verschiedenen Stakeholder-Gruppen während des Projektverlaufs.</p>
            </div>
            
            <div class="knowledge-card">
                <span class="status-badge verified">Überprüft</span>
                <h3 class="knowledge-card-title">Quality Assurance</h3>
                <p class="knowledge-card-desc">QA-Prozesse, Testing-Strategien und Qualitätssicherungsmaßnahmen in verschiedenen Projektphasen.</p>
            </div>
        </div>
    `,
    
    'knowledge-map': `
        <div class="content-header">
            <h2 class="content-title">Knowledge Map</h2>
            <p class="content-subtitle">Visuelle Darstellung Ihrer Wissensstruktur</p>
        </div>
        
        <div class="map-container">
            <svg class="map-svg" viewBox="0 0 800 600">
                <!-- Central Node -->
                <circle cx="400" cy="300" r="50" fill="rgba(155, 107, 197, 0.25)" stroke="#9B6BC5" stroke-width="4" class="map-node"/>
                <text x="400" y="305" text-anchor="middle" font-size="16" font-weight="700" fill="#9B6BC5">Senior PM</text>
                
                <!-- Primary Branches -->
                <line x1="400" y1="300" x2="250" y2="150" class="map-line"/>
                <g class="map-node">
                    <circle cx="250" cy="150" r="35" fill="rgba(180, 136, 212, 0.2)" stroke="#B488D4" stroke-width="3"/>
                    <text x="250" y="155" text-anchor="middle" font-size="14" font-weight="600" fill="#6B4C7A">Prozesse</text>
                </g>
                
                <line x1="400" y1="300" x2="550" y2="150" class="map-line"/>
                <g class="map-node">
                    <circle cx="550" cy="150" r="35" fill="rgba(180, 136, 212, 0.2)" stroke="#B488D4" stroke-width="3"/>
                    <text x="550" y="155" text-anchor="middle" font-size="14" font-weight="600" fill="#6B4C7A">Teams</text>
                </g>
                
                <line x1="400" y1="300" x2="250" y2="450" class="map-line"/>
                <g class="map-node">
                    <circle cx="250" cy="450" r="35" fill="rgba(180, 136, 212, 0.2)" stroke="#B488D4" stroke-width="3"/>
                    <text x="250" y="455" text-anchor="middle" font-size="14" font-weight="600" fill="#6B4C7A">Tools</text>
                </g>
                
                <line x1="400" y1="300" x2="550" y2="450" class="map-line"/>
                <g class="map-node">
                    <circle cx="550" cy="450" r="35" fill="rgba(180, 136, 212, 0.2)" stroke="#B488D4" stroke-width="3"/>
                    <text x="550" y="455" text-anchor="middle" font-size="14" font-weight="600" fill="#6B4C7A">Stakeholder</text>
                </g>
                
                <!-- Secondary Nodes -->
                <line x1="250" y1="150" x2="150" y2="100" class="map-line"/>
                <g class="map-node">
                    <circle cx="150" cy="100" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="150" y="105" text-anchor="middle" font-size="12" fill="#6B4C7A">Planung</text>
                </g>
                
                <line x1="250" y1="150" x2="150" y2="200" class="map-line"/>
                <g class="map-node">
                    <circle cx="150" cy="200" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="150" y="205" text-anchor="middle" font-size="12" fill="#6B4C7A">Controlling</text>
                </g>
                
                <line x1="550" y1="150" x2="650" y2="100" class="map-line"/>
                <g class="map-node">
                    <circle cx="650" cy="100" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="650" y="105" text-anchor="middle" font-size="12" fill="#6B4C7A">Leadership</text>
                </g>
                
                <line x1="550" y1="150" x2="650" y2="200" class="map-line"/>
                <g class="map-node">
                    <circle cx="650" cy="200" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="650" y="205" text-anchor="middle" font-size="12" fill="#6B4C7A">Coaching</text>
                </g>
                
                <line x1="250" y1="450" x2="150" y2="500" class="map-line"/>
                <g class="map-node">
                    <circle cx="150" cy="500" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="150" y="505" text-anchor="middle" font-size="12" fill="#6B4C7A">JIRA</text>
                </g>
                
                <line x1="550" y1="450" x2="650" y2="500" class="map-line"/>
                <g class="map-node">
                    <circle cx="650" cy="500" r="28" fill="rgba(173, 140, 155, 0.15)" stroke="#AD8C9B" stroke-width="2"/>
                    <text x="650" y="505" text-anchor="middle" font-size="12" fill="#6B4C7A">C-Level</text>
                </g>
            </svg>
        </div>
    `,
    
    calendar: `
        <div class="content-header">
            <h2 class="content-title">Kalender</h2>
            <p class="content-subtitle">Ihre Interview-Termine im Überblick</p>
        </div>
        
        <div class="calendar-container">
            <div class="calendar-header">
                <div class="calendar-month">Januar 2026</div>
                <div class="calendar-nav">
                    <button>‹</button>
                    <button>›</button>
                </div>
            </div>
            
            <div class="calendar-grid">
                <div class="calendar-day-header">Mo</div>
                <div class="calendar-day-header">Di</div>
                <div class="calendar-day-header">Mi</div>
                <div class="calendar-day-header">Do</div>
                <div class="calendar-day-header">Fr</div>
                <div class="calendar-day-header">Sa</div>
                <div class="calendar-day-header">So</div>
                
                <div class="calendar-day">1</div>
                <div class="calendar-day">2</div>
                <div class="calendar-day">3</div>
                <div class="calendar-day">4</div>
                <div class="calendar-day">5</div>
                <div class="calendar-day">6</div>
                <div class="calendar-day">7</div>
                <div class="calendar-day">8</div>
                <div class="calendar-day">9</div>
                <div class="calendar-day">10</div>
                <div class="calendar-day">11</div>
                <div class="calendar-day">12</div>
                <div class="calendar-day has-event">13</div>
                <div class="calendar-day">14</div>
                <div class="calendar-day has-event">15</div>
                <div class="calendar-day">16</div>
                <div class="calendar-day">17</div>
                <div class="calendar-day">18</div>
                <div class="calendar-day">19</div>
                <div class="calendar-day has-event">20</div>
                <div class="calendar-day">21</div>
                <div class="calendar-day">22</div>
                <div class="calendar-day has-event">23</div>
                <div class="calendar-day">24</div>
                <div class="calendar-day">25</div>
                <div class="calendar-day">26</div>
                <div class="calendar-day has-event">27</div>
                <div class="calendar-day">28</div>
                <div class="calendar-day">29</div>
                <div class="calendar-day">30</div>
                <div class="calendar-day">31</div>
            </div>
        </div>
    `,
    
    settings: `
        <div class="content-header">
            <h2 class="content-title">Einstellungen</h2>
            <p class="content-subtitle">Konfiguration Ihrer Implora-Plattform</p>
        </div>
        
        <div class="settings-container">
            <div class="settings-section">
                <h3 class="settings-section-title">Account</h3>
                <div class="settings-item">
                    <span class="settings-item-label">Name</span>
                    <span class="settings-item-value">Dr. Maria Schmidt</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">E-Mail</span>
                    <span class="settings-item-value">m.schmidt@unternehmen.de</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">Rolle</span>
                    <span class="settings-item-value">Senior Projektmanagerin</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3 class="settings-section-title">Interview-Konfiguration</h3>
                <div class="settings-item">
                    <span class="settings-item-label">Standardsprache</span>
                    <span class="settings-item-value">Deutsch</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">Interview-Dauer</span>
                    <span class="settings-item-value">45-60 Minuten</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">Auto-Transkription</span>
                    <span class="settings-item-value">Aktiviert</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3 class="settings-section-title">Integrationen</h3>
                <div class="settings-item">
                    <span class="settings-item-label">Microsoft Outlook</span>
                    <span class="settings-item-value">Verbunden</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">Slack</span>
                    <span class="settings-item-value">Verbunden</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">SharePoint</span>
                    <span class="settings-item-value">Nicht verbunden</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3 class="settings-section-title">Datenschutz & Sicherheit</h3>
                <div class="settings-item">
                    <span class="settings-item-label">Datenverschlüsselung</span>
                    <span class="settings-item-value">AES-256</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">DSGVO-Konformität</span>
                    <span class="settings-item-value">Aktiviert</span>
                </div>
                <div class="settings-item">
                    <span class="settings-item-label">2-Faktor-Authentifizierung</span>
                    <span class="settings-item-value">Aktiviert</span>
                </div>
            </div>
        </div>
    `
};

// Initialize platform on page load
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const contentArea = document.getElementById('platformContent');
    
    // Load default view (dashboard)
    loadContent('dashboard');
    
    // Add click handlers to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Load content
            loadContent(tab);
        });
    });
    
    function loadContent(tab) {
        const content = contentTemplates[tab];
        
        if (content) {
            // Fade out
            contentArea.style.opacity = '0';
            contentArea.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                // Update content
                contentArea.innerHTML = content;
                
                // Reset scroll position
                contentArea.scrollTop = 0;
                
                // Fade in
                setTimeout(() => {
                    contentArea.style.opacity = '1';
                    contentArea.style.transform = 'translateY(0)';
                }, 50);
            }, 200);
        }
    }
});
