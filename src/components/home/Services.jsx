import React from 'react';

/**
 * Services Section Component
 * Display available services with cards
 */
const Services = () => {
  const services = [
    {
      id: 1,
      icon: 'user-tie',
      title: 'Career Mentoring',
      description:
        'Sesi mentoring personal untuk membantu Anda mencapai tujuan karier, transisi karier (resign/promosi), dan menemukan kejelasan arah profesional.',
      features: [
        'Career direction & goal clarity',
        'Resume & LinkedIn optimization',
        'Interview preparation',
        'Career transition strategy',
      ],
      whatsappText:
        'Halo Kak Dinni, saya tertarik dengan layanan Career Mentoring. Bisa dijelaskan lebih lanjut?',
    },
    {
      id: 2,
      icon: 'graduation-cap',
      title: "Scholarship & Master's Mentoring",
      description:
        'Bimbingan lengkap untuk aplikasi beasiswa dan admission universitas luar negeri, dari brainstorming hingga interview.',
      features: [
        'Essay & motivation letter review',
        'University selection strategy',
        'Mock interview preparation',
        'Application timeline planning',
      ],
      whatsappText:
        "Halo Kak Dinni, saya tertarik dengan layanan Scholarship & Master's Mentoring. Bisa dijelaskan lebih lanjut?",
    },
    {
      id: 3,
      icon: 'file-alt',
      title: 'Proofreading Services',
      description:
        'Layanan review dokumen profesional untuk aplikasi, essay, proposal, dan dokumen penting lainnya.',
      features: [
        'Grammar & spelling check',
        'Structure & flow improvement',
        'Content clarity enhancement',
        'Professional formatting',
      ],
      whatsappText:
        'Halo Kak Dinni, saya tertarik dengan layanan Proofreading Services. Bisa dijelaskan lebih lanjut?',
    },
    {
      id: 4,
      icon: 'chalkboard-teacher',
      title: 'Corporate Training',
      description:
        'Program training korporat yang disesuaikan dengan kebutuhan organisasi untuk meningkatkan soft skills dan produktivitas tim.',
      features: [
        'Customized training modules',
        'Interactive workshops',
        'Team building activities',
        'Post-training support',
      ],
      whatsappText:
        'Halo Kak Dinni, saya tertarik dengan layanan Corporate Training. Bisa dijelaskan lebih lanjut?',
    },
  ];

  const whatsappNumber = '62859106531249';

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <span className="material-icons-round text-primary-600 text-lg">
              business_center
            </span>
            <span className="text-primary-600 font-semibold text-sm">
              LAYANAN
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Layanan yang Sesuai dengan{' '}
            <span className="text-primary-600">Kebutuhanmu</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berbagai layanan mentoring dan pengembangan diri yang dirancang untuk
            membantu Anda mencapai potensi terbaik.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <i
                  className={`fas fa-${service.icon} text-2xl text-primary-600 group-hover:text-white transition-colors`}
                ></i>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <i className="fas fa-check-circle text-primary-600 mt-1"></i>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  service.whatsappText
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/30"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
