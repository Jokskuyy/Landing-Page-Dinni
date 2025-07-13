/**
 * Main JavaScript Module for Dinni Rahmawati Landing Page
 * Organized, modular, and maintainable code structure
 */

// =============================================================================
// IMPORTS & DEPENDENCIES
// =============================================================================
import '../node_modules/flowbite/dist/flowbite.min.js';

// =============================================================================
// CONFIGURATION & CONSTANTS
// =============================================================================
const CONFIG = {
    email: 'dinni.business@gmail.com',
    animations: {
        preloaderDuration: 600,
        fadeOutDuration: 300
    },
    selectors: {
        preloader: '#pre-loader',
        copyEmailButton: '#copyEmail',
        carouselTracks: '.carousel-track'
    }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
const Utils = {
    /**
     * Copy text to clipboard with modern async/await approach
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - Success status
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                tempInput.setSelectionRange(0, 99999);
                const success = document.execCommand('copy');
                document.body.removeChild(tempInput);
                return success;
            }
        } catch (error) {
            console.error('Failed to copy text:', error);
            return false;
        }
    },

    /**
     * Show notification to user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type = 'success') {
        // Create a modern toast notification instead of alert
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.remove('translate-x-full'), 100);
        
        // Animate out and remove
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    },

    /**
     * Smooth scroll to element
     * @param {string} selector - CSS selector of target element
     */
    smoothScrollTo(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// =============================================================================
// COMPONENT MODULES
// =============================================================================

/**
 * Preloader Module
 * Handles loading screen functionality
 */
const Preloader = {
    init() {
        this.element = document.querySelector(CONFIG.selectors.preloader);
        if (!this.element) return;

        this.show();
        this.scheduleHide();
    },

    show() {
        if (window.jQuery) {
            $(this.element).fadeIn(0);
        } else {
            this.element.style.display = 'flex';
            this.element.style.opacity = '1';
        }
    },

    hide() {
        if (window.jQuery) {
            $(this.element).fadeOut(CONFIG.animations.fadeOutDuration);
        } else {
            this.element.style.opacity = '0';
            setTimeout(() => {
                this.element.style.display = 'none';
            }, CONFIG.animations.fadeOutDuration);
        }
    },

    scheduleHide() {
        setTimeout(() => {
            this.hide();
        }, CONFIG.animations.preloaderDuration);
    }
};

/**
 * Email Copy Module
 * Handles email copying functionality with modern UX
 */
const EmailCopy = {
    init() {
        this.button = document.querySelector(CONFIG.selectors.copyEmailButton);
        if (!this.button) return;

        this.bindEvents();
    },

    bindEvents() {
        this.button.addEventListener('click', this.handleCopy.bind(this));
    },

    async handleCopy(event) {
        event.preventDefault();
        
        const success = await Utils.copyToClipboard(CONFIG.email);
        
        if (success) {
            Utils.showNotification('Email berhasil disalin ke clipboard!', 'success');
            this.animateButton();
        } else {
            Utils.showNotification('Gagal menyalin email. Silakan coba lagi.', 'error');
        }
    },

    animateButton() {
        // Add visual feedback to button
        this.button.classList.add('scale-95');
        setTimeout(() => {
            this.button.classList.remove('scale-95');
        }, 150);
    }
};

/**
 * Carousel Module
 * Enhanced carousel functionality with better performance
 */
const Carousel = {
    init() {
        this.tracks = document.querySelectorAll(CONFIG.selectors.carouselTracks);
        if (this.tracks.length === 0) return;

        this.setupCarousels();
        this.bindEvents();
    },

    setupCarousels() {
        this.tracks.forEach((track, index) => {
            // Add unique identifier
            track.dataset.carouselId = `carousel-${index}`;
            
            // Ensure smooth animation by duplicating content if needed
            this.ensureSmoothLoop(track);
        });
    },

    ensureSmoothLoop(track) {
        const items = track.children;
        const minItems = 10; // Minimum items for smooth loop
        
        if (items.length < minItems) {
            const originalItems = Array.from(items);
            const timesToDuplicate = Math.ceil(minItems / originalItems.length);
            
            for (let i = 1; i < timesToDuplicate; i++) {
                originalItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    track.appendChild(clone);
                });
            }
        }
    },

    bindEvents() {
        // Force carousel to never stop - override any potential CSS or JS interference
        this.tracks.forEach(track => {
            // Force animation to always run
            const forceAnimation = () => {
                track.style.animationPlayState = 'running';
                track.style.animationDuration = '30s';
                track.style.animationTimingFunction = 'linear';
                track.style.animationIterationCount = 'infinite';
            };
            
            // Apply initial force
            forceAnimation();
            
            // Override any hover attempts
            track.addEventListener('mouseenter', forceAnimation);
            track.addEventListener('mouseleave', forceAnimation);
            
            // Periodic check to ensure animation is still running
            setInterval(forceAnimation, 1000);
        });
    }
};

/**
 * Intersection Observer Module
 * Handles scroll-based animations and lazy loading
 */
const ScrollAnimations = {
    init() {
        this.setupIntersectionObserver();
    },

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-bottom');
                }
            });
        }, options);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.card, .carousel-container, .section-container');
        animateElements.forEach(el => this.observer.observe(el));
    }
};

// =============================================================================
// APPLICATION INITIALIZATION
// =============================================================================
class App {
    constructor() {
        this.modules = [
            Preloader,
            EmailCopy,
            Carousel,
            ScrollAnimations
        ];
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    }

    startApp() {
        console.log('🚀 Dinni Rahmawati Landing Page - Initialized');
        
        // Initialize all modules
        this.modules.forEach(module => {
            try {
                module.init();
            } catch (error) {
                console.error(`Error initializing module:`, error);
            }
        });

        // Global event listeners
        this.bindGlobalEvents();
    }

    bindGlobalEvents() {
        // Handle smooth scrolling for anchor links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (link) {
                event.preventDefault();
                const target = link.getAttribute('href');
                Utils.smoothScrollTo(target);
            }
        });

        // Handle window resize for responsive adjustments
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Reinitialize carousel if needed
                Carousel.init();
            }, 250);
        });
    }
}

// =============================================================================
// START APPLICATION
// =============================================================================
const app = new App();
app.init();
