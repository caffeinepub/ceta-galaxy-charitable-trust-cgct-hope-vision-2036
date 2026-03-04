import { useNavigate } from "@tanstack/react-router";
import { ExternalLink, Heart, Mail, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";
import { useSubmitSubscription } from "../hooks/useQueries";
import LeafMotif from "./LeafMotif";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitSubscription = useSubmitSubscription();
  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await submitSubscription.mutateAsync(email.trim());
      setSubmitted(true);
      setEmail("");
    } catch {
      // error handled via mutation state
    }
  };

  const handleSurveyClick = () => {
    navigate({ to: "/survey" });
  };

  const year = new Date().getFullYear();

  const socialLinks = [
    {
      Icon: SiFacebook,
      label: "Facebook",
      href: "https://www.facebook.com/Cetagalaxytrust",
    },
    {
      Icon: SiInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/cgct_vision_2036",
    },
    {
      Icon: SiLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/ceta-galaxy-charitable-trust/",
    },
    {
      Icon: SiYoutube,
      label: "YouTube",
      href: "https://youtube.com/@cetagalaxycharitabletrust",
    },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--maroon-dark)" }}
    >
      <LeafMotif count={4} opacity={0.05} color="#8FAF7E" />

      {/* Top wave */}
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ marginBottom: "-2px" }}
        >
          <path
            d="M0 0L1440 0L1440 40C1200 0 960 60 720 40C480 20 240 60 0 40L0 0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* CTA Banner */}
      <div
        className="relative z-10 py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, #3A0A0A 0%, #6B1A1A 50%, #4A1010 100%)",
        }}
      >
        <LeafMotif count={3} opacity={0.04} color="#C9A84C" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            {t("footer.cta")}
          </h2>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-10 leading-tight"
            style={{ fontFamily: "Merriweather, serif", color: "var(--gold)" }}
          >
            {t("footer.cta2")}
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://forms.gle/f6TvTypSkkRnmS7GA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              🎓 {t("footer.btn.register")}
            </a>
            <button
              type="button"
              onClick={handleSurveyClick}
              className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            >
              📊 {t("footer.btn.survey")}
            </button>
            <a
              href="https://forms.gle/TPV1MG3VDBqB9CKdA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-2 transition-all duration-200"
              style={{ borderColor: "var(--sage)", color: "var(--sage)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--sage)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--sage)";
              }}
            >
              🤝 {t("footer.btn.volunteer")}
            </a>
            <a
              href="https://forms.gle/BjTJEkhm5rxguZJA7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-2 transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "rgba(255,255,255,0.8)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              💛 {t("footer.btn.support")}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="relative z-10 py-16 px-4"
        style={{ backgroundColor: "#2A0808" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Logos + About */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/CGCT-Logo-3.jpg"
                  alt="CETA Galaxy Charitable Trust"
                  className="h-14 w-14 object-contain"
                />
                <img
                  src="/assets/uploads/HOPE-Logo-1.jpeg"
                  alt="HOPE - Helping Outstanding Pupils in Education"
                  className="h-14 w-14 object-contain"
                />
              </div>
              <h3
                className="text-base font-black text-white mb-2"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                CETA Galaxy Charitable Trust
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                Helping Outstanding Pupils in Education since 2010. Building
                futures, one student at a time.
              </p>
              {/* Social Icons */}
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: "var(--gold)" }}
                >
                  {t("footer.social")}
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "var(--gold)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--maroon-dark)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.6)";
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4
                className="text-sm font-black mb-5 tracking-widest uppercase"
                style={{ color: "var(--gold)" }}
              >
                {t("footer.links.title")}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "nav.home", href: "#home" },
                  { label: "nav.about", href: "#about" },
                  { label: "nav.vision", href: "#vision" },
                  { label: "nav.reunion", href: "#reunion" },
                  { label: "nav.survey", href: "#survey" },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 text-left"
                    >
                      → {t(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4
                className="text-sm font-black mb-5 tracking-widest uppercase"
                style={{ color: "var(--gold)" }}
              >
                {t("footer.contact.title")}
              </h4>
              <div className="space-y-4">
                {/* Athira S first */}
                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    style={{
                      color: "var(--gold)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <p className="text-xs text-white/50 mb-1">Athira S</p>
                    <a
                      href="tel:+919544218988"
                      className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                    >
                      +91 9544218988
                    </a>
                  </div>
                </div>
                {/* Syam S second */}
                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    style={{
                      color: "var(--gold)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <p className="text-xs text-white/50 mb-1">Syam S</p>
                    <a
                      href="tel:+916282923370"
                      className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                    >
                      +91 6282923370
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    style={{
                      color: "var(--gold)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <p className="text-xs text-white/50 mb-1">Email</p>
                    <a
                      href="mailto:info@cetagalaxytrust.com"
                      className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                    >
                      info@cetagalaxytrust.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4
                className="text-sm font-black mb-5 tracking-widest uppercase"
                style={{ color: "var(--gold)" }}
              >
                {t("footer.newsletter.title")}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {t("footer.newsletter.desc")}
              </p>
              {submitted ? (
                <div
                  className="rounded-xl p-4 text-sm font-semibold text-center"
                  style={{
                    backgroundColor: "rgba(106,143,90,0.2)",
                    color: "#8FAF7E",
                  }}
                >
                  ✓ {t("footer.newsletter.success")}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter.placeholder")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                    style={
                      {
                        "--tw-ring-color": "var(--gold)",
                      } as React.CSSProperties
                    }
                  />
                  <button
                    type="submit"
                    disabled={submitSubscription.isPending}
                    className="w-full btn-gold py-2.5 rounded-xl text-sm font-bold disabled:opacity-60 transition-opacity"
                  >
                    {submitSubscription.isPending
                      ? "..."
                      : t("footer.newsletter.btn")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative z-10 py-5 px-4 border-t"
        style={{
          backgroundColor: "#1A0404",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {year} CETA Galaxy Charitable Trust. {t("footer.rights")}
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with{" "}
            <Heart size={12} className="text-red-400 fill-red-400 mx-0.5" /> by{" "}
            <em
              className="text-white/60 not-italic"
              style={{ fontStyle: "italic" }}
            >
              Athira S
            </em>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
