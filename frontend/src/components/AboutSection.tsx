import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LeafMotif from './LeafMotif';

const timelineEvents = [
  { year: '2010', event: 'CGCT Education Board restructured for modern governance' },
  { year: '2014', event: 'Digital literacy programs introduced across all schools' },
  { year: '2018', event: 'HOPE initiative conceptualized by visionary leadership' },
  { year: '2022', event: 'Stakeholder consultations begin for Vision 2036' },
  { year: '2024', event: 'HOPE Alumni Network formally established' },
  { year: '2026', event: 'Vision 2036 strategic plan launch & Alumni Reunion' },
];

function TimelineItem({ year, event, index }: { year: string; event: string; index: number }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  return (
    <div
      ref={ref}
      className={`flex gap-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-maroon-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
          {year.slice(2)}
        </div>
        <div className="w-0.5 bg-maroon-200 flex-1 mt-1" />
      </div>
      <div className="pb-6">
        <span className="text-maroon-700 font-bold text-sm">{year}</span>
        <p className="text-gray-600 text-sm mt-0.5">{event}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [chairmanRef, chairmanVisible] = useIntersectionObserver(0.1);

  return (
    <section id="about" className="relative py-20 bg-cream overflow-hidden">
      <LeafMotif count={3} opacity={0.05} color="#8B1A1A" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600">{t('about.subtitle')}</p>
          <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Text + Timeline */}
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">{t('about.p1')}</p>
            <p className="text-gray-700 leading-relaxed mb-8">{t('about.p2')}</p>

            <h3 className="text-lg font-bold text-maroon-800 mb-4">Our Journey</h3>
            <div>
              {timelineEvents.map((item, i) => (
                <TimelineItem key={item.year} year={item.year} event={item.event} index={i} />
              ))}
            </div>
          </div>

          {/* Right: Chairman Card */}
          <div
            ref={chairmanRef}
            className={`transition-all duration-700 delay-300 ${
              chairmanVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-maroon-100">
              <div className="bg-maroon-700 p-6 text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">✝</span>
                </div>
                <h3 className="text-center font-bold text-lg">Rev. Dr. Thomas Mathew</h3>
                <p className="text-center text-white/80 text-sm mt-1">{t('about.chairman.title')}</p>
              </div>
              <div className="p-6">
                <blockquote className="text-gray-700 italic leading-relaxed text-sm border-l-4 border-gold-400 pl-4">
                  {t('about.chairman.quote')}
                </blockquote>
              </div>
            </div>

            {/* Values */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {['Faith', 'Excellence', 'Service'].map(value => (
                <div key={value} className="text-center p-4 bg-white rounded-xl shadow-sm border border-maroon-100">
                  <div className="text-2xl mb-2">
                    {value === 'Faith' ? '✝' : value === 'Excellence' ? '⭐' : '🤝'}
                  </div>
                  <p className="text-xs font-semibold text-maroon-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
