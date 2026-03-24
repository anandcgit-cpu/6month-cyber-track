function doGet(e) {
    const callback = e.parameter.callback;
    const action = e.parameter.action;
    
    if (action === 'updateCompletion') {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const day = e.parameter.day;
        const completedDays = e.parameter.completedDays;
        const timestamp = e.parameter.timestamp;
        const totalCompleted = e.parameter.totalCompleted;
        
        sheet.appendRow([day, completedDays, timestamp, totalCompleted]);
        
        const result = { success: true, message: 'Progress saved', day: day };
        return ContentService.createTextOutput(`${callback}(${JSON.stringify(result)})`)
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    if (action === 'load') {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = sheet.getDataRange().getValues();
        const result = { success: true, data: data };
        return ContentService.createTextOutput(`${callback}(${JSON.stringify(result)})`)
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    const result = { success: false, message: 'Invalid action' };
    return ContentService.createTextOutput(`${callback}(${JSON.stringify(result)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}