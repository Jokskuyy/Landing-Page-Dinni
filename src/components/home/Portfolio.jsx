import React, { useState, useMemo } from 'react';
import PortfolioFilter from '@components/portfolio/PortfolioFilter';
import PortfolioCard from '@components/portfolio/PortfolioCard';
import { portfolioItems, getPortfolioByCategory, portfolioStats } from '@data/portfolioData';

/**
 * Portfolio Section Component
 * Main portfolio section with filtering and grid display
 */
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  // Filtered portfolio items with useMemo for performance
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
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
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <span className="material-icons-round text-primary-600 text-lg">
              work
            </span>
            <span className="text-primary-600 font-semibold text-sm">
              Portfolio
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Karya & Kontribusi Saya
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kumpulan portfolio dari berbagai program training, mentoring, kolaborasi, 
            case study, dan tulisan yang telah saya kerjakan
          </p>

          {/* Portfolio Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="material-icons-round text-primary-600">
                inventory_2
              </span>
              <span className="text-gray-600 text-sm">
                <strong className="text-gray-900 font-bold">{portfolioStats.total}</strong> Total Portfolio
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="material-icons-round text-green-600">
                school
              </span>
              <span className="text-gray-600 text-sm">
                <strong className="text-gray-900 font-bold">{portfolioStats.training}</strong> Training
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="material-icons-round text-pink-600">
                article
              </span>
              <span className="text-gray-600 text-sm">
                <strong className="text-gray-900 font-bold">{portfolioStats.tulisan}</strong> Tulisan
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Filter */}
        <div data-aos="fade-up" data-aos-delay="100">
          <PortfolioFilter 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* Portfolio Grid */}
        <div 
          id="portfolio-grid"
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
            transition-opacity duration-300
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <span className="material-icons-round text-gray-300 text-6xl mb-4">
                search_off
              </span>
              <p className="text-gray-500 text-lg">
                Tidak ada portfolio untuk kategori ini
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12" data-aos="fade-up">
            <p className="text-gray-600">
              Menampilkan <strong className="text-primary-600 font-bold">{filteredItems.length}</strong> dari {portfolioStats.total} portfolio
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Tertarik Berkolaborasi?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Saya terbuka untuk diskusi mengenai training, mentoring, atau kolaborasi lainnya. 
              Mari berdiskusi bagaimana kita bisa bekerja sama!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-600/30 hover:-translate-y-0.5"
            >
              <span className="material-icons-round">
                mail
              </span>
              <span>Hubungi Saya</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
