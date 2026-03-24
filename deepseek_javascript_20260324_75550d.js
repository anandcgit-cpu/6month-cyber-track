// Configuration file
const CONFIG = {
    // Google Sheets Configuration
    // IMPORTANT: Replace with your actual Google Apps Script Web App URL
    // To set up: 
    // 1. Create a Google Sheet
    // 2. Go to Extensions > Apps Script
    // 3. Deploy as Web App
    // 4. Copy the URL here
    GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/AKfycbx_DUMMY_KEY_HERE/exec',
    
    // Storage key for localStorage
    STORAGE_KEY: 'cy6',
    
    // Total days in program
    TOTAL_DAYS: 240,
    
    // Days per week (Mon-Fri only)
    DAYS_PER_WEEK: 5,
    
    // Phase configuration
    PHASES: [
        { id: 0, name: 'Phase 1: Foundations', weeks: 4, startDay: 1 },
        { id: 1, name: 'Phase 2: Networking & OS', weeks: 4, startDay: 21 },
        { id: 2, name: 'Phase 3: Security Tools', weeks: 4, startDay: 41 },
        { id: 3, name: 'Phase 4: Defensive Security', weeks: 4, startDay: 61 },
        { id: 4, name: 'Phase 5: Offensive Security', weeks: 4, startDay: 81 },
        { id: 5, name: 'Phase 6: Analysis & SIEM', weeks: 4, startDay: 101 },
        { id: 6, name: 'Phase 7: Cert Prep', weeks: 4, startDay: 121 },
        { id: 7, name: 'Phase 8: Labs & Projects', weeks: 4, startDay: 141 },
        { id: 8, name: 'Phase 9: Interview Prep', weeks: 4, startDay: 161 },
        { id: 9, name: 'Phase 10: Final Review', weeks: 4, startDay: 181 }
    ],
    
    // Current date for highlighting
    getCurrentStudyDay: function() {
        // This is a placeholder - in real implementation, you'd calculate based on start date
        // For demo, we'll use day 1
        return 1;
    }
};

// Helper function to get day number from week and day index
function getDayNumber(phaseId, weekIndex, dayIndex) {
    const phase = CONFIG.PHASES[phaseId];
    const weekOffset = weekIndex * 5;
    return phase.startDay + weekOffset + dayIndex;
}

// Helper to check if a day is completed
function isDayCompleted(dayNumber, completedDays) {
    return completedDays.includes(dayNumber);
}