import {
  Award,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  LayoutGrid,
  MapPin,
  PartyPopper,
  Search,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import type React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import LeafMotif from "./LeafMotif";

const purposeIcons = [
  { key: "reunion.purpose.1", icon: BarChart2 },
  { key: "reunion.purpose.2", icon: Search },
  { key: "reunion.purpose.3", icon: TrendingUp },
  { key: "reunion.purpose.4", icon: BookOpen },
  { key: "reunion.purpose.5", icon: Briefcase },
  { key: "reunion.purpose.6", icon: LayoutGrid },
  { key: "reunion.purpose.7", icon: BarChart2 },
  { key: "reunion.purpose.8", icon: PartyPopper },
];

const ReunionSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver(0.1);

  const categories = [
    { key: "reunion.cat.a", label: "A", color: "#6B1A1A" },
    { key: "reunion.cat.b", label: "B", color: "#C9A84C" },
    { key: "reunion.cat.c", label: "C", color: "#8FAF7E" },
    { key: "reunion.cat.d", label: "D", color: "#6B1A1A" },
    { key: "reunion.cat.e", label: "E", color: "#C9A84C" },
  ];

  return (
    <section
      id="reunion"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--off-white)" }}
    >
      <LeafMotif count={4} opacity={0.07} color="#8FAF7E" />

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
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
            ✨ First Ever HOPE Alumni Reunion
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{
              color: "var(--maroon)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {t("reunion.title")}
          </h2>
          <div className="section-divider w-24 mx-auto mb-6" />
          <h3
            className="text-2xl sm:text-3xl font-black mb-4"
            style={{ color: "var(--gold)", fontFamily: "Merriweather, serif" }}
          >
            {t("reunion.headline")}
          </h3>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("reunion.subheading")}
          </p>
        </div>

        {/* Reunion Poster — full-width, centered, above participant cards */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden shadow-lg"
            style={{ border: "2px solid rgba(107,26,26,0.12)" }}
          >
            <img
              src="/assets/uploads/Reunion-Poster-2.jpeg"
              alt="HOPE Alumni Reunion 2026 Poster — 12 April 2026, KILA Thrissur, 9:00 AM. Reconnect. Relive. Reignite."
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Event Details */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {/* Event Details Card */}
            <div
              className="rounded-2xl overflow-hidden shadow-maroon mb-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--maroon-dark), var(--maroon))",
              }}
            >
              <div className="p-6 lg:p-8">
                <h4
                  className="text-lg font-black text-white mb-6"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  📅 Event Details
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                    >
                      <Calendar size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Date
                      </p>
                      <p className="text-base font-bold text-white">
                        {t("reunion.date")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                    >
                      <MapPin size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Venue
                      </p>
                      <p className="text-base font-bold text-white">
                        {t("reunion.venue")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                    >
                      <Clock size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Time
                      </p>
                      <p className="text-base font-bold text-white">
                        {t("reunion.time")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                    >
                      <Video size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Preparatory Meetings
                      </p>
                      <p className="text-sm text-white/80">
                        {t("reunion.meetings")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Participants + Note */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div
              className="rounded-2xl p-6 lg:p-8 shadow-card mb-6"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users size={24} style={{ color: "var(--maroon)" }} />
                <h4
                  className="text-lg font-black"
                  style={{
                    color: "var(--maroon)",
                    fontFamily: "Merriweather, serif",
                  }}
                >
                  {t("reunion.participants.title")}
                </h4>
              </div>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: "var(--off-white)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.label}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t(cat.key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Celebration Note */}
            <div
              className="rounded-2xl p-5 mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                border: "2px solid rgba(201,168,76,0.3)",
              }}
            >
              <div className="flex items-start gap-3">
                <PartyPopper
                  size={20}
                  style={{
                    color: "var(--gold)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--maroon)" }}
                >
                  {t("reunion.note")}
                </p>
              </div>
            </div>

            {/* Register Button */}
            <a
              href="https://forms.gle/f6TvTypSkkRnmS7GA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold shadow-gold"
            >
              🎓 {t("reunion.btn.register")}
            </a>
          </div>
        </div>

        {/* Purpose Grid */}
        <div
          className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h3
            className="text-2xl font-black text-center mb-8"
            style={{
              color: "var(--maroon)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {t("reunion.purpose.title")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {purposeIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="purpose-item flex flex-col items-center text-center p-4 rounded-2xl shadow-card cursor-default"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgba(107,26,26,0.08)",
                  }}
                >
                  <div
                    className="p-3 rounded-full mb-3"
                    style={{
                      backgroundColor:
                        i % 2 === 0
                          ? "rgba(107,26,26,0.08)"
                          : "rgba(201,168,76,0.12)",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{
                        color:
                          i % 2 === 0 ? "var(--maroon)" : "var(--gold-dark)",
                      }}
                    />
                  </div>
                  <p className="text-xs font-semibold leading-tight text-gray-700">
                    {t(item.key)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReunionSection;
