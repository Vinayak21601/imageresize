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
  Sparkles,
  Crop,
  Scissors,
  PenTool,
  ZoomIn,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

export interface FAQItem {
  q: string;
  a: string;
}

interface FreehandCropBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'what-is-a-freehand-crop', title: '1. What Is a Freehand Crop?' },
  { id: 'how-to-crop-into-a-custom-shape', title: '2. How Do You Crop Into a Custom Shape?' },
  { id: 'drawing-freehand-shape-on-image', title: '3. How Do I Draw a Freehand Shape?' },
  { id: 'irregular-shape-cropping', title: '4. Cropping Into an Irregular Shape' },
  { id: 'cropping-without-a-rectangle', title: '5. Can I Crop Without Using a Rectangle?' },
  { id: 'normal-vs-freehand-crop', title: '6. Normal Crop vs. Freehand Crop' },
  { id: 'cropping-around-objects-people', title: '7. Crop Around an Object or Person' },
  { id: 'freeform-and-lasso-cropping', title: '8. What Is Freeform & Lasso Cropping?' },
  { id: 'jpeg-vs-png-transparency', title: '9. JPEG vs. PNG for Custom Shape Crops' },
  { id: 'cropping-online-without-photoshop', title: '10. How to Crop Online Without Photoshop' },
  { id: 'presets-vs-custom-shapes', title: '11. Geometric Presets vs. Custom Shapes' },
  { id: 'remove-outside-selection', title: '12. Removing Everything Outside Selection' },
  { id: 'tips-for-clean-crop', title: '13. Pro Tips for a Clean Freehand Crop' },
  { id: 'why-use-freehand-crop', title: '14. Why Use a Custom Freehand Crop?' },
  { id: 'faqs-section', title: '15. Frequently Asked Questions (FAQ)' },
  { id: 'try-cropmyimages-cta', title: '16. Try Custom Image Cropping' },
];

const inlineLinkCls =
  'text-[#1E50F2] dark:text-sky-400 font-semibold underline decoration-[#1E50F2]/40 dark:decoration-sky-400/40 hover:decoration-[#1E50F2] dark:hover:decoration-sky-400 transition-colors';

