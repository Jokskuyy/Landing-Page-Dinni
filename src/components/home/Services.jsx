import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Services Section Component
 * Display available services with cards
 */
const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      icon: "user-tie",
      title: "Career Mentoring",
      badge: t("Popular", "Popular"),
      subtitle: t("Sesi Personal 1-on-1", "Personal 1-on-1 Session"),
      description: t(
        "Sesi mentoring personal untuk membantu Anda mencapai tujuan karier, transisi karier (resign/promosi), dan menemukan kejelasan arah profesional.",
        "Personal mentoring sessions to help you achieve career goals, career transitions (resignation/promotion), and find clarity in your professional direction."
      ),
      features: [
        t("Konsultasi 60-90 menit per sesi", "60-90 minute consultation per session"),
        t("Personalized career roadmap", "Personalized career roadmap"),
        t("CV & LinkedIn review", "CV & LinkedIn review"),
        t("Interview preparation", "Interview preparation"),
      ],
      price: t("Mulai dari Rp 350.000", "Starting from IDR 350,000"),
      whatsappText: t(
        "Halo Kak Dinni, saya tertarik dengan layanan Career Mentoring. Bisa dijelaskan lebih lanjut?",
        "Hi Dinni, I'm interested in your Career Mentoring service. Can you explain more?"
      ),
    },
    {
      id: 2,
      icon: "graduation-cap",
      title: t("Scholarship & Master's Mentoring", "Scholarship & Master's Mentoring"),
      subtitle: t("Beasiswa & Studi Lanjut", "Scholarship & Further Studies"),
      description: t(
        "Panduan lengkap untuk aplikasi beasiswa dan universitas top dunia, termasuk brainstorming, CV/essay review, dan mock interview.",
        "Complete guidance for scholarship and top world university applications, including brainstorming, CV/essay review, and mock interviews."
      ),
      features: [
        t("Essay & SoP brainstorming", "Essay & SoP brainstorming"),
        t("CV & motivation letter review", "CV & motivation letter review"),
        t("Mock interview practice", "Mock interview practice"),
        t("University selection strategy", "University selection strategy"),
      ],
      price: t("Mulai dari Rp 500.000", "Starting from IDR 500,000"),
      whatsappText: t(
        "Halo Kak Dinni, saya tertarik dengan layanan Scholarship & Master's Mentoring. Bisa dijelaskan lebih lanjut?",
        "Hi Dinni, I'm interested in your Scholarship & Master's Mentoring service. Can you explain more?"
      ),
    },
    {
      id: 3,
      icon: "file-alt",
      title: t("Proofreading Services", "Proofreading Services"),
      subtitle: t("Review Dokumen", "Document Review"),
      description: t(
        "Layanan review dokumen profesional untuk aplikasi, essay, proposal, dan dokumen penting lainnya.",
        "Professional document review service for applications, essays, proposals, and other important documents."
      ),
      features: [
        t("Grammar & structure check", "Grammar & structure check"),
        t("Clarity improvement", "Clarity improvement"),
        t("Formatting review", "Formatting review"),
        t("Fast turnaround", "Fast turnaround"),
      ],
      price: t("Mulai dari Rp 150.000", "Starting from IDR 150,000"),
      whatsappText: t(
        "Halo Kak Dinni, saya tertarik dengan layanan Proofreading Services. Bisa dijelaskan lebih lanjut?",
        "Hi Dinni, I'm interested in your Proofreading Services. Can you explain more?"
      ),
    },
    {
      id: 4,
      icon: "chalkboard-teacher",
      title: t("Corporate Training & Advisory", "Corporate Training & Advisory"),
      subtitle: t("Untuk Organisasi", "For Organizations"),
      description: t(
        "Pelatihan soft-skill dan strategi pengembangan pembelajaran untuk organisasi dan perusahaan.",
        "Soft-skill training and learning development strategy for organizations and companies."
      ),
      features: [
        t("Customized training program", "Customized training program"),
        t("Leadership development", "Leadership development"),
        t("Team building workshop", "Team building workshop"),
        t("Learning strategy consultation", "Learning strategy consultation"),
      ],
      price: t("Hubungi untuk proposal", "Contact for proposal"),
      whatsappText: t(
        "Halo Kak Dinni, saya tertarik dengan layanan Corporate Training & Advisory. Bisa dijelaskan lebih lanjut?",
        "Hi Dinni, I'm interested in your Corporate Training & Advisory service. Can you explain more?"
      ),
    },
  ];

  const whatsappNumber = "62859106531249";

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-gray-900 text-xs font-bold tracking-wider uppercase mb-4">
            {t("LAYANAN", "SERVICES")}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Pilih Layanan yang Sesuai dengan", "Choose Services That Fit Your")}{" "}
            <span className="text-primary-600">{t("Kebutuhanmu", "Needs")}</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "Berbagai layanan mentoring dan pengembangan diri yang dirancang untuk membantu Anda mencapai potensi terbaik.",
              "Various mentoring and self-development services designed to help you reach your best potential."
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Badge for Popular */}
              {service.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <i
                  className={`fas fa-${service.icon} text-2xl text-primary-600 group-hover:text-white transition-colors`}
                ></i>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Subtitle */}
              <p className="text-primary-600 text-sm font-semibold mb-4">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <i className="fas fa-check-circle text-primary-600 mt-1"></i>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <p className="text-lg font-bold text-gray-900 mb-4">
                {service.price}
              </p>

              {/* CTA Button */}
              <a
                href={
                  service.id === 1
                    ? "https://temantransisi.com/mentor-info/19"
                    : `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        service.whatsappText
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/30"
              >
                <span>{t("Tanya Lebih Lanjut", "Ask for More Info")}</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
