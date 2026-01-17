import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * PortfolioCard Component
 * Reusable card component for displaying portfolio items
 *
 * @param {Object} props
 * @param {Object} props.item - Portfolio item data
 * @param {number} props.item.id - Unique identifier
 * @param {string} props.item.title - Title of the portfolio item
 * @param {string} props.item.descriptionId - Indonesian description
 * @param {string} props.item.descriptionEn - English description
 * @param {string[]} props.item.category - Array of categories
 * @param {string[]} props.item.tags - Array of tags
 * @param {string} props.item.image - Image path
 * @param {string} props.item.link - External link
 * @param {boolean} props.item.featured - Featured status
 */
const PortfolioCard = ({ item }) => {
  const { t } = useLanguage();
  const { title, descriptionId, descriptionEn, description, category, tags, image, link } = item;

  // Use new bilingual fields or fallback to old description field
  const itemDescription = descriptionId && descriptionEn 
    ? t(descriptionId, descriptionEn)
    : description;

  // Get primary category for badge
  const primaryCategory = category[0];

  // Category color mapping
  const categoryColors = {
    training: "bg-green-100 text-green-600",
    mentoring: "bg-blue-100 text-blue-600",
    kolaborasi: "bg-purple-100 text-purple-600",
    casestudy: "bg-orange-100 text-orange-600",
    tulisan: "bg-pink-100 text-pink-600",
    "self-help": "bg-purple-100 text-purple-600",
    masters: "bg-indigo-100 text-indigo-600",
    learning: "bg-teal-100 text-teal-600",
  };

  // Category display names
  const categoryLabels = {
    training: "Training",
    mentoring: "Mentoring",
    kolaborasi: "Kolaborasi",
    casestudy: "Case Study",
    tulisan: "Tulisan",
    "self-help": "Self-Help",
    masters: "Masters & LPDP",
    learning: "Learning",
  };

  const categoryColor =
    categoryColors[primaryCategory] || "bg-gray-100 text-gray-600";
  const categoryLabel = categoryLabels[primaryCategory] || primaryCategory;

  // Get icon based on category
  const getCategoryIcon = () => {
    const iconMap = {
      training: "school",
      mentoring: "person",
      kolaborasi: "handshake",
      casestudy: "science",
      tulisan: "article",
      "self-help": "bolt",
      masters: "school",
      learning: "psychology",
    };
    return iconMap[primaryCategory] || "category";
  };

  return (
    <div
      className="portfolio-card-item group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 border border-gray-100"
      data-category={category.join(" ")}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${categoryColor}`}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {itemDescription}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          {/* Tags */}
          <div className="flex items-center gap-1.5">
            <span className="material-icons-round text-base">
              {getCategoryIcon()}
            </span>
            <span className="truncate">{tags.slice(0, 2).join(", ")}</span>
          </div>

          {/* Link */}
          <div className="flex items-center gap-1.5">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="material-icons-round text-base">link</span>
              <span className="hidden sm:inline">View</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
