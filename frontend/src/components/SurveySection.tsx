import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Shield, ExternalLink } from 'lucide-react';

export default function SurveySection() {
  const { t } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver(0.1);

  const englishSurveyUrl = 'https://forms.office.com/r/english-survey';
  const malayalamSurveyUrl = 'https://forms.office.com/r/malayalam-survey';

  return (
    <section id="survey" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
              {t('survey.title')}
            </h2>
            <p className="text-lg text-gray-600">{t('survey.subtitle')}</p>
            <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
          </div>

          {/* Confidentiality Badge */}
          <div className="flex items-center justify-center gap-2 mb-8 bg-sage-50 border border-sage-200 rounded-full px-5 py-2 w-fit mx-auto">
            <Shield className="text-sage-600" size={16} />
            <span className="text-sm text-sage-700 font-medium">{t('survey.confidential')}</span>
          </div>

          {/* Survey Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={englishSurveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('survey.english')}
              <ExternalLink size={16} />
            </a>
            <a
              href={malayalamSurveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('survey.malayalam')}
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Vision 2036 Poster Card */}
          <div className="bg-maroon-700 rounded-2xl p-6 text-white text-center shadow-xl">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold mb-2">CGCT HOPE Vision 2036</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Your voice matters. Help us shape a transformative educational vision for the next generation of CGCT students.
            </p>
            <div className="mt-4 inline-block bg-gold-500 text-maroon-900 text-xs font-bold px-4 py-1.5 rounded-full">
              Survey Open Until April 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
