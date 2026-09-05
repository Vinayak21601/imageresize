import React from 'react';
import { Metadata } from 'next';
import { FreehandCropBlogArticleClient, FAQItem } from '@/components/blog/FreehandCropBlogArticleClient';

export const metadata: Metadata = {
  title: 'How to Draw a Custom Freehand Shape and Crop an Image | CropMyImages',
  description:
    'Learn how to crop an image into an irregular or custom freehand shape. Trace around people, objects, products, and signatures online without Photoshop. Free PNG export with transparency.',
  keywords: [
    'how to draw custom freehand shape crop image',
    'freehand crop image',
    'crop image into irregular shape',
    'lasso crop online',
    'crop image into custom shape',
    'freeform image cropper',
    'crop around person online',
    'crop around object',
    'custom shape image cropper',
    'transparent png crop',
    'CropMyImages freehand crop'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image',
  },
  openGraph: {
    title: 'How to Draw a Custom Freehand Shape and Crop an Image | CropMyImages',
    description:
      'Learn how to crop an image into an irregular or custom freehand shape. Trace around people, objects, products, and signatures online without Photoshop.',
    url: 'https://cropmyimages.com/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-09-05T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/blogimages/cropfirstrule.webp',
        width: 1200,
        height: 630,
        alt: 'How to Draw a Custom Freehand Shape and Crop an Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Draw a Custom Freehand Shape and Crop an Image | CropMyImages',
    description:
      'Learn how to crop an image into an irregular or custom freehand shape. Trace around people, objects, products, and signatures online without Photoshop.',
    images: ['https://cropmyimages.com/blogimages/cropfirstrule.webp'],
  },
};

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'How do I crop an image freehand?',
    a: 'Upload the image to an editor that supports freehand selection, choose the freehand or custom selection tool, draw around the area you want to keep, and apply the crop.',
  },
  {
    q: 'How do I crop a picture into a custom shape?',
    a: 'Use a custom shape or freehand selection tool. Draw the desired shape around the part of the picture you want to keep and crop the image based on that selection.',
  },
  {
    q: 'How do I crop an image into an irregular shape online?',
    a: 'Use an online image cropper that supports freeform or freehand selection. Upload your image, draw the irregular outline, apply the crop, and download the result.',
  },
  {
    q: 'Can I crop around an object without cropping the whole image?',
    a: 'Yes. A freehand selection lets you trace around an individual object rather than selecting the entire rectangular area surrounding it.',
  },
  {
    q: 'What is a freehand crop tool?',
    a: 'A freehand crop tool allows you to manually draw the boundary of your crop instead of restricting you to a rectangle, square, or preset aspect ratio.',
  },
  {
    q: 'What is the difference between freehand crop and lasso selection?',
    a: 'Both involve manually selecting an area of an image. "Freehand crop" usually refers to cropping based on a manually drawn boundary, while "lasso selection" commonly refers to the selection method used to outline an irregular area.',
  },
  {
    q: 'Can I crop an image into any shape?',
    a: 'With a freehand or custom selection tool, you can create a wide variety of shapes because you define the outline yourself.',
  },
  {
    q: 'How do I crop a photo around a person?',
    a: 'Use a freehand selection tool to carefully trace around the person. For complicated edges such as hair, zoom in and make smaller, more precise movements.',
  },
  {
    q: 'Can I create a transparent custom-shaped image?',
    a: 'Yes. Create your custom selection, remove the area outside it, and export the image in a transparency-supporting format such as PNG.',
  },
  {
    q: 'Is freehand cropping the same as background removal?',
    a: 'No. Freehand cropping selects a custom area, while background removal is specifically intended to separate the subject from its background. The two techniques can sometimes be used together.',
  },
];

export default function FreehandCropBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Draw a Custom Freehand Shape and Crop an Image',
    description:
      'Learn how to crop an image into an irregular or custom freehand shape. Trace around people, objects, products, and signatures online without Photoshop.',
    url: 'https://cropmyimages.com/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image',
    datePublished: '2026-09-05T00:00:00.000Z',
    dateModified: '2026-09-05T00:00:00.000Z',
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
      '@id': 'https://cropmyimages.com/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image',
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
      <FreehandCropBlogArticleClient faqItems={FAQ_ITEMS} />
    </>
  );
}
