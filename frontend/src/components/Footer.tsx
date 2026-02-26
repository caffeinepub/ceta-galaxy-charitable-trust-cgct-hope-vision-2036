import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Mail, Phone, MapPin, Facebook, Youtube, Send, Heart } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { useMutation } from '@tanstack/react-query';

function useSubmitSubscription() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSubscription(email);
    },
  });
}

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [ctaRef, ctaVisible] = useIntersectionObserver(0.1);
  const { mutate: subscribe, isPending } = useSubmitSubscription();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe(email.trim(), {
      onSuccess: () => {
        setSubscribed(true);
        setEmail('');
      },
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const appId = encodeURIComponent(window.location.hostname || 'cgct-hope-vision');

  return (
    <footer id="contact" className="bg-maroon-900 text-white">
      {/* CTA Banner */}
      <div
        ref={ctaRef}
        className={`bg-gold-500 py-10 px-4 transition-all duration-700 ${
          ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-maroon-900 mb-4">
            Be Part of the Vision 2036 Journey
          </h2>
          <p className="text-maroon-800 mb-6 text-sm md:text-base">
            Join thousands of CGCT community members shaping the future of Christian education
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => scrollTo('survey')}
              className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-700 text-white font-semibold rounded-full text-sm transition-colors"
            >
              Take the Survey
            </button>
            <button
              onClick={() => scrollTo('reunion')}
              className="px-6 py-2.5 bg-white hover:bg-maroon-50 text-maroon-800 font-semibold rounded-full text-sm transition-colors"
            >
              Join the Reunion
            </button>
            <button
              onClick={() => scrollTo('vision')}
              className="px-6 py-2.5 bg-maroon-900 hover:bg-maroon-800 text-white font-semibold rounded-full text-sm transition-colors"
            >
              Explore Vision
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-6 py-2.5 border-2 border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white font-semibold rounded-full text-sm transition-colors"
            >
              Learn About CGCT
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logos & About */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              {/* CETA Galaxy Logo - Version 16 asset */}
              <img
                src="/assets/generated/ceta-galaxy-logo.dim_512x512.png"
                alt="CETA Galaxy"
                className="h-14 w-auto object-contain"
              />
              <img
                src="/assets/HOPE Logo_0-Photoroom-1.png"
                alt="HOPE"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              CGCT HOPE Vision 2036 is a strategic initiative to transform Christian education in Kerala, 
              building on a century of excellence and faith.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gold-400 mb-4 uppercase tracking-wide text-sm">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-white/70 text-sm">CGCT Education Board, Kerala, India</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold-400 flex-shrink-0" size={16} />
                <p className="text-white/70 text-sm">+91 XXXXX XXXXX</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold-400 flex-shrink-0" size={16} />
                <p className="text-white/70 text-sm">hope@cgct.edu.in</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-white/90 text-sm mb-2">Quick Links</h4>
              <div className="grid grid-cols-2 gap-1">
                {['about', 'vision', 'reunion', 'survey'].map(id => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left text-white/60 hover:text-gold-400 text-xs capitalize transition-colors py-0.5"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gold-400 mb-4 uppercase tracking-wide text-sm">
              {t('footer.subscribe')}
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Stay updated with the latest news and developments from CGCT HOPE Vision 2036.
            </p>
            {subscribed ? (
              <div className="bg-sage-600/30 border border-sage-500/40 rounded-xl p-4 text-center">
                <p className="text-sage-300 font-semibold text-sm">✓ Thank you for subscribing!</p>
                <p className="text-white/60 text-xs mt-1">You'll receive updates soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('footer.email.placeholder')}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-maroon-900 flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-50"
                >
                  {isPending ? (
                    <div className="w-4 h-4 border-2 border-maroon-900/30 border-t-maroon-900 rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} CGCT Education Board. {t('footer.rights')}.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-gold-400 fill-gold-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
