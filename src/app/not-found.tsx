import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Home, ArrowRight, Crop, QrCode, Link2, Globe, FileQuestion, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | CropMyImages',
  description: 'The requested page could not be found. Return to CropMyImages homepage or explore our image tools.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      
      {/* HERO BACKDROP WITH NAVBAR */}
      <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden pb-16 pt-2">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-10 pb-6 space-y-6">
          
          {/* BRAND BADGE */}
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

            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              <span>404 Error</span>
            </div>
          </div>

          {/* MAIN GLASSMORPHISM CARD */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 sm:p-12 max-w-xl mx-auto space-y-6 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
              <FileQuestion className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100/80 text-indigo-900 font-bold text-[11px] uppercase tracking-wider border border-indigo-200/80">
                Page Not Found
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
                Looking for something?
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                The URL or resource you requested doesn&apos;t exist or may have moved. Check our popular suite tools below!
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-white" />
                <span>Return to Homepage</span>
              </Link>

              <Link
                href="/qr-generator"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Explore QR Studio</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </Link>
            </div>

            {/* SUITE NAVIGATION CARDS */}
            <div className="pt-6 border-t border-slate-100/80 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Popular Destination Tools
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
                    <span className="text-[10px] text-slate-500 block">Crop &amp; resize</span>
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
                    <span className="text-[10px] text-slate-500 block">Branded QRs</span>
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
                    <span className="text-[10px] text-slate-500 block">Track links</span>
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
