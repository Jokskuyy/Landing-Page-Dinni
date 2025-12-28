# 🎨 ADPList-Style Carousel Update

## ✨ What's New

Carousel klien dan jaringan alumni telah dioptimasi dengan style modern mirip **ADPList** untuk tampilan yang lebih profesional dan smooth.

## 🎯 Key Features

### 1. **Infinite Scroll Animation**

- ✅ Smooth horizontal scrolling tanpa batas
- ✅ Triple duplication untuk seamless loop
- ✅ Animation duration: 40 detik
- ✅ Pause on hover untuk interaksi

### 2. **Professional Grayscale Effect**

```css
/* Default: Grayscale + 60% opacity */
filter: grayscale(100%);
opacity: 0.6;

/* On Hover: Full color + 100% opacity */
filter: grayscale(0%);
opacity: 1;
```

### 3. **Fade Mask Edges**

- Gradient fade di kiri dan kanan
- Smooth appearance tanpa hard cut
- Background match dengan primary-50

### 4. **Cleaner Design**

- ❌ Dihapus: Card borders, shadows, backgrounds
- ✅ Added: Minimalist logo display
- ✅ Added: Clean gap spacing (gap-12 md:gap-16)

## 📊 Before vs After

| **Aspect**            | **Before**               | **After**              |
| --------------------- | ------------------------ | ---------------------- |
| **Style**             | Card-based dengan border | Clean logo display     |
| **Animation**         | Basic scroll             | Smooth infinite scroll |
| **Hover Effect**      | Scale + shadow           | Grayscale → Color      |
| **Visual Weight**     | Heavy (cards)            | Light (minimal)        |
| **Professional Look** | ⭐⭐⭐                   | ⭐⭐⭐⭐⭐             |

## 🎬 Animation Details

### Clients Carousel (Normal Direction)

```css
@keyframes adplist-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}
```

### Universities Carousel (Reverse Direction)

```css
@keyframes adplist-scroll-reverse {
  0% {
    transform: translateX(-33.333%);
  }
  100% {
    transform: translateX(0);
  }
}
```

**Why 33.333%?**

- Karena ada 3 set duplikasi logo
- Move 1/3 = seamless loop effect
- No visual jump saat loop restart

## 📱 Responsive Design

### Desktop (≥768px)

- Logo width: 140px
- Logo height: 80px
- Gap: 4rem (64px)
- Duration: 40s

### Mobile (<768px)

- Logo width: 100px
- Logo height: 60px
- Gap: 2rem (32px)
- Duration: 30s (faster on mobile)

## ♿ Accessibility

### 1. **Reduced Motion Support**

```css
@media (prefers-reduced-motion: reduce) {
  .adplist-carousel-track {
    animation: none; /* No animation */
  }
}
```

### 2. **Print Styles**

```css
@media print {
  .adplist-carousel-track {
    flex-wrap: wrap;
    justify-center;
    animation: none;
  }
}
```

## 🚀 Performance Optimizations

1. **Will-change Property**

   ```css
   will-change: transform;
   ```

   - GPU acceleration
   - Smoother animations
   - Better performance

2. **Triple Duplication**

   - No JavaScript required
   - Pure CSS animation
   - Zero dependencies

3. **Grayscale Filter**
   - Hardware accelerated
   - Smooth transitions (300ms)
   - Minimal CPU usage

## 💻 Code Structure

### HTML

```html
<div class="adplist-carousel-wrapper">
  <div class="adplist-carousel-track">
    <!-- Set 1: Original logos -->
    <!-- Set 2: Duplicate for loop -->
    <!-- Set 3: Triple for ultra-smooth -->
  </div>
</div>
```

### CSS Classes

- `.adplist-carousel-wrapper` - Container dengan overflow hidden
- `.adplist-carousel-track` - Animated track
- `.adplist-carousel-reverse` - Reverse direction
- `.adplist-logo-item` - Logo container (140x80)
- `.adplist-logo` - Logo image dengan grayscale

## 🎨 Visual Improvements

### Fade Mask Implementation

```html
<!-- Left fade -->
<div
  class="absolute left-0 top-0 bottom-0 w-24 
     bg-gradient-to-r from-primary-50 to-transparent 
     z-10 pointer-events-none"
></div>

<!-- Right fade -->
<div
  class="absolute right-0 top-0 bottom-0 w-24 
     bg-gradient-to-l from-primary-50 to-transparent 
     z-10 pointer-events-none"
></div>
```

## 🔧 Customization

### Change Animation Speed

```css
/* Faster */
animation: adplist-scroll 30s linear infinite;

/* Slower */
animation: adplist-scroll 60s linear infinite;
```

### Change Gap Spacing

```css
/* Tighter */
@apply gap-8 md:gap-12;

/* Wider */
@apply gap-16 md:gap-20;
```

### Change Logo Size

```css
/* Smaller */
width: 100px;
height: 60px;

/* Larger */
width: 180px;
height: 100px;
```

## 📝 Files Changed

1. **dist/index.html**

   - Updated carousel HTML structure
   - Removed card wrappers
   - Added ADPList classes
   - Triple duplication of logos

2. **src/input.css**

   - Added ADPList carousel styles
   - Keyframe animations
   - Responsive media queries
   - Accessibility features

3. **dist/output.css**
   - Rebuilt with new styles
   - Minified for production

## 🎯 Result

✅ **Cleaner, more professional look**  
✅ **Smooth infinite scroll tanpa jump**  
✅ **Professional grayscale hover effect**  
✅ **Better visual hierarchy**  
✅ **Mobile responsive**  
✅ **Accessible (reduced motion, print)**  
✅ **Performance optimized (GPU accelerated)**

---

**Inspired by**: ADPList.org  
**Implementation**: Custom CSS with Tailwind  
**Performance**: ⚡ Ultra-optimized  
**Accessibility**: ♿ Full support