export function FreehandCropBlogArticleClient({ faqItems }: FreehandCropBlogArticleClientProps) {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('what-is-a-freehand-crop');

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
              <span className="text-[#1E50F2] dark:text-sky-400 truncate max-w-[220px] sm:max-w-none">
                Freehand &amp; Custom Shape Crop
              </span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              How to Draw a Custom Freehand Shape and Crop an Image
            </h1>

            {/* SUBTITLE */}
            <p
              className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Break free from rigid squares and rectangles. Learn how to outline products, people, signatures, and irregular graphics online with precision.
            </p>

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
                  CropMyImages Editorial
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                <time itemProp="datePublished" dateTime="2026-09-05" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  September 5, 2026
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>6 min read</span>
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
                className={`border rounded-3xl p-6 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin transition-colors duration-300 ${
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

                <nav className="space-y-1 text-xs font-medium pt-2">
                  {TOC_SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`block py-1.5 px-3 rounded-xl transition-all truncate ${
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
                    : 'bg-gradient-to-br from-slate-900 to-blue-950'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <Scissors className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-base font-extrabold tracking-tight font-sans">
                  Need to Crop an Image Now?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Crop into squares, circles, custom aspect ratios, or freehand boundaries with high-resolution export in your browser.
                </p>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#1E50F2] hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
                >
                  <span>Open Free Image Cropper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* RIGHT COLUMN: ARTICLE PROSE CANVAS */}
            <main
              className={`lg:col-span-8 space-y-10 text-base leading-relaxed font-normal transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}
            >
              
              {/* MOBILE TABLE OF CONTENTS QUICK JUMP */}
              <div
                className={`block lg:hidden border rounded-2xl p-4 space-y-3 transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/90 border-white/10'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b pb-2 transition-colors duration-300 ${
                    isDark ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
                  }`}
                >
                  <List className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                  <span>Quick Table of Contents</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {TOC_SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`py-1 px-2 rounded font-medium truncate transition-colors ${
                        isDark
                          ? 'text-slate-300 hover:text-sky-400 hover:bg-slate-800'
                          : 'text-slate-700 hover:text-[#1E50F2] hover:bg-slate-50'
                      }`}
                    >
                      {sec.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* ARTICLE INTRO */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Have you ever wanted to{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop an image
                  </Link>{' '}
                  into a unique shape that isn&rsquo;t a rectangle, square, oval, or circle?
                </p>
                <p>
                  A <strong>custom freehand crop</strong> lets you draw your own shape around the exact part of the{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image
                  </Link>{' '}
                  you&rsquo;d like to keep. Instead of using a basic rectangle or square to crop your picture, you can create a custom silhouette that follows the natural outlines of your subject, person, or product.
                </p>
                <div
                  className={`p-4 rounded-2xl border text-sm transition-colors duration-300 ${
                    isDark
                      ? 'bg-blue-950/30 border-blue-500/20 text-slate-300'
                      : 'bg-blue-50/60 border-blue-100 text-slate-700'
                  }`}
                >
                  <p
                    className={`font-semibold mb-1 flex items-center gap-1.5 ${
                      isDark ? 'text-sky-300' : 'text-blue-900'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                    In This Complete Guide:
                  </p>
                  <p>
                    We&rsquo;ll explain how to crop a picture into an irregular shape, the meaning of a freehand image crop, lasso selections, transparent{' '}
                    <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                      PNG
                    </Link>{' '}
                    exporting, and how to{' '}
                    <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                      crop images online
                    </Link>{' '}
                    without the need for advanced or expensive desktop software like Photoshop.
                  </p>
                </div>
              </div>

              {/* SECTION 1: WHAT IS A FREEHAND CROP */}
              <section
                id="what-is-a-freehand-crop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is a Freehand Crop?
                </h2>
                <p>
                  A <strong>freehand crop</strong> lets you{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop part of your image
                  </Link>{' '}
                  by drawing a custom shape or outline around the area you&rsquo;d like to keep.
                </p>
                <p>
                  Unlike a regular{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop tool
                  </Link>
                  , which is typically used to crop a fixed rectangle or square, a freehand crop lets you make an irregular shape, freeform shape or selection, polygon, shape with curves, or even a custom hand-drawn selection.
                </p>

                <div
                  className={`border rounded-2xl p-6 space-y-3 shadow-xs transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <h3
                    className={`font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-sky-400' : 'text-[#1E50F2]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    When Is Freehand Image Cropping Useful?
                  </h3>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Crop around a person or object</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Remove unwanted areas from an image</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Crop an image into an irregular shape</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Create a custom-shaped image</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Crop around a product</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Remove a background manually</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Isolate part of a photograph</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Create creative social media graphics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Prepare product images for websites</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#1E50F2] dark:text-sky-400 font-bold">•</span>
                      <span>Make stickers or custom graphics</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: HOW DO YOU CROP INTO A CUSTOM SHAPE */}
              <section
                id="how-to-crop-into-a-custom-shape"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do You Crop an Image Into a Custom Shape?
                </h2>
                <p>
                  To crop an image into a custom shape, you&rsquo;ll need to use an image editor or online{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image cropping tool
                  </Link>{' '}
                  that has a freehand selection tool.
                </p>
                <p>
                  The typical process is straightforward:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  {[
                    { num: '1', title: 'Upload Image', desc: 'Select file from device' },
                    { num: '2', title: 'Select Tool', desc: 'Pick freehand / lasso' },
                    { num: '3', title: 'Draw Shape', desc: 'Trace desired subject' },
                    { num: '4', title: 'Apply Crop', desc: 'Close loop & crop' },
                    { num: '5', title: 'Download', desc: 'Export as PNG or JPG' },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className={`border p-4 rounded-2xl text-center space-y-2 transition-colors duration-300 ${
                        isDark
                          ? 'bg-slate-900/80 border-white/10'
                          : 'bg-white border-slate-200/80'
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs ${
                          isDark
                            ? 'bg-blue-950/60 text-sky-400 border border-blue-500/30'
                            : 'bg-blue-50 text-[#1E50F2]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <h4
                        className={`font-bold text-xs transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-[11px] transition-colors duration-300 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {step.num === '5' ? (
                          <>
                            Export as{' '}
                            <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                              PNG
                            </Link>{' '}
                            or{' '}
                            <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                              JPG
                            </Link>
                          </>
                        ) : (
                          step.desc
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="pt-2">
                  Using a freehand crop tool gives you unmatched flexibility when cropping your image compared to a standard rectangular crop.
                </p>
              </section>

              {/* SECTION 3: DRAWING A FREEHAND SHAPE */}
              <section
                id="drawing-freehand-shape-on-image"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Draw a Freehand Shape on an Image?
                </h2>
                <p>
                  Drawing a freehand shape is simple if you&rsquo;re using an image editor that has a freeform or freehand selection tool.
                </p>
                <div
                  className={`p-5 rounded-2xl border space-y-3 transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 font-bold text-sm ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    <PenTool className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                    <span>The Freehand Tracing Workflow</span>
                  </div>
                  <p className="text-sm">
                    Open your image and choose the freehand crop tool, then trace around the image you want to keep using your mouse, trackpad, stylus, or touchscreen. Once you&rsquo;ve traced around your desired image or object, close your selection (connecting the end point back to the starting point) and apply the crop.
                  </p>
                  <p
                    className={`text-xs italic ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    This is particularly useful when performing an irregular image crop because a normal rectangular selection cannot cleanly isolate a curved or organic subject.
                  </p>
                </div>
              </section>

              {/* SECTION 4: IRREGULAR SHAPE CROPPING */}
              <section
                id="irregular-shape-cropping"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop a Picture Into an Irregular Shape?
                </h2>
                <p>
                  If you want to{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop a picture
                  </Link>{' '}
                  into an irregular shape, or prepare greeting cards (like in our{' '}
                  <Link href="/blog/how-to-crop-festive-images-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    festive image cropping guide
                  </Link>
                  ), all you need to do is find a tool that provides a custom or freehand cropping option.
                </p>
                <p>
                  With a rectangular crop, you remove sections of the image from the four straight sides. With a freehand crop, however, <strong>you define the exact boundary</strong> of your crop.
                </p>

                <div
                  className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/50 border-white/10'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <h3
                    className={`font-bold text-sm ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Examples of Irregular Shapes You Can Trace:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-medium">
                    {[
                      'A person or portrait',
                      'A leaf or plant',
                      'A retail product',
                      'A building or skyline',
                      'A handwritten signature',
                      'A brand logo',
                      'A cloud shape',
                      'An abstract curve',
                      'Any custom outline',
                    ].map((item, i) => (
                      <span
                        key={i}
                        className={`p-2 rounded-xl border shadow-2xs transition-colors duration-300 ${
                          isDark
                            ? 'bg-slate-800 border-white/10 text-slate-200'
                            : 'bg-white border-slate-200/60 text-slate-700'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Depending on the software or tutorial you read, this technique is variously known as <em>irregular shape cropping</em>, <em>freeform cropping</em>, <em>custom shape cropping</em>, or <em>freehand image cropping</em>.
                </p>
              </section>

              {/* SECTION 5: CROPPING WITHOUT A RECTANGLE */}
              <section
                id="cropping-without-a-rectangle"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop an Image Without Using a Rectangle?
                </h2>
                <p>
                  <strong>Yes!</strong> If the image editor supports freehand selection or a custom shape crop, you can crop an image without having to restrict the image selection to a rectangle or square. This is invaluable if your image has an organic or irregular outline that you want to preserve.
                </p>
                <p>
                  For example, instead of having to crop the entire rectangular background on which an e-commerce product rests, you can trace snugly around the product itself and cleanly discard the rest of the canvas.
                </p>
              </section>

              {/* SECTION 6: NORMAL CROP VS FREEHAND CROP TABLE */}
              <section
                id="normal-vs-freehand-crop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is the Difference Between Normal Cropping and Freehand Cropping?
                </h2>
                <p>
                  The fundamental difference between a normal crop and a freehand crop lies in how you define the area you want to keep. With a normal crop, you select a rectangular or square box. With a freehand crop, you define a completely custom outline.
                </p>

                {/* COMPARISON TABLE */}
                <div
                  className={`overflow-x-auto rounded-2xl border shadow-xs transition-colors duration-300 ${
                    isDark
                      ? 'border-white/10 bg-slate-900/90'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr
                        className={`border-b text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isDark
                            ? 'bg-slate-800/80 border-white/10 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <th className="p-4">Feature / Metric</th>
                        <th className={`p-4 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Normal Crop</th>
                        <th className="p-4 text-[#1E50F2] dark:text-sky-400">Freehand Crop</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y transition-colors duration-300 ${
                        isDark ? 'divide-white/5 text-slate-300' : 'divide-slate-100 text-slate-700'
                      }`}
                    >
                      <tr>
                        <td className={`p-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Shape Outline</td>
                        <td className="p-4">Usually rectangular or square</td>
                        <td className="p-4 font-medium text-[#1E50F2] dark:text-sky-400">Can be any custom shape or curve</td>
                      </tr>
                      <tr>
                        <td className={`p-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Speed &amp; Precision</td>
                        <td className="p-4">Fast and simple to adjust</td>
                        <td className="p-4">Requires careful tracing; more precise</td>
                      </tr>
                      <tr>
                        <td className={`p-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Best Suited For</td>
                        <td className="p-4">Standard photos, avatars, social posts</td>
                        <td className={`p-4 font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Objects, stickers, cutouts, creative designs
                        </td>
                      </tr>
                      <tr>
                        <td className={`p-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Edge Behavior</td>
                        <td className="p-4">Fixed, straight edges (4 borders)</td>
                        <td className="p-4">User-drawn outline following subject</td>
                      </tr>
                      <tr>
                        <td className={`p-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Area Removed</td>
                        <td className="p-4">Removes outer margins beyond rectangle</td>
                        <td className="p-4">Removes surrounding background contour</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p
                  className={`text-sm pt-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  If you just need to adjust an image&rsquo;s dimensions or aspect ratio for an Instagram story or display banner, read our guide on{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    how to resize an image without losing quality
                  </Link>
                  , where a normal crop is quick and sufficient. But if you need to crop around a complex subject or create an irregular graphic, a freehand crop is by far the better option.
                </p>
              </section>

              {/* SECTION 7: CROPPING AROUND OBJECTS & PEOPLE */}
              <section
                id="cropping-around-objects-people"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop Around an Object or Person in a Photo?
                </h2>
                
                <h3
                  className={`text-lg font-bold pt-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  1. Cropping Around an Object
                </h3>
                <p>
                  To crop around an object in a photo, choose your freehand selection tool and trace carefully around its perimeter. For the best results, it&rsquo;s a great idea to <strong>zoom into the image</strong> to make sure you&rsquo;re tracing directly along the true edges rather than including stray background pixels.
                </p>
                <p>
                  If you&rsquo;re trying to isolate a product, piece of jewelry, or furniture, making smaller, steady movements with your mouse or drawing stylus gives you cleaner lines.
                </p>

                <h3
                  className={`text-lg font-bold pt-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  2. Cropping Around a Person
                </h3>
                <p>
                  Cropping around a person in a picture is one of the most common reasons for using a freehand crop. You can trace around the person&rsquo;s head, hair, shoulders, clothing, and limbs using the freeform tool.
                </p>
                <div
                  className={`p-4 rounded-2xl border text-sm space-y-1 transition-colors duration-300 ${
                    isDark
                      ? 'bg-amber-950/30 border-amber-500/20 text-amber-200'
                      : 'bg-amber-50/70 border-amber-200 text-amber-900'
                  }`}
                >
                  <p
                    className={`font-bold flex items-center gap-1.5 ${
                      isDark ? 'text-amber-400' : 'text-amber-700'
                    }`}
                  >
                    <ZoomIn className="w-4 h-4" />
                    Detail Warning for Intricate Edges:
                  </p>
                  <p>
                    For intricate areas such as hair strands, fingers, or fabric folds, zoom in to 200%–300% to achieve high selection accuracy. If your primary goal is to completely strip away a complex background rather than hand-crafting a stylized outline, an automated AI background remover may be faster.
                  </p>
                </div>
              </section>

              {/* SECTION 8: FREEFORM & LASSO CROPPING EXPLAINED */}
              <section
                id="freeform-and-lasso-cropping"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is Freeform Image Cropping &amp; What Is a Lasso Crop?
                </h2>
                <p>
                  <strong>Freeform image cropping</strong> means selecting and cropping an image with an unconstrained custom shape. Instead of being locked into a predefined aspect ratio (such as 16:9, 4:3, or 1:1) or rectangular perimeter, you define the crop boundary manually.
                </p>

                <h3
                  className={`text-lg font-bold pt-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is a Lasso Crop?
                </h3>
                <p>
                  A <strong>lasso crop</strong> is when you manually draw around an object or region of an image using a lasso-style pointer. The name originates from classic desktop editing software where the tool icon looks like a cowboy&rsquo;s lasso loop.
                </p>

                <div
                  className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <h4
                    className={`font-bold text-xs uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Common Terms Used for This Technique:
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    {[
                      'Freehand crop',
                      'Freeform crop',
                      'Custom crop',
                      'Custom shape crop',
                      'Irregular crop',
                      'Freehand image crop',
                      'Hand-drawn crop',
                      'Custom image cropping',
                      'Freeform image cropping',
                      'Object crop',
                      'Lasso crop',
                      'Lasso selection',
                      'Custom selection',
                      'Draw selection',
                    ].map((term, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg border transition-colors duration-300 ${
                          isDark
                            ? 'bg-slate-800 border-white/10 text-slate-300'
                            : 'bg-slate-100 border-slate-200/70 text-slate-700'
                        }`}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                  <p
                    className={`text-xs pt-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Although different software may label these buttons slightly differently, they all describe the action of selecting an image area unconstrained by a standard rectangle.
                  </p>
                </div>
              </section>

              {/* SECTION 9: JPEG VS PNG FOR TRANSPARENCY */}
              <section
                id="jpeg-vs-png-transparency"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop a JPEG or PNG Into a Custom Shape? (The Transparency Factor)
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* JPEG CARD */}
                  <div
                    className={`border rounded-2xl p-5 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        JPEG / JPG Format
                      </span>
                      <span
                        className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        No Transparency
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Yes, you can edit and crop a{' '}
                      <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                        JPEG or JPG image
                      </Link>{' '}
                      using a freehand selection tool. However, because <strong>JPEG files do not support an alpha transparency channel</strong>, the area outside your custom shape will be filled with a solid color (typically pure white or black).
                    </p>
                  </div>

                  {/* PNG CARD */}
                  <div
                    className={`border rounded-2xl p-5 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        PNG / WebP Format
                      </span>
                      <span
                        className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        Supports Transparency
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      <strong>
                        <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                          PNG
                        </Link>{' '}
                        is the ideal format for custom-shaped crops.
                      </strong>{' '}
                      The area outside your hand-drawn boundary remains completely transparent, making it effortless to paste your cutout onto any background, website, slide, or sticker sheet. Easily convert pictures using our{' '}
                      <Link href="/convert" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                        online image converter
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <h4
                    className={`font-bold text-sm mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Ideal Use Cases for Transparent PNG Crops:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
                    {[
                      'Product images',
                      'Brand logos',
                      'Custom stickers',
                      'Website graphics',
                      'Slide decks',
                      'Social media designs',
                      'YouTube thumbnails',
                      'Marketing collaterals',
                    ].map((useCase, idx) => (
                      <span
                        key={idx}
                        className={`p-2 border rounded-xl text-center transition-colors duration-300 ${
                          isDark
                            ? 'bg-slate-800/60 border-white/10 text-slate-300'
                            : 'bg-slate-50 border-slate-200/60 text-slate-700'
                        }`}
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 10: HOW TO CROP ONLINE WITHOUT PHOTOSHOP */}
              <section
                id="cropping-online-without-photoshop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Can I Crop an Image Online Without Photoshop?
                </h2>
                <p>
                  You don&rsquo;t actually need Adobe Photoshop or expensive desktop editing licenses just to crop an image into an irregular shape.
                </p>
                <p>
                  An{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    online image cropper
                  </Link>{' '}
                  handles common cropping tasks directly inside your browser. With an online tool, you upload your image directly in Google Chrome, Safari, or Edge, select the required crop method, make your edits, and download the resulting file in seconds.
                </p>

                <div
                  className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
                    isDark
                      ? 'bg-blue-950/30 border-blue-500/20'
                      : 'bg-blue-50/50 border-blue-100'
                  }`}
                >
                  <h4
                    className={`font-bold text-sm flex items-center gap-2 ${
                      isDark ? 'text-sky-300' : 'text-blue-900'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                    Key Capabilities to Look for in an Online Cropper:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                    {[
                      'Freehand crop & lasso selection',
                      'Custom shape crop presets',
                      'Freeform bounding box adjustment',
                      'Irregular & organic object tracing',
                      'Transparent background preservation',
                      'Lossless PNG & WebP export',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* SECTION 11: GEOMETRIC PRESETS VS CUSTOM SHAPES */}
              <section
                id="presets-vs-custom-shapes"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop a Photo Into a Circle or Other Shape?
                </h2>
                <p>
                  <strong>Yes, but there is an important distinction to make:</strong>
                </p>
                <p>
                  A <strong>geometric preset crop</strong> uses a mathematically fixed formula (such as a circle, oval, rounded rectangle, star, or polygon), whereas a <strong>freehand crop</strong> gives you complete artistic freedom to draw any contour imaginable.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div
                    className={`border rounded-2xl p-4 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Preset Geometric Shapes
                    </span>
                    <ul
                      className={`text-xs space-y-1 font-medium list-disc pl-4 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <li>Circle &amp; Oval</li>
                      <li>Square &amp; Rectangle</li>
                      <li>Triangle &amp; Polygon</li>
                      <li>Star &amp; Heart</li>
                    </ul>
                  </div>

                  <div
                    className={`border rounded-2xl p-4 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E50F2] dark:text-sky-400">
                      Freehand &amp; Irregular Shapes
                    </span>
                    <ul
                      className={`text-xs space-y-1 font-medium list-disc pl-4 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <li>Silhouette around a person or pet</li>
                      <li>Product contour cutout</li>
                      <li>Handwritten signature extraction</li>
                      <li>Abstract, curved boundaries</li>
                    </ul>
                  </div>
                </div>

                <p
                  className={`text-xs pt-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  If the shape you need is not included in an editor&rsquo;s presets, a freehand drawing selection is the solution that gives you 100% control.
                </p>
              </section>

              {/* SECTION 12: REMOVING EVERYTHING OUTSIDE SELECTION */}
              <section
                id="remove-outside-selection"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Remove Everything Outside My Freehand Selection?
                </h2>
                <p>
                  After drawing your freehand selection, image editing software typically provides options such as <em>Crop</em>, <em>Mask</em>, <em>Invert Selection</em>, <em>Delete Outside Selection</em>, or <em>Remove Background</em>.
                </p>

                <div
                  className={`p-5 rounded-2xl space-y-3 text-white transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-950/90 border border-white/10'
                      : 'bg-slate-900'
                  }`}
                >
                  <h4 className="font-bold text-sm text-sky-400">The 4-Step Mask &amp; Export Sequence:</h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal pl-5 leading-relaxed font-normal">
                    <li><strong className="text-white">Draw your selection:</strong> Trace around the subject until the starting and ending points touch to close the path.</li>
                    <li><strong className="text-white">Invert selection (if needed):</strong> If your tool selects the background rather than the subject, invert the mask.</li>
                    <li><strong className="text-white">Remove outside area:</strong> Apply the crop or hit delete to clear everything outside your outline.</li>
                    <li>
                      <strong className="text-white">Export as PNG:</strong> Download the finished file as a{' '}
                      <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-semibold hover:text-sky-300">
                        PNG
                      </Link>{' '}
                      or{' '}
                      <Link href="/convert/webp-to-png" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-semibold hover:text-sky-300">
                        WebP
                      </Link>{' '}
                      to ensure the cleared area remains fully transparent.
                    </li>
                  </ol>
                </div>
              </section>

              {/* SECTION 13: PRO TIPS FOR A CLEAN FREEHAND CROP */}
              <section
                id="tips-for-clean-crop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Can I Get a Clean Freehand Crop? (7 Pro Tips)
                </h2>
                <p>
                  A clean, professional freehand crop largely depends on how steadily and accurately you create your selection. Here are seven field-tested tips:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      title: '1. Zoom in close',
                      desc: 'Working closer to the edges of your subject makes it possible to achieve much higher precision without wobbling.',
                    },
                    {
                      title: '2. Move slowly and deliberately',
                      desc: 'Avoid making large, rapid movements with your mouse or finger. Short strokes keep your line on target.',
                    },
                    {
                      title: '3. Follow the true subject outline',
                      desc: 'Keep your line slightly inside the subject rather than capturing background color bleed.',
                    },
                    {
                      title: '4. Use a stylus when possible',
                      desc: 'A drawing tablet or stylus pen on an iPad or touchscreen laptop gives vastly superior ergonomics compared to a trackpad.',
                    },
                    {
                      title: '5. Inspect the edges before export',
                      desc: 'Double-check your cutout against a dark or light checkerboard background to spot any stray uncropped pixels.',
                    },
                    {
                      title: '6. Always start with a high-resolution image',
                      desc: 'More pixel density makes fine selection easier and avoids blurry, pixelated edges after cropping.',
                    },
                    {
                      title: '7. Save your result as a PNG',
                      desc: 'Always choose PNG or WebP format when you need transparency around the isolated subject.',
                    },
                  ].map((tip, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border space-y-1 transition-colors duration-300 ${
                        isDark
                          ? 'bg-slate-900/80 border-white/10'
                          : 'bg-white border-slate-200/80'
                      }`}
                    >
                      <h3
                        className={`font-bold text-sm ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {tip.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {tip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 14: WHY USE A CUSTOM FREEHAND CROP */}
              <section
                id="why-use-freehand-crop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Why Should I Use a Custom Freehand Crop?
                </h2>
                <p>
                  A custom freehand crop gives you creative freedom that standard rectangular cropping tools simply cannot match. It&rsquo;s particularly useful when:
                </p>
                <ul
                  className={`list-disc pl-6 space-y-1.5 text-sm font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  <li>Your subject is organic or non-rectangular</li>
                  <li>You want to isolate a specific object from a busy photo</li>
                  <li>You need an irregular silhouette for collage or composite art</li>
                  <li>You want to create custom stickers, merch, or logos</li>
                  <li>You need to strip away unwanted clutter or distractions</li>
                  <li>You want total control over the composition of your visuals</li>
                </ul>
                <div
                  className={`p-5 rounded-2xl border font-medium text-sm transition-colors duration-300 ${
                    isDark
                      ? 'bg-blue-950/40 border-blue-500/30 text-blue-100'
                      : 'bg-blue-50 border-blue-200 text-slate-900'
                  }`}
                >
                  <strong>A Better Mindset:</strong> Instead of asking, <em>&ldquo;Which preset crop shape should I force my photo into?&rdquo;</em>, ask, <em>&ldquo;What shape does my subject actually need?&rdquo;</em>
                </div>
              </section>

              {/* SECTION 15: FREQUENTLY ASKED QUESTIONS */}
              <section
                id="faqs-section"
                className={`space-y-6 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-6 h-6 text-[#1E50F2] dark:text-sky-400" />
                  <h2>Frequently Asked Questions About Freehand Image Cropping</h2>
                </div>

                <div className="space-y-4">
                  {faqItems.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border space-y-2 shadow-2xs transition-colors duration-300 ${
                        isDark
                          ? 'bg-slate-900/80 border-white/10'
                          : 'bg-white border-slate-200/80'
                      }`}
                    >
                      <h3
                        className={`text-base font-bold flex items-start gap-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        <span className="text-[#1E50F2] dark:text-sky-400 font-mono font-bold">Q.</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed pl-6 font-normal ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 16: CONCLUSION & CTA */}
              <section
                id="try-cropmyimages-cta"
                className={`p-8 sm:p-10 rounded-3xl space-y-6 text-center scroll-mt-28 shadow-xl text-white transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-950/90 border border-white/10'
                    : 'bg-slate-900'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/10">
                  <Crop className="w-6 h-6 text-[#1E50F2] dark:text-sky-400" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                    Try Custom Image Cropping With CropMyImages
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
                    Need more control than a standard rectangular crop? CropMyImages makes image cropping and precision resizing effortless in your browser. Upload your photo, define the crop boundary you need, convert formats, and turn an ordinary photo into a focused visual in seconds.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1E50F2] hover:bg-blue-600 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                  >
                    <span>Launch Free Image Cropper</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/convert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-all border border-white/20 active:scale-95 cursor-pointer font-sans"
                  >
                    <span>Image Converter &amp; PNG Export</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-white/10 max-w-lg mx-auto">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Final Thoughts</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    A custom freehand crop is one of the most versatile techniques in image editing. Instead of being constrained by rigid rectangles, you trace what matters. Start cropping your visuals today with zero software installation required!
                  </p>
                </div>
              </section>

            </main>

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
