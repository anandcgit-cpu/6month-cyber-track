// Main App
const Tracker = {
    currentPhase: 0,
    completedDays: [],
    
    init: function() {
        this.loadData();
        this.render();
    },
    
    loadData: function() {
        const saved = localStorage.getItem(APP.storageKey);
        this.completedDays = saved ? JSON.parse(saved) : [];
    },
    
    saveData: function() {
        localStorage.setItem(APP.storageKey, JSON.stringify(this.completedDays));
        this.updateProgress();
    },
    
    render: function() {
        this.renderPhases();
        this.renderWeeks();
        this.updateProgress();
        this.highlightToday();
    },
    
    renderPhases: function() {
        const container = document.getElementById('phaseTabs');
        if (!container) return;
        
        container.innerHTML = '';
        
        APP.phases.forEach((phase, i) => {
            const btn = document.createElement('button');
            btn.className = `phase-btn ${i === this.currentPhase ? 'active' : ''}`;
            btn.textContent = phase.name;
            btn.onclick = () => {
                this.currentPhase = i;
                this.render();
            };
            container.appendChild(btn);
        });
    },
    
    renderWeeks: function() {
        const container = document.getElementById('weeksContainer');
        if (!container) return;
        
        container.innerHTML = '';
        const phase = APP.phases[this.currentPhase];
        
        for (let w = 0; w < phase.weeks; w++) {
            this.renderWeek(w, container);
        }
    },
    
    renderWeek: function(weekIndex, container) {
        const phase = APP.phases[this.currentPhase];
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-card';
        weekDiv.dataset.week = weekIndex;
        
        // Count completed
        let done = 0;
        for (let d = 0; d < 5; d++) {
            const dayNum = APP.getDayNumber(this.currentPhase, weekIndex, d);
            if (this.completedDays.includes(dayNum)) done++;
        }
        const percent = (done / 5) * 100;
        
        // Header
        const header = document.createElement('div');
        header.className = 'week-header';
        header.onclick = () => weekDiv.classList.toggle('open');
        
        header.innerHTML = `
            <div class="week-title">
                <i class="fas fa-chevron-right"></i>
                <span>Week ${weekIndex + 1} • Days ${phase.startDay + weekIndex * 5} - ${phase.startDay + weekIndex * 5 + 4}</span>
            </div>
            <div class="week-progress">
                <div class="week-progress-bar">
                    <div class="week-progress-fill" style="width: ${percent}%"></div>
                </div>
                <div class="week-progress-text">${done}/5 days</div>
            </div>
        `;
        
        // Days Grid
        const grid = document.createElement('div');
        grid.className = 'days-grid';
        
        for (let d = 0; d < 5; d++) {
            grid.appendChild(this.renderDay(weekIndex, d));
        }
        
        weekDiv.appendChild(header);
        weekDiv.appendChild(grid);
        container.appendChild(weekDiv);
    },
    
    renderDay: function(weekIndex, dayIndex) {
        const dayNum = APP.getDayNumber(this.currentPhase, weekIndex, dayIndex);
        const content = CURRICULUM[this.currentPhase][weekIndex][dayIndex];
        const completed = this.completedDays.includes(dayNum);
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        const card = document.createElement('div');
        card.className = `day-card ${completed ? 'completed' : ''}`;
        card.dataset.day = dayNum;
        
        card.innerHTML = `
            <div class="day-header">
                <div class="day-name">
                    <i class="fas fa-calendar-day"></i>
                    Day ${dayNum}: ${dayNames[dayIndex]}
                </div>
                ${completed ? '<i class="fas fa-check-circle check-icon"></i>' : ''}
            </div>
            <div class="slot">
                <div class="slot-label"><i class="fas fa-play"></i> WATCH</div>
                <a href="${content.watch.url}" target="_blank">${content.watch.text}</a>
            </div>
            <div class="slot">
                <div class="slot-label"><i class="fas fa-book"></i> READ</div>
                <a href="${content.read.url}" target="_blank">${content.read.text}</a>
            </div>
            <div class="slot">
                <div class="slot-label"><i class="fas fa-flask"></i> LAB</div>
                <a href="${content.lab.url}" target="_blank">${content.lab.text}</a>
            </div>
            <div class="slot">
                <div class="slot-label"><i class="fas fa-pen"></i> NOTES</div>
                <div class="note-text">${content.notes}</div>
                <div class="slot-note">✍️ Write in your notebook</div>
            </div>
            <button class="mark-btn ${completed ? 'done' : ''}" data-day="${dayNum}" ${completed ? 'disabled' : ''}>
                ${completed ? '✓ Completed' : '✓ Mark Done'}
            </button>
        `;
        
        const btn = card.querySelector('.mark-btn');
        if (!completed) {
            btn.onclick = (e) => {
                e.stopPropagation();
                this.markDay(dayNum, btn, card);
            };
        }
        
        return card;
    },
    
    markDay: function(dayNum, button, card) {
        if (this.completedDays.includes(dayNum)) return;
        
        this.completedDays.push(dayNum);
        this.saveData();
        
        // Update UI
        button.textContent = '✓ Completed';
        button.classList.add('done');
        button.disabled = true;
        card.classList.add('completed');
        
        const header = card.querySelector('.day-header');
        if (!header.querySelector('.check-icon')) {
            const check = document.createElement('i');
            check.className = 'fas fa-check-circle check-icon';
            header.appendChild(check);
        }
        
        // Update week progress
        this.updateWeekProgress(dayNum);
        
        // Sync to Google Sheets
        GoogleSync.sync(dayNum, this.completedDays, (res) => {
            this.showToast();
        });
    },
    
    updateWeekProgress: function(dayNum) {
        // Find and update the week containing this day
        for (let p = 0; p < APP.phases.length; p++) {
            const phase = APP.phases[p];
            const phaseEnd = phase.startDay + (phase.weeks * 5) - 1;
            
            if (dayNum >= phase.startDay && dayNum <= phaseEnd && p === this.currentPhase) {
                const weekIdx = Math.floor((dayNum - phase.startDay) / 5);
                const weekCard = document.querySelector(`.week-card[data-week="${weekIdx}"]`);
                
                if (weekCard) {
                    let done = 0;
                    for (let d = 0; d < 5; d++) {
                        const checkDay = APP.getDayNumber(p, weekIdx, d);
                        if (this.completedDays.includes(checkDay)) done++;
                    }
                    const percent = (done / 5) * 100;
                    
                    const fill = weekCard.querySelector('.week-progress-fill');
                    const text = weekCard.querySelector('.week-progress-text');
                    if (fill) fill.style.width = `${percent}%`;
                    if (text) text.textContent = `${done}/5 days`;
                }
                break;
            }
        }
    },
    
    updateProgress: function() {
        const total = APP.totalDays;
        const done = this.completedDays.length;
        const percent = (done / total) * 100;
        
        const fill = document.getElementById('overallFill');
        const percentSpan = document.getElementById('overallPercent');
        const doneSpan = document.getElementById('completedDays');
        
        if (fill) fill.style.width = `${percent}%`;
        if (percentSpan) percentSpan.textContent = `${Math.round(percent)}%`;
        if (doneSpan) doneSpan.textContent = done;
    },
    
    highlightToday: function() {
        // For demo, highlight day 1
        // In production, calculate based on start date
        const todayDay = 1;
        const todayCard = document.querySelector(`.day-card[data-day="${todayDay}"]`);
        if (todayCard) {
            todayCard.classList.add('today');
            todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
    
    showToast: function() {
        const toast = document.getElementById('toastMsg');
        if (!toast) return;
        
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
};

// Start app
document.addEventListener('DOMContentLoaded', () => {
    Tracker.init();
});