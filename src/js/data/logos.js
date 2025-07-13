/**
 * Logo Data Configuration
 * Centralized data management for carousel logos
 */

export const LOGO_DATA = {
  clients: [
    {
      id: 'microsoft',
      name: 'Microsoft',
      logo: './images/logo client/icon-microsoft.svg',
      alt: 'Microsoft Corporation'
    },
    {
      id: 'glints',
      name: 'Glints',
      logo: './images/logo client/icon-glints.svg',
      alt: 'Glints - Career Platform'
    },
    {
      id: 'shift-academy',
      name: 'Shift Academy',
      logo: './images/logo client/icon-shift-academy.svg',
      alt: 'Shift Academy'
    },
    {
      id: 'tanoto',
      name: 'Tanoto Foundation',
      logo: './images/logo client/icon-tanoto.svg',
      alt: 'Tanoto Foundation'
    },
    {
      id: 'paragon',
      name: 'Paragon',
      logo: './images/logo client/icon-paragon.svg',
      alt: 'Paragon Corporation'
    },
    {
      id: 'baitul-maal',
      name: 'Yayasan Baitul Maal',
      logo: './images/logo client/icon-yayasan-baitul-maal.svg',
      alt: 'Yayasan Baitul Maal'
    }
  ],
  universities: [
    {
      id: 'columbia',
      name: 'Columbia University',
      logo: './images/logo univ/Columbia.svg',
      alt: 'Columbia University',
      location: 'New York, USA'
    },
    {
      id: 'cornell',
      name: 'Cornell University',
      logo: './images/logo univ/Cornell.svg',
      alt: 'Cornell University',
      location: 'Ithaca, USA'
    },
    {
      id: 'ucl',
      name: 'University College London',
      logo: './images/logo univ/UCL.svg',
      alt: 'University College London',
      location: 'London, UK'
    },
    {
      id: 'melbourne',
      name: 'University of Melbourne',
      logo: './images/logo univ/Melbourne.svg',
      alt: 'University of Melbourne',
      location: 'Melbourne, Australia'
    },
    {
      id: 'insead',
      name: 'INSEAD',
      logo: './images/logo univ/Insead.svg',
      alt: 'INSEAD Business School',
      location: 'France/Singapore'
    }
  ]
};

/**
 * Generate carousel items HTML
 * @param {Array} logos - Array of logo objects
 * @param {number} duplicates - Number of times to duplicate for smooth loop
 * @returns {string} HTML string for carousel items
 */
export function generateCarouselItems(logos, duplicates = 2) {
  let html = '';
  
  for (let i = 0; i < duplicates; i++) {
    logos.forEach(logo => {
      html += `
        <div class="carousel-item">
          <img 
            src="${logo.logo}" 
            alt="${logo.alt}" 
            class="logo-item"
            title="${logo.name}${logo.location ? ' - ' + logo.location : ''}"
            loading="lazy"
          >
        </div>
      `;
    });
  }
  
  return html;
}
