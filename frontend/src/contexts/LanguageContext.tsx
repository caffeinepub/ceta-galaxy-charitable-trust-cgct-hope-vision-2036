import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.about': { en: 'About', ml: 'ഞങ്ങളെക്കുറിച്ച്' },
  'nav.vision': { en: 'Vision', ml: 'ദർശനം' },
  'nav.reunion': { en: 'Reunion', ml: 'പുനഃസമ്മേളനം' },
  'nav.survey': { en: 'Survey', ml: 'സർവേ' },
  'nav.contact': { en: 'Contact', ml: 'ബന്ധപ്പെടുക' },
  'nav.title': { en: 'CGCT HOPE Vision 2036', ml: 'CGCT HOPE ദർശനം 2036' },

  // Hero
  'hero.tagline': { en: 'Shaping the Future of Christian Education', ml: 'ക്രിസ്ത്യൻ വിദ്യാഭ്യാസത്തിന്റെ ഭാവി രൂപപ്പെടുത്തുന്നു' },
  'hero.subtitle': { en: 'A strategic initiative to transform CGCT schools into centers of excellence for the next decade', ml: 'അടുത്ത ദശകത്തിൽ CGCT സ്കൂളുകളെ മികവിന്റെ കേന്ദ്രങ്ങളാക്കി മാറ്റാനുള്ള തന്ത്രപ്രധാനമായ സംരംഭം' },
  'hero.cta.survey': { en: 'Take the Survey', ml: 'സർവേ എടുക്കുക' },
  'hero.cta.learn': { en: 'Learn More', ml: 'കൂടുതൽ അറിയുക' },
  'hero.stats.schools': { en: 'Schools', ml: 'സ്കൂളുകൾ' },
  'hero.stats.students': { en: 'Students', ml: 'വിദ്യാർത്ഥികൾ' },
  'hero.stats.teachers': { en: 'Teachers', ml: 'അദ്ധ്യാപകർ' },
  'hero.stats.years': { en: 'Years of Excellence', ml: 'മികവിന്റെ വർഷങ്ങൾ' },
  'hero.countdown.title': { en: 'HOPE Alumni Reunion 2026', ml: 'HOPE പൂർവ്വ വിദ്യാർത്ഥി പുനഃസമ്മേളനം 2026' },
  'hero.countdown.days': { en: 'Days', ml: 'ദിവസങ്ങൾ' },
  'hero.countdown.hours': { en: 'Hours', ml: 'മണിക്കൂർ' },
  'hero.countdown.minutes': { en: 'Minutes', ml: 'മിനിറ്റ്' },
  'hero.countdown.seconds': { en: 'Seconds', ml: 'സെക്കൻഡ്' },

  // About
  'about.title': { en: 'About CGCT', ml: 'CGCT യെക്കുറിച്ച്' },
  'about.subtitle': { en: 'A Legacy of Christian Education', ml: 'ക്രിസ്ത്യൻ വിദ്യാഭ്യാസത്തിന്റെ പൈതൃകം' },
  'about.p1': { en: 'The Church of God in Christ Thomas (CGCT) has been a cornerstone of Christian education in Kerala for over a century. Our network of schools has shaped generations of students with values-based education that combines academic excellence with spiritual formation.', ml: 'Church of God in Christ Thomas (CGCT) ഒരു നൂറ്റാണ്ടിലേറെയായി കേരളത്തിലെ ക്രിസ്ത്യൻ വിദ്യാഭ്യാസത്തിന്റെ ആണിക്കല്ലാണ്. ഞങ്ങളുടെ സ്കൂൾ ശൃംഖല അക്കാദമിക് മികവും ആത്മീയ രൂപീകരണവും സംയോജിപ്പിക്കുന്ന മൂല്യ-അധിഷ്ഠിത വിദ്യാഭ്യാസം കൊണ്ട് തലമുറകളെ രൂപപ്പെടുത്തിയിട്ടുണ്ട്.' },
  'about.p2': { en: 'The HOPE (Holistic and Outstanding Pursuit of Excellence) initiative represents our commitment to reimagining education for the 21st century. Through Vision 2036, we are charting a course that honors our heritage while embracing innovation, technology, and global best practices.', ml: 'HOPE (Holistic and Outstanding Pursuit of Excellence) സംരംഭം 21-ാം നൂറ്റാണ്ടിനായി വിദ്യാഭ്യാസം പുനഃസങ്കൽപ്പിക്കാനുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധതയെ പ്രതിനിധീകരിക്കുന്നു. Vision 2036 ലൂടെ, ഞങ്ങൾ ഞങ്ങളുടെ പൈതൃകത്തെ ആദരിക്കുന്നതോടൊപ്പം നവീകരണം, സാങ്കേതികവിദ്യ, ആഗോള മികച്ച രീതികൾ എന്നിവ സ്വീകരിക്കുന്ന ഒരു പാത ചാർട്ട് ചെയ്യുകയാണ്.' },
  'about.chairman.title': { en: 'Chairman, CGCT Education Board', ml: 'ചെയർമാൻ, CGCT വിദ്യാഭ്യാസ ബോർഡ്' },
  'about.chairman.quote': { en: '"Our vision is not merely to educate minds, but to transform lives. HOPE Vision 2036 is our covenant with the next generation — to provide them with education that is excellent, holistic, and deeply rooted in Christian values."', ml: '"ഞങ്ങളുടെ ദർശനം കേവലം മനസ്സുകളെ വിദ്യാഭ്യാസം ചെയ്യുക മാത്രമല്ല, ജീവിതങ്ങളെ പരിവർത്തനം ചെയ്യുക കൂടിയാണ്. HOPE Vision 2036 അടുത്ത തലമുറയുമായുള്ള ഞങ്ങളുടെ ഉടമ്പടിയാണ് — മികച്ചതും സമഗ്രവും ക്രിസ്ത്യൻ മൂല്യങ്ങളിൽ ആഴത്തിൽ വേരൂന്നിയതുമായ വിദ്യാഭ്യാസം അവർക്ക് നൽകാൻ."' },

  // Vision Pillars
  'vision.title': { en: 'Vision 2036 Strategic Pillars', ml: 'Vision 2036 തന്ത്രപ്രധാന സ്തംഭങ്ങൾ' },
  'vision.subtitle': { en: 'Four transformative pillars guiding our journey to excellence', ml: 'മികവിലേക്കുള്ള ഞങ്ങളുടെ യാത്ര നയിക്കുന്ന നാല് പരിവർത്തനകരമായ സ്തംഭങ്ങൾ' },

  // Reunion
  'reunion.title': { en: 'HOPE Alumni Reunion 2026', ml: 'HOPE പൂർവ്വ വിദ്യാർത്ഥി പുനഃസമ്മേളനം 2026' },
  'reunion.subtitle': { en: 'Reconnecting generations, reimagining the future', ml: 'തലമുറകളെ പുനഃബന്ധിപ്പിക്കുക, ഭാവി പുനഃസങ്കൽപ്പിക്കുക' },
  'reunion.date': { en: 'April 12, 2026', ml: 'ഏപ്രിൽ 12, 2026' },
  'reunion.time': { en: '9:00 AM onwards', ml: 'രാവിലെ 9:00 മുതൽ' },
  'reunion.venue': { en: 'CGCT Central School Campus', ml: 'CGCT സെൻട്രൽ സ്കൂൾ കാമ്പസ്' },

  // Survey
  'survey.title': { en: 'Shape the Future — Take Our Survey', ml: 'ഭാവി രൂപപ്പെടുത്തുക — ഞങ്ങളുടെ സർവേ എടുക്കുക' },
  'survey.subtitle': { en: 'Your insights will directly inform the CGCT HOPE Vision 2036 strategic plan', ml: 'നിങ്ങളുടെ ഉൾക്കാഴ്ചകൾ CGCT HOPE Vision 2036 തന്ത്രപ്രധാന പദ്ധതിയെ നേരിട്ട് അറിയിക്കും' },
  'survey.english': { en: 'Take Survey in English', ml: 'ഇംഗ്ലീഷിൽ സർവേ എടുക്കുക' },
  'survey.malayalam': { en: 'സർവേ മലയാളത്തിൽ എടുക്കുക', ml: 'സർവേ മലയാളത്തിൽ എടുക്കുക' },
  'survey.confidential': { en: 'Your responses are confidential and will be used only for planning purposes', ml: 'നിങ്ങളുടെ പ്രതികരണങ്ങൾ രഹസ്യാത്മകമാണ്, ആസൂത്രണ ആവശ്യങ്ങൾക്ക് മാത്രം ഉപയോഗിക്കും' },

  // Footer
  'footer.subscribe': { en: 'Subscribe to Updates', ml: 'അപ്ഡേറ്റുകൾ സബ്സ്ക്രൈബ് ചെയ്യുക' },
  'footer.email.placeholder': { en: 'Enter your email', ml: 'നിങ്ങളുടെ ഇമെയിൽ നൽകുക' },
  'footer.subscribe.btn': { en: 'Subscribe', ml: 'സബ്സ്ക്രൈബ് ചെയ്യുക' },
  'footer.rights': { en: 'All rights reserved', ml: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
