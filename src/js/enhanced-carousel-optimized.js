/**
 * Optimized Enhanced Carousel - Lightweight & Performance-Focused
 * Ultra-optimized seamless loop with minimal DOM operations
 */

(function() {
  'use strict';
  
  // Cache DOM queries
  const carousels = new Map();
  
  /**
   * Initialize carousel with seamless loop
   */
  function initCarousel(container) {
    const track = container.querySelector('.enhanced-carousel-track');
    if (!track) return;
    
    // Get original items
    const items = Array.from(track.querySelectorAll('.enhanced-carousel-item'));
    if (items.length === 0) return;
    
    // Create optimized structure
    const fragment = document.createDocumentFragment();
    const original = document.createElement('div');
    const duplicate = document.createElement('div');
    
    original.className = 'carousel-content-original';
    duplicate.className = 'carousel-content-duplicate';
    
    // Clone items efficiently
    items.forEach(item => {
      original.appendChild(item.cloneNode(true));
      duplicate.appendChild(item.cloneNode(true));
    });
    
    fragment.appendChild(original);
    fragment.appendChild(duplicate);
    
    // Replace track content in one operation
    track.innerHTML = '';
    track.appendChild(fragment);
    
    // Set dynamic duration based on item count
    const duration = Math.max(20, items.length * 5);
    track.style.setProperty('--carousel-duration', `${duration}s`);
    
    return track;
  }
  
  /**
   * Setup hover controls with event delegation
   */
  function setupControls(container, track) {
    let isHovered = false;
    
    container.addEventListener('mouseenter', () => {
      if (!isHovered) {
        isHovered = true;
        track.style.animationPlayState = 'paused';
      }
    }, { passive: true });
    
    container.addEventListener('mouseleave', () => {
      if (isHovered) {
        isHovered = false;
        track.style.animationPlayState = 'running';
      }
    }, { passive: true });
  }
  
  /**
   * Setup intersection observer for performance
   */
  function setupObserver(containers) {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const track = entry.target.querySelector('.enhanced-carousel-track');
        if (track) {
          track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    containers.forEach(container => observer.observe(container));
  }
  
  /**
   * Main initialization
   */
  function init() {
    const containers = document.querySelectorAll('.enhanced-carousel-container');
    if (containers.length === 0) return;
    
    // Initialize all carousels
    containers.forEach(container => {
      const track = initCarousel(container);
      if (track) {
        setupControls(container, track);
        carousels.set(container, track);
      }
    });
    
    // Setup intersection observer
    setupObserver(containers);
    
    // Optional: Keyboard controls
    setupKeyboardControls();
  }
  
  /**
   * Keyboard controls (Space to pause/play)
   */
  function setupKeyboardControls() {
    let spacePressed = false;
    
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body && !spacePressed) {
        e.preventDefault();
        spacePressed = true;
        
        carousels.forEach(track => {
          const state = track.style.animationPlayState;
          track.style.animationPlayState = state === 'paused' ? 'running' : 'paused';
        });
      }
    }, { passive: false });
    
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        spacePressed = false;
      }
    }, { passive: true });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
