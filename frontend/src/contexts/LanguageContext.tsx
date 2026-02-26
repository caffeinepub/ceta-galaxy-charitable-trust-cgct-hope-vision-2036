import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.vision': 'Vision 2036',
    'nav.reunion': 'Reunion',
    'nav.survey': 'Survey',
    'nav.contact': 'Contact',
    'nav.title': 'CETA Galaxy Charitable Trust',
    'nav.subtitle': 'HOPE Vision 2036',
    'nav.lang': 'മലയാളം',

    // Hero
    'hero.headline': 'HOPE Vision 2036',
    'hero.headline2': 'Shaping the Next 10 Years Together',
    'hero.subheading': 'CGCT completes 15 impactful years. Now we build the next decade of empowerment.',
    'hero.counter1.label': 'Years of Impact',
    'hero.counter1.value': '15',
    'hero.counter2.label': 'Students per Year',
    'hero.counter2.value': '120',
    'hero.counter3.label': 'Programs',
    'hero.counter3.sub': 'HOPE | HOPE Plus | HOPE CARES | Skill Dev',
    'hero.counter3.value': '4',
    'hero.counter4.label': 'Alumni Reunion',
    'hero.counter4.value': '12 April 2026',
    'hero.countdown.title': 'Countdown to Alumni Reunion',
    'hero.countdown.days': 'Days',
    'hero.countdown.hours': 'Hours',
    'hero.countdown.minutes': 'Minutes',
    'hero.countdown.seconds': 'Seconds',
    'hero.btn.register': 'Register for Alumni Reunion',
    'hero.btn.survey': 'Participate in Vision 2036 Survey',

    // About
    'about.title': 'About CGCT',
    'about.subtitle': '15 Years of Structured Empowerment',
    'about.p1': 'CETA Galaxy Charitable Trust (CGCT) was born from the CETAA Global Meet in Dubai in 2010, bringing together alumni of the College of Engineering Trivandrum with a shared vision of giving back to society.',
    'about.p2': 'Over 15 years, CGCT has built a structured empowerment ecosystem through the HOPE program — Helping Outstanding Pupils in Education — providing scholarships, mentorship, and career guidance to deserving students.',
    'about.p3': 'As we enter our 16th year, CGCT is transitioning from a Zero Overhead to a Minimum Overhead model, shifting focus to Quality of Output with the goal of 100% beneficiaries achieving their career and life goals.',
    'about.timeline.title': 'Our Journey',
    'about.timeline.2010': 'HOPE Launch',
    'about.timeline.2010.desc': 'Born from CETAA Global Meet, Dubai. HOPE program launched to support outstanding students.',
    'about.timeline.2015': 'HOPE Plus',
    'about.timeline.2015.desc': 'Expanded program with mentorship, career guidance, and alumni volunteer network.',
    'about.timeline.2020': 'HOPE CARES',
    'about.timeline.2020.desc': 'Launched HOPE CARES and Skill Development initiatives for holistic empowerment.',
    'about.timeline.2026': 'Vision 2036',
    'about.timeline.2026.desc': 'Strategic transformation — Vision 2036 launched for the next decade of impact.',
    'about.chairman': 'Chairman',
    'about.chairman.name': 'Satheesh',
    'about.chairman.quote': '"Together, we have built 15 years of hope. Together, we will shape the next decade of transformation."',

    // Vision Pillars
    'vision.title': 'Vision 2036 Strategic Pillars',
    'vision.subtitle': 'Four pillars guiding our next decade of impact',
    'vision.pillar1.title': 'Quality of Output',
    'vision.pillar1.item1': 'Career tracking for all beneficiaries',
    'vision.pillar1.item2': 'Alumni ecosystem development',
    'vision.pillar1.item3': 'Research publication using 15-year dataset',
    'vision.pillar2.title': 'Organizational Restructuring',
    'vision.pillar2.item1': 'HOPE Secretariat establishment',
    'vision.pillar2.item2': 'Dedicated Program Coordinators',
    'vision.pillar2.item3': 'Student Dashboard & Mentor Portal',
    'vision.pillar2.item4': 'Donor Transparency Tracking',
    'vision.pillar3.title': 'Sustainability & Corpus Fund',
    'vision.pillar3.item1': 'CSR Partnerships',
    'vision.pillar3.item2': 'CETAA Global Chapters',
    'vision.pillar3.item3': 'Skill Development Centre (30% free, 70% revenue)',
    'vision.pillar4.title': 'Training & Empowerment',
    'vision.pillar4.item1': 'Communication & Leadership',
    'vision.pillar4.item2': 'AI Awareness & Digital Literacy',
    'vision.pillar4.item3': 'Mental Health Support',
    'vision.pillar4.item4': 'Parent Inclusion & Placement Cell',

    // Reunion
    'reunion.title': 'First HOPE Alumni Reunion 2026',
    'reunion.headline': 'Reconnect. Relive. Reignite.',
    'reunion.subheading': 'Join us for a memorable gathering celebrating friendship, shared journeys, and new beginnings as HOPE alumni come together once again.',
    'reunion.date': '12 April 2026',
    'reunion.venue': 'KILA, Thrissur',
    'reunion.time': '9:00 AM – 5:00 PM',
    'reunion.meetings': 'Two virtual preparatory meetings completed: 7 February 2026 & 25 February 2026',
    'reunion.participants.title': 'Who Should Attend?',
    'reunion.cat.a': 'Completed HOPE but not entered HOPE Plus',
    'reunion.cat.b': 'Completed HOPE Plus but inactive in HOPE events',
    'reunion.cat.c': 'Entered HOPE Plus but dropped midway',
    'reunion.cat.d': 'Completed HOPE Plus & active as HOPE Volunteer',
    'reunion.purpose.title': 'Purpose of the Reunion',
    'reunion.purpose.1': 'Career Status Review',
    'reunion.purpose.2': 'Problem Identification',
    'reunion.purpose.3': 'Career Rebuilding Support',
    'reunion.purpose.4': 'Competitive Exam Guidance',
    'reunion.purpose.5': 'Placement Support',
    'reunion.purpose.6': 'Advisory Committees by Profession',
    'reunion.purpose.7': 'Vision 2036 Survey Assessment',
    'reunion.purpose.8': 'Celebration Atmosphere',
    'reunion.btn.register': 'Register Now',
    'reunion.note': 'This is the FIRST HOPE ALUMNI REUNION — a celebration, not a camp!',

    // Survey
    'survey.title': 'CGCT Vision 2036 Survey',
    'survey.headline': 'Your Ideas. Your Voice. Your Vision.',
    'survey.subheading': 'Help shape the next decade of CGCT\'s impact. Your responses are completely confidential.',
    'survey.confidential': '🔒 All responses are strictly confidential',
    'survey.participate': 'All HOPE alumni are encouraged to participate and share their vision for 2036.',
    'survey.btn.english': 'English Survey',
    'survey.btn.malayalam': 'Malayalam Survey',
    'survey.qr.label': 'Scan QR for English Survey',
    'survey.qr.note': 'Or click the button above to take the survey online',

    // Stakeholder Voices
    'stakeholder.title': 'Stakeholder Voices – February 2026',
    'stakeholder.subtitle': 'Key outcomes from our virtual meetings',
    'stakeholder.item1.title': 'Scholarship Selection Reforms',
    'stakeholder.item1.desc': 'Proposed reforms to make scholarship selection more transparent, merit-based, and inclusive of diverse backgrounds.',
    'stakeholder.item2.title': 'Observation Year Proposal',
    'stakeholder.item2.desc': 'A new Observation Year framework proposed to help students transition smoothly into HOPE Plus activities.',
    'stakeholder.item3.title': 'Alumni-Led Committees',
    'stakeholder.item3.desc': 'Formation of profession-based advisory committees led by experienced HOPE alumni to guide current students.',
    'stakeholder.item4.title': 'Placement Cell Formation',
    'stakeholder.item4.desc': 'Dedicated placement cell to be established for HOPE Plus students, connecting them with industry opportunities.',
    'stakeholder.item5.title': 'Newsletter Launch',
    'stakeholder.item5.desc': 'Launch of a regular CGCT newsletter to keep alumni informed, engaged, and connected to the mission.',
    'stakeholder.item6.title': 'Alumni Database Update',
    'stakeholder.item6.desc': 'Comprehensive update of the alumni database to track career progress and enable targeted support.',

    // Digital Impact
    'digital.title': 'Digital Impact Initiatives',
    'digital.subtitle': 'Building a connected, empowered alumni ecosystem',
    'digital.item1.title': 'Newsletter Launch',
    'digital.item1.desc': 'A regular digital newsletter to keep all HOPE alumni informed about events, opportunities, and success stories.',
    'digital.item2.title': 'Alumni Brand Ambassadors',
    'digital.item2.desc': 'Empowering successful alumni to become brand ambassadors, inspiring the next generation of HOPE students.',
    'digital.item3.title': 'School Liaison Network',
    'digital.item3.desc': 'Building a network of school liaisons to identify and support outstanding students from underserved communities.',
    'digital.item4.title': 'WhatsApp & Email Strategy',
    'digital.item4.desc': 'Structured communication strategy using WhatsApp groups and email campaigns to keep alumni engaged and informed.',

    // Footer
    'footer.cta': 'Together, We Create HOPE.',
    'footer.cta2': 'Together, We Build Vision 2036.',
    'footer.btn.register': 'Register for Reunion',
    'footer.btn.survey': 'Take the Survey',
    'footer.btn.volunteer': 'Become a Volunteer',
    'footer.btn.support': 'Support a Student',
    'footer.contact.title': 'Contact Us',
    'footer.newsletter.title': 'Stay Connected',
    'footer.newsletter.placeholder': 'Enter your email address',
    'footer.newsletter.btn': 'Subscribe',
    'footer.newsletter.success': 'Thank you for subscribing!',
    'footer.newsletter.error': 'Subscription failed. Please try again.',
    'footer.copyright': '© {year} CETA Galaxy Charitable Trust. All rights reserved.',
    'footer.built': 'Built with',
    'footer.built2': 'using',
    'footer.social': 'Follow Us',
    'footer.links.title': 'Quick Links',
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.about': 'ഞങ്ങളെ കുറിച്ച്',
    'nav.vision': 'വിഷൻ 2036',
    'nav.reunion': 'റീയൂണിയൻ',
    'nav.survey': 'സർവേ',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.title': 'സേട്ട ഗാലക്സി ചാരിറ്റബിൾ ട്രസ്റ്റ്',
    'nav.subtitle': 'ഹോപ്പ് വിഷൻ 2036',
    'nav.lang': 'English',

    // Hero
    'hero.headline': 'ഹോപ്പ് വിഷൻ 2036',
    'hero.headline2': 'അടുത്ത 10 വർഷം ഒരുമിച്ച് രൂപപ്പെടുത്തുക',
    'hero.subheading': 'CGCT 15 ഫലപ്രദമായ വർഷങ്ങൾ പൂർത്തിയാക്കി. ഇനി നാം ശാക്തീകരണത്തിന്റെ അടുത്ത ദശകം കെട്ടിപ്പടുക്കുന്നു.',
    'hero.counter1.label': 'ആഘാതത്തിന്റെ വർഷങ്ങൾ',
    'hero.counter1.value': '15',
    'hero.counter2.label': 'വർഷം തോറും വിദ്യാർത്ഥികൾ',
    'hero.counter2.value': '120',
    'hero.counter3.label': 'പ്രോഗ്രാമുകൾ',
    'hero.counter3.sub': 'HOPE | HOPE Plus | HOPE CARES | Skill Dev',
    'hero.counter3.value': '4',
    'hero.counter4.label': 'അലുംനി റീയൂണിയൻ',
    'hero.counter4.value': '12 ഏപ്രിൽ 2026',
    'hero.countdown.title': 'അലുംനി റീയൂണിയനിലേക്കുള്ള കൗണ്ട്ഡൗൺ',
    'hero.countdown.days': 'ദിവസങ്ങൾ',
    'hero.countdown.hours': 'മണിക്കൂർ',
    'hero.countdown.minutes': 'മിനിറ്റ്',
    'hero.countdown.seconds': 'സെക്കൻഡ്',
    'hero.btn.register': 'അലുംനി റീയൂണിയനിൽ രജിസ്റ്റർ ചെയ്യുക',
    'hero.btn.survey': 'വിഷൻ 2036 സർവേയിൽ പങ്കെടുക്കുക',

    // About
    'about.title': 'CGCT-നെ കുറിച്ച്',
    'about.subtitle': '15 വർഷത്തെ ഘടനാപരമായ ശാക്തീകരണം',
    'about.p1': 'CETA Galaxy Charitable Trust (CGCT) 2010-ൽ ദുബായിൽ നടന്ന CETAA ഗ്ലോബൽ മീറ്റിൽ നിന്ന് ജനിച്ചു, തിരുവനന്തപുരം എഞ്ചിനീയറിംഗ് കോളേജ് അലുംനികൾ സമൂഹത്തിന് തിരിച്ചുനൽകാനുള്ള പൊതു ദർശനവുമായി ഒന്നിച്ചു.',
    'about.p2': '15 വർഷത്തിലൂടെ, CGCT HOPE പ്രോഗ്രാം വഴി ഒരു ഘടനാപരമായ ശാക്തീകരണ ആവാസവ്യവസ്ഥ കെട്ടിപ്പടുത്തു — Helping Outstanding Pupils in Education — അർഹരായ വിദ്യാർത്ഥികൾക്ക് സ്കോളർഷിപ്പ്, മെന്ററിംഗ്, കരിയർ മാർഗ്ഗദർശനം നൽകുന്നു.',
    'about.p3': '16-ാം വർഷത്തിലേക്ക് കടക്കുമ്പോൾ, CGCT Zero Overhead-ൽ നിന്ന് Minimum Overhead മോഡലിലേക്ക് മാറുകയാണ്, 100% ഗുണഭോക്താക്കൾ അവരുടെ കരിയർ, ജീവിത ലക്ഷ്യങ്ങൾ നേടുക എന്ന ലക്ഷ്യത്തോടെ ഔട്ട്പുട്ടിന്റെ ഗുണനിലവാരത്തിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു.',
    'about.timeline.title': 'ഞങ്ങളുടെ യാത്ര',
    'about.timeline.2010': 'HOPE ലോഞ്ച്',
    'about.timeline.2010.desc': 'CETAA ഗ്ലോബൽ മീറ്റ്, ദുബായ്. മികച്ച വിദ്യാർത്ഥികളെ പിന്തുണയ്ക്കാൻ HOPE പ്രോഗ്രാം ആരംഭിച്ചു.',
    'about.timeline.2015': 'HOPE Plus',
    'about.timeline.2015.desc': 'മെന്ററിംഗ്, കരിയർ മാർഗ്ഗദർശനം, അലുംനി വോളണ്ടിയർ നെറ്റ്‌വർക്ക് ഉൾക്കൊള്ളുന്ന വിപുലീകൃത പ്രോഗ്രാം.',
    'about.timeline.2020': 'HOPE CARES',
    'about.timeline.2020.desc': 'സമഗ്ര ശാക്തീകരണത്തിനായി HOPE CARES, Skill Development സംരംഭങ്ങൾ ആരംഭിച്ചു.',
    'about.timeline.2026': 'വിഷൻ 2036',
    'about.timeline.2026.desc': 'തന്ത്രപരമായ പരിവർത്തനം — അടുത്ത ദശകത്തിലെ ആഘാതത്തിനായി വിഷൻ 2036 ആരംഭിച്ചു.',
    'about.chairman': 'ചെയർമാൻ',
    'about.chairman.name': 'സതീഷ്',
    'about.chairman.quote': '"ഒരുമിച്ച്, നാം 15 വർഷത്തെ പ്രതീക്ഷ കെട്ടിപ്പടുത്തു. ഒരുമിച്ച്, നാം അടുത്ത ദശകത്തിലെ പരിവർത്തനം രൂപപ്പെടുത്തും."',

    // Vision Pillars
    'vision.title': 'വിഷൻ 2036 തന്ത്രപരമായ തൂണുകൾ',
    'vision.subtitle': 'ഞങ്ങളുടെ അടുത്ത ദശകത്തിലെ ആഘാതത്തെ നയിക്കുന്ന നാല് തൂണുകൾ',
    'vision.pillar1.title': 'ഔട്ട്പുട്ടിന്റെ ഗുണനിലവാരം',
    'vision.pillar1.item1': 'എല്ലാ ഗുണഭോക്താക്കൾക്കും കരിയർ ട്രാക്കിംഗ്',
    'vision.pillar1.item2': 'അലുംനി ആവാസവ്യവസ്ഥ വികസനം',
    'vision.pillar1.item3': '15 വർഷ ഡേറ്റ ഉപയോഗിച്ച് ഗവേഷണ പ്രസിദ്ധീകരണം',
    'vision.pillar2.title': 'സംഘടനാ പുനഃഘടന',
    'vision.pillar2.item1': 'HOPE സെക്രട്ടേറിയറ്റ് സ്ഥാപനം',
    'vision.pillar2.item2': 'സമർപ്പിത പ്രോഗ്രാം കോർഡിനേറ്റർമാർ',
    'vision.pillar2.item3': 'വിദ്യാർത്ഥി ഡാഷ്ബോർഡ് & മെന്റർ പോർട്ടൽ',
    'vision.pillar2.item4': 'ദാതൃ സുതാര്യത ട്രാക്കിംഗ്',
    'vision.pillar3.title': 'സ്ഥിരത & കോർപ്പസ് ഫണ്ട്',
    'vision.pillar3.item1': 'CSR പങ്കാളിത്തം',
    'vision.pillar3.item2': 'CETAA ഗ്ലോബൽ ചാപ്റ്ററുകൾ',
    'vision.pillar3.item3': 'Skill Development Centre (30% സൗജന്യം, 70% വരുമാനം)',
    'vision.pillar4.title': 'പരിശീലനം & ശാക്തീകരണം',
    'vision.pillar4.item1': 'ആശയവിനിമയം & നേതൃത്വം',
    'vision.pillar4.item2': 'AI അവബോധം & ഡിജിറ്റൽ സാക്ഷരത',
    'vision.pillar4.item3': 'മാനസിക ആരോഗ്യ പിന്തുണ',
    'vision.pillar4.item4': 'രക്ഷിതൃ ഉൾപ്പെടുത്തൽ & പ്ലേസ്മെന്റ് സെൽ',

    // Reunion
    'reunion.title': 'ആദ്യ HOPE അലുംനി റീയൂണിയൻ 2026',
    'reunion.headline': 'വീണ്ടും ബന്ധപ്പെടുക. വീണ്ടും ജീവിക്കുക. വീണ്ടും ജ്വലിക്കുക.',
    'reunion.subheading': 'HOPE അലുംനികൾ ഒരിക്കൽ കൂടി ഒന്നിക്കുന്ന, സൗഹൃദം, പൊതു യാത്രകൾ, പുതിയ തുടക്കങ്ങൾ ആഘോഷിക്കുന്ന ഒരു അവിസ്മരണീയ സമ്മേളനത്തിൽ ഞങ്ങളോടൊപ്പം ചേരൂ.',
    'reunion.date': '12 ഏപ്രിൽ 2026',
    'reunion.venue': 'KILA, തൃശ്ശൂർ',
    'reunion.time': 'രാവിലെ 9:00 – വൈകിട്ട് 5:00',
    'reunion.meetings': 'രണ്ട് വെർച്വൽ തയ്യാറെടുപ്പ് മീറ്റിംഗുകൾ പൂർത്തിയായി: 7 ഫെബ്രുവരി 2026 & 25 ഫെബ്രുവരി 2026',
    'reunion.participants.title': 'ആർ പങ്കെടുക്കണം?',
    'reunion.cat.a': 'HOPE പൂർത്തിയാക്കി HOPE Plus-ൽ ചേരാത്തവർ',
    'reunion.cat.b': 'HOPE Plus പൂർത്തിയാക്കി HOPE ഇവന്റുകളിൽ നിഷ്ക്രിയരായവർ',
    'reunion.cat.c': 'HOPE Plus-ൽ ചേർന്ന് ഇടയ്ക്ക് ഉപേക്ഷിച്ചവർ',
    'reunion.cat.d': 'HOPE Plus പൂർത്തിയാക്കി HOPE വോളണ്ടിയറായി സജീവരായവർ',
    'reunion.purpose.title': 'റീയൂണിയന്റെ ഉദ്ദേശ്യം',
    'reunion.purpose.1': 'കരിയർ സ്റ്റാറ്റസ് അവലോകനം',
    'reunion.purpose.2': 'പ്രശ്ന തിരിച്ചറിയൽ',
    'reunion.purpose.3': 'കരിയർ പുനർനിർമ്മാണ പിന്തുണ',
    'reunion.purpose.4': 'മത്സര പരീക്ഷ മാർഗ്ഗദർശനം',
    'reunion.purpose.5': 'പ്ലേസ്മെന്റ് പിന്തുണ',
    'reunion.purpose.6': 'തൊഴിൽ അടിസ്ഥാനത്തിലുള്ള ഉപദേശക സമിതികൾ',
    'reunion.purpose.7': 'വിഷൻ 2036 സർവേ വിലയിരുത്തൽ',
    'reunion.purpose.8': 'ആഘോഷ അന്തരീക്ഷം',
    'reunion.btn.register': 'ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക',
    'reunion.note': 'ഇത് ആദ്യ HOPE ALUMNI REUNION ആണ് — ഒരു ആഘോഷം, ക്യാമ്പ് അല്ല!',

    // Survey
    'survey.title': 'CGCT വിഷൻ 2036 സർവേ',
    'survey.headline': 'നിങ്ങളുടെ ആശയങ്ങൾ. നിങ്ങളുടെ ശബ്ദം. നിങ്ങളുടെ ദർശനം.',
    'survey.subheading': 'CGCT-യുടെ ആഘാതത്തിന്റെ അടുത്ത ദശകം രൂപപ്പെടുത്താൻ സഹായിക്കൂ. നിങ്ങളുടെ പ്രതികരണങ്ങൾ പൂർണ്ണമായും രഹസ്യമാണ്.',
    'survey.confidential': '🔒 എല്ലാ പ്രതികരണങ്ങളും കർശനമായി രഹസ്യമാണ്',
    'survey.participate': 'എല്ലാ HOPE അലുംനികളും 2036-ലേക്കുള്ള തങ്ങളുടെ ദർശനം പങ്കിടാൻ പ്രോത്സാഹിപ്പിക്കപ്പെടുന്നു.',
    'survey.btn.english': 'ഇംഗ്ലീഷ് സർവേ',
    'survey.btn.malayalam': 'മലയാളം സർവേ',
    'survey.qr.label': 'ഇംഗ്ലീഷ് സർവേക്ക് QR സ്കാൻ ചെയ്യുക',
    'survey.qr.note': 'അല്ലെങ്കിൽ ഓൺലൈൻ സർവേ എടുക്കാൻ മുകളിലെ ബട്ടൺ ക്ലിക്ക് ചെയ്യുക',

    // Stakeholder Voices
    'stakeholder.title': 'പങ്കാളി ശബ്ദങ്ങൾ – ഫെബ്രുവരി 2026',
    'stakeholder.subtitle': 'ഞങ്ങളുടെ വെർച്വൽ മീറ്റിംഗുകളിൽ നിന്നുള്ള പ്രധാന ഫലങ്ങൾ',
    'stakeholder.item1.title': 'സ്കോളർഷിപ്പ് തിരഞ്ഞെടുപ്പ് പരിഷ്കാരങ്ങൾ',
    'stakeholder.item1.desc': 'സ്കോളർഷിപ്പ് തിരഞ്ഞെടുപ്പ് കൂടുതൽ സുതാര്യവും, മെറിറ്റ് അടിസ്ഥാനത്തിലുള്ളതും, വൈവിധ്യമാർന്ന പശ്ചാത്തലങ്ങൾ ഉൾക്കൊള്ളുന്നതുമാക്കാൻ നിർദ്ദേശിക്കപ്പെട്ട പരിഷ്കാരങ്ങൾ.',
    'stakeholder.item2.title': 'ഒബ്സർവേഷൻ ഇയർ നിർദ്ദേശം',
    'stakeholder.item2.desc': 'HOPE Plus പ്രവർത്തനങ്ങളിലേക്ക് വിദ്യാർത്ഥികൾ സുഗമമായി മാറാൻ സഹായിക്കുന്ന ഒരു പുതിയ ഒബ്സർവേഷൻ ഇയർ ചട്ടക്കൂട് നിർദ്ദേശിക്കപ്പെട്ടു.',
    'stakeholder.item3.title': 'അലുംനി നേതൃത്വ സമിതികൾ',
    'stakeholder.item3.desc': 'നിലവിലെ വിദ്യാർത്ഥികളെ നയിക്കാൻ പരിചയസമ്പന്നരായ HOPE അലുംനികൾ നേതൃത്വം നൽകുന്ന തൊഴിൽ-അടിസ്ഥാനത്തിലുള്ള ഉപദേശക സമിതികളുടെ രൂപീകരണം.',
    'stakeholder.item4.title': 'പ്ലേസ്മെന്റ് സെൽ രൂപീകരണം',
    'stakeholder.item4.desc': 'HOPE Plus വിദ്യാർത്ഥികൾക്കായി ഒരു സമർപ്പിത പ്ലേസ്മെന്റ് സെൽ സ്ഥാപിക്കും, അവരെ വ്യവസായ അവസരങ്ങളുമായി ബന്ധിപ്പിക്കും.',
    'stakeholder.item5.title': 'ന്യൂസ്‌ലെറ്റർ ലോഞ്ച്',
    'stakeholder.item5.desc': 'അലുംനികളെ അറിയിക്കാനും, ഇടപഴകാനും, ദൗത്യവുമായി ബന്ധിപ്പിക്കാനും ഒരു പതിവ് CGCT ന്യൂസ്‌ലെറ്ററിന്റെ ലോഞ്ച്.',
    'stakeholder.item6.title': 'അലുംനി ഡേറ്റാബേസ് അപ്ഡേറ്റ്',
    'stakeholder.item6.desc': 'കരിയർ പുരോഗതി ട്രാക്ക് ചെയ്യാനും ലക്ഷ്യബോധമുള്ള പിന്തുണ നൽകാനും അലുംനി ഡേറ്റാബേസിന്റെ സമഗ്ര അപ്ഡേറ്റ്.',

    // Digital Impact
    'digital.title': 'ഡിജിറ്റൽ ആഘാത സംരംഭങ്ങൾ',
    'digital.subtitle': 'ബന്ധിതവും ശക്തിപ്പെടുത്തിയതുമായ ഒരു അലുംനി ആവാസവ്യവസ്ഥ കെട്ടിപ്പടുക്കൽ',
    'digital.item1.title': 'ന്യൂസ്‌ലെറ്റർ ലോഞ്ച്',
    'digital.item1.desc': 'ഇവന്റുകൾ, അവസരങ്ങൾ, വിജയ കഥകൾ എന്നിവയെ കുറിച്ച് എല്ലാ HOPE അലുംനികളെയും അറിയിക്കുന്ന ഒരു പതിവ് ഡിജിറ്റൽ ന്യൂസ്‌ലെറ്റർ.',
    'digital.item2.title': 'അലുംനി ബ്രാൻഡ് അംബാസഡർമാർ',
    'digital.item2.desc': 'HOPE വിദ്യാർത്ഥികളുടെ അടുത്ത തലമുറയ്ക്ക് പ്രചോദനം നൽകുന്ന ബ്രാൻഡ് അംബാസഡർമാരാകാൻ വിജയകരമായ അലുംനികളെ ശക്തിപ്പെടുത്തൽ.',
    'digital.item3.title': 'സ്കൂൾ ലൈസൺ നെറ്റ്‌വർക്ക്',
    'digital.item3.desc': 'സേവനം ലഭിക്കാത്ത സമൂഹങ്ങളിൽ നിന്ന് മികച്ച വിദ്യാർത്ഥികളെ കണ്ടെത്തി പിന്തുണയ്ക്കാൻ ഒരു സ്കൂൾ ലൈസൺ നെറ്റ്‌വർക്ക് കെട്ടിപ്പടുക്കൽ.',
    'digital.item4.title': 'WhatsApp & ഇമെയിൽ തന്ത്രം',
    'digital.item4.desc': 'അലുംനികളെ ഇടപഴകിക്കാനും അറിയിക്കാനും WhatsApp ഗ്രൂപ്പുകളും ഇമെയിൽ കാമ്പെയ്‌നുകളും ഉപയോഗിക്കുന്ന ഘടനാപരമായ ആശയവിനിമയ തന്ത്രം.',

    // Footer
    'footer.cta': 'ഒരുമിച്ച്, നാം HOPE സൃഷ്ടിക്കുന്നു.',
    'footer.cta2': 'ഒരുമിച്ച്, നാം വിഷൻ 2036 കെട്ടിപ്പടുക്കുന്നു.',
    'footer.btn.register': 'റീയൂണിയനിൽ രജിസ്റ്റർ ചെയ്യുക',
    'footer.btn.survey': 'സർവേ എടുക്കുക',
    'footer.btn.volunteer': 'വോളണ്ടിയർ ആകുക',
    'footer.btn.support': 'ഒരു വിദ്യാർത്ഥിയെ പിന്തുണയ്ക്കുക',
    'footer.contact.title': 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    'footer.newsletter.title': 'ബന്ധം നിലനിർത്തുക',
    'footer.newsletter.placeholder': 'നിങ്ങളുടെ ഇമെയിൽ വിലാസം നൽകുക',
    'footer.newsletter.btn': 'സബ്സ്ക്രൈബ് ചെയ്യുക',
    'footer.newsletter.success': 'സബ്സ്ക്രൈബ് ചെയ്തതിന് നന്ദി!',
    'footer.newsletter.error': 'സബ്സ്ക്രിപ്ഷൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
    'footer.copyright': '© {year} CETA Galaxy Charitable Trust. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    'footer.built': 'സ്നേഹത്തോടെ നിർമ്മിച്ചത്',
    'footer.built2': 'ഉപയോഗിച്ച്',
    'footer.social': 'ഞങ്ങളെ ഫോളോ ചെയ്യുക',
    'footer.links.title': 'ദ്രുത ലിങ്കുകൾ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = sessionStorage.getItem('cgct-language');
      return (stored === 'ml' || stored === 'en') ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ml' : 'en';
      try {
        sessionStorage.setItem('cgct-language', next);
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language === 'ml' ? 'ml' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
