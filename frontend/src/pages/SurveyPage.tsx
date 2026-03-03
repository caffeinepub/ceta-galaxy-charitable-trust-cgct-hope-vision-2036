import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import LeafMotif from '../components/LeafMotif';

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #3A0A0A 0%, #6B1A1A 40%, #8B2A2A 70%, #4A1010 100%)',
        paddingTop: '80px',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <LeafMotif count={5} opacity={0.06} color="#8FAF7E" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5" style={{ background: 'var(--gold)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: 'var(--sage)', filter: 'blur(30px)' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Back button */}
        <div className="w-full max-w-2xl mb-8">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>

        {/* Main card */}
        <div
          className="w-full max-w-2xl rounded-3xl p-8 sm:p-12 survey-page-enter"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.3)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* Logos */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <img
              src="/assets/CETA-2.png"
              alt="CETA Galaxy"
              className="h-12 w-12 object-contain opacity-90"
            />
            <div className="h-8 w-px opacity-30" style={{ backgroundColor: 'var(--gold)' }} />
            <img
              src="/assets/HOPE Logo_0-Photoroom-1.png"
              alt="HOPE"
              className="h-12 w-12 object-contain opacity-90"
            />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.4)' }}
            >
              Vision 2036 Survey
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white text-center mb-4 leading-tight"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            CGCT – HOPE{' '}
            <span style={{ color: 'var(--gold)' }}>Vision 2036</span>{' '}
            Survey
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/70 text-center mb-10 leading-relaxed">
            Choose your preferred language to participate.
          </p>

          {/* Divider */}
          <div className="section-divider mb-10 rounded-full" />

          {/* Survey Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.office.com/r/8vunq1kxtg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold shadow-lg transition-all duration-200 group"
            >
              🇬🇧 English Survey
              <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://forms.office.com/r/A8kNvXS0Lw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-200 group"
            >
              🇮🇳 Malayalam Survey
              <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Note */}
          <p className="text-xs text-white/40 text-center mt-8 leading-relaxed">
            Your responses are confidential and will be used solely to shape the Vision 2036 strategic framework.
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#FDF8F0" />
        </svg>
      </div>
    </div>
  );
};

export default SurveyPage;
