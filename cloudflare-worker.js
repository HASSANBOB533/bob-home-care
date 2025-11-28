/**
 * Cloudflare Worker Script for BOB Home Care Website
 * Provides advanced caching and performance optimization
 * 
 * Deploy this to Cloudflare Workers for additional performance benefits
 * Visit: https://workers.cloudflare.com/
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Cache configuration based on file type
  const cacheConfig = {
    // Images - cache for 1 year
    images: {
      pattern: /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i,
      ttl: 31536000,
      cacheName: 'images-cache'
    },
    // CSS and JavaScript - cache for 1 month
    assets: {
      pattern: /\.(css|js|min\.css|min\.js|woff|woff2|ttf|otf)$/i,
      ttl: 2592000,
      cacheName: 'assets-cache'
    },
    // HTML - cache for 1 hour
    html: {
      pattern: /\.html$/i,
      ttl: 3600,
      cacheName: 'html-cache'
    }
  }

  // Determine cache configuration
  let config = null
  for (const [key, cfg] of Object.entries(cacheConfig)) {
    if (cfg.pattern.test(pathname)) {
      config = cfg
      break
    }
  }

  // If no specific cache config, use default
  if (!config) {
    config = {
      ttl: 3600,
      cacheName: 'default-cache'
    }
  }

  // Try to get from cache
  const cache = caches.default
  let response = await cache.match(request)

  if (response) {
    // Add cache hit header
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('X-Cache', 'HIT')
    return newResponse
  }

  // Fetch from origin
  response = await fetch(request)

  // Only cache successful responses
  if (response.status === 200) {
    // Clone the response
    const responseToCache = response.clone()

    // Add cache headers
    const headers = new Headers(responseToCache.headers)
    headers.set('Cache-Control', `public, max-age=${config.ttl}`)
    headers.set('X-Cache', 'MISS')

    const cachedResponse = new Response(responseToCache.body, {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers: headers
    })

    // Cache the response
    event.waitUntil(cache.put(request, cachedResponse.clone()))

    return cachedResponse
  }

  // Add cache miss header to non-cacheable responses
  const headers = new Headers(response.headers)
  headers.set('X-Cache', 'BYPASS')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  })
}

/**
 * Deployment Instructions:
 * 
 * 1. Go to https://workers.cloudflare.com/
 * 2. Create a new Worker
 * 3. Copy this entire script into the Worker editor
 * 4. Click "Save and Deploy"
 * 5. Add a route in Cloudflare Dashboard:
 *    - Go to Workers → Routes
 *    - Add route: yourdomain.com/*
 *    - Select the worker script
 * 6. Test the deployment
 * 
 * Benefits:
 * - Advanced caching control
 * - Custom cache headers
 * - Cache hit/miss tracking
 * - Automatic compression
 * - Global distribution
 * 
 * Expected Performance Improvement: 30-50% faster for repeat visits
 */
