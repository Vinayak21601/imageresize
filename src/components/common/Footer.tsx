'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white text-zinc-600 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-100">
          
          {/* Brand Col */}
          <div className="space-y-2 max-w-md">
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
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              High-precision web image engine for cropping, format conversion, unit resizing (px, in, cm, mm), and target file size compression.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-700">
            <Link href="/" className="hover:text-black transition-colors">
              Image Cropper
            </Link>
            <Link href="/convert/heic-to-jpg" className="hover:text-black transition-colors">
              Image Converter
            </Link>
            <Link href="/what-is-my-ip" className="hover:text-black transition-colors">
              What Is My IP
            </Link>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-400">
          <p>
            CropMyImages &copy; {new Date().getFullYear()} &mdash; All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
