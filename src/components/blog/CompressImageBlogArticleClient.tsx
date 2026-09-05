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
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

interface FAQItem {
  q: string;
  a: string;
}

interface CompressImageBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'what-is-image-compression', title: '1. What Does It Mean to Compress an Image?' },
  { id: 'why-should-you-compress-images', title: '2. Why Should You Compress Images?' },
  { id: 'how-to-compress-an-image-online', title: '3. How to Compress an Image Online' },
  { id: 'compress-jpg-images-online', title: '4. Compress JPG Images Online' },
  { id: 'compress-png-images-online', title: '5. Compress PNG Images Online' },
  { id: 'does-compressing-reduce-quality', title: '6. Does Compressing Reduce Quality?' },
  { id: 'compression-vs-resizing', title: '7. Image Compression vs Image Resizing' },
  { id: 'what-file-size-to-aim-for', title: '8. What Image File Size Should You Aim For?' },
  { id: 'compress-to-specific-size', title: '9. Compress to a Specific Size (KB/MB)' },
  { id: 'tips-for-compressing-without-losing-quality', title: '10. Tips for Compressing Without Quality Loss' },
  { id: 'is-it-safe-to-compress-online', title: '11. Is It Safe to Compress Images Online?' },
  { id: 'why-use-cropmyimages', title: '12. Why Use CropMyImages?' },
  { id: 'faq-section', title: '13. Frequently Asked Questions' },
];

const inlineLinkCls =
  'text-[#1E50F2] dark:text-sky-400 font-semibold underline decoration-[#1E50F2]/40 dark:decoration-sky-400/40 hover:decoration-[#1E50F2] dark:hover:decoration-sky-400 transition-colors';

