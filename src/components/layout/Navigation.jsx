import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

/**
 * Navigation Component
 * Fixed header with mobile menu toggle and scroll behavior
 */
const Navigation = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { href: "#aboutme", labelId: "Tentang", labelEn: "About" },
    { href: "#services", labelId: "Layanan", labelEn: "Services" },
    { href: "#portfolio", labelId: "Portfolio", labelEn: "Portfolio" },
    { href: "#testimonies", labelId: "Testimoni", labelEn: "Testimonials" },
    { href: "#contactus", labelId: "Kontak", labelEn: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-md"
      } border-b border-gray-200`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="#"
            className="font-serif text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
          >
            Dinni Rahmawati
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                {t(link.labelId, link.labelEn)}
              </a>
            ))}

            <LanguageSwitcher />

            {/* CTA Button */}
            <a
              href="#contactus"
              className="inline-flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-primary-600/30"
            >
              {t("Hubungi Saya", "Let's Talk")}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />

            {/* Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-900 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <i
                className={`fas text-2xl transition-transform duration-300 ${
                  mobileMenuOpen ? "fa-times" : "fa-bars"
                }`}
              ></i>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {t(link.labelId, link.labelEn)}
                </a>
              ))}

              {/* Mobile CTA */}
              <a
                href="#contactus"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors mt-2"
              >
                {t("Hubungi Saya", "Let's Talk")}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
