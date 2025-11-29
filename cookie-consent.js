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
        if (hasUserConsented()) {
            applyConsentPreferences();
            return;
        }
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

                        <div class="cookie-consent-categories">
                            ${renderCookieCategories(isArabic)}
                        </div>

                        <div class="cookie-consent-links">
                            <a href="privacy-policy.html" target="_blank" rel="noopener noreferrer">
                                ${isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </a>
                            <span class="separator">•</span>
                            <a href="cookie-policy.html" target="_blank" rel="noopener noreferrer">
                                ${isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
                            </a>
                        </div>
                    </div>

                    <div class="cookie-consent-actions">
                        <button id="cookie-reject-btn" class="cookie-btn cookie-reject-btn">
                            ${isArabic ? 'رفض الكل' : 'Reject All'}
                        </button>
                        <button id="cookie-accept-btn" class="cookie-btn cookie-accept-btn">
                            ${isArabic ? 'قبول الكل' : 'Accept All'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        const bannerContainer = document.createElement('div');
        bannerContainer.id = 'cookie-consent-container';
        bannerContainer.innerHTML = bannerHTML;
        document.body.appendChild(bannerContainer);

        attachEventListeners();
    }

    function renderCookieCategories(isArabic) {
        let html = '';

        Object.entries(cookieCategories).forEach(([key, category]) => {
            const categoryName = isArabic ? category.nameAr : category.name;
            const categoryDesc = isArabic ? category.descriptionAr : category.description;
            const isChecked = category.required ? 'checked disabled' : 'checked';
            const isDisabled = category.required ? 'disabled' : '';

            html += `
                <div class="cookie-category">
                    <label class="cookie-category-label">
                        <input 
                            type="checkbox" 
                            class="cookie-category-checkbox" 
                            data-category="${key}" 
                            ${isChecked}
                            ${isDisabled}
                            aria-label="${categoryName}"
                        >
                        <span class="cookie-category-name">${categoryName}</span>
                        ${category.required ? '<span class="cookie-required">(Required)</span>' : ''}
                    </label>
                    <p class="cookie-category-description">${categoryDesc}</p>
                </div>
            `;
        });

        return html;
    }

    function attachEventListeners() {
        const acceptBtn = document.getElementById('cookie-accept-btn');
        const rejectBtn = document.getElementById('cookie-reject-btn');
        const closeBtn = document.getElementById('cookie-close-btn');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', handleAcceptAll);
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', handleRejectAll);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', handleClose);
        }

        const checkboxes = document.querySelectorAll('.cookie-category-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCategoryChange);
        });
    }

    function handleAcceptAll() {
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
        loadThirdPartyScripts();
    }

    function handleRejectAll() {
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
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);
        }
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
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
            loadGoogleAds();
        }

        if (preferences.functional) {
            loadFunctionalScripts();
        }
    }

    function loadGoogleAnalytics() {
        if (window.gtag) return;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }

    function loadFacebookPixel() {
        if (window.fbq) return;
        const script = document.createElement('script');
        script.innerHTML = `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
    }

    function loadGoogleAds() {
        if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) return;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_GOOGLE_ADS_ID';
        document.head.appendChild(script);
    }

    function loadFunctionalScripts() {
        // Add any functional scripts here
    }

    function loadThirdPartyScripts() {
        const preferences = getConsentPreferences();
        if (!preferences) return;

        if (preferences.analytics) {
            loadGoogleAnalytics();
        }

        if (preferences.marketing) {
            loadFacebookPixel();
            loadGoogleAds();
        }

        if (preferences.functional) {
            loadFunctionalScripts();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CookieConsent = {
        getPreferences: getConsentPreferences,
        savePreferences: saveConsentPreferences,
        hasConsented: hasUserConsented,
        reset: function() {
            localStorage.removeItem(config.storageKey);
            location.reload();
        }
    };
})();
