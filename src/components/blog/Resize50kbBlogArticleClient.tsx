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

export function Resize50kbBlogArticleClient({ faqItems }: Resize50kbBlogArticleClientProps) {
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
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900">Blog</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#1E50F2] truncate max-w-[200px] sm:max-w-none">How to Resize Image to 50KB</span>
            </nav>

            {/* TAG & CATEGORY */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#1E50F2]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Image Size Reduction &bull; 50KB Guide</span>
            </div>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans max-w-3xl mx-auto"
            >
              How to Resize an Image to 50KB Without Losing Quality
            </h1>

            {/* META DETAILS (AUTHOR, DATE, READ TIME) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium pt-2">
              <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <User className="w-4 h-4 text-slate-400" />
                <span itemProp="name">CropMyImages Editorial</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <time itemProp="datePublished" dateTime="2026-08-31">August 31, 2026</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
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
                <h4 className="font-bold text-sm">Need to compress an image to 50KB now?</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">
                  Use our free, instant online cropper and file size reducer right in your browser.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span>Open Image Compressor</span>
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

              {/* ARTICLE INTRO */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  Trying to upload a photo and getting a message that says <strong>&ldquo;Image size should be less than 50KB&rdquo;</strong>?
                </p>
                <p>
                  It happens all the time.
                </p>
                <p>
                  You have a perfectly good photo on your phone, but the website refuses to accept it because the file is too large. A photo that is a few MB might need to be reduced to just 50KB before you can complete a job application, exam form, college application or other online form.
                </p>
                <p>
                  The good news is that you don&rsquo;t need Photoshop or any complicated software to do it. You can resize an image to 50KB online in just a few steps.
                </p>
                <p>
                  In this guide, we&rsquo;ll explain how to reduce an image to 50KB, how to keep it looking clear, which format to use and what to do when your image is still too large.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="what-does-50kb-mean" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What Does 50KB Mean for an Image?
                </h2>
                <p>
                  When a website asks for an image of 50KB, it is referring to the size of the actual image file. It is not the same thing as the image&rsquo;s dimensions.
                </p>
                <p>For example, an image could be:</p>
                <ul className="list-disc pl-6 space-y-2 font-medium text-slate-700">
                  <li><strong>1200 &times; 800 pixels</strong> and 500KB</li>
                  <li><strong>800 &times; 533 pixels</strong> and 150KB</li>
                  <li><strong>500 &times; 333 pixels</strong> and 45KB</li>
                </ul>
                <p>
                  The exact file size depends on the image, its dimensions, format and level of compression. This is why simply changing the width and height doesn&rsquo;t always guarantee that your image will become 50KB.
                </p>
                <p>
                  To get a large photo below 50KB, you will usually need a combination of resizing and compression.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="why-resize-to-50kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Why Do I Need to Resize an Image to 50KB?
                </h2>
                <p>
                  A lot of websites place limits on the size of images that can be uploaded. You may come across a 50KB limit when uploading a:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2">&bull; Passport-style photograph</div>
                  <div className="flex items-center gap-2">&bull; Profile picture</div>
                  <div className="flex items-center gap-2">&bull; Signature image</div>
                  <div className="flex items-center gap-2">&bull; Job application photo</div>
                  <div className="flex items-center gap-2">&bull; Exam application photo</div>
                  <div className="flex items-center gap-2">&bull; College application image</div>
                  <div className="flex items-center gap-2">&bull; Scholarship application photo</div>
                  <div className="flex items-center gap-2">&bull; Government form image</div>
                  <div className="flex items-center gap-2">&bull; ID-related document</div>
                  <div className="flex items-center gap-2">&bull; Online registration photo</div>
                </div>
                <p>
                  The exact requirement depends on the website. Some forms ask for a maximum file size, while others specify both the file size and the required image dimensions.
                </p>
                <p>
                  So before you resize your photo, check the instructions on the website where you are uploading it.
                </p>
              </section>

              {/* BORDERLESS GRAPHICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                <div className="space-y-2 text-center">
                  <img
                    src="/enter-target-size.webp"
                    alt="Select 50KB Target Size"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">1. Set Target File Size to 50KB</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/cropfirstrule.webp"
                    alt="Crop Photo First"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">2. Crop Unnecessary Background</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/modernformats.webp"
                    alt="Choose JPG or WebP Format"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">3. Export JPG / WebP Format</span>
                </div>
              </div>

              {/* SECTION 3 */}
              <section id="how-to-resize-to-50kb-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Resize an Image to 50KB Online
                </h2>
                <p>
                  The easiest way to resize a photo to 50KB is to use an online image resizing and compression tool. With CropMyImages, the basic process is simple:
                </p>
                <ol className="list-decimal pl-6 space-y-4 text-slate-800">
                  <li>
                    <strong>Select your image:</strong> Start with the original photo you want to reduce. If the photo is on your phone, you can select it directly from your gallery. If you&rsquo;re using a computer, choose the image from your files. Whenever possible, use the original image instead of a screenshot.
                  </li>
                  <li>
                    <strong>Upload the image:</strong> Upload your photo to the image resizing tool. Depending on the file you&rsquo;re using, you can work with formats such as JPG, JPEG, PNG, or WEBP.
                  </li>
                  <li>
                    <strong>Choose 50KB as the target size:</strong> If your website says that the image must be 50KB or less, select 50KB as your target. If the requirement says &ldquo;below 50KB&rdquo;, a file of 47KB or 48KB will usually be a safer choice.
                  </li>
                  <li>
                    <strong>Resize the dimensions if necessary:</strong> If the form specifies required dimensions (e.g. 200 &times; 230 pixels, max 50KB), set the pixel dimensions along with the 50KB target.
                  </li>
                  <li>
                    <strong>Download your resized image:</strong> Once the image has been reduced, check the final file size. If it is below the required limit and still looks clear, your image is ready to upload.
                  </li>
                </ol>
              </section>

              {/* SECTION 4 */}
              <section id="compress-without-blurry" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Compress an Image to 50KB Without Making It Blurry
                </h2>
                <p>
                  If you simply reduce the quality as much as possible, you can make almost any image smaller—but the result may look terrible, showing blurry faces, blocky artifact areas, pixelation, or loss of small details.
                </p>
                <p className="font-semibold text-slate-900">A better approach is: Crop &rarr; Resize &rarr; Compress &rarr; Check</p>

                <div className="space-y-3 pl-4 border-l-2 border-[#1E50F2]">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Crop unnecessary parts</h4>
                    <p className="text-sm text-slate-600">If your photo has a lot of empty space around the subject, consider cropping it first. There is no reason to spend your limited 50KB on background space.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Reduce the dimensions</h4>
                    <p className="text-sm text-slate-600">Photos from modern smartphones are thousands of pixels wide. Reducing the dimensions first makes it much easier to reach 50KB while keeping the image sharp.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Choose the right format</h4>
                    <p className="text-sm text-slate-600">For normal photographs, JPG or WebP is a great choice. JPG compression works particularly well for photos, making it easier to achieve a small file size.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Don&rsquo;t over-compress</h4>
                    <p className="text-sm text-slate-600">If your image is 55KB, you only need to remove a few KB (55KB &rarr; 51KB &rarr; 48KB) rather than destroying the quality.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 5 */}
              <section id="can-i-resize-jpg-to-50kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Can I Resize a JPG Image to 50KB?
                </h2>
                <p>
                  <strong>Yes.</strong> In fact, JPG is one of the most practical formats when you need to compress a photo to 50KB.
                </p>
                <p>
                  If your original photograph is a large JPG, you can reduce its dimensions and then compress it until it reaches the required file size. For most photographs, JPG provides a good balance between file size and image quality.
                </p>
              </section>

              {/* SECTION 6 */}
              <section id="can-i-resize-png-to-50kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Can I Resize a PNG to 50KB?
                </h2>
                <p>
                  <strong>Yes, but the result can vary depending on the image.</strong>
                </p>
                <p>
                  PNG is great for graphics, screenshots, logos and images that require transparency. However, photographs can often become much larger as PNG files.
                </p>
                <p>
                  If you&rsquo;re trying to compress a photo to 50KB and the website accepts JPG, converting the photograph to JPG can make it easier to reach the limit. If the website specifically requires PNG, keep the PNG format and reduce the dimensions and file size accordingly.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="what-if-still-bigger-than-50kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What If My Image Is Still Bigger Than 50KB?
                </h2>
                <p>
                  Don&rsquo;t panic. This is common with photos taken using modern smartphones because original files can be several MB. If your image is still above 50KB, try the following:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Reduce the image dimensions:</strong> A very large image contains millions of pixels that may not be necessary for a small online upload.</li>
                  <li><strong>Crop the image:</strong> Remove unnecessary background or areas that aren&rsquo;t needed.</li>
                  <li><strong>Use JPG for photographs:</strong> If your image is a photo and the website accepts JPG, converting from PNG to JPG will significantly reduce the file size.</li>
                  <li><strong>Compress again gradually:</strong> Compress the image gradually rather than immediately choosing the lowest quality setting.</li>
                </ul>
              </section>

              {/* SECTION 8 */}
              <section id="what-if-looks-blurry" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What If My 50KB Image Looks Blurry?
                </h2>
                <p>
                  If your image looks blurry after compression, you may have reduced the quality too much. Instead of lowering the quality again, try reducing the image dimensions first.
                </p>
                <p>
                  For example, if you&rsquo;re trying to compress a 4000 &times; 3000 pixel photo to 50KB, you&rsquo;re asking a very small file to store a huge amount of image information. Reducing the dimensions first gives the compressor fewer pixels to work with, which often produces a much sharper result.
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="what-dimensions-should-50kb-be" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What Dimensions Should a 50KB Image Be?
                </h2>
                <p>
                  There is no single width and height that automatically makes an image 50KB. Two images with exactly the same dimensions can have completely different file sizes.
                </p>
                <p>
                  For example, a simple image with a plain background compresses much more easily than a detailed photograph containing trees, textures and shadows. If the website specifies dimensions, follow those instructions. If it only gives a maximum file size of 50KB, you have more flexibility.
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="how-to-resize-on-phone" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Resize an Image to 50KB on a Phone
                </h2>
                <p>
                  You can do this directly from your phone without installing any editing app:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700 font-medium">
                  <li>Open CropMyImages in your phone browser.</li>
                  <li>Select the photo from your gallery.</li>
                  <li>Set the target file size to 50KB.</li>
                  <li>Adjust the dimensions if the application requires them.</li>
                  <li>Compress or resize the image.</li>
                  <li>Check the final file size and download.</li>
                </ol>
              </section>

              {/* SECTION 11 */}
              <section id="what-to-check-before-uploading" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  50KB Image: What Should You Check Before Uploading?
                </h2>
                <p>Before clicking the final Upload button, check these 6 things:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-800 bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> File size: Below 50KB limit?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> Format: JPG or PNG accepted?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> Dimensions: Width &amp; height correct?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> Quality: Image clear &amp; readable?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> Orientation: Correct direction?</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2]" /> File name: Proper naming?</div>
                </div>
              </section>

              {/* SECTION 12 & 13 */}
              <section id="50kb-vs-100kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  50KB vs 100KB: Which Is Better?
                </h2>
                <p>
                  A 100KB image can usually retain more detail than a 50KB image. But if the website specifically says maximum 50KB, you should follow that requirement rather than uploading a larger file. Never upload a 100KB image to a form that clearly specifies a 50KB limit.
                </p>
              </section>

              <section id="should-i-aim-for-exactly-50kb" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Should I Aim for Exactly 50KB?
                </h2>
                <p>
                  <strong>Not necessarily.</strong> If the requirement says &ldquo;Maximum file size: 50KB&rdquo;, a 47KB or 48KB image is perfectly fine and often safer because different portals calculate file sizes slightly differently.
                </p>
              </section>

              {/* SECTION 14 */}
              <section id="resize-with-cropmyimages" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Resize Your Image to 50KB With CropMyImages
                </h2>
                <p>
                  With CropMyImages, you can resize and reduce your image size online and prepare it for upload in seconds. Upload your image, set your 50KB limit, make your adjustments, and download your file.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
                  >
                    <span>Resize &amp; Compress Image Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* FAQ SECTION */}
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

            </main>

          </div>
        </div>
      </article>
    </div>
  );
}
