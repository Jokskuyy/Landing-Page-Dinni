import React, { useState, useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import PortfolioFilter from "@components/portfolio/PortfolioFilter";
import PortfolioCard from "@components/portfolio/PortfolioCard";
import {
  portfolioItems,
  getPortfolioByCategory,
  portfolioStats,
} from "@data/portfolioData";

/**
 * Portfolio Section Component
 * Main portfolio section with filtering and grid display
 */
const Portfolio = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAnimating, setIsAnimating] = useState(false);

  // Filtered portfolio items with useMemo for performance
  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return portfolioItems;
    }
    return getPortfolioByCategory(activeFilter);
  }, [activeFilter]);

  // Handle filter change with animation
  const handleFilterChange = (category) => {
    if (category === activeFilter) return;

    // Trigger exit animation
    setIsAnimating(true);

    // Change filter after animation starts
    setTimeout(() => {
      setActiveFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section
      id="portfolio"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 via-blue-700 to-blue-900"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4" data-aos="fade-up">
          <p className="text-white text-xs font-bold tracking-wider uppercase">
            Portfolio
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t("Pengalaman &", "Experience &")}{" "}
            <span className="text-primary">
              {t("Track Record", "Track Record")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-lg md:text-xl font-light leading-relaxed">
            {t(
              "Berbagai program training, mentoring, kolaborasi, case study, dan tulisan yang telah saya lakukan dengan berbagai organisasi dan individu.",
              "Various training programs, mentoring, collaborations, case studies, and writings I have done with various organizations and individuals."
            )}
          </p>
        </div>

        {/* Portfolio Filter */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <PortfolioFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Portfolio Grid */}
        <div
          id="portfolio-grid"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <span className="material-icons-round text-blue-300 text-6xl mb-4">
                search_off
              </span>
              <p className="text-blue-100 text-lg">
                {t(
                  "Tidak ada portfolio untuk kategori ini",
                  "No portfolio items for this category"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
