import type { Metadata } from 'next'
import { Inter, Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Eastern Land Operations',
    template: '%s | Eastern Land Operations',
  },
  description:
    'Eastern Land Operations is a strategic land operator focused on tactical acquisitions and redevelopment outcomes. Institutional discipline. Long-horizon ownership.',
  keywords: [
    'Eastern Land Operations',
    'strategic land operator',
    'land acquisitions',
    'property redevelopment',
    'institutional real estate',
    'Philadelphia land operator',
    'tactical acquisitions',
  ],
  authors: [{ name: 'Eastern Land Operations' }],
  icons: {
    icon: [
      { url: '/brand/elo-favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/elo-logo-black.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/brand/elo-favicon.svg'],
    apple: [{ url: '/brand/elo-logo-black.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://easternlandoperations.com',
    siteName: 'Eastern Land Operations',
    title: 'Eastern Land Operations',
    description: 'Strategic land operator with institutional discipline.',
    images: [
      {
        url: '/brand/elo-logo-black.png',
        width: 1200,
        height: 742,
        alt: 'Eastern Land Operations brand mark',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}
    >
      <body className="bg-matte-black text-off-white font-body antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
