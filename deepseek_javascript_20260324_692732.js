// Google Sheets synchronization via JSONP
class GoogleSheetsSync {
    constructor(sheetUrl) {
        this.sheetUrl = sheetUrl;
    }
    
    // Sync completion data to Google Sheets
    syncCompletion(dayNumber, completedDays, callback) {
        if (!this.sheetUrl || this.sheetUrl.includes('DUMMY_KEY')) {
            console.warn('Google Sheets not configured. Progress saved locally only.');
            if (callback) callback({ success: false, message: 'Not configured' });
            return;
        }
        
        // Prepare data
        const data = {
            action: 'updateCompletion',
            day: dayNumber,
            completedDays: completedDays.join(','),
            timestamp: new Date().toISOString(),
            totalCompleted: completedDays.length
        };
        
        // Use JSONP for cross-origin requests
        const callbackName = 'jsonp_callback_' + Date.now();
        const script = document.createElement('script');
        
        window[callbackName] = (response) => {
            delete window[callbackName];
            document.body.removeChild(script);
            if (callback) callback(response);
        };
        
        // Build URL with parameters
        const params = new URLSearchParams();
        params.append('callback', callbackName);
        params.append('action', data.action);
        params.append('day', data.day);
        params.append('completedDays', data.completedDays);
        params.append('timestamp', data.timestamp);
        params.append('totalCompleted', data.totalCompleted);
        
        script.src = `${this.sheetUrl}?${params.toString()}`;
        document.body.appendChild(script);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (window[callbackName]) {
                console.error('Google Sheets sync timeout');
                delete window[callbackName];
                if (callback) callback({ success: false, message: 'Timeout' });
            }
        }, 10000);
    }
    
    // Load initial data from Google Sheets (if needed)
    loadInitialData(callback) {
        if (!this.sheetUrl || this.sheetUrl.includes('DUMMY_KEY')) {
            if (callback) callback(null);
            return;
        }
        
        const callbackName = 'jsonp_load_' + Date.now();
        const script = document.createElement('script');
        
        window[callbackName] = (response) => {
            delete window[callbackName];
            document.body.removeChild(script);
            if (callback) callback(response);
        };
        
        const params = new URLSearchParams();
        params.append('callback', callbackName);
        params.append('action', 'load');
        
        script.src = `${this.sheetUrl}?${params.toString()}`;
        document.body.appendChild(script);
        
        setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (callback) callback(null);
            }
        }, 10000);
    }
}

// Initialize sync manager
const syncManager = new GoogleSheetsSync(CONFIG.GOOGLE_SHEETS_URL);