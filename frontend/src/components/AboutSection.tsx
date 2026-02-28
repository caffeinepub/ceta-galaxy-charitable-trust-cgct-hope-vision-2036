import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LeafMotif from './LeafMotif';
import { Globe, Users, Target, TrendingUp } from 'lucide-react';

const timelineItems = [
  { year: '2011', keyTitle: 'about.timeline.2010', keyDesc: 'about.timeline.2010.desc', icon: Globe, color: '#6B1A1A' },
  { year: '2016', keyTitle: 'about.timeline.2016', keyDesc: 'about.timeline.2016.desc', icon: Target, color: '#8FAF7E' },
  { year: '2017', keyTitle: 'about.timeline.2017', keyDesc: 'about.timeline.2017.desc', icon: Users, color: '#C9A84C' },
  { year: '2026', keyTitle: 'about.timeline.2026', keyDesc: 'about.timeline.2026.desc', icon: TrendingUp, color: '#6B1A1A' },
];

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      <LeafMotif count={3} opacity={0.06} color="#8FAF7E" />

      {/* Leaf motif background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/leaf-motif-bg.dim_1920x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(107,26,26,0.1)', color: 'var(--maroon)' }}>
            Our Story
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}>
            {t('about.title')}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <p className="text-lg font-semibold" style={{ color: 'var(--gold)' }}>{t('about.subtitle')}</p>
        </div>

        {/* Content Grid */}
        <div className={`grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="lg:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-gray-700">{t('about.p1')}</p>
            <p className="text-base leading-relaxed text-gray-700">{t('about.p2')}</p>
            <p className="text-base leading-relaxed text-gray-700">{t('about.p3')}</p>
          </div>

          {/* Chairman Card */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-full rounded-2xl p-6 text-center shadow-maroon card-hover"
              style={{ background: 'linear-gradient(135deg, var(--maroon-dark), var(--maroon))', color: 'white' }}
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black" style={{ backgroundColor: 'rgba(201,168,76,0.2)', border: '3px solid var(--gold)' }}>
                S
              </div>
              <h3 className="text-xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif', color: 'var(--gold)' }}>
                {t('about.chairman.name')}
              </h3>
              <p className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/70">
                {t('about.chairman')}
              </p>
              <div className="h-px mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />
              <p className="text-sm italic text-white/80 leading-relaxed">
                {t('about.chairman.quote')}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-black text-center mb-10" style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}>
            {t('about.timeline.title')}
          </h3>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Connector line */}
            <div className="absolute top-8 left-0 right-0 h-1 timeline-connector rounded-full" style={{ margin: '0 8%' }} />

            <div className="grid grid-cols-4 gap-4 relative">
              {timelineItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    {/* Circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 shadow-lg"
                      style={{ backgroundColor: item.color, border: '4px solid white' }}
                    >
                      <Icon size={24} color="white" />
                    </div>
                    {/* Year */}
                    <div className="text-2xl font-black mb-2" style={{ color: item.color, fontFamily: 'Merriweather, serif' }}>
                      {item.year}
                    </div>
                    {/* Title */}
                    <div className="text-sm font-bold mb-2" style={{ color: 'var(--maroon)' }}>
                      {t(item.keyTitle)}
                    </div>
                    {/* Description */}
                    <div className="text-xs text-gray-600 leading-relaxed">
                      {t(item.keyDesc)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={20} color="white" />
                    </div>
                    {i < timelineItems.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: 'var(--gold)', minHeight: '40px' }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="text-xl font-black" style={{ color: item.color, fontFamily: 'Merriweather, serif' }}>
                      {item.year}
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: 'var(--maroon)' }}>
                      {t(item.keyTitle)}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {t(item.keyDesc)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
