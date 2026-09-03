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
  Crop,
  Image as ImageIcon,
  Share2,
  Download
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

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
  { id: 'conclusion-cta', title: '6. Crop Your Festive Visuals Instantly' },
];

export function FestiveCropBlogArticleClient({ faqItems }: FestiveCropBlogArticleClientProps) {
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
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      {/* READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
        <div
          className="h-full bg-slate-900 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HEADER SECTION WITH SKY BACKDROP */}
      <div className="bg-sky-cloud-hero border-b border-zinc-200/60 pb-12 pt-2">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog/how-to-resize-image-without-losing-quality" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
              Crop Festive Images
            </span>
          </nav>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Festive Photo Guide
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-heading max-w-3xl mx-auto">
            How to Crop Festive Images Without Losing Quality <span className="font-serif italic font-normal text-slate-800 text-xl sm:text-3xl block mt-1">(Janmashtami &amp; Teachers&apos; Day Special)</span>
          </h1>

          {/* Author & Meta Row */}
          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 font-medium pt-2 border-t border-slate-200/60 max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-500" />
              <span>CropMyImages Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>September 4, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY & SIDEBAR CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                <List className="w-4 h-4 text-slate-700" />
                <span>Table of Contents</span>
              </div>

              <nav className="space-y-1 text-xs font-medium text-slate-600">
                {TOC_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`block py-2 px-3 rounded-xl transition-all ${
                      activeSection === sec.id
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Launch CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 to-black text-white rounded-3xl p-6 space-y-4 shadow-md">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                <Crop className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-extrabold tracking-tight">
                Crop Festival Photos Online Free
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Set exact aspect ratios (1:1, 9:16, 4:5), circular shapes, and high-res WebP/PNG downloads.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Launch Crop Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          {/* RIGHT COLUMN: MAIN ARTICLE CONTENT */}
          <article className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10 font-sans text-slate-800 text-base leading-relaxed">
            
            {/* SECTION 1: INTRODUCTION */}
            <section id="introduction" className="space-y-4 scroll-mt-28">
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                Festive seasons bring a rush of greetings, social media updates, and warm wishes. Whether you are preparing a status update for <strong className="text-slate-900">Krishna Janmashtami</strong> or crafting a heartfelt thank-you post for <strong className="text-slate-900">Teachers&apos; Day</strong>, high-quality visuals make all the difference.
              </p>

              <p>
                However, taking a large, detailed image and resizing or cropping it often leaves you with blurry, pixelated results. You might wonder how to crop a portrait of Nandlal, Kanha, or a group photo with your favorite teacher while keeping every detail sharp and vibrant.
              </p>

              <p>
                This guide explains how image cropping works, how to maintain maximum image resolution, and how to use <strong className="text-slate-900">CropMyImages</strong> to edit your festive photos effortlessly.
              </p>
            </section>

            {/* SECTION 2: WHY DO IMAGES LOSE QUALITY WHEN CROPPED */}
            <section id="why-images-lose-quality" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-indigo-600 shrink-0" />
                <span>Why Do Images Lose Quality When Cropped?</span>
              </h2>

              <p>
                Cropping does not inherently degrade quality; it simply removes pixels outside your selected frame. Quality loss usually happens after cropping due to two main factors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Factor 1</div>
                  <h3 className="text-base font-bold text-slate-900">Upscaling Small Selections</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Selecting a tiny section of a low-resolution image and stretching it to fill a phone screen or story format causes noticeable pixelation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Factor 2</div>
                  <h3 className="text-base font-bold text-slate-900">Re-compression (JPEG Artifacts)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Saving an image repeatedly as a compressed format (like JPEG) degrades clarity over time by introducing blocky artifacts around sharp edges.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: STEP-BY-STEP GUIDE */}
            <section id="step-by-step-guide" className="space-y-6 border-t border-slate-100 pt-8 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Step-by-Step: Crop Festive Images Without Losing Sharpness</span>
              </h2>

              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">1</span>
                    <h3 className="text-lg font-bold text-slate-900">Start with a High-Quality Source</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-10">
                    To crop effectively, begin with the highest resolution available.
                  </p>
                  <ul className="list-disc pl-14 text-xs sm:text-sm text-slate-700 space-y-1">
                    <li><strong className="text-slate-900">For Janmashtami:</strong> When searching for divine images of Lord Krishna, Bal Gopal, or Radha Krishna, look for files labeled HD, 4K, or high-res vector graphics.</li>
                    <li><strong className="text-slate-900">For Teachers&apos; Day:</strong> High-resolution photos taken in good lighting ensure faces stay clear after cropping.</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">2</span>
                    <h3 className="text-lg font-bold text-slate-900">Choose the Correct Aspect Ratio</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-10">
                    Avoid arbitrary freehand cropping if you intend to post on specific social platforms:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-10 pt-1 text-xs font-semibold">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                      <div className="text-slate-900 font-extrabold">1:1</div>
                      <div className="text-slate-500 text-[10px]">Instagram Post / DPs</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                      <div className="text-slate-900 font-extrabold">4:5</div>
                      <div className="text-slate-500 text-[10px]">Portrait Feed</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                      <div className="text-slate-900 font-extrabold">9:16</div>
                      <div className="text-slate-500 text-[10px]">Stories &amp; Status</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                      <div className="text-slate-900 font-extrabold">16:9</div>
                      <div className="text-slate-500 text-[10px]">YouTube / Banners</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 pl-10 pt-1">
                    Matching the crop frame to your target platform prevents automated stretching or additional compression by social media apps.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">3</span>
                    <h3 className="text-lg font-bold text-slate-900">Export in the Right File Format</h3>
                  </div>
                  <ul className="list-disc pl-14 text-xs sm:text-sm text-slate-700 space-y-1">
                    <li>Use <strong className="text-slate-900">PNG</strong> for graphics with sharp details, festive typography, or small focal points (like the intricate details on a peacock feather or a flute).</li>
                    <li>Use <strong className="text-slate-900">JPG</strong> (at 90–100% quality) or <strong className="text-slate-900">WebP</strong> for rich, real-life photography.</li>
                  </ul>
                </div>

              </div>
            </section>

            {/* SECTION 4: FESTIVE CROPPING GUIDE */}
            <section id="festive-cropping-guide" className="space-y-6 border-t border-slate-100 pt-8 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
                <span>Quick Guide: Preparing Images for Today&apos;s Festivals</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Krishna Card */}
                <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                    <span>🪶</span>
                    <h3>Cropping Lord Krishna &amp; Kanha Images</h3>
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    When editing images of Shree Krishna, Nandlal, or Makhan Chor for Janmashtami posts:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-amber-900 space-y-1.5">
                    <li><strong className="text-amber-950">Focus on the Subject:</strong> Frame closely around key details like the Mukut (crown), Mor Pankh (peacock feather), or Bansuri (flute).</li>
                    <li><strong className="text-amber-950">Keep Centered:</strong> Use a 1:1 ratio to center Little Kanha for WhatsApp profile pictures without cutting off essential elements.</li>
                  </ul>
                </div>

                {/* Teachers Day Card */}
                <div className="p-6 rounded-3xl bg-sky-50/60 border border-sky-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-sky-900 font-extrabold text-base">
                    <span>🎓</span>
                    <h3>Editing Teachers&apos; Day Greetings</h3>
                  </div>
                  <p className="text-xs text-sky-900/80 leading-relaxed">
                    When creating thank-you posts and tributes for your teachers and mentors:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-sky-900 space-y-1.5">
                    <li><strong className="text-sky-950">Highlight Key Expressions:</strong> Focus on the teacher and students while cropping out distracting background clutter.</li>
                    <li><strong className="text-sky-950">Leave Text Space:</strong> If adding a message like &quot;Happy Teachers&apos; Day,&quot; ensure your crop leaves clean, uncluttered space on one side for text overlays.</li>
                  </ul>
                </div>

              </div>
            </section>

            {/* SECTION 5: FAQS */}
            <section id="faqs-section" className="space-y-6 border-t border-slate-100 pt-8 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-indigo-600 shrink-0" />
                <span>Frequently Asked Questions (FAQs)</span>
              </h2>

              <div className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
                      <span className="text-indigo-600 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: CONCLUSION & CTA */}
            <section id="conclusion-cta" className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 text-center scroll-mt-28">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Crop Your Festive Visuals Instantly
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Keep your festival greetings sharp, clear, and professional. Whether framing Nandlal&apos;s smile for Janmashtami or honoring your mentors on Teachers&apos; Day, use CropMyImages to resize and crop your photos in seconds without sacrificing quality.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Crop className="w-4 h-4 text-slate-900" />
                  <span>Launch CropMyImages Free</span>
                </Link>
              </div>
            </section>

          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
