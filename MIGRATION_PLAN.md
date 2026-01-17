# 🚀 Migration Plan: Vanilla HTML → React (Gradual Migration)

## 📋 Overview

Migrasi bertahap dari static HTML + Vanilla JS ke React + Vite, dengan fokus pada modularitas, reusability, dan maintainability tanpa mengganggu production site.

---

## 🎯 Phase 1: Foundation Setup (Week 1)

### ✅ Task 1.1: Install Dependencies

```bash
npm install react react-dom
npm install -D vite @vitejs/plugin-react
npm install -D @babel/preset-react eslint-plugin-react
npm install -D tailwindcss postcss autoprefixer
```

### ✅ Task 1.2: Project Structure

```
├── src/                    # React source files (NEW)
│   ├── components/
│   │   ├── common/         # Reusable UI components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── home/           # Section components
│   │   └── portfolio/      # Portfolio-specific components
│   ├── data/               # All data in JS/JSON
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── dist/                   # Production build (EXISTING)
├── scripts/                # Build scripts (EXISTING)
└── public/                 # Static assets (images, etc.)
```

### ✅ Task 1.3: Vite Configuration

**File:** `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: false, // Keep existing static files
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // New React entry
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

### ✅ Task 1.4: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
    "build:all": "npm run build:css && npm run build"
  }
}
```

---

## 🧩 Phase 2: Data Extraction (Week 1-2)

### ✅ Task 2.1: Portfolio Data

**File:** `src/data/portfolioData.js`

```javascript
export const portfolioItems = [
  {
    id: 1,
    title: "Leadership Development Program",
    description: "Comprehensive training program...",
    category: ["training", "casestudy"],
    tags: ["Leadership", "Professional Development"],
    image: "/images/porto/leadership.jpg",
    link: "https://example.com",
    featured: true,
  },
  // ... 28 more items
];

export const portfolioCategories = [
  { id: "all", label: "Semua" },
  { id: "training", label: "Training" },
  { id: "mentoring", label: "Mentoring" },
  { id: "kolaborasi", label: "Kolaborasi" },
  { id: "casestudy", label: "Case Study" },
  { id: "tulisan", label: "Tulisan" },
];
```

### ✅ Task 2.2: Testimonials Data

**File:** `src/data/testimonialsData.js`

```javascript
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    category: "Beasiswa",
    content: "Bimbingan Dinni sangat membantu...",
    avatar: "/images/avatars/sarah.jpg",
    rating: 5,
  },
  // ... 7 more items
];
```

### ✅ Task 2.3: Logos Data

**File:** `src/data/logosData.js`

```javascript
export const clientLogos = [
  { id: 1, name: "Company A", image: "/images/logos/company-a.png" },
  // ... more items
];

export const universityLogos = [
  { id: 1, name: "University X", image: "/images/logos/uni-x.png" },
  // ... more items
];
```

---

## 🎨 Phase 3: Core Components (Week 2-3)

### ✅ Task 3.1: PortfolioCard Component

**File:** `src/components/portfolio/PortfolioCard.jsx`

```jsx
import React from "react";

export default function PortfolioCard({ item }) {
  const { title, description, category, image, link, tags } = item;

  return (
    <div className="portfolio-card-item group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 rounded-md bg-primary-100 text-xs font-semibold text-primary-600">
            {category[0]}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="material-icons-round text-base">category</span>
            {tags.join(", ")}
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <span className="material-icons-round text-base">link</span>
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### ✅ Task 3.2: PortfolioFilter Component

**File:** `src/components/portfolio/PortfolioFilter.jsx`

```jsx
import React from "react";
import { portfolioCategories } from "../../data/portfolioData";

