/**
 * Service Worker for Progressive Web App
 * Caching strategy for offline support and faster loading
 */

const CACHE_NAME = 'dinni-landing-v1';
const RUNTIME_CACHE = 'dinni-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './output.css',
  './main.min.js',
  './images/logo-web.png'
];

// Cache-first strategy for these patterns
const CACHE_FIRST_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
  /\.(?:css|js)$/
];

/**
 * Install event - cache precache assets
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

/**
 * Fetch event - serve from cache or network
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) return;
  
  // Determine caching strategy
  const shouldCacheFirst = CACHE_FIRST_PATTERNS.some(pattern => 
    pattern.test(url.pathname)
  );
  
  if (shouldCacheFirst) {
    // Cache-first strategy
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type === 'error') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE)
                .then(cache => cache.put(request, responseToCache));
              
              return response;
            });
        })
    );
  } else {
    // Network-first strategy
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE)
            .then(cache => cache.put(request, responseToCache));
          
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});

/**
 * Message event - handle cache updates
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
