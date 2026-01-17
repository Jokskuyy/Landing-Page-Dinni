import React from "react";

/**
 * Services Section Component
 * Display available services with cards
 */
const Services = () => {
  const services = [
    {
      id: 1,
      icon: "user-tie",
      title: "Career Mentoring",
      badge: "Popular",
      subtitle: "Sesi Personal 1-on-1",
      description:
        "Sesi mentoring personal untuk membantu Anda mencapai tujuan karier, transisi karier (resign/promosi), dan menemukan kejelasan arah profesional.",
      features: [
        "Konsultasi 60-90 menit per sesi",
        "Personalized career roadmap",
        "CV & LinkedIn review",
        "Interview preparation",
      ],
      price: "Mulai dari Rp 350.000",
      whatsappText:
        "Halo Kak Dinni, saya tertarik dengan layanan Career Mentoring. Bisa dijelaskan lebih lanjut?",
    },
    {
      id: 2,
      icon: "graduation-cap",
      title: "Scholarship & Master's Mentoring",
      subtitle: "Beasiswa & Studi Lanjut",
      description:
        "Panduan lengkap untuk aplikasi beasiswa dan universitas top dunia, termasuk brainstorming, CV/essay review, dan mock interview.",
      features: [
        "Essay & SoP brainstorming",
        "CV & motivation letter review",
        "Mock interview practice",
        "University selection strategy",
      ],
      price: "Mulai dari Rp 500.000",
      whatsappText:
        "Halo Kak Dinni, saya tertarik dengan layanan Scholarship & Master's Mentoring. Bisa dijelaskan lebih lanjut?",
    },
    {
      id: 3,
      icon: "file-alt",
      title: "Proofreading Services",
      subtitle: "Review Dokumen",
      description:
        "Layanan review dokumen profesional untuk aplikasi, essay, proposal, dan dokumen penting lainnya.",
      features: [
        "Grammar & structure check",
        "Clarity improvement",
        "Formatting review",
        "Fast turnaround",
      ],
      price: "Mulai dari Rp 150.000",
      whatsappText:
        "Halo Kak Dinni, saya tertarik dengan layanan Proofreading Services. Bisa dijelaskan lebih lanjut?",
    },
    {
      id: 4,
      icon: "chalkboard-teacher",
      title: "Corporate Training & Advisory",
      subtitle: "Untuk Organisasi",
      description:
        "Pelatihan soft-skill dan strategi pengembangan pembelajaran untuk organisasi dan perusahaan.",
      features: [
        "Customized training program",
        "Leadership development",
        "Team building workshop",
        "Learning strategy consultation",
      ],
      price: "Hubungi untuk proposal",
      whatsappText:
        "Halo Kak Dinni, saya tertarik dengan layanan Corporate Training & Advisory. Bisa dijelaskan lebih lanjut?",
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
            LAYANAN
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Layanan yang Sesuai dengan{" "}
            <span className="text-primary-600">Kebutuhanmu</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berbagai layanan mentoring dan pengembangan diri yang dirancang
            untuk membantu Anda mencapai potensi terbaik.
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
                href={service.id === 1 ? "https://temantransisi.com/mentor-info/19" : `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  service.whatsappText
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/30"
              >
                <span>Tanya Lebih Lanjut</span>
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
