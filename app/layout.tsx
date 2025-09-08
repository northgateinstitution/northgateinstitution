import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Northgate Institution',
  description: 'A comprehensive question-answering platform for students and educators',
  keywords: 'education, questions, answers, students, learning',
  authors: [{ name: 'Northgate Institution' }],
  creator: 'Northgate Institution',
  publisher: 'Northgate Institution',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Northgate Institution',
    description: 'A comprehensive question-answering platform for students and educators',
    siteName: 'Northgate Institution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northgate Institution',
    description: 'A comprehensive question-answering platform for students and educators',
  },
  other: {
    'theme-color': '#3b82f6',
    'format-detection': 'telephone=no',
  }
}

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
        {/* Preload multiple font formats for old browsers */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* DNS prefetch & preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical fallback styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }
            body {
              margin: 0;
              background: #f9fafb;
              color: #111827;
              font-family: ${inter.style.fontFamily}, Arial, sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `
        }} />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        <div id="root" className="min-h-screen">
          <Suspense fallback={<PageLoader />}>
            <main id="main-content" role="main">
              {children}
            </main>
          </Suspense>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js', { scope: '/' })
                  .then(function() { console.log('SW registration successful'); })
                  .catch(function() { console.log('SW registration failed'); });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}
