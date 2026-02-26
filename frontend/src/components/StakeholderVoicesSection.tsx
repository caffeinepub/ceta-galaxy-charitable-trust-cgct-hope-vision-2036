import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Award, Lightbulb, Users, Briefcase, Newspaper, Database } from 'lucide-react';

const insights = [
  { titleKey: 'stakeholder.item1.title', descKey: 'stakeholder.item1.desc', icon: Award, color: '#6B1A1A' },
  { titleKey: 'stakeholder.item2.title', descKey: 'stakeholder.item2.desc', icon: Lightbulb, color: '#C9A84C' },
  { titleKey: 'stakeholder.item3.title', descKey: 'stakeholder.item3.desc', icon: Users, color: '#6A8F5A' },
  { titleKey: 'stakeholder.item4.title', descKey: 'stakeholder.item4.desc', icon: Briefcase, color: '#6B1A1A' },
  { titleKey: 'stakeholder.item5.title', descKey: 'stakeholder.item5.desc', icon: Newspaper, color: '#C9A84C' },
  { titleKey: 'stakeholder.item6.title', descKey: 'stakeholder.item6.desc', icon: Database, color: '#6A8F5A' },
];

const StakeholderVoicesSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Background leaf motif */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/leaf-motif-bg.dim_1920x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ backgroundColor: 'rgba(107,26,26,0.1)', color: 'var(--maroon)' }}
          >
            February 2026 Meetings
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}
          >
            {t('stakeholder.title')}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('stakeholder.subtitle')}</p>
        </div>

        {/* Insights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`card-hover rounded-2xl p-6 shadow-card bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  borderLeft: `4px solid ${item.color}`,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <h3
                  className="text-base font-black mb-3"
                  style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}
                >
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(item.descKey)}</p>
              </div>
            );
          })}
        </div>

        {/* Meeting badges */}
        <div className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: 'rgba(107,26,26,0.08)', color: 'var(--maroon)', border: '1px solid rgba(107,26,26,0.2)' }}
          >
            📹 Virtual Meeting 1 — 7 February 2026
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#7A6020', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            📹 Virtual Meeting 2 — 25 February 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default StakeholderVoicesSection;
