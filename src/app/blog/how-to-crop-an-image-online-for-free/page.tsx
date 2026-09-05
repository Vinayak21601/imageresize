import React from 'react';
import { Metadata } from 'next';
import { FreeOnlineCropBlogArticleClient, FAQItem } from '@/components/blog/FreeOnlineCropBlogArticleClient';

export const metadata: Metadata = {
  title: 'How Do I Crop an Image Online for Free? Easy Guide | CropMyImages',
  description:
    'Learn how to crop an image online for free. Easily crop JPG, PNG and photos without Photoshop using an online image cropper.',
  keywords: [
    'how to crop an image online for free',
    'crop image online',
    'free online image cropper',
    'online image cropper',
    'crop photo online',
    'crop picture online',
    'free image cropper',
    'crop image without Photoshop',
    'crop photo without Photoshop',
    'crop JPG online',
    'crop JPEG online',
    'crop PNG online',
    'crop image on phone',
    'crop photo on mobile',
    'crop image to specific size',
    'crop image to square',
    'crop image into circle',
    'crop image into custom shape',
    'crop image into irregular shape',
    'freehand image crop',
    'freeform image cropping',
    'custom shape crop',
    'irregular image crop',
    'online photo cropper',
    'image crop tool',
    'crop image without losing quality',
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog/how-to-crop-an-image-online-for-free',
  },
  openGraph: {
    title: 'How Do I Crop an Image Online for Free? Easy Guide | CropMyImages',
    description:
      'Learn how to crop an image online for free. Easily crop JPG, PNG and photos without Photoshop using an online image cropper.',
    url: 'https://cropmyimages.com/blog/how-to-crop-an-image-online-for-free',
    siteName: 'CropMyImages',
    type: 'article',
    publishedTime: '2026-09-05T00:00:00.000Z',
    images: [
      {
        url: 'https://cropmyimages.com/blogimages/cropfirstrule.webp',
        width: 1200,
        height: 630,
        alt: 'How Do I Crop an Image Online for Free? Easy Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Do I Crop an Image Online for Free? Easy Guide | CropMyImages',
    description:
      'Learn how to crop an image online for free. Easily crop JPG, PNG and photos without Photoshop using an online image cropper.',
    images: ['https://cropmyimages.com/blogimages/cropfirstrule.webp'],
  },
};

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'How do I crop an image online for free?',
    a: 'Upload your image to a free online image cropper, select the area you want to keep, adjust the crop boundaries, apply the crop, and download the result.',
  },
  {
    q: 'What is the best free online image cropper?',
    a: 'The best tool depends on your requirements. For basic cropping, look for an online cropper that is easy to use, supports your image format, provides the required crop options, and produces good-quality output.',
  },
  {
    q: 'Can I crop a photo online without downloading software?',
    a: 'Yes. Browser-based image cropping tools allow you to upload, crop, and download photos without installing desktop editing software.',
  },
  {
    q: 'Can I crop JPG images online for free?',
    a: 'Yes. JPG is a commonly supported image format, and many online image croppers allow you to crop JPG files directly in your browser.',
  },
  {
    q: 'Can I crop PNG images online?',
    a: 'Yes. PNG images can be cropped using compatible online image editing tools. If the PNG contains transparency, make sure your chosen tool preserves it when exporting.',
  },
  {
    q: 'How do I crop an image without Photoshop?',
    a: 'Use an online image cropper instead of professional desktop software. Upload your image, select the required area, crop it, and download the result.',
  },
  {
    q: 'Can I crop an image on my phone?',
    a: 'Yes. Many online image cropping tools work through mobile browsers, allowing you to crop photos directly from your smartphone.',
  },
  {
    q: 'How do I crop an image to a specific size?',
    a: 'Choose a crop tool that supports custom dimensions or aspect ratios. Enter the required dimensions or select the appropriate aspect ratio and adjust your image accordingly.',
  },
  {
    q: 'How do I crop an image to 1:1?',
    a: 'Select a 1:1 aspect ratio or square crop option. Position the image within the square selection and apply the crop.',
  },
  {
    q: 'Does cropping reduce image quality?',
    a: 'Cropping removes pixels from an image, so the resulting image may have fewer pixels. Quality also depends on the original resolution and how much of the image is cropped.',
  },
  {
    q: 'Can I crop an image into a circle?',
    a: 'Yes, but you need a tool that supports circular cropping or masking rather than a standard rectangular crop.',
  },
  {
    q: 'Can I crop an image into a custom shape?',
    a: 'Yes, if your image editor supports freehand or custom shape selection. You can manually define the area you want to keep.',
  },
  {
    q: 'Is cropping the same as resizing?',
    a: 'No. Cropping removes part of an image, while resizing changes the dimensions of the image.',
  },
  {
    q: 'Can I crop an image for Instagram or social media?',
    a: 'Yes. You can crop an image to the dimensions or aspect ratio required for your chosen social media platform.',
  },
];

export default function FreeOnlineCropBlogPage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Do I Crop an Image Online for Free? Easy Guide',
    description:
      'Learn how to crop an image online for free. Easily crop JPG, PNG and photos without Photoshop using an online image cropper.',
    image: 'https://cropmyimages.com/blogimages/cropfirstrule.webp',
    datePublished: '2026-09-05T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'CropMyImages Team',
      url: 'https://cropmyimages.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CropMyImages',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cropmyimages.com/logo.png',
      },
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
        id="free-online-crop-blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        id="free-online-crop-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <FreeOnlineCropBlogArticleClient faqItems={FAQ_ITEMS} />
    </>
  );
}
