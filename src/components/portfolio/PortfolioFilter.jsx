import React from "react";

/**
 * PortfolioFilter Component
 * Glassmorphism filter buttons for portfolio items by category
 *
 * @param {Object} props
 * @param {string} props.activeFilter - Currently active filter category
 * @param {Function} props.onFilterChange - Callback when filter changes
 */
const PortfolioFilter = ({ activeFilter, onFilterChange }) => {
  // Filter button configuration - simplified to match reference
  const filterButtons = [
    { category: "all", label: "Semua" },
    { category: "training", label: "Training" },
    { category: "mentoring", label: "Mentoring" },
    { category: "kolaborasi", label: "Kolaborasi" },
    { category: "casestudy", label: "Case Study" },
    { category: "tulisan", label: "Tulisan" },
  ];

  const handleFilterClick = (category) => {
    onFilterChange(category);
  };

  return (
    <>
      {filterButtons.map((button) => (
        <button
          key={button.category}
          onClick={() => handleFilterClick(button.category)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeFilter === button.category
              ? "shadow-lg bg-white text-blue-700 scale-105 ring-4 ring-blue-500/20"
              : "text-white btn-glass hover:bg-white/20"
          }`}
        >
          {button.label}
        </button>
      ))}
    </>
  );
};

export default PortfolioFilter;
