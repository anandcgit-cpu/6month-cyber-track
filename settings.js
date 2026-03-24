// App Settings
const APP = {
    storageKey: 'cy6',
    totalDays: 240,
    daysPerWeek: 5,
    
    // Phases - 10 phases of 4 weeks each
    phases: [
        { id: 0, name: 'Phase 1: Foundations', weeks: 4, startDay: 1 },
        { id: 1, name: 'Phase 2: Networking & OS', weeks: 4, startDay: 21 },
        { id: 2, name: 'Phase 3: Security Tools', weeks: 4, startDay: 41 },
        { id: 3, name: 'Phase 4: Defensive Security', weeks: 4, startDay: 61 },
        { id: 4, name: 'Phase 5: Offensive Security', weeks: 4, startDay: 81 },
        { id: 5, name: 'Phase 6: Analysis & SIEM', weeks: 4, startDay: 101 },
        { id: 6, name: 'Phase 7: Cloud Security', weeks: 4, startDay: 121 },
        { id: 7, name: 'Phase 8: Labs & Projects', weeks: 4, startDay: 141 },
        { id: 8, name: 'Phase 9: Cert Prep', weeks: 4, startDay: 161 },
        { id: 9, name: 'Phase 10: Interview Prep', weeks: 4, startDay: 181 }
    ],
    
    // Google Sheets URL (update with your own)
    googleSheetUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    
    // Helper: Get day number
    getDayNumber: function(phaseId, week, day) {
        const phase = this.phases[phaseId];
        return phase.startDay + (week * 5) + day;
    },
    
    // Helper: Check if day is completed
    isCompleted: function(dayNum, completedList) {
        return completedList.includes(dayNum);
    }
};