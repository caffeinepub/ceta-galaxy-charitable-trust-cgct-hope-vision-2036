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
    'hero.headline': 'CGCT – Vision 2036',
    'hero.headline2': 'Empowering Excellence. Expanding Impact. Shaping the Next Decade of HOPE.',
    'hero.subheading': 'CGCT completes 15 impactful years. Now we build the next decade of empowerment.',
    'hero.counter1.label': 'Years of Impact',
    'hero.counter1.value': '15',
    'hero.counter2.label': 'New intakes per year',
    'hero.counter2.value': '120',
    'hero.counter3.label': 'Programs',
    'hero.counter3.sub': 'HOPE | HOPE Plus | HOPE CARES | Skill Development',
    'hero.counter3.value': '4',
    'hero.counter4.label': 'Alumni Reunion',
    'hero.counter4.value': '12 April 2026',
    'hero.counter5.label': 'students receiving HOPE scholarships every year',
    'hero.counter5.value': '700-800',
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
    'about.p1': 'CETA Galaxy Charitable Trust (CGCT) was born in 2011 as a byproduct of the CETA Global Meet 2010 held in Dubai, with a vision to bring together the experience and expertise of Engineers from CET for the betterment of our society.',
    'about.p2': 'HOPE – Helping Outstanding Pupils in Education – the flagship project of CGCT, was launched in 2011 with the vision of giving back to society.',
    'about.p3': 'Over 15 years, CGCT has built a structured and evolving ecosystem of academic, career, and personal empowerment initiatives. As we move on to the next decade, CGCT is reviewing its policies and programs with the intention of reaching out to the weaker sections of society at large, without compromising on the quality of output.',
    'about.timeline.title': 'Our Journey',
    'about.timeline.2010': 'HOPE Launched',
    'about.timeline.2010.desc': 'Born from CETA Global Meet 2010, Dubai. HOPE program launched in 2011 to support outstanding students.',
    'about.timeline.2016': 'HOPE CARES',
    'about.timeline.2016.desc': 'Launched HOPE CARES in 2016 for holistic empowerment and community care initiatives.',
    'about.timeline.2017': 'HOPE Plus',
    'about.timeline.2017.desc': 'HOPE Plus launched in 2017 with expanded mentorship, career guidance, and alumni volunteer network.',
    'about.timeline.2026': 'Vision 2036',
    'about.timeline.2026.desc': 'Strategic transformation — Vision 2036 launched for the next decade of impact.',
    'about.chairman': 'Chairman',
    'about.chairman.name': 'Satheesh Kumar V',
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
    'vision.pillar3.item2': 'Reaching out to CET alumni across the globe',
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
    'reunion.cat.c': 'Entered HOPE Plus but could not complete for various reasons',
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
    'stakeholder.item1.desc': 'Proposed reforms to make scholarship selection more empathetic, merit-based, and inclusive of diverse backgrounds.',
    'stakeholder.item2.title': 'Observation Year Proposal',
    'stakeholder.item2.desc': 'A new Observation Year framework proposed for HOPE selection (Grade 7 Reserve List model) to help students transition smoothly — this applies to HOPE, not HOPE Plus.',
    'stakeholder.item3.title': 'Alumni-Led Committees',
    'stakeholder.item3.desc': 'Formation of profession-based advisory committees led by experienced HOPE alumni to guide current students.',
    'stakeholder.item4.title': 'Placement Cell Formation',
    'stakeholder.item4.desc': 'Dedicated placement cell to be established for HOPE Plus students, connecting them with industry opportunities.',
    'stakeholder.item5.title': 'Newsletter Launch',
    'stakeholder.item5.desc': 'Launch of a regular CGCT newsletter to keep alumni informed, engaged, and connected to the mission.',
    'stakeholder.item6.title': 'Alumni Database Update',
    'stakeholder.item6.desc': 'Comprehensive update of the alumni database to track career progress and enable targeted support.',

    // Planning Meeting
    'stakeholder.planning.title': 'HOPE Alumni Reunion 2026 – Planning Meeting (25 February 2026)',
    'stakeholder.planning.subtitle': 'Key decisions and progress from the second preparatory meeting',
    'stakeholder.planning.item1': 'KILA venue booked for 140 participants',
    'stakeholder.planning.item2': 'Registration form and official poster released',
    'stakeholder.planning.item3': '200+ alumni contacts collected across districts',
    'stakeholder.planning.item4': 'Publicity strengthening through reels, posters, direct outreach',
    'stakeholder.planning.item5': 'Formation of communication groups/broadcast channels',
    'stakeholder.planning.item6': 'Agenda and detailed schedule preparation',
    'stakeholder.planning.item7': 'Initial budget planning',
    'stakeholder.planning.item8': 'Official website and Instagram platform development',

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
    'footer.social': 'Follow Us',
    'footer.links.title': 'Quick Links',
    'footer.contact.title': 'Contact Us',
    'footer.newsletter.title': 'Stay Connected',
    'footer.newsletter.desc': 'Subscribe to receive updates on CGCT events, alumni news, and Vision 2036 progress.',
    'footer.newsletter.placeholder': 'Your email address',
    'footer.newsletter.btn': 'Subscribe',
    'footer.newsletter.success': 'Thank you for subscribing!',
    'footer.copyright': '© 2026 CETA Galaxy Charitable Trust. All rights reserved.',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Empowering Excellence. Expanding Impact.',
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.about': 'ഞങ്ങളെക്കുറിച്ച്',
    'nav.vision': 'വിഷൻ 2036',
    'nav.reunion': 'റീയൂണിയൻ',
    'nav.survey': 'സർവേ',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.title': 'സേട്ട ഗാലക്സി ചാരിറ്റബിൾ ട്രസ്റ്റ്',
    'nav.subtitle': 'HOPE വിഷൻ 2036',
    'nav.lang': 'English',

    // Hero
    'hero.headline': 'CGCT – വിഷൻ 2036',
    'hero.headline2': 'മികവ് ശക്തിപ്പെടുത്തുക. ആഘാതം വിപുലീകരിക്കുക. HOPE-ന്റെ അടുത്ത ദശകം രൂപപ്പെടുത്തുക.',
    'hero.subheading': 'CGCT 15 ഫലപ്രദമായ വർഷങ്ങൾ പൂർത്തിയാക്കുന്നു. ഇപ്പോൾ നാം ശാക്തീകരണത്തിന്റെ അടുത്ത ദശകം കെട്ടിപ്പടുക്കുന്നു.',
    'hero.counter1.label': 'ആഘാതത്തിന്റെ വർഷങ്ങൾ',
    'hero.counter1.value': '15',
    'hero.counter2.label': 'പ്രതിവർഷം പുതിയ പ്രവേശനങ്ങൾ',
    'hero.counter2.value': '120',
    'hero.counter3.label': 'പ്രോഗ്രാമുകൾ',
    'hero.counter3.sub': 'HOPE | HOPE Plus | HOPE CARES | സ്കിൽ ഡെവലപ്മെന്റ്',
    'hero.counter3.value': '4',
    'hero.counter4.label': 'അലുംനി റീയൂണിയൻ',
    'hero.counter4.value': '12 ഏപ്രിൽ 2026',
    'hero.counter5.label': 'പ്രതിവർഷം HOPE സ്കോളർഷിപ്പ് ലഭിക്കുന്ന വിദ്യാർത്ഥികൾ',
    'hero.counter5.value': '700-800',
    'hero.countdown.title': 'അലുംനി റീയൂണിയനിലേക്കുള്ള കൗണ്ട്ഡൗൺ',
    'hero.countdown.days': 'ദിവസങ്ങൾ',
    'hero.countdown.hours': 'മണിക്കൂറുകൾ',
    'hero.countdown.minutes': 'മിനിറ്റുകൾ',
    'hero.countdown.seconds': 'സെക്കൻഡുകൾ',
    'hero.btn.register': 'അലുംനി റീയൂണിയനിൽ രജിസ്റ്റർ ചെയ്യുക',
    'hero.btn.survey': 'വിഷൻ 2036 സർവേയിൽ പങ്കെടുക്കുക',

    // About
    'about.title': 'CGCT-യെക്കുറിച്ച്',
    'about.subtitle': '15 വർഷത്തെ ഘടനാപരമായ ശാക്തീകരണം',
    'about.p1': 'CETA ഗാലക്സി ചാരിറ്റബിൾ ട്രസ്റ്റ് (CGCT) 2011-ൽ ദുബായിൽ നടന്ന CETA ഗ്ലോബൽ മീറ്റ് 2010-ന്റെ ഉൽപ്പന്നമായി ജനിച്ചു.',
    'about.p2': 'HOPE – ഹെൽപ്പിംഗ് ഔട്ട്സ്റ്റാൻഡിംഗ് പ്യൂപ്പിൾസ് ഇൻ എഡ്യൂക്കേഷൻ – CGCT-യുടെ പ്രധാന പദ്ധതി, 2011-ൽ സമൂഹത്തിന് തിരിച്ചുനൽകുക എന്ന ദർശനത്തോടെ ആരംഭിച്ചു.',
    'about.p3': '15 വർഷങ്ങളിൽ, CGCT അക്കാദമിക്, കരിയർ, വ്യക്തിഗത ശാക്തീകരണ സംരംഭങ്ങളുടെ ഒരു ഘടനാപരമായ ആവാസവ്യവസ്ഥ കെട്ടിപ്പടുത്തു.',
    'about.timeline.title': 'ഞങ്ങളുടെ യാത്ര',
    'about.timeline.2010': 'HOPE ആരംഭിച്ചു',
    'about.timeline.2010.desc': 'CETA ഗ്ലോബൽ മീറ്റ് 2010, ദുബായിൽ നിന്ന് ജനിച്ചു. HOPE പ്രോഗ്രാം 2011-ൽ മികച്ച വിദ്യാർത്ഥികളെ പിന്തുണയ്ക്കാൻ ആരംഭിച്ചു.',
    'about.timeline.2016': 'HOPE CARES',
    'about.timeline.2016.desc': 'സമഗ്ര ശാക്തീകരണത്തിനും കമ്മ്യൂണിറ്റി കെയർ സംരംഭങ്ങൾക്കുമായി 2016-ൽ HOPE CARES ആരംഭിച്ചു.',
    'about.timeline.2017': 'HOPE Plus',
    'about.timeline.2017.desc': 'HOPE Plus 2017-ൽ വിപുലീകൃത മെന്റർഷിപ്പ്, കരിയർ ഗൈഡൻസ്, അലുംനി വോളണ്ടിയർ നെറ്റ്‌വർക്ക് എന്നിവയോടെ ആരംഭിച്ചു.',
    'about.timeline.2026': 'വിഷൻ 2036',
    'about.timeline.2026.desc': 'തന്ത്രപരമായ പരിവർത്തനം — ആഘാതത്തിന്റെ അടുത്ത ദശകത്തിനായി വിഷൻ 2036 ആരംഭിച്ചു.',
    'about.chairman': 'ചെയർമാൻ',
    'about.chairman.name': 'സതീഷ് കുമാർ വി',
    'about.chairman.quote': '"ഒരുമിച്ച്, നാം 15 വർഷത്തെ പ്രതീക്ഷ കെട്ടിപ്പടുത്തു. ഒരുമിച്ച്, നാം പരിവർത്തനത്തിന്റെ അടുത്ത ദശകം രൂപപ്പെടുത്തും."',

    // Vision Pillars
    'vision.title': 'വിഷൻ 2036 തന്ത്രപരമായ തൂണുകൾ',
    'vision.subtitle': 'ഞങ്ങളുടെ അടുത്ത ദശകത്തെ നയിക്കുന്ന നാല് തൂണുകൾ',
    'vision.pillar1.title': 'ഔട്ട്പുട്ടിന്റെ ഗുണനിലവാരം',
    'vision.pillar1.item1': 'എല്ലാ ഗുണഭോക്താക്കൾക്കും കരിയർ ട്രാക്കിംഗ്',
    'vision.pillar1.item2': 'അലുംനി ആവാസവ്യവസ്ഥ വികസനം',
    'vision.pillar1.item3': '15 വർഷത്തെ ഡേറ്റാസെറ്റ് ഉപയോഗിച്ച് ഗവേഷണ പ്രസിദ്ധീകരണം',
    'vision.pillar2.title': 'സംഘടനാ പുനഃഘടന',
    'vision.pillar2.item1': 'HOPE സെക്രട്ടേറിയറ്റ് സ്ഥാപനം',
    'vision.pillar2.item2': 'സമർപ്പിത പ്രോഗ്രാം കോർഡിനേറ്റർമാർ',
    'vision.pillar2.item3': 'സ്റ്റുഡന്റ് ഡാഷ്ബോർഡ് & മെന്റർ പോർട്ടൽ',
    'vision.pillar2.item4': 'ദാതാ സുതാര്യത ട്രാക്കിംഗ്',
    'vision.pillar3.title': 'സുസ്ഥിരത & കോർപ്പസ് ഫണ്ട്',
    'vision.pillar3.item1': 'CSR പങ്കാളിത്തം',
    'vision.pillar3.item2': 'ലോകമെമ്പാടുമുള്ള CET അലുംനിയിലേക്ക് എത്തിച്ചേരൽ',
    'vision.pillar3.item3': 'സ്കിൽ ഡെവലപ്മെന്റ് സെന്റർ (30% സൗജന്യം, 70% വരുമാനം)',
    'vision.pillar4.title': 'പരിശീലനം & ശാക്തീകരണം',
    'vision.pillar4.item1': 'ആശയവിനിമയം & നേതൃത്വം',
    'vision.pillar4.item2': 'AI അവബോധം & ഡിജിറ്റൽ സാക്ഷരത',
    'vision.pillar4.item3': 'മാനസിക ആരോഗ്യ പിന്തുണ',
    'vision.pillar4.item4': 'രക്ഷിതാക്കളുടെ ഉൾപ്പെടുത്തൽ & പ്ലേസ്മെന്റ് സെൽ',

    // Reunion
    'reunion.title': 'ആദ്യ HOPE അലുംനി റീയൂണിയൻ 2026',
    'reunion.headline': 'പുനഃസ്ഥാപിക്കുക. പുനരനുഭവിക്കുക. പുനർജ്വലിപ്പിക്കുക.',
    'reunion.subheading': 'HOPE അലുംനി ഒരുമിച്ചുകൂടുന്ന ഒരു അവിസ്മരണീയ സമ്മേളനത്തിൽ ഞങ്ങളോടൊപ്പം ചേരുക.',
    'reunion.date': '12 ഏപ്രിൽ 2026',
    'reunion.venue': 'KILA, തൃശ്ശൂർ',
    'reunion.time': 'രാവിലെ 9:00 – വൈകുന്നേരം 5:00',
    'reunion.meetings': 'രണ്ട് വെർച്വൽ തയ്യാറെടുപ്പ് മീറ്റിംഗുകൾ പൂർത്തിയായി: 7 ഫെബ്രുവരി 2026 & 25 ഫെബ്രുവരി 2026',
    'reunion.participants.title': 'ആർ പങ്കെടുക്കണം?',
    'reunion.cat.a': 'HOPE പൂർത്തിയാക്കി എന്നാൽ HOPE Plus-ൽ പ്രവേശിക്കാത്തവർ',
    'reunion.cat.b': 'HOPE Plus പൂർത്തിയാക്കി എന്നാൽ HOPE ഇവന്റുകളിൽ നിഷ്ക്രിയർ',
    'reunion.cat.c': 'HOPE Plus-ൽ പ്രവേശിച്ചു എന്നാൽ വിവിധ കാരണങ്ങളാൽ പൂർത്തിയാക്കാൻ കഴിഞ്ഞില്ല',
    'reunion.cat.d': 'HOPE Plus പൂർത്തിയാക്കി & HOPE വോളണ്ടിയറായി സജീവം',
    'reunion.purpose.title': 'റീയൂണിയന്റെ ഉദ്ദേശ്യം',
    'reunion.purpose.1': 'കരിയർ സ്റ്റാറ്റസ് അവലോകനം',
    'reunion.purpose.2': 'പ്രശ്ന തിരിച്ചറിയൽ',
    'reunion.purpose.3': 'കരിയർ പുനർനിർമ്മാണ പിന്തുണ',
    'reunion.purpose.4': 'മത്സര പരീക്ഷ മാർഗ്ഗനിർദ്ദേശം',
    'reunion.purpose.5': 'പ്ലേസ്മെന്റ് പിന്തുണ',
    'reunion.purpose.6': 'തൊഴിൽ അടിസ്ഥാനത്തിലുള്ള ഉപദേശക സമിതികൾ',
    'reunion.purpose.7': 'വിഷൻ 2036 സർവേ മൂല്യനിർണ്ണയം',
    'reunion.purpose.8': 'ആഘോഷ അന്തരീക്ഷം',
    'reunion.btn.register': 'ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക',
    'reunion.note': 'ഇത് ആദ്യ HOPE ALUMNI REUNION ആണ് — ഒരു ആഘോഷം, ക്യാമ്പ് അല്ല!',

    // Survey
    'survey.title': 'CGCT വിഷൻ 2036 സർവേ',
    'survey.headline': 'നിങ്ങളുടെ ആശയങ്ങൾ. നിങ്ങളുടെ ശബ്ദം. നിങ്ങളുടെ വിഷൻ.',
    'survey.subheading': 'CGCT-യുടെ ആഘാതത്തിന്റെ അടുത്ത ദശകം രൂപപ്പെടുത്താൻ സഹായിക്കുക. നിങ്ങളുടെ പ്രതികരണങ്ങൾ പൂർണ്ണമായും രഹസ്യമാണ്.',
    'survey.confidential': '🔒 എല്ലാ പ്രതികരണങ്ങളും കർശനമായി രഹസ്യമാണ്',
    'survey.participate': 'എല്ലാ HOPE അലുംനിയും 2036-നുള്ള തങ്ങളുടെ വിഷൻ പങ്കിടാൻ പ്രോത്സാഹിപ്പിക്കപ്പെടുന്നു.',
    'survey.btn.english': 'ഇംഗ്ലീഷ് സർവേ',
    'survey.btn.malayalam': 'മലയാളം സർവേ',
    'survey.qr.label': 'ഇംഗ്ലീഷ് സർവേക്കായി QR സ്കാൻ ചെയ്യുക',
    'survey.qr.note': 'അല്ലെങ്കിൽ ഓൺലൈൻ സർവേ എടുക്കാൻ മുകളിലുള്ള ബട്ടൺ ക്ലിക്ക് ചെയ്യുക',

    // Stakeholder Voices
    'stakeholder.title': 'പങ്കാളി ശബ്ദങ്ങൾ – ഫെബ്രുവരി 2026',
    'stakeholder.subtitle': 'ഞങ്ങളുടെ വെർച്വൽ മീറ്റിംഗുകളിൽ നിന്നുള്ള പ്രധാന ഫലങ്ങൾ',
    'stakeholder.item1.title': 'സ്കോളർഷിപ്പ് തിരഞ്ഞെടുപ്പ് പരിഷ്കാരങ്ങൾ',
    'stakeholder.item1.desc': 'സ്കോളർഷിപ്പ് തിരഞ്ഞെടുപ്പ് കൂടുതൽ സഹാനുഭൂതിയോടെ, മെറിറ്റ് അടിസ്ഥാനത്തിൽ, വൈവിധ്യമാർന്ന പശ്ചാത്തലങ്ങൾ ഉൾക്കൊള്ളുന്ന രീതിയിൽ ആക്കാൻ നിർദ്ദേശിക്കപ്പെട്ട പരിഷ്കാരങ്ങൾ.',
    'stakeholder.item2.title': 'നിരീക്ഷണ വർഷ നിർദ്ദേശം',
    'stakeholder.item2.desc': 'HOPE തിരഞ്ഞെടുപ്പിനായി ഒരു പുതിയ നിരീക്ഷണ വർഷ ചട്ടക്കൂട് നിർദ്ദേശിക്കപ്പെട്ടു.',
    'stakeholder.item3.title': 'അലുംനി നേതൃത്വ സമിതികൾ',
    'stakeholder.item3.desc': 'നിലവിലെ വിദ്യാർത്ഥികളെ നയിക്കാൻ പരിചയസമ്പന്നരായ HOPE അലുംനി നേതൃത്വം നൽകുന്ന തൊഴിൽ അടിസ്ഥാനത്തിലുള്ള ഉപദേശക സമിതികളുടെ രൂപീകരണം.',
    'stakeholder.item4.title': 'പ്ലേസ്മെന്റ് സെൽ രൂപീകരണം',
    'stakeholder.item4.desc': 'HOPE Plus വിദ്യാർത്ഥികൾക്കായി ഒരു സമർപ്പിത പ്ലേസ്മെന്റ് സെൽ സ്ഥാപിക്കും.',
    'stakeholder.item5.title': 'ന്യൂസ്‌ലെറ്റർ ലോഞ്ച്',
    'stakeholder.item5.desc': 'അലുംനിയെ അറിയിക്കാനും ഇടപഴകാനും ദൗത്യവുമായി ബന്ധിപ്പിക്കാനും ഒരു പതിവ് CGCT ന്യൂസ്‌ലെറ്ററിന്റെ ലോഞ്ച്.',
    'stakeholder.item6.title': 'അലുംനി ഡേറ്റാബേസ് അപ്ഡേറ്റ്',
    'stakeholder.item6.desc': 'കരിയർ പുരോഗതി ട്രാക്ക് ചെയ്യാനും ലക്ഷ്യബോധമുള്ള പിന്തുണ സാധ്യമാക്കാനും അലുംനി ഡേറ്റാബേസിന്റെ സമഗ്ര അപ്ഡേറ്റ്.',

    // Planning Meeting
    'stakeholder.planning.title': 'HOPE അലുംനി റീയൂണിയൻ 2026 – ആസൂത്രണ മീറ്റിംഗ് (25 ഫെബ്രുവരി 2026)',
    'stakeholder.planning.subtitle': 'രണ്ടാം തയ്യാറെടുപ്പ് മീറ്റിംഗിൽ നിന്നുള്ള പ്രധാന തീരുമാനങ്ങളും പുരോഗതിയും',
    'stakeholder.planning.item1': '140 പങ്കാളികൾക്കായി KILA വേദി ബുക്ക് ചെയ്തു',
    'stakeholder.planning.item2': 'രജിസ്ട്രേഷൻ ഫോമും ഔദ്യോഗിക പോസ്റ്ററും പ്രകാശിപ്പിച്ചു',
    'stakeholder.planning.item3': 'ജില്ലകളിലുടനീളം 200+ അലുംനി കോൺടാക്ടുകൾ ശേഖരിച്ചു',
    'stakeholder.planning.item4': 'റീലുകൾ, പോസ്റ്ററുകൾ, നേരിട്ടുള്ള ഔട്ട്‌റീച്ച് വഴി പ്രചാരണം ശക്തിപ്പെടുത്തൽ',
    'stakeholder.planning.item5': 'ആശയവിനിമയ ഗ്രൂപ്പുകൾ/ബ്രോഡ്കാസ്റ്റ് ചാനലുകൾ രൂപീകരണം',
    'stakeholder.planning.item6': 'അജണ്ടയും വിശദമായ ഷെഡ്യൂൾ തയ്യാറാക്കലും',
    'stakeholder.planning.item7': 'പ്രാഥമിക ബജറ്റ് ആസൂത്രണം',
    'stakeholder.planning.item8': 'ഔദ്യോഗിക വെബ്‌സൈറ്റും ഇൻസ്റ്റാഗ്രാം പ്ലാറ്റ്‌ഫോം വികസനവും',

    // Digital Impact
    'digital.title': 'ഡിജിറ്റൽ ഇംപാക്ട് സംരംഭങ്ങൾ',
    'digital.subtitle': 'ബന്ധിതവും ശക്തിപ്പെടുത്തിയതുമായ അലുംനി ആവാസവ്യവസ്ഥ കെട്ടിപ്പടുക്കൽ',
    'digital.item1.title': 'ന്യൂസ്‌ലെറ്റർ ലോഞ്ച്',
    'digital.item1.desc': 'ഇവന്റുകൾ, അവസരങ്ങൾ, വിജയഗാഥകൾ എന്നിവയെക്കുറിച്ച് എല്ലാ HOPE അലുംനിയെയും അറിയിക്കാൻ ഒരു പതിവ് ഡിജിറ്റൽ ന്യൂസ്‌ലെറ്റർ.',
    'digital.item2.title': 'അലുംനി ബ്രാൻഡ് അംബാസഡർമാർ',
    'digital.item2.desc': 'HOPE വിദ്യാർത്ഥികളുടെ അടുത്ത തലമുറയ്ക്ക് പ്രചോദനം നൽകാൻ വിജയകരമായ അലുംനിയെ ബ്രാൻഡ് അംബാസഡർമാരാക്കൽ.',
    'digital.item3.title': 'സ്കൂൾ ലൈസൺ നെറ്റ്‌വർക്ക്',
    'digital.item3.desc': 'സേവനം ലഭിക്കാത്ത കമ്മ്യൂണിറ്റികളിൽ നിന്ന് മികച്ച വിദ്യാർത്ഥികളെ തിരിച്ചറിഞ്ഞ് പിന്തുണയ്ക്കാൻ സ്കൂൾ ലൈസൺ നെറ്റ്‌വർക്ക് കെട്ടിപ്പടുക്കൽ.',
    'digital.item4.title': 'WhatsApp & ഇമെയിൽ തന്ത്രം',
    'digital.item4.desc': 'അലുംനിയെ ഇടപഴകിക്കാനും അറിയിക്കാനും WhatsApp ഗ്രൂപ്പുകളും ഇമെയിൽ കാമ്പെയ്‌നുകളും ഉപയോഗിക്കുന്ന ഘടനാപരമായ ആശയവിനിമയ തന്ത്രം.',

    // Footer
    'footer.cta': 'ഒരുമിച്ച്, നാം HOPE സൃഷ്ടിക്കുന്നു.',
    'footer.cta2': 'ഒരുമിച്ച്, നാം വിഷൻ 2036 കെട്ടിപ്പടുക്കുന്നു.',
    'footer.btn.register': 'റീയൂണിയനിൽ രജിസ്റ്റർ ചെയ്യുക',
    'footer.btn.survey': 'സർവേ എടുക്കുക',
    'footer.btn.volunteer': 'ഒരു വോളണ്ടിയർ ആകുക',
    'footer.btn.support': 'ഒരു വിദ്യാർത്ഥിയെ പിന്തുണയ്ക്കുക',
    'footer.social': 'ഞങ്ങളെ പിന്തുടരുക',
    'footer.links.title': 'ദ്രുത ലിങ്കുകൾ',
    'footer.contact.title': 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    'footer.newsletter.title': 'ബന്ധം നിലനിർത്തുക',
    'footer.newsletter.desc': 'CGCT ഇവന്റുകൾ, അലുംനി വാർത്തകൾ, വിഷൻ 2036 പുരോഗതി എന്നിവയെക്കുറിച്ചുള്ള അപ്‌ഡേറ്റുകൾ ലഭിക്കാൻ സബ്‌സ്‌ക്രൈബ് ചെയ്യുക.',
    'footer.newsletter.placeholder': 'നിങ്ങളുടെ ഇമെയിൽ വിലാസം',
    'footer.newsletter.btn': 'സബ്‌സ്‌ക്രൈബ് ചെയ്യുക',
    'footer.newsletter.success': 'സബ്‌സ്‌ക്രൈബ് ചെയ്തതിന് നന്ദി!',
    'footer.copyright': '© 2026 CETA ഗാലക്സി ചാരിറ്റബിൾ ട്രസ്റ്റ്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    'footer.rights': 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    'footer.tagline': 'മികവ് ശക്തിപ്പെടുത്തുക. ആഘാതം വിപുലീകരിക്കുക.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('cgct-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'ml')) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ml' : 'en';
      localStorage.setItem('cgct-language', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] ?? key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
