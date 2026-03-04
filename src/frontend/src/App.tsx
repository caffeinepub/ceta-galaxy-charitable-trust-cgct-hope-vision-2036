import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type React from "react";
import { useEffect } from "react";
import AboutSection from "./components/AboutSection";
import DigitalImpactSection from "./components/DigitalImpactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navigation from "./components/Navigation";
import ProfileSetupModal from "./components/ProfileSetupModal";
import ReunionSection from "./components/ReunionSection";
import StakeholderVoicesSection from "./components/StakeholderVoicesSection";
import SurveySection from "./components/SurveySection";
import VisionPillarsSection from "./components/VisionPillarsSection";
import { LanguageProvider } from "./contexts/LanguageContext";
import GalleryPage from "./pages/GalleryPage";
import SurveyPage from "./pages/SurveyPage";

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
const RootLayout: React.FC = () => {
  useEffect(() => {
    const removeExtensionElements = () => {
      const selectors = [
        '[class*="use-chat-gpt-ai--MuiStack-root"]',
        '[class*="maxai-client--chat-hub--container"]',
        '[class*="MAX_AI_FLOATING_IMAGE_MINI_MENU"]',
        '[class*="max_ai__floating_image_menu"]',
        '[class*="maxai-client"]',
        '[class*="use-chat-gpt-ai"]',
      ];
      for (const sel of selectors) {
        for (const el of document.querySelectorAll(sel)) {
          if (!el.closest("#root")) el.remove();
        }
      }
    };

    removeExtensionElements();

    const observer = new MutationObserver(removeExtensionElements);
    observer.observe(document.body, { childList: true, subtree: false });
    return () => observer.disconnect();
  }, []);

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <ProfileSetupModal />
        </div>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const surveyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/survey",
  component: SurveyPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});

const routeTree = rootRoute.addChildren([homeRoute, surveyRoute, galleryRoute]);

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
