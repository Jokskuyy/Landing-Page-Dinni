import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Hero Section Component
 * Landing section with introduction and call-to-action
 */
const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-primary-50/30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-600">
                <span className="text-gray-800">
                  {t("Hallo, Aku ", "Hello, I'm ")}{" "}
                </span>
                <span className="text-primary-600 font-semibold">
                  Dinni Rahmawati
                </span>
              </p>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Founder & CEO of{" "}
                <span className="text-primary-600">Teman Transisi</span>
              </h1>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Master's Candidate, Columbia University
              </p>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {t(
                  "Soft-skill trainer dan mentor karier yang mentransformasi produktivitas melalui experiential dan challenge-based learning.",
                  "Soft-skill trainer and career mentor transforming productivity through experiential and challenge-based learning."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#aboutme" className="group">
                <button
                  type="button"
                  className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/30 group-hover:scale-110 duration-300"
                >
                  <span>
                    {t("Lebih Kenal Tentang Dinni", "Get to Know Dinni")}
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
              </a>
              <a href="#portfolio" className="group">
                <button
                  type="button"
                  className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-primary-600 font-semibold rounded-xl border-2 border-primary-600 transition-all hover:shadow-md group-hover:scale-105 duration-300"
                >
                  <span>{t("Lihat Portfolio", "View Portfolio")}</span>
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">200+</div>
                <div className="text-sm text-gray-600">
                  {t("Program Dirancang", "Programs Designed")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-600">
                  {t("Orang Terbantu", "People Helped")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">7+</div>
                <div className="text-sm text-gray-600">
                  {t("Tahun Pengalaman", "Years of Experience")}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center flex-1 relative">
            <img
              className="w-full max-w-lg rounded-3xl"
              src="/imgs/cek1.png"
              alt="Dinni Rahmawati - Career Development Practitioner"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#aboutme"
          className="text-gray-400 hover:text-primary-600 transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
