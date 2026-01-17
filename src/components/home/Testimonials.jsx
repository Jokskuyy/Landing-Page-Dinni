import React, { useState, useMemo } from "react";
import TestimonialCard from "@components/testimonials/TestimonialCard";
import { testimonials, testimonialStats } from "@data/testimonialsData";

/**
 * Testimonials Section Component
 * Main testimonials section with pagination
 */
const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Get current page testimonials
  const currentTestimonials = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  }, [currentPage]);

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section id="testimonies" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-accent-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <p className="text-gray-900 text-xs font-bold tracking-wider uppercase mb-4">
            TESTIMONI
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Apa Kata Mereka?
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Cerita sukses dari ratusan mentee dan peserta training yang telah
            mencapai goals mereka.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {currentTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="animate-fadeIn">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div
          className="flex items-center justify-center gap-4 mt-8"
          data-aos="fade-up"
        >
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-xl font-semibold transition-all hover:shadow-md border border-gray-200"
            aria-label="Previous page"
          >
            <span className="material-icons-round text-lg">chevron_left</span>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === index
                    ? "bg-primary-600 w-8"
                    : "bg-gray-300 hover:bg-primary-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
                aria-current={currentPage === index ? "page" : undefined}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-xl font-semibold transition-all hover:shadow-md border border-gray-200"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="material-icons-round text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
