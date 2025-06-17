import type { Metadata } from 'next'
import { Inter, Crimson_Text } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-crimson',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Portal ELK - Lokalne wiadomości z Ełku i okolic',
    template: '%s | Portal ELK'
  },
  description: 'Najnowsze wiadomości z Ełku i regionu Warmii i Mazur. Lokalne wydarzenia, ogłoszenia, sport, kultura i biznes.',
  keywords: [
    'Ełk',
    'wiadomości',
    'portal lokalny',
    'Warmia i Mazury',
    'wydarzenia',
    'ogłoszenia',
    'sport',
    'kultura',
    'biznes'
  ],
  authors: [{ name: 'Portal ELK Team' }],
  creator: 'Portal ELK',
  publisher: 'Portal ELK',
  metadataBase: new URL('https://local-news-40c61.web.app'),
  alternates: {
    canonical: '/',
    languages: {
      'pl': '/pl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://local-news-40c61.web.app',
    title: 'Portal ELK - Lokalne wiadomości z Ełku i okolic',
    description: 'Najnowsze wiadomości z Ełku i regionu Warmii i Mazur. Lokalne wydarzenia, ogłoszenia, sport, kultura i biznes.',
    siteName: 'Portal ELK',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal ELK - Lokalne wiadomości',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal ELK - Lokalne wiadomości z Ełku i okolic',
    description: 'Najnowsze wiadomości z Ełku i regionu Warmii i Mazur.',
    images: ['/og-image.jpg'],
    creator: '@portalelk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="pl" 
      className={cn(
        inter.variable,
        crimsonText.variable,
        'antialiased'
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC (Flash of Unstyled Content)
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        'selection:bg-elk-orange-200 selection:text-elk-orange-900'
      )}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
          <Analytics />
          
          {/* Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
          
          {/* Facebook SDK */}
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v18.0&appId=your-facebook-app-id&autoLogAppEvents=1"
          />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NewsMediaOrganization',
                name: 'Portal ELK',
                url: 'https://local-news-40c61.web.app',
                logo: 'https://local-news-40c61.web.app/logo.png',
                sameAs: [
                  'https://facebook.com/portalelk',
                  'https://instagram.com/portalelk',
                  'https://twitter.com/portalelk'
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Ełk',
                  addressRegion: 'Warmińsko-Mazurskie',
                  addressCountry: 'PL'
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+48-87-123-4567',
                  contactType: 'editorial'
                }
              })
            }}
          />
        </Providers>
      </body>
    </html>
  )
}