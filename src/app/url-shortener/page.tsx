'use client';

import React from 'react';
import Link from 'next/link';
import {
  Link2,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
  QrCode
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { UrlStudio } from '@/components/url/UrlStudio';
import { AdBanner } from '@/components/common/AdBanner';

export default function UrlShortenerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Instant Short Link Generator &bull; Fast &amp; Secure
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Shorten long links with <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">one click simplicity.</em>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Transform long website URLs into clean, memorable short links with custom aliases, click analytics, and instant QR Code generation.
              </p>
            </div>
          </section>

          {/* URL STUDIO CONTAINER */}
          <div id="studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-6">
            {/* TOP AD BANNER */}
            <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />

            {/* CORE INTERACTIVE STUDIO */}
            <div className="py-6">
              <UrlStudio />
            </div>
          </div>
        </div>

        {/* FEATURE BREAKDOWN SECTION */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Why use CropMyImages URL Shortener?
            </h2>
            <p className="text-sm text-slate-700 max-w-lg mx-auto font-normal">
              Designed for digital marketers, social media creators, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Custom Link Aliases</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Create custom brand aliases (e.g. <code>/s/sale2026</code>) that stand out on social media posts and bio links.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Instant QR Integration</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Convert any short link into a matching QR code in 1 click for print campaigns, business cards, and flyers.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Link History &amp; Privacy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                All shortened links remain stored safely in your browser local storage with zero third-party tracking.
              </p>
            </div>
          </div>

        </div>

        {/* IN-ARTICLE BANNER */}
        <div className="max-w-5xl mx-auto px-4 my-4">
          <AdBanner slot="in-article-display" format="auto" label="Sponsored Content" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
