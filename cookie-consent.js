/**
 * Cookie Consent Banner - Industry Best Practices
 * GDPR & CCPA Compliant
 * Floating Banner with Accept/Reject Options
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        storageKey: 'bob-home-care-cookie-consent',
        expiryDays: 365,
        position: 'bottom',
        animationDuration: 300
    };

    // Cookie Categories
    const cookieCategories = {
        necessary: {
            name: 'Necessary Cookies',
            nameAr: 'ملفات تعريف ضرورية',
            description: 'Essential for website functionality and security',
            descriptionAr: 'ضرورية لعمل الموقع والأمان',
            required: true
        },
        analytics: {
            name: 'Analytics Cookies',
            nameAr: 'ملفات تحليل الأداء',
            description: 'Help us understand how you use our website',
            descriptionAr: 'تساعدنا في فهم كيفية استخدامك للموقع',
            required: false
        },
        marketing: {
            name: 'Marketing Cookies',
            nameAr: 'ملفات التسويق',
            description: 'Used for targeted advertising on Facebook, Instagram, LinkedIn, and YouTube',
            descriptionAr: 'تُستخدم للإعلانات الموجهة على فيسبوك وإنستغرام وليندكن ويوتيوب',
            required: false
        },
        functional: {
            name: 'Functional Cookies',
            nameAr: 'ملفات الوظائف',
            description: 'Remember your preferences and settings',
            descriptionAr: 'تتذكر تفضيلاتك وإعداداتك',
            required: false
        }
    };

    function init() {
        console.log('[CookieConsent] Initializing...');
        
        if (hasUserConsented()) {
            console.log('[CookieConsent] User has already consented, applying preferences');
            applyConsentPreferences();
            return;
        }
        
        console.log('[CookieConsent] No consent found, creating banner');
        createBanner();
        showBanner();
    }

    function hasUserConsented() {
        return localStorage.getItem(config.storageKey) !== null;
    }

    function getConsentPreferences() {
        const stored = localStorage.getItem(config.storageKey);
        return stored ? JSON.parse(stored) : null;
    }

    function saveConsentPreferences(preferences) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + config.expiryDays);
        
        const data = {
            ...preferences,
            timestamp: new Date().toISOString(),
            expiryDate: expiryDate.toISOString()
        };

        localStorage.setItem(config.storageKey, JSON.stringify(data));
        console.log('[CookieConsent] Preferences saved:', data);
    }

    function createBanner() {
        const isArabic = document.documentElement.lang === 'ar';
        
        const bannerHTML = `
            <div id="cookie-consent-banner" class="cookie-consent-banner" role="dialog" aria-label="${isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Consent'}">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-header">
                        <h2>${isArabic ? '🍪 سياسة ملفات تعريف الارتباط' : '🍪 Cookie Policy'}</h2>
                        <button id="cookie-close-btn" class="cookie-close-btn" aria-label="${isArabic ? 'إغلاق' : 'Close'}">
                            <span>×</span>
                        </button>
                    </div>

                    <div class="cookie-consent-body">
                        <p class="cookie-consent-intro">
                            ${isArabic 
                                ? 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك قبول جميع الملفات أو اختيار الملفات التي تريدها.' 
                                : 'We use cookies to enhance your experience on our website. You can accept all cookies or choose which ones you prefer.'}
                        </p>

                        <div class="cookie-consent-categories" id="cookie-categories-container">
                            ${Object.entries(cookieCategories).map(([key, category]) => `
                                <div class="cookie-category">
                                    <label class="cookie-category-label">
                                        <input 
                                            type="checkbox" 
                                            class="cookie-category-checkbox" 
                                            data-category="${key}"
                                            ${category.required ? 'checked disabled' : ''}
                                            ${key === 'necessary' ? 'checked disabled' : ''}
                                        />
                                        <span class="cookie-category-name">${isArabic ? category.nameAr : category.name}</span>
                                    </label>
                                    <p class="cookie-category-description">${isArabic ? category.descriptionAr : category.description}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="cookie-consent-links">
                            <a href="/privacy-policy.html" target="_blank">${isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
                            <span class="separator">•</span>
                            <a href="/cookie-policy.html" target="_blank">${isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}</a>
                        </div>
                    </div>

                    <div class="cookie-consent-actions">
                        <button id="cookie-reject-btn" class="cookie-btn cookie-btn-secondary">
                            ${isArabic ? 'رفض الكل' : 'Reject All'}
                        </button>
                        <button id="cookie-manage-btn" class="cookie-btn cookie-btn-secondary">
                            ${isArabic ? 'إدارة التفضيلات' : 'Manage Preferences'}
                        </button>
                        <button id="cookie-accept-btn" class="cookie-btn cookie-btn-primary">
                            ${isArabic ? 'قبول الكل' : 'Accept All'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.id = 'cookie-consent-container';
        container.innerHTML = bannerHTML;
        document.body.appendChild(container);

        // Attach event listeners
        document.getElementById('cookie-accept-btn').addEventListener('click', handleAcceptAll);
        document.getElementById('cookie-reject-btn').addEventListener('click', handleRejectAll);
        document.getElementById('cookie-manage-btn').addEventListener('click', handleManagePreferences);
        document.getElementById('cookie-close-btn').addEventListener('click', handleClose);

        // Category checkboxes
        document.querySelectorAll('.cookie-category-checkbox:not([disabled])').forEach(checkbox => {
            checkbox.addEventListener('change', handleCategoryChange);
        });

        console.log('[CookieConsent] Banner created');
    }

    function handleAcceptAll() {
        console.log('[CookieConsent] Accept All clicked');
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
            acceptedAll: true
        };

        saveConsentPreferences(preferences);
        applyConsentPreferences();
        hideBanner();
    }

    function handleRejectAll() {
        console.log('[CookieConsent] Reject All clicked');
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
            acceptedAll: false
        };

        saveConsentPreferences(preferences);
        applyConsentPreferences();
        hideBanner();
    }

    function handleManagePreferences() {
        console.log('[CookieConsent] Manage Preferences clicked');
        const container = document.getElementById('cookie-consent-container');
        if (container) {
            container.classList.toggle('manage-mode');
        }
    }

    function handleCategoryChange(event) {
        const category = event.target.dataset.category;
        const isChecked = event.target.checked;

        const preferences = getConsentPreferences() || {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };

        preferences[category] = isChecked;
        saveConsentPreferences(preferences);
        applyConsentPreferences();
    }

    function handleClose() {
        console.log('[CookieConsent] Close clicked');
        if (!getConsentPreferences()) {
            const preferences = {
                necessary: true,
                analytics: false,
                marketing: false,
                functional: false,
                acceptedAll: false
            };
            saveConsentPreferences(preferences);
        }
        hideBanner();
    }

    function showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            console.log('[CookieConsent] Showing banner');
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);
        }
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            console.log('[CookieConsent] Hiding banner');
            banner.classList.remove('show');
            setTimeout(() => {
                const container = document.getElementById('cookie-consent-container');
                if (container) {
                    container.remove();
                }
            }, config.animationDuration);
        }
    }

    function applyConsentPreferences() {
        const preferences = getConsentPreferences();
        if (!preferences) return;

        if (preferences.analytics) {
            loadGoogleAnalytics();
        }

        if (preferences.marketing) {
            loadFacebookPixel();
            loadInstagramPixel();
            loadLinkedInPixel();
            loadYouTubePixel();
        }

        if (preferences.functional) {
            loadFunctionalScripts();
        }
    }

    function loadGoogleAnalytics() {
        if (window.gtag) return;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'G-XXXXXXXXXX');
        console.log('[CookieConsent] Google Analytics loaded');
    }

    function loadFacebookPixel() {
        if (window.fbq) return;
        window.fbq = function() { window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments); };
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
        window.fbq('init', 'YOUR_PIXEL_ID');
        window.fbq('track', 'PageView');
        console.log('[CookieConsent] Facebook Pixel loaded');
    }

    function loadInstagramPixel() {
        console.log('[CookieConsent] Instagram Pixel ready');
    }

    function loadLinkedInPixel() {
        console.log('[CookieConsent] LinkedIn Pixel ready');
    }

    function loadYouTubePixel() {
        console.log('[CookieConsent] YouTube Pixel ready');
    }

    function loadFunctionalScripts() {
        console.log('[CookieConsent] Functional scripts loaded');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.CookieConsent = {
        getPreferences: getConsentPreferences,
        savePreferences: saveConsentPreferences,
        hasConsented: hasUserConsented,
        reset: function() {
            localStorage.removeItem(config.storageKey);
            location.reload();
        }
    };

    console.log('[CookieConsent] Script loaded and ready');
})();
