#!/usr/bin/env node

/**
 * JavaScript Build & Optimization Script
 * Bundles, minifies, and optimizes JavaScript files
 */

const fs = require('fs').promises;
const path = require('path');
const { minify } = require('terser');

// Configuration
const CONFIG = {
  input: {
    main: path.join(__dirname, '..', 'dist', 'main.js'),
    carousel: path.join(__dirname, '..', 'src', 'js', 'enhanced-carousel.js'),
    utils: path.join(__dirname, '..', 'src', 'js', 'utils', 'index.js'),
    logos: path.join(__dirname, '..', 'src', 'js', 'data', 'logos.js')
  },
  output: {
    main: path.join(__dirname, '..', 'dist', 'main.min.js'),
    bundle: path.join(__dirname, '..', 'dist', 'bundle.min.js')
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
      passes: 2,
      unsafe_arrows: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true
    },
    mangle: {
      toplevel: true,
      properties: false
    },
    format: {
      comments: false,
      preamble: '/* Dinni Rahmawati Landing Page - Optimized Bundle */'
    },
    sourceMap: false
  }
};

/**
 * Read file content
 */
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`❌ Failed to read ${path.basename(filePath)}:`, error.message);
    return '';
  }
}

/**
 * Write file content
 */
async function writeFile(filePath, content) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Failed to write ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

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
 * Minify JavaScript code
 */
async function minifyJS(code, filename) {
  try {
    const result = await minify(code, CONFIG.terserOptions);
    
    if (result.error) {
      throw result.error;
    }
    
    return result.code;
  } catch (error) {
    console.error(`❌ Failed to minify ${filename}:`, error.message);
    return code; // Return original code if minification fails
  }
}

/**
 * Bundle and optimize JavaScript files
 */
async function buildJS() {
  console.log('⚡ JavaScript Build Started\n');
  
  const stats = {
    files: [],
    totalOriginalSize: 0,
    totalMinifiedSize: 0
  };
  
  try {
    // Process main.js
    console.log('📦 Processing main.js...');
    const mainContent = await readFile(CONFIG.input.main);
    
    if (mainContent) {
      const originalSize = Buffer.byteLength(mainContent, 'utf-8');
      stats.totalOriginalSize += originalSize;
      
      // Remove ES6 imports for browser compatibility
      const browserCompatible = mainContent
        .replace(/import .+ from .+;?\n?/g, '')
        .replace(/export (default|const|function|class) /g, '');
      
      const minified = await minifyJS(browserCompatible, 'main.js');
      const minifiedSize = Buffer.byteLength(minified, 'utf-8');
      stats.totalMinifiedSize += minifiedSize;
      
      await writeFile(CONFIG.output.main, minified);
      
      stats.files.push({
        name: 'main.js',
        original: originalSize,
        minified: minifiedSize,
        saved: originalSize - minifiedSize
      });
      
      console.log(`✓ main.js: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)}`);
    }
    
    // Create optimized carousel bundle
    console.log('\n📦 Creating carousel bundle...');
    const carouselContent = await readFile(CONFIG.input.carousel);
    
    if (carouselContent) {
      const originalSize = Buffer.byteLength(carouselContent, 'utf-8');
      const minified = await minifyJS(carouselContent, 'carousel.js');
      const carouselOutput = path.join(path.dirname(CONFIG.output.main), 'carousel.min.js');
      
      await writeFile(carouselOutput, minified);
      console.log(`✓ carousel.min.js created`);
    }
    
    // Print summary
    console.log('\n📊 Build Summary');
    console.log('━'.repeat(60));
    
    stats.files.forEach(file => {
      const percent = ((file.saved / file.original) * 100).toFixed(1);
      console.log(`${file.name}:`);
      console.log(`  Original: ${formatBytes(file.original)}`);
      console.log(`  Minified: ${formatBytes(file.minified)}`);
      console.log(`  Saved: ${formatBytes(file.saved)} (${percent}%)\n`);
    });
    
    const totalSaved = stats.totalOriginalSize - stats.totalMinifiedSize;
    const totalPercent = stats.totalOriginalSize > 0
      ? ((totalSaved / stats.totalOriginalSize) * 100).toFixed(1)
      : 0;
    
    console.log('Total:');
    console.log(`  Original: ${formatBytes(stats.totalOriginalSize)}`);
    console.log(`  Minified: ${formatBytes(stats.totalMinifiedSize)}`);
    console.log(`  Saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
    console.log('━'.repeat(60));
    
    console.log('\n✨ JavaScript build complete!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build
if (require.main === module) {
  buildJS().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { buildJS, minifyJS };
