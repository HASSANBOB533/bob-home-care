/**
 * Service Worker for BOB Home Care Website
 * Enables offline support and intelligent caching
 * Cache Strategy: Network first, fallback to cache
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `bob-home-care-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/lazy-load.js',
  '/blog-kitchen-cleaning.html',
  '/blog-bathroom-cleaning.html',
  '/blog-bedroom-cleaning.html',
  '/blog-airbnb-cleaning.html',
  '/blog-eco-products.html',
  '/blog-cleaning-schedule.html'
];

// Image assets to cache
const IMAGE_ASSETS = [
  '/images/ChatGPTImageNov24,2025,05_56_54PM.webp',
  '/images/bob-logo-new.webp',
  '/images/Housekeeping-11.webp',
  '/images/GreenBG.webp'
];

/**
 * Install Event - Cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn('[Service Worker] Error caching static assets:', err);
        });
      }),
      // Cache critical images
      caches.open(IMAGE_CACHE).then((cache) => {
        console.log('[Service Worker] Caching critical images');
        return cache.addAll(IMAGE_ASSETS).catch((err) => {
          console.warn('[Service Worker] Error caching images:', err);
        });
      })
    ]).then(() => {
      console.log('[Service Worker] Installation complete');
      self.skipWaiting();
    })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old cache versions
          if (cacheName !== STATIC_CACHE && 
              cacheName !== IMAGE_CACHE && 
              cacheName !== API_CACHE &&
              cacheName.includes('bob-home-care')) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

/**
 * Fetch Event - Network first, fallback to cache
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different resource types
  if (request.destination === 'image') {
    event.respondWith(cacheImage(request));
  } else if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(cacheStatic(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

/**
 * Cache strategy: Network first, fallback to cache
 * Used for HTML pages
 */
function cacheFirst(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response;
    }

    return fetch(request).then((response) => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200 || response.type === 'error') {
        return response;
      }

      // Clone the response
      const responseToCache = response.clone();

      // Cache the response
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    }).catch(() => {
      // Return offline page if available
      return caches.match('/index.html');
    });
  });
}

/**
 * Cache strategy: Stale while revalidate
 * Used for static assets (CSS, JS)
 */
function cacheStatic(request) {
  return caches.match(request).then((response) => {
    const fetchPromise = fetch(request).then((response) => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200) {
        return response;
      }

      // Clone and cache the response
      const responseToCache = response.clone();
      caches.open(STATIC_CACHE).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    });

    // Return cached response immediately, update in background
    return response || fetchPromise;
  });
}

/**
 * Cache strategy: Cache first for images
 * Used for image assets
 */
function cacheImage(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response;
    }

    return fetch(request).then((response) => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200) {
        return response;
      }

      // Clone and cache the response
      const responseToCache = response.clone();
      caches.open(IMAGE_CACHE).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    }).catch(() => {
      // Return placeholder or cached image
      return caches.match('/images/GreenBG.webp');
    });
  });
}

/**
 * Message handling for cache updates
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.includes('bob-home-care')) {
            return caches.delete(cacheName);
          }
        })
      );
    });
  }
});

console.log('[Service Worker] Service Worker script loaded');
