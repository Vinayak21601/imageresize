import React from 'react';
import { Metadata } from 'next';
import { FestiveCropBlogArticleClient } from '@/components/blog/FestiveCropBlogArticleClient';

export const metadata: Metadata = {
  title: 'How to Crop Festive Images Without Losing Quality | CropMyImages',
  description:
    'Learn how to crop festive photos without losing resolution. Perfect for Krishna Janmashtami & Teachers\' Day images. Easy, fast, high-quality tips!',
  keywords: [
    'how to crop festive images without losing quality',
    'crop Krishna photos Janmashtami',
    'crop Teachers Day photos online',
    'crop image without quality loss',
    'crop Kanha image WhatsApp status',
    'CropMyImages festival cropper',
    'crop Krishna status 9:16',
    'aspect ratio cropper'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/how-to-crop-festive-images-without-losing-quality',
  },
  openGraph: {
    title: 'How to Crop Festive Images Without Losing Quality | CropMyImages',
    description:
      'Learn how to crop festive photos without losing resolution. Perfect for Krishna Janmashtami & Teachers\' Day images. Easy, fast, high-quality tips!',
    url: 'https://cropmyimages.com/blog/how-to-crop-festive-images-without-losing-quality',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-09-04T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/logo.webp',
        width: 1200,
        height: 630,
        alt: 'How to Crop Festive Images Without Losing Quality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Crop Festive Images Without Losing Quality | CropMyImages',
    description:
      'Learn how to crop festive photos without losing resolution. Perfect for Krishna Janmashtami & Teachers\' Day images.',
    images: ['https://cropmyimages.com/logo.webp'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How can I download high-quality images of Krishna, Kanha, and Nandlal?',
    a: 'To get crisp, non-blurry images, use royalty-free image platforms or search engines filtered by Large/HD size. Avoid saving thumbnails — always click through to open and download the full-resolution image file. Look for search terms like "Shree Krishna HD wallpaper", "Bal Gopal 4K image", or "Kanha high resolution".',
  },
  {
    q: 'How do I crop a Krishna image for my WhatsApp status without blurring?',
    a: 'Download a high-resolution source image, open it in CropMyImages, select the 9:16 aspect ratio preset, position Lord Krishna in the center, and export as a high-quality PNG or WebP file.',
  },
  {
    q: 'Does cropping an image reduce its file size?',
    a: 'Yes. Removing outer unneeded areas reduces the total pixel count, which naturally lowers file size while maintaining pixel density and clarity in the selected focal region.',
  },
  {
    q: 'What is the best free tool to crop images without quality loss?',
    a: 'CropMyImages allows you to upload, set precise dimensions or preset aspect ratios, and download your cropped image instantly without forcing heavy file compression.',
  },
];

export default function FestiveCropBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Crop Festive Images Without Losing Quality (Janmashtami & Teachers\' Day Special)',
    description:
      'Learn how to crop festive photos without losing resolution. Perfect for Krishna Janmashtami & Teachers\' Day images. Easy, fast, high-quality tips!',
    url: 'https://cropmyimages.com/blog/how-to-crop-festive-images-without-losing-quality',
    datePublished: '2026-09-04T00:00:00.000Z',
    dateModified: '2026-09-04T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'CropMyImages Editorial Team',
      url: 'https://cropmyimages.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CropMyImages',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cropmyimages.com/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://cropmyimages.com/blog/how-to-crop-festive-images-without-losing-quality',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        id="blog-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <FestiveCropBlogArticleClient faqItems={FAQ_ITEMS} />
    </>
  );
}
