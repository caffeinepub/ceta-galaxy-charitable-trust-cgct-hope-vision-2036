import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.vision'), id: 'vision' },
    { label: t('nav.reunion'), id: 'reunion' },
    { label: t('nav.survey'), id: 'survey' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* CETA Galaxy Logo - Version 16 asset */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/ceta-galaxy-logo.dim_512x512.png"
              alt="CETA Galaxy Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Center Title */}
          <div className="hidden md:block text-center">
            <p className={`text-sm font-semibold tracking-wide ${isScrolled ? 'text-maroon-700' : 'text-white'}`}>
              {t('nav.title')}
            </p>
          </div>

          {/* HOPE Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/HOPE Logo_0-Photoroom-1.png"
              alt="HOPE Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                  isScrolled ? 'text-maroon-800' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                isScrolled
                  ? 'border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-maroon-700'
              }`}
            >
              {language === 'en' ? 'മലയാളം' : 'English'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X className={isScrolled ? 'text-maroon-800' : 'text-white'} size={24} />
              : <Menu className={isScrolled ? 'text-maroon-800' : 'text-white'} size={24} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white rounded-xl shadow-lg p-4">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-2 px-3 text-maroon-800 hover:bg-maroon-50 rounded-lg text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="mt-2 w-full py-2 px-3 rounded-lg border border-maroon-700 text-maroon-700 text-sm font-semibold"
            >
              {language === 'en' ? 'മലയാളം' : 'English'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
