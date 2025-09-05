import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import ToastProvider from '@/components/ToastProvider'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improve loading performance
  fallback: ['system-ui', 'arial'] // Fallback fonts
})

export const metadata: Metadata = {
  title: 'Northgate Institution',
  description: 'A comprehensive question-answering platform for students and educators',
  keywords: 'education, questions, answers, students, learning',
  authors: [{ name: 'Northgate Institution' }],
  creator: 'Northgate Institution',
  publisher: 'Northgate Institution',
  robots: 'index, follow',
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    title: 'Northgate Institution',
    description: 'A comprehensive question-answering platform for students and educators',
    siteName: 'Northgate Institution',
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Northgate Institution',
    description: 'A comprehensive question-answering platform for students and educators',
  },
  // Additional meta tags for performance
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light',
    'format-detection': 'telephone=no',
  }
}

// Loading component for Suspense fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={inter.className}
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - inline for performance */
            html { 
              scroll-behavior: smooth;
              -webkit-scroll-behavior: smooth;
            }
            body { 
              margin: 0; 
              background-color: #f9fafb; 
              color: #111827; 
              font-family: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .page-loader { 
              position: fixed; 
              top: 0; 
              left: 0; 
              width: 100%; 
              height: 100%; 
              background: #f9fafb; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              z-index: 9999; 
            }
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after { 
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
          `
        }} />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Viewport meta tag for responsive design */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover" 
        />
      </head>
      <body>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main application wrapper */}
        <div id="root" className="min-h-screen">
          <Suspense fallback={<PageLoader />}>
            <main id="main-content" role="main">
              {children}
            </main>
          </Suspense>
        </div>
        
        {/* Toast notifications - now as a separate client component */}
        <ToastProvider />
        
        {/* Performance monitoring script (optional) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if ('performance' in window && 'mark' in performance && 'measure' in performance) {
                performance.mark('layout-complete');
                
                // Log Core Web Vitals if available
                if ('web-vitals' in window) {
                  // Import and use web-vitals library if needed
                }
              }
              
              // Service Worker registration (if you have one)
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                      console.log('ServiceWorker registration failed');
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}