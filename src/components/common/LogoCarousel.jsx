import React, { useEffect, useRef } from "react";

/**
 * LogoCarousel Component
 * Infinite scrolling carousel for displaying logos
 *
 * @param {Object} props
 * @param {Array} props.logos - Array of logo objects
 * @param {string} props.direction - Scroll direction: 'left' or 'right' (default: 'left')
 * @param {number} props.speed - Animation speed in seconds (default: 40)
 */
const LogoCarousel = ({ logos, direction = "left", speed = 40 }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Pause animation on hover
    const handleMouseEnter = () => {
      carousel.style.animationPlayState = "paused";
    };

    const handleMouseLeave = () => {
      carousel.style.animationPlayState = "running";
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Triple the logos for seamless infinite scroll
  const tripleLogos = [...logos, ...logos, ...logos];

  // Animation direction class
  const animationClass =
    direction === "right" ? "animate-scroll-right" : "animate-scroll-left";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade mask edges for smooth appearance */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

      {/* Carousel track */}
      <div className="flex overflow-hidden py-8">
        <div
          ref={carouselRef}
          className={`flex gap-12 ${animationClass}`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {tripleLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-36 h-16"
            >
              <img
                src={logo.image}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
