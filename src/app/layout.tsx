import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Abril_Fatface, Source_Sans_3, Roboto } from 'next/font/google';
import { FeedbackWidget } from '@/components/common/FeedbackWidget';
import { ReduxProvider } from '@/lib/redux/ReduxProvider';
import { HeroThemeProvider } from '@/components/common/HeroThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-heading',
  display: 'swap',
});

const abril = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abril',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-sans-body',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cropmyimages.com';
const googleTagManagerId = 'GTM-WQD67L3X';
const googleAnalyticsId = 'G-HHJZB507K1';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CropMyImages - Free Image Resizer, Cropper & Format Converter',
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
      data-hero-theme="light"
      suppressHydrationWarning
      className={`scroll-smooth ${playfair.variable} ${abril.variable} ${sourceSans.variable} ${roboto.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" sizes="any" />
        <link rel="shortcut icon" href="/logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />

        {/* Responsive LCP Preloads for Hero Backgrounds (Fast FCP/LCP) */}
        <link
          rel="preload"
          as="image"
          href="/dekstop-day-mode-bg-image-cropmyimages.webp"
          media="(min-width: 768px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/mobile-day-mode-bg-image.webp"
          media="(max-width: 767px)"
          type="image/webp"
        />

        {/* Prefetch Night Mode Images in Background for Instant Zero-Lag Switch */}
        <link
          rel="prefetch"
          as="image"
          href="/dekstop-nightmode-bg-image-cropmyimages.webp"
          type="image/webp"
        />
        <link
          rel="prefetch"
          as="image"
          href="/mobile-nightmode-bg-image.webp"
          type="image/webp"
        />

        {/* Blocking Sync Theme Initialization: Prevents FOUC & Eliminates CLS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cmi_hero_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-hero-theme',t);}catch(e){document.documentElement.setAttribute('data-hero-theme','light');}})();`,
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>

        {/* Google Tag Manager Script (GTM-WQD67L3X) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          `}
        </Script>
        
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ReduxProvider>
          <HeroThemeProvider>
            {children}
            <FeedbackWidget />
            <SpeedInsights />
          </HeroThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
