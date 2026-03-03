import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VisionPillarsSection from './components/VisionPillarsSection';
import ReunionSection from './components/ReunionSection';
import SurveySection from './components/SurveySection';
import StakeholderVoicesSection from './components/StakeholderVoicesSection';
import DigitalImpactSection from './components/DigitalImpactSection';
import Footer from './components/Footer';
import SurveyPage from './pages/SurveyPage';
import GalleryPage from './pages/GalleryPage';
import ProfileSetupModal from './components/ProfileSetupModal';

const queryClient = new QueryClient();

// Home page (all sections)
const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <AboutSection />
    <VisionPillarsSection />
    <ReunionSection />
    <SurveySection />
    <StakeholderVoicesSection />
    <DigitalImpactSection />
  </>
);

// Root layout with Navigation and Footer
const RootLayout: React.FC = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <div className="overflow-x-hidden">
        <Navigation />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ProfileSetupModal />
      </div>
    </QueryClientProvider>
  </LanguageProvider>
);

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const surveyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/survey',
  component: SurveyPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
});

const routeTree = rootRoute.addChildren([homeRoute, surveyRoute, galleryRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
