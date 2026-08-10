'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crop, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileConvertAccordionOpen, setIsMobileConvertAccordionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'image' | 'svg' | 'png' | 'jpg' | 'gif'>('image');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsConvertOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { key: 'image', label: 'Image Converter', desc: 'Convert any raster or vector file' },
    { key: 'svg', label: 'SVG Converter', desc: 'Vector format transform' },
    { key: 'png', label: 'PNG Converter', desc: 'Lossless transparency format' },
    { key: 'jpg', label: 'JPG Converter', desc: 'Web & camera photo compression' },
    { key: 'gif', label: 'GIF Converter', desc: 'Animated graphic format' },
  ] as const;

  const subConversions: Record<string, { label: string; badge: string; href: string }[]> = {
    image: [
      { label: 'HEIC to JPG', badge: 'iOS Photo', href: '/convert/heic-to-jpg' },
      { label: 'WebP to PNG', badge: 'High Quality', href: '/convert/webp-to-png' },
      { label: 'WebP to JPG', badge: 'Universal', href: '/convert/webp-to-jpg' },
      { label: 'PNG to JPG', badge: 'Smaller File', href: '/convert/png-to-jpg' },
      { label: 'PNG to SVG', badge: 'Vector Trace', href: '/convert/png-to-svg' },
    ],
    svg: [
      { label: 'SVG to PNG', badge: 'Rasterize', href: '/convert/svg-to-png' },
      { label: 'SVG to JPG', badge: 'Web Photo', href: '/convert/svg-to-jpg' },
      { label: 'SVG to WEBP', badge: 'Modern Web', href: '/convert/svg-to-webp' },
      { label: 'PNG to SVG', badge: 'Vectorize', href: '/convert/png-to-svg' },
      { label: 'JPG to SVG', badge: 'Trace Line', href: '/convert/png-to-svg' },
    ],
    png: [
      { label: 'PNG to JPG', badge: 'Smaller Size', href: '/convert/png-to-jpg' },
      { label: 'PNG to WEBP', badge: 'Next-Gen', href: '/convert/png-to-webp' },
      { label: 'PNG to SVG', badge: 'Vector Trace', href: '/convert/png-to-svg' },
      { label: 'PNG to AVIF', badge: 'Ultra Compress', href: '/convert/png-to-avif' },
      { label: 'PNG Compressor', badge: 'Lossless', href: '/convert/png-to-webp' },
    ],
    jpg: [
      { label: 'JPG to PNG', badge: 'Transparent', href: '/convert/jpg-to-png' },
      { label: 'JPG to WEBP', badge: 'Fast Load', href: '/convert/jpg-to-webp' },
      { label: 'JPG to SVG', badge: 'Outline', href: '/convert/png-to-svg' },
      { label: 'HEIC to JPG', badge: 'iPhone Photo', href: '/convert/heic-to-jpg' },
      { label: 'JPG Compressor', badge: 'Max Speed', href: '/convert/jpg-to-webp' },
    ],
    gif: [
      { label: 'GIF to WEBP', badge: 'Animated WebP', href: '/convert/gif-to-webp' },
      { label: 'GIF to PNG', badge: 'Frame Extract', href: '/convert/gif-to-png' },
      { label: 'GIF to JPG', badge: 'First Frame', href: '/convert/gif-to-jpg' },
      { label: 'WebP to PNG', badge: 'High Quality', href: '/convert/webp-to-png' },
      { label: 'HEIC to JPG', badge: 'iOS Photo', href: '/convert/heic-to-jpg' },
    ],
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group pl-1">
          <img
            src="/logo.webp"
            alt="ImageStudio Logo"
            className="h-8 w-8 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-base tracking-tight text-slate-900 font-sans">
            ImageStudio
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

          {/* Convert Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsConvertOpen(!isConvertOpen)}
              onMouseEnter={() => setIsConvertOpen(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                isConvertOpen
                  ? 'bg-white text-slate-900 shadow-md font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>Convert</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isConvertOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
            </button>

            {/* Convert Mega Dropdown Menu */}
            {isConvertOpen && (
              <div 
                className="absolute top-10 left-1/2 -translate-x-1/2 w-[510px] bg-white border border-zinc-200/90 rounded-3xl shadow-2xl p-5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-slate-900"
                onMouseLeave={() => setIsConvertOpen(false)}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column: Interactive Categories */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-zinc-400 uppercase tracking-wider px-2.5 font-sans">
                      Format Converters
                    </div>
                    <div className="space-y-1">
                      {categories.map((cat) => {
                        const isActive = activeCategory === cat.key;
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onMouseEnter={() => setActiveCategory(cat.key)}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                              isActive
                                ? 'bg-slate-900 text-white shadow-md font-bold'
                                : 'hover:bg-zinc-100 text-slate-900'
                            }`}
                          >
                            <div>
                              <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{cat.label}</div>
                              <div className={`text-[10px] font-medium ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>{cat.desc}</div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-zinc-300 opacity-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Conversions for Active Category */}
                  <div className="space-y-2 border-l border-zinc-100 pl-4">
                    <div className="text-[11px] font-black text-[#0284C7] uppercase tracking-wider px-2 font-sans flex items-center justify-between">
                      <span>{categories.find(c => c.key === activeCategory)?.label}</span>
                    </div>
                    <div className="space-y-1">
                      {subConversions[activeCategory]?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsConvertOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 transition-colors group cursor-pointer"
                        >
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">{item.label}</span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 group-hover:bg-sky-50 group-hover:text-[#0284C7] text-zinc-500 transition-colors">
                            {item.badge}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/qr-generator"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/qr-generator'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            QR Generator
          </Link>

          <Link
            href="/url-shortener"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/url-shortener'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            URL Shortener
          </Link>

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

          <Link
            href="/profile"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/profile'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            My Profile
          </Link>

          <Link
            href="/pricing"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
              pathname === '/pricing'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Action Buttons & Mobile Trigger */}
        <div className="flex items-center gap-2 pr-1">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 transition-all cursor-pointer"
            title="User Profile Dashboard"
          >
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
              AJ
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-slate-800">Profile</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Launch Studio
          </Link>

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

            {/* Mobile Convert Accordion */}
            <div className="rounded-2xl border border-zinc-200/80 overflow-hidden bg-zinc-50/50">
              <button
                type="button"
                onClick={() => setIsMobileConvertAccordionOpen(!isMobileConvertAccordionOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-900 cursor-pointer"
              >
                <span>Convert Formats</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileConvertAccordionOpen ? 'rotate-180 text-slate-900' : 'text-zinc-400'}`} />
              </button>

              {isMobileConvertAccordionOpen && (
                <div className="p-3 border-t border-zinc-200/80 bg-white space-y-3">
                  {/* Category switcher tabs */}
                  <div className="flex overflow-x-auto gap-1.5 pb-2 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setActiveCategory(cat.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                          activeCategory === cat.key ? 'bg-slate-900 text-white shadow-sm' : 'bg-zinc-100 text-slate-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic sub-conversions */}
                  <div className="space-y-1">
                    {subConversions[activeCategory]?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setIsConvertOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-900">{item.label}</span>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                          {item.badge}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/qr-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/qr-generator' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              QR Generator
            </Link>

            <Link
              href="/url-shortener"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/url-shortener' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              URL Shortener
            </Link>

            <Link
              href="/what-is-my-ip"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/what-is-my-ip' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              What is My IP
            </Link>

            <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/pricing' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-slate-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-black transition-all cursor-pointer"
            >
              Launch Studio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
