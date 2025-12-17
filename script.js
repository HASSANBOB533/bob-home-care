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
    
    // Add event listener for mobile menu language toggle
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggleMobile) {
        // Click event
        langToggleMobile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLanguage();
            console.log('Language toggle clicked');
        });
        
        // Touch event for better mobile support
        langToggleMobile.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLanguage();
            console.log('Language toggle touched');
        });
    }
    
    // Initialize other features
    initSmoothScrolling();
    initFormSubmission();
    initScrollAnimations();
    addScrollAnimationStyles();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize carousel
    new ImageCarousel();
    
    // Initialize testimonials carousel
    initTestimonialsCarousel();
    
    // Initialize date picker
    initDatePicker();
    
    // Initialize lazy video
    initLazyVideo();
    
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

// Carousel initialization moved to main DOMContentLoaded handler


/* ============================================
   MOBILE MENU FUNCTIONALITY - REMOVED OLD CODE
   ============================================ */

// Old initMobileMenu function removed - using new simple implementation at end of file


// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const carousel = document.querySelector('.testimonials-carousel');
    const indicatorsContainer = document.getElementById('testimonialsIndicators');
    const prevBtn = document.querySelector('.testimonial-carousel-btn.prev');
    const nextBtn = document.querySelector('.testimonial-carousel-btn.next');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const cardCount = cards.length;
    let currentIndex = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Create indicators
    for (let i = 0; i < cardCount; i++) {
        const indicator = document.createElement('button');
        indicator.className = `testimonial-indicator ${i === 0 ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Review ${i + 1}`);
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    function updateCarousel() {
        const mobile = isMobile();
        
        if (mobile && carousel) {
            // On mobile, use scrollLeft for smooth native scrolling
            const card = cards[currentIndex];
            if (card) {
                const scrollPosition = card.offsetLeft - carousel.offsetLeft;
                carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        } else {
            // On desktop, use transform with proper calculation
            const carouselWidth = carousel.offsetWidth;
            const offset = -currentIndex * carouselWidth;
            track.style.transform = `translateX(${offset}px)`;
        }
        
        // Update indicators
        document.querySelectorAll('.testimonial-indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
        resetAutoplay();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
        resetAutoplay();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Touch/Swipe support with horizontal scroll
    let isScrolling = false;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isScrolling = true;
        clearInterval(autoplayInterval);
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        isScrolling = false;
        handleSwipe();
        startAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Listen for scroll events on mobile to update indicators
    if (carousel) {
        let scrollTimeout;
        carousel.addEventListener('scroll', () => {
            if (!isMobile()) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Find which card is most visible
                const scrollLeft = carousel.scrollLeft;
                let closestIndex = 0;
                let closestDistance = Infinity;
                
                cards.forEach((card, index) => {
                    const cardLeft = card.offsetLeft - carousel.offsetLeft;
                    const distance = Math.abs(scrollLeft - cardLeft);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });
                
                if (closestIndex !== currentIndex) {
                    currentIndex = closestIndex;
                    // Update indicators without scrolling
                    document.querySelectorAll('.testimonial-indicator').forEach((ind, i) => {
                        ind.classList.toggle('active', i === currentIndex);
                    });
                }
            }, 100);
        }, { passive: true });
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);
    
    // Mouse drag support for desktop
    let mouseStartX = 0;
    let mouseEndX = 0;
    let isDragging = false;
    
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        mouseStartX = e.clientX;
        track.style.cursor = 'grabbing';
        clearInterval(autoplayInterval);
        e.preventDefault();
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        mouseEndX = e.clientX;
        track.style.cursor = 'grab';
        handleMouseDrag();
        startAutoplay();
    });
    
    track.addEventListener('mouseleave', (e) => {
        if (!isDragging) return;
        isDragging = false;
        mouseEndX = e.clientX;
        track.style.cursor = 'grab';
        handleMouseDrag();
        startAutoplay();
    });
    
    function handleMouseDrag() {
        const dragThreshold = 50;
        const diff = mouseStartX - mouseEndX;
        
        if (Math.abs(diff) > dragThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Set initial cursor style
    track.style.cursor = 'grab';
}

// Testimonials carousel initialization moved to main DOMContentLoaded handler


// ============================================
// DATE PICKER INITIALIZATION
// ============================================

function initDatePicker() {
    const dateInput = document.getElementById('bookingDate');
    if (!dateInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    dateInput.setAttribute('min', minDate);
    
    // Set maximum date to 90 days from now
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 90);
    const maxYear = maxDate.getFullYear();
    const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDay = String(maxDate.getDate()).padStart(2, '0');
    const maxDateStr = `${maxYear}-${maxMonth}-${maxDay}`;
    
    dateInput.setAttribute('max', maxDateStr);
    
    // Handle placeholder visibility
    const placeholder = dateInput.parentElement.querySelector('.date-placeholder');
    
    function updatePlaceholder() {
        if (dateInput.value) {
            dateInput.classList.add('has-value');
            if (placeholder) placeholder.style.display = 'none';
        } else {
            dateInput.classList.remove('has-value');
            if (placeholder) placeholder.style.display = 'block';
        }
    }
    
    // Initialize placeholder state
    updatePlaceholder();
    
    // Update on change
    dateInput.addEventListener('change', function() {
        updatePlaceholder();
        
        if (this.value) {
            // Validate date
            const selectedDate = new Date(this.value);
            const selectedTime = selectedDate.getTime();
            const minTime = new Date(minDate).getTime();
            const maxTime = new Date(maxDateStr).getTime();
            
            if (selectedTime < minTime || selectedTime > maxTime) {
                this.value = '';
                updatePlaceholder();
                alert('يرجى اختيار تاريخ صحيح');
            }
        }
    });
    
    // Also update on focus/blur for better UX
    dateInput.addEventListener('focus', function() {
        if (placeholder) placeholder.style.opacity = '0.5';
    });
    
    dateInput.addEventListener('blur', function() {
        updatePlaceholder();
        if (placeholder && !this.value) placeholder.style.opacity = '1';
    });
}

// Date picker initialization moved to main DOMContentLoaded handler


// ============================================
// LAZY LOADED VIDEO INITIALIZATION
// ============================================

function initLazyVideo() {
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const youtubeIframe = document.getElementById('youtubeIframe');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    const videoWrapper = document.getElementById('lazyVideoWrapper');
    
    if (!videoPlayBtn || !youtubeIframe) return;
    
    function loadVideo() {
        youtubeIframe.src = 'https://www.youtube.com/embed/4ulJE0capWc?autoplay=1&modestbranding=1&rel=0';
        youtubeIframe.style.display = 'block';
        youtubeIframe.style.position = 'absolute';
        youtubeIframe.style.top = '0';
        youtubeIframe.style.left = '0';
        youtubeIframe.style.width = '100%';
        youtubeIframe.style.height = '100%';
        videoThumbnail.style.display = 'none';
        videoPlayBtn.style.display = 'none';
        if (videoWrapper) {
            videoWrapper.classList.add('loaded');
        }
    }
    
    videoPlayBtn.addEventListener('click', loadVideo);
    videoThumbnail.addEventListener('click', loadVideo);
}

// ============================================
// GALLERY LIGHTBOX FUNCTIONALITY
// ============================================

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentImageNum = document.getElementById('currentImageNum');
    const totalImages = document.getElementById('totalImages');

    if (!lightboxModal || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.dataset.image,
        alt: item.dataset.alt
    }));

    if (totalImages) {
        totalImages.textContent = images.length;
    }

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        currentImageNum.textContent = currentIndex + 1;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox();
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevious);
    lightboxNext.addEventListener('click', showNext);

    // Close on overlay click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') closeLightbox();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext();
            } else {
                showPrevious();
            }
        }
    }
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryLightbox);
} else {
    initGalleryLightbox();
}
// Ultra-Simple Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const btn = document.getElementById('mobileMenuBtn');
    
    if (menu && overlay && btn) {
        const isActive = menu.classList.contains('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        btn.classList.toggle('active');
        
        // Lock body scroll when menu is open
        if (!isActive) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }
}

function closeMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const btn = document.getElementById('mobileMenuBtn');
    
    if (menu && overlay && btn) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        btn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Define initMobileMenu function
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('#menu a');
    
    if (btn) {
        btn.addEventListener('click', toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    console.log('✓ Mobile menu initialized');
}

// Close menu on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ========================================
// BULLETPROOF RTL MOBILE MENU JAVASCRIPT
// ========================================

(function() {
    'use strict';
    
    // Get elements
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const menuPanel = document.getElementById('mobileMenuPanel');
    const closeBtn = document.getElementById('mobileMenuClose');
    const overlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Safety check
    if (!toggleBtn || !menuPanel || !closeBtn || !overlay) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu() {
        const isOpen = menuPanel.classList.contains('open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Open menu function
    function openMenu() {
        menuPanel.classList.add('open');
        overlay.classList.add('open');
        toggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close menu function
    function closeMenu() {
        menuPanel.classList.remove('open');
        overlay.classList.remove('open');
        toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    toggleBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    console.log('✓ BULLETPROOF RTL Mobile menu initialized successfully');
})();


// ULTRA-MINIMAL MOBILE MENU - GUARANTEED TO WORK
(function() {
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    
    if (!menuBtn || !closeBtn || !mobileMenu || !overlay) {
      return;
    }
    
    // Show menu button on mobile
    function checkMobile() {
      if (window.innerWidth <= 768) {
        menuBtn.style.display = 'flex';
        menuBtn.style.flexDirection = 'column';
        menuBtn.style.gap = '5px';
      } else {
        menuBtn.style.display = 'none';
        mobileMenu.style.right = '-100%';
        overlay.style.display = 'none';
        document.body.classList.remove('menu-open');
      }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Open menu function
    function openMenu() {
      mobileMenu.style.right = '0';
      overlay.style.display = 'block';
      document.body.classList.add('menu-open');
    }
    
    // Close menu function
    function closeMenu() {
      mobileMenu.style.right = '-100%';
      overlay.style.display = 'none';
      document.body.classList.remove('menu-open');
    }
    
    // Toggle menu
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });
    
    // Close menu
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
    
    // Also handle touch events for better mobile support
    closeBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', function() {
      closeMenu();
    });
    
    // Close on link click
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
    
    // Handle language toggle in mobile menu
    const langToggleMobileBtn = document.getElementById('langToggleMobile');
    if (langToggleMobileBtn) {
      langToggleMobileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof toggleLanguage === 'function') {
          toggleLanguage();
        }
      });
      
      // Ensure button is clickable with pointer-events
      langToggleMobileBtn.style.pointerEvents = 'auto';
    }

})();
