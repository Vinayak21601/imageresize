'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crop, Cpu, HardDrive } from 'lucide-react';
import { PremiumCta } from './PremiumCta';

export function Footer() {
  const pathname = usePathname();
  const showCta = pathname !== '/profile';

  return (
    <div className="w-full">
      {/* END OF PAGE PREMIUM PRO CTA BANNER (Hidden on /profile page) */}
      {showCta && <PremiumCta />}

      {/* FOOTER NAVIGATION & COPYRIGHT */}
      <footer className="w-full border-t border-zinc-200/80 bg-white text-zinc-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-100">
            
            {/* Brand Col */}
            <div className="space-y-3 md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <img
                  src="/logo.webp"
                  alt="ImageStudio Logo"
                  className="h-8 w-8 object-contain rounded-full shadow-xs"
                />
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  ImageStudio <span className="text-zinc-500 font-medium text-xs">PRO</span>
                </span>
              </Link>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-light">
                High-precision web image engine for cropping, unit resizing (px, in, cm, mm), social media presets, and target file size compression.
              </p>
            </div>

            {/* Nav links */}
            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Tools &amp; Features</div>
              <ul className="space-y-2 font-medium text-zinc-500">
                <li>
                  <Link href="/" className="hover:text-black transition-colors">Image Cropper</Link>
                </li>
                <li>
                  <Link href="/what-is-my-ip" className="hover:text-black transition-colors font-bold text-sky-600">What Is My IP</Link>
                </li>
                <li>
                  <Link href="/qr-generator" className="hover:text-black transition-colors">QR Generator</Link>
                </li>
                <li>
                  <Link href="/url-shortener" className="hover:text-black transition-colors">URL Shortener</Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-black transition-colors font-bold text-slate-900">User Profile</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-black transition-colors">Pricing Plans</Link>
                </li>
              </ul>
            </div>

            {/* Integration Note */}
            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">AdSense &amp; Performance</div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">
                Built for high-performance responsive image processing with zero cumulative layout shift.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
            <p className="text-zinc-400">
              ImageStudio PRO &copy; {new Date().getFullYear()} &mdash; All Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] text-zinc-700 font-medium">
                <Cpu className="w-3.5 h-3.5 text-slate-900" />
                High-Speed Processing Engine
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] text-zinc-700 font-medium">
                <HardDrive className="w-3.5 h-3.5 text-slate-900" />
                Client-Side Privacy Engine
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
