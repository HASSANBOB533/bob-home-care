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
        position: 'bottom'
    };

    // Inline styles to ensure banner displays
    const inlineStyles = `
        #cookie-consent-container {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            pointer-events: none !important;
            background: rgba(0, 0, 0, 0.5) !important;
        }
        
        .cookie-consent-banner {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background: white !important;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15) !important;
            border-top: 4px solid #1abc9c !important;
            max-width: 100% !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
            pointer-events: auto !important;
            z-index: 999999 !important;
            font-family: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            animation: slideUp 0.4s ease-out !important;
        }
        
        @keyframes slideUp {
            from {
                bottom: -500px;
                opacity: 0;
            }
            to {
                bottom: 0;
                opacity: 1;
            }
        }
        
        .cookie-consent-content {
            padding: 30px !important;
            max-width: 800px !important;
            margin: 0 auto !important;
        }
        
        .cookie-consent-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 20px !important;
            border-bottom: 1px solid #e0e0e0 !important;
            padding-bottom: 15px !important;
        }
        
        .cookie-consent-header h2 {
            margin: 0 !important;
            font-size: 24px !important;
            color: #333 !important;
            font-weight: 600 !important;
        }
        
        .cookie-close-btn {
            background: none !important;
            border: none !important;
            font-size: 28px !important;
            cursor: pointer !important;
            color: #666 !important;
            padding: 0 !important;
            width: 30px !important;
            height: 30px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .cookie-close-btn:hover {
            color: #333 !important;
        }
        
        .cookie-consent-body {
            margin-bottom: 25px !important;
        }
        
        .cookie-consent-intro {
            margin: 0 0 20px 0 !important;
            font-size: 16px !important;
            color: #555 !important;
            line-height: 1.5 !important;
        }
        
        .cookie-consent-categories {
            margin-bottom: 20px !important;
        }
        
        .cookie-category {
            margin-bottom: 15px !important;
            padding: 12px !important;
            background: #f5f5f5 !important;
            border-radius: 6px !important;
        }
        
        .cookie-category-label {
            display: flex !important;
            align-items: center !important;
            cursor: pointer !important;
            margin-bottom: 8px !important;
        }
        
        .cookie-category-checkbox {
            margin-right: 10px !important;
            cursor: pointer !important;
            width: 18px !important;
            height: 18px !important;
        }
        
        .cookie-category-name {
            font-weight: 600 !important;
            color: #333 !important;
            font-size: 14px !important;
        }
        
        .cookie-category-description {
            margin: 5px 0 0 28px !important;
            font-size: 13px !important;
            color: #777 !important;
            line-height: 1.4 !important;
        }
        
        .cookie-consent-links {
            text-align: center !important;
            margin-top: 15px !important;
            font-size: 13px !important;
        }
        
        .cookie-consent-links a {
            color: #1abc9c !important;
            text-decoration: none !important;
            margin: 0 5px !important;
        }
        
        .cookie-consent-links a:hover {
            text-decoration: underline !important;
        }
        
        .separator {
            color: #ccc !important;
            margin: 0 5px !important;
        }
        
        .cookie-consent-actions {
            display: flex !important;
            gap: 10px !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
            margin-top: 25px !important;
            padding-top: 20px !important;
            border-top: 1px solid #e0e0e0 !important;
        }
        
        .cookie-btn {
            padding: 12px 24px !important;
            border: none !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
            min-width: 120px !important;
        }
        
        .cookie-btn-primary {
            background: #1abc9c !important;
            color: white !important;
        }
        
        .cookie-btn-primary:hover {
            background: #16a085 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3) !important;
        }
        
        .cookie-btn-secondary {
            background: #e0e0e0 !important;
            color: #333 !important;
        }
        
        .cookie-btn-secondary:hover {
            background: #d0d0d0 !important;
            transform: translateY(-2px) !important;
        }
        
        @media (max-width: 768px) {
            .cookie-consent-content {
                padding: 20px !important;
            }
            
            .cookie-consent-actions {
                flex-direction: column !important;
            }
            
            .cookie-btn {
                width: 100% !important;
            }
        }
    `;

    function init() {
        console.log('[CookieConsent] Initializing...');
        
        // Inject inline styles
        const styleElement = document.createElement('style');
        styleElement.textContent = inlineStyles;
        document.head.appendChild(styleElement);
        
        if (hasUserConsented()) {
            console.log('[CookieConsent] User has already consented');
            applyConsentPreferences();
            return;
        }
        
        console.log('[CookieConsent] Creating banner');
        createBanner();
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
        console.log('[CookieConsent] Preferences saved');
    }

    function createBanner() {
        const isArabic = document.documentElement.lang === 'ar';
        
        const bannerHTML = `
            <div class="cookie-consent-banner">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-header">
                        <h2>${isArabic ? '🍪 سياسة ملفات تعريف الارتباط' : '🍪 Cookie Policy'}</h2>
                        <button id="cookie-close-btn" class="cookie-close-btn" aria-label="${isArabic ? 'إغلاق' : 'Close'}">×</button>
                    </div>

                    <div class="cookie-consent-body">
                        <p class="cookie-consent-intro">
                            ${isArabic 
                                ? 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك قبول جميع الملفات أو اختيار الملفات التي تريدها.' 
                                : 'We use cookies to enhance your experience on our website. You can accept all cookies or choose which ones you prefer.'}
                        </p>

                        <div class="cookie-consent-categories">
                            <div class="cookie-category">
                                <label class="cookie-category-label">
                                    <input type="checkbox" class="cookie-category-checkbox" data-category="necessary" checked disabled />
                                    <span class="cookie-category-name">${isArabic ? 'ملفات تعريف ضرورية' : 'Necessary Cookies'}</span>
                                </label>
                                <p class="cookie-category-description">${isArabic ? 'ضرورية لعمل الموقع والأمان' : 'Essential for website functionality and security'}</p>
                            </div>
                            
                            <div class="cookie-category">
                                <label class="cookie-category-label">
                                    <input type="checkbox" class="cookie-category-checkbox" data-category="analytics" />
                                    <span class="cookie-category-name">${isArabic ? 'ملفات تحليل الأداء' : 'Analytics Cookies'}</span>
                                </label>
                                <p class="cookie-category-description">${isArabic ? 'تساعدنا في فهم كيفية استخدامك للموقع' : 'Help us understand how you use our website'}</p>
                            </div>
                            
                            <div class="cookie-category">
                                <label class="cookie-category-label">
                                    <input type="checkbox" class="cookie-category-checkbox" data-category="marketing" />
                                    <span class="cookie-category-name">${isArabic ? 'ملفات التسويق' : 'Marketing Cookies'}</span>
                                </label>
                                <p class="cookie-category-description">${isArabic ? 'تُستخدم للإعلانات الموجهة' : 'Used for targeted advertising'}</p>
                            </div>
                            
                            <div class="cookie-category">
                                <label class="cookie-category-label">
                                    <input type="checkbox" class="cookie-category-checkbox" data-category="functional" />
                                    <span class="cookie-category-name">${isArabic ? 'ملفات الوظائف' : 'Functional Cookies'}</span>
                                </label>
                                <p class="cookie-category-description">${isArabic ? 'تتذكر تفضيلاتك وإعداداتك' : 'Remember your preferences and settings'}</p>
                            </div>
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
        document.getElementById('cookie-close-btn').addEventListener('click', handleClose);

        // Category checkboxes
        document.querySelectorAll('.cookie-category-checkbox:not([disabled])').forEach(checkbox => {
            checkbox.addEventListener('change', handleCategoryChange);
        });

        console.log('[CookieConsent] Banner created and displayed');
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

    function hideBanner() {
        const container = document.getElementById('cookie-consent-container');
        if (container) {
            console.log('[CookieConsent] Removing banner');
            container.style.animation = 'slideDown 0.3s ease-out forwards';
            setTimeout(() => {
                container.remove();
            }, 300);
        }
    }

    function applyConsentPreferences() {
        const preferences = getConsentPreferences();
        if (!preferences) return;

        if (preferences.analytics) {
            console.log('[CookieConsent] Analytics enabled');
        }

        if (preferences.marketing) {
            console.log('[CookieConsent] Marketing enabled');
        }

        if (preferences.functional) {
            console.log('[CookieConsent] Functional scripts enabled');
        }
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

    console.log('[CookieConsent] Script loaded');
})();
