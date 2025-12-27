#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes and reports on file sizes and optimization opportunities
 */

const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);

// Configuration
const CONFIG = {
  distDir: path.join(__dirname, '..', 'dist'),
  filesToAnalyze: [
    'index.html',
    'output.css',
    'main.js',
    'main.min.js'
  ],
  thresholds: {
    html: 50 * 1024, // 50KB
    css: 100 * 1024, // 100KB
    js: 150 * 1024   // 150KB
  }
};

/**
 * Get file size
 */
async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Get compressed size
 */
async function getCompressedSize(filePath, algorithm = 'gzip') {
  try {
    const content = await fs.readFile(filePath);
    const compressed = algorithm === 'gzip' 
      ? await gzip(content, { level: 9 })
      : await brotli(content);
    
    return compressed.length;
  } catch (error) {
    return 0;
  }
}

/**
 * Format bytes
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file type
 */
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.html') return 'HTML';
  if (ext === '.css') return 'CSS';
  if (ext === '.js') return 'JavaScript';
  return 'Other';
}

/**
 * Check if file exceeds threshold
 */
function checkThreshold(size, type) {
  const thresholds = {
    'HTML': CONFIG.thresholds.html,
    'CSS': CONFIG.thresholds.css,
    'JavaScript': CONFIG.thresholds.js
  };
  
  const threshold = thresholds[type] || Infinity;
  return size > threshold;
}

/**
 * Analyze single file
 */
async function analyzeFile(filename) {
  const filePath = path.join(CONFIG.distDir, filename);
  
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }
  
  const originalSize = await getFileSize(filePath);
  const gzipSize = await getCompressedSize(filePath, 'gzip');
  const brotliSize = await getCompressedSize(filePath, 'brotli');
  const type = getFileType(filename);
  
  return {
    filename,
    type,
    originalSize,
    gzipSize,
    brotliSize,
    gzipSavings: originalSize - gzipSize,
    brotliSavings: originalSize - brotliSize,
    exceedsThreshold: checkThreshold(originalSize, type)
  };
}

/**
 * Main analysis function
 */
async function analyzeBundle() {
  console.log('📊 Bundle Analysis\n');
  console.log('━'.repeat(80));
  
  const results = [];
  let totalOriginal = 0;
  let totalGzip = 0;
  let totalBrotli = 0;
  
  // Analyze each file
  for (const filename of CONFIG.filesToAnalyze) {
    const result = await analyzeFile(filename);
    
    if (result) {
      results.push(result);
      totalOriginal += result.originalSize;
      totalGzip += result.gzipSize;
      totalBrotli += result.brotliSize;
    }
  }
  
  // Print individual file results
  console.log('\nFile Details:\n');
  
  results.forEach(result => {
    const gzipPercent = ((result.gzipSavings / result.originalSize) * 100).toFixed(1);
    const brotliPercent = ((result.brotliSavings / result.originalSize) * 100).toFixed(1);
    const warning = result.exceedsThreshold ? ' ⚠️' : '';
    
    console.log(`${result.filename}${warning}`);
    console.log(`  Type: ${result.type}`);
    console.log(`  Original: ${formatBytes(result.originalSize)}`);
    console.log(`  Gzipped: ${formatBytes(result.gzipSize)} (${gzipPercent}% smaller)`);
    console.log(`  Brotli: ${formatBytes(result.brotliSize)} (${brotliPercent}% smaller)`);
    console.log('');
  });
  
  // Print summary
  console.log('━'.repeat(80));
  console.log('Summary:\n');
  
  const totalGzipSavings = totalOriginal - totalGzip;
  const totalBrotliSavings = totalOriginal - totalBrotli;
  const gzipPercent = ((totalGzipSavings / totalOriginal) * 100).toFixed(1);
  const brotliPercent = ((totalBrotliSavings / totalOriginal) * 100).toFixed(1);
  
  console.log(`Total Original Size: ${formatBytes(totalOriginal)}`);
  console.log(`Total Gzipped: ${formatBytes(totalGzip)} (${gzipPercent}% smaller)`);
  console.log(`Total Brotli: ${formatBytes(totalBrotli)} (${brotliPercent}% smaller)`);
  
  // Recommendations
  console.log('\n━'.repeat(80));
  console.log('Recommendations:\n');
  
  const warnings = results.filter(r => r.exceedsThreshold);
  if (warnings.length > 0) {
    console.log('⚠️  The following files exceed recommended size thresholds:');
    warnings.forEach(w => {
      console.log(`  - ${w.filename} (${formatBytes(w.originalSize)})`);
    });
    console.log('\nConsider:');
    console.log('  • Code splitting for large JavaScript files');
    console.log('  • Removing unused CSS with PurgeCSS');
    console.log('  • Lazy loading components');
    console.log('  • Using dynamic imports');
  } else {
    console.log('✓ All files are within recommended size thresholds');
  }
  
  console.log('\n✓ Enable gzip/brotli compression on your server for optimal delivery');
  console.log('✓ Consider using a CDN for static assets');
  console.log('✓ Implement browser caching with appropriate cache headers');
  
  console.log('\n━'.repeat(80));
  console.log('✨ Analysis complete!\n');
}

// Run analysis
if (require.main === module) {
  analyzeBundle().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { analyzeBundle, analyzeFile };
