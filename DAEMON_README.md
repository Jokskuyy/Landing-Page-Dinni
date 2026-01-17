# Daemon & Production Scripts

Scripts untuk auto-build dan deployment di server production.

## 📋 Available Scripts

### 1. **Development Mode** (dengan file watching)

```bash
npm run daemon
# atau
npm start
```

**Fitur:**

- Auto-rebuild CSS ketika file di `src/` berubah
- Auto-rebuild JS ketika file di `src/js/` berubah
- Live server di `http://0.0.0.0:3000`
- File watching dengan debounce (500ms)
- Color-coded logging untuk debugging

**Kapan digunakan:** Development lokal dengan auto-reload

---

### 2. **Production Mode** (single build + serve)

```bash
npm run production
```

**Fitur:**

- Build lengkap: CSS (minified) + JS (minified) + HTML (minified) + Image optimization
- Server production di `http://0.0.0.0:8080`
- Cache enabled (1 jam)
- Gzip & Brotli compression
- No file watching (untuk production)

**Kapan digunakan:** Deploy ke server production

---

### 3. **Full Deploy** (build + production)

```bash
npm run deploy
```

**Fitur:**

- Jalankan `npm run build` (clean + build semua assets)
- Lanjut ke `npm run production` (serve hasil build)

**Kapan digunakan:** First-time deployment atau major update

---

## 🚀 Quick Start - Development

```bash
# Clone repo
git clone <repo-url>
cd Landing-Page-Dinni

# Install dependencies
npm install

# Start development daemon
npm start
```

Server akan jalan di `http://localhost:3000`. Edit file di `src/` atau `dist/`, daemon akan auto-rebuild.

---

## 🏭 Quick Start - Production Server

```bash
# Di server production (VPS, cloud, etc)
npm install --production=false
npm run deploy
```

Server akan jalan di `http://0.0.0.0:8080` dengan semua optimizations.

---

## 🔧 Configuration

### Daemon Settings

Edit `scripts/daemon.js`:

```javascript
const CONFIG = {
  srcDir: path.join(__dirname, "..", "src"),
  distDir: path.join(__dirname, "..", "dist"),
  port: process.env.PORT || 3000, // ← Ubah port di sini
  host: process.env.HOST || "0.0.0.0",
  watchPaths: [
    "src/**/*.css",
    "src/**/*.js",
    "dist/**/*.html",
    // Tambah path lain jika perlu
  ],
};
```

### Production Settings

Edit `scripts/production.js`:

```javascript
const CONFIG = {
  distDir: path.join(__dirname, "..", "dist"),
  port: process.env.PORT || 8080, // ← Ubah port di sini
  host: process.env.HOST || "0.0.0.0",
};
```

---

## 🐳 Docker Deployment (Optional)

Buat `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "production"]
```

Build & run:

```bash
docker build -t landing-page .
docker run -p 8080:8080 landing-page
```

---

## 🔄 Systemd Service (Linux Server)

Buat file `/etc/systemd/system/landing-page.service`:

```ini
[Unit]
Description=Landing Page - Dinni Rahmawati
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/landing-page
ExecStart=/usr/bin/npm run production
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=landing-page

Environment=NODE_ENV=production
Environment=PORT=8080

[Install]
WantedBy=multi-user.target
```

Enable & start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable landing-page
sudo systemctl start landing-page
sudo systemctl status landing-page
```

---

## 📊 Monitoring Logs

### Daemon Mode

Logs akan muncul di terminal dengan color coding:

- `[INFO]` (cyan): Informasi umum
- `[SUCCESS]` (green): Build/action berhasil
- `[WARN]` (yellow): Warning (tidak blocking)
- `[ERROR]` (red): Error (perlu perhatian)

### Production Mode

Standard output ke terminal atau syslog (jika pakai systemd).

---

## 🛑 Stopping Services

### Development Daemon

```bash
# Tekan Ctrl+C di terminal
```

### Production Server

```bash
# Jika di terminal: Ctrl+C
# Jika systemd:
sudo systemctl stop landing-page
```

---

## 🔍 Troubleshooting

### Port sudah digunakan

```bash
# Cek port yang digunakan
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>

# Atau ubah port di CONFIG
```

### Build error "Cannot find module"

```bash
npm install
```

### File watching tidak jalan

```bash
# Pastikan chokidar terinstall
npm install --save-dev chokidar

# Re-run daemon
npm start
```

### CSS tidak update

```bash
# Manual build CSS
npm run build:css

# Hard refresh browser: Ctrl+Shift+R
```

---

## 📁 File Structure

```
Landing-Page-Dinni/
├── scripts/
│   ├── daemon.js         # Development daemon dengan file watching
│   ├── production.js     # Production build & serve
│   ├── build-js.js       # JS bundler & minifier
│   ├── minify-html.js    # HTML minifier
│   └── optimize-images.js # Image optimizer
├── src/
│   ├── input.css         # Source CSS (TailwindCSS)
│   └── js/               # Source JavaScript
├── dist/                 # Build output (served)
└── package.json
```

---

## 🎯 Best Practices

1. **Development:** Gunakan `npm start` untuk edit & test
2. **Before Deploy:** Jalankan `npm run build` untuk ensure semua assets ter-optimize
3. **Production:** Gunakan `npm run production` atau systemd service
4. **Updates:** Setelah git pull, jalankan `npm install` lalu restart service

---

## 📞 Support

Jika ada issue, cek:

1. Logs di terminal
2. Browser console (F12)
3. File permissions di server
4. Port availability

---

## 📝 Notes

- Daemon mode cocok untuk development dengan auto-reload
- Production mode tidak ada file watching (hemat resource)
- Gzip & Brotli compression otomatis enabled
- CSS & JS otomatis di-minify
- HTML minification bisa di-disable di `scripts/production.js` jika menyebabkan masalah