export default function PortfolioFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {portfolioCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onFilterChange(cat.id)}
          className={`
            portfolio-filter-btn px-6 py-2.5 rounded-full text-sm font-semibold 
            transition-all duration-300
            ${
              activeFilter === cat.id
                ? "shadow-lg bg-white text-primary-600 scale-105 ring-4 ring-blue-500/20"
                : "text-white btn-glass hover:bg-white/20"
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
```

### ✅ Task 3.3: Portfolio Section Component

**File:** `src/components/home/Portfolio.jsx`

```jsx
import React, { useState, useMemo } from "react";
import PortfolioFilter from "../portfolio/PortfolioFilter";
import PortfolioCard from "../portfolio/PortfolioCard";
import { portfolioItems } from "../../data/portfolioData";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return portfolioItems;
    return portfolioItems.filter((item) =>
      item.category.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-600"></div>
      {/* ... decorative elements ... */}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-400/30 text-accent-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Pengalaman & <span className="text-accent-300">Track Record</span>
          </h2>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg md:text-xl font-light leading-relaxed">
            Berbagai program training, mentoring, dan kolaborasi yang telah saya
            lakukan dengan berbagai organisasi dan individu.
          </p>
        </div>

        {/* Filter */}
        <PortfolioFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Diskusikan Project Anda</span>
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 🔧 Phase 4: Layout Components (Week 3)

### ✅ Task 4.1: Navigation Component

**File:** `src/components/layout/Navigation.jsx`

```jsx
import React, { useState, useEffect } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#aboutme", label: "About Me" },
    { href: "#services", label: "Services" },
    { href: "#pengalaman", label: "Portfolio" },
    { href: "#testimonies", label: "Testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-md"
      } border-b border-neutral-200`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="font-serif text-xl font-bold text-neutral-900">
            Dinni Rahmawati
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <i
              className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
            ></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
```

### ✅ Task 4.2: PreLoader Component

**File:** `src/components/common/PreLoader.jsx`

```jsx
import React, { useState, useEffect } from "react";

export default function PreLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-primary-50 text-neutral-900 z-50 transition-opacity duration-300 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-primary-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent-400/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Loading Content */}
      <div className="flex flex-col w-full max-w-[480px] z-10 items-center px-6">
        <div className="mb-8 flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>

        <div className="w-full flex flex-col gap-2 text-center">
          <h2 className="text-neutral-900 tracking-tight text-[28px] font-bold leading-tight px-4 pb-1">
            Welcome to My Portfolio
          </h2>
          <p className="text-neutral-600 text-base font-normal leading-normal">
            Loading amazing content for you...
          </p>
        </div>

        <div className="flex items-center gap-2 mt-8">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col max-w-[960px] px-6">
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">DR</span>
          </div>
          <p className="text-neutral-700 text-sm font-semibold tracking-wide">
            Dinni Rahmawati
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🏗️ Phase 5: Assembly & Integration (Week 4)

### ✅ Task 5.1: Main App Component

**File:** `src/App.jsx`

```jsx
import React from 'react';
import PreLoader from './components/common/PreLoader';
import Navigation from './components/layout/Navigation';
import Hero from './components/home/Hero';
import ClientCarousel from './components/home/ClientCarousel';
import About from './components/home/About';
import Services from './components/home/Services';
import Portfolio from './components/home/Portfolio';
import Testimonials from './components/home/Testimonials';
import Contact from './components/home/Contact';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="relative z-10 font-Inter scroll-smooth">
      <PreLoader />

      {/* Master Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-primary-50"></div>
        {/* Global Floating Elements */}
        <div className="absolute top-32 left-1/4 w-24 h-24 bg-primary-200/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-secondary-200/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-28 h-28 bg-primary-300/7 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-secondary-300/8 rounded-full blur-xl animate-pulse delay-1500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%233b82f6\" fill-opacity=\"0.005\"%3E%3Ccircle cx=\"6\" cy=\"6\" r=\"3\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <Navigation />
      <Hero />
      <ClientCarousel />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
```

### ✅ Task 5.2: Entry Point

**File:** `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind imports

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### ✅ Task 5.3: Update HTML Entry

**File:** `index.html` (new root file)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home | Dinni Rahmawati</title>
    <link rel="icon" href="./dist/images/logo-web.png" />

    <!-- Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <!-- Google Fonts -->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 📊 Phase 6: Testing & Optimization (Week 4-5)

### ✅ Task 6.1: Functionality Testing

- [ ] Portfolio filtering works for all categories
- [ ] Testimonial pagination works
- [ ] Mobile menu toggles correctly
- [ ] Smooth scroll to sections
- [ ] All external links open in new tab
- [ ] Email copy functionality works
- [ ] Carousel animations smooth

### ✅ Task 6.2: Performance Optimization

```javascript
// Lazy load images
import { lazy, Suspense } from "react";

const Portfolio = lazy(() => import("./components/home/Portfolio"));
const Testimonials = lazy(() => import("./components/home/Testimonials"));

// In App.jsx
<Suspense fallback={<div>Loading...</div>}>
  <Portfolio />
  <Testimonials />
</Suspense>;
```

### ✅ Task 6.3: Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          portfolio: ["./src/components/home/Portfolio.jsx"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

---

## 📝 Phase 7: Documentation & Handover (Week 5)

### ✅ Task 7.1: Update README

Add sections:

- React development setup
- Component architecture
- How to add new portfolio items
- How to update content
- Build & deployment process

### ✅ Task 7.2: Create Component Documentation

**File:** `COMPONENTS.md`

- List all components
- Props interface for each
- Usage examples
- Customization guide

### ✅ Task 7.3: Migration Checklist

- [ ] All features migrated
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Production build tested
- [ ] Deployment successful

---

## 🎯 Success Metrics

- **Bundle Size:** < 200KB gzipped
- **Lighthouse Performance:** > 90
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Components Reusability:** 80%+ code reduction

---

## 🚦 Risk Mitigation

1. **Keep old dist/ intact** during development
2. **Parallel deployment** - Run React on subdomain first
3. **Feature parity** - Ensure all old features work
4. **SEO preservation** - Use React Helmet for meta tags
5. **Rollback plan** - Keep old HTML as backup

---

## 📦 Deliverables

1. ✅ Fully functional React application
2. ✅ All 29 portfolio items as data
3. ✅ Reusable component library
4. ✅ Updated build scripts
5. ✅ Comprehensive documentation
6. ✅ Deployment guide

---

**Timeline:** 5 weeks  
**Estimated Effort:** 40-60 hours  
**Complexity:** Medium

**Next Step:** Start with Phase 1 - Foundation Setup?
