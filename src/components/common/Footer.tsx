'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

export function Footer() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full border-t font-sans pt-12 pb-8 transition-colors duration-300 ${
        isDark
          ? 'bg-[#03060E] border-white/10 text-slate-400'
          : 'bg-white border-zinc-200/80 text-zinc-600'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP SECTION: 4-COLUMN STRUCTURED LINK GRID */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b transition-colors ${
            isDark ? 'border-white/10' : 'border-zinc-100'
          }`}
        >
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.webp"
                alt="CropMyImages Logo"
                className="h-8 w-8 object-contain rounded-full shadow-xs"
              />
              <span
                className={`font-serif italic font-normal text-2xl tracking-tight transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                CropMyImages
              </span>
            </Link>

            <p
              className={`text-xs sm:text-sm leading-relaxed max-w-sm font-normal transition-colors ${
                isDark ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              High-precision web image engine for precision cropping, format conversion, unit resizing (px, in, cm, mm), and target file size compression.
            </p>
          </div>

          {/* Col 2: Image Tools & Utilities */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black uppercase tracking-wider font-sans transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Image Tools
            </h4>
            <ul
              className={`space-y-2 text-xs font-medium transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <li>
                <Link
                  href="/"
                  className={`transition-colors flex items-center justify-between group ${
                    isDark ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}
                >
                  <span>Image Cropper</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                        : 'text-emerald-600 bg-emerald-50'
                    }`}
                  >
                    Popular
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/convert"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Image Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-my-ip"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  What Is My IP
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black uppercase tracking-wider font-sans transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Legal &amp; Trust
            </h4>
            <ul
              className={`space-y-2 text-xs font-medium transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <li>
                <Link
                  href="/privacy"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/acceptable-use"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Acceptable Use (AUP)
                </Link>
              </li>
              <li>
                <Link
                  href="/refunds"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* DEDICATED ROW: RECENT GUIDES & ARTICLES (HORIZONTAL CARDS GRID) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4
              className={`text-xs font-black uppercase tracking-wider font-sans flex items-center gap-2 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>Latest Guides &amp; Articles</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Blog Card 1 */}
            <Link
              id="footer-featured-blog-card-1"
              href="/blog/how-to-resize-image-without-losing-quality"
              className={`group flex items-center gap-3.5 border rounded-2xl p-3 transition-all ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 shadow-lg hover:border-white/20'
                  : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 shadow-2xs hover:shadow-md'
              }`}
              title="Read: How to Resize an Image Without Losing Quality"
            >
              {/* Thumbnail Image */}
              <div
                className={`w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl transition-colors ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
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

              {/* Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-sky-400' : 'text-[#1E50F2]'
                  }`}
                >
                  Image Quality Guide
                </div>
                <h5
                  className={`text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                    isDark
                      ? 'text-white group-hover:text-sky-300'
                      : 'text-slate-900 group-hover:text-[#1E50F2]'
                  }`}
                >
                  How to Resize an Image Without Losing Quality
                </h5>
                <p
                  className={`text-[11px] font-normal line-clamp-1 leading-relaxed transition-colors ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Master aspect ratios, pixel density, and WebP formats.
                </p>
                <div
                  className={`pt-0.5 flex items-center text-[11px] font-bold group-hover:translate-x-0.5 transition-transform ${
                    isDark ? 'text-sky-400 group-hover:text-sky-300' : 'text-[#1E50F2]'
                  }`}
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>

            {/* Blog Card 2 */}
            <Link
              id="footer-featured-blog-card-2"
              href="/blog/how-to-resize-image-to-50kb"
              className={`group flex items-center gap-3.5 border rounded-2xl p-3 transition-all ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 shadow-lg hover:border-white/20'
                  : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 shadow-2xs hover:shadow-md'
              }`}
              title="Read: How to Resize an Image to 50KB Without Losing Quality"
            >
              {/* Thumbnail Image */}
              <div
                className={`w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl transition-colors ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
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

              {/* Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-sky-400' : 'text-[#1E50F2]'
                  }`}
                >
                  50KB Compression Guide
                </div>
                <h5
                  className={`text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                    isDark
                      ? 'text-white group-hover:text-sky-300'
                      : 'text-slate-900 group-hover:text-[#1E50F2]'
                  }`}
                >
                  How to Resize an Image to 50KB Without Losing Quality
                </h5>
                <p
                  className={`text-[11px] font-normal line-clamp-1 leading-relaxed transition-colors ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Reduce JPG &amp; PNG files for applications and forms.
                </p>
                <div
                  className={`pt-0.5 flex items-center text-[11px] font-bold group-hover:translate-x-0.5 transition-transform ${
                    isDark ? 'text-sky-400 group-hover:text-sky-300' : 'text-[#1E50F2]'
                  }`}
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>

            {/* Blog Card 3 */}
            <Link
              id="footer-featured-blog-card-3"
              href="/blog/compress-image"
              className={`group flex items-center gap-3.5 border rounded-2xl p-3 transition-all ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 shadow-lg hover:border-white/20'
                  : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 shadow-2xs hover:shadow-md'
              }`}
              title="Read: Compress Image Online Without Losing Too Much Quality"
            >
              {/* Thumbnail Image */}
              <div
                className={`w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded-xl transition-colors ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
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

              {/* Text Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-sky-400' : 'text-[#1E50F2]'
                  }`}
                >
                  Image Compression Guide
                </div>
                <h5
                  className={`text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                    isDark
                      ? 'text-white group-hover:text-sky-300'
                      : 'text-slate-900 group-hover:text-[#1E50F2]'
                  }`}
                >
                  Compress Image Online Without Losing Quality
                </h5>
                <p
                  className={`text-[11px] font-normal line-clamp-1 leading-relaxed transition-colors ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Reduce JPG and PNG files for websites &amp; forms.
                </p>
                <div
                  className={`pt-0.5 flex items-center text-[11px] font-bold group-hover:translate-x-0.5 transition-transform ${
                    isDark ? 'text-sky-400 group-hover:text-sky-300' : 'text-[#1E50F2]'
                  }`}
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: CENTERED COPYRIGHT & MADE WITH LOVE */}
        <div
          className={`pt-6 border-t flex flex-col items-center justify-center text-center space-y-3 text-xs font-normal transition-colors ${
            isDark
              ? 'border-white/10 text-slate-400'
              : 'border-zinc-100 text-zinc-500'
          }`}
        >
          {/* Copyright & Made with Heart */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-xs transition-colors ${
              isDark ? 'text-slate-400' : 'text-zinc-500'
            }`}
          >
            <span>&copy; {new Date().getFullYear()} CropMyImages. All rights reserved.</span>
            <span className={`hidden sm:inline ${isDark ? 'text-slate-600' : 'text-zinc-300'}`}>
              &bull;
            </span>
            <div
              className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
              <span>by</span>
              <img
                src="/favicon.ico"
                alt="CropMyImages Favicon"
                className="w-4 h-4 object-contain inline-block ml-0.5 rounded-sm"
              />
              <span
                className={`font-serif italic font-normal transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                CropMyImages
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
