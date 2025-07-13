/**
 * Utility Functions Module
 * Reusable helper functions for the application
 */

/**
 * DOM Utilities
 */
export const DOM = {
  /**
   * Select single element
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {Element|null}
   */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * Select multiple elements
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {NodeList}
   */
  $$(selector, context = document) {
    return context.querySelectorAll(selector);
  },

  /**
   * Create element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} content - Inner HTML content
   * @returns {Element}
   */
  create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      element.innerHTML = content;
    }
    
    return element;
  },

  /**
   * Add event listener with optional delegation
   * @param {Element|string} target - Target element or selector
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {string} delegate - Delegate selector (optional)
   */
  on(target, event, handler, delegate = null) {
    const element = typeof target === 'string' ? this.$(target) : target;
    if (!element) return;

    if (delegate) {
      element.addEventListener(event, (e) => {
        const delegateTarget = e.target.closest(delegate);
        if (delegateTarget) {
          handler.call(delegateTarget, e);
        }
      });
    } else {
      element.addEventListener(event, handler);
    }
  }
};

/**
 * Animation Utilities
 */
export const Animation = {
  /**
   * Fade in element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  fadeIn(element, duration = 300) {
    return new Promise((resolve) => {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.opacity = Math.min(progress, 1);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      }
      
      requestAnimationFrame(animate);
    });
  },

  /**
   * Fade out element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  fadeOut(element, duration = 300) {
    return new Promise((resolve) => {
      let start = null;
      const initialOpacity = parseFloat(getComputedStyle(element).opacity);
      
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.opacity = initialOpacity * (1 - Math.min(progress, 1));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
          resolve();
        }
      }
      
      requestAnimationFrame(animate);
    });
  },

  /**
   * Slide up element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  slideUp(element, duration = 300) {
    return new Promise((resolve) => {
      const height = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.transition = `height ${duration}ms ease-out`;
      element.style.height = height + 'px';
      
      requestAnimationFrame(() => {
        element.style.height = '0px';
        setTimeout(() => {
          element.style.display = 'none';
          element.style.removeProperty('height');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition');
          resolve();
        }, duration);
      });
    });
  }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @param {boolean} immediate - Execute immediately
 * @returns {Function}
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function}
 */
export function throttle(func, limit) {
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
 * Check if element is in viewport
 * @param {Element} element - Target element
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean}
 */
export function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const elementHeight = rect.bottom - rect.top;
  const elementWidth = rect.right - rect.left;
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = elementHeight * elementWidth;
  
  return (visibleArea / totalArea) >= threshold;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix
 * @returns {string}
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat('id-ID', { ...defaultOptions, ...options })
    .format(new Date(date));
}
