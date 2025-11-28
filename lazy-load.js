/**
 * Lazy Loading Enhancement Script
 * Provides fallback support for browsers that don't support native lazy loading
 * Also adds performance optimizations for image loading
 */

(function() {
  'use strict';

  // Check if browser supports native lazy loading
  const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;

  // If browser supports native lazy loading, we're done
  if (supportsLazyLoading) {
    console.log('Native lazy loading supported');
    return;
  }

  // Fallback: Use Intersection Observer API for older browsers
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('lazy-loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe all images with loading="lazy"
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (!img.src && img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  } else {
    // Very old browser fallback: load all images immediately
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  // Optimize image loading with srcset support
  const optimizeImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add decoding="async" for non-blocking image decoding
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  };

  // Run optimization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeImages);
  } else {
    optimizeImages();
  }

  // Monitor for dynamically added images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'IMG') {
            if (!node.hasAttribute('decoding')) {
              node.setAttribute('decoding', 'async');
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('Lazy loading enhancement script loaded');
})();
