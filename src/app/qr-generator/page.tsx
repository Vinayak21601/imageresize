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

import { QrTrustBanner } from '@/components/qr/landing/QrTrustBanner';
import { QrTypesCarousel } from '@/components/qr/landing/QrTypesCarousel';
import { QrFeatureGrid } from '@/components/qr/landing/QrFeatureGrid';
import { QrUseCasesGallery } from '@/components/qr/landing/QrUseCasesGallery';
import { QrTemplatesGrid } from '@/components/qr/landing/QrTemplatesGrid';
import { QrStepGuide } from '@/components/qr/landing/QrStepGuide';
import { QrDashboardTeaser } from '@/components/qr/landing/QrDashboardTeaser';
import { QrFaqSection } from '@/components/qr/landing/QrFaqSection';
import { QrBottomCta } from '@/components/qr/landing/QrBottomCta';

export default function QrGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Free Custom QR Code Generator &bull; Vector SVG &amp; PNG Export
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Custom QR codes with <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">brand-level precision.</em>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Generate custom QR codes for Website URLs, WiFi networks, PDF menus, vCard business contacts, and WhatsApp messages with custom gradients, dot shapes, and brand logo overlays.
              </p>

              {/* Early Access Coming Soon Banner */}
              <div className="max-w-xl mx-auto p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200/90 rounded-2xl text-xs text-slate-800 space-y-1.5 shadow-2xs">
                <div className="font-bold flex items-center justify-center gap-1.5 text-[#1E50F2]">
                  <Sparkles className="w-4 h-4 text-[#1E50F2]" />
                  QR Generator 2.0 Coming Soon
                </div>
                <p className="text-slate-600 font-normal">
                  Want dynamic scan analytics, logo embeddings, and lower pricing? Sign up for early access!
                </p>
                <div className="pt-1">
                  <Link
                    id="qr-early-access-link-btn"
                    href="/qr-generator/coming-soon"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E50F2] hover:underline"
                  >
                    <span>Sign Up for Early Access &amp; Discount</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
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

        {/* TRUST & METRICS BANNER */}
        <QrTrustBanner />

        {/* INTERACTIVE QR CONTENT TYPES CAROUSEL & PREVIEW */}
        <QrTypesCarousel />

        {/* ENTERPRISE FEATURE GRID */}
        <QrFeatureGrid />

        {/* INDUSTRY PRINT USE CASES & PACKAGING */}
        <QrUseCasesGallery />

        {/* CALL-TO-ACTION FRAMES & TEMPLATES */}
        <QrTemplatesGrid />

        {/* 3-STEP PROCESS WALKTHROUGH */}
        <QrStepGuide />

        {/* DARK-MODE DASHBOARD TELEMETRY TEASER */}
        <QrDashboardTeaser />

        {/* IN-ARTICLE AD BANNER */}
        <div className="max-w-5xl mx-auto px-4 my-8">
          <AdBanner slot="in-article-display" format="auto" label="Sponsored Content" />
        </div>

        {/* ACCORDION FAQ SECTION */}
        <QrFaqSection />

        {/* FINAL CONVERSION CTA BANNER */}
        <QrBottomCta />
      </main>

      <Footer />
    </div>
  );
}
