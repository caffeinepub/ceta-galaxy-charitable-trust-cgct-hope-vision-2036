import { MessageCircle, Newspaper, School, Star } from "lucide-react";
import type React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const initiatives = [
  {
    titleKey: "digital.item1.title",
    descKey: "digital.item1.desc",
    icon: Newspaper,
    color: "#6B1A1A",
    bg: "rgba(107,26,26,0.06)",
  },
  {
    titleKey: "digital.item2.title",
    descKey: "digital.item2.desc",
    icon: Star,
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.08)",
  },
  {
    titleKey: "digital.item3.title",
    descKey: "digital.item3.desc",
    icon: School,
    color: "#6A8F5A",
    bg: "rgba(143,175,126,0.1)",
  },
  {
    titleKey: "digital.item4.title",
    descKey: "digital.item4.desc",
    icon: MessageCircle,
    color: "#6B1A1A",
    bg: "rgba(107,26,26,0.06)",
  },
];

const DigitalImpactSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--sage), var(--gold), var(--maroon))",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              backgroundColor: "rgba(143,175,126,0.15)",
              color: "var(--sage-dark)",
            }}
          >
            Digital Transformation
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{
              color: "var(--maroon)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {t("digital.title")}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("digital.subtitle")}
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titleKey}
                className={`card-hover rounded-2xl p-6 text-center shadow-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  backgroundColor: item.bg,
                  border: `1px solid ${item.color}20`,
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 8px 20px ${item.color}40`,
                  }}
                >
                  <Icon size={28} color="white" />
                </div>
                <h3
                  className="text-base font-black mb-3"
                  style={{
                    color: "var(--maroon)",
                    fontFamily: "Merriweather, serif",
                  }}
                >
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DigitalImpactSection;
