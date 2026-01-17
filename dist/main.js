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
 * Carousel Module - Enhanced with more duplicates and faster initial speed
 * Maintains original styling while improving functionality
 */
const Carousel = {
    init() {
        this.containers = document.querySelectorAll('.carousel-container');
        if (this.containers.length === 0) return;

        this.setupCarousels();
        this.injectStyles();
    },

    setupCarousels() {
        this.containers.forEach((container, index) => {
            const track = container.querySelector('.carousel-track');
            if (!track) return;

            // Get original items
            const originalItems = Array.from(track.children);
            const itemCount = originalItems.length;
            
            if (itemCount === 0) return;

            // Determine carousel type based on class or position
            const isAlumniCarousel = track.classList.contains('animate-scroll-reverse');
            const carouselType = isAlumniCarousel ? 'alumni' : 'clients';
            
            console.log(`Setting up ${carouselType} carousel with ${itemCount} items`);

            // Clear track
            track.innerHTML = '';
            
            // Create sets for seamless looping - different for each type
            const setsToCreate = isAlumniCarousel ? 6 : 4; // More sets for alumni (fewer items)
            for (let setIndex = 0; setIndex < setsToCreate; setIndex++) {
                originalItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    track.appendChild(clone);
                });
            }

            // Calculate dimensions based on carousel-item structure
            const isDesktop = window.innerWidth >= 768;
            const itemWidth = isDesktop ? 280 + 64 : 220 + 48; // width + gap (carousel-item + margin)
            const singleSetWidth = itemWidth * itemCount;
            
            // Set track width for all sets
            track.style.width = `${singleSetWidth * setsToCreate}px`;
            
            // Apply CSS class for animation with specific type
            if (isAlumniCarousel) {
                track.classList.add('animate-scroll-reverse-enhanced');
                track.classList.add('carousel-alumni');
            } else {
                track.classList.add('animate-scroll-enhanced');
                track.classList.add('carousel-clients');
            }
            
            // Store data for keyframes generation
            track.dataset.itemCount = itemCount;
            track.dataset.itemWidth = itemWidth;
            track.dataset.singleSetWidth = singleSetWidth;
            track.dataset.isReverse = isAlumniCarousel;
            track.dataset.carouselType = carouselType;
            track.dataset.setsCount = setsToCreate;
        });
    },

    injectStyles() {
        // Remove existing carousel styles
        const existingStyle = document.querySelector('#carousel-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        // Get both carousel tracks to determine individual configurations
        const clientsTrack = document.querySelector('.carousel-clients');
        const alumniTrack = document.querySelector('.carousel-alumni');
        
        if (!clientsTrack && !alumniTrack) return;

        // Default values for fallback
        let clientsWidth = 3440; // Default for 10 items
        let alumniWidth = 2064;  // Default for 6 items
        
        // Get actual dimensions if tracks exist
        if (clientsTrack) {
            const itemCount = parseInt(clientsTrack.dataset.itemCount || 10);
            const itemWidth = parseInt(clientsTrack.dataset.itemWidth || 344);
            clientsWidth = itemWidth * itemCount;
        }
        
        if (alumniTrack) {
            const itemCount = parseInt(alumniTrack.dataset.itemCount || 6);
            const itemWidth = parseInt(alumniTrack.dataset.itemWidth || 344);
            alumniWidth = itemWidth * itemCount;
        }

        // Create style element with separated keyframes for each carousel type
        const style = document.createElement('style');
        style.id = 'carousel-styles';
        style.textContent = `
            /* Clients Carousel - 10 items, medium speed */
            @keyframes scroll-clients {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${clientsWidth}px);
                }
            }
            
            /* Alumni Carousel - 6 items, optimized speed */
            @keyframes scroll-alumni {
                0% {
                    transform: translateX(-${alumniWidth}px);
                }
                100% {
                    transform: translateX(0);
                }
            }
            
            /* Clients Animation - 30s for balanced viewing */
            .carousel-clients.animate-scroll-enhanced {
                animation: scroll-clients 30s linear infinite;
                animation-play-state: running !important;
            }
            
            /* Alumni Animation - 60s for relaxed viewing of 6 items */
            .carousel-alumni.animate-scroll-reverse-enhanced {
                animation: scroll-alumni 60s linear infinite;
                animation-play-state: running !important;
                animation-delay: -20s;
            }
            
            /* Fallback for enhanced classes */
            .animate-scroll-enhanced:not(.carousel-clients) {
                animation: scroll-clients 30s linear infinite;
                animation-play-state: running !important;
            }
            
            .animate-scroll-reverse-enhanced:not(.carousel-alumni) {
                animation: scroll-alumni 60s linear infinite;
                animation-play-state: running !important;
                animation-delay: -20s;
            }
            
            /* Force continuous animation */
            .carousel-track {
                animation-play-state: running !important;
                will-change: transform;
            }
            
            .carousel-track:hover {
                animation-play-state: running !important;
            }
            
            /* Ensure smooth transitions */
            .carousel-item {
                margin-left: 1rem;
                margin-right: 1rem;
                flex-shrink: 0;
            }
            
            @media (min-width: 768px) {
                .carousel-item {
                    margin-left: 2rem;
                    margin-right: 2rem;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Debug info
        console.log('🎠 Carousel Configuration:', {
            clients: { width: clientsWidth, duration: '30s', items: clientsTrack?.dataset.itemCount || 'unknown' },
            alumni: { width: alumniWidth, duration: '60s', items: alumniTrack?.dataset.itemCount || 'unknown' }
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
