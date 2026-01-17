import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * About Section Component
 * About me section with career history and credentials
 */
const About = () => {
  const { t } = useLanguage();

  const careerHistory = [
    {
      period: "2025 - Current",
      title: "Founder & CEO",
      company: "Mantra (Teman Transisi)",
    },
    {
      period: "2024 - 2025",
      title: "Learning Advisor",
      company: "Rumah Siap Kerja",
    },
    {
      period: "2021 - 2024",
      title: "Head of Learning Department",
      company: "Rumah Siap Kerja",
    },
    {
      period: "2020 - 2021",
      title: "People & Development Analyst",
      company: "Peopleshift",
    },
    {
      period: "2019 - 2020",
      title: "Innovation Management Officer",
      company: "Telkom Indonesia",
    },
  ];

  return (
    <section id="aboutme" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-600"></div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8 text-white" data-aos="fade-right">
            <div>
              <p className="text-sm font-medium text-accent-300 mb-2 tracking-wider uppercase">
                {t("TENTANG SAYA", "ABOUT ME")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t("Membantu Anda Membuka", "Helping You Unlock Your")}{" "}
                <span className="text-accent-300">
                  {t("Potensi Terbaik", "Best Potential")}
                </span>
              </h2>
              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  {t(
                    "Halo, saya Dinni Rahmawati, seorang people development practitioner, soft-skill trainer, dan juga mentor, yang telah memiliki 7 tahun pengalaman dalam merancang dan memfasilitasi pembelajaran bagi para adult learner di korporat, sektor publik, dan komunitas sosial. Misi saya adalah membantu adult learner mencapai potensi maksimalnya melalui pendekatan pembelajaran yang kontekstual, dan transformatif.",
                    "Hi, I'm Dinni Rahmawati, a people development practitioner, soft-skill trainer, and mentor with 7 years of experience designing and facilitating learning for adult learners in corporate, public sector, and social communities. My mission is to help adult learners reach their maximum potential through contextual and transformative learning approaches."
                  )}
                </p>
                <p>
                  {t(
                    "Dengan pendekatan Experiential Learning, dan Challenge-based learning, saya memadukan pengalaman langsung, refleksi terstruktur, serta umpan balik yang konkret, sehingga pembelajaran tidak berhenti pada pemahaman konsep, tetapi mendorong perubahan perilaku yang konkret dan peningkatan produktivitas.",
                    "Through Experiential Learning and Challenge-based learning approaches, I combine direct experience, structured reflection, and concrete feedback, so that learning doesn't stop at concept understanding, but drives concrete behavioral change and productivity improvement."
                  )}
                </p>
                <p>
                  {t(
                    "Perjalanan karier saya di people development berawal dari Innovation Management di Telkom Indonesia, di mana saya terlibat dalam pengembangan kapasitas dan kapabilitas SDM untuk menciptakan solusi dan produk inovatif yang scalable. Pengalaman ini membentuk keyakinan saya bahwa strategi pembelajaran yang tepat dapat mendorong produktivitas individu dan mendukung pertumbuhan organisasi.",
                    "My career journey in people development began with Innovation Management at Telkom Indonesia, where I was involved in developing HR capacity and capability to create scalable innovative solutions and products. This experience shaped my belief that the right learning strategy can drive individual productivity and support organizational growth."
                  )}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="bg-accent-400/20 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-accent-300">
              <p className="text-lg italic text-white mb-4">
                "
                {t(
                  "Setiap orang punya potensi luar biasa. Tugas saya adalah membantu mereka menemukannya dan mengembangkannya.",
                  "Everyone has extraordinary potential. My job is to help them find it and develop it."
                )}
                "
              </p>
              <cite className="text-sm text-accent-200">— Dinni Rahmawati</cite>
            </blockquote>
          </div>

          {/* Right Content */}
          <div className="space-y-8" data-aos="fade-left">
            {/* Career History */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-lg">
                {t("Perjalanan Karier", "Career Journey")}
              </h3>
              <div className="space-y-3">
                {careerHistory.map((career, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-2 h-2 bg-accent-300 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="text-xs text-accent-200">{career.period}</p>
                      <p className="font-semibold text-white">{career.title}</p>
                      <p className="text-sm text-accent-300">
                        {career.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          data-aos="fade-up"
        >
          <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="w-10 h-10 bg-accent-300/20 rounded-lg flex items-center justify-center shrink-0">
              <i className="fas fa-graduation-cap text-accent-300 text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold text-white">Columbia University</h4>
              <p className="text-sm text-white/80">
                {t(
                  "M.A. in Adult Learning and Leadership (LPDP Awardee)",
                  "M.A. in Adult Learning and Leadership (LPDP Awardee)"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="w-10 h-10 bg-accent-300/20 rounded-lg flex items-center justify-center shrink-0">
              <i className="fas fa-briefcase text-accent-300 text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold text-white">Rumah Siap Kerja</h4>
              <p className="text-sm text-white/80">
                {t(
                  "Head of Learning Department (2021-2024)",
                  "Head of Learning Department (2021-2024)"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="w-10 h-10 bg-accent-300/20 rounded-lg flex items-center justify-center shrink-0">
              <i className="fas fa-award text-accent-300 text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold text-white">
                {t("7+ Tahun Pengalaman", "7+ Years of Experience")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "di People Development & Career Coaching",
                  "in People Development & Career Coaching"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="w-10 h-10 bg-accent-300/20 rounded-lg flex items-center justify-center shrink-0">
              <i className="fas fa-heart text-accent-300 text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold text-white">
                {t("50K+ Kehidupan Terbantu", "50K+ Lives Impacted")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Melalui program training & mentoring",
                  "Through training & mentoring programs"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
