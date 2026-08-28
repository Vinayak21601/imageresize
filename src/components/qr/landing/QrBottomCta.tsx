'use client';

import React from 'react';
import { QrCode, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function QrBottomCta() {
  const handleScrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-sky-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          100% Free Static Generator &bull; Instant Vector Export
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Ready to create your custom <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-white">
            scan-ready QR code?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-normal">
          Generate custom QR codes with brand gradients, dot matrix styling, center logo overlay, and high-DPI vector export in seconds.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScrollToStudio}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-2xl hover:shadow-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <QrCode className="w-4 h-4 text-indigo-600" />
            <span>Generate Custom QR Code Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> SVG, EPS &amp; PNG vector files
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Unlimited scans
          </span>
        </div>

      </div>
    </section>
  );
}
