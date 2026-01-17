import React from 'react';

/**
 * TestimonialCard Component
 * Reusable card component for displaying testimonials
 * 
 * @param {Object} props
 * @param {Object} props.testimonial - Testimonial data
 * @param {number} props.testimonial.id - Unique identifier
 * @param {string} props.testimonial.name - Name of the person
 * @param {string} props.testimonial.title - Job title or achievement
 * @param {string} props.testimonial.category - Category (Beasiswa, Mentoring, etc.)
 * @param {string} props.testimonial.categoryIcon - Font Awesome icon name
 * @param {string} props.testimonial.categoryStyle - Style variant (primary, dark, white-border)
 * @param {number} props.testimonial.rating - Rating (1-5)
 * @param {string} props.testimonial.text - Testimonial text
 */
const TestimonialCard = ({ testimonial }) => {
  const { name, title, category, categoryIcon, categoryStyle, rating, text } = testimonial;

  // Category badge styles
  const badgeStyles = {
    'white-border': 'bg-white border-2 border-gray-200 text-gray-700',
    'primary': 'bg-primary-600 text-white',
    'dark': 'bg-gray-700 text-white',
  };

  const badgeClass = badgeStyles[categoryStyle] || badgeStyles.primary;

  // Generate stars based on rating
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star text-sm ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300 min-h-[340px] flex flex-col border border-gray-100">
      {/* Quote Icon & Badge */}
      <div className="flex items-start justify-between mb-3">
        {/* Quote Icon */}
        <svg 
          className="w-10 h-10 text-gray-200 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v8h8v-8h-4c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v8h8v-8h-4c0-2.2 1.8-4 4-4V8z"/>
        </svg>

        {/* Category Badge */}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${badgeClass}`}>
          <i className={`fas fa-${categoryIcon} text-[10px]`} aria-hidden="true"></i>
          <span>{category}</span>
        </span>
      </div>

      {/* Stars Rating */}
      <div className="flex gap-1 mb-3" aria-label={`Rating: ${rating} out of 5 stars`}>
        {renderStars()}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
        "{text}"
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-3 mt-auto">
        <p className="font-bold text-gray-900 mb-1">{name}</p>
        <p className="text-sm text-primary-600">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
