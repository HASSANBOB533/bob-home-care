/**
 * Service Worker Registration Script
 * Registers the service worker and handles updates
 */

(function() {
  'use strict';

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return;
  }

  // Register service worker when page loads
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    }).then((registration) => {
      console.log('[SW Register] Service Worker registered:', registration);

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every 60 seconds

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[SW Register] New Service Worker found');

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is ready
            console.log('[SW Register] New Service Worker ready');
            
            // Show update notification (optional)
            if (confirm('A new version of BOB Home Care is available. Reload to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      });
    }).catch((error) => {
      console.error('[SW Register] Service Worker registration failed:', error);
    });

    // Handle service worker controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW Register] Service Worker controller changed');
    });
  });

  // Handle offline/online events
  window.addEventListener('offline', () => {
    console.log('[SW Register] Application is offline');
    // You could show a notification here
  });

  window.addEventListener('online', () => {
    console.log('[SW Register] Application is online');
    // You could hide the offline notification here
  });

  console.log('[SW Register] Service Worker registration script loaded');
})();
