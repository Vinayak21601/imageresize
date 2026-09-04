
"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  ArrowRight,
  Crop,
  Layers,
  FileText
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { logoutUser } from '@/lib/redux/slices/authSlice';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

const BLOG_NAV_FEATURED = {
  slug: 'how-to-crop-festive-images-without-losing-quality',
  title: 'How to Crop Festive Images Without Quality Loss',
  excerpt: 'Janmashtami & Teachers\' Day special: crop photos with zero blur for status & social posts.',
  category: 'Festive Guide',
  readTime: '5 min read',
  image: '/Select-Image.webp',
};

const BLOG_NAV_ARTICLES = [
  {
    slug: 'how-to-resize-image-without-losing-quality',
    title: 'Resize Without Losing Quality',
    desc: 'Aspect ratios, dimensions, DPI resolution & pixel-perfect sharpness.',
    category: 'Image Editing',
    readTime: '7 min',
    icon: Crop,
  },
  {
    slug: 'compress-image',
    title: 'Compress Image Online',
    desc: 'Reduce JPG, PNG & WebP file size without losing clarity.',
    category: 'Optimization',
    readTime: '6 min',
    icon: Layers,
  },
  {
    slug: 'how-to-resize-image-to-50kb',
    title: 'Resize Image to 50KB or 100KB',
    desc: 'Fit strict KB limits for passport & official exam forms.',
    category: 'Compression',
    readTime: '5 min',
    icon: FileText,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlogMegaOpen, setIsBlogMegaOpen] = useState(false);
  const [isMobileBlogOpen, setIsMobileBlogOpen] = useState(false);
  const blogTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme } = useHeroTheme();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBlogMouseEnter = () => {
    if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
    setIsBlogMegaOpen(true);
  };

  const handleBlogMouseLeave = () => {
    blogTimeoutRef.current = setTimeout(() => {
      setIsBlogMegaOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsBlogMegaOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-2.5 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex h-13 sm:h-14 max-w-7xl items-center justify-between px-2.5 sm:px-6 rounded-full backdrop-blur-xl transition-all duration-300 ease-out ${
          isDark
            ? 'bg-slate-950/85 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/90 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
        }`}
      >

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0 pl-0.5">
          <img
            src="/logo.webp"
            alt="CropMyImages Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform shrink-0"
          />
          <span
            className={`font-serif italic font-normal text-base sm:text-xl tracking-tight transition-colors whitespace-nowrap shrink-0 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            CropMyImages
          </span>
        </Link>

        {/* Floating Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname === '/'
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            Image Cropper
          </Link>

          <Link
            href="/convert"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname.startsWith('/convert')
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            Image Converter
          </Link>

          <Link
            href="/what-is-my-ip"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname === '/what-is-my-ip'
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            What is My IP
          </Link>

          {/* Blog Nav with Floating Mega Menu */}
          <div
            className="relative"
            onMouseEnter={handleBlogMouseEnter}
            onMouseLeave={handleBlogMouseLeave}
          >
            <div className="flex items-center">
              <Link
                href="/blog"
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                  pathname.startsWith('/blog') || isBlogMegaOpen
                    ? isDark
                      ? 'bg-white text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-white font-bold shadow-sm'
                    : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Blog</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isBlogMegaOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Floating Mega Menu Dropdown */}
            {isBlogMegaOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[640px] animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={handleBlogMouseEnter}
                onMouseLeave={handleBlogMouseLeave}
              >
                <div
                  className={`rounded-2xl p-5 border transition-all ${
                    isDark
                      ? 'bg-[#0B0F19] border-slate-800 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]'
                      : 'bg-white border-slate-200 text-slate-900 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)]'
                  }`}
                >
                  {/* 2-Column Content Layout */}
                  <div className="grid grid-cols-12 gap-5 items-stretch">
                    {/* Left: How-To Guides List (7 cols) */}
                    <div className="col-span-7 flex flex-col">
                      <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-2 px-2.5">
                        How-To Guides
                      </div>

                      <div className="space-y-1">
                        {BLOG_NAV_ARTICLES.map((article) => {
                          const IconComponent = article.icon;
                          return (
                            <Link
                              key={article.slug}
                              href={`/blog/${article.slug}`}
                              onClick={() => setIsBlogMegaOpen(false)}
                              className={`group flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                                isDark
                                  ? 'hover:bg-slate-800/60'
                                  : 'hover:bg-slate-50'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isDark
                                    ? 'bg-slate-800 text-slate-300 group-hover:text-sky-400 group-hover:bg-slate-700/80'
                                    : 'bg-slate-100 text-slate-600 group-hover:text-blue-600 group-hover:bg-blue-50'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span
                                    className={`text-xs font-semibold truncate transition-colors ${
                                      isDark
                                        ? 'text-slate-200 group-hover:text-sky-400'
                                        : 'text-slate-800 group-hover:text-blue-600'
                                    }`}
                                  >
                                    {article.title}
                                  </span>
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                                      isDark ? 'text-sky-400' : 'text-blue-600'
                                    }`}
                                  />
                                </div>
                                <p
                                  className={`text-[11px] truncate leading-normal mt-0.5 ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}
                                >
                                  {article.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Featured Spotlight (5 cols) */}
                    <div className="col-span-5 flex flex-col">
                      <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-2 px-1">
                        Featured Article
                      </div>

                      <Link
                        href={`/blog/${BLOG_NAV_FEATURED.slug}`}
                        onClick={() => setIsBlogMegaOpen(false)}
                        className={`group flex-1 flex flex-col p-3 rounded-xl border transition-all ${
                          isDark
                            ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                            : 'bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-2.5 bg-slate-800">
                          <img
                            src={BLOG_NAV_FEATURED.image}
                            alt={BLOG_NAV_FEATURED.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-[10px] mb-1">
                          <span
                            className={`font-semibold ${
                              isDark ? 'text-sky-400' : 'text-blue-600'
                            }`}
                          >
                            {BLOG_NAV_FEATURED.category}
                          </span>
                          <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>&bull;</span>
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            {BLOG_NAV_FEATURED.readTime}
                          </span>
                        </div>

                        <h4
                          className={`text-xs font-semibold leading-snug line-clamp-2 transition-colors ${
                            isDark
                              ? 'text-slate-200 group-hover:text-sky-400'
                              : 'text-slate-900 group-hover:text-blue-600'
                          }`}
                        >
                          {BLOG_NAV_FEATURED.title}
                        </h4>

                        <p
                          className={`text-[11px] line-clamp-2 mt-1 leading-normal ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {BLOG_NAV_FEATURED.excerpt}
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Clean Bottom Footer Strip */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs px-1 ${
                      isDark
                        ? 'border-slate-800/80 text-slate-400'
                        : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <span>Free photo resizing, compression &amp; crop guides</span>
                    <Link
                      href="/blog"
                      onClick={() => setIsBlogMegaOpen(false)}
                      className={`font-medium inline-flex items-center gap-1 transition-colors ${
                        isDark
                          ? 'text-sky-400 hover:text-sky-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>View all articles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons & Auth User State (Desktop: visible, Mobile: moved inside Hamburger Drawer) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Hostinger-style Animated Theme Switch Toggle (Desktop only) */}
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            className={`hidden md:flex relative w-13 h-7 rounded-full p-0.5 transition-all duration-300 cursor-pointer items-center shadow-inner select-none shrink-0 ${
              isDark
                ? 'bg-slate-900 border border-indigo-500/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                : 'bg-sky-100 border border-sky-300/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]'
            }`}
            title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {/* Background Sky/Night Micro Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
              <span
                className={`text-[9px] transition-all duration-300 ${
                  isDark ? 'opacity-80 text-indigo-300 translate-x-0' : 'opacity-0 -translate-x-1'
                }`}
              >
                ✦
              </span>
              <span
                className={`text-[10px] transition-all duration-300 ${
                  !isDark ? 'opacity-70 text-sky-400 translate-x-0' : 'opacity-0 translate-x-1'
                }`}
              >
                ☁
              </span>
            </div>

            {/* Sliding Knob with Spring-like Transition */}
            <div
              className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-400 cubic-bezier(0.34,1.56,0.64,1) z-10 shrink-0 ${
                isDark
                  ? 'translate-x-[24px] bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.5)] rotate-0'
                  : 'translate-x-0 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-[0_2px_8px_rgba(245,158,11,0.45)] -rotate-180'
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-indigo-100 fill-indigo-100/30 transition-transform duration-300" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-950 fill-amber-950/20 transition-transform duration-300" />
              )}
            </div>
          </button>

          {/* Auth Loading Skeleton (Desktop only) */}
          {authLoading ? (
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <div className={`h-7 w-24 rounded-full animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
          ) : isAuthenticated && user ? (
            /* User Profile & Logout on Desktop */
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border border-slate-300 shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs font-bold max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer border border-rose-200 shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* Sign In Button on Desktop */
            <Link
              href="/login"
              className={`hidden md:inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'text-slate-950 bg-white hover:bg-slate-100'
                  : 'text-white bg-slate-900 hover:bg-black'
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Smooth Animated Hamburger to X Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 cursor-pointer shrink-0 ${
              isDark
                ? 'text-slate-200 hover:text-white hover:bg-white/10 active:bg-white/15'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50 pointer-events-none' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer Overlay & Left-Sliding Panel */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay (Clicking outside closes the drawer) */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDark ? 'bg-black/75 backdrop-blur-sm' : 'bg-slate-900/40 backdrop-blur-xs'
          }`}
          aria-hidden="true"
        />

        {/* Left-Side Sliding Drawer Container */}
        <aside
          className={`relative z-10 w-[82vw] max-w-[320px] h-full flex flex-col p-5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
            isDark
              ? 'bg-slate-950 border-r border-white/10 text-white shadow-[10px_0_40px_rgba(0,0,0,0.8)]'
              : 'bg-white border-r border-slate-200 text-slate-900 shadow-[10px_0_30px_rgba(0,0,0,0.08)]'
          } ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header Row */}
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 group"
            >
              <img
                src="/logo.webp"
                alt="CropMyImages Logo"
                className="h-7 w-7 object-contain rounded-full shadow-xs"
              />
              <span className={`font-serif italic font-normal text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CropMyImages
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 pt-4">
           

            {/* User Profile Card & Sign Out (or Sign In button if unauthenticated) */}
            <div>
              {isAuthenticated && user ? (
                <div
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 ${
                    isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border border-slate-300 object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {user.name}
                      </p>
                      {user.email && (
                        <p className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer border border-rose-200 shrink-0"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center w-full py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                    isDark
                      ? 'text-slate-950 bg-white hover:bg-slate-100'
                      : 'text-white bg-slate-900 hover:bg-black'
                  }`}
                >
                  Sign In to Account
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1 pt-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                  pathname === '/'
                    ? isDark
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : isDark
                      ? 'text-slate-200 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-zinc-100'
                }`}
              >
                Image Cropper
              </Link>

              <Link
                href="/convert"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                  pathname.startsWith('/convert')
                    ? isDark
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : isDark
                      ? 'text-slate-200 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-zinc-100'
                }`}
              >
                Image Converter
              </Link>

              <Link
                href="/what-is-my-ip"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                  pathname === '/what-is-my-ip'
                    ? isDark
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : isDark
                      ? 'text-slate-200 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-zinc-100'
                }`}
              >
                What is My IP
              </Link>

              {/* Blog & Guides Accordion Item */}
              <div className="pt-0.5">
                <div
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-all ${
                    pathname.startsWith('/blog')
                      ? isDark
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'bg-slate-900 text-white shadow-sm'
                      : isDark
                        ? 'text-slate-200 hover:bg-white/10'
                        : 'text-slate-700 hover:bg-zinc-100'
                  }`}
                  onClick={() => setIsMobileBlogOpen(!isMobileBlogOpen)}
                >
                  <Link
                    href="/blog"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 font-bold text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Blog &amp; Guides</span>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileBlogOpen(!isMobileBlogOpen);
                    }}
                    className="p-1 rounded-lg"
                    aria-label="Toggle Blog Articles list"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileBlogOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {isMobileBlogOpen && (
                  <div className="pl-3 pr-1 py-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href={`/blog/${BLOG_NAV_FEATURED.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="truncate font-semibold">{BLOG_NAV_FEATURED.title}</div>
                    </Link>

                    {BLOG_NAV_ARTICLES.map((art) => (
                      <Link
                        key={art.slug}
                        href={`/blog/${art.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                          isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-zinc-100'
                        }`}
                      >
                        <div className="truncate">{art.title}</div>
                      </Link>
                    ))}

                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-1.5 text-xs font-bold ${
                        isDark ? 'text-sky-400 hover:underline' : 'text-blue-600 hover:underline'
                      }`}
                    >
                      View All Articles &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </nav>

             {/* PROMINENT THEME MODE CARD (Immediately visible at top of menu) */}
            <div
              className={`p-3 rounded-2xl border flex items-center justify-between shadow-xs transition-all ${
                isDark
                  ? 'bg-slate-900/90 border-indigo-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                  : 'bg-slate-50 border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Appearance
                  </p>
                  <p className={`text-[11px] capitalize font-medium ${isDark ? 'text-indigo-300' : 'text-amber-600'}`}>
                    {theme} Mode
                  </p>
                </div>
              </div>

              {/* Animated Hostinger Sliding Theme Switch Toggle */}
              <button
                type="button"
                onClick={(e) => toggleTheme(e)}
                className={`relative w-13 h-7 rounded-full p-0.5 transition-all duration-300 cursor-pointer flex items-center shadow-inner select-none shrink-0 ${
                  isDark
                    ? 'bg-slate-900 border border-indigo-500/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                    : 'bg-sky-100 border border-sky-300/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]'
                }`}
                title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                  <span
                    className={`text-[9px] transition-all duration-300 ${
                      isDark ? 'opacity-80 text-indigo-300 translate-x-0' : 'opacity-0 -translate-x-1'
                    }`}
                  >
                    ✦
                  </span>
                  <span
                    className={`text-[10px] transition-all duration-300 ${
                      !isDark ? 'opacity-70 text-sky-400 translate-x-0' : 'opacity-0 translate-x-1'
                    }`}
                  >
                    ☁
                  </span>
                </div>

                <div
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-400 cubic-bezier(0.34,1.56,0.64,1) z-10 shrink-0 ${
                    isDark
                      ? 'translate-x-[24px] bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.5)] rotate-0'
                      : 'translate-x-0 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-[0_2px_8px_rgba(245,158,11,0.45)] -rotate-180'
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-indigo-100 fill-indigo-100/30 transition-transform duration-300" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-950 fill-amber-950/20 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>
  </header>
);
}
