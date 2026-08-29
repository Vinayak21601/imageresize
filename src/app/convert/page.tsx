import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ImageConverterStudio } from '@/components/converter/ImageConverterStudio';
import { AdBanner } from '@/components/common/AdBanner';

export const metadata: Metadata = {
  title: 'Free Image Converter Online — Convert PNG, JPG, WEBP, HEIC, AVIF',
  description:
    'Free, ultra-fast online image converter. Easily convert PNG, JPG, JPEG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and PDF with automatic format detection and 100% privacy.',
  keywords: [
    'image converter',
    'convert image',
    'heic to jpg',
    'png to jpg',
    'jpg to png',
    'png to webp',
    'webp to png',
    'image format converter',
    'online image converter free',
  ],
};

export default function UniversalConverterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden min-h-screen flex flex-col justify-between pb-16">
          <div>
            <Navbar />
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
              <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />
            </div>

            {/* MAIN CONVERTER STUDIO */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <ImageConverterStudio
                defaultTargetFormat="jpeg"
                title="Convert Images to Any Format"
                subtitle="Drag & drop or select images from your computer or phone. Your format will be auto-detected, then choose your target format and download instantly."
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
