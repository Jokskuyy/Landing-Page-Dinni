/**
 * PurgeCSS Configuration
 * Removes unused CSS for optimal bundle size
 */

module.exports = {
  content: [
    './dist/**/*.html',
    './dist/**/*.js',
    './src/**/*.js'
  ],
  css: ['./dist/output.css'],
  output: './dist/',
  
  // Safelist: Always keep these classes
  safelist: {
    standard: [
      /^animate-/,
      /^fade-/,
      /^carousel-/,
      /^enhanced-/,
      /^btn-/,
      /^card-/,
      /^hover:/,
      /^focus:/,
      /^active:/,
      /^group-/,
      /^peer-/
    ],
    deep: [
      /flowbite/,
      /alpine/
    ],
    greedy: [
      /data-/,
      /x-/
    ]
  },
  
  // Extraction patterns
  defaultExtractor: (content) => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  
  // Options
  fontFace: false,
  keyframes: true,
  variables: true,
  rejected: false,
  rejectedCss: false
};
