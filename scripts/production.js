#!/usr/bin/env node

/**
 * Production Deployment Script
 * Builds and serves the site for production
 * No file watching - just build once and serve
 */

const { spawn } = require("child_process");
const path = require("path");

const CONFIG = {
  distDir: path.join(__dirname, "..", "dist"),
  port: process.env.PORT || 8080,
  host: process.env.HOST || "0.0.0.0",
};

const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
};

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
      cwd: path.join(__dirname, ".."),
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    proc.on("error", reject);
  });
}

async function build() {
  log.info("🔨 Building production assets...");

  try {
    // Build CSS
    log.info("Building CSS...");
    await runCommand("npx", [
      "tailwindcss",
      "-i",
      "./src/input.css",
      "-o",
      "./dist/output.css",
      "--minify",
    ]);

    // Build JS
    log.info("Building JavaScript...");
    await runCommand("node", ["./scripts/build-js.js"]);

    // Minify HTML
    log.info("Minifying HTML...");
    await runCommand("node", ["./scripts/minify-html.js"]);

    // Optimize images
    log.info("Optimizing images...");
    await runCommand("node", ["./scripts/optimize-images.js"]);

    log.success("✅ Build completed successfully!");
  } catch (error) {
    log.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

function startServer() {
  log.info(`🚀 Starting production server on ${CONFIG.host}:${CONFIG.port}...`);

  const server = spawn(
    "npx",
    [
      "http-server",
      CONFIG.distDir,
      "-p",
      CONFIG.port.toString(),
      "-a",
      CONFIG.host,
      "-c",
      "3600", // Cache for 1 hour
      "--gzip",
      "--brotli",
      "--cors",
    ],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  server.on("error", (err) => {
    log.error(`Server error: ${err.message}`);
    process.exit(1);
  });

  log.success(`✅ Server running at http://${CONFIG.host}:${CONFIG.port}`);
  log.info("Press Ctrl+C to stop the server");
}

async function main() {
  console.log("\x1b[35m");
  console.log("╔════════════════════════════════════════╗");
  console.log("║   Production Build & Deployment       ║");
  console.log("║   Landing Page - Dinni Rahmawati      ║");
  console.log("╚════════════════════════════════════════╝");
  console.log("\x1b[0m\n");

  await build();
  startServer();
}

main().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
