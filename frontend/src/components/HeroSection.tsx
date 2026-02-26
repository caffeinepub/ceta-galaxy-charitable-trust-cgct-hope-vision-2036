import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCountdown } from '../hooks/useCountdown';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LeafMotif from './LeafMotif';

function StatCard({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const count = useCountUp(value, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gold-400">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/80 mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  const scrollToSurvey = () => {
    const el = document.getElementById('survey');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6B0F1A 0%, #8B1A1A 40%, #A52020 70%, #7A1515 100%)',
      }}
    >
      <LeafMotif count={5} opacity={0.06} color="#FFD700" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-8 mb-10">
          {/* CETA Galaxy Logo - Version 16 asset */}
          <img
            src="/assets/generated/ceta-galaxy-logo.dim_512x512.png"
            alt="CETA Galaxy"
            className="h-24 w-auto object-contain drop-shadow-lg"
          />
          <div className="w-px h-16 bg-white/30" />
          <img
            src="/assets/HOPE Logo_0-Photoroom-1.png"
            alt="HOPE"
            className="h-24 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
            CGCT HOPE
            <span className="block text-gold-400">Vision 2036</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-2">
            {t('hero.tagline')}
          </p>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={scrollToSurvey}
            className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('hero.cta.survey')}
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-maroon-800 font-bold rounded-full transition-all duration-200"
          >
            {t('hero.cta.learn')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-3xl mx-auto">
          <StatCard value={45} label={t('hero.stats.schools')} suffix="+" />
          <StatCard value={25000} label={t('hero.stats.students')} suffix="+" />
          <StatCard value={1500} label={t('hero.stats.teachers')} suffix="+" />
          <StatCard value={100} label={t('hero.stats.years')} suffix="+" />
        </div>

        {/* Countdown */}
        {!isExpired && (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-center text-white/90 font-semibold mb-4 text-sm uppercase tracking-widest">
              {t('hero.countdown.title')}
            </p>
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: days, label: t('hero.countdown.days') },
                { value: hours, label: t('hero.countdown.hours') },
                { value: minutes, label: t('hero.countdown.minutes') },
                { value: seconds, label: t('hero.countdown.seconds') },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400 tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
