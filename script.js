// Language Toggle Functionality
let currentLang = 'ar';

const translations = {
    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'خدماتنا',
        blog: 'المدونة',
        testimonials: 'آراء العملاء',
        contact: 'اتصل بنا',
        bookNow: 'احجز الآن',
        
        // Hero Section
        heroTitle: 'خدمات التنظيف المنزلي بمعايير الضيافة العالمية',
        heroSubtitle: 'من فريق Best of Bedz المتخصص في الضيافة، نقدم خدمات تنظيف بجودة الفنادق الفاخرة',
        ctaButton: 'احصل على عرض سعر مجاني',
        
        // About Section
        aboutTitle: 'من نحن',
        
        // Services Section
        servicesTitle: 'خدماتنا المتخصصة',
        
        // Gallery Section
        galleryTitle: 'شاهد التحولات المذهلة',
        gallerySubtitle: 'من الفوضى إلى الفخامة - معايير الضيافة العالمية',
        
        // Blog Section
        blogTitle: 'مدونة BOB Home Care',
        blogSubtitle: 'نصائح وإرشادات احترافية للعناية المنزلية',
        
        // Testimonials Section
        testimonialsTitle: 'آراء عملائنا من Airbnb',
        
        // Contact Section
        contactTitle: 'تواصل معنا',
        bookingTitle: 'احجز خدمتك الآن'
    },
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        services: 'Services',
        blog: 'Blog',
        testimonials: 'Reviews',
        contact: 'Contact',
        bookNow: 'Book Now',
        
        // Hero Section
        heroTitle: 'Home Cleaning Services with International Hospitality Standards',
        heroSubtitle: 'From the Best of Bedz hospitality team, we provide luxury hotel-quality cleaning services',
        ctaButton: 'Get Free Quote',
        
        // About Section
        aboutTitle: 'About Us',
        
        // Services Section
        servicesTitle: 'Our Specialized Services',
        
        // Gallery Section
        galleryTitle: 'See Amazing Transformations',
        gallerySubtitle: 'From Chaos to Luxury - International Hospitality Standards',
        
        // Blog Section
        blogTitle: 'BOB Home Care Blog',
        blogSubtitle: 'Professional tips and guidance for home care',
        
        // Testimonials Section
        testimonialsTitle: 'Our Airbnb Client Reviews',
        
        // Contact Section
        contactTitle: 'Contact Us',
        bookingTitle: 'Book Your Service Now'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // Update document direction and language
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class for styling
    document.body.className = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn, .book-btn');
    navButtons.forEach(btn => {
        const key = btn.getAttribute('data-' + currentLang);
        if (key) {
            btn.textContent = key;
        }
    });
    
    // Update main content
    updateContent();
    
    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    
    // Apply direction-specific styles
    applyDirectionStyles();
}

function applyDirectionStyles() {
    const style = document.getElementById('direction-styles') || document.createElement('style');
    style.id = 'direction-styles';
    
    if (currentLang === 'en') {
        style.textContent = `
            body.ltr {
                direction: ltr;
                text-align: left;
            }
            body.ltr .header-container {
                flex-direction: row;
            }
            body.ltr .hero-content {
                grid-template-columns: 1fr 1fr;
            }
            body.ltr .hero-text {
                text-align: left;
            }
            body.ltr .nav-buttons {
                order: 2;
            }
            body.ltr .header-right {
                order: 1;
                flex-direction: row-reverse;
            }
        `;
    } else {
        style.textContent = `
            body.rtl {
                direction: rtl;
                text-align: right;
            }
            body.rtl .header-container {
                flex-direction: row;
            }
            body.rtl .hero-content {
                grid-template-columns: 1fr 1fr;
            }
            body.rtl .hero-text {
                text-align: right;
            }
            body.rtl .nav-buttons {
                order: 1;
            }
            body.rtl .header-right {
                order: 2;
                flex-direction: row;
            }
        `;
    }
    
    if (!document.getElementById('direction-styles')) {
        document.head.appendChild(style);
    }
}

