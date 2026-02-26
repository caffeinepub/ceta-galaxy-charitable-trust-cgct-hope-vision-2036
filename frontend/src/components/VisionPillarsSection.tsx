import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { BookOpen, Users, Cpu, Heart } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Academic Excellence',
    titleMl: 'അക്കാദമിക് മികവ്',
    color: 'bg-maroon-700',
    items: [
      'Curriculum aligned with NEP 2020',
      'STEM & Arts integration',
      'Critical thinking focus',
      'Multilingual education',
    ],
  },
  {
    icon: Heart,
    title: 'Holistic Development',
    titleMl: 'സമഗ്ര വികസനം',
    color: 'bg-sage-600',
    items: [
      'Character formation programs',
      'Sports & physical wellness',
      'Arts & cultural education',
      'Mental health support',
    ],
  },
  {
    icon: Cpu,
    title: 'Digital Transformation',
    titleMl: 'ഡിജിറ്റൽ പരിവർത്തനം',
    color: 'bg-gold-600',
    items: [
      'Smart classrooms in all schools',
      'AI & coding curriculum',
      'Digital literacy for all',
      'Online learning platforms',
    ],
  },
  {
    icon: Users,
    title: 'Community Engagement',
    titleMl: 'സമൂഹ ഇടപഴകൽ',
    color: 'bg-maroon-900',
    items: [
      'Alumni mentorship network',
      'Parent partnership programs',
      'Church-school integration',
      'Social outreach initiatives',
    ],
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const { language } = useLanguage();
  const Icon = pillar.icon;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`${pillar.color} p-6 text-white`}>
        <Icon size={32} className="mb-3" />
        <h3 className="text-xl font-bold">
          {language === 'en' ? pillar.title : pillar.titleMl}
        </h3>
      </div>
      <div className="p-6">
        <ul className="space-y-2">
          {pillar.items.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function VisionPillarsSection() {
  const { t } = useLanguage();
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);

  return (
    <section id="vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
            {t('vision.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('vision.subtitle')}</p>
          <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
