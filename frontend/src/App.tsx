import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VisionPillarsSection from './components/VisionPillarsSection';
import ReunionSection from './components/ReunionSection';
import SurveySection from './components/SurveySection';
import StakeholderVoicesSection from './components/StakeholderVoicesSection';
import DigitalImpactSection from './components/DigitalImpactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <VisionPillarsSection />
          <ReunionSection />
          <SurveySection />
          <StakeholderVoicesSection />
          <DigitalImpactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