export function CompressImageBlogArticleClient({ faqItems }: CompressImageBlogArticleClientProps) {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('what-is-image-compression');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate reading scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // 2. Determine active section based on scroll position
      const sectionElements = TOC_SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 180; // Offset for sticky navbar

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for sticky navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`relative w-full font-sans transition-colors duration-300 ${
        isDark ? 'text-slate-100' : 'text-slate-900'
      }`}
    >
      {/* READING PROGRESS BAR (FIXED TOP) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-50">
        <div
          className="h-full bg-[#1E50F2] dark:bg-sky-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article itemScope itemType="https://schema.org/BlogPosting" className="w-full">
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
                Compress Image Online
              </span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Compress Image Online Without Losing Too Much Quality
            </h1>

            {/* META DETAILS (AUTHOR, DATE, READ TIME) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold pt-2">
              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-2xs transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-slate-300'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
                itemProp="author"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <User className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0" />
                <span itemProp="name">CropMyImages Editorial</span>
              </div>
              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-2xs transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-slate-300'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0" />
                <time itemProp="datePublished" dateTime="2026-09-01">September 1, 2026</time>
              </div>
              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-2xs transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-slate-300'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
              >
                <Clock className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0" />
                <span>5 Min Read</span>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN BODY CONTAINER WITH TOC SIDEBAR & PROSE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS (DESKTOP) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
              <div
                className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/90 border-white/10 shadow-2xl'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider border-b pb-3 transition-colors duration-300 ${
                    isDark ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
                  }`}
                >
                  <List className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1 text-xs">
                  {TOC_SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => scrollToSection(e, sec.id)}
                        className={`block py-1.5 px-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#1E50F2] text-white font-bold shadow-2xs'
                            : isDark
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800/80 font-medium'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        {sec.title}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* QUICK RESIZE & COMPRESS TOOL CALL-TO-ACTION CARD */}
              <div
                className={`text-white rounded-2xl p-5 space-y-3 shadow-lg transition-colors duration-300 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-900 to-blue-950 border border-white/10'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                }`}
              >
                <h4 className="font-bold text-sm">Need to compress an image right now?</h4>
                <p className="text-xs text-blue-100 dark:text-slate-300 leading-relaxed font-normal">
                  Compress JPG, PNG, WEBP, and AVIF files to target KB or MB file sizes instantly.
                </p>
                <Link
                  href="/convert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span>Open Free Image Compressor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* RIGHT SIDE: CARDLESS CLEAN READING CANVAS */}
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
                    : 'bg-slate-50 border-slate-200/80'
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
                          : 'text-slate-700 hover:text-[#1E50F2] hover:bg-slate-100'
                      }`}
                    >
                      {sec.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* ARTICLE INTRO */}
              <div
                className={`space-y-4 text-base sm:text-lg leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <p>
                  Have you ever tried to upload an{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image
                  </Link>{' '}
                  to a website, only to be stopped by an error message saying{' '}
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>&ldquo;File size too large&rdquo;</strong>?
                </p>
                <p>
                  Large images can slow down websites, take up valuable storage space, and make uploading or sharing files frustratingly slow. But reducing an image&rsquo;s file size shouldn&rsquo;t mean turning your crisp photo into a pixelated mess.
                </p>
                <p>
                  In this complete guide, you&rsquo;ll learn how to{' '}
                  <Link href="/convert" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    compress images online
                  </Link>{' '}
                  quickly and safely, resize dimensions with our{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image resizing guide
                  </Link>
                  , or crop pictures into custom shapes with our{' '}
                  <Link href="/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    freehand crop tutorial
                  </Link>
                  .
                </p>
              </div>

              {/* SECTION 1 */}
              <section
                id="what-is-image-compression"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Does It Mean to Compress an Image?
                </h2>
                <p>
                  Image compression is the process of reducing an image file&rsquo;s size (measured in kilobytes or megabytes) without significantly altering its visual appearance.
                </p>
                <p>
                  When a camera or smartphone captures a photo, it records massive amounts of data — colors, metadata, unseen pixels, and exposure info. Compression analyzes that data and removes redundant information or groups similar pixels together so the file takes up less storage space.
                </p>
                <p>
                  The goal is simple: <strong>make the file size smaller while keeping the photo looking sharp to the human eye.</strong>
                </p>
              </section>

              {/* SECTION 2 */}
              <section
                id="why-should-you-compress-images"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Why Should You Compress Images?
                </h2>
                <p>
                  There are many reasons why compressing images is essential for everyday internet users and professionals:
                </p>
                <ul className={`list-disc pl-6 space-y-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Faster Website Load Times:</strong> Heavy images cause web pages to load sluggishly, which frustrates visitors and hurts Google search rankings.</li>
                  <li><strong>Meets Strict Upload Limits:</strong> Portals for government jobs, exams, passports, and college applications often require images strictly under 50KB or 100KB.</li>
                  <li><strong>Saves Storage Space:</strong> Shrinking phone photos from 6MB to 500KB frees up valuable cloud and hard-drive storage.</li>
                  <li><strong>Easier to Email &amp; Share:</strong> Smaller images upload instantly and don&rsquo;t hit email attachment limits.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section
                id="how-to-compress-an-image-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Compress an Image Online With CropMyImages
                </h2>
                <p>
                  You don&rsquo;t need to install expensive photo-editing software to shrink your image files. With{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    CropMyImages
                  </Link>
                  , you can compress files in four simple steps:
                </p>

                <ol className={`list-decimal pl-6 space-y-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Upload your image:</strong> Select your JPG, PNG, WEBP, or AVIF file.</li>
                  <li><strong>Select target settings:</strong> Choose your preferred compression level or specify exact target dimensions.</li>
                  <li><strong>Preview clarity:</strong> Verify visual sharpness before saving.</li>
                  <li><strong>Download:</strong> Click Download to get your compact, high-quality image file.</li>
                </ol>
              </section>

              {/* SECTION 4 */}
              <section
                id="compress-jpg-images-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Compress JPG Images Online
                </h2>
                <p>
                  <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    JPG (or JPEG)
                  </Link>{' '}
                  is the most widely used image format on the web, especially for real-world photography and mobile phone snapshots.
                </p>
                <p>
                  JPG uses <strong>lossy compression</strong>, meaning it discards subtle color data that the human eye rarely perceives. Setting quality to 80%–85% often slashes file size by 60%–70% with virtually no noticeable difference in sharpness.
                </p>
              </section>

              {/* SECTION 5 */}
              <section
                id="compress-png-images-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Compress PNG Images Online
                </h2>
                <p>
                  <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    PNG
                  </Link>{' '}
                  is popular for logos, illustrations, screenshots, and graphics that require transparent backgrounds.
                </p>
                <p>
                  PNG utilizes <strong>lossless compression</strong>, preserving every pixel perfectly. Because of this, PNG files are naturally larger than JPGs. If you don&rsquo;t need transparency, converting a PNG to WebP or{' '}
                  <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    JPG
                  </Link>{' '}
                  will drastically reduce its file weight.
                </p>
              </section>

              {/* SECTION 6 */}
              <section
                id="does-compressing-reduce-quality"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Does Compressing an Image Reduce Its Quality?
                </h2>
                <p>
                  It depends on the compression type you choose:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    className={`border rounded-2xl p-5 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Lossless Compression
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Removes metadata and optimizes internal pixel encoding. Zero loss in visual fidelity, but achieves moderate file size reduction (10%–30%).
                    </p>
                  </div>

                  <div
                    className={`border rounded-2xl p-5 space-y-2 transition-colors duration-300 ${
                      isDark
                        ? 'bg-slate-900/80 border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Lossy Compression
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Removes subtle, imperceptible color differences. Achieves dramatic size reduction (50%–80%) while maintaining excellent human-eye clarity.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7 */}
              <section
                id="compression-vs-resizing"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Image Compression vs Image Resizing: What&rsquo;s the Difference?
                </h2>
                <p>
                  Although both reduce file size, they do so differently:
                </p>
                <ul className={`list-disc pl-6 space-y-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Resizing:</strong> Changes the pixel dimensions (width &times; height), like scaling a 4000 &times; 3000 photo down to 1920 &times; 1440.</li>
                  <li><strong>Compressing:</strong> Keeps the pixel dimensions intact but optimizes the underlying byte storage and color encoding.</li>
                </ul>
                <p className="pt-1">
                  For the best results,{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    resize oversized camera photos
                  </Link>{' '}
                  first, or{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    crop the framing
                  </Link>
                  , then apply gentle compression.
                </p>
              </section>

              {/* SECTION 8 */}
              <section
                id="what-file-size-to-aim-for"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Image File Size Should You Aim For?
                </h2>
                <p>
                  The ideal file size depends on how the image will be viewed:
                </p>
                <ul className={`list-disc pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Website Banners:</strong> Under 200KB – 300KB</li>
                  <li><strong>Blog Post Images:</strong> Under 100KB – 150KB</li>
                  <li><strong>Thumbnail &amp; Icons:</strong> Under 20KB – 40KB</li>
                  <li><strong>Online Forms &amp; Applications:</strong> Strictly under 50KB or 100KB</li>
                </ul>
              </section>

              {/* SECTION 9 */}
              <section
                id="compress-to-specific-size"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can You Compress an Image to a Specific Target Size (KB or MB)?
                </h2>
                <p>
                  Yes! With CropMyImages, you can enter your exact target file size (e.g. 50KB, 100KB, or 200KB). If you are preparing application photos or signatures for online portals, read our step-by-step guide on{' '}
                  <Link href="/blog/how-to-resize-image-to-50kb" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    how to resize an image to 50KB
                  </Link>
                  . Our engine calculates the optimal balance between pixel scaling and compression encoding to hit your requirement without causing blur.
                </p>
              </section>

              {/* SECTION 10 */}
              <section
                id="tips-for-compressing-without-losing-quality"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Tips for Compressing Images Without Losing Quality
                </h2>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Want to reduce image size while keeping it looking good? Try these simple tips:
                </p>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium p-5 rounded-2xl border transition-colors duration-300 ${
                    isDark
                      ? 'bg-blue-950/30 border-blue-500/20 text-slate-300'
                      : 'bg-blue-50/60 border-blue-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div><strong className={isDark ? 'text-white' : 'text-slate-900'}>Use the Right Format:</strong> JPG for photographs; PNG for transparency.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div><strong className={isDark ? 'text-white' : 'text-slate-900'}>Don&rsquo;t Over-Compress:</strong> Avoid setting quality to minimum.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div><strong className={isDark ? 'text-white' : 'text-slate-900'}>Resize Oversized Images:</strong> Scale down pixels first before compressing.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div><strong className={isDark ? 'text-white' : 'text-slate-900'}>Check Final Preview:</strong> Ensure text &amp; details remain crisp.</div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div><strong className={isDark ? 'text-white' : 'text-slate-900'}>Keep Original Backup:</strong> Always keep a high-res original saved safely.</div>
                  </div>
                </div>
              </section>

              {/* SECTION 11 */}
              <section
                id="is-it-safe-to-compress-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Is It Safe to Compress Images Online?
                </h2>
                <p>
                  This depends on the online tool you use. Before uploading personal, confidential, or sensitive images, check the website&rsquo;s privacy policy and understand how uploaded files are handled.
                </p>
                <p>
                  At CropMyImages, uploaded files are processed securely in memory and deleted immediately after conversion to ensure 100% user privacy.
                </p>
              </section>

              {/* SECTION 12 */}
              <section
                id="why-use-cropmyimages"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Why Use CropMyImages to Compress Images?
                </h2>
                <p>
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    CropMyImages
                  </Link>{' '}
                  is designed to make common image-editing tasks simple and accessible. Instead of opening complicated software just to prepare an image for uploading, you can use our free online image tools for everyday tasks such as{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    resizing
                  </Link>
                  ,{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    cropping
                  </Link>
                  , and reducing image file size.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/convert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Compress Image Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>Resize &amp; Crop Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* FAQ SECTION */}
              <section
                id="faq-section"
                className={`space-y-6 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-6 h-6 text-[#1E50F2] dark:text-sky-400" />
                  <h2>Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-2xl p-5 space-y-2 transition-colors duration-300 ${
                        isDark
                          ? 'bg-slate-900/80 border-white/10 shadow-sm'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.q}
                      </h3>
                      <p className={`text-sm leading-relaxed font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </main>

          </div>
        </div>
      </article>
    </div>
  );
}
