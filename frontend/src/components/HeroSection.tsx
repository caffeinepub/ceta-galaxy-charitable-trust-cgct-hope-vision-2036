import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCountdown } from '../hooks/useCountdown';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LeafMotif from './LeafMotif';
import { Calendar, Users, BookOpen, Star } from 'lucide-react';

const CounterCard: React.FC<{
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sub?: string;
  isNumeric?: boolean;
  target?: number;
  trigger?: boolean;
}> = ({ icon, value, label, sub, isNumeric = false, target = 0, trigger = false }) => {
  const count = useCountUp(target, 2000, trigger && isNumeric);
  const displayValue = isNumeric ? count : value;

  return (
    <div className="flex flex-col items-center text-center p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,168,76,0.3)' }}>
      <div className="mb-2 p-2 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.2)' }}>
        {icon}
      </div>
      <div className="text-3xl lg:text-4xl font-black mb-1" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
        {displayValue}
      </div>
      <div className="text-sm font-semibold text-white/90">{label}</div>
      {sub && <div className="text-xs text-white/60 mt-1">{sub}</div>}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const countdown = useCountdown();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  const scrollToSurvey = () => {
    const el = document.getElementById('survey');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const countdownBoxes = [
    { value: countdown.days, label: t('hero.countdown.days') },
    { value: countdown.hours, label: t('hero.countdown.hours') },
    { value: countdown.minutes, label: t('hero.countdown.minutes') },
    { value: countdown.seconds, label: t('hero.countdown.seconds') },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3A0A0A 0%, #6B1A1A 40%, #8B2A2A 70%, #4A1010 100%)',
        paddingTop: '80px',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Leaf motifs */}
      <LeafMotif count={5} opacity={0.06} color="#8FAF7E" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5" style={{ background: 'var(--gold)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: 'var(--sage)', filter: 'blur(30px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Logos row */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <img
            src="/assets/generated/CETA-3.png"
            alt="CETA Galaxy"
            className="h-16 w-16 lg:h-20 lg:w-20 object-contain opacity-90"
          />
          <div className="h-12 w-px opacity-30" style={{ backgroundColor: 'var(--gold)' }} />
          <img
            src="/assets/generated/HOPE_Logo_0-Photoroom-2.png"
            alt="HOPE"
            className="h-16 w-16 lg:h-20 lg:w-20 object-contain opacity-90"
          />
        </div>

        {/* Main headline */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.4)' }}>
            CGCT • 15 Years of Impact
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-3 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
            <span style={{ color: 'var(--gold)' }}>{t('hero.headline')}</span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            {t('hero.headline2')}
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subheading')}
          </p>
        </div>

        {/* Animated Counters */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CounterCard
            icon={<Star size={20} style={{ color: 'var(--gold)' }} />}
            value={15}
            label={t('hero.counter1.label')}
            isNumeric={true}
            target={15}
            trigger={isVisible}
          />
          <CounterCard
            icon={<Users size={20} style={{ color: 'var(--gold)' }} />}
            value={120}
            label={t('hero.counter2.label')}
            isNumeric={true}
            target={120}
            trigger={isVisible}
          />
          <CounterCard
            icon={<BookOpen size={20} style={{ color: 'var(--gold)' }} />}
            value={4}
            label={t('hero.counter3.label')}
            sub={t('hero.counter3.sub')}
            isNumeric={true}
            target={4}
            trigger={isVisible}
          />
          <CounterCard
            icon={<Calendar size={20} style={{ color: 'var(--gold)' }} />}
            value={t('hero.counter4.value')}
            label={t('hero.counter4.label')}
            isNumeric={false}
          />
        </div>

        {/* Countdown Timer */}
        <div className={`mb-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
            ⏳ {t('hero.countdown.title')}
          </p>
          <div className="flex justify-center gap-3 sm:gap-6">
            {countdownBoxes.map((box, i) => (
              <div key={i} className="countdown-box flex flex-col items-center px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tabular-nums" style={{ fontFamily: 'Merriweather, serif' }}>
                  {String(box.value).padStart(2, '0')}
                </span>
                <span className="text-xs text-white/60 mt-1 uppercase tracking-wider">{box.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://forms.gle/f6TvTypSkkRnmS7GA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold shadow-gold pulse-gold"
          >
            🎓 {t('hero.btn.register')}
          </a>
          <button
            onClick={scrollToSurvey}
            className="btn-outline-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold"
          >
            📊 {t('hero.btn.survey')}
          </button>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#FDF8F0" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
