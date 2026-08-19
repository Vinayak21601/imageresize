'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2 } from 'lucide-react';

export function PremiumCta() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/80 shadow-2xl bg-slate-900/5 p-4 sm:p-6">
        
        {/* CLEAR BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
          style={{ backgroundImage: `url('/resize-my-image-logo.webp')` }}
        />

        {/* LIQUID AMBIENT GLOW ORBS */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-400/30 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-400/30 blur-3xl pointer-events-none" />

        {/* LIQUID GLASS PANEL (Liquid Glass Effect) */}
        <div className="relative z-10 p-6 sm:p-10 text-slate-900 flex flex-col items-center justify-center text-center space-y-5 max-w-3xl mx-auto bg-white/45 backdrop-blur-md backdrop-saturate-150 rounded-3xl border border-white/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden">
          
          {/* LIQUID SPECULAR LIGHT REFLECTION */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent opacity-90 pointer-events-none" />

          {/* LIQUID GLASS BADGE */}
          <div className="relative z-10 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/60 text-sky-900 border border-white/90 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>CropMyImages &bull; Unlock Unlimited Power</span>
          </div>

          {/* HEADLINE WITH SELECTED TEXT STYLE FOR CROPMYIMAGES */}
          <h3 className="relative z-10 text-xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading leading-snug">
            Supercharge your workflow with{' '}
            <span className="inline-block bg-slate-950 text-white px-2.5 py-0.5 rounded-xs border border-slate-800 underline underline-offset-4 decoration-white decoration-2 font-black shadow-sm">
              CropMyImages.
            </span>
          </h3>

          {/* SUBTITLE */}
          <p className="relative z-10 text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold max-w-xl mx-auto">
            Get 10x faster batch processing, multi-unit resizing (px, in, cm, mm), unlimited QR codes, custom domain branding, and a 100% ad-free experience.
          </p>

          {/* LIQUID GLASS BENEFIT PILLS */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold text-slate-900 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/60 border border-white/90 backdrop-blur-md shadow-xs">
              <Zap className="w-3.5 h-3.5 text-sky-600" />
              10x Speed
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/60 border border-white/90 backdrop-blur-md shadow-xs">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Batch Converter
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/60 border border-white/90 backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client Privacy
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/60 border border-white/90 backdrop-blur-md shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              100% Ad-Free
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 hover:from-black hover:to-indigo-900 text-white font-bold text-xs transition-all shadow-xl shadow-slate-900/20 active:scale-95 cursor-pointer"
            >
              <span>Upgrade to PRO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-2xl bg-white/70 hover:bg-white text-slate-900 font-bold text-xs border border-white/90 backdrop-blur-md transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>View Plans</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
