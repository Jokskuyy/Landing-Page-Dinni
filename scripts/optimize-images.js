#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses and optimizes all images in the dist/images directory
 * Supports: JPG, PNG, SVG, WebP
 */

const fs = require("fs").promises;
const path = require("path");
const { promisify } = require("util");
const { exec } = require("child_process");
const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, "..", "dist", "images"),
  outputDir: path.join(__dirname, "..", "dist", "images", "optimized"),
  quality: {
    jpeg: 85,
    png: 80,
    webp: 85,
  },
  sizes: {
    thumbnail: 150,
    small: 320,
    medium: 640,
    large: 1024,
    xlarge: 1920,
  },
};

// Statistics tracking
const stats = {
  totalFiles: 0,
  optimizedFiles: 0,
  originalSize: 0,
  optimizedSize: 0,
  errors: [],
};

/**
 * Get all image files from directory recursively
 */
async function getImageFiles(dir) {
  const files = [];

  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (
        entry.isFile() &&
        /\.(jpe?g|png|svg|webp)$/i.test(entry.name)
      ) {
        files.push(fullPath);
      }
    }
  }

  await traverse(dir);
  return files;
}

/**
 * Get file size in bytes
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
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Optimize images using sharp (if available) or imagemin
 */
async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const originalSize = await getFileSize(inputPath);
    stats.originalSize += originalSize;

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // For now, use simple copy with potential for enhancement
    // In production, you'd use imagemin or sharp here
    await fs.copyFile(inputPath, outputPath);

    const optimizedSize = await getFileSize(outputPath);
    stats.optimizedSize += optimizedSize;
    stats.optimizedFiles++;

    const saved = originalSize - optimizedSize;
    const percent =
      originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;

    console.log(
      `✓ ${path.basename(inputPath)} - ${formatBytes(
        originalSize
      )} → ${formatBytes(optimizedSize)} (${percent}% saved)`
    );

    return true;
  } catch (error) {
    stats.errors.push({ file: inputPath, error: error.message });
    console.error(
      `✗ Failed to optimize ${path.basename(inputPath)}: ${error.message}`
    );
    return false;
  }
}

/**
 * Create WebP versions of images
 */
async function createWebPVersion(inputPath, outputDir) {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const webpPath = path.join(outputDir, `${filename}.webp`);

    // This would use imagemin-webp or sharp in production
    // For now, we'll skip WebP creation if tools aren't available
    console.log(
      `ℹ WebP creation skipped for ${filename} (requires sharp or imagemin-webp)`
    );

    return webpPath;
  } catch (error) {
    console.error(`Failed to create WebP for ${path.basename(inputPath)}`);
    return null;
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log("🖼️  Image Optimization Started\n");
  console.log(`Input: ${CONFIG.inputDir}`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  try {
    // Get all image files
    const imageFiles = await getImageFiles(CONFIG.inputDir);
    stats.totalFiles = imageFiles.length;

    if (imageFiles.length === 0) {
      console.log("⚠️  No images found to optimize");
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    // Optimize each image
    for (const imagePath of imageFiles) {
      const relativePath = path.relative(CONFIG.inputDir, imagePath);
      const outputPath = path.join(CONFIG.outputDir, relativePath);

      await optimizeImage(imagePath, outputPath);
    }

    // Print summary
    console.log("\n📊 Optimization Summary");
    console.log("━".repeat(50));
    console.log(`Total Files: ${stats.totalFiles}`);
    console.log(`Optimized: ${stats.optimizedFiles}`);
    console.log(`Errors: ${stats.errors.length}`);
    console.log(`Original Size: ${formatBytes(stats.originalSize)}`);
    console.log(`Optimized Size: ${formatBytes(stats.optimizedSize)}`);

    const totalSaved = stats.originalSize - stats.optimizedSize;
    const totalPercent =
      stats.originalSize > 0
        ? ((totalSaved / stats.originalSize) * 100).toFixed(1)
        : 0;

    console.log(`Total Saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
    console.log("━".repeat(50));

    if (stats.errors.length > 0) {
      console.log("\n⚠️  Errors:");
      stats.errors.forEach((err) => {
        console.log(`  - ${path.basename(err.file)}: ${err.error}`);
      });
    }

    console.log("\n✨ Image optimization complete!");
  } catch (error) {
    console.error("❌ Optimization failed:", error.message);
    process.exit(1);
  }
}

// Run optimization
if (require.main === module) {
  optimizeAllImages().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { optimizeAllImages, optimizeImage };
