// Main application logic
class CybersecurityTracker {
    constructor() {
        this.currentPhase = 0;
        this.completedDays = [];
        this.loadCompletedDays();
        this.init();
    }
    
    loadCompletedDays() {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
            this.completedDays = JSON.parse(saved);
        } else {
            this.completedDays = [];
        }
    }
    
    saveCompletedDays() {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.completedDays));
        this.updateAllProgress();
    }
    
    init() {
        this.renderPhaseTabs();
        this.renderCurrentPhase();
        this.updateOverallProgress();
        this.highlightCurrentDay();
    }
    
    renderPhaseTabs() {
        const tabsContainer = document.getElementById('phase-tabs');
        tabsContainer.innerHTML = '';
        
        CONFIG.PHASES.forEach((phase, idx) => {
            const tab = document.createElement('button');
            tab.className = `phase-tab ${idx === this.currentPhase ? 'active' : ''}`;
            tab.textContent = phase.name;
            tab.onclick = () => {
                this.currentPhase = idx;
                this.renderPhaseTabs();
                this.renderCurrentPhase();
                this.highlightCurrentDay();
            };
            tabsContainer.appendChild(tab);
        });
    }
    
    renderCurrentPhase() {
        const weeksContainer = document.getElementById('weeks-container');
        weeksContainer.innerHTML = '';
        
        const phase = CONFIG.PHASES[this.currentPhase];
        const weeks = phase.weeks;
        
        for (let week = 0; week < weeks; week++) {
            this.renderWeek(week, weeksContainer);
        }
    }
    
    renderWeek(weekIndex, container) {
        const phase = CONFIG.PHASES[this.currentPhase];
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-item';
        weekDiv.dataset.week = weekIndex;
        
        // Calculate week progress
        let completedCount = 0;
        for (let day = 0; day < 5; day++) {
            const dayNum = getDayNumber(this.currentPhase, weekIndex, day);
            if (this.completedDays.includes(dayNum)) completedCount++;
        }
        const progressPercent = (completedCount / 5) * 100;
        
        // Week header
        const header = document.createElement('div');
        header.className = 'week-header';
        header.onclick = () => {
            weekDiv.classList.toggle('expanded');
        };
        
        header.innerHTML = `
            <div class="week-title">
                <i class="fas fa-chevron-right"></i>
                <span>Week ${weekIndex + 1} • Days ${phase.startDay + weekIndex * 5} - ${phase.startDay + weekIndex * 5 + 4}</span>
            </div>
            <div class="week-progress">
                <div class="week-progress-bar">
                    <div class="week-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="week-progress-text">${completedCount}/5 days</div>
            </div>
        `;
        
        // Days grid
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        for (let day = 0; day < 5; day++) {
            const dayCard = this.renderDay(weekIndex, day);
            daysGrid.appendChild(dayCard);
        }
        
        weekDiv.appendChild(header);
        weekDiv.appendChild(daysGrid);
        container.appendChild(weekDiv);
    }
    
    renderDay(weekIndex, dayIndex) {
        const dayNum = getDayNumber(this.currentPhase, weekIndex, dayIndex);
        const content = CURRICULUM_DATA[this.currentPhase][weekIndex][dayIndex];
        const isCompleted = this.completedDays.includes(dayNum);
        
        const dayCard = document.createElement('div');
        dayCard.className = `day-card ${isCompleted ? 'completed' : ''}`;
        dayCard.dataset.dayNum = dayNum;
        
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        dayCard.innerHTML = `
            <div class="day-header">
                <div class="day-title">
                    <i class="fas fa-calendar-day"></i>
                    Day ${dayNum}: ${dayNames[dayIndex]}
                </div>
                ${isCompleted ? '<i class="fas fa-check-circle checkmark"></i>' : ''}
            </div>
            <div class="activity-slots">
                <div class="slot">
                    <div class="slot-label"><i class="fas fa-play-circle"></i> WATCH</div>
                    <a href="${content.watch.url}" target="_blank" rel="noopener noreferrer">${content.watch.instruction}</a>
                    <div class="instruction">${content.watch.instruction}</div>
                </div>
                <div class="slot">
                    <div class="slot-label"><i class="fas fa-book"></i> READ</div>
                    <a href="${content.read.url}" target="_blank" rel="noopener noreferrer">${content.read.instruction}</a>
                    <div class="instruction">${content.read.instruction}</div>
                </div>
                <div class="slot">
                    <div class="slot-label"><i class="fas fa-flask"></i> LAB</div>
                    <a href="${content.lab.url}" target="_blank" rel="noopener noreferrer">${content.lab.instruction}</a>
                    <div class="instruction">${content.lab.instruction}</div>
                </div>
                <div class="slot">
                    <div class="slot-label"><i class="fas fa-pen"></i> NOTES</div>
                    <div class="notes-text">${content.notes.text}</div>
                    <div class="instruction">✍️ Write your notes in your physical notebook</div>
                </div>
            </div>
            <button class="mark-done-btn ${isCompleted ? 'completed-btn' : ''}" data-day="${dayNum}" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? '✓ Completed' : '✓ Mark Done'}
            </button>
        `;
        
        const markBtn = dayCard.querySelector('.mark-done-btn');
        if (!isCompleted) {
            markBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.markDayCompleted(dayNum, markBtn, dayCard);
            });
        }
        
        return dayCard;
    }
    
    markDayCompleted(dayNum, button, dayCard) {
        if (this.completedDays.includes(dayNum)) return;
        
        this.completedDays.push(dayNum);
        this.saveCompletedDays();
        
        // Update UI
        button.textContent = '✓ Completed';
        button.classList.add('completed-btn');
        button.disabled = true;
        dayCard.classList.add('completed');
        
        // Add checkmark to header
        const header = dayCard.querySelector('.day-header');
        if (!header.querySelector('.checkmark')) {
            const checkmark = document.createElement('i');
            checkmark.className = 'fas fa-check-circle checkmark';
            header.appendChild(checkmark);
        }
        
        // Update week progress
        this.updateWeekProgress(dayNum);
        
        // Update overall progress
        this.updateOverallProgress();
        
        // Sync to Google Sheets
        this.syncToGoogleSheets(dayNum);
        
        // Show toast notification
        this.showToast('Progress synced to Google Sheets');
    }
    
    updateWeekProgress(dayNum) {
        // Find which week this day belongs to
        let found = false;
        for (let phaseIdx = 0; phaseIdx < CONFIG.PHASES.length && !found; phaseIdx++) {
            const phase = CONFIG.PHASES[phaseIdx];
            const phaseEnd = phase.startDay + (phase.weeks * 5) - 1;
            
            if (dayNum >= phase.startDay && dayNum <= phaseEnd) {
                const weekIndex = Math.floor((dayNum - phase.startDay) / 5);
                const weekDiv = document.querySelector(`.week-item[data-week="${weekIndex}"]`);
                
                if (weekDiv && this.currentPhase === phaseIdx) {
                    // Recalculate week progress
                    let completedCount = 0;
                    for (let day = 0; day < 5; day++) {
                        const checkDayNum = getDayNumber(phaseIdx, weekIndex, day);
                        if (this.completedDays.includes(checkDayNum)) completedCount++;
                    }
                    const progressPercent = (completedCount / 5) * 100;
                    
                    const progressFill = weekDiv.querySelector('.week-progress-fill');
                    const progressText = weekDiv.querySelector('.week-progress-text');
                    
                    if (progressFill) progressFill.style.width = `${progressPercent}%`;
                    if (progressText) progressText.textContent = `${completedCount}/5 days`;
                }
                found = true;
            }
        }
    }
    
    updateOverallProgress() {
        const completed = this.completedDays.length;
        const total = CONFIG.TOTAL_DAYS;
        const percent = (completed / total) * 100;
        
        const progressFill = document.getElementById('overall-progress-fill');
        const percentSpan = document.getElementById('overall-percent');
        const completedSpan = document.getElementById('completed-days-count');
        
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (percentSpan) percentSpan.textContent = `${Math.round(percent)}%`;
        if (completedSpan) completedSpan.textContent = completed;
    }
    
    updateAllProgress() {
        // Update overall progress
        this.updateOverallProgress();
        
        // Re-render current phase to update week progress bars
        this.renderCurrentPhase();
        this.highlightCurrentDay();
    }
    
    highlightCurrentDay() {
        const currentDayNum = CONFIG.getCurrentStudyDay();
        
        // Remove existing highlight
        document.querySelectorAll('.day-card').forEach(card => {
            card.classList.remove('current-day');
        });
        
        // Find and highlight current day
        const currentDayCard = document.querySelector(`.day-card[data-day-num="${currentDayNum}"]`);
        if (currentDayCard) {
            currentDayCard.classList.add('current-day');
            // Scroll into view if needed
            currentDayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    syncToGoogleSheets(dayNum) {
        syncManager.syncCompletion(dayNum, this.completedDays, (response) => {
            if (response && response.success === false) {
                console.warn('Failed to sync to Google Sheets:', response.message);
            } else if (response) {
                console.log('Sync successful:', response);
            }
        });
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tracker = new CybersecurityTracker();
});