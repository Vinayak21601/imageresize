'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Heart, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white text-zinc-600 font-sans pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP SECTION: 5-COLUMN STRUCTURED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-zinc-100">
          
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.webp"
                alt="CropMyImages Logo"
                className="h-8 w-8 object-contain rounded-full shadow-xs"
              />
              <span className="font-serif italic font-normal text-2xl tracking-tight text-slate-900">
                CropMyImages
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm font-normal">
              High-precision web image engine for precision cropping, format conversion, unit resizing (px, in, cm, mm), and target file size compression.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-700">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% In-Browser Privacy</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 shadow-xs">
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>DPDP Act 2023 Compliant</span>
              </div>
            </div>
          </div>

          {/* Col 2: Image Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors flex items-center justify-between group">
                  <span>Image Cropper</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Popular</span>
                </Link>
              </li>
              <li>
                <Link href="/convert" className="hover:text-slate-900 transition-colors">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/convert/heic-to-jpg" className="hover:text-slate-900 transition-colors">
                  HEIC to JPG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-pdf" className="hover:text-slate-900 transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-jpg" className="hover:text-slate-900 transition-colors">
                  PNG to JPG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-webp" className="hover:text-slate-900 transition-colors">
                  JPG to WebP
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Network & Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans">
              Network &amp; Utilities
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/what-is-my-ip" className="hover:text-slate-900 transition-colors">
                  What Is My IP
                </Link>
              </li>
              <li>
                <Link href="/qr-generator" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <span>QR Generator</span>
                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] rounded font-bold font-mono">Coming Soon</span>
                </Link>
              </li>
              <li>
                <Link href="/url-shortener" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <span>URL Shortener</span>
                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] rounded font-bold font-mono">Coming Soon</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                  Contact &amp; Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans">
              Legal &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/acceptable-use" className="hover:text-slate-900 transition-colors">
                  Acceptable Use (AUP)
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-slate-900 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-slate-900 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/report-abuse" className="hover:text-slate-900 transition-colors">
                  Report Abuse
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: CENTERED COPYRIGHT & MADE WITH LOVE */}
        <div className="pt-6 border-t border-zinc-100 flex flex-col items-center justify-center text-center space-y-3 text-xs text-zinc-500 font-normal">
          
      

          {/* Copyright & Made with Heart */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-xs text-zinc-500">
            <span>&copy; {new Date().getFullYear()} CropMyImages. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-300">&bull;</span>
            <div className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
              <span>by</span><img
                src="/favicon.ico"
                alt="CropMyImages Favicon"
                className="w-4 h-4 object-contain inline-block ml-0.5 rounded-sm"
              />
              <span className="font-serif italic font-normal text-slate-900">CropMyImages</span>
              
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
