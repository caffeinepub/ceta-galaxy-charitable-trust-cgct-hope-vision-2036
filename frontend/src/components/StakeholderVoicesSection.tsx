import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Award, Lightbulb, Users, Briefcase, Newspaper, Database, CheckCircle2, CalendarCheck } from 'lucide-react';

const insights = [
  { titleKey: 'stakeholder.item1.title', descKey: 'stakeholder.item1.desc', icon: Award, color: '#6B1A1A' },
  { titleKey: 'stakeholder.item2.title', descKey: 'stakeholder.item2.desc', icon: Lightbulb, color: '#C9A84C' },
  { titleKey: 'stakeholder.item3.title', descKey: 'stakeholder.item3.desc', icon: Users, color: '#6A8F5A' },
  { titleKey: 'stakeholder.item4.title', descKey: 'stakeholder.item4.desc', icon: Briefcase, color: '#6B1A1A' },
  { titleKey: 'stakeholder.item5.title', descKey: 'stakeholder.item5.desc', icon: Newspaper, color: '#C9A84C' },
  { titleKey: 'stakeholder.item6.title', descKey: 'stakeholder.item6.desc', icon: Database, color: '#6A8F5A' },
];

const planningItems = [
  'stakeholder.planning.item1',
  'stakeholder.planning.item2',
  'stakeholder.planning.item3',
  'stakeholder.planning.item4',
  'stakeholder.planning.item5',
  'stakeholder.planning.item6',
  'stakeholder.planning.item7',
  'stakeholder.planning.item8',
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

        {/* Vision 2036 Planning Meeting Subsection */}
        <div className={`mt-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Subsection Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="p-3 rounded-xl flex-shrink-0"
              style={{ backgroundColor: 'rgba(107,26,26,0.1)' }}
            >
              <CalendarCheck size={28} style={{ color: 'var(--maroon)' }} />
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl font-black leading-tight"
                style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}
              >
                {t('stakeholder.planning.title')}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{t('stakeholder.planning.subtitle')}</p>
            </div>
          </div>

          {/* Planning items grid */}
          <div
            className="rounded-2xl p-6 lg:p-8 shadow-card bg-white"
            style={{ borderTop: '4px solid var(--maroon)' }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {planningItems.map((itemKey, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: i % 2 === 0 ? 'rgba(107,26,26,0.04)' : 'rgba(201,168,76,0.06)' }}
                >
                  <CheckCircle2
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: i % 2 === 0 ? 'var(--maroon)' : '#C9A84C' }}
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">{t(itemKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting badges — placed below the bullet points */}
          <div className="mt-6 flex flex-wrap gap-4">
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
            <div
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'rgba(106,143,90,0.1)', color: '#3A6030', border: '1px solid rgba(106,143,90,0.3)' }}
            >
              📹 Virtual Meeting 3 — 4 March 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StakeholderVoicesSection;
