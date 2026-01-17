#!/usr/bin/env node

/**
 * Daemon Script for Landing Page
 * Auto-builds and serves the site on server
 * Watches for changes and rebuilds automatically
 */

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const CONFIG = {
  srcDir: path.join(__dirname, "..", "src"),
  distDir: path.join(__dirname, "..", "dist"),
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0",
  watchPaths: [
    "src/**/*.css",
    "src/**/*.js",
    "dist/**/*.html",
    "tailwind.config.js",
    "postcss.config.js",
  ],
};

let buildInProgress = false;
let serverProcess = null;

// Logging utility
const log = {
  info: (msg) =>
    console.log(
      `\x1b[36m[INFO]\x1b[0m ${new Date().toLocaleTimeString()} - ${msg}`
    ),
  success: (msg) =>
    console.log(
      `\x1b[32m[SUCCESS]\x1b[0m ${new Date().toLocaleTimeString()} - ${msg}`
    ),
  error: (msg) =>
    console.error(
      `\x1b[31m[ERROR]\x1b[0m ${new Date().toLocaleTimeString()} - ${msg}`
    ),
  warn: (msg) =>
    console.warn(
      `\x1b[33m[WARN]\x1b[0m ${new Date().toLocaleTimeString()} - ${msg}`
    ),
};

// Build function
async function build() {
  if (buildInProgress) {
    log.warn("Build already in progress, skipping...");
    return;
  }

  buildInProgress = true;
  log.info("Starting build process...");

  try {
    // Build CSS
    log.info("Building CSS with TailwindCSS...");
    await runCommand("npx", [
      "tailwindcss",
      "-i",
      "./src/input.css",
      "-o",
      "./dist/output.css",
      "--minify",
    ]);
    log.success("CSS built successfully");

    // Build JS
    log.info("Building JavaScript...");
    await runCommand("node", ["./scripts/build-js.js"]);
    log.success("JavaScript built successfully");

    // Minify HTML (optional, comment out if causing issues)
    // log.info('Minifying HTML...');
    // await runCommand('node', ['./scripts/minify-html.js']);
    // log.success('HTML minified successfully');

    log.success("🎉 Build completed successfully!");
  } catch (error) {
    log.error(`Build failed: ${error.message}`);
  } finally {
    buildInProgress = false;
  }
}

// Run command helper
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: "pipe",
      shell: true,
      cwd: path.join(__dirname, ".."),
    });

    let output = "";
    let errorOutput = "";

    proc.stdout.on("data", (data) => {
      output += data.toString();
    });

    proc.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(errorOutput || `Process exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

// Start HTTP server
function startServer() {
  if (serverProcess) {
    log.warn("Server already running, restarting...");
    serverProcess.kill();
  }

  log.info(`Starting HTTP server on ${CONFIG.host}:${CONFIG.port}...`);

  serverProcess = spawn(
    "npx",
    [
      "http-server",
      CONFIG.distDir,
      "-p",
      CONFIG.port.toString(),
      "-a",
      CONFIG.host,
      "-c-1",
      "--gzip",
      "--brotli",
      "--cors",
    ],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  serverProcess.on("error", (err) => {
    log.error(`Server error: ${err.message}`);
  });

  serverProcess.on("close", (code) => {
    if (code !== 0) {
      log.error(`Server exited with code ${code}`);
    }
  });

  log.success(`Server running at http://${CONFIG.host}:${CONFIG.port}`);
}

// Watch for file changes
function watchFiles() {
  log.info("Starting file watcher...");

  const watcher = chokidar.watch(CONFIG.watchPaths, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });

  let debounceTimer = null;

  watcher
    .on("change", (path) => {
      log.info(`File changed: ${path}`);

      // Debounce builds to avoid multiple rapid rebuilds
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        build();
      }, 500);
    })
    .on("error", (error) => {
      log.error(`Watcher error: ${error}`);
    });

  log.success("File watcher started");
}

// Graceful shutdown
function shutdown() {
  log.info("Shutting down daemon...");

  if (serverProcess) {
    serverProcess.kill();
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Main execution
async function main() {
  console.log("\x1b[35m");
  console.log("╔═══════════════════════════════════════════╗");
  console.log("║   Landing Page - Production Daemon       ║");
  console.log("║   Auto-build & Serve                      ║");
  console.log("╚═══════════════════════════════════════════╝");
  console.log("\x1b[0m");

  // Initial build
  await build();

  // Start server
  startServer();

  // Watch for changes
  watchFiles();

  log.success("Daemon is running. Press Ctrl+C to stop.");
}

main().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
