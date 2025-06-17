// PORTAL LOKALNY ELK - JavaScript dla monetyzacji reklamowej

document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // PREMIUM SLIDER REKLAMOWY
    // ===================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.ad-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Auto-rotation slidera (co 5 sekund)
    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Event listeners dla nawigacji
    window.changeSlide = function(direction) {
        // Zatrzymaj auto-rotation gdy użytkownik interaktuje
        clearInterval(slideInterval);
        
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
        
        // Restart auto-rotation po 10 sekundach
        slideInterval = setInterval(nextSlide, 5000);
    };

    window.currentSlide = function(index) {
        clearInterval(slideInterval);
        showSlide(index - 1); // Convert to 0-based index
        slideInterval = setInterval(nextSlide, 5000);
    };

    // Hover effects - zatrzymaj slider gdy user hovera
    const sliderContainer = document.querySelector('.ads-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // ===================================
    // SEARCH FUNCTIONALITY
    // ===================================
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.querySelector('.search-input');

    window.toggleSearch = function() {
        if (searchOverlay) {
            searchOverlay.classList.toggle('active');
            if (searchOverlay.classList.contains('active')) {
                searchInput?.focus();
            }
        }
    };

    // Close search with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
            toggleSearch();
        }
    });

    // Search on Enter
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }

    function performSearch(query) {
        // Placeholder search functionality
        console.log('Searching for:', query);
        alert(`Szukasz: "${query}"\nFunkcja wyszukiwania zostanie wkrótce dodana!`);
        toggleSearch();
    }

    // ===================================
    // AD INTERACTION TRACKING
    // ===================================
    function trackAdClick(adType, adId, adText) {
        // Analytics tracking dla reklam
        console.log('Ad clicked:', {
            type: adType,
            id: adId,
            text: adText,
            timestamp: new Date().toISOString()
        });
        
        // Tutaj można dodać Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Advertisement',
                event_label: `${adType}_${adId}`,
                value: 1
            });
        }
    }

    // Track clicks na reklamach w sliderze
    document.querySelectorAll('.ad-cta').forEach((cta, index) => {
        cta.addEventListener('click', function(e) {
            e.preventDefault();
            const adText = this.closest('.ad-slide')?.querySelector('h2')?.textContent || 'Unknown';
            trackAdClick('hero_slider', index + 1, adText);
            
            // Dodaj efekt wizualny
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Symuluj przekierowanie (w rzeczywistości byłby prawdziwy link)
            setTimeout(() => {
                alert(`Przekierowanie do: ${adText}\n\nW prawdziwym portalu tutaj byłoby przekierowanie do strony reklamodawcy.`);
            }, 200);
        });
    });

    // Track clicks na reklamach w sidebar
    document.querySelectorAll('.sidebar-ad .ad-btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const adText = this.closest('.sidebar-ad').querySelector('h4')?.textContent || 'Sidebar Ad';
            trackAdClick('sidebar', index + 1, adText);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                alert(`Kontakt z: ${adText}\n\nW prawdziwym portalu tutaj byłoby przekierowanie lub modal kontaktowy.`);
            }, 200);
        });
    });

    // Track clicks na sponsored content
    document.querySelectorAll('.sponsor-cta').forEach((cta, index) => {
        cta.addEventListener('click', function(e) {
            e.preventDefault();
            const adText = this.closest('.sponsored-article').querySelector('h3')?.textContent || 'Sponsored Content';
            trackAdClick('sponsored_content', index + 1, adText);
            
            setTimeout(() => {
                alert(`Treść sponsorowana: ${adText}\n\nPrzenieś do dedykowanej strony z ofertą.`);
            }, 200);
        });
    });

    // ===================================
    // FLOATING CTA FUNCTIONALITY
    // ===================================
    window.openAdForm = function() {
        // Symulacja formularza dodawania ogłoszenia
        const userConfirmed = confirm(
            "💰 DODAJ OGŁOSZENIE ZA DARMO!\n\n" +
            "✓ Natychmiastowa publikacja\n" +
            "✓ Dotarcie do tysięcy mieszkańców ELK\n" +
            "✓ Promocja w social media\n" +
            "✓ Wsparcie telefoniczne\n\n" +
            "Czy chcesz dodać ogłoszenie?"
        );
        
        if (userConfirmed) {
            // W rzeczywistym portalu tutaj byłby formularz
            alert("🎉 Świetnie!\n\nZa chwilę zostaniesz przekierowany do formularza dodawania ogłoszenia.\n\nFunkcja zostanie wkrótce uruchomiona!");
            
            // Track conversion
            trackAdClick('floating_cta', 1, 'Add Advertisement CTA');
        }
    };

    // Hide floating CTA when scrolling up
    let lastScrollTop = 0;
    const floatingCta = document.querySelector('.floating-cta');
    
    if (floatingCta) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scrolling down - show CTA
                floatingCta.style.transform = 'translateY(0)';
                floatingCta.style.opacity = '1';
            } else if (currentScroll < lastScrollTop || currentScroll < 50) {
                // Scrolling up or near top - hide CTA
                floatingCta.style.transform = 'translateY(100px)';
                floatingCta.style.opacity = '0';
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }

    // ===================================
    // NEWSLETTER FUNCTIONALITY
    // ===================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value.trim();
            
            if (email && isValidEmail(email)) {
                // Symulacja zapisu do newslettera
                this.innerHTML = `
                    <div style="text-align: center; color: white;">
                        <div style="font-size: 24px; margin-bottom: 10px;">✅</div>
                        <h4>Dziękujemy!</h4>
                        <p style="font-size: 14px; opacity: 0.9;">Newsletter został aktywowany dla:<br><strong>${email}</strong></p>
                    </div>
                `;
                
                // Track newsletter signup
                console.log('Newsletter signup:', email);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'sign_up', {
                        event_category: 'Newsletter',
                        event_label: 'Local News Subscription'
                    });
                }
            } else {
                alert('Proszę podać prawidłowy adres email.');
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ===================================
    // NEWS FILTERS
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-item, .main-article');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Filter articles (placeholder functionality)
            console.log('Filtering articles by:', filter);
            
            // Add visual feedback
            articles.forEach(article => {
                article.style.opacity = '0.5';
                setTimeout(() => {
                    article.style.opacity = '1';
                }, 200);
            });
        });
    });

    // ===================================
    // LOAD MORE FUNCTIONALITY
    // ===================================
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Ładowanie...';
            this.disabled = true;
            
            // Symulacja ładowania treści
            setTimeout(() => {
                // W rzeczywistym portalu tutaj byłby AJAX request
                const articlesList = document.querySelector('.articles-list');
                if (articlesList) {
                    const moreArticles = `
                        <article class="article-item">
                            <div class="article-thumb">
                                <div class="placeholder-img">📰</div>
                            </div>
                            <div class="article-info">
                                <h3>Nowe inwestycje w ELK - co się planuje na 2025 rok?</h3>
                                <p class="meta">📅 8 godzin temu • 👁️ 145 wyświetleń</p>
                            </div>
                        </article>
                        <article class="article-item">
                            <div class="article-thumb">
                                <div class="placeholder-img">🚌</div>
                            </div>
                            <div class="article-info">
                                <h3>Zmiany w komunikacji miejskiej - nowe przystanki</h3>
                                <p class="meta">📅 10 godzin temu • 👁️ 98 wyświetleń</p>
                            </div>
                        </article>
                    `;
                    
                    articlesList.insertAdjacentHTML('beforeend', moreArticles);
                }
                
                this.textContent = 'Załaduj więcej artykułów';
                this.disabled = false;
                
                // Track load more
                console.log('More articles loaded');
                
            }, 1000);
        });
    }

    // ===================================
    // STICKY AD BEHAVIOR
    // ===================================
    const stickyAd = document.querySelector('.sticky-ad');
    if (stickyAd) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ad is visible - track impression
                    console.log('Sticky ad impression');
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'view_item', {
                            event_category: 'Advertisement',
                            event_label: 'Sticky Sidebar Ad'
                        });
                    }
                }
            });
        }, {
            threshold: 0.5 // Ad musi być w 50% widoczne
        });
        
        observer.observe(stickyAd);
    }

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Lazy loading dla obrazków (jeśli są)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    function preloadResources() {
        // Preload next slide images (gdyby były prawdziwe obrazy)
        const nextSlideIndex = (currentSlide + 1) % totalSlides;
        const nextSlide = slides[nextSlideIndex];
        if (nextSlide) {
            const img = nextSlide.querySelector('img');
            if (img && img.dataset.src) {
                const preloadImg = new Image();
                preloadImg.src = img.dataset.src;
            }
        }
    }

    // ===================================
    // ANALYTICS & TRACKING
    // ===================================
    
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Portal ELK - Lokalne Wiadomości',
            page_location: window.location.href
        });
    }

    // Track time on page
    let timeOnPage = 0;
    const timeTracker = setInterval(() => {
        timeOnPage += 5;
        
        // Track engagement milestones
        if (timeOnPage === 30) { // 30 seconds
            console.log('User engaged - 30s on page');
        } else if (timeOnPage === 60) { // 1 minute
            console.log('User highly engaged - 1min on page');
        } else if (timeOnPage === 180) { // 3 minutes
            console.log('User very engaged - 3min on page');
        }
    }, 5000);

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            // Track scroll milestones
            if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                console.log('25% page scroll');
            } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                console.log('50% page scroll');
            } else if (maxScrollDepth >= 75) {
                console.log('75% page scroll');
            }
        }
    });

    // ===================================
    // USER EXPERIENCE ENHANCEMENTS
    // ===================================
    
    // Smooth scrolling dla anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states
    document.querySelectorAll('button, .btn-primary, .ad-cta').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // ===================================
    // KEYBOARD ACCESSIBILITY
    // ===================================
    
    // Keyboard navigation dla slidera
    document.addEventListener('keydown', function(e) {
        if (document.activeElement?.closest('.ads-slider-container')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                changeSlide(1);
            }
        }
    });

    // Focus management
    document.querySelectorAll('.ad-cta, .ad-btn').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    console.log('🚀 Portal ELK załadowany pomyślnie!');
    console.log('📊 System trackingu reklam aktywny');
    console.log('💰 Portal gotowy do monetyzacji');

    // Initialize preloading
    preloadResources();
});