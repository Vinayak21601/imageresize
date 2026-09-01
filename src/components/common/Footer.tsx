'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Heart, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white text-zinc-600 font-sans pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP SECTION: 4-COLUMN STRUCTURED LINK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-zinc-100">
          
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
          </div>

          {/* Col 2: Image Tools & Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors flex items-center justify-between group">
                  <span>Image Cropper</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">Popular</span>
                </Link>
              </li>
              <li>
                <Link href="/convert" className="hover:text-slate-900 transition-colors">
                  Image Converter
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
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
                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* DEDICATED NEW ROW: RECENT GUIDES & ARTICLES (HORIZONTAL CARDS GRID) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans flex items-center gap-2">
              <span>Latest Guides &amp; Articles</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Blog Card 1 (Horizontal Layout) */}
            <Link
              id="footer-featured-blog-card-1"
              href="/blog/how-to-resize-image-without-losing-quality"
              className="group flex items-center gap-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 rounded-2xl p-3 transition-all shadow-2xs hover:shadow-md"
              title="Read: How to Resize an Image Without Losing Quality"
            >
              {/* Horizontal Left Thumbnail Image */}
              <div className="w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                <img
                  src="/blogimages/proportionalscalling.webp"
                  alt="How to Resize an Image Without Losing Quality"
                  width={144}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-[10px] font-bold text-[#1E50F2] uppercase tracking-wider">
                  Image Quality Guide
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1E50F2] transition-colors line-clamp-2">
                  How to Resize an Image Without Losing Quality
                </h5>
                <p className="text-[11px] text-slate-500 font-normal line-clamp-1 leading-relaxed">
                  Master aspect ratios, pixel density, and WebP formats.
                </p>
                <div className="pt-0.5 flex items-center text-[11px] font-bold text-[#1E50F2] group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>

            {/* Blog Card 2 (Horizontal Layout) */}
            <Link
              id="footer-featured-blog-card-2"
              href="/blog/how-to-resize-image-to-50kb"
              className="group flex items-center gap-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 rounded-2xl p-3 transition-all shadow-2xs hover:shadow-md"
              title="Read: How to Resize an Image to 50KB Without Losing Quality"
            >
              {/* Horizontal Left Thumbnail Image */}
              <div className="w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                <img
                  src="/enter-target-size.webp"
                  alt="How to Resize an Image to 50KB Without Losing Quality"
                  width={144}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-[10px] font-bold text-[#1E50F2] uppercase tracking-wider">
                  50KB Compression Guide
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1E50F2] transition-colors line-clamp-2">
                  How to Resize an Image to 50KB Without Losing Quality
                </h5>
                <p className="text-[11px] text-slate-500 font-normal line-clamp-1 leading-relaxed">
                  Reduce JPG &amp; PNG files for applications and forms.
                </p>
                <div className="pt-0.5 flex items-center text-[11px] font-bold text-[#1E50F2] group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>

            {/* Blog Card 3 (Horizontal Layout) */}
            <Link
              id="footer-featured-blog-card-3"
              href="/blog/compress-image"
              className="group flex items-center gap-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 rounded-2xl p-3 transition-all shadow-2xs hover:shadow-md"
              title="Read: Compress Image Online Without Losing Too Much Quality"
            >
              {/* Horizontal Left Thumbnail Image */}
              <div className="w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                <img
                  src="/blogimages/Export-JPG-WebP-Format.webp"
                  alt="Compress Image Online Without Losing Too Much Quality"
                  width={144}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-[10px] font-bold text-[#1E50F2] uppercase tracking-wider">
                  Image Compression Guide
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1E50F2] transition-colors line-clamp-2">
                  Compress Image Online Without Losing Quality
                </h5>
                <p className="text-[11px] text-slate-500 font-normal line-clamp-1 leading-relaxed">
                  Reduce JPG and PNG files for websites &amp; forms.
                </p>
                <div className="pt-0.5 flex items-center text-[11px] font-bold text-[#1E50F2] group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>
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
