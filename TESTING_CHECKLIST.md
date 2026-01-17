# Testing Checklist - React Migration

## ✅ Phase 14: Testing & Bug Fixes

### Navigation & Mobile Menu

- [ ] Desktop navigation links work (`#aboutme`, `#services`, `#portfolio`, `#testimonials`, `#contactus`)
- [ ] Mobile menu toggle opens/closes correctly
- [ ] Mobile menu links navigate and close menu after click
- [ ] Header background appears on scroll
- [ ] Language switcher placeholder visible

### Hero Section

- [ ] Hero content displays correctly
- [ ] Stats section shows correct numbers (100+ programs, 50K+ helped, 5+ years)
- [ ] CTA buttons link to correct sections
- [ ] Profile image loads correctly (`./imgs/cek1.png`)
- [ ] Background animation works smoothly

### Clients Carousel

- [ ] Logo carousel auto-scrolls infinitely
- [ ] Smooth transition between logo sets
- [ ] No visible gaps or jumps in animation
- [ ] All 16 logos visible (10 clients + 6 universities)
- [ ] Hover effect works on logos

### About Section

- [ ] Career timeline displays all 5 positions (2019-2025)
- [ ] Credentials grid shows 4 achievement cards
- [ ] Quote section renders correctly
- [ ] Layout responsive on mobile/tablet/desktop

### Services Section

- [ ] All 4 service cards display (Career Mentoring, Scholarship Mentoring, Proofreading, Corporate Training)
- [ ] WhatsApp links open correctly with pre-filled message
- [ ] WhatsApp number correct: 62859106531249
- [ ] Service features list readable
- [ ] Hover effects work on cards

### Portfolio Section

- [ ] Portfolio items load from `portfolioData.js` (29 items total)
- [ ] "All" filter shows all 29 items
- [ ] "Tools & Templates" filter works (should show ~5 items)
- [ ] "Publication" filter works
- [ ] "Educational Content" filter works
- [ ] "Events" filter works
- [ ] Filter buttons highlight active state
- [ ] Portfolio cards display title, description, tags correctly
- [ ] Portfolio card links open in new tab
- [ ] Grid layout responsive (1 column mobile, 2 tablet, 3 desktop)

### Testimonials Section

- [ ] Testimonials load from `testimonialsData.js` (8 total)
- [ ] Shows 3 testimonials per page on desktop
- [ ] Shows 1 testimonial per page on mobile
- [ ] Pagination buttons work (Previous/Next)
- [ ] First page: Previous button disabled
- [ ] Last page: Next button disabled
- [ ] Page indicator shows correct count (e.g., "1 / 3")
- [ ] Testimonial cards show name, role, company, quote
- [ ] Profile images load correctly

### Contact Section

- [ ] Email displays correctly: dinni.rahmwt@gmail.com
- [ ] Email copy button copies to clipboard
- [ ] Copy button shows "Copied!" feedback
- [ ] WhatsApp link opens with correct number
- [ ] LinkedIn link opens profile in new tab
- [ ] Social media links work (Instagram, LinkedIn, Medium)
- [ ] Icons display correctly

### Footer

- [ ] Footer displays in 3-column grid (desktop)
- [ ] Branding section shows name and tagline
- [ ] Quick links navigate correctly
- [ ] Contact info displays email and WhatsApp
- [ ] Social icons link correctly
- [ ] Copyright year dynamic (current year)
- [ ] Mobile layout stacks columns

### PreLoader

- [ ] Loading spinner appears on initial page load
- [ ] Spinner displays for ~1.5 seconds
- [ ] Smooth fade-out transition
- [ ] Page content visible after loader disappears

### Smooth Scroll

- [ ] Clicking nav links scrolls smoothly to sections
- [ ] Scroll behavior works on all hash links
- [ ] No jarring jumps between sections

### Responsiveness

- [ ] Mobile (< 768px): Single column layout, mobile menu works
- [ ] Tablet (768px - 1024px): 2-column grids, responsive navigation
- [ ] Desktop (> 1024px): Full 3-column grids, all features visible
- [ ] No horizontal scroll on any device size
- [ ] Text readable on all screen sizes

### Performance

- [ ] Page loads in < 3 seconds on 4G
- [ ] No console errors in browser DevTools
- [ ] No 404 errors for images/assets
- [ ] CSS animations smooth (60fps)
- [ ] Build size reasonable (check `dist/assets/` folder)

## Build & Deployment Tests

### Development Build

- [x] `npm run dev` starts successfully (Port 3002)
- [x] Hot reload works when editing components
- [x] No build errors in console

### Production Build

- [x] `npm run build` completes without errors
- [x] Output in `dist/` folder with hashed assets
- [x] `npm run preview` serves production build (Port 4173)
- [ ] Production bundle optimized (minified CSS/JS)
- [ ] Check bundle size in `dist/assets/`

### Deployment Readiness

- [ ] `vercel.json` configured correctly
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Framework: Vite
- [ ] Test deployment on Vercel
- [ ] Verify all routes work after deployment

## Bug Tracker

### Known Issues

- None yet - to be filled during testing

### Fixed Issues

- Will be documented here as bugs are discovered and fixed

---

## Testing Progress: 0% Complete

**Last Updated:** ${new Date().toLocaleDateString('id-ID')}

Run through each checklist item and mark as complete. Report any bugs immediately.
