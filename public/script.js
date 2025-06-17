// Portal Lokalnych Newsów - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portal Lokalnych Newsów uruchomiony!');
    
    // Smooth scrolling dla linków nawigacji
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
            }
        });
    });

    // Funkcjonalność "Załaduj więcej newsów"
    const loadMoreBtn = document.querySelector('.load-more');
    const newsGrid = document.querySelector('.news-grid');
    
    if (loadMoreBtn && newsGrid) {
        loadMoreBtn.addEventListener('click', function() {
            // Nowe przykładowe newsy
            const newNewsData = [
                {
                    category: 'Biznes',
                    title: 'Nowy sklep w centrum handlowym',
                    content: 'Popularna sieć sklepów otwiera kolejny punkt w naszym mieście.',
                    date: '14 czerwca 2025',
                    icon: '🏪'
                },
                {
                    category: 'Transport',
                    title: 'Nowa linia autobusowa',
                    content: 'Od przyszłego tygodnia uruchamiana zostanie nowa linia łącząca dzielnice.',
                    date: '13 czerwca 2025',
                    icon: '🚌'
                },
                {
                    category: 'Edukacja',
                    title: 'Rekrutacja do szkół średnich',
                    content: 'Rozpoczęła się rekrutacja na rok szkolny 2025/2026.',
                    date: '12 czerwca 2025',
                    icon: '🎓'
                }
            ];

            // Dodaj nowe artykuły do grida
            newNewsData.forEach((news, index) => {
                setTimeout(() => {
                    const newsCard = createNewsCard(news);
                    newsGrid.appendChild(newsCard);
                    
                    // Animacja pojawienia
                    setTimeout(() => {
                        newsCard.style.opacity = '1';
                        newsCard.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });

            // Zmień tekst przycisku
            this.textContent = 'Załadowano nowe artykuły! 🎉';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Załaduj więcej newsów';
                this.disabled = false;
            }, 3000);
        });
    }

    // System powiadomień
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style dla powiadomień
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--primary-color);
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        }
        
        document.body.appendChild(notification);
        
        // Animacja pojawienia
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ukryj po 3 sekundach
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Obsługa kliknięć na kartach newsów
    document.addEventListener('click', function(e) {
        const newsCard = e.target.closest('.news-card');
        if (newsCard) {
            const title = newsCard.querySelector('h3').textContent;
            showNotification(`Otwieranie: ${title}`, 'info');
        }
        
        const announcementCard = e.target.closest('.announcement-card');
        if (announcementCard) {
            const title = announcementCard.querySelector('h3').textContent;
            showNotification(`Kontakt w sprawie: ${title}`, 'info');
        }
    });

    // CTA Button w hero
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#aktunosci').scrollIntoView({
                behavior: 'smooth'
            });
            showNotification('Przejście do newsów! 📰', 'success');
        });
    }

    // Dodaj licznik odwiedzin (symulacja)
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    console.log(`👥 Odwiedzin portalu: ${visitCount}`);
    
    // Powiadomienie o nowym odwiedzającym
    if (visitCount == 1) {
        setTimeout(() => {
            showNotification('Witamy w portalu Local News! 🎉', 'success');
        }, 1000);
    }
});

// Funkcja pomocnicza do tworzenia kart newsów
function createNewsCard(newsData) {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    
    card.innerHTML = `
        <div class="news-image">
            <div class="placeholder-image">${newsData.icon}</div>
        </div>
        <div class="news-content">
            <span class="news-category">${newsData.category}</span>
            <h3>${newsData.title}</h3>
            <p>${newsData.content}</p>
            <div class="news-meta">
                <span class="news-date">${newsData.date}</span>
                <span class="news-author">Redakcja</span>
            </div>
        </div>
    `;
    
    return card;
}

// Śledź wydajność strony
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Strona załadowana w ${Math.round(loadTime)}ms`);
    
    if (loadTime < 1000) {
        console.log('🚀 Świetna wydajność!');
    } else if (loadTime < 3000) {
        console.log('✅ Dobra wydajność');
    } else {
        console.log('⚠️ Strona ładuje się powoli');
    }
});

// Easter egg - konami code
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

document.addEventListener('keydown', function(e) {
    konamiCode += e.code;
    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode === konamiSequence) {
        document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbow 4s ease infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
            }
        `;
        document.head.appendChild(style);
        
        showNotification('🌈 Konami Code activated!', 'success');
    }
});

console.log('🎯 Portal gotowy do akcji!');
