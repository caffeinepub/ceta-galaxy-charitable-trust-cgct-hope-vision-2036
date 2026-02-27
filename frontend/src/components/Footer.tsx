import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubmitSubscription } from '../hooks/useQueries';
import { Phone, Mail, Heart, ExternalLink } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import LeafMotif from './LeafMotif';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submitSubscription = useSubmitSubscription();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await submitSubscription.mutateAsync(email.trim());
      setSubmitted(true);
      setEmail('');
    } catch {
      // error handled via mutation state
    }
  };

  const scrollToSurvey = () => {
    const el = document.getElementById('survey');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'cgct-hope-vision-2036');

  const socialLinks = [
    { Icon: SiFacebook, label: 'Facebook', href: 'https://www.facebook.com/Cetagalaxytrust' },
    { Icon: SiInstagram, label: 'Instagram', href: 'https://www.instagram.com/cgct_vision_2036' },
    { Icon: SiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/ceta-galaxy-charitable-trust/' },
    { Icon: SiYoutube, label: 'YouTube', href: 'https://youtube.com/@cetagalaxycharitabletrust' },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ backgroundColor: 'var(--maroon-dark)' }}>
      <LeafMotif count={4} opacity={0.05} color="#8FAF7E" />

      {/* Top wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" style={{ marginBottom: '-2px' }}>
          <path d="M0 0L1440 0L1440 40C1200 0 960 60 720 40C480 20 240 60 0 40L0 0Z" fill="white" />
        </svg>
      </div>

      {/* CTA Banner */}
      <div
        className="relative z-10 py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #3A0A0A 0%, #6B1A1A 50%, #4A1010 100%)' }}
      >
        <LeafMotif count={3} opacity={0.04} color="#C9A84C" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            {t('footer.cta')}
          </h2>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-10 leading-tight"
            style={{ fontFamily: 'Merriweather, serif', color: 'var(--gold)' }}
          >
            {t('footer.cta2')}
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://forms.gle/f6TvTypSkkRnmS7GA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              🎓 {t('footer.btn.register')}
            </a>
            <button
              onClick={scrollToSurvey}
              className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              📊 {t('footer.btn.survey')}
            </button>
            <a
              href="mailto:info@cetagalaxytrust.com"
              className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              ✉️ {t('footer.btn.contact')}
            </a>
            <a
              href="https://www.facebook.com/Cetagalaxytrust"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              📣 {t('footer.btn.follow')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-16 px-4" style={{ backgroundColor: 'var(--maroon-dark)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Logos Row */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/assets/generated/CETA-3.png"
                alt="CETA Galaxy Charitable Trust"
                className="h-20 w-20 object-contain opacity-90"
              />
              <p className="text-xs font-bold text-center" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
                CETA Galaxy<br />Charitable Trust
              </p>
            </div>
            <div className="h-16 w-px opacity-20" style={{ backgroundColor: 'var(--gold)' }} />
            <div className="flex flex-col items-center gap-2">
              <img
                src="/assets/generated/HOPE_Logo_0-Photoroom-2.png"
                alt="HOPE - Helping Outstanding Pupils in Education"
                className="h-20 w-20 object-contain opacity-90"
              />
              <p className="text-xs font-bold text-center" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
                HOPE<br />Scholarship Program
              </p>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Contact */}
            <div>
              <h3 className="text-base font-bold mb-4 uppercase tracking-widest" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
                {t('footer.contact.title')}
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+919447043838"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} style={{ color: 'var(--gold)' }} />
                  +91 94470 43838
                </a>
                <a
                  href="tel:+919447043939"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} style={{ color: 'var(--gold)' }} />
                  +91 94470 43939
                </a>
                <a
                  href="mailto:info@cetagalaxytrust.com"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={14} style={{ color: 'var(--gold)' }} />
                  info@cetagalaxytrust.com
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-base font-bold mb-4 uppercase tracking-widest" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
                {t('footer.social.title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'var(--gold)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--maroon-dark)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-base font-bold mb-4 uppercase tracking-widest" style={{ color: 'var(--gold)', fontFamily: 'Merriweather, serif' }}>
                {t('footer.newsletter.title')}
              </h3>
              {submitted ? (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gold)' }}>
                  <Heart size={16} fill="currentColor" />
                  <span>{t('footer.newsletter.thanks')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter.placeholder')}
                    required
                    className="px-4 py-2 rounded-full text-sm bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', focusRingColor: 'var(--gold)' } as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    disabled={submitSubscription.isPending}
                    className="btn-gold px-4 py-2 rounded-full text-sm font-bold disabled:opacity-60"
                  >
                    {submitSubscription.isPending ? '...' : t('footer.newsletter.btn')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t mb-6" style={{ borderColor: 'rgba(201,168,76,0.15)' }} />

          {/* Attribution & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>© {year} CETA Galaxy Charitable Trust. {t('footer.rights')}</p>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white/70 transition-colors"
            >
              Built with <Heart size={12} className="mx-0.5" style={{ color: 'var(--gold)' }} fill="var(--gold)" /> using caffeine.ai
              <ExternalLink size={10} className="ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
