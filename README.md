# Landing Page - Dinni Rahmawati (React Version)

Modern, production-ready landing page built with **React 19**, **Vite 7.3**, and **TailwindCSS** for optimal performance and maintainability.

## 🚀 Tech Stack

- **React 19.x** - Modern UI library with hooks
- **Vite 7.3.1** - Lightning-fast build tool
- **TailwindCSS 3.x** - Utility-first CSS framework
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing with autoprefixer

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (LogoCarousel, PreLoader)
│   │   ├── layout/          # Layout components (Navigation, Footer)
│   │   ├── home/            # Page sections (Hero, About, Services, etc.)
│   │   ├── portfolio/       # Portfolio components (Card, Filter)
│   │   └── testimonials/    # Testimonial components
│   ├── data/                # Data files (portfolioData, testimonialsData, logosData)
│   ├── utils/               # Utility functions
│   ├── index.css            # Global styles with TailwindCSS
│   ├── main.jsx             # React entry point
│   └── App.jsx              # Main app component
├── public/                  # Static assets
├── dist/                    # Production build output
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/Landing-Page-Dinni.git
cd Landing-Page-Dinni

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server will run at `http://localhost:3000` (or next available port).

### Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 📝 Component Documentation

### Portfolio Management

All portfolio items are stored in `src/data/portfolioData.js`. To add new items:

```javascript
{
  id: 30,
  title: "New Portfolio Item",
  description: "Description here",
  category: ["training"],  // training, mentoring, kolaborasi, casestudy, tulisan
  tags: ["tag1", "tag2"],
  image: "./images/portfolio/new-item.jpg",
  link: "https://example.com",
  featured: false
}
```

Helper functions available:

- `getPortfolioByCategory(category)` - Filter by category
- `getFeaturedPortfolio()` - Get featured items only
- `getPortfolioById(id)` - Get single item

### Testimonials Management

Testimonials in `src/data/testimonialsData.js`:

```javascript
{
  id: 9,
  name: "John Doe",
  title: "Position at Company",
  category: "Mentoring",  // Beasiswa, Mentoring, Corporate Training, etc.
  categoryIcon: "user-tie",  // Font Awesome icon name
  categoryStyle: "primary",  // primary, dark, white-border
  rating: 5,
  text: "Testimonial text here"
}
```

### Logos Management

Client and university logos in `src/data/logosData.js`:

```javascript
// Add new client logo
clientLogos.push({
  id: 11,
  name: "New Client",
  image: "./images/logo client/new-client.svg",
  alt: "New Client",
});
```

## 🎨 Styling Guidelines

### TailwindCSS Custom Colors

```javascript
primary: {
  50-950  // Blue shades
},
secondary: {
  50-950  // Green shades
},
accent: {
  50-950  // Yellow shades
}
```

### Custom Animations

Available in `tailwind.config.js`:

- `animate-scroll-left` - Carousel scroll left
- `animate-scroll-right` - Carousel scroll right
- `animate-fadeIn` - Fade in effect
- `animate-fade-in-{direction}` - Directional fade animations

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Files will be output to dist/
```

### Vercel Deployment

Project configured for Vercel with `vercel.json`:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or link to Git and auto-deploy on push
```

Configuration:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

### Manual Deployment

1. Run `npm run build`
2. Upload `dist/` folder to your hosting
3. Ensure server redirects all routes to `index.html` for SPA routing

## 🧪 Testing

Test checklist:

- ✅ Portfolio filtering works across all categories
- ✅ Testimonial pagination (3 items per page)
- ✅ Mobile menu toggle
- ✅ Carousel animations (clients & universities)
- ✅ Smooth scroll navigation
- ✅ Email copy to clipboard
- ✅ All external links open in new tab
- ✅ Responsive on mobile, tablet, desktop
- ✅ Fast page load (< 3s)

## 📊 Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Bundle size**: JS < 150KB, CSS < 100KB (gzipped)

## 🔧 Optimization Features

- ✅ Code splitting with React.lazy (if needed)
- ✅ Image lazy loading
- ✅ Minified CSS & JS
- ✅ Tree-shaking for unused code
- ✅ Console logs removed in production
- ✅ Infinite carousel with minimal DOM operations
- ✅ useMemo for expensive filtering operations

## 📚 Key Features

### React Components

- **Modular architecture** - Each section is independent component
- **Reusable components** - PortfolioCard, TestimonialCard, LogoCarousel
- **State management** - React hooks (useState, useEffect, useMemo)
- **Performance optimized** - Memoization and efficient re-renders

### Data-Driven

- **Portfolio** - 29 items in portfolioData.js
- **Testimonials** - 8 testimonials in testimonialsData.js
- **Logos** - 10 clients + 6 universities in logosData.js
- **Easy updates** - Just edit data files, no HTML changes

### User Experience

- **Smooth animations** - TailwindCSS transitions
- **Responsive design** - Mobile-first approach
- **Accessible** - ARIA labels and semantic HTML
- **Fast loading** - Optimized images and code

## 🐛 Troubleshooting

### Port already in use

Vite will automatically use next available port (3001, 3002, etc.)

### Build errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TailwindCSS not working

Check `tailwind.config.js` content paths match your file structure.

### Images not loading

Ensure image paths are relative to `public/` directory or use absolute paths.

## 📄 License

© 2026 Dinni Rahmawati. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. For inquiries, contact: dinnirahmawati.coach@gmail.com

---

**Built with ❤️ using React, Vite, and TailwindCSS**
