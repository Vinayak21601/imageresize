import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackWidget } from '@/components/common/FeedbackWidget';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cropmyimages.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CropMyImages — Free Image Resizer, Cropper & Format Converter',
    template: '%s | CropMyImages',
  },
  description:
    'Free online high-precision image engine. Crop photos with aspect ratios, resize in px, in, cm, mm, target file size compression, detect IP address, and generate QR codes.',
  keywords: [
    'image resizer',
    'image cropper',
    'photo crop online',
    'aspect ratio cropper',
    'unit converter px to cm',
    'target file size compressor',
    'convert webp to png',
    'convert heic to jpg',
    'qr code generator',
    'what is my ip',
    'url shortener',
  ],
  authors: [{ name: 'CropMyImages Engineering Team' }],
  creator: 'CropMyImages',
  publisher: 'CropMyImages',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'CropMyImages — High Precision Image Engine & Web Tools',
    description: 'Crop images with aspect ratio presets, convert units (px, in, cm, mm), target output file sizes, check public IP address, and generate QR codes.',
    siteName: 'CropMyImages',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'CropMyImages Brand Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CropMyImages — Free Online Image & Web Utilities',
    description: 'Precision web tools for creators & developers: cropper, unit resizer, format converters, QR generator, and IP geolocation.',
    images: ['/logo.webp'],
  },
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CropMyImages',
  url: siteUrl,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free online high-precision image processing suite for cropping, unit conversion (px, in, cm, mm), target compression, QR generation, URL shortening, and IP lookup.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:wght@300;400;500;700&family=Source+Sans+3:wght@300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.webp" type="image/webp" sizes="any" />
        <link rel="shortcut icon" href="/logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        
        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />

        {/* Google AdSense Script Integration */}
        {adClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className="bg-[#0B0E14] text-zinc-100 antialiased selection:bg-[#CCFF00] selection:text-black min-h-screen flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
