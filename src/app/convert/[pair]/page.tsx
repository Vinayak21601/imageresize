'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ImageConverterStudio, OutputFormat } from '@/components/converter/ImageConverterStudio';
import { AdBanner } from '@/components/common/AdBanner';
import { CONVERSION_PAIRS } from '@/lib/conversions';

interface ConvertPageProps {
  params: Promise<{
    pair: string;
  }>;
}

export default function ConvertPairPage({ params }: ConvertPageProps) {
  const resolvedParams = use(params);
  const pairKey = resolvedParams.pair.toLowerCase();
  const pairInfo = CONVERSION_PAIRS[pairKey] || CONVERSION_PAIRS['heic-to-jpg'];

  const targetFormat = (pairInfo.outputFormat || 'jpeg') as OutputFormat;

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
                defaultTargetFormat={targetFormat}
                title={pairInfo.h1}
                subtitle={pairInfo.description}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
