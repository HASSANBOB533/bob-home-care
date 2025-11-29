/**
 * Cookie Consent Banner - Complete Implementation
 * GDPR & CCPA Compliant with Full Modal Policy Display
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'bob-home-care-cookie-consent';
    const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 365 days

    class CookieConsent {
        constructor() {
            this.consent = this.getConsent();
            this.isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
            this.init();
        }

        init() {
            this.createBanner();
            this.createModal();
            this.attachListeners();
            
            if (!this.consent) {
                this.show();
            }
        }

        createBanner() {
            const container = document.createElement('div');
            container.id = 'cookie-consent-container';
            
            const banner = document.createElement('div');
            banner.className = 'cookie-consent-banner';
            banner.id = 'cookie-consent-banner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-label', this.isArabic ? 'موافقة ملفات تعريف الارتباط' : 'Cookie Consent');

            banner.innerHTML = `
                <div class="cookie-consent-content">
                    <div class="cookie-consent-header">
                        <h2>🍪 ${this.isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}</h2>
                        <button class="cookie-close-btn" id="cookie-close-btn" aria-label="Close">×</button>
                    </div>
                    
                    <div class="cookie-consent-body">
                        <p class="cookie-consent-intro">
                            ${this.isArabic 
                                ? 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك قبول جميع الملفات أو اختيار التفضيلات.'
                                : 'We use cookies to improve your experience. You can accept all or choose your preferences.'}
                        </p>

                        <div class="cookie-consent-categories">
                            ${this.getCategoriesHTML()}
                        </div>

                        <div class="cookie-consent-links">
                            <a id="cookie-read-more" role="button" tabindex="0">
                                ${this.isArabic ? 'عرض السياسة كاملة' : 'Read Full Policy'}
                            </a>
                            <span class="separator">|</span>
                            <a href="/privacy-policy.html" target="_blank">
                                ${this.isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </a>
                        </div>

                        <div class="cookie-consent-actions">
                            <button class="cookie-btn cookie-btn-primary" id="cookie-accept-all">
                                ${this.isArabic ? 'قبول الكل' : 'Accept All'}
                            </button>
                            <button class="cookie-btn cookie-btn-secondary" id="cookie-reject-all">
                                ${this.isArabic ? 'رفض الكل' : 'Reject All'}
                            </button>
                            <button class="cookie-btn cookie-btn-secondary" id="cookie-save-prefs">
                                ${this.isArabic ? 'حفظ التفضيلات' : 'Save Preferences'}
                            </button>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(banner);
            document.body.appendChild(container);
        }

        getCategoriesHTML() {
            const categories = {
                necessary: {
                    name: this.isArabic ? 'ملفات ضرورية' : 'Necessary Cookies',
                    desc: this.isArabic ? 'مطلوبة لتشغيل الموقع' : 'Required for website functionality',
                    required: true
                },
                analytics: {
                    name: this.isArabic ? 'ملفات تحليل الأداء' : 'Analytics Cookies',
                    desc: this.isArabic ? 'تساعدنا في فهم الاستخدام' : 'Help us understand usage',
                    required: false
                },
                marketing: {
                    name: this.isArabic ? 'ملفات التسويق' : 'Marketing Cookies',
                    desc: this.isArabic ? 'تستخدم لتتبع الإعلانات' : 'Used for advertising',
                    required: false
                },
                functional: {
                    name: this.isArabic ? 'ملفات وظيفية' : 'Functional Cookies',
                    desc: this.isArabic ? 'تحسن تجربة المستخدم' : 'Improve user experience',
                    required: false
                }
            };

            return Object.entries(categories).map(([key, cat]) => `
                <div class="cookie-category">
                    <label class="cookie-category-label">
                        <input 
                            type="checkbox" 
                            class="cookie-category-checkbox" 
                            data-category="${key}"
                            ${cat.required ? 'checked disabled' : ''}
                            aria-label="${cat.name}"
                        />
                        <span>
                            <span class="cookie-category-name">${cat.name}</span>
                            ${cat.required ? '<span class="cookie-required">(Required)</span>' : ''}
                        </span>
                    </label>
                    <p class="cookie-category-description">${cat.desc}</p>
                </div>
            `).join('');
        }

        createModal() {
            const modal = document.createElement('div');
            modal.id = 'cookie-policy-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-label', this.isArabic ? 'سياسة ملفات تعريف الارتباط الكاملة' : 'Full Cookie Policy');

            modal.innerHTML = `
                <div class="cookie-policy-modal-content">
                    <div class="cookie-policy-modal-header">
                        <h2>${this.isArabic ? 'سياسة ملفات تعريف الارتباط الكاملة' : 'Full Cookie Policy'}</h2>
                        <button class="cookie-policy-modal-close" id="cookie-modal-close" aria-label="Close">×</button>
                    </div>
                    <div class="cookie-policy-modal-body">
                        <h3>${this.isArabic ? 'ما هي ملفات تعريف الارتباط؟' : 'What are Cookies?'}</h3>
                        <p>${this.isArabic 
                            ? 'ملفات تعريف الارتباط هي ملفات صغيرة يتم حفظها على جهازك. تساعدنا في تحسين تجربتك وفهم احتياجاتك.'
                            : 'Cookies are small files stored on your device. They help us improve your experience and understand your needs.'}
                        </p>

                        <h3>${this.isArabic ? 'أنواع ملفات تعريف الارتباط' : 'Types of Cookies'}</h3>
                        <ul>
                            <li><strong>${this.isArabic ? 'ملفات ضرورية:' : 'Necessary Cookies:'}</strong> ${this.isArabic ? 'مطلوبة لعمل الموقع بشكل صحيح.' : 'Required for proper website operation.'}</li>
                            <li><strong>${this.isArabic ? 'ملفات التحليل:' : 'Analytics Cookies:'}</strong> ${this.isArabic ? 'تساعدنا في فهم كيفية استخدام الموقع.' : 'Help us understand how you use our site.'}</li>
                            <li><strong>${this.isArabic ? 'ملفات التسويق:' : 'Marketing Cookies:'}</strong> ${this.isArabic ? 'تستخدم لتتبع الإعلانات والعروض.' : 'Used to track ads and offers.'}</li>
                            <li><strong>${this.isArabic ? 'ملفات وظيفية:' : 'Functional Cookies:'}</strong> ${this.isArabic ? 'تحسن الميزات والتفضيلات.' : 'Improve features and preferences.'}</li>
                        </ul>

                        <h3>${this.isArabic ? 'حقوقك' : 'Your Rights'}</h3>
                        <p>${this.isArabic 
                            ? 'لديك الحق في قبول أو رفض ملفات تعريف الارتباط في أي وقت. يمكنك تغيير تفضيلاتك من خلال إعدادات المتصفح.'
                            : 'You have the right to accept or reject cookies at any time. You can change your preferences through browser settings.'}
                        </p>

                        <h3>${this.isArabic ? 'اتصل بنا' : 'Contact Us'}</h3>
                        <p>${this.isArabic 
                            ? 'إذا كان لديك أسئلة حول سياسة ملفات تعريف الارتباط، يرجى التواصل معنا عبر البريد الإلكتروني.'
                            : 'If you have questions about our cookie policy, please contact us via email.'}
                        </p>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
        }

        attachListeners() {
            // Banner buttons
            document.getElementById('cookie-close-btn')?.addEventListener('click', () => this.hide());
            document.getElementById('cookie-accept-all')?.addEventListener('click', () => this.acceptAll());
            document.getElementById('cookie-reject-all')?.addEventListener('click', () => this.rejectAll());
            document.getElementById('cookie-save-prefs')?.addEventListener('click', () => this.savePreferences());

            // Read more
            document.getElementById('cookie-read-more')?.addEventListener('click', () => this.showModal());
            document.getElementById('cookie-read-more')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.showModal();
            });

            // Modal
            document.getElementById('cookie-modal-close')?.addEventListener('click', () => this.hideModal());
            document.getElementById('cookie-policy-modal')?.addEventListener('click', (e) => {
                if (e.target.id === 'cookie-policy-modal') this.hideModal();
            });
        }

        acceptAll() {
            this.setConsent({
                necessary: true,
                analytics: true,
                marketing: true,
                functional: true
            });
            this.hide();
        }

        rejectAll() {
            this.setConsent({
                necessary: true,
                analytics: false,
                marketing: false,
                functional: false
            });
            this.hide();
        }

        savePreferences() {
            const consent = {
                necessary: true,
                analytics: document.querySelector('[data-category="analytics"]')?.checked || false,
                marketing: document.querySelector('[data-category="marketing"]')?.checked || false,
                functional: document.querySelector('[data-category="functional"]')?.checked || false
            };
            this.setConsent(consent);
            this.hide();
        }

        show() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) banner.classList.add('show');
        }

        hide() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) banner.classList.remove('show');
        }

        showModal() {
            const modal = document.getElementById('cookie-policy-modal');
            if (modal) modal.classList.add('show');
        }

        hideModal() {
            const modal = document.getElementById('cookie-policy-modal');
            if (modal) modal.classList.remove('show');
        }

        setConsent(consent) {
            try {
                const data = {
                    ...consent,
                    timestamp: Date.now(),
                    expiry: Date.now() + CONSENT_EXPIRY
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                this.consent = data;
            } catch (e) {
                console.error('Cookie consent error:', e);
            }
        }

        getConsent() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (!stored) return null;
                
                const consent = JSON.parse(stored);
                if (consent.expiry && Date.now() > consent.expiry) {
                    localStorage.removeItem(STORAGE_KEY);
                    return null;
                }
                
                return consent;
            } catch (e) {
                return null;
            }
        }

        static show() {
            window.CookieConsent?.show();
        }

        static reset() {
            try {
                localStorage.removeItem(STORAGE_KEY);
                window.CookieConsent?.show();
            } catch (e) {}
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.CookieConsent = new CookieConsent();
        });
    } else {
        window.CookieConsent = new CookieConsent();
    }
})();
