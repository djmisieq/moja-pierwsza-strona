// Premium Portal Lokalny - JavaScript w stylu xyz.pl
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ Premium Portal Lokalny uruchomiony');
    
    // Reading progress bar
    createReadingProgressBar();
    
    // Smooth scrolling dla linków nawigacji
    initSmoothScrolling();
    
    // Premium subscription interactions
    initSubscriptionFeatures();
    
    // Article interactions
    initArticleInteractions();
    
    // Newsletter signup
    initNewsletterSignup();
    
    // Search functionality
    initSearchFunctionality();
    
    // Dark mode toggle (premium feature)
    initDarkModeToggle();
    
    // Analytics dla premium content
    initPremiumAnalytics();
});

// Reading progress bar - elegancka funkcja w stylu premium portali
function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Smooth scrolling - wyrafinowany i płynny
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
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
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Premium subscription features
function initSubscriptionFeatures() {
    const subscribeButtons = document.querySelectorAll('.subscribe-btn, .premium-btn, .footer-subscribe-btn');
    
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            showPremiumModal();
        });
    });
    
    // Premium content teasers
    const premiumCards = document.querySelectorAll('.article-card.premium');
    premiumCards.forEach(card => {
        card.addEventListener('click', function() {
            showPremiumContentTeaser();
        });
    });
}

// Modal dla premium subscription
function showPremiumModal() {
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 40px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <h3 style="font-family: 'Crimson Text', serif; font-size: 28px; margin-bottom: 20px; color: var(--primary-color);">
                Dostęp Premium
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 30px; line-height: 1.6;">
                Pogłębione analizy, ekskluzywne wywiady i raporty rynkowe. 
                Dołącz do grona czytelników, którzy mają dostęp do najlepszych treści biznesowych.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button class="modal-subscribe" style="
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                ">Sprawdź ofertę</button>
                <button class="modal-close" style="
                    background: transparent;
                    color: var(--text-secondary);
                    border: 1px solid var(--border-medium);
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 500;
                    cursor: pointer;
                ">Zamknij</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animacja pojawienia
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Zamykanie modala
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => document.body.removeChild(modal), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    });
    
    // Premium subscription action
    modal.querySelector('.modal-subscribe').addEventListener('click', () => {
        showNotification('Przekierowanie do płatności...', 'info');
        // Tu byłaby integracja z systemem płatności
    });
}

// Premium content teaser
function showPremiumContentTeaser() {
    showNotification('Ta treść jest dostępna dla subskrybentów premium', 'premium');
}

// Article interactions - eleganckie i responsywne
function initArticleInteractions() {
    const articleCards = document.querySelectorAll('.article-card:not(.premium)');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Otwieranie: ${title}`, 'success');
            
            // Symulacja przejścia do artykułu
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        });
        
        // Hover effects dla lepszego UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Reading time estimation
    calculateReadingTime();
}

// Obliczanie czasu czytania
function calculateReadingTime() {
    const articles = document.querySelectorAll('.article-card, .main-article');
    
    articles.forEach(article => {
        const text = article.textContent;
        const wordCount = text.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // 200 słów na minutę
        
        const timeElement = document.createElement('span');
        timeElement.className = 'reading-time';
        timeElement.textContent = `${readingTime} min czytania`;
        timeElement.style.cssText = `
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 500;
        `;
        
        const meta = article.querySelector('.article-meta');
        if (meta) {
            meta.appendChild(timeElement);
        }
    });
}

// Newsletter signup z walidacją
function initNewsletterSignup() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        
        if (!validateEmail(email)) {
            showNotification('Wprowadź prawidłowy adres email', 'error');
            return;
        }
        
        // UI feedback
        button.textContent = 'Zapisywanie...';
        button.disabled = true;
        
        // Symulacja API call
        setTimeout(() => {
            showNotification('Dziękujemy za zapisanie się do newslettera!', 'success');
            this.reset();
            button.textContent = 'Zapisz się';
            button.disabled = false;
        }, 1500);
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Search functionality - premium feature
function initSearchFunctionality() {
    // Create search toggle
    const searchToggle = document.createElement('button');
    searchToggle.innerHTML = '🔍';
    searchToggle.style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 8px;
        color: var(--text-secondary);
    `;
    
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.insertBefore(searchToggle, navActions.firstChild);
    }
    
    searchToggle.addEventListener('click', () => {
        showSearchModal();
    });
    
    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showSearchModal();
        }
    });
}

// Search modal
function showSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 100px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="search-container" style="
            background: white;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <input type="text" placeholder="Szukaj artykułów... (Ctrl+K)" style="
                width: 100%;
                padding: 20px;
                border: none;
                outline: none;
                font-size: 18px;
                border-radius: 8px 8px 0 0;
            ">
            <div class="search-results" style="
                padding: 20px;
                max-height: 400px;
                overflow-y: auto;
                color: var(--text-secondary);
            ">
                Wprowadź frazę do wyszukania...
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('input').focus();
    }, 10);
    
    // Search functionality
    const searchInput = modal.querySelector('input');
    const searchResults = modal.querySelector('.search-results');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            performSearch(query, searchResults);
        } else {
            searchResults.innerHTML = 'Wprowadź co najmniej 3 znaki...';
        }
    });
    
    // Close modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Search function
function performSearch(query, resultsContainer) {
    // Symulacja wyszukiwania w artykułach
    const articles = document.querySelectorAll('.article-card h3, .article-title');
    const results = [];
    
    articles.forEach(article => {
        if (article.textContent.toLowerCase().includes(query)) {
            results.push({
                title: article.textContent,
                type: 'Artykuł'
            });
        }
    });
    
    if (results.length > 0) {
        resultsContainer.innerHTML = results.map(result => `
            <div style="
                padding: 12px;
                border-bottom: 1px solid var(--border-light);
                cursor: pointer;
                transition: background 0.2s ease;
            " onmouseover="this.style.background='var(--background-light)'" 
               onmouseout="this.style.background='transparent'">
                <div style="font-weight: 500; color: var(--primary-color);">${result.title}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${result.type}</div>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = 'Brak wyników dla tej frazy.';
    }
}

// Dark mode toggle
function initDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.title = 'Przełącz tryb ciemny';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
        z-index: 1000;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '☀️';
    }
}

// Premium analytics
function initPremiumAnalytics() {
    // Track reading behavior
    let startTime = Date.now();
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
    });
    
    window.addEventListener('beforeunload', () => {
        const sessionData = {
            timeSpent: Date.now() - startTime,
            maxScroll: Math.round(maxScroll),
            articlesViewed: document.querySelectorAll('.article-card').length
        };
        
        console.log('📊 Session analytics:', sessionData);
        // W rzeczywistej aplikacji wysłalibyśmy to do systemu analytics
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        premium: '👑'
    };
    
    notification.innerHTML = `
        <span style="margin-right: 8px;">${icons[type] || icons.info}</span>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'premium' ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 
                    type === 'success' ? '#10b981' : 
                    type === 'error' ? '#ef4444' : 'var(--primary-color)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Premium content lazy loading
function initLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.article-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initLazyLoading();
    
    // Welcome message for new visitors
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            showNotification('Witamy w Premium Portal Lokalny! 👋', 'info');
            localStorage.setItem('visited', 'true');
        }, 2000);
    }
    
    console.log('🎯 Premium Portal gotowy do działania!');
});
