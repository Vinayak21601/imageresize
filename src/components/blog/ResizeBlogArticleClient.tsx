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
  BookOpen
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface ResizeBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'what-does-resizing-mean', title: '1. What Does Resizing Mean?' },
  { id: 'why-does-an-image-become-blurry', title: '2. Why Does Image Become Blurry?' },
  { id: 'how-to-resize-without-losing-quality', title: '3. How to Resize Without Quality Loss' },
  { id: 'cropping-vs-resizing', title: '4. Cropping vs. Resizing' },
  { id: 'resize-to-exact-size', title: '5. Resize to Exact Size (px, in, cm, mm)' },
  { id: 'image-formats-guide', title: '6. Which Image Format to Use?' },
  { id: 'reduce-size-without-blurry', title: '7. Reduce Size Without Blurry Output' },
  { id: 'how-to-resize-online', title: '8. Resize Online With CropMyImages' },
  { id: '7-simple-tips', title: '9. 7 Simple Tips for Sharp Images' },
  { id: 'faq-section', title: '10. Frequently Asked Questions' },
];

export function ResizeBlogArticleClient({ faqItems }: ResizeBlogArticleClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('what-does-resizing-mean');

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
    <div className="relative w-full">
      {/* READING PROGRESS BAR (FIXED TOP) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-[#1E50F2] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article itemScope itemType="https://schema.org/BlogPosting" className="w-full">
        {/* HERO ARTICLE HEADER */}
        <header className="bg-sky-cloud-hero border-b border-zinc-200/60 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            
            {/* BREADCRUMB NAVIGATION */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] shrink-0" />
              <span className="text-slate-900">Blog</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] shrink-0" />
              <span className="text-[#1E50F2] truncate max-w-[200px] sm:max-w-none">Resize Without Losing Quality</span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans max-w-3xl mx-auto"
            >
              How to Resize an Image Without Losing Quality
            </h1>

            {/* META DETAILS (AUTHOR, DATE, READ TIME) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-semibold pt-2">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <User className="w-4 h-4 text-[#1E50F2] shrink-0" />
                <span itemProp="name">CropMyImages Editorial</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
                <Calendar className="w-4 h-4 text-[#1E50F2] shrink-0" />
                <time itemProp="datePublished" dateTime="2026-08-30">August 30, 2026</time>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
                <Clock className="w-4 h-4 text-[#1E50F2] shrink-0" />
                <span>6 Min Read</span>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN BODY CONTAINER WITH TOC SIDEBAR & PROSE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS (DESKTOP) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
                  <List className="w-4 h-4 text-[#1E50F2]" />
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
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 space-y-3 shadow-lg">
                <h4 className="font-bold text-sm">Need to resize your image now?</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">
                  Use our free, high-precision image resizer, cropper, and format converter in your browser.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span>Open Free Image Resizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* RIGHT SIDE: CARDLESS CLEAN READING CANVAS */}
            <main className="lg:col-span-8 space-y-10 text-slate-800 text-base leading-relaxed font-normal">
              
              {/* MOBILE TABLE OF CONTENTS QUICK JUMP */}
              <div className="block lg:hidden bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                  <List className="w-4 h-4 text-[#1E50F2]" />
                  <span>Quick Table of Contents</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {TOC_SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className="text-slate-700 hover:text-[#1E50F2] py-1 px-2 rounded hover:bg-slate-100 font-medium truncate"
                    >
                      {sec.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* BORDERLESS GRAPHICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2 text-center">
                  <img
                    src="/blogimages/proportionalscalling.webp"
                    alt="Proportional Scaling image resizing aspect ratio diagram"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">1. Lock Proportional Aspect Ratio</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/blogimages/cropfirstrule.webp"
                    alt="Crop First Rule framing diagram"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">2. Crop Target Shape Before Resizing</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/blogimages/modernformats.webp"
                    alt="Modern WebP and AVIF image format compression diagram"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">3. Use WebP / AVIF Modern Formats</span>
                </div>
              </div>

              {/* ARTICLE INTRO */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  We&rsquo;ve all been there. You have a perfectly good photo, but the website says <strong>&ldquo;Image dimensions not supported.&rdquo;</strong> You resize it, upload it again, and suddenly the photo looks blurry. Or maybe you&rsquo;ve reduced the file size and now the image looks nothing like the original.
                </p>
                <p>
                  So, what went wrong?
                </p>
                <p>
                  Resizing an image isn&rsquo;t simply about making it smaller or bigger. The way you resize an image matters. If you maintain the right proportions, choose suitable dimensions, and use the right format, you can resize an image while keeping it looking sharp and natural.
                </p>
                <p>
                  In this guide, we&rsquo;ll walk through how to resize an image without losing quality, explain the difference between resizing and cropping, and show you what to consider when preparing images for websites, social media, applications, documents, and more.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="what-does-resizing-mean" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  First, What Does &ldquo;Resizing an Image&rdquo; Actually Mean?
                </h2>
                <p>
                  When you resize an image, you&rsquo;re changing its width and height. For example, imagine you took a photo with your phone and its dimensions are:
                </p>
                <p className="font-mono text-[#1E50F2] font-bold text-[#1E50F2] text-lg">
                  4032 &times; 3024 pixels
                </p>
                <p>That&rsquo;s a fairly large image.</p>
                <p>If you want a smaller version, you might resize it to:</p>
                <p className="font-mono text-[#1E50F2] font-bold text-[#1E50F2] text-lg">
                  2000 &times; 1500 pixels
                </p>
                <p>
                  The image is now smaller, but the proportions remain the same. This is important because an image has more than one type of &ldquo;size.&rdquo; For example:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 font-medium text-slate-700">
                  <li><strong>4032 &times; 3024 px</strong> &rarr; image dimensions</li>
                  <li><strong>4 MB</strong> &rarr; file size</li>
                  <li><strong>JPG</strong> &rarr; file format</li>
                </ul>
                <p>
                  These three things are related, but they&rsquo;re not the same. And understanding the difference will make resizing images much easier.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="why-does-an-image-become-blurry" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Why Does an Image Become Blurry After Resizing?
                </h2>
                <p>
                  If you&rsquo;ve resized a photo and thought, <em>&ldquo;Why does this look worse now?&rdquo;</em>, you&rsquo;re probably dealing with one of these common problems:
                </p>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">You enlarged the image too much</h3>
                    <p className="text-slate-700">
                      Let&rsquo;s say you have a small image that&rsquo;s only <strong>500 &times; 500 pixels</strong>, and you try to turn it into <strong>3000 &times; 3000 pixels</strong>. The software has to create additional pixels that weren&rsquo;t present in the original image. The result can be soft, blurry, or pixelated. That&rsquo;s why it&rsquo;s generally easier to make a large image smaller than to make a very small image significantly larger.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">You changed the image&rsquo;s proportions</h3>
                    <p className="text-slate-700">
                      This is another very common mistake. Suppose your original photo is <strong>4000 &times; 3000 px</strong> (a 4:3 aspect ratio). Now you enter <strong>1920 &times; 1080 px</strong> (16:9). If you simply force the original image into those dimensions, the image can become stretched. A person&rsquo;s face might look wider; a building might look strangely compressed. The better approach is usually: <strong>Crop &rarr; Resize</strong>, rather than stretching the image.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">You compressed it too much</h3>
                    <p className="text-slate-700">
                      Resizing and compressing are two different things. You can have the perfect image dimensions but still end up with a poor-looking image if the file has been compressed too aggressively. This is especially noticeable with JPG images. The goal isn&rsquo;t simply to create the smallest possible file. The goal is to find a good balance between image quality, dimensions, file size, and format.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="how-to-resize-without-losing-quality" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  So, How Do You Resize an Image Without Losing Quality?
                </h2>
                <p>
                  There&rsquo;s no magic button that guarantees zero quality loss in every situation. But you can get very good results by following a few simple rules:
                </p>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">1. Start With the Best Version of Your Image</h3>
                    <p className="text-slate-700">
                      Whenever possible, start with the original photograph. Don&rsquo;t resize a screenshot of an already compressed image if you still have the original. For example, if your phone originally saved a high-resolution photograph, use that version. You can always create a smaller copy from a high-quality original. Going the other way from a tiny, compressed image to a large, detailed one is much harder.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">2. Know Where You&rsquo;re Going to Use the Image</h3>
                    <p className="text-slate-700">
                      Before you resize anything, ask yourself: <em>&ldquo;Where is this image going?&rdquo;</em> Are you uploading it to a website, Instagram, LinkedIn, a government or exam application, an online form, a presentation, a document, or a printing service? The answer matters because every use case can have different requirements. For example, a website banner might need a wide image, while a profile picture might need a square one. An online application might specify both dimensions and maximum file size. So don&rsquo;t resize an image just because you think a smaller size &ldquo;looks right.&rdquo; Check the actual requirement first.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">3. Keep the Aspect Ratio Correct</h3>
                    <p className="text-slate-700">
                      This is probably the most important tip if you want to avoid distorted images. The aspect ratio is simply the relationship between an image&rsquo;s width and height. Some common aspect ratios are: 1:1 Square, 4:3 Common photo format, 3:2 Common in photography, 16:9 Widescreen. For example: your original image is 4000 &times; 3000 px. If you reduce it proportionally to 2000 &times; 1500 px, the image keeps its 4:3 shape. But if you change it to 2000 &times; 1000 px, you&rsquo;re changing the proportions. Unless you intentionally crop the image, it can look stretched. The simple rule: if you want to keep everything in the photo, resize proportionally. If you need a different shape, crop first.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 4: CROPPING VS RESIZING */}
              <section id="cropping-vs-resizing" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Cropping vs Resizing: What&rsquo;s the Difference?
                </h2>
                <p>
                  People often use the words &ldquo;crop&rdquo; and &ldquo;resize&rdquo; interchangeably, but they do different jobs:
                </p>

                <p>
                  <strong>Resizing changes the dimensions.</strong> For example: 4000 &times; 3000 &rarr; 2000 &times; 1500. The entire image is still there. It&rsquo;s simply smaller.
                </p>

                <p>
                  <strong>Cropping removes part of the image.</strong> Imagine you&rsquo;ve taken a landscape photo, but you need a wide 16:9 banner. Instead of stretching the image, you can crop away some of the top or bottom, then resize the remaining image (e.g. Original photo &rarr; Crop to 16:9 &rarr; Resize to 1920 &times; 1080). This usually gives you a much more natural result.
                </p>

                <div className="py-2">
                  <p className="font-semibold text-[#1E50F2]">The Simple Image-Resizing Workflow:</p>
                  <p className="font-mono text-slate-800">Step 1: Crop &rarr; Step 2: Resize &rarr; Step 3: Choose format &rarr; Step 4: Check file size</p>
                  <p className="text-xs text-slate-500 pt-1">In simple terms: <strong>Crop &rarr; Resize &rarr; Format &rarr; Optimize</strong>.</p>
                </div>
              </section>

              {/* SECTION 5: EXACT SIZE & UNITS */}
              <section id="resize-to-exact-size" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Resize an Image to an Exact Size
                </h2>
                <p>
                  Sometimes &ldquo;make it smaller&rdquo; isn&rsquo;t enough. You might be told: <em>&ldquo;Upload a 1920 &times; 1080 image,&rdquo;</em> or <em>&ldquo;The image must be 1080 &times; 1080 pixels,&rdquo;</em> or perhaps a document requires <em>&ldquo;10 &times; 15 cm.&rdquo;</em> With CropMyImages, you can resize images using: <strong>Pixels (px)</strong>, <strong>Inches (in)</strong>, <strong>Centimeters (cm)</strong>, or <strong>Millimeters (mm)</strong>. So instead of repeatedly guessing and checking the image size, you can enter the dimensions you actually need.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">How to Resize an Image in Pixels</h3>
                <p>
                  Pixels are the most common measurement you&rsquo;ll encounter online. For example: 1920 &times; 1080 px means the image is 1920 pixels wide and 1080 pixels tall. If you need a square image: 1080 &times; 1080 px, both dimensions are the same. Before entering an exact size, take a moment to check the aspect ratio. If your original image doesn&rsquo;t have the same proportions as your target dimensions, consider cropping it first. That small step can make a big difference in the final result.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">What About Image Size in KB or MB?</h3>
                <p>
                  Here&rsquo;s where things can get confusing. Someone might say: <em>&ldquo;I need to reduce my image to 100KB.&rdquo;</em> That&rsquo;s not the same as saying: <em>&ldquo;I need a 1000 &times; 1000 pixel image.&rdquo;</em> One refers to file size; the other refers to image dimensions. For example: 1920 &times; 1080 px = dimensions; 500 KB = file size. A website may specify one or both (e.g. <em>Photo: JPG, maximum 100KB</em>). In that situation, simply resizing the image isn&rsquo;t necessarily enough — you may also need to optimize the file size.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">How to Resize an Image for a Website</h3>
                <p>
                  A common mistake is uploading the original photo directly from a phone or camera to a website. Modern phones can capture extremely large images. If the website only displays the image at a much smaller size, you&rsquo;re potentially sending much more image data than the page needs. A better workflow is: <strong>Crop &rarr; Resize &rarr; Choose an efficient format &rarr; Optimize</strong>.
                </p>
              </section>

              {/* SECTION 6: FORMAT MATRIX */}
              <section id="image-formats-guide" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Which Image Format Should You Use?
                </h2>
                <p>Resizing is only part of the process. The format you choose matters too:</p>

                <ul className="list-disc pl-6 space-y-2 font-medium text-slate-700">
                  <li><strong>JPG:</strong> Popular choice for photographs (travel, product, blog photos). Keeps file sizes small while maintaining good visual quality.</li>
                  <li><strong>PNG:</strong> Useful when you need transparency, lossless image compression, logos, graphics, and screenshots.</li>
                  <li><strong>WebP:</strong> Modern image format designed to provide good image quality with efficient file sizes for websites.</li>
                  <li><strong>AVIF:</strong> Next-generation image format focused on efficient compression.</li>
                </ul>
                <p className="pt-2">
                  You can convert between all these formats effortlessly using our <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">free online image converter tool</Link>.
                </p>
              </section>

              {/* SECTION 7: QUALITY LOSS & MB TO KB */}
              <section id="reduce-size-without-blurry" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Reduce an Image Size Without Making It Blurry
                </h2>
                <p>
                  If you&rsquo;re trying to reduce a photo from several megabytes to a much smaller file, don&rsquo;t immediately reduce the quality slider to the lowest setting. Instead, look at the whole image. Ask: <em>Does the image actually need to be this large?</em> If not, reduce the dimensions first. For example: 4032 &times; 3024 px might be unnecessarily large for a particular website placement. Creating a properly sized version can reduce the amount of data in the image while keeping it visually sharp.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">Can You Convert an Image From MB to KB?</h3>
                <p>
                  Technically, you&rsquo;re not &ldquo;converting MB to KB&rdquo; in the same way you convert one image format to another. You&rsquo;re reducing the file size. For example: Original 4032 &times; 3024 px (4 MB) &rarr; Optimized version 1920 &times; 1440 px (Smaller file size). The final file size depends on things such as: image dimensions, image content, file format, compression, and image quality settings.
                </p>
              </section>

              {/* SECTION 8: CROP MY IMAGES WORKFLOW */}
              <section id="how-to-resize-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Resize an Image Online With CropMyImages
                </h2>
                <p>
                  If all you need is a quick image resize, you shouldn&rsquo;t have to open complicated photo-editing software. With CropMyImages, you can resize your image through a straightforward workflow:
                </p>

                <ol className="list-decimal pl-6 space-y-2 font-medium text-slate-700">
                  <li><strong>Select your image:</strong> Upload the image you want to work with (JPG, PNG, WebP, AVIF).</li>
                  <li><strong>Set your required size:</strong> Enter the dimensions you need in px, inches, cm, or mm.</li>
                  <li><strong>Resize and export:</strong> Apply your settings and create the resized image.</li>
                </ol>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-2">How to Resize an Image to 1920 &times; 1080 Without Distortion</h3>
                <p>
                  1920 &times; 1080 is a 16:9 image size, commonly used for widescreen content. If your original photo is already 16:9, you can resize it directly. If it isn&rsquo;t, don&rsquo;t force it into 1920 &times; 1080. Instead: Original image &rarr; Crop to 16:9 &rarr; Resize to 1920 &times; 1080 &rarr; Export.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-2">How to Resize Images for Social Media</h3>
                <p>
                  Social media platforms use different image sizes for different types of content. You might need a square post, portrait post, landscape image, story, reel, or cover image. Rather than resizing every image manually, start with the dimensions required for the specific placement. CropMyImages also provides social-media presets.
                </p>
              </section>

              {/* SECTION 9: 7 TIPS CHECKLIST */}
              <section id="7-simple-tips" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  7 Simple Tips to Keep Your Images Looking Sharp
                </h2>
                <p className="text-slate-600">If you only remember a few things from this article, remember these seven tips:</p>

                <ol className="list-decimal pl-6 space-y-2 font-medium text-slate-800">
                  <li>Start with the original (highest quality available).</li>
                  <li>Avoid enlarging tiny images to prevent pixelation.</li>
                  <li>Maintain the aspect ratio to prevent stretching.</li>
                  <li>Crop before changing the shape if ratio differs.</li>
                  <li>Don&rsquo;t use unnecessarily huge dimensions for websites.</li>
                  <li>Pick the right format (JPG, PNG, WebP, AVIF).</li>
                  <li>Check the final image preview before uploading.</li>
                </ol>
              </section>

              {/* SECTION 10: FAQ */}
              <section id="faq-section" className="space-y-6 scroll-mt-28 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  <HelpCircle className="w-6 h-6 text-[#1E50F2]" />
                  <h2>Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2">
                      <h3 className="font-bold text-slate-900 text-base">{item.q}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section id="resize-easy-way" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Resize Your Image the Easy Way
                </h2>
                <p>
                  Resizing an image shouldn&rsquo;t feel like a complicated editing task. With CropMyImages, you can crop and resize your images using exact dimensions in pixels, inches, centimeters, or millimeters, work with popular image formats, and use presets for common social-media requirements.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    id="try-cropmyimages-cta-btn"
                    href="/"
                    aria-label="Try CropMyImages image resizer free"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
                  >
                    <span>Try CropMyImages Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/convert"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200"
                  >
                    <span>Format Converter &amp; Compressor Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

            </main>

          </div>
        </div>
      </article>
    </div>
  );
}
