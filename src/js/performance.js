/**
 * Performance Optimization Utilities
 * Lazy loading, prefetching, and resource optimization
 */

(function() {
  'use strict';
  
  /**
   * Lazy load images with Intersection Observer
   */
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    if (images.length === 0) return;
    
    // Native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
      return;
    }
    
    // Fallback: Intersection Observer
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback: Load all images
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }
  }
  
  /**
   * Preload critical resources
   */
  function preloadCriticalResources() {
    const criticalResources = [
      { href: './output.css', as: 'style' },
      { href: './images/logo-web.png', as: 'image' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }
  
  /**
   * Prefetch next page resources on hover
   */
  function setupPrefetching() {
    const links = document.querySelectorAll('a[href^="./"], a[href^="/"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = href;
          document.head.appendChild(prefetch);
        }
      }, { once: true, passive: true });
    });
  }
  
  /**
   * Defer non-critical CSS
   */
  function deferNonCriticalCSS() {
    const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    
    deferredStyles.forEach(link => {
      link.media = 'print';
      link.onload = function() {
        this.media = 'all';
      };
    });
  }
  
  /**
   * Resource hints for external resources
   */
  function addResourceHints() {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];
    
    hints.forEach(hint => {
      if (!document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });
  }
  
  /**
   * Optimize font loading
   */
  function optimizeFontLoading() {
    // Add font-display: swap to Google Fonts
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      if (!link.href.includes('display=')) {
        link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
      }
    });
  }
  
  /**
   * Debounce function for performance
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Throttle function for performance
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Reduce motion for accessibility
   */
  function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      
      // Disable animations
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach(el => {
        el.style.animation = 'none';
      });
    }
  }
  
  /**
   * Monitor performance
   */
  function monitorPerformance() {
    if (!('performance' in window)) return;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        // Log performance metrics (can be sent to analytics)
        console.log('Performance Metrics:', {
          pageLoadTime: `${pageLoadTime}ms`,
          connectTime: `${connectTime}ms`,
          renderTime: `${renderTime}ms`
        });
        
        // Web Vitals (if available)
        if ('PerformanceObserver' in window) {
          // LCP - Largest Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // FID - First Input Delay
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              console.log('FID:', entry.processingStart - entry.startTime);
            });
          }).observe({ entryTypes: ['first-input'] });
          
          // CLS - Cumulative Layout Shift
          let clsScore = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsScore += entry.value;
              }
            }
            console.log('CLS:', clsScore);
          }).observe({ entryTypes: ['layout-shift'] });
        }
      }, 0);
    });
  }
  
  /**
   * Initialize all optimizations
   */
  function init() {
    // Run immediately
    addResourceHints();
    optimizeFontLoading();
    respectReducedMotion();
    
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        lazyLoadImages();
        deferNonCriticalCSS();
        setupPrefetching();
        monitorPerformance();
      });
    } else {
      lazyLoadImages();
      deferNonCriticalCSS();
      setupPrefetching();
      monitorPerformance();
    }
  }
  
  // Export utilities
  window.PerformanceUtils = {
    debounce,
    throttle,
    lazyLoadImages,
    preloadCriticalResources
  };
  
  // Auto-initialize
  init();
  
})();
