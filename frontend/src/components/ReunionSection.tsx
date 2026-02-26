import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Calendar, Clock, MapPin, Users, Heart, Star, BookOpen, Globe } from 'lucide-react';

const purposes = [
  { icon: Heart, text: 'Reconnect with classmates and teachers' },
  { icon: Star, text: 'Celebrate CGCT\'s educational legacy' },
  { icon: BookOpen, text: 'Share insights for Vision 2036' },
  { icon: Globe, text: 'Build a stronger alumni network' },
];

const participantCategories = [
  { title: 'Former Students', desc: 'All CGCT school alumni from any batch', color: 'border-maroon-400' },
  { title: 'Current Staff', desc: 'Teachers and administrative staff', color: 'border-gold-400' },
  { title: 'Church Leaders', desc: 'CGCT church representatives', color: 'border-sage-400' },
  { title: 'Parents & Guardians', desc: 'Current and former parent community', color: 'border-maroon-300' },
];

export default function ReunionSection() {
  const { t } = useLanguage();
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [posterRef, posterVisible] = useIntersectionObserver(0.1);
  const [detailsRef, detailsVisible] = useIntersectionObserver(0.1);

  return (
    <section id="reunion" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
            {t('reunion.title')}
          </h2>
          <p className="text-lg text-gray-600">{t('reunion.subtitle')}</p>
          <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        {/* Reunion Poster */}
        <div
          ref={posterRef}
          className={`flex justify-center mb-12 transition-all duration-700 ${
            posterVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/assets/generated/reunion-poster.dim_926x1312.png"
            alt="HOPE Alumni Reunion 2026 Poster"
            className="max-w-sm w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Two-column grid */}
        <div
          ref={detailsRef}
          className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${
            detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Event Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-maroon-100">
            <h3 className="text-xl font-bold text-maroon-800 mb-4">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-maroon-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">{t('reunion.date')}</p>
                  <p className="text-sm text-gray-500">Mark your calendar</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-maroon-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">{t('reunion.time')}</p>
                  <p className="text-sm text-gray-500">Full day program</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-maroon-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">{t('reunion.venue')}</p>
                  <p className="text-sm text-gray-500">Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Participant Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-maroon-100">
            <h3 className="text-xl font-bold text-maroon-800 mb-4">Who Should Attend</h3>
            <div className="space-y-3">
              {participantCategories.map(cat => (
                <div key={cat.title} className={`border-l-4 ${cat.color} pl-3 py-1`}>
                  <p className="font-semibold text-gray-800 text-sm">{cat.title}</p>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purpose Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {purposes.map((purpose, i) => {
            const Icon = purpose.icon;
            return (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-maroon-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-maroon-700" size={18} />
                </div>
                <p className="text-sm text-gray-700 leading-snug">{purpose.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
