import { Suspense } from 'react'
import { Metadata } from 'next'
import { AdSlider } from '@/components/ads/ad-slider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedPosts } from '@/components/posts/featured-posts'
import { LatestPosts } from '@/components/posts/latest-posts'
import { PopularClassifieds } from '@/components/classifieds/popular-classifieds'
import { UpcomingEvents } from '@/components/events/upcoming-events'
import { Newsletter } from '@/components/newsletter/newsletter'
import { WeatherWidget } from '@/components/widgets/weather-widget'
import { FloatingCTA } from '@/components/cta/floating-cta'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { AdBanner } from '@/components/ads/ad-banner'

export const metadata: Metadata = {
  title: 'Portal ELK - Najnowsze wiadomości z Ełku i okolic',
  description: 'Najważniejsze wydarzenia, ogłoszenia i wiadomości z Ełku i regionu Warmii i Mazur. Bądź na bieżąco z lokalnym życiem społecznym, kulturalnym i biznesowym.',
  keywords: [
    'Ełk wiadomości',
    'portal lokalny Ełk',
    'wydarzenia Ełk',
    'ogłoszenia Ełk',
    'Warmia Mazury',
    'aktualności lokalne'
  ],
  openGraph: {
    title: 'Portal ELK - Najnowsze wiadomości z Ełku i okolic',
    description: 'Najważniejsze wydarzenia, ogłoszenia i wiadomości z Ełku i regionu Warmii i Mazur.',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal ELK - Strona główna',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Premium Ad Slider - główne źródło przychodu */}
      <AdSlider />
      
      {/* Header z nawigacją */}
      <Header />
      
      {/* Banner reklamowy pod headerem */}
      <AdBanner 
        variant="horizontal"
        className="border-b"
        content={{
          title: "📱 TELEFONY ELK",
          description: "Największy wybór smartfonów i akcesoriów. Serwis, naprawy, wymiana ekranów!",
          cta: "Sprawdź →",
          link: "/ads/telefony-elk"
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="container-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Główna kolumna z treścią */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Wyróżnione artykuły */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900">
                    🏃‍♂️ Najważniejsze wydarzenia
                  </h2>
                  <div className="flex gap-2">
                    <button className="btn-ghost text-sm">Wszystkie</button>
                    <button className="btn-ghost text-sm">Dzisiaj</button>
                    <button className="btn-ghost text-sm">Najpopularniejsze</button>
                  </div>
                </div>
                
                <Suspense fallback={<LoadingSkeleton className="h-96" />}>
                  <FeaturedPosts />
                </Suspense>
              </section>

              {/* Sponsored Content - Natywna reklama */}
              <section className="ad-banner">
                <div className="ad-content">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🏢</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Firma sprzątająca CleanELK - profesjonalne sprzątanie biur i mieszkań
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Szukasz profesjonalnej firmy sprzątającej? CleanELK oferuje kompleksowe usługi sprzątania dla firm i osób prywatnych. Doświadczony zespół, nowoczesny sprzęt!
                      </p>
                      <button className="btn-secondary mt-3">
                        Darmowa wycena →
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Najnowsze artykuły */}
              <section>
                <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                  Najnowsze wiadomości
                </h2>
                
                <Suspense fallback={
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <LoadingSkeleton key={i} className="h-32" />
                    ))}
                  </div>
                }>
                  <LatestPosts />
                </Suspense>
              </section>

              {/* Load More Button */}
              <div className="text-center">
                <button className="btn-outline">
                  Załaduj więcej artykułów
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              
              {/* Sticky Ad #1 */}
              <div className="sticky top-4">
                <AdBanner 
                  variant="sidebar"
                  content={{
                    title: "Apteka ELK",
                    description: "Darmowa dostawa leków do domu!",
                    icon: "💊",
                    cta: "Zamów →",
                    link: "/ads/apteka-elk"
                  }}
                />
              </div>

              {/* Najpopularniejsze ogłoszenia */}
              <section className="card">
                <div className="card-header">
                  <h3 className="card-title text-lg">🔥 Najgorętsze ogłoszenia</h3>
                </div>
                <div className="card-content">
                  <Suspense fallback={<LoadingSkeleton className="h-40" />}>
                    <PopularClassifieds />
                  </Suspense>
                </div>
              </section>

              {/* Ad Banner #2 */}
              <AdBanner 
                variant="sidebar"
                content={{
                  title: "Pizzeria Da Vinci",
                  description: "Najlepsza pizza w ELK! Dostawa gratis!",
                  icon: "🍕",
                  cta: "Zamów →",
                  link: "/ads/pizzeria-da-vinci"
                }}
              />

              {/* Newsletter */}
              <section className="card">
                <div className="card-header">
                  <h3 className="card-title text-lg">📧 Newsletter lokalny</h3>
                  <p className="card-description">
                    Bądź na bieżąco z najważniejszymi wydarzeniami w ELK!
                  </p>
                </div>
                <div className="card-content">
                  <Newsletter />
                </div>
              </section>

              {/* Ad Banner #3 */}
              <AdBanner 
                variant="sidebar"
                content={{
                  title: "Hydraulik 24/7",
                  description: "Awarie, instalacje, naprawy. Dojazd gratis!",
                  icon: "🔧",
                  cta: "Zadzwoń →",
                  link: "/ads/hydraulik-elk"
                }}
              />

              {/* Pogoda */}
              <section className="card">
                <div className="card-header">
                  <h3 className="card-title text-lg">🌤️ Pogoda w ELK</h3>
                </div>
                <div className="card-content">
                  <Suspense fallback={<LoadingSkeleton className="h-24" />}>
                    <WeatherWidget />
                  </Suspense>
                </div>
              </section>

              {/* Nadchodzące wydarzenia */}
              <section className="card">
                <div className="card-header">
                  <h3 className="card-title text-lg">📅 Nadchodzące wydarzenia</h3>
                </div>
                <div className="card-content">
                  <Suspense fallback={<LoadingSkeleton className="h-32" />}>
                    <UpcomingEvents />
                  </Suspense>
                </div>
              </section>
            </aside>
          </div>
        </div>

        {/* Bottom Banner Grid */}
        <section className="bg-white border-t py-8">
          <div className="container-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AdBanner 
                variant="bottom"
                content={{
                  title: "Przychodnia ELK",
                  description: "Rejestracja online, szybkie terminy",
                  icon: "🏥",
                  link: "/ads/przychodnia-elk"
                }}
              />
              <AdBanner 
                variant="bottom"
                content={{
                  title: "Taxi ELK",
                  description: "Najtańsze przejazdy po mieście",
                  icon: "🚓",
                  link: "/ads/taxi-elk"
                }}
              />
              <AdBanner 
                variant="bottom"
                content={{
                  title: "Szkoła językowa",
                  description: "Angielski, niemiecki - kursy dla każdego",
                  icon: "🎓",
                  link: "/ads/szkola-jezykowa"
                }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Structured Data dla strony głównej */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Portal ELK',
            url: 'https://local-news-40c61.web.app',
            description: 'Lokalne wiadomości z Ełku i okolic',
            publisher: {
              '@type': 'Organization',
              name: 'Portal ELK',
              logo: 'https://local-news-40c61.web.app/logo.png'
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://local-news-40c61.web.app/szukaj?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
    </>
  )
}