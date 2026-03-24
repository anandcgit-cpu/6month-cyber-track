// Google Sheets Sync
const GoogleSync = {
    sync: function(dayNum, completedList, callback) {
        const url = APP.googleSheetUrl;
        
        if (!url || url.includes('YOUR_SCRIPT_ID')) {
            console.log('Google Sheets not configured');
            if (callback) callback({ success: false });
            return;
        }
        
        const callbackName = 'callback_' + Date.now();
        const script = document.createElement('script');
        
        window[callbackName] = function(response) {
            delete window[callbackName];
            document.body.removeChild(script);
            if (callback) callback(response);
        };
        
        const params = new URLSearchParams({
            callback: callbackName,
            day: dayNum,
            completed: completedList.join(','),
            total: completedList.length,
            time: new Date().toISOString()
        });
        
        script.src = `${url}?${params.toString()}`;
        document.body.appendChild(script);
        
        setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (callback) callback({ success: false, error: 'timeout' });
            }
        }, 10000);
    }
};