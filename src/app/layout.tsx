import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'MC Collo Events | Professional Master of Ceremonies',
  description: 'MC Collo Events - Professional MC for weddings, corporate events, galas, conferences, and private celebrations. Creating unforgettable moments with charisma and professionalism.',
  keywords: ['MC', 'Master of Ceremonies', 'Wedding MC', 'Corporate Events', 'Event Host', 'Professional MC', 'MC Collo Events', 'Busia MC', 'Kenya MC', 'Dowry Ceremony', 'Fundraising MC'],
  authors: [{ name: 'MC Collo Events' }],
  metadataBase: new URL('https://mccollo.com'),
  alternates: {
    canonical: 'https://mccollo.com/',
  },
  icons: {
    icon: [
      { url: '/Images/MC_COLLO_LOGO.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/Images/MC_COLLO_LOGO.png',
    apple: '/Images/MC_COLLO_LOGO.png',
  },
  openGraph: {
    title: 'MC Collo Events | Professional Master of Ceremonies',
    description: 'MC Collo Events - Professional MC for weddings, corporate events, galas, conferences, and private celebrations.',
    type: 'website',
    url: 'https://mccollo.com/',
    siteName: 'MC Collo Events',
    images: [
      {
        url: '/Images/MC_COLLO_LOGO.png',
        width: 512,
        height: 512,
        alt: 'MC Collo Events Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MC Collo Events | Professional Master of Ceremonies',
    description: 'Professional MC for weddings, corporate events, galas, conferences, and private celebrations.',
    images: ['/Images/MC_COLLO_LOGO.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020617" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans bg-dark-950 text-white antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
