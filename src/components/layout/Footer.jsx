import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Footer Component
 * Site footer with links and social media
 */
const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: t("Tentang", "About"), href: "#aboutme" },
      { label: t("Layanan", "Services"), href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: t("Testimoni", "Testimonials"), href: "#testimonies" },
      { label: t("Kontak", "Contact"), href: "#contactus" },
    ],
    social: [
      {
        name: "Instagram",
        icon: "instagram",
        link: "https://instagram.com/abcdinis",
      },
      {
        name: "LinkedIn",
        icon: "linkedin",
        link: "https://linkedin.com/in/dinnirahmawati",
      },
      {
        name: "TikTok",
        icon: "tiktok",
        link: "https://tiktok.com/@dinnirahmawati",
      },
      {
        name: "WhatsApp",
        icon: "whatsapp",
        link: "https://wa.me/62859106531249",
      },
    ],
  };

  return (
    <footer id="footer" className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Dinni Rahmawati</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t(
                "Career & Self-Development Practitioner yang membantu profesional membuka potensi terbaik mereka.",
                "Career & Self-Development Practitioner helping professionals unlock their best potential."
              )}
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {t("Menu Cepat", "Quick Menu")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {t("Hubungi Saya", "Contact Me")}
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📱 +62 859-1065-31249</p>
              <p>📧 dinni.business@gmail.com</p>
              <p>📍 Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Dinni Rahmawati. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Built with <span className="text-red-500">❤️</span> using React &
            TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
