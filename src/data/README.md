# Portfolio Data Structure

## Overview
Centralized data source for all 29 portfolio items. This makes content management easy - just edit this file to add/update portfolio items!

## Data Schema

```javascript
{
  id: Number,              // Unique identifier
  title: String,           // Portfolio item title
  description: String,     // Brief description (2-3 sentences)
  category: Array,         // ["training", "mentoring", "kolaborasi", "casestudy", "tulisan"]
  tags: Array,            // Relevant tags for filtering/search
  image: String,          // Path to image file
  link: String,           // External link (LinkedIn, Drive, Medium, etc.)
  featured: Boolean       // Show in featured section
}
```

## Categories

- **training**: Workshops, training programs, seminars
- **mentoring**: One-on-one career/scholarship mentoring
- **kolaborasi**: Content collaborations, partnerships
- **casestudy**: Research papers, case studies
- **tulisan**: Written articles (self-help, masters, learning)

## Sub-categories (Tulisan)
- **self-help**: Personal development, productivity
- **masters**: LPDP, scholarship, higher education
- **learning**: Learning theories, EdTech, mentoring

## Usage Examples

```javascript
import { 
  portfolioItems, 
  portfolioCategories,
  getPortfolioByCategory,
  getFeaturedPortfolio,
  portfolioStats 
} from '@data/portfolioData';

// Get all items
const allItems = portfolioItems;

// Get items by category
const trainingItems = getPortfolioByCategory('training');
const tulisanItems = getPortfolioByCategory('tulisan');

// Get featured items only
const featured = getFeaturedPortfolio();

// Get statistics
console.log(portfolioStats.total); // 29
console.log(portfolioStats.training); // 5
```

## How to Add New Portfolio Item

1. Open `src/data/portfolioData.js`
2. Add new object to `portfolioItems` array:

```javascript
{
  id: 30, // Next available ID
  title: "Your New Portfolio Item",
  description: "Clear, concise description of the item.",
  category: ["training"], // or ["tulisan", "masters"], etc.
  tags: ["Tag1", "Tag2"],
  image: "/dist/images/porto/your-image.jpg",
  link: "https://your-link.com",
  featured: false
}
```

3. Save file - React will hot-reload automatically!

## Statistics

- **Total Items**: 29
- **Training**: 5 items
- **Mentoring**: 2 items  
- **Kolaborasi**: 4 items
- **Case Study**: 4 items
- **Tulisan**: 12 items (3 self-help, 5 masters, 4 learning)
- **Featured**: 5 items

## Image Paths

All images are stored in `/dist/images/porto/` directory.
Image filenames follow pattern: `Category - Title.ext`

Examples:
- `Self-Help - Energy Map.jpg`
- `Masters & LPDP - Crafting Theory of Change.png`
- `Learning - How TikTok Is Transforming.jpg`
