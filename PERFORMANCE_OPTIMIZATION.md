# Phase 15: Performance Optimization Guide

## Overview
This document outlines performance optimization strategies for the React-based landing page. Target: Achieve Google Core Web Vitals thresholds and minimize bundle size.

## Performance Targets (Core Web Vitals)

### Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s ✅ Target
- **FID (First Input Delay)**: < 100ms ✅ Target  
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅ Target
- **FCP (First Contentful Paint)**: < 1.8s 🎯 Bonus
- **TTI (Time to Interactive)**: < 3.8s 🎯 Bonus

### Bundle Size Targets
- **JavaScript Bundle**: < 150 KB gzipped
- **CSS Bundle**: < 50 KB gzipped
- **Total Page Weight**: < 500 KB (first load)
- **Images**: Lazy loaded, WebP format preferred

---

## 1. Code Splitting & Lazy Loading

### Implement React.lazy for Routes
Currently single-page, but can split heavy components:

\`\`\`jsx
// App.jsx - Lazy load heavy sections
import { lazy, Suspense } from 'react';

const Portfolio = lazy(() => import('./components/home/Portfolio'));
const Testimonials = lazy(() => import('./components/home/Testimonials'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Portfolio />
      <Testimonials />
    </Suspense>
  );
}
\`\`\`

### Lazy Load Images
Replace `<img>` tags with lazy loading:

\`\`\`jsx
// PortfolioCard.jsx - Add loading="lazy"
<img 
  src={image} 
  alt={title} 
  loading="lazy"
  className="w-full h-48 object-cover"
/>
\`\`\`

### Dynamic Imports for Heavy Libraries
If using heavy libraries (Chart.js, etc.), load on-demand:

\`\`\`jsx
const handleShowChart = async () => {
  const Chart = await import('chart.js');
  // Use Chart.js only when needed
};
\`\`\`

---

## 2. Image Optimization

### Current Image Issues
- Large image sizes (e.g., `cek1.png` in Hero)
- No WebP format
- No responsive images (srcset)

### Solutions

#### A. Convert to WebP
\`\`\`bash
# Install sharp for image conversion
npm install -D sharp

# Create script to convert images
node scripts/convert-to-webp.js
\`\`\`

#### B. Add Responsive Images
\`\`\`jsx
// Hero.jsx - Use srcset for responsive images
<img 
  src="./imgs/cek1.png"
  srcSet="./imgs/cek1-400.webp 400w, 
          ./imgs/cek1-800.webp 800w,
          ./imgs/cek1-1200.webp 1200w"
  sizes="(max-width: 768px) 400px, 
         (max-width: 1024px) 800px, 
         1200px"
  alt="Dinni Rahmawati"
  loading="lazy"
/>
\`\`\`

#### C. Optimize Existing Images
Run optimization script on all images in `dist/images/` and `dist/imgs/`:

\`\`\`bash
npm run optimize:images
# Uses existing scripts/optimize-images.js
\`\`\`

---

## 3. Bundle Size Optimization

### Analyze Current Bundle
\`\`\`bash
# Build and check bundle sizes
npm run build

# Check dist/assets/ folder sizes
ls -lh dist/assets/
\`\`\`

### Vite Optimizations (Already Configured)
Current [vite.config.js](vite.config.js) has:
- Terser minification with `drop_console: true`
- Tree-shaking enabled
- CSS minification

### Additional Optimizations

#### A. Remove Unused Dependencies
\`\`\`bash
# Analyze bundle composition
npm install -D vite-plugin-bundle-analyzer

# Add to vite.config.js
import { analyzer } from 'vite-plugin-bundle-analyzer';
plugins: [analyzer()]
\`\`\`

#### B. Externalize Large Dependencies
If using libraries like Flowbite/Font Awesome via CDN, ensure not bundled:

\`\`\`js
// vite.config.js
build: {
  rollupOptions: {
    external: ['flowbite', 'font-awesome']
  }
}
\`\`\`

#### C. Enable Brotli Compression
\`\`\`bash
npm install -D vite-plugin-compression

# vite.config.js
import compression from 'vite-plugin-compression';
plugins: [
  compression({ algorithm: 'brotliCompress' })
]
\`\`\`

---

## 4. CSS Optimization

### PurgeCSS (Already Configured)
[purgecss.config.js](purgecss.config.js) removes unused CSS. Verify safelist patterns:

\`\`\`js
// purgecss.config.js - Ensure dynamic classes included
safelist: {
  standard: [/^carousel-/, /^animate-/, /^group-/],
  deep: [/^hover:/, /^focus:/]
}
\`\`\`

### Critical CSS
Extract above-the-fold CSS and inline in `<head>`:

\`\`\`bash
npm install -D critical

# scripts/extract-critical-css.js
const critical = require('critical');
critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  target: 'index.html',
  width: 1300,
  height: 900
});
\`\`\`

---

## 5. Runtime Performance

### Optimize Carousel Animation
Current `LogoCarousel.jsx` uses CSS transforms (already GPU-accelerated ✅).

Improvements:
- Use `will-change: transform` for smoother animations
- Reduce animation duration if janky on low-end devices

\`\`\`css
/* src/index.css - Add to carousel */
.carousel-track {
  will-change: transform;
  backface-visibility: hidden;
}
\`\`\`

### Debounce Scroll Events
If adding scroll-based effects (parallax, etc.), debounce:

\`\`\`js
// utils/debounce.js
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Navigation.jsx
const handleScroll = debounce(() => {
  setScrolled(window.scrollY > 50);
}, 100);
\`\`\`

### Virtual Scrolling for Portfolio
If portfolio grows > 100 items, implement virtual scrolling:

\`\`\`bash
npm install react-window
\`\`\`

---

## 6. Lighthouse Audit

### Run Audit
\`\`\`bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on production build
npm run preview
lighthouse http://localhost:4173 --view
\`\`\`

### Key Metrics to Check
1. **Performance Score**: Target > 90
2. **Accessibility**: Target > 95
3. **Best Practices**: Target > 90
4. **SEO**: Target > 95

### Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Images without width/height | Add explicit dimensions to prevent CLS |
| Render-blocking resources | Defer non-critical CSS/JS |
| Large network payloads | Enable compression, optimize images |
| Unused JavaScript | Remove dead code, lazy load components |
| Missing meta tags | Add OpenGraph, Twitter Card meta tags |

---

## 7. Network Optimization

### Enable HTTP/2
Ensure deployment platform (Vercel) uses HTTP/2 ✅ (default on Vercel).

### Preload Critical Assets
\`\`\`html
<!-- dist/index.html - Add preload hints -->
<link rel="preload" href="/assets/main-xxx.css" as="style">
<link rel="preload" href="/assets/main-xxx.js" as="script">
<link rel="preload" href="./imgs/cek1.webp" as="image">
\`\`\`

### Add Resource Hints
\`\`\`html
<!-- Connect to external domains early -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
\`\`\`

---

## 8. Monitoring & Continuous Optimization

### Setup Performance Monitoring
Use existing [src/js/performance.js](src/js/performance.js):

\`\`\`js
// performance.js - Already measures LCP, FID, CLS
// Integrate with analytics (Google Analytics, Vercel Analytics)
\`\`\`

### Add Vercel Analytics
\`\`\`bash
npm install @vercel/analytics

# App.jsx
import { Analytics } from '@vercel/analytics/react';
function App() {
  return (
    <>
      <Analytics />
      {/* rest of app */}
    </>
  );
}
\`\`\`

### Performance Budget
Set budget in `vite.config.js`:

\`\`\`js
build: {
  chunkSizeWarningLimit: 500, // KB
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom']
      }
    }
  }
}
\`\`\`

---

## 9. SEO & Meta Tags

### Add Comprehensive Meta Tags
\`\`\`html
<!-- index.html -->
<meta name="description" content="Dinni Rahmawati - Career & Scholarship Mentor. 100+ programs, 50K+ students helped, 5+ years experience.">
<meta name="keywords" content="career mentoring, scholarship mentoring, proofreading, corporate training">

<!-- OpenGraph -->
<meta property="og:title" content="Dinni Rahmawati | Career & Scholarship Mentor">
<meta property="og:description" content="Professional mentoring services with 100+ programs and 50K+ students helped.">
<meta property="og:image" content="https://yoursite.com/imgs/cek1.png">
<meta property="og:url" content="https://yoursite.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dinni Rahmawati | Career Mentor">
<meta name="twitter:description" content="100+ programs, 50K+ students helped, 5+ years experience">
<meta name="twitter:image" content="https://yoursite.com/imgs/cek1.png">
\`\`\`

### Add Structured Data
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dinni Rahmawati",
  "jobTitle": "Career & Scholarship Mentor",
  "url": "https://yoursite.com",
  "sameAs": [
    "https://linkedin.com/in/dinnirahmawati",
    "https://instagram.com/dinnirhmt",
    "https://medium.com/@dinni.rahmwt"
  ]
}
</script>
\`\`\`

---

## 10. Deployment Optimization

### Vercel Configuration
Current [vercel.json](vercel.json) looks good. Add headers:

\`\`\`json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
\`\`\`

---

## Implementation Checklist

### Quick Wins (< 1 hour)
- [ ] Add `loading="lazy"` to all images
- [ ] Add `width` and `height` attributes to images
- [ ] Enable Vite brotli compression plugin
- [ ] Add preload hints for critical assets
- [ ] Add comprehensive meta tags

### Medium Effort (1-3 hours)
- [ ] Implement React.lazy for Portfolio and Testimonials
- [ ] Convert large images to WebP format
- [ ] Add responsive images (srcset)
- [ ] Run Lighthouse audit and fix issues
- [ ] Setup Vercel Analytics

### Long-term (3+ hours)
- [ ] Optimize all images with sharp
- [ ] Implement critical CSS extraction
- [ ] Add performance monitoring dashboard
- [ ] Setup A/B testing for conversion optimization
- [ ] Create performance regression tests

---

## Expected Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | ~3.2s | ~2.0s | -37% |
| FID | ~120ms | ~80ms | -33% |
| CLS | ~0.15 | ~0.05 | -67% |
| Bundle Size | ~250 KB | ~180 KB | -28% |
| Lighthouse Score | ~75 | ~95 | +27% |

---

## Monitoring Commands

\`\`\`bash
# Check bundle size
npm run build && ls -lh dist/assets/

# Run Lighthouse
lighthouse http://localhost:4173 --view

# Analyze bundle composition
npm run build -- --mode analyze

# Test production build
npm run preview
\`\`\`

---

**Status**: Ready for implementation  
**Priority**: High (affects user experience & SEO)  
**Estimated Time**: 4-6 hours for full implementation  
**Last Updated**: ${new Date().toLocaleDateString('id-ID')}
