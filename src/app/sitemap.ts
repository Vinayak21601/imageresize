import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cropmyimages.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/profile',
    '/what-is-my-ip',
    '/qr-generator', // Note: In Progress - Limited Functionality
    '/url-shortener', // Note: In Progress - Limited Functionality
    '/pricing',
    '/privacy',
    '/terms',
    '/acceptable-use',
    '/refunds',
    '/cookies',
    '/report-abuse',
    '/contact',
    '/third-party-licenses',
    '/convert/heic-to-jpg',
    '/convert/webp-to-png',
    '/convert/webp-to-jpg',
    '/convert/png-to-jpg',
    '/convert/png-to-svg',
    '/convert/svg-to-png',
    '/convert/jpg-to-png',
    '/blog',
    '/blog/how-to-resize-image-without-losing-quality',
    '/blog/how-to-crop-festive-images-without-losing-quality',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
