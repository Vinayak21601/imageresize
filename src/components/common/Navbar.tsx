'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group pl-1">
          <img
            src="/logo.webp"
            alt="CropMyImages Logo"
            className="h-8 w-8 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform"
          />
          <span className="font-serif italic font-normal text-xl tracking-tight text-slate-900">
            CropMyImages
          </span>
        </Link>

        {/* Floating Pill Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Image Cropper
          </Link>

          <Link
            href="/convert/heic-to-jpg"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname.startsWith('/convert')
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Image Converter
          </Link>

          {/* <Link
            href="/qr-generator"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/qr-generator'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            QR Generator
          </Link> */}

          {/* <Link
            href="/url-shortener"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/url-shortener'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            URL Shortener
          </Link> */}

          <Link
            href="/what-is-my-ip"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/what-is-my-ip'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            What is My IP
          </Link>

          {/* <Link
            href="/profile"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/profile'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            My Profile
          </Link> */}

          {/* <Link
            href="/pricing"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
              pathname === '/pricing'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Pricing
          </Link> */}
        </nav>

        {/* Action Buttons & Mobile Trigger */}
        <div className="flex items-center gap-2 pr-1">
          {/* <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 transition-all cursor-pointer"
            title="User Profile Dashboard"
          >
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
              AJ
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-slate-800">Profile</span>
          </Link> */}

          {/* <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Launch Studio
          </Link> */}

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-5xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 z-50 text-slate-900">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Cropper
            </Link>

            <Link
              href="/convert/heic-to-jpg"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname.startsWith('/convert') ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Converter
            </Link>

            {/* <Link
              href="/qr-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/qr-generator' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              QR Generator
            </Link> */}

            {/* <Link
              href="/url-shortener"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/url-shortener' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              URL Shortener
            </Link> */}

            <Link
              href="/what-is-my-ip"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/what-is-my-ip' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              What is My IP
            </Link>

            {/* <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/pricing' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Pricing
            </Link> */}
          </div>

          {/* <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-slate-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Sign in
            </Link>
          </div> */}
        </div>
      )}
    </header>
  );
}
