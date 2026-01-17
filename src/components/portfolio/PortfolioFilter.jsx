import React from "react";
import { portfolioCategories } from "@data/portfolioData";

/**
 * PortfolioFilter Component
 * Filter buttons for portfolio items by category
 *
 * @param {Object} props
 * @param {string} props.activeFilter - Currently active filter category
 * @param {Function} props.onFilterChange - Callback when filter changes
 */
const PortfolioFilter = ({ activeFilter, onFilterChange }) => {
  // Filter button configuration
  const filterButtons = [
    {
      category: "all",
      label: "Semua Portfolio",
      icon: "apps",
      description: "Tampilkan semua",
    },
    {
      category: "training",
      label: "Training & Workshop",
      icon: "school",
      description: "Program pelatihan",
    },
    {
      category: "mentoring",
      label: "Mentoring",
      icon: "person",
      description: "Bimbingan personal",
    },
    {
      category: "kolaborasi",
      label: "Kolaborasi",
      icon: "handshake",
      description: "Partnership & kolaborasi",
    },
    {
      category: "casestudy",
      label: "Case Study",
      icon: "science",
      description: "Riset & analisis",
    },
    {
      category: "tulisan",
      label: "Tulisan",
      icon: "article",
      description: "Blog & artikel",
    },
  ];

  const handleFilterClick = (category) => {
    onFilterChange(category);

    // Smooth scroll to portfolio grid after filter
    setTimeout(() => {
      const portfolioGrid = document.getElementById("portfolio-grid");
      if (portfolioGrid) {
        const offset = 100; // Offset for fixed header
        const elementPosition = portfolioGrid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center mb-12">
      {/* Filter Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Filter Portfolio
        </h3>
        <p className="text-gray-600">
          Pilih kategori untuk melihat portfolio yang spesifik
        </p>
      </div>

      {/* Filter Buttons - Desktop */}
      <div className="hidden lg:flex flex-wrap justify-center gap-3">
        {filterButtons.map(({ category, label, icon, description }) => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`
              group relative flex items-center gap-2.5 px-6 py-3 rounded-xl
              font-semibold text-sm transition-all duration-300
              ${
                activeFilter === category
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300 hover:shadow-md"
              }
            `}
            aria-label={`Filter by ${label}`}
            title={description}
          >
            <span className="material-icons-round text-xl">{icon}</span>
            <span>{label}</span>

            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {description}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Buttons - Mobile/Tablet (Dropdown Style) */}
      <div className="lg:hidden w-full max-w-md px-4">
        <div className="relative">
          <select
            value={activeFilter}
            onChange={(e) => handleFilterClick(e.target.value)}
            className="w-full px-4 py-3 pr-10 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          >
            {filterButtons.map(({ category, label }) => (
              <option key={category} value={category}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="material-icons-round text-gray-500">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter !== "all" && (
        <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg text-primary-700 text-sm font-medium">
          <span className="material-icons-round text-base">filter_list</span>
          <span>
            Menampilkan:{" "}
            {filterButtons.find((f) => f.category === activeFilter)?.label}
          </span>
          <button
            onClick={() => handleFilterClick("all")}
            className="ml-2 hover:bg-primary-100 rounded-full p-1 transition-colors"
            aria-label="Clear filter"
          >
            <span className="material-icons-round text-base">close</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioFilter;
