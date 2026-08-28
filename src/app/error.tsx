'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, HelpCircle, AlertCircle, ArrowRight, Crop, QrCode, Link2, Globe, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      
      {/* HERO BACKDROP WITH NAVBAR */}
      <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden pb-16 pt-2">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-10 pb-6 space-y-6">
          
          {/* BRAND BADGE & STATUS */}
          <div className="inline-flex items-center gap-3 p-2 pr-4 pl-2 rounded-full bg-white/90 border border-slate-200 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-2 pl-2">
              <img
                src="/logo.webp"
                alt="CropMyImages Logo"
                className="h-7 w-7 object-contain rounded-full shadow-xs"
              />
              <span className="font-serif italic font-normal text-lg tracking-tight text-slate-900">
                CropMyImages
              </span>
            </div>

            <span className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Systems Normal</span>
            </div>
          </div>

          {/* MAIN GLASSMORPHISM ERROR CARD */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 sm:p-12 max-w-xl mx-auto space-y-6 text-center">
            
            {/* ICON & BADGE */}
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shadow-xs">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 text-amber-900 font-bold text-[11px] uppercase tracking-wider border border-amber-200/80">
                Connection Notice
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
                This page couldn&apos;t load
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                We hit a brief network delay while fetching this page. Reloading usually fixes it immediately!
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-white" />
                <span>Reload Page</span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Back to Homepage</span>
              </Link>
            </div>

            {/* QUICK ACCESS SUITE CARDS */}
            <div className="pt-6 border-t border-slate-100/80 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Explore Popular Tools
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
                <Link
                  href="/"
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Crop className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">Cropper</span>
                    <span className="text-[10px] text-slate-500 block">Resize images</span>
                  </div>
                </Link>

                <Link
                  href="/qr-generator"
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 block">QR Studio</span>
                    <span className="text-[10px] text-slate-500 block">Custom QRs</span>
                  </div>
                </Link>

                <Link
                  href="/url-shortener"
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 block">Shortener</span>
                    <span className="text-[10px] text-slate-500 block">Short links</span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      <main className="flex-1" />

      <Footer />
    </div>
  );
}
