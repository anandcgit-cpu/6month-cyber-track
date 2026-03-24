// All curriculum data - 240 days of content
const CURRICULUM = {};

// Phase 0: Foundations (Days 1-20)
const phase0Data = {
    week0: [ // Days 1-5
        { watch: 'https://www.youtube.com/watch?v=inWWhr5tnEA', watchText: 'Cybersecurity Fundamentals',
          read: 'https://www.cisa.gov/cybersecurity-basics', readText: 'CISA Cybersecurity Basics',
          lab: 'https://tryhackme.com/r/room/introtocyber', labText: 'TryHackMe: Intro to Cyber Security',
          notes: '📝 Cybersecurity Fundamentals - CIA triad, basic security concepts' },
        { watch: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', watchText: 'Security Principles',
          read: 'https://csrc.nist.gov/glossary', readText: 'NIST Cybersecurity Glossary',
          lab: 'https://tryhackme.com/r/room/securityprinciples', labText: 'Security Principles',
          notes: '📝 Security Principles - Authentication, authorization, accounting' },
        { watch: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', watchText: 'CIA Triad Deep Dive',
          read: 'https://www.sans.org/security-resources/', readText: 'SANS Reading Room',
          lab: 'https://tryhackme.com/r/room/introtois', labText: 'Intro to Information Security',
          notes: '📝 CIA Triad - Confidentiality, Integrity, Availability' },
        { watch: 'https://www.youtube.com/watch?v=sdpxddDzXfE', watchText: 'Threats & Vulnerabilities',
          read: 'https://owasp.org/www-project-top-ten/', readText: 'OWASP Top 10',
          lab: 'https://tryhackme.com/r/room/vulnerabilities101', labText: 'Vulnerabilities 101',
          notes: '📝 Threats & Vulnerabilities - Risk assessment basics' },
        { watch: 'https://www.youtube.com/watch?v=auW3bT7XJbM', watchText: 'Security Controls',
          read: 'https://www.iso.org/isoiec-27001-information-security.html', readText: 'ISO 27001 Overview',
          lab: 'https://tryhackme.com/r/room/securityframeworks', labText: 'Security Frameworks',
          notes: '📝 Security Controls - Administrative, technical, physical controls' }
    ],
    week1: [ // Days 6-10 - repeat similar structure
        { watch: 'https://www.youtube.com/watch?v=inWWhr5tnEA', watchText: 'Cybersecurity Review',
          read: 'https://www.cisa.gov/cybersecurity-basics', readText: 'CISA Basics Review',
          lab: 'https://tryhackme.com/r/room/introtocyber', labText: 'TryHackMe: Intro Review',
          notes: '📝 Review Week 1 concepts - Practice and reinforce' },
        { watch: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', watchText: 'Security Principles Review',
          read: 'https://csrc.nist.gov/glossary', readText: 'NIST Glossary Review',
          lab: 'https://tryhackme.com/r/room/securityprinciples', labText: 'Security Principles Lab',
          notes: '📝 Review security principles and apply to scenarios' },
        { watch: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', watchText: 'CIA Triad Examples',
          read: 'https://www.sans.org/security-resources/', readText: 'SANS Articles',
          lab: 'https://tryhackme.com/r/room/introtois', labText: 'InfoSec Lab',
          notes: '📝 Real-world CIA triad examples' },
        { watch: 'https://www.youtube.com/watch?v=sdpxddDzXfE', watchText: 'Vulnerability Assessment',
          read: 'https://owasp.org/www-project-top-ten/', readText: 'OWASP Top 10 Deep Dive',
          lab: 'https://tryhackme.com/r/room/vulnerabilities101', labText: 'Vulnerabilities Lab',
          notes: '📝 How to identify and assess vulnerabilities' },
        { watch: 'https://www.youtube.com/watch?v=auW3bT7XJbM', watchText: 'Security Controls Review',
          read: 'https://www.iso.org/isoiec-27001-information-security.html', readText: 'ISO 27001 Controls',
          lab: 'https://tryhackme.com/r/room/securityframeworks', labText: 'Frameworks Lab',
          notes: '📝 Mapping controls to business requirements' }
    ]
};

// Build CURRICULUM for Phase 0 (repeat for other phases similarly)
CURRICULUM[0] = {};
for (let w = 0; w < 4; w++) {
    CURRICULUM[0][w] = [];
    for (let d = 0; d < 5; d++) {
        const data = phase0Data[`week${w}`] ? phase0Data[`week${w}`][d] : phase0Data.week0[d % 5];
        CURRICULUM[0][w][d] = {
            watch: { url: data.watch, text: data.watchText },
            read: { url: data.read, text: data.readText },
            lab: { url: data.lab, text: data.labText },
            notes: data.notes
        };
    }
}

// Fill remaining phases with placeholder data
for (let phase = 1; phase < 10; phase++) {
    CURRICULUM[phase] = {};
    for (let w = 0; w < 4; w++) {
        CURRICULUM[phase][w] = [];
        for (let d = 0; d < 5; d++) {
            CURRICULUM[phase][w][d] = {
                watch: { url: 'https://www.youtube.com/watch?v=qrRqN2HZw98', text: 'Security Fundamentals' },
                read: { url: 'https://www.securityweek.com/', text: 'Security Week Articles' },
                lab: { url: 'https://tryhackme.com/r/room/securityoperations', text: 'Security Operations Lab' },
                notes: '📝 Continue building your cybersecurity knowledge'
            };
        }
    }
}

console.log('Curriculum loaded:', Object.keys(CURRICULUM).length, 'phases');
