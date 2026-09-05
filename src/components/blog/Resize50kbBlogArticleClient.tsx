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

interface Resize50kbBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'what-does-50kb-mean', title: '1. What Does 50KB Mean for an Image?' },
  { id: 'why-resize-to-50kb', title: '2. Why Do I Need to Resize an Image to 50KB?' },
  { id: 'how-to-resize-to-50kb-online', title: '3. How to Resize an Image to 50KB Online' },
  { id: 'compress-without-blurry', title: '4. Compress Without Making It Blurry' },
  { id: 'can-i-resize-jpg-to-50kb', title: '5. Can I Resize a JPG Image to 50KB?' },
  { id: 'can-i-resize-png-to-50kb', title: '6. Can I Resize a PNG to 50KB?' },
  { id: 'what-if-still-bigger-than-50kb', title: '7. What If Image Is Still Bigger Than 50KB?' },
  { id: 'what-if-looks-blurry', title: '8. What If My 50KB Image Looks Blurry?' },
  { id: 'what-dimensions-should-50kb-be', title: '9. What Dimensions Should a 50KB Image Be?' },
  { id: 'how-to-resize-on-phone', title: '10. How to Resize an Image to 50KB on Phone' },
  { id: 'what-to-check-before-uploading', title: '11. What Should You Check Before Uploading?' },
  { id: '50kb-vs-100kb', title: '12. 50KB vs 100KB: Which Is Better?' },
  { id: 'should-i-aim-for-exactly-50kb', title: '13. Should I Aim for Exactly 50KB?' },
  { id: 'resize-with-cropmyimages', title: '14. Resize to 50KB With CropMyImages' },
  { id: 'faq-section', title: '15. Frequently Asked Questions' },
];

const inlineLinkCls =
  'text-[#1E50F2] dark:text-sky-400 font-semibold underline decoration-[#1E50F2]/40 dark:decoration-sky-400/40 hover:decoration-[#1E50F2] dark:hover:decoration-sky-400 transition-colors';

