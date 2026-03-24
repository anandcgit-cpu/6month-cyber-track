// All curriculum data - 240 days of content
const CURRICULUM = {};

// Phase 0: Foundations (Days 1-20) - Complete data with ALL sections
function buildPhase0() {
    const weeks = [];
    
    // Week 1 (Days 1-5)
    weeks[0] = [
        { 
            watch: 'https://www.youtube.com/watch?v=inWWhr5tnEA', watchText: 'Watch: Cybersecurity Fundamentals',
            read: 'https://www.cisa.gov/cybersecurity-basics', readText: 'Read: CISA Cybersecurity Basics',
            lab: 'https://tryhackme.com/r/room/introtocyber', labText: 'Lab: TryHackMe Intro to Cyber',
            notes: '📝 Cybersecurity Fundamentals - CIA triad, basic security concepts'
        },
        { 
            watch: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', watchText: 'Watch: Security Principles',
            read: 'https://csrc.nist.gov/glossary', readText: 'Read: NIST Glossary',
            lab: 'https://tryhackme.com/r/room/securityprinciples', labText: 'Lab: Security Principles',
            notes: '📝 Security Principles - Authentication, authorization, accounting'
        },
        { 
            watch: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', watchText: 'Watch: CIA Triad Deep Dive',
            read: 'https://www.sans.org/security-resources/', readText: 'Read: SANS Reading Room',
            lab: 'https://tryhackme.com/r/room/introtois', labText: 'Lab: Intro to Information Security',
            notes: '📝 CIA Triad - Confidentiality, Integrity, Availability'
        },
        { 
            watch: 'https://www.youtube.com/watch?v=sdpxddDzXfE', watchText: 'Watch: Threats & Vulnerabilities',
            read: 'https://owasp.org/www-project-top-ten/', readText: 'Read: OWASP Top 10',
            lab: 'https://tryhackme.com/r/room/vulnerabilities101', labText: 'Lab: Vulnerabilities 101',
            notes: '📝 Threats & Vulnerabilities - Risk assessment basics'
        },
        { 
            watch: 'https://www.youtube.com/watch?v=auW3bT7XJbM', watchText: 'Watch: Security Controls',
            read: 'https://www.iso.org/isoiec-27001-information-security.html', readText: 'Read: ISO 27001',
            lab: 'https://tryhackme.com/r/room/securityframeworks', labText: 'Lab: Security Frameworks',
            notes: '📝 Security Controls - Administrative, technical, physical controls'
        }
    ];
    
    // Week 2 (Days 6-10)
    weeks[1] = [
        { watch: 'https://www.youtube.com/watch?v=inWWhr5tnEA', watchText: 'Watch: Cybersecurity Review',
          read: 'https://www.cisa.gov/cybersecurity-basics', readText: 'Read: CISA Review',
          lab: 'https://tryhackme.com/r/room/introtocyber', labText: 'Lab: TryHackMe Review',
          notes: '📝 Review Week 1 concepts - Practice and reinforce' },
        { watch: 'https://www.youtube.com/watch?v=5k9e1xYp3HI', watchText: 'Watch: Security Principles Review',
          read: 'https://csrc.nist.gov/glossary', readText: 'Read: NIST Glossary Review',
          lab: 'https://tryhackme.com/r/room/securityprinciples', labText: 'Lab: Security Principles Lab',
          notes: '📝 Review security principles and apply to scenarios' },
        { watch: 'https://www.youtube.com/watch?v=z5nc9MDbvkw', watchText: 'Watch: CIA Triad Examples',
          read: 'https://www.sans.org/security-resources/', readText: 'Read: SANS Articles',
          lab: 'https://tryhackme.com/r/room/introtois', labText: 'Lab: InfoSec Lab',
          notes: '📝 Real-world CIA triad examples' },
        { watch: 'https://www.youtube.com/watch?v=sdpxddDzXfE', watchText: 'Watch: Vulnerability Assessment',
          read: 'https://owasp.org/www-project-top-ten/', readText: 'Read: OWASP Deep Dive',
          lab: 'https://tryhackme.com/r/room/vulnerabilities101', labText: 'Lab: Vulnerabilities Lab',
          notes: '📝 How to identify and assess vulnerabilities' },
        { watch: 'https://www.youtube.com/watch?v=auW3bT7XJbM', watchText: 'Watch: Security Controls Review',
          read: 'https://www.iso.org/isoiec-27001-information-security.html', readText: 'Read: ISO 27001 Controls',
          lab: 'https://tryhackme.com/r/room/securityframeworks', labText: 'Lab: Frameworks Lab',
          notes: '📝 Mapping controls to business requirements' }
    ];
    
    // Week 3 (Days 11-15) - Repeat Week 1
    weeks[2] = weeks[0].map(day => ({
        ...day,
        notes: `📝 ${day.notes.split(' - ')[0]} - Practice and reinforce`
    }));
    
    // Week 4 (Days 16-20) - Repeat Week 2
    weeks[3] = weeks[1].map(day => ({
        ...day,
        notes: `📝 ${day.notes.split(' - ')[0]} - Apply to real scenarios`
    }));
    
    return weeks;
}

// Build Phase 0
CURRICULUM[0] = buildPhase0();

// Build Phases 1-9 with placeholder data (includes ALL sections)
for (let phase = 1; phase < 10; phase++) {
    CURRICULUM[phase] = [];
    for (let week = 0; week < 4; week++) {
        CURRICULUM[phase][week] = [];
        for (let day = 0; day < 5; day++) {
            CURRICULUM[phase][week][day] = {
                watch: { url: 'https://www.youtube.com/watch?v=qrRqN2HZw98', text: 'Watch: Advanced Security Concepts' },
                read: { url: 'https://www.securityweek.com/', text: 'Read: Security Week Articles' },
                lab: { url: 'https://tryhackme.com/r/room/securityoperations', text: 'Lab: Security Operations' },
                notes: '📝 Continue building your cybersecurity knowledge'
            };
        }
    }
}

console.log('Curriculum built successfully. Phases:', Object.keys(CURRICULUM).length);
