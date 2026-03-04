import {
  Building2,
  CheckCircle2,
  GraduationCap,
  Leaf,
  Target,
} from "lucide-react";
import type React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface PillarData {
  icon: React.ReactNode;
  titleKey: string;
  items: string[];
  color: string;
  bgColor: string;
  number: string;
}

const VisionPillarsSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  const pillars: PillarData[] = [
    {
      icon: <Target size={32} />,
      titleKey: "vision.pillar1.title",
      items: [
        "vision.pillar1.item1",
        "vision.pillar1.item2",
        "vision.pillar1.item3",
      ],
      color: "#6B1A1A",
      bgColor: "rgba(107,26,26,0.06)",
      number: "01",
    },
    {
      icon: <Building2 size={32} />,
      titleKey: "vision.pillar2.title",
      items: [
        "vision.pillar2.item1",
        "vision.pillar2.item2",
        "vision.pillar2.item3",
        "vision.pillar2.item4",
      ],
      color: "#C9A84C",
      bgColor: "rgba(201,168,76,0.08)",
      number: "02",
    },
    {
      icon: <Leaf size={32} />,
      titleKey: "vision.pillar3.title",
      items: [
        "vision.pillar3.item1",
        "vision.pillar3.item2",
        "vision.pillar3.item3",
      ],
      color: "#6A8F5A",
      bgColor: "rgba(143,175,126,0.1)",
      number: "03",
    },
    {
      icon: <GraduationCap size={32} />,
      titleKey: "vision.pillar4.title",
      items: [
        "vision.pillar4.item1",
        "vision.pillar4.item2",
        "vision.pillar4.item3",
        "vision.pillar4.item4",
      ],
      color: "#6B1A1A",
      bgColor: "rgba(107,26,26,0.06)",
      number: "04",
    },
  ];

  return (
    <section
      id="vision"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background:
            "linear-gradient(90deg, var(--maroon), var(--gold), var(--sage), var(--maroon))",
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
              backgroundColor: "rgba(107,26,26,0.1)",
              color: "var(--maroon)",
            }}
          >
            Proposals for Strategic Framework (Under Discussion)
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{
              color: "var(--maroon)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {t("vision.title")}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("vision.subtitle")}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.titleKey}
              className={`pillar-card rounded-2xl p-6 lg:p-8 shadow-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                backgroundColor: pillar.bgColor,
                borderTop: `4px solid ${pillar.color}`,
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: pillar.color, color: "white" }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-1"
                    style={{ color: pillar.color, opacity: 0.6 }}
                  >
                    Pillar {pillar.number}
                  </div>
                  <h3
                    className="text-xl font-black leading-tight"
                    style={{
                      color: "var(--maroon)",
                      fontFamily: "Merriweather, serif",
                    }}
                  >
                    {t(pillar.titleKey)}
                  </h3>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {pillar.items.map((itemKey) => (
                  <li key={itemKey} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: pillar.color }}
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {t(itemKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionPillarsSection;