function updateContent() {
    const lang = translations[currentLang];
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-text h2');
    const heroSubtitle = document.querySelector('.hero-text p');
    const ctaButton = document.querySelector('.cta-button');
    
    if (heroTitle) heroTitle.textContent = lang.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = lang.heroSubtitle;
    if (ctaButton) ctaButton.textContent = lang.ctaButton;
    
    // Update section titles
    const aboutTitle = document.querySelector('.about h2');
    const servicesTitle = document.querySelector('.services h2');
    const galleryTitle = document.querySelector('.gallery h2');
    const gallerySubtitle = document.querySelector('.gallery > .container > p');
    const blogTitle = document.querySelector('.blog h2');
    const blogSubtitle = document.querySelector('.blog > .container > p');
    const testimonialsTitle = document.querySelector('.testimonials h2');
    const contactTitle = document.querySelector('.contact h2');
    const bookingTitle = document.querySelector('.booking-section h2');
    
    if (aboutTitle) aboutTitle.textContent = lang.aboutTitle;
    if (servicesTitle) servicesTitle.textContent = lang.servicesTitle;
    if (galleryTitle) galleryTitle.textContent = lang.galleryTitle;
    if (gallerySubtitle) gallerySubtitle.textContent = lang.gallerySubtitle;
    if (blogTitle) blogTitle.textContent = lang.blogTitle;
    if (blogSubtitle) blogSubtitle.textContent = lang.blogSubtitle;
    if (testimonialsTitle) testimonialsTitle.textContent = lang.testimonialsTitle;
    if (contactTitle) contactTitle.textContent = lang.contactTitle;
    if (bookingTitle) bookingTitle.textContent = lang.bookingTitle;
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form submission with WhatsApp integration
function initFormSubmission() {
    const bookingForm = document.querySelector('form');
    
    if (bookingForm) {
        // Get form elements
        const nameInput = bookingForm.querySelector('input[name="name"]');
        const phoneInput = bookingForm.querySelector('input[name="phone"]');
        const emailInput = bookingForm.querySelector('input[name="email"]');
        const serviceSelect = bookingForm.querySelector('select[name="service"]');
        const dateInput = bookingForm.querySelector('input[name="date"]');
        const timeSelect = bookingForm.querySelector('select[name="time"]');
        const addressInput = bookingForm.querySelector('input[name="address"]');
        const notesTextarea = bookingForm.querySelector('textarea[name="notes"]');
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('=== FORM SUBMISSION STARTED ===');
            
            // Get form values
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const service = serviceSelect.value || serviceSelect.options[serviceSelect.selectedIndex].value;
            const date = dateInput.value;
            const time = timeSelect.value || timeSelect.options[timeSelect.selectedIndex].value;
            const address = addressInput.value.trim();
            const notes = notesTextarea.value.trim();
            
            // Debug: Log form data
            console.log('Form Data:');
            console.log('- Name:', name, '| Empty:', !name);
            console.log('- Phone:', phone, '| Empty:', !phone);
            console.log('- Email:', email);
            console.log('- Service:', service, '| Empty:', !service);
            console.log('- Date:', date, '| Empty:', !date);
            console.log('- Time:', time, '| Empty:', !time);
            console.log('- Address:', address, '| Empty:', !address);
            console.log('- Notes:', notes);
            
            // Validate required fields
            const missing = [];
            if (!name) missing.push('name');
            if (!phone) missing.push('phone');
            if (!service) missing.push('service');
            if (!date) missing.push('date');
            if (!time) missing.push('time');
            if (!address) missing.push('address');
            
            if (missing.length > 0) {
                console.error('Missing fields:', missing);
                alert(currentLang === 'ar' ? 
                    `يرجى ملء جميع الحقول المطلوبة: ${missing.join(', ')}` : 
                    `Please fill all required fields: ${missing.join(', ')}`);
                return;
            }
            
            // Create WhatsApp message
            const serviceNames = {
                'airbnb': currentLang === 'ar' ? 'تنظيف شقق Airbnb' : 'Airbnb Cleaning',
                'regular': currentLang === 'ar' ? 'التنظيف الدوري' : 'Regular Cleaning',
                'deep': currentLang === 'ar' ? 'التنظيف العميق' : 'Deep Cleaning',
                'moving': currentLang === 'ar' ? 'تنظيف الانتقال' : 'Moving Cleaning',
                'sterilization': currentLang === 'ar' ? 'التبخير والتعقيم' : 'Sterilization',
                'furniture': currentLang === 'ar' ? 'تنظيف المفروشات' : 'Furniture Cleaning'
            };
            
            const timeNames = {
                'morning': currentLang === 'ar' ? 'صباحاً (9-12)' : 'Morning (9-12)',
                'afternoon': currentLang === 'ar' ? 'بعد الظهر (12-5)' : 'Afternoon (12-5)',
                'evening': currentLang === 'ar' ? 'مساءً (5-8)' : 'Evening (5-8)'
            };
            
            // Format date properly
            const formattedDate = new Date(date).toLocaleDateString('ar-EG');
            
            const message = currentLang === 'ar' ? 
                `مرحباً! أود حجز خدمة من BOB Home Care

الاسم: ${name}
الهاتف: ${phone}
${email ? `البريد الإلكتروني: ${email}` : ''}
نوع الخدمة: ${serviceNames[service] || service}
التاريخ المفضل: ${formattedDate}
الوقت المفضل: ${timeNames[time] || time}
العنوان: ${address}
${notes ? `ملاحظات: ${notes}` : ''}

شكراً لكم!` :
                `Hello! I would like to book a service from BOB Home Care

Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : ''}
Service Type: ${serviceNames[service] || service}
Preferred Date: ${date}
Preferred Time: ${timeNames[time] || time}
Address: ${address}
${notes ? `Notes: ${notes}` : ''}

Thank you!`;
            
            console.log('=== WHATSAPP MESSAGE ===');
            console.log(message);
            
            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/201273518887?text=${encodeURIComponent(message)}`;
            console.log('=== WHATSAPP URL ===');
            console.log(whatsappUrl);
            console.log('=== REDIRECTING TO WHATSAPP ===');
            
            // Show success message
            alert(currentLang === 'ar' ? 
                'تم إرسال طلب الحجز! سيتم توجيهك إلى WhatsApp الآن' : 
                'Booking request sent! You will be redirected to WhatsApp now');
            
            // Redirect immediately
            window.location.href = whatsappUrl;
        });
    } else {
        console.error('Booking form not found!');
    }
}

// Add scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .blog-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Add CSS for scroll animations
function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .service-card:nth-child(odd) {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(even) {
            transition-delay: 0.2s;
        }
        
        .gallery-item:nth-child(1) { transition-delay: 0.1s; }
        .gallery-item:nth-child(2) { transition-delay: 0.2s; }
        .gallery-item:nth-child(3) { transition-delay: 0.3s; }
        
        .blog-card:nth-child(1) { transition-delay: 0.1s; }
        .blog-card:nth-child(2) { transition-delay: 0.2s; }
        .blog-card:nth-child(3) { transition-delay: 0.3s; }
        
        .testimonial-card:nth-child(odd) {
            transition-delay: 0.1s;
        }
        
        .testimonial-card:nth-child(even) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add language toggle event listener
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initialize other features
    initSmoothScrolling();
    initFormSubmission();
    initScrollAnimations();
    addScrollAnimationStyles();
    
    // Add modern loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});



// Carousel Functionality
class ImageCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        
        if (!this.track) return;
        
        this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Create indicators
        this.createIndicators();
        
        // Add event listeners
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch support
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) this.nextSlide();
            if (touchEndX - touchStartX > 50) this.prevSlide();
        });
        
        // Auto-play carousel
        this.autoPlay();
    }
    
    createIndicators() {
        if (!this.indicatorsContainer) return;
        for (let i = 0; i < this.slideCount; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'indicator' + (i === 0 ? ' active' : '');
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    updateIndicators() {
        if (!this.indicatorsContainer) return;
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateIndicators();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlay();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel();
});


/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-book-btn');
    const mobileMenuOverlay = document.createElement('div');
    
    // Create overlay element
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);
    
    // Toggle menu open/close
    function toggleMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active', isActive);
        mobileMenuOverlay.classList.toggle('active', isActive);
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking a navigation link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on window resize (when going from mobile to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Update mobile menu text when language changes
function updateMobileMenuLanguage() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-book-btn');
    mobileNavLinks.forEach(link => {
        const key = link.getAttribute('data-' + currentLang);
        if (key) {
            link.textContent = key;
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

// Update mobile menu when language changes
const originalToggleLanguage = window.toggleLanguage;
window.toggleLanguage = function() {
    originalToggleLanguage.call(this);
    updateMobileMenuLanguage();
};
