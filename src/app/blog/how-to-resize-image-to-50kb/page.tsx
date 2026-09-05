import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Resize50kbBlogArticleClient } from '@/components/blog/Resize50kbBlogArticleClient';

export const metadata: Metadata = {
  title: 'How to Resize an Image to 50KB Without Losing Quality | CropMyImages',
  description:
    'Learn how to resize an image to 50KB without making it blurry. Easily reduce JPG, PNG and other image files for forms, applications and online uploads.',
  keywords: [
    'how to resize image to 50kb',
    'resize image to 50kb without losing quality',
    'compress image to 50kb',
    'reduce image size to 50kb',
    'resize jpg to 50kb',
    'compress png to 50kb',
    '50kb photo converter',
    'image size reducer 50kb'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/how-to-resize-image-to-50kb',
  },
  openGraph: {
    title: 'How to Resize an Image to 50KB Without Losing Quality | CropMyImages',
    description:
      'Learn how to resize an image to 50KB without making it blurry. Easily reduce JPG, PNG and other image files for forms, applications and online uploads.',
    url: 'https://cropmyimages.com/blog/how-to-resize-image-to-50kb',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-08-31T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/enter-target-size.webp',
        width: 1200,
        height: 630,
        alt: 'How to Resize an Image to 50KB Without Losing Quality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Resize an Image to 50KB Without Losing Quality | CropMyImages',
    description:
      'Learn how to resize an image to 50KB without making it blurry. Easily reduce JPG, PNG and other image files for forms and online uploads.',
    images: ['https://cropmyimages.com/enter-target-size.webp'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How do I resize an image to 50KB?',
    a: 'Upload your image to an online image resizer or compressor, select a 50KB target and download the resulting file. If the website also specifies dimensions, make sure those requirements are followed.',
  },
  {
    q: 'How do I compress an image to under 50KB?',
    a: 'Reduce the image dimensions if necessary and then compress the file until its size is below 50KB. For photographs, JPG is generally a practical format for achieving a small file size.',
  },
  {
    q: 'Can I resize a photo to exactly 50KB?',
    a: 'Yes, a target-size image compressor can help you get very close to 50KB. If the website says "maximum 50KB," however, there is usually no need to hit exactly 50KB.',
  },
  {
    q: 'Can I compress a JPG to 50KB?',
    a: 'Yes. JPG images can be compressed and resized to reach a 50KB limit while retaining reasonable quality.',
  },
  {
    q: 'Can I compress a PNG to 50KB?',
    a: 'Yes, although PNG may not be as efficient as JPG for photographs. If the website accepts JPG, converting a photograph to JPG may make it easier to reach 50KB.',
  },
  {
    q: 'Why is my image still bigger than 50KB after resizing?',
    a: 'Image dimensions are only one factor that affects file size. The image format, compression level and amount of visual detail also affect the final size. Try resizing the image and then compressing it.',
  },
  {
    q: 'Why does my image look blurry after making it 50KB?',
    a: 'The image may have been compressed too aggressively. Try reducing the dimensions first and then using a moderate level of compression instead of lowering the quality dramatically.',
  },
  {
    q: 'Can I resize an image to 50KB on my phone?',
    a: 'Yes. An online image resizing tool can be used directly from your phone browser. Select your photo, choose the required file size and download the resized version.',
  },
  {
    q: 'Is JPG or PNG better for a 50KB photo?',
    a: 'For most photographs, JPG is generally more suitable because it can achieve smaller file sizes with reasonable visual quality. PNG is more useful for graphics, transparency and certain types of images.',
  },
  {
    q: 'Is a 50KB image good quality?',
    a: 'It depends on the image dimensions and what you are using it for. A properly resized small photo can still look clear at 50KB, but a large detailed photograph may show noticeable quality loss at the same file size.',
  },
];

export default function Resize50kbBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Resize an Image to 50KB Without Losing Quality',
    description:
      'Learn how to resize an image to 50KB without making it blurry. Easily reduce JPG, PNG and other image files for forms, applications and online uploads.',
    url: 'https://cropmyimages.com/blog/how-to-resize-image-to-50kb',
    datePublished: '2026-08-31T00:00:00.000Z',
    dateModified: '2026-08-31T00:00:00.000Z',
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
      '@id': 'https://cropmyimages.com/blog/how-to-resize-image-to-50kb',
    },
    image: 'https://cropmyimages.com/enter-target-size.webp',
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
        id="blog-posting-schema-50kb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        id="faq-page-schema-50kb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <Resize50kbBlogArticleClient faqItems={FAQ_ITEMS} />
      <Footer />
    </div>
  );
}