export function Resize50kbBlogArticleClient({ faqItems }: Resize50kbBlogArticleClientProps) {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('what-does-50kb-mean');

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
                How to Resize Image to 50KB
              </span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              How to Resize an Image to 50KB Without Losing Quality
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
                <time itemProp="datePublished" dateTime="2026-08-31">August 31, 2026</time>
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

              {/* QUICK RESIZE TOOL CALL-TO-ACTION CARD */}
              <div
                className={`text-white rounded-2xl p-5 space-y-3 shadow-lg transition-colors duration-300 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-900 to-blue-950 border border-white/10'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                }`}
              >
                <h4 className="font-bold text-sm">Need to compress an image to 50KB now?</h4>
                <p className="text-xs text-blue-100 dark:text-slate-300 leading-relaxed font-normal">
                  Use our free, instant online cropper and file size reducer right in your browser.
                </p>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span>Open Image Compressor</span>
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
                  Trying to upload a photo and getting a message that says{' '}
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>&ldquo;Image size should be less than 50KB&rdquo;</strong>?
                </p>
                <p>
                  It happens all the time.
                </p>
                <p>
                  You have a perfectly good photo on your phone, but the website refuses to accept it because the file is too large. A photo that is a few MB might need to be reduced to just 50KB before you can complete a job application, exam form, college application or other online form.
                </p>
                <p>
                  The good news is that you don&rsquo;t need Photoshop or any complicated software to do it. You can{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    resize an image
                  </Link>{' '}
                  to 50KB online in just a few steps.
                </p>
                <p>
                  In this guide, we&rsquo;ll explain how to reduce an image to 50KB, how to keep it looking clear (also see our{' '}
                  <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    lossless image resizing guide
                  </Link>
                  ), which format to use, and how to crop contours with our{' '}
                  <Link href="/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    freehand crop tutorial
                  </Link>
                  .
                </p>
              </div>

              {/* SECTION 1 */}
              <section
                id="what-does-50kb-mean"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Does 50KB Mean for an Image?
                </h2>
                <p>
                  When a website asks for an image of 50KB, it is referring to the size of the actual image file. It is not the same thing as the image&rsquo;s dimensions.
                </p>
                <p>For example, an image could be:</p>
                <ul className={`list-disc pl-6 space-y-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>1200 &times; 800 pixels</strong> and 500KB</li>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>800 &times; 533 pixels</strong> and 150KB</li>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>500 &times; 333 pixels</strong> and 45KB</li>
                </ul>
                <p>
                  The exact file size depends on the image, its dimensions, format and level of compression. This is why simply changing the width and height doesn&rsquo;t always guarantee that your image will become 50KB.
                </p>
                <p>
                  To get a large photo below 50KB, you will usually need a combination of resizing and compression.
                </p>
              </section>

              {/* SECTION 2 */}
              <section
                id="why-resize-to-50kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Why Do I Need to Resize an Image to 50KB?
                </h2>
                <p>
                  A lot of websites place limits on the size of images that can be uploaded. You may come across a 50KB limit when uploading a:
                </p>
                <ul className={`list-disc pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>Passport-style photo</li>
                  <li>Digital signature</li>
                  <li>Government job or exam application form</li>
                  <li>College admission document</li>
                  <li>ID card or profile picture</li>
                </ul>
                <p>
                  Websites enforce these limits to save server space, ensure pages load quickly, and keep application databases running efficiently.
                </p>
              </section>

              {/* SECTION 3 */}
              <section
                id="how-to-resize-to-50kb-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Resize an Image to 50KB Online
                </h2>
                <p>
                  You can resize an image to 50KB online in seconds with{' '}
                  <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    CropMyImages
                  </Link>
                  :
                </p>
                <ol className={`list-decimal pl-6 space-y-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Upload your image:</strong> Select your file from your phone, tablet, or computer.</li>
                  <li><strong>Choose 50KB Target Size:</strong> Enter 50KB into the target file size box.</li>
                  <li><strong>Apply &amp; Preview:</strong> Check the preview to make sure your photo or signature is still clear.</li>
                  <li><strong>Download:</strong> Save your newly compressed image file ready for uploading.</li>
                </ol>
              </section>

              {/* SECTION 4 */}
              <section
                id="compress-without-blurry"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Reduce Image Size to 50KB Without Making It Blurry
                </h2>
                <p>
                  A common worry is: <em>&ldquo;If I reduce the image to 50KB, will it become blurry?&rdquo;</em>
                </p>
                <p>
                  Not necessarily. A 50KB image can still look sharp on a phone or computer screen if it has the right dimensions. If you keep the pixel dimensions reasonable (such as 600 &times; 600 or 800 &times; 600 pixels), a 50KB file has more than enough data to look completely crisp.
                </p>
              </section>

              {/* SECTION 5 */}
              <section
                id="can-i-resize-jpg-to-50kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Resize a JPG Image to 50KB?
                </h2>
                <p>
                  <strong>Yes, absolutely.</strong> In fact,{' '}
                  <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    JPG
                  </Link>{' '}
                  is the easiest format to compress down to 50KB because its compression algorithm is highly optimized for photographs. Most application portals explicitly prefer or require JPG format.
                </p>
              </section>

              {/* SECTION 6 */}
              <section
                id="can-i-resize-png-to-50kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Resize a PNG to 50KB?
                </h2>
                <p>
                  <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    PNG
                  </Link>{' '}
                  files are lossless and naturally heavier. While simple icons, small signatures, and graphics can easily reach 50KB as a PNG, detailed photographs in PNG format rarely squeeze under 50KB without heavy downscaling. Converting the image from{' '}
                  <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    PNG to JPG
                  </Link>{' '}
                  or WebP is usually recommended using our{' '}
                  <Link href="/convert" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>
                    image converter
                  </Link>
                  .
                </p>
              </section>

              {/* SECTION 7 */}
              <section
                id="what-if-still-bigger-than-50kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What If My Image Is Still Bigger Than 50KB?
                </h2>
                <p>
                  If you&rsquo;ve tried compressing and the file size is still hovering above 50KB, take these three steps:
                </p>
                <ol className={`list-decimal pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Reduce the dimensions:</strong> If your photo is 3000px wide, <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>resize it down</Link> to 800px or 600px first.</li>
                  <li><strong>Crop out excess background:</strong> <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>Cropping out</Link> unused empty borders reduces total data dramatically.</li>
                  <li><strong>Save as JPG:</strong> Ensure you are exporting as <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>JPG instead of heavy PNG</Link>.</li>
                </ol>
              </section>

              {/* SECTION 8 */}
              <section
                id="what-if-looks-blurry"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What If My 50KB Image Looks Blurry?
                </h2>
                <p>
                  Blurriness typically happens when you take an already small, compressed thumbnail and stretch it, or when dimensions are set too small (like 100 &times; 100 px). Start with the original photo from your camera, keep dimensions at a standard 600 &times; 600 px, and apply gentle compression.
                </p>
              </section>

              {/* SECTION 9 */}
              <section
                id="what-dimensions-should-50kb-be"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Dimensions Should a 50KB Image Be?
                </h2>
                <p>
                  For passport photos and application portals, common dimensions that comfortably fit within 50KB are:
                </p>
                <ul className={`list-disc pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Passport Photo:</strong> 3.5 &times; 4.5 cm (around 413 &times; 531 pixels at 300 DPI)</li>
                  <li><strong>Digital Signature:</strong> 200 &times; 100 to 400 &times; 150 pixels</li>
                  <li><strong>Square Profile / Avatar:</strong> 600 &times; 600 pixels</li>
                </ul>
              </section>

              {/* SECTION 10 */}
              <section
                id="how-to-resize-on-phone"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How to Resize an Image to 50KB on Your Phone
                </h2>
                <p>
                  You don&rsquo;t need to download an app. Just open <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link> in Safari or Chrome on your iPhone or Android device:
                </p>
                <ol className={`list-decimal pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>Select the photo from your gallery.</li>
                  <li>Set the target file size to 50KB.</li>
                  <li>Adjust the dimensions if the application requires them.</li>
                  <li>Compress or <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop and resize the image</Link>.</li>
                  <li>Check the final file size and download.</li>
                </ol>
              </section>

              {/* SECTION 11 */}
              <section
                id="what-to-check-before-uploading"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  50KB Image: What Should You Check Before Uploading?
                </h2>
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  Before clicking the final Upload button, check these 6 things:
                </p>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium p-5 rounded-2xl border transition-colors duration-300 ${
                    isDark
                      ? 'bg-blue-950/30 border-blue-500/20 text-slate-300'
                      : 'bg-blue-50/60 border-blue-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> File size: Below 50KB limit?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Format: <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>JPG or PNG</Link> accepted?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Dimensions: Width &amp; height correct?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Quality: Image clear &amp; readable?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Orientation: Correct direction?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> File name: Proper naming?</div>
                </div>
              </section>

              {/* SECTION 12 & 13 */}
              <section
                id="50kb-vs-100kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  50KB vs 100KB: Which Is Better?
                </h2>
                <p>
                  A 100KB image can usually retain more detail than a 50KB image. But if the website specifically says maximum 50KB, you should follow that requirement rather than uploading a larger file. Never upload a 100KB image to a form that clearly specifies a 50KB limit.
                </p>
              </section>

              <section
                id="should-i-aim-for-exactly-50kb"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Should I Aim for Exactly 50KB?
                </h2>
                <p>
                  <strong>Not necessarily.</strong> If the requirement says &ldquo;Maximum file size: 50KB&rdquo;, a 47KB or 48KB image is perfectly fine and often safer because different portals calculate file sizes slightly differently.
                </p>
              </section>

              {/* SECTION 14 */}
              <section
                id="resize-with-cropmyimages"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Resize Your Image to 50KB With CropMyImages
                </h2>
                <p>
                  With <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link>, you can <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop, resize and compress your image size online</Link> and prepare it for upload in seconds. Upload your image, set your 50KB limit, make your adjustments, and download your file.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Resize &amp; Compress Image Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/convert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>Format Converter &amp; Compressor Tool</span>
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
