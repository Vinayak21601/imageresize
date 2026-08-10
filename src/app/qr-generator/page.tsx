'use client';

import React from 'react';
import Link from 'next/link';
import {
  QrCode,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Palette,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { QrStudio } from '@/components/qr/QrStudio';
import { AdBanner } from '@/components/common/AdBanner';

export default function QrGeneratorPage() {
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
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Custom Business QR Generator &bull; Free &amp; Unlimited
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Custom QR codes with <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">brand-level precision.</em>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Generate custom QR codes for Website URLs, WiFi networks, vCard business contacts, and WhatsApp messages with custom gradients, shapes, and brand logo overlays.
              </p>
            </div>
          </section>

          {/* QR STUDIO CONTAINER */}
          <div id="studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-6">
            {/* TOP AD BANNER */}
            <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />

            {/* CORE INTERACTIVE STUDIO */}
            <div className="py-6">
              <QrStudio />
            </div>
          </div>
        </div>

        {/* FEATURE BREAKDOWN SECTION */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Built for business, print &amp; marketing.
            </h2>
            <p className="text-sm text-slate-700 max-w-lg mx-auto font-normal">
              Everything you need to create scan-ready QR codes for packaging, flyers, digital business cards, and storefronts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Custom Dot &amp; Eye Matrix</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Choose from 6 dot pattern shapes (rounded, classy, smooth, dots) and custom corner eye frame designs.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">2-Color Gradients</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Apply vibrant linear color gradients to match your corporate brand guidelines and social media aesthetics.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Brand Logo Overlay</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Upload your PNG or SVG brand logo to center inside the QR matrix with automatic background dot clipping.
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
