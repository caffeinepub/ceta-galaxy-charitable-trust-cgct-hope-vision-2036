import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VisionPillarsSection from './components/VisionPillarsSection';
import ReunionSection from './components/ReunionSection';
import SurveySection from './components/SurveySection';
import StakeholderVoicesSection from './components/StakeholderVoicesSection';
import DigitalImpactSection from './components/DigitalImpactSection';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cream font-body">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <VisionPillarsSection />
        <ReunionSection />
        <SurveySection />
        <StakeholderVoicesSection />
        <DigitalImpactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
