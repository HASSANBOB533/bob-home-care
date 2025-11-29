/**
 * Cookie Consent Banner - Industry Best Practices
 * GDPR & CCPA Compliant
 * Floating Banner with Accept/Reject Options
 */

(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'bob-home-care-cookie-consent',
        expiryDays: 365
    };

    // Inject inline styles immediately
    function injectStyles() {
        if (document.getElementById('cookie-consent-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'cookie-consent-styles';
        style.innerHTML = `
            #cookie-consent-container {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 999999 !important;
                background: rgba(0, 0, 0, 0.5) !important;
                display: flex !important;
                align-items: flex-end !important;
                justify-content: center !important;
                animation: fadeIn 0.3s ease-in !important;
            }
            
            #cookie-consent-container.hidden {
                display: none !important;
            }
            
            .cookie-consent-banner {
                background: white !important;
                border-top: 4px solid #1abc9c !important;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15) !important;
                width: 100% !important;
                max-width: 100% !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
                animation: slideUp 0.4s ease-out !important;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .cookie-consent-content {
                padding: 30px !important;
                max-width: 900px !important;
                margin: 0 auto !important;
                font-family: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
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
                font-size: 32px !important;
                cursor: pointer !important;
                color: #999 !important;
                padding: 0 !important;
                width: 40px !important;
                height: 40px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: color 0.2s !important;
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
                line-height: 1.6 !important;
            }
            
            .cookie-consent-categories {
                margin-bottom: 20px !important;
            }
            
            .cookie-category {
                margin-bottom: 15px !important;
                padding: 15px !important;
                background: #f5f5f5 !important;
                border-radius: 6px !important;
                border-left: 3px solid #1abc9c !important;
            }
            
            .cookie-category-label {
                display: flex !important;
                align-items: center !important;
                cursor: pointer !important;
                margin-bottom: 8px !important;
            }
            
            .cookie-category-checkbox {
                margin-right: 12px !important;
                cursor: pointer !important;
                width: 20px !important;
                height: 20px !important;
                accent-color: #1abc9c !important;
            }
            
            .cookie-category-checkbox:disabled {
                cursor: not-allowed !important;
                opacity: 0.6 !important;
            }
            
            .cookie-category-name {
                font-weight: 600 !important;
                color: #333 !important;
                font-size: 15px !important;
            }
            
            .cookie-category-description {
                margin: 5px 0 0 32px !important;
                font-size: 13px !important;
                color: #777 !important;
                line-height: 1.5 !important;
            }
            
            .cookie-consent-links {
                text-align: center !important;
                margin-top: 15px !important;
                font-size: 13px !important;
                padding-top: 15px !important;
                border-top: 1px solid #e0e0e0 !important;
            }
            
            .cookie-consent-links a {
                color: #1abc9c !important;
                text-decoration: none !important;
                margin: 0 8px !important;
                font-weight: 500 !important;
            }
            
            .cookie-consent-links a:hover {
                text-decoration: underline !important;
            }
            
            .separator {
                color: #ccc !important;
            }
            
            .cookie-consent-actions {
                display: flex !important;
                gap: 12px !important;
                justify-content: center !important;
                flex-wrap: wrap !important;
                margin-top: 25px !important;
                padding-top: 20px !important;
                border-top: 1px solid #e0e0e0 !important;
            }
            
            .cookie-btn {
                padding: 12px 28px !important;
                border: none !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                transition: all 0.3s ease !important;
                min-width: 140px !important;
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
                background: #e8e8e8 !important;
                color: #333 !important;
            }
            
            .cookie-btn-secondary:hover {
                background: #d8d8d8 !important;
                transform: translateY(-2px) !important;
            }
            
            @media (max-width: 768px) {
                .cookie-consent-content {
                    padding: 20px !important;
                }
                
                .cookie-consent-header h2 {
                    font-size: 20px !important;
                }
                
                .cookie-consent-actions {
                    flex-direction: column !important;
                }
                
                .cookie-btn {
                    width: 100% !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function hasConsent() {
        return localStorage.getItem(CONFIG.storageKey) !== null;
    }

    function getConsent() {
        const stored = localStorage.getItem(CONFIG.storageKey);
        return stored ? JSON.parse(stored) : null;
    }

    function saveConsent(preferences) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + CONFIG.expiryDays);
        
        const data = {
            ...preferences,
            timestamp: new Date().toISOString(),
            expiryDate: expiryDate.toISOString()
        };

        localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
    }

    function createBanner() {
        const isArabic = document.documentElement.lang === 'ar';
        
        const html = `
            <div class="cookie-consent-banner">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-header">
                        <h2>${isArabic ? '🍪 سياسة ملفات تعريف الارتباط' : '🍪 Cookie Policy'}</h2>
                        <button class="cookie-close-btn" id="cookie-close" aria-label="${isArabic ? 'إغلاق' : 'Close'}">×</button>
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
                        <button class="cookie-btn cookie-btn-secondary" id="cookie-reject">
                            ${isArabic ? 'رفض الكل' : 'Reject All'}
                        </button>
                        <button class="cookie-btn cookie-btn-primary" id="cookie-accept">
                            ${isArabic ? 'قبول الكل' : 'Accept All'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const container = document.createElement('div');
        container.id = 'cookie-consent-container';
        container.innerHTML = html;
        document.body.appendChild(container);
        
        // Attach event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: true,
                marketing: true,
                functional: true,
                acceptedAll: true
            });
            hideBanner();
        });
        
        document.getElementById('cookie-reject').addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: false,
                marketing: false,
                functional: false,
                acceptedAll: false
            });
            hideBanner();
        });
        
        document.getElementById('cookie-close').addEventListener('click', () => {
            if (!hasConsent()) {
                saveConsent({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    functional: false,
                    acceptedAll: false
                });
            }
            hideBanner();
        });
        
        // Category checkboxes
        document.querySelectorAll('.cookie-category-checkbox:not([disabled])').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const prefs = getConsent() || {
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    functional: false
                };
                prefs[this.dataset.category] = this.checked;
                saveConsent(prefs);
            });
        });
    }

    function hideBanner() {
        const container = document.getElementById('cookie-consent-container');
        if (container) {
            container.classList.add('hidden');
            setTimeout(() => container.remove(), 300);
        }
    }

    function init() {
        injectStyles();
        
        if (!hasConsent()) {
            createBanner();
        }
    }

    // Initialize immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.CookieConsent = {
        getPreferences: getConsent,
        savePreferences: saveConsent,
        hasConsented: hasConsent,
        reset: function() {
            localStorage.removeItem(CONFIG.storageKey);
            location.reload();
        },
        show: function() {
            if (!document.getElementById('cookie-consent-container')) {
                createBanner();
            }
        }
    };
})();
