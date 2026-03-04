import { useLocation, useNavigate } from "@tanstack/react-router";
import { Globe, Images, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation: React.FC = () => {
  const { t, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.vision", href: "#vision" },
    { key: "nav.reunion", href: "#reunion" },
    { key: "nav.survey", href: "#survey" },
    { key: "nav.contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGalleryClick = () => {
    setMobileOpen(false);
    navigate({ to: "/gallery" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg border-b-2 border-gold"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
      style={{ borderBottomColor: isScrolled ? "var(--gold)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Logo - CETA Galaxy */}
          <div className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/uploads/CGCT-Logo-3.jpg"
              alt="CETA Galaxy Charitable Trust"
              className="h-10 w-10 lg:h-14 lg:w-14 object-contain"
            />
            <div className="hidden sm:block">
              <p
                className="text-xs font-bold leading-tight"
                style={{
                  color: "var(--maroon)",
                  fontFamily: "Merriweather, serif",
                }}
              >
                CETA Galaxy
              </p>
              <p className="text-xs leading-tight text-gray-600">
                Charitable Trust
              </p>
            </div>
          </div>

          {/* Center Title */}
          <div className="hidden lg:flex flex-col items-center text-center flex-1 px-4">
            <span
              className="text-sm font-bold tracking-wide"
              style={{
                color: "var(--maroon)",
                fontFamily: "Merriweather, serif",
              }}
            >
              {t("nav.title")}
            </span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--gold)" }}
            >
              {t("nav.subtitle")}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white"
                style={{ color: "var(--maroon)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor =
                    "var(--maroon)";
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.target as HTMLElement).style.color = "var(--maroon)";
                }}
              >
                {t(link.key)}
              </button>
            ))}
            {/* Gallery Tab */}
            <button
              type="button"
              onClick={handleGalleryClick}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white"
              style={{
                color:
                  location.pathname === "/gallery" ? "white" : "var(--maroon)",
                backgroundColor:
                  location.pathname === "/gallery"
                    ? "var(--maroon)"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--maroon)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== "/gallery") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--maroon)";
                }
              }}
            >
              <Images size={14} />
              Gallery
            </button>
          </div>

          {/* Right: Language Toggle + HOPE Logo + Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200"
              style={{
                borderColor: "var(--gold)",
                color: "var(--maroon)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
              aria-label="Toggle language"
            >
              <Globe size={12} />
              <span>{t("nav.lang")}</span>
            </button>

            {/* HOPE Logo */}
            <img
              src="/assets/uploads/HOPE-Logo-1.jpeg"
              alt="HOPE - Helping Outstanding Pupils in Education"
              className="h-10 w-10 lg:h-14 lg:w-14 object-contain"
            />

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md"
              style={{ color: "var(--maroon)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden mobile-menu-enter border-t"
            style={{ borderColor: "var(--gold)" }}
          >
            <div className="py-3 space-y-1">
              {/* Mobile Title */}
              <div className="px-4 py-2 text-center">
                <p
                  className="text-sm font-bold"
                  style={{
                    color: "var(--maroon)",
                    fontFamily: "Merriweather, serif",
                  }}
                >
                  {t("nav.title")}
                </p>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "var(--gold)" }}
                >
                  {t("nav.subtitle")}
                </p>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                  style={{ color: "var(--maroon)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      "var(--off-white)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  {t(link.key)}
                </button>
              ))}
              {/* Gallery in mobile menu */}
              <button
                type="button"
                onClick={handleGalleryClick}
                className="w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2"
                style={{ color: "var(--maroon)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--off-white)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }}
              >
                <Images size={14} />
                Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
