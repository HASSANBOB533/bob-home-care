/**
 * BOB Home Care - Conversion Tracking
 * 
 * This file tracks user interactions and sends events to Google Analytics 4 via GTM dataLayer
 * 
 * Events tracked:
 * - Form submissions (booking forms)
 * - Phone number clicks
 * - WhatsApp button clicks
 * - Email clicks
 * - Quote request buttons
 * - Service card views
 */

// Initialize dataLayer if not already present
window.dataLayer = window.dataLayer || [];

// Helper function to push events to dataLayer
function trackEvent(eventName, eventData) {
  window.dataLayer.push({
    event: eventName,
    ...eventData
  });
  console.log('Event tracked:', eventName, eventData);
}

// 1. Track Booking Form Submissions
document.addEventListener('DOMContentLoaded', function() {
  
  // Track all form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      const formName = form.getAttribute('name') || form.getAttribute('id') || 'unknown_form';
      const serviceType = form.querySelector('select[name="service"]')?.value || 
                         form.querySelector('input[name="service"]')?.value || 
                         'not_specified';
      
      trackEvent('form_submission', {
        form_name: formName,
        service_type: serviceType,
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 2. Track Phone Number Clicks
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const phoneNumber = this.href.replace('tel:', '').replace(/\s/g, '');
      
      trackEvent('phone_click', {
        phone_number: phoneNumber,
        link_text: this.textContent.trim(),
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 3. Track WhatsApp Clicks
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp"]');
  whatsappLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const isFloating = this.classList.contains('floating') || 
                        this.classList.contains('whatsapp-float') ||
                        this.classList.contains('fixed');
      
      trackEvent('whatsapp_click', {
        source: isFloating ? 'floating_button' : 'inline_link',
        link_text: this.textContent.trim() || 'WhatsApp Button',
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 4. Track Email Clicks
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const email = this.href.replace('mailto:', '').split('?')[0];
      
      trackEvent('email_click', {
        email: email,
        link_text: this.textContent.trim(),
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 5. Track "Get Quote" / "Book Now" Button Clicks
  const quoteButtons = document.querySelectorAll(
    'a[href*="quote"], a[href*="book"], ' +
    'button[class*="quote"], button[class*="book"], ' +
    'a[class*="cta"], button[class*="cta"]'
  );
  quoteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      const buttonLocation = this.closest('section')?.className || 
                            this.closest('div[class*="section"]')?.className || 
                            'unknown';
      
      trackEvent('quote_request', {
        button_text: buttonText,
        button_location: buttonLocation,
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 6. Track Service Card/Item Views (on click)
  const serviceCards = document.querySelectorAll('.service-card, .service-item, [class*="service"]');
  serviceCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const serviceName = this.querySelector('h2, h3, h4')?.textContent.trim() || 
                         this.getAttribute('data-service') || 
                         'unknown_service';
      
      trackEvent('service_view', {
        service_name: serviceName,
        page_url: window.location.href,
        page_title: document.title
      });
    });
  });

  // 7. Track Outbound Link Clicks
  const allLinks = document.querySelectorAll('a[href^="http"]');
  allLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const linkUrl = this.href;
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(linkUrl).hostname;
      
      // Only track if it's an external link
      if (linkDomain !== currentDomain) {
        trackEvent('outbound_click', {
          link_url: linkUrl,
          link_domain: linkDomain,
          link_text: this.textContent.trim(),
          page_url: window.location.href
        });
      }
    });
  });

  // 8. Track Social Media Clicks
  const socialLinks = document.querySelectorAll(
    'a[href*="facebook.com"], a[href*="instagram.com"], ' +
    'a[href*="twitter.com"], a[href*="linkedin.com"], ' +
    'a[href*="youtube.com"], a[href*="tiktok.com"]'
  );
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const linkUrl = this.href;
      let platform = 'unknown';
      
      if (linkUrl.includes('facebook')) platform = 'facebook';
      else if (linkUrl.includes('instagram')) platform = 'instagram';
      else if (linkUrl.includes('twitter')) platform = 'twitter';
      else if (linkUrl.includes('linkedin')) platform = 'linkedin';
      else if (linkUrl.includes('youtube')) platform = 'youtube';
      else if (linkUrl.includes('tiktok')) platform = 'tiktok';
      
      trackEvent('social_click', {
        platform: platform,
        link_url: linkUrl,
        page_url: window.location.href
      });
    });
  });

  // 9. Track Scroll Depth (25%, 50%, 75%, 100%)
  let scrollDepths = {
    25: false,
    50: false,
    75: false,
    100: false
  };

  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    Object.keys(scrollDepths).forEach(function(depth) {
      if (scrollPercent >= depth && !scrollDepths[depth]) {
        scrollDepths[depth] = true;
        trackEvent('scroll_depth', {
          depth: depth + '%',
          page_url: window.location.href,
          page_title: document.title
        });
      }
    });
  });

  // 10. Track Time on Page (after 30 seconds, 60 seconds, 120 seconds)
  let timeTracked = {
    30: false,
    60: false,
    120: false
  };

  Object.keys(timeTracked).forEach(function(seconds) {
    setTimeout(function() {
      if (!timeTracked[seconds]) {
        timeTracked[seconds] = true;
        trackEvent('time_on_page', {
          duration_seconds: seconds,
          page_url: window.location.href,
          page_title: document.title
        });
      }
    }, seconds * 1000);
  });

  console.log('BOB Home Care tracking initialized');
});
