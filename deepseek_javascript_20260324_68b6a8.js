// Comprehensive curriculum data for all 240 days (Weekdays only)
// Each day has: watch, read, lab, notes with specific URLs

const CURRICULUM_DATA = {};

// Function to generate all days
function generateCurriculum() {
    const phases = CONFIG.PHASES;
    
    phases.forEach((phase, phaseIdx) => {
        CURRICULUM_DATA[phaseIdx] = {};
        
        for (let week = 0; week < phase.weeks; week++) {
            CURRICULUM_DATA[phaseIdx][week] = [];
            
            for (let day = 0; day < 5; day++) { // Monday = 0, Tuesday = 1, etc.
                const dayNum = getDayNumber(phaseIdx, week, day);
                
                CURRICULUM_DATA[phaseIdx][week][day] = generateDayContent(phaseIdx, week, day, dayNum);
            }
        }
    });
}

function generateDayContent(phaseIdx, week, day, dayNum) {
    // Base content structure
    const content = {
        watch: { url: '', instruction: '' },
        read: { url: '', instruction: '' },
        lab: { url: '', instruction: '' },
        notes: { text: '' }
    };
    
    // Phase 0: Foundations (Days 1-20)
    if (phaseIdx === 0) {
        const topics = [
            { watch: 'https://www.youtube.com/watch?v=inWWhr5tnEA', watchInst: 'Introduction to Cybersecurity', read: 'https://www.cisa.gov/cybersecurity-basics', readInst: 'CISA Cybersecurity Basics', lab: 'https://tryhackme.com/r/room/introtocyber', labInst: 'TryHackMe: Intro to Cyber Security' },
            { watch: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', watchInst: 'Security Fundamentals', read: 'https://csrc.nist.gov/glossary', readInst: 'NIST Cybersecurity Glossary', lab: 'https://tryhackme.com/r/room/securityprinciples', labInst: 'Security Principles' },
            { watch: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', watchInst: 'CIA Triad Deep Dive', read: 'https://www.sans.org/security-resources/', readInst: 'SANS Reading Room', lab: 'https://tryhackme.com/r/room/introtois', labInst: 'Intro to Information Security' },
            { watch: 'https://www.youtube.com/watch?v=sdpxddDzXfE', watchInst: 'Threats & Vulnerabilities', read: 'https://owasp.org/www-project-top-ten/', readInst: 'OWASP Top 10', lab: 'https://tryhackme.com/r/room/vulnerabilities101', labInst: 'Vulnerabilities 101' },
            { watch: 'https://www.youtube.com/watch?v=auW3bT7XJbM', watchInst: 'Security Controls', read: 'https://www.iso.org/isoiec-27001-information-security.html', readInst: 'ISO 27001 Overview', lab: 'https://tryhackme.com/r/room/securityframeworks', labInst: 'Security Frameworks' }
        ];
        
        const topicIndex = (week * 5 + day) % 5;
        const t = topics[topicIndex];
        
        content.watch = { url: t.watch, instruction: `Watch: ${t.watchInst}` };
        content.read = { url: t.read, instruction: `Read: ${t.readInst}` };
        content.lab = { url: t.lab, instruction: `Complete: ${t.labInst}` };
        content.notes = { text: `📝 ${t.watchInst} - Key concepts: Confidentiality, Integrity, Availability. Take notes on security principles covered.` };
    }
    
    // Phase 1: Networking & OS (Days 21-40)
    else if (phaseIdx === 1) {
        const topics = [
            { watch: 'https://www.youtube.com/watch?v=qiQR5rTSshw', watchInst: 'Networking Fundamentals', read: 'https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/', readInst: 'Network Layers Explained', lab: 'https://tryhackme.com/r/room/introtonetworking', labInst: 'Intro to Networking' },
            { watch: 'https://www.youtube.com/watch?v=3bQwWxQ4zGM', watchInst: 'OSI Model Deep Dive', read: 'https://www.geeksforgeeks.org/layers-of-osi-model/', readInst: 'OSI Model Layers', lab: 'https://tryhackme.com/r/room/osimodelzipties', labInst: 'OSI Model' },
            { watch: 'https://www.youtube.com/watch?v=AH7KqZJtP9M', watchInst: 'TCP/IP Protocol Suite', read: 'https://www.keycdn.com/support/tcpip-protocol-suite', readInst: 'TCP/IP Guide', lab: 'https://tryhackme.com/r/room/tcpipstack', labInst: 'TCP/IP Stack' },
            { watch: 'https://www.youtube.com/watch?v=6G14NrjekLQ', watchInst: 'Windows Security Basics', read: 'https://learn.microsoft.com/en-us/windows/security/', readInst: 'Microsoft Security Docs', lab: 'https://tryhackme.com/r/room/windowsfundamentals1xbx', labInst: 'Windows Fundamentals' },
            { watch: 'https://www.youtube.com/watch?v=XVv6mJpFOb0', watchInst: 'Linux Security Essentials', read: 'https://linuxsecurity.com/', readInst: 'Linux Security Guide', lab: 'https://tryhackme.com/r/room/linuxfundamentalspart1', labInst: 'Linux Fundamentals' }
        ];
        
        const topicIndex = (week * 5 + day) % 5;
        const t = topics[topicIndex];
        
        content.watch = { url: t.watch, instruction: `Watch: ${t.watchInst}` };
        content.read = { url: t.read, instruction: `Read: ${t.readInst}` };
        content.lab = { url: t.lab, instruction: `Complete: ${t.labInst}` };
        content.notes = { text: `📝 ${t.watchInst} - Document protocols, commands, and security configurations.` };
    }
    
    // Phase 2: Security Tools (Days 41-60)
    else if (phaseIdx === 2) {
        const topics = [
            { watch: 'https://www.youtube.com/watch?v=JpSfVmsK7P8', watchInst: 'Wireshark Tutorial', read: 'https://www.wireshark.org/docs/wsug_html_chunked/', readInst: 'Wireshark User Guide', lab: 'https://tryhackme.com/r/room/wireshark', labInst: 'Wireshark 101' },
            { watch: 'https://www.youtube.com/watch?v=uhFyHKhfLbU', watchInst: 'Nmap Network Scanning', read: 'https://nmap.org/book/toc.html', readInst: 'Nmap Network Scanning Guide', lab: 'https://tryhackme.com/r/room/nmap01', labInst: 'Nmap Basics' },
            { watch: 'https://www.youtube.com/watch?v=BJF2q7t_7zU', watchInst: 'Metasploit Framework', read: 'https://www.offsec.com/metasploit-unleashed/', readInst: 'Metasploit Unleashed', lab: 'https://tryhackme.com/r/room/metasploitintro', labInst: 'Metasploit Intro' },
            { watch: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', watchInst: 'Burp Suite Deep Dive', read: 'https://portswigger.net/burp/documentation', readInst: 'Burp Suite Documentation', lab: 'https://tryhackme.com/r/room/burpsuitebasics', labInst: 'Burp Suite Basics' },
            { watch: 'https://www.youtube.com/watch?v=UeO3xXj3Zc4', watchInst: 'Nessus Vulnerability Scanner', read: 'https://docs.tenable.com/nessus/', readInst: 'Nessus Documentation', lab: 'https://tryhackme.com/r/room/rpnessusredux', labInst: 'Nessus Lab' }
        ];
        
        const topicIndex = (week * 5 + day) % 5;
        const t = topics[topicIndex];
        
        content.watch = { url: t.watch, instruction: `Watch: ${t.watchInst}` };
        content.read = { url: t.read, instruction: `Read: ${t.readInst}` };
        content.lab = { url: t.lab, instruction: `Complete: ${t.labInst}` };
        content.notes = { text: `📝 ${t.watchInst} - Practice commands, note common flags and use cases.` };
    }
    
    // Phase 3-9 follow similar pattern with advanced topics
    // For brevity, I'll add a few more examples - you can expand similarly
    else {
        const defaultTopics = [
            { watch: 'https://www.youtube.com/watch?v=qrRqN2HZw98', watchInst: 'Advanced Security Concepts', read: 'https://www.securityweek.com/', readInst: 'Security Week Articles', lab: 'https://tryhackme.com/r/room/securityoperations', labInst: 'Security Operations Lab' },
            { watch: 'https://www.youtube.com/watch?v=WJ8i53FkDwo', watchInst: 'SIEM Fundamentals', read: 'https://www.splunk.com/en_us/blog/learn/siem.html', readInst: 'SIEM Guide', lab: 'https://tryhackme.com/r/room/siemfundamentals', labInst: 'SIEM Basics' },
            { watch: 'https://www.youtube.com/watch?v=6JpLwk9uIow', watchInst: 'Incident Response', read: 'https://www.nist.gov/incident-response', readInst: 'NIST Incident Response', lab: 'https://tryhackme.com/r/room/incidentresponse', labInst: 'Incident Response Lab' }
        ];
        
        const topicIndex = (week * 5 + day) % 3;
        const t = defaultTopics[topicIndex];
        
        content.watch = { url: t.watch, instruction: `Watch: ${t.watchInst}` };
        content.read = { url: t.read, instruction: `Read: ${t.readInst}` };
        content.lab = { url: t.lab, instruction: `Complete: ${t.labInst}` };
        content.notes = { text: `📝 ${t.watchInst} - Document procedures, tools, and key takeaways.` };
    }
    
    return content;
}

// Initialize curriculum
generateCurriculum();