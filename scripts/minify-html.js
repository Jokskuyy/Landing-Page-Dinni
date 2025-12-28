#!/usr/bin/env node

/**
 * HTML Minification Script
 * Minifies HTML files for production
 */

const fs = require("fs").promises;
const path = require("path");
const { minify } = require("html-minifier-terser");

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, "..", "dist"),
  htmlFiles: [
    "index.html",
    "mentoring.html",
    "proofreading.html",
    "showcase.html",
  ],
  minifyOptions: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    sortAttributes: true,
    sortClassName: true,
    decodeEntities: true,
    collapseBooleanAttributes: true,
    caseSensitive: false,
    keepClosingSlash: false,
    processConditionalComments: true,
    preventAttributesEscaping: false,
    quoteCharacter: '"',
  },
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
 * Format bytes
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Minify single HTML file
 */
async function minifyHTMLFile(filePath) {
  try {
    const originalContent = await fs.readFile(filePath, "utf-8");
    const originalSize = Buffer.byteLength(originalContent, "utf-8");

    const minified = await minify(originalContent, CONFIG.minifyOptions);
    const minifiedSize = Buffer.byteLength(minified, "utf-8");

    // Create backup
    const backupPath = `${filePath}.backup`;
    await fs.writeFile(backupPath, originalContent, "utf-8");

    // Write minified version
    await fs.writeFile(filePath, minified, "utf-8");

    const saved = originalSize - minifiedSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);

    return {
      filename: path.basename(filePath),
      originalSize,
      minifiedSize,
      saved,
      percent,
    };
  } catch (error) {
    console.error(
      `❌ Failed to minify ${path.basename(filePath)}:`,
      error.message
    );
    return null;
  }
}

/**
 * Minify all HTML files
 */
async function minifyAllHTML() {
  console.log("📄 HTML Minification Started\n");

  const stats = {
    files: [],
    totalOriginalSize: 0,
    totalMinifiedSize: 0,
  };

  try {
    for (const filename of CONFIG.htmlFiles) {
      const filePath = path.join(CONFIG.inputDir, filename);

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        console.log(`⚠️  ${filename} not found, skipping...`);
        continue;
      }

      console.log(`Processing ${filename}...`);
      const result = await minifyHTMLFile(filePath);

      if (result) {
        stats.files.push(result);
        stats.totalOriginalSize += result.originalSize;
        stats.totalMinifiedSize += result.minifiedSize;

        console.log(
          `✓ ${result.filename}: ${formatBytes(
            result.originalSize
          )} → ${formatBytes(result.minifiedSize)} (${result.percent}% saved)\n`
        );
      }
    }

    // Print summary
    console.log("📊 Minification Summary");
    console.log("━".repeat(60));
    console.log(`Files processed: ${stats.files.length}`);
    console.log(`Original size: ${formatBytes(stats.totalOriginalSize)}`);
    console.log(`Minified size: ${formatBytes(stats.totalMinifiedSize)}`);

    const totalSaved = stats.totalOriginalSize - stats.totalMinifiedSize;
    const totalPercent =
      stats.totalOriginalSize > 0
        ? ((totalSaved / stats.totalOriginalSize) * 100).toFixed(1)
        : 0;

    console.log(`Total saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
    console.log("━".repeat(60));

    console.log("\n✨ HTML minification complete!");
    console.log("ℹ️  Backups saved with .backup extension");
  } catch (error) {
    console.error("❌ Minification failed:", error.message);
    process.exit(1);
  }
}

// Run minification
if (require.main === module) {
  minifyAllHTML().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { minifyAllHTML, minifyHTMLFile };
