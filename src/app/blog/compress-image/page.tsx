import React from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/common/Footer';
import { CompressImageBlogArticleClient } from '@/components/blog/CompressImageBlogArticleClient';

export const metadata: Metadata = {
  title: 'Compress Image Online Without Losing Quality | CropMyImages',
  description:
    'Compress images online and reduce image file size without losing too much quality. Compress JPG and PNG images quickly with CropMyImages.',
  keywords: [
    'compress image online',
    'compress image',
    'compress JPG',
    'compress PNG',
    'reduce image size',
    'image file size reducer',
    'compress photo online',
    'lossless image compression'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/compress-image',
  },
  openGraph: {
    title: 'Compress Image Online Without Losing Quality | CropMyImages',
    description:
      'Compress images online and reduce image file size without losing too much quality. Compress JPG and PNG images quickly with CropMyImages.',
    url: 'https://cropmyimages.com/blog/compress-image',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-09-01T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/blogimages/Export-JPG-WebP-Format.webp',
        width: 1200,
        height: 630,
        alt: 'Compress Image Online Without Losing Quality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress Image Online Without Losing Quality | CropMyImages',
    description:
      'Compress images online and reduce image file size without losing too much quality.',
    images: ['https://cropmyimages.com/blogimages/Export-JPG-WebP-Format.webp'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How do I compress an image?',
    a: 'Upload your image to an online image compressor, choose the appropriate compression settings if available, and download the compressed version.',
  },
  {
    q: 'How can I compress an image without losing quality?',
    a: 'Use moderate compression and avoid making the image unnecessarily small. Resizing an oversized image before compression can also help maintain a good balance between quality and file size.',
  },
  {
    q: 'Can I compress JPG images online?',
    a: 'Yes. JPG files can be compressed using online image compression tools to reduce their file size.',
  },
  {
    q: 'Can PNG images be compressed?',
    a: 'Yes. PNG images can also be compressed. The amount of reduction depends on the image and the compression method used.',
  },
  {
    q: 'How do I compress an image to 50KB?',
    a: 'To get an image close to 50KB, you may need to combine resizing and compression. After processing the image, check its final file size and adjust the settings if necessary.',
  },
  {
    q: 'Does image compression change image dimensions?',
    a: 'Not necessarily. Compression and resizing are different processes. Compression primarily targets file size, while resizing changes the image’s pixel dimensions.',
  },
  {
    q: 'Is a smaller image file always better?',
    a: 'No. A very small file may have noticeable quality loss. The best image is one that is small enough for its purpose while still looking clear.',
  },
];

export default function CompressImageBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Compress Image Online Without Losing Quality',
    description:
      'Compress images online and reduce image file size without losing too much quality. Compress JPG and PNG images quickly with CropMyImages.',
    url: 'https://cropmyimages.com/blog/compress-image',
    datePublished: '2026-09-01T00:00:00.000Z',
    dateModified: '2026-09-01T00:00:00.000Z',
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
        url: 'https://cropmyimages.com/icon.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://cropmyimages.com/blog/compress-image',
    },
    image: 'https://cropmyimages.com/blogimages/Export-JPG-WebP-Format.webp',
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* JSON-LD Schemas */}
      <script
        id="blog-posting-schema-compress"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        id="faq-page-schema-compress"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <CompressImageBlogArticleClient faqItems={FAQ_ITEMS} />
      <Footer />
    </div>
  );
}
