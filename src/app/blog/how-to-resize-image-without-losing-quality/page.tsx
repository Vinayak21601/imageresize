import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ResizeBlogArticleClient } from '@/components/blog/ResizeBlogArticleClient';

export const metadata: Metadata = {
  title: 'How to Resize an Image Without Losing Quality | CropMyImages',
  description:
    'Learn how to resize an image without losing quality. Understand aspect ratio, image dimensions, file size and formats, with simple tips for clear, sharp images.',
  keywords: [
    'how to resize an image without losing quality',
    'resize image online',
    'resize photo without losing quality',
    'image resizer',
    'resize image to exact size',
    'resize image in pixels',
    'reduce image size without losing quality',
    'resize image for website'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/how-to-resize-image-without-losing-quality',
  },
  openGraph: {
    title: 'How to Resize an Image Without Losing Quality | CropMyImages',
    description:
      'Learn how to resize an image without losing quality. Understand aspect ratio, image dimensions, file size and formats with simple tips for clear, sharp images.',
    url: 'https://cropmyimages.com/blog/how-to-resize-image-without-losing-quality',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-08-30T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/blogimages/proportionalscalling.webp',
        width: 1200,
        height: 630,
        alt: 'How to Resize an Image Without Losing Quality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Resize an Image Without Losing Quality | CropMyImages',
    description:
      'Learn how to resize an image without losing quality. Understand aspect ratio, image dimensions, file size and formats.',
    images: ['https://cropmyimages.com/blogimages/proportionalscalling.webp'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How do I resize an image without losing quality?',
    a: 'Use the highest-quality original available, maintain the aspect ratio, avoid excessive enlargement, choose suitable dimensions, and use an appropriate file format and compression level.',
  },
  {
    q: 'How can I resize a photo without making it blurry?',
    a: 'If you’re reducing the image, maintain its proportions and avoid excessive compression. If you’re enlarging it, don’t increase the dimensions dramatically beyond the original resolution.',
  },
  {
    q: 'What is the difference between resizing and cropping?',
    a: 'Resizing changes the dimensions of the entire image. Cropping removes part of the image. If you need a different aspect ratio, cropping before resizing can prevent distortion.',
  },
  {
    q: 'How do I resize an image to exact dimensions?',
    a: 'Use an image resizer that allows you to enter the exact width and height you need. If the target dimensions have a different aspect ratio, crop the image first.',
  },
  {
    q: 'Can I resize an image in pixels, inches, cm or mm?',
    a: 'Yes. Depending on the tool you use, you can specify image dimensions in pixels or physical units such as inches, centimeters and millimeters.',
  },
  {
    q: 'What is the best image format for a website?',
    a: 'There isn’t one format that works best for every situation. JPG, PNG, WebP and AVIF can all be useful depending on the image and how it will be delivered.',
  },
  {
    q: 'How do I resize an image to 1920 × 1080?',
    a: 'If your image is already 16:9, resize it directly to 1920 × 1080 pixels. If it has a different aspect ratio, crop it to 16:9 first.',
  },
  {
    q: 'Does resizing an image reduce file size?',
    a: 'It often can, particularly when you reduce the image’s dimensions. However, the final file size also depends on the format, image content and compression settings.',
  },
];

export default function ResizeImageBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Resize an Image Without Losing Quality',
    description:
      'Learn how to resize an image without losing quality. Understand aspect ratio, image dimensions, file size and formats, with simple tips for clear, sharp images.',
    url: 'https://cropmyimages.com/blog/how-to-resize-image-without-losing-quality',
    datePublished: '2026-08-30T00:00:00.000Z',
    dateModified: '2026-08-30T00:00:00.000Z',
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
      '@id': 'https://cropmyimages.com/blog/how-to-resize-image-without-losing-quality',
    },
    image: 'https://cropmyimages.com/blogimages/proportionalscalling.webp',
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
    <div className="min-h-screen bg-white dark:bg-[#05070B] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 dark:selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* JSON-LD Schemas */}
      <script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <ResizeBlogArticleClient faqItems={FAQ_ITEMS} />
      <Footer />
    </div>
  );
}
