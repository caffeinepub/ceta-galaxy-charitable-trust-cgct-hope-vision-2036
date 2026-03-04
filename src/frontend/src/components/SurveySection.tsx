import { ExternalLink, Lock } from "lucide-react";
import type React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const SurveySection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section
      id="survey"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, var(--maroon), var(--gold))",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              backgroundColor: "rgba(107,26,26,0.1)",
              color: "var(--maroon)",
            }}
          >
            Shape the Future
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{
              color: "var(--maroon)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {t("survey.title")}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <h3
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "var(--gold)", fontFamily: "Merriweather, serif" }}
          >
            {t("survey.headline")}
          </h3>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            {t("survey.subheading")}
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "rgba(143,175,126,0.15)",
              color: "var(--sage-dark)",
            }}
          >
            <Lock size={14} />
            {t("survey.confidential")}
          </div>
        </div>

        {/* Survey Content */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-6">
            <div
              className="rounded-2xl p-6 lg:p-8 shadow-card"
              style={{
                backgroundColor: "var(--cream)",
                border: "1px solid rgba(107,26,26,0.08)",
              }}
            >
              <p className="text-base text-gray-700 leading-relaxed mb-8">
                {t("survey.participate")}
              </p>

              <div className="space-y-4">
                <a
                  href="https://forms.office.com/r/8vunq1kxtg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-maroon w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold"
                >
                  <ExternalLink size={18} />
                  {t("survey.btn.english")}
                </a>
                <a
                  href="https://forms.office.com/r/A8kNvXS0Lw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold"
                  style={{ borderColor: "var(--gold)", color: "var(--maroon)" }}
                >
                  <ExternalLink size={18} />
                  {t("survey.btn.malayalam")}
                </a>
              </div>
            </div>

            {/* Survey poster visual */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--maroon-dark), var(--maroon))",
                color: "white",
              }}
            >
              <div className="text-4xl mb-3">📊</div>
              <h4
                className="text-lg font-black mb-2"
                style={{
                  fontFamily: "Merriweather, serif",
                  color: "var(--gold)",
                }}
              >
                CGCT HOPE Vision 2036
              </h4>
              <p className="text-sm text-white/80">
                Your voice matters. Help us build a better future for HOPE
                students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveySection;
