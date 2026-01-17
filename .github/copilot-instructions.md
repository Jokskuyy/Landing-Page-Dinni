# Landing Page - Dinni Rahmawati

## Project Overview

Production-optimized landing page using TailwindCSS with aggressive build optimization for minimal bundle sizes. Focus on performance, clean separation of source/build artifacts, and automated minification pipelines.

## Architecture

### Directory Structure

- **`src/`**: Source files (CSS, JS, components as HTML partials)
  - `input.css`: TailwindCSS with custom components/utilities
  - `js/`: Modular JavaScript (carousel, utils, data)
  - `components/`: Reusable HTML partials (buttons, cards, carousel)
- **`dist/`**: Production build output (committed to repo)
- **`scripts/`**: Custom Node.js build tools
- **`templates/`**: HTML templates used during builds

### Build Pipeline

Production builds run through a multi-stage pipeline (`npm run build`):

1. **CSS**: TailwindCSS → PostCSS (autoprefixer + cssnano advanced) → output.css
2. **JS**: Bundle modules → Terser (aggressive minification, drop console logs) → main.min.js
3. **HTML**: html-minifier-terser (collapse whitespace, minify inline CSS/JS)
4. **Images**: Optimize JPG/PNG/SVG/WebP with quality presets (85/80/85)
5. **Analysis**: Auto-run bundle analyzer to report sizes and compression ratios

**Key commands:**

- `npm run dev`: Watch mode for CSS development
- `npm run build`: Full production build with all optimizations
- `npm run serve`: Local http-server with gzip (dev)
- `npm run serve:prod`: Production-like server with brotli compression

## Code Conventions

### CSS/TailwindCSS

- Use `@layer base/components/utilities` for organization in [src/input.css](src/input.css)
- Custom animations defined in [tailwind.config.js](tailwind.config.js) (fade-in directions, infinite scroll)
- Color system: `primary-*`, `secondary-*`, `accent-*` scales + legacy `ld-*`/`dn-*` colors
- JIT mode enabled for development speed

### JavaScript

- ES6 modules in `src/js/`, bundled by [scripts/build-js.js](scripts/build-js.js)
- Data-driven approach: logos/content in [src/js/data/logos.js](src/js/data/logos.js)
- Carousel uses optimized infinite scroll pattern with minimal DOM operations
- Performance monitoring via [src/js/performance.js](src/js/performance.js)

### HTML Components

- Partials in `src/components/` are copy-pasted into full HTML pages (not dynamically imported)
- Flowbite components integrated via CDN for interactive elements
- Inline scripts in `<head>` for critical initialization (preloader, carousel setup)

### Build Scripts Pattern

All scripts in `scripts/` follow consistent structure:

- Configuration object at top with paths and options
- Statistics tracking (original/optimized sizes)
- Formatted console output with emojis for readability
- Error handling with detailed logging
- See [scripts/build-js.js](scripts/build-js.js) as reference implementation

## Optimization Strategy

### CSS Optimization

- PurgeCSS removes unused classes (config: [purgecss.config.js](purgecss.config.js))
- Safelist patterns for dynamic classes (`animate-*`, `carousel-*`, `hover:`, `group-*`)
- PostCSS with cssnano "advanced" preset for aggressive minification

### JS Optimization

- Terser with `drop_console: true` for production
- Multiple passes (`passes: 2`) for maximum compression
- Mangle top-level names but preserve property names
- Bundle preamble: `/* Dinni Rahmawati Landing Page - Optimized Bundle */`

### Image Optimization

- [scripts/optimize-images.js](scripts/optimize-images.js) generates multiple sizes (thumbnail/small/medium/large/xlarge)
- Quality presets: JPEG 85%, PNG 80%, WebP 85%
- Creates `dist/images/optimized/` subdirectory

### Bundle Analysis

- Auto-runs after every build via `postbuild` hook
- Reports original, gzip, and brotli sizes for HTML/CSS/JS
- Warns when files exceed thresholds (HTML 50KB, CSS 100KB, JS 150KB)

## Development Workflow

### Making Changes

1. Edit source files in `src/` (CSS/JS) or `dist/` (HTML directly)
2. Run `npm run dev` for CSS hot-reloading
3. For JS changes, run `npm run build:js` manually
4. Test with `npm run serve` before committing

### Adding Components

- Create HTML partial in `src/components/`
- Copy into relevant `dist/*.html` files manually
- Use TailwindCSS classes from extended theme
- Follow existing component patterns (see [src/components/carousel.html](src/components/carousel.html))

### Performance Considerations

- Keep HTML files under 50KB, CSS under 100KB, JS under 150KB
- Carousel animations use CSS transforms (GPU-accelerated)
- Avoid DOM thrashing: batch reads/writes, use DocumentFragment
- Check bundle report after build: `npm run analyze:bundle`

## External Dependencies

- **Flowbite**: UI components (CDN loaded)
- **Font Awesome**: Icons (CDN loaded)
- **jQuery**: Only for fade animations (consider removing)
- **Google Fonts**: Inter + Poppins with `display=swap`

## Troubleshooting

- If CSS not updating: Clear `dist/output.css` and rebuild
- JS minification errors: Check ES6 compatibility in [scripts/build-js.js](scripts/build-js.js) terser config
- Images not optimizing: Ensure `dist/images/` exists before running optimize script
- HTML changes reverted: Remember HTML lives in `dist/`, not `templates/` (except optimized-index)
