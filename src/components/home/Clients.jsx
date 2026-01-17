import React from "react";
import LogoCarousel from "@components/common/LogoCarousel";
import { clientLogos, universityLogos } from "@data/logosData";

/**
 * Clients Section Component
 * Displays trusted clients and university network with infinite scroll carousels
 */
const Clients = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20 space-y-6" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Dipercaya oleh{" "}
            <span className="text-primary-600">Organisasi Terkemuka</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kolaborasi dengan para pemimpin industri dan lulusan dari institusi
            kelas dunia
          </p>
        </div>

        {/* Clients Carousel */}
        <div className="mb-20" data-aos="fade-up" data-aos-delay="100">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
              Dipercaya oleh Organisasi Terkemuka
            </p>
          </div>

          <LogoCarousel logos={clientLogos} direction="left" speed={40} />
        </div>

        {/* Universities Carousel */}
        <div data-aos="fade-up" data-aos-delay="200">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
              Jaringan Alumni dari Universitas Terkemuka
            </p>
          </div>

          <LogoCarousel logos={universityLogos} direction="right" speed={35} />
        </div>
      </div>
    </section>
  );
};

export default Clients;
