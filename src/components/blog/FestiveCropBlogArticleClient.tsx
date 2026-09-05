'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowRight,
  HelpCircle,
  List,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Crop
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

interface FAQItem {
  q: string;
  a: string;
}

interface FestiveCropBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'introduction', title: '1. Festive Greetings & Image Quality' },
  { id: 'why-images-lose-quality', title: '2. Why Images Lose Quality When Cropped' },
  { id: 'step-by-step-guide', title: '3. Step-by-Step: Crop Without Losing Sharpness' },
  { id: 'festive-cropping-guide', title: '4. Quick Guide: Janmashtami & Teachers’ Day' },
  { id: 'faqs-section', title: '5. Frequently Asked Questions (FAQs)' },
  { id: 'conclusion-cta', title: '6. Conclusion & Summary' },
];

const inlineLinkCls =
  'text-[#1E50F2] dark:text-sky-400 font-semibold underline decoration-[#1E50F2]/40 dark:decoration-sky-400/40 hover:decoration-[#1E50F2] dark:hover:decoration-sky-400 transition-colors';

export function FestiveCropBlogArticleClient({ faqItems }: FestiveCropBlogArticleClientProps) {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const sectionElements = TOC_SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`relative w-full min-h-screen font-sans flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#05070B] text-slate-100 selection:bg-blue-600 selection:text-white'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white'
      }`}
    >
      {/* READING PROGRESS BAR (FIXED TOP) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-50">
        <div
          className="h-full bg-[#1E50F2] dark:bg-sky-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article itemScope itemType="https://schema.org/BlogPosting" className="w-full flex-1">
        {/* HERO ARTICLE HEADER WITH INTEGRATED NAVBAR */}
        <header
          className={`bg-sky-cloud-hero border-b pb-12 sm:pb-16 pt-4 transition-colors duration-300 ${
            isDark ? 'border-white/10' : 'border-zinc-200/60'
          }`}
        >
          <Navbar />
          <div className="max-w-4xl mx-auto space-y-6 text-center pt-8 px-4 sm:px-6 lg:px-8">
            
            {/* BREADCRUMB NAVIGATION */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold">
              <Link
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400 shrink-0" />
              <Link
                href="/blog"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400 shrink-0" />
              <span className="text-[#1E50F2] dark:text-sky-400 truncate max-w-[200px] sm:max-w-none">
                Crop Festive Images
              </span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              How to Crop Festive Images Without Losing Quality{' '}
              <span
                className={`font-serif italic font-normal text-2xl sm:text-3xl block mt-2 ${
                  isDark ? 'text-sky-300' : 'text-slate-800'
                }`}
              >
                (Janmashtami &amp; Teachers&apos; Day Special)
              </span>
            </h1>

            {/* AUTHOR & DATE METADATA ROW */}
            <div
              className={`flex flex-wrap items-center justify-center gap-6 text-xs font-medium pt-2 border-t max-w-md mx-auto transition-colors duration-300 ${
                isDark ? 'border-white/10 text-slate-400' : 'border-slate-200/80 text-slate-600'
              }`}
            >
              <div
                className="flex items-center gap-1.5"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <User className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                <span itemProp="name" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  CropMyImages Team
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                <time itemProp="datePublished" dateTime="2026-09-04" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  September 4, 2026
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>5 min read</span>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN BODY CONTAINER (2 COLUMNS: STICKY TOC + ARTICLE CONTENT) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block space-y-6">
              <div
                className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/90 border-white/10 shadow-2xl'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-bold text-sm border-b pb-3 font-sans transition-colors duration-300 ${
                    isDark ? 'text-white border-white/10' : 'text-slate-900 border-slate-100'
                  }`}
                >
                  <List className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                  <span>Table of Contents</span>
                </div>

                <nav className="space-y-1 text-xs font-medium">
                  {TOC_SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`block py-2 px-3 rounded-xl transition-all ${
                        activeSection === sec.id
                          ? 'bg-[#1E50F2] text-white font-bold shadow-xs'
                          : isDark
                          ? 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* QUICK LAUNCH CTA CARD */}
              <div
                className={`text-white rounded-3xl p-6 space-y-4 shadow-md transition-colors duration-300 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10'
                    : 'bg-gradient-to-br from-slate-900 to-black'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <Crop className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-extrabold tracking-tight font-sans">
                  Crop Festival Photos Online Free
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Set exact aspect ratios (1:1, 9:16, 4:5), circular shapes, and high-res WebP/PNG downloads.
                </p>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer font-sans"
                >
                  <span>Launch Crop Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>

            {/* RIGHT COLUMN: ARTICLE BODY CONTENT */}
            <div
              className={`lg:col-span-8 border rounded-3xl p-6 sm:p-10 shadow-sm space-y-10 font-sans text-base leading-relaxed transition-colors duration-300 ${
                isDark
                  ? 'bg-slate-900/90 border-white/10 text-slate-300'
                  : 'bg-white border-slate-200/80 text-slate-800'
              }`}
            >
              
              {/* SECTION 1: INTRODUCTION */}
              <section id="introduction" className="space-y-4 scroll-mt-28">
                <p
                  className={`text-lg font-medium leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  Festive seasons bring a rush of greetings, social media updates, and warm wishes. Whether you are preparing a status update for{' '}
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>Krishna Janmashtami</strong> or crafting a heartfelt thank-you post for{' '}
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>Teachers&apos; Day</strong>, high-quality visuals make all the difference.
                </p>

                <p>
                  However, taking a large, detailed{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image
                  </Link>{' '}
                  and{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    resizing
                  </Link>{' '}
                  or{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    cropping
                  </Link>{' '}
                  it often leaves you with blurry, pixelated results. You might wonder how to{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop a portrait
                  </Link>{' '}
                  of Nandlal, Kanha, or a group photo with your favorite teacher while keeping every detail sharp and vibrant.
                </p>

                <p>
                  This guide explains how{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image cropping
                  </Link>{' '}
                  works, how to maintain maximum image resolution, how to trace organic silhouettes with our{' '}
                  <Link href="/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    freehand custom shape crop guide
                  </Link>
                  , and how to use{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    CropMyImages
                  </Link>{' '}
                  to edit your festive photos effortlessly.
                </p>
              </section>

              {/* SECTION 2: WHY DO IMAGES LOSE QUALITY WHEN CROPPED */}
              <section
                id="why-images-lose-quality"
                className={`space-y-4 border-t pt-8 scroll-mt-28 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <BookOpen className="w-6 h-6 text-[#1E50F2] dark:text-sky-400 shrink-0" />
                  <span>Why Do Images Lose Quality When Cropped?</span>
                </h2>

                <p>
                  Cropping does not inherently degrade quality; it simply removes pixels outside your selected frame. Quality loss usually happens after cropping due to two main factors:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-800/60 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1E50F2] dark:text-sky-400 uppercase tracking-wider">Factor 1</div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Upscaling Small Selections
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Selecting a tiny section of a low-resolution image and stretching it to fill a phone screen or story format causes noticeable pixelation.
                    </p>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-800/60 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1E50F2] dark:text-sky-400 uppercase tracking-wider">Factor 2</div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Re-compression (JPEG Artifacts)
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Saving an image repeatedly as a compressed format (like{' '}
                      <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                        JPEG or JPG
                      </Link>
                      ) degrades clarity over time by introducing blocky artifacts around sharp edges.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: STEP-BY-STEP GUIDE */}
              <section
                id="step-by-step-guide"
                className={`space-y-6 border-t pt-8 scroll-mt-28 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span>Step-by-Step: Crop Festive Images Without Losing Sharpness</span>
                </h2>

                <div className="space-y-6">
                  
                  {/* Step 1 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-800/60 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#1E50F2] dark:bg-sky-500 text-white font-black text-xs flex items-center justify-center">1</span>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Start with a High-Quality Source
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed pl-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      To crop effectively, begin with the highest resolution available.
                    </p>
                    <ul className={`list-disc pl-14 text-xs sm:text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li>
                        <strong className={isDark ? 'text-white' : 'text-slate-900'}>For Janmashtami:</strong> When searching for divine images of Lord Krishna, Bal Gopal, or Radha Krishna, look for files labeled HD, 4K, or high-res vector graphics.
                      </li>
                      <li>
                        <strong className={isDark ? 'text-white' : 'text-slate-900'}>For Teachers&apos; Day:</strong> High-resolution photos taken in good lighting ensure faces stay clear after cropping.
                      </li>
                    </ul>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-800/60 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#1E50F2] dark:bg-sky-500 text-white font-black text-xs flex items-center justify-center">2</span>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Choose the Correct Aspect Ratio
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed pl-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Avoid arbitrary freehand cropping if you intend to post on specific social platforms:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-10 pt-1 text-xs font-semibold">
                      {[
                        { ratio: '1:1', desc: 'Instagram Post / DPs' },
                        { ratio: '4:5', desc: 'Portrait Feed' },
                        { ratio: '9:16', desc: 'Stories & Status' },
                        { ratio: '16:9', desc: 'YouTube / Banners' },
                      ].map((item) => (
                        <div
                          key={item.ratio}
                          className={`p-2.5 rounded-xl border text-center transition-colors duration-300 ${
                            isDark
                              ? 'bg-slate-700/60 border-white/10'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className={`font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.ratio}</div>
                          <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                    <p className={`text-xs pl-10 pt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Matching the crop frame to your target platform prevents automated stretching or additional compression by social media apps.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-800/60 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#1E50F2] dark:bg-sky-500 text-white font-black text-xs flex items-center justify-center">3</span>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Export in the Right File Format
                      </h3>
                    </div>
                    <ul className={`list-disc pl-14 text-xs sm:text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li>
                        Use{' '}
                        <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                          PNG
                        </Link>{' '}
                        for graphics with sharp details, festive typography, or small focal points (like the intricate details on a peacock feather or a flute).
                      </li>
                      <li>
                        Use{' '}
                        <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                          JPG
                        </Link>{' '}
                        (at 90–100% quality) or{' '}
                        <Link href="/convert/webp-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                          WebP
                        </Link>{' '}
                        for rich, real-life photography. You can also batch convert image formats with our{' '}
                        <Link href="/convert" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                          image converter
                        </Link>
                        .
                      </li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* SECTION 4: FESTIVE CROPPING GUIDE */}
              <section
                id="festive-cropping-guide"
                className={`space-y-6 border-t pt-8 scroll-mt-28 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
                  <span>Quick Guide: Preparing Images for Today&apos;s Festivals</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Krishna Card */}
                  <div
                    className={`p-6 rounded-3xl border space-y-3 transition-colors duration-300 ${
                      isDark
                        ? 'bg-amber-950/30 border-amber-500/20'
                        : 'bg-amber-50/60 border-amber-200/80'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 font-extrabold text-base ${
                        isDark ? 'text-amber-300' : 'text-amber-900'
                      }`}
                    >
                      <span>🪶</span>
                      <h3>Cropping Lord Krishna &amp; Kanha Images</h3>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-amber-200/80' : 'text-amber-900/80'
                      }`}
                    >
                      When editing images of Shree Krishna, Nandlal, or Makhan Chor for Janmashtami posts using our{' '}
                      <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                        online crop tool
                      </Link>
                      :
                    </p>
                    <ul
                      className={`list-disc pl-5 text-xs space-y-1.5 ${
                        isDark ? 'text-amber-200' : 'text-amber-900'
                      }`}
                    >
                      <li>
                        <strong className={isDark ? 'text-amber-100' : 'text-amber-950'}>Focus on the Subject:</strong> Frame closely around key details like the Mukut (crown), Mor Pankh (peacock feather), or Bansuri (flute).
                      </li>
                      <li>
                        <strong className={isDark ? 'text-amber-100' : 'text-amber-950'}>Keep Centered:</strong> Use a 1:1 ratio to center Little Kanha for WhatsApp profile pictures without cutting off essential elements.
                      </li>
                    </ul>
                  </div>

                  {/* Teachers Day Card */}
                  <div
                    className={`p-6 rounded-3xl border space-y-3 transition-colors duration-300 ${
                      isDark
                        ? 'bg-sky-950/30 border-sky-500/20'
                        : 'bg-sky-50/60 border-sky-200/80'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 font-extrabold text-base ${
                        isDark ? 'text-sky-300' : 'text-sky-900'
                      }`}
                    >
                      <span>🎓</span>
                      <h3>Editing Teachers&apos; Day Greetings</h3>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-sky-200/80' : 'text-sky-900/80'
                      }`}
                    >
                      When creating thank-you posts and tributes for your teachers and mentors:
                    </p>
                    <ul
                      className={`list-disc pl-5 text-xs space-y-1.5 ${
                        isDark ? 'text-sky-200' : 'text-sky-900'
                      }`}
                    >
                      <li>
                        <strong className={isDark ? 'text-sky-100' : 'text-sky-950'}>Highlight Key Expressions:</strong> Focus on the teacher and students while cropping out distracting background clutter.
                      </li>
                      <li>
                        <strong className={isDark ? 'text-sky-100' : 'text-sky-950'}>Leave Text Space:</strong> If adding a message like &quot;Happy Teachers&apos; Day,&quot; ensure your crop leaves clean, uncluttered space on one side for text overlays.
                      </li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* SECTION 5: FAQS */}
              <section
                id="faqs-section"
                className={`space-y-6 border-t pt-8 scroll-mt-28 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-6 h-6 text-[#1E50F2] dark:text-sky-400 shrink-0" />
                  <span>Frequently Asked Questions (FAQs)</span>
                </h2>

                <div className="space-y-4">
                  {faqItems.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border space-y-2 transition-colors duration-300 ${
                        isDark
                          ? 'bg-slate-800/60 border-white/10'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <h3
                        className={`text-base font-bold flex items-start gap-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        <span className="text-[#1E50F2] dark:text-sky-400 font-mono">Q.</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed pl-6 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6: CONCLUSION & CTA */}
              <section
                id="conclusion-cta"
                className={`p-8 rounded-3xl space-y-4 text-center scroll-mt-28 text-white transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-950/90 border border-white/10'
                    : 'bg-slate-900'
                }`}
              >
                <h2 className="text-2xl font-extrabold tracking-tight font-sans">
                  Crop Your Festive Visuals Instantly
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Keep your festival greetings sharp, clear, and professional. Whether framing Nandlal&apos;s smile for Janmashtami or honoring your mentors on Teachers&apos; Day, use CropMyImages to resize and crop your photos in seconds without sacrificing quality.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                  >
                    <Crop className="w-4 h-4 text-slate-900" />
                    <span>Launch CropMyImages Free</span>
                  </Link>
                </div>
              </section>

            </div>

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
