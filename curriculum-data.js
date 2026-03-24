// All curriculum data - 240 days of content
const CURRICULUM = {};

// Generate all days
function buildCurriculum() {
    for (let p = 0; p < APP.phases.length; p++) {
        CURRICULUM[p] = {};
        const phase = APP.phases[p];
        
        for (let w = 0; w < phase.weeks; w++) {
            CURRICULUM[p][w] = [];
            
            for (let d = 0; d < 5; d++) {
                CURRICULUM[p][w][d] = getDayContent(p, w, d);
            }
        }
    }
}

function getDayContent(phase, week, day) {
    // Default content structure
    const content = {
        watch: { url: '', text: '' },
        read: { url: '', text: '' },
        lab: { url: '', text: '' },
        notes: ''
    };
    
    // Phase 0: Foundations (Days 1-20)
    if (phase === 0) {
        const topics = [
            { w: 'https://www.youtube.com/watch?v=inWWhr5tnEA', wt: 'Cybersecurity Fundamentals', 
              r: 'https://www.cisa.gov/cybersecurity-basics', rt: 'CISA Basics',
              l: 'https://tryhackme.com/r/room/introtocyber', lt: 'TryHackMe: Intro' },
            { w: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', wt: 'Security Principles',
              r: 'https://csrc.nist.gov/glossary', rt: 'NIST Glossary',
              l: 'https://tryhackme.com/r/room/securityprinciples', lt: 'Security Principles' },
            { w: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', wt: 'CIA Triad',
              r: 'https://www.sans.org/security-resources/', rt: 'SANS Reading',
              l: 'https://tryhackme.com/r/room/introtois', lt: 'InfoSec Intro' },
            { w: 'https://www.youtube.com/watch?v=sdpxddDzXfE', wt: 'Threats & Vulnerabilities',
              r: 'https://owasp.org/www-project-top-ten/', rt: 'OWASP Top 10',
              l: 'https://tryhackme.com/r/room/vulnerabilities101', lt: 'Vulns 101' },
            { w: 'https://www.youtube.com/watch?v=auW3bT7XJbM', wt: 'Security Controls',
              r: 'https://www.iso.org/isoiec-27001-information-security.html', rt: 'ISO 27001',
              l: 'https://tryhackme.com/r/room/securityframeworks', lt: 'Frameworks' }
        ];
        const t = topics[(week * 5 + day) % 5];
        content.watch = { url: t.w, text: t.wt };
        content.read = { url: t.r, text: t.rt };
        content.lab = { url: t.l, text: t.lt };
        content.notes = `📝 ${t.wt} - Take notes on key concepts`;
    }
    
    // Phase 1: Networking (Days 21-40)
    else if (phase === 1) {
        const topics = [
            { w: 'https://www.youtube.com/watch?v=qiQR5rTSshw', wt: 'Networking Fundamentals',
              r: 'https://www.cloudflare.com/learning/network-layer/', rt: 'Network Layers',
              l: 'https://tryhackme.com/r/room/introtonetworking', lt: 'Networking Intro' },
            { w: 'https://www.youtube.com/watch?v=3bQwWxQ4zGM', wt: 'OSI Model',
              r: 'https://www.geeksforgeeks.org/layers-of-osi-model/', rt: 'OSI Layers',
              l: 'https://tryhackme.com/r/room/osimodelzipties', lt: 'OSI Model' },
            { w: 'https://www.youtube.com/watch?v=AH7KqZJtP9M', wt: 'TCP/IP',
              r: 'https://www.keycdn.com/support/tcpip-protocol-suite', rt: 'TCP/IP Guide',
              l: 'https://tryhackme.com/r/room/tcpipstack', lt: 'TCP/IP Stack' },
            { w: 'https://www.youtube.com/watch?v=6G14NrjekLQ', wt: 'Windows Security',
              r: 'https://learn.microsoft.com/en-us/windows/security/', rt: 'MS Security',
              l: 'https://tryhackme.com/r/room/windowsfundamentals1xbx', lt: 'Windows Basics' },
            { w: 'https://www.youtube.com/watch?v=XVv6mJpFOb0', wt: 'Linux Security',
              r: 'https://linuxsecurity.com/', rt: 'Linux Security',
              l: 'https://tryhackme.com/r/room/linuxfundamentalspart1', lt: 'Linux Basics' }
        ];
        const t = topics[(week * 5 + day) % 5];
        content.watch = { url: t.w, text: t.wt };
        content.read = { url: t.r, text: t.rt };
        content.lab = { url: t.l, text: t.lt };
        content.notes = `📝 ${t.wt} - Document commands and protocols`;
    }
    
    // Phase 2: Security Tools (Days 41-60)
    else if (phase === 2) {
        const topics = [
            { w: 'https://www.youtube.com/watch?v=JpSfVmsK7P8', wt: 'Wireshark',
              r: 'https://www.wireshark.org/docs/', rt: 'Wireshark Docs',
              l: 'https://tryhackme.com/r/room/wireshark', lt: 'Wireshark 101' },
            { w: 'https://www.youtube.com/watch?v=uhFyHKhfLbU', wt: 'Nmap',
              r: 'https://nmap.org/book/toc.html', rt: 'Nmap Guide',
              l: 'https://tryhackme.com/r/room/nmap01', lt: 'Nmap Basics' },
            { w: 'https://www.youtube.com/watch?v=BJF2q7t_7zU', wt: 'Metasploit',
              r: 'https://www.offsec.com/metasploit-unleashed/', rt: 'Metasploit Unleashed',
              l: 'https://tryhackme.com/r/room/metasploitintro', lt: 'Metasploit Intro' },
            { w: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', wt: 'Burp Suite',
              r: 'https://portswigger.net/burp/documentation', rt: 'Burp Docs',
              l: 'https://tryhackme.com/r/room/burpsuitebasics', lt: 'Burp Basics' },
            { w: 'https://www.youtube.com/watch?v=UeO3xXj3Zc4', wt: 'Nessus',
              r: 'https://docs.tenable.com/nessus/', rt: 'Nessus Docs',
              l: 'https://tryhackme.com/r/room/rpnessusredux', lt: 'Nessus Lab' }
        ];
        const t = topics[(week * 5 + day) % 5];
        content.watch = { url: t.w, text: t.wt };
        content.read = { url: t.r, text: t.rt };
        content.lab = { url: t.l, text: t.lt };
        content.notes = `📝 ${t.wt} - Practice commands and document findings`;
    }
    
    // Phases 3-9: Advanced topics
    else {
        const advanced = [
            { w: 'https://www.youtube.com/watch?v=qrRqN2HZw98', wt: 'SIEM Fundamentals',
              r: 'https://www.splunk.com/en_us/blog/learn/siem.html', rt: 'SIEM Guide',
              l: 'https://tryhackme.com/r/room/siemfundamentals', lt: 'SIEM Lab' },
            { w: 'https://www.youtube.com/watch?v=WJ8i53FkDwo', wt: 'Incident Response',
              r: 'https://www.nist.gov/incident-response', rt: 'NIST IR',
              l: 'https://tryhackme.com/r/room/incidentresponse', lt: 'IR Lab' },
            { w: 'https://www.youtube.com/watch?v=6JpLwk9uIow', wt: 'Threat Hunting',
              r: 'https://www.mitre.org/attack-101', rt: 'MITRE ATT&CK',
              l: 'https://tryhackme.com/r/room/mitre', lt: 'MITRE Lab' }
        ];
        const t = advanced[(week * 5 + day) % 3];
        content.watch = { url: t.w, text: t.wt };
        content.read = { url: t.r, text: t.rt };
        content.lab = { url: t.l, text: t.lt };
        content.notes = `📝 ${t.wt} - Document procedures and key takeaways`;
    }
    
    return content;
}

// Initialize
buildCurriculum();