import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ImageConverterStudio } from '@/components/converter/ImageConverterStudio';
import { AdBanner } from '@/components/common/AdBanner';

export const metadata: Metadata = {
  title: 'Free Image Converter & Compressor Online — Convert & Compress PNG, JPG, WEBP, HEIC, AVIF',
  description:
    'Free, ultra-fast online image converter and compressor tool. Easily convert and compress PNG, JPG, JPEG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and PDF with custom KB/MB file size targets and 100% privacy.',
  keywords: [
    'image converter',
    'image compressor',
    'compress image online',
    'convert and compress image',
    'heic to jpg',
    'png to jpg',
    'jpg to png',
    'png to webp',
    'webp to png',
    'compress image in kb',
    'online image converter free',
  ],
};

export default function UniversalConverterPage() {
  return (
    <div className="converter-page-container min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white transition-colors duration-300">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 min-h-screen flex flex-col justify-between pb-16">
          <div>
            <Navbar />
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
              <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />
            </div>

            {/* MAIN CONVERTER STUDIO */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <ImageConverterStudio
                defaultTargetFormat="jpeg"
                title="The best free website to convert &amp; compress images online."
                subtitle="CropMyImages is the best free online resource to convert and compress images to any format. Convert and compress PNG, JPG, HEIC, WEBP, AVIF, GIF, BMP, and PDF files with custom quality controls, target KB/MB file size compression, and zero quality loss."
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
