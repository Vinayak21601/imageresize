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
import { Footer } from '@/components/common/Footer';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

export interface FAQItem {
  q: string;
  a: string;
}

interface FreeOnlineCropBlogArticleClientProps {
  faqItems: FAQItem[];
}

const TOC_SECTIONS = [
  { id: 'what-does-it-mean-to-crop', title: '1. What Does It Mean to Crop an Image?' },
  { id: 'how-do-i-crop-online-for-free', title: '2. How Do I Crop an Image Online for Free?' },
  { id: 'is-there-a-free-online-cropper', title: '3. Is There a Free Online Image Cropper?' },
  { id: 'crop-without-downloading-software', title: '4. Crop Without Downloading Software' },
  { id: 'crop-without-photoshop', title: '5. Can I Crop an Image Without Photoshop?' },
  { id: 'crop-jpg-online', title: '6. How Do I Crop a JPG Image Online?' },
  { id: 'crop-png-online', title: '7. How Do I Crop a PNG Image Online?' },
  { id: 'crop-on-phone-for-free', title: '8. Can I Crop an Image on My Phone for Free?' },
  { id: 'crop-to-specific-size', title: '9. How Do I Crop a Picture to a Specific Size?' },
  { id: 'what-is-aspect-ratio', title: '10. What Is an Aspect Ratio in Image Cropping?' },
  { id: 'crop-to-square', title: '11. How Do I Crop an Image to a Square?' },
  { id: 'crop-into-circle', title: '12. How Do I Crop an Image Into a Circle?' },
  { id: 'crop-custom-irregular-shape', title: '13. Can I Crop Into a Custom or Irregular Shape?' },
  { id: 'crop-around-person', title: '14. How Do I Crop Around a Person in a Photo?' },
  { id: 'does-cropping-reduce-quality', title: '15. Does Cropping Reduce Image Quality?' },
  { id: 'cropping-vs-resizing', title: '16. Difference Between Cropping and Resizing' },
  { id: 'crop-without-losing-quality', title: '17. How Do I Crop Without Losing Quality?' },
  { id: 'why-use-online-cropper', title: '18. Why Should I Use an Online Image Cropper?' },
  { id: 'types-of-images-supported', title: '19. What Types of Images Can I Crop Online?' },
  { id: 'cropmyimages-cta', title: '20. Crop Your Images Online With CropMyImages' },
  { id: 'faq-section', title: '21. Frequently Asked Questions (FAQ)' },
];

const inlineLinkCls =
  'text-[#1E50F2] dark:text-sky-400 font-semibold underline decoration-[#1E50F2]/40 dark:decoration-sky-400/40 hover:decoration-[#1E50F2] dark:hover:decoration-sky-400 transition-colors';

export function FreeOnlineCropBlogArticleClient({ faqItems }: FreeOnlineCropBlogArticleClientProps) {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('what-does-it-mean-to-crop');

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
                Crop Image Online for Free
              </span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              How Do I Crop an Image Online for Free? Easy Guide
            </h1>

            {/* META DETAILS */}
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
                <User className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400" />
                <span itemProp="name">CropMyImages Team</span>
              </div>

              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-2xs transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-slate-300'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400" />
                <time dateTime="2026-09-05" itemProp="datePublished">
                  September 5, 2026
                </time>
              </div>

              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-2xs transition-colors duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-slate-300'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400" />
                <span>6 min read</span>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN BODY LAYOUT (STICKY SIDEBAR + CONTENT) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT STICKY SIDEBAR (TABLE OF CONTENTS + QUICK TOOL LINK) */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                
                {/* TABLE OF CONTENTS CARD */}
                <div
                  className={`p-6 rounded-3xl border transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/90 border-white/10 shadow-lg'
                      : 'bg-white border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5 font-bold text-base mb-4 pb-3 border-b border-slate-100 dark:border-white/10">
                    <List className="w-5 h-5 text-[#1E50F2] dark:text-sky-400" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 text-xs font-medium scrollbar-thin">
                    {TOC_SECTIONS.map((sec) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          onClick={(e) => scrollToSection(e, sec.id)}
                          className={`block py-1.5 px-3 rounded-xl transition-all duration-200 truncate ${
                            isActive
                              ? 'bg-[#1E50F2]/10 dark:bg-sky-500/15 text-[#1E50F2] dark:text-sky-400 font-bold translate-x-1'
                              : isDark
                              ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          {sec.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* QUICK TOOL CTA SIDEBAR CARD */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E50F2] to-blue-700 text-white shadow-xl space-y-4">
                  <h3 className="text-lg font-bold leading-tight">Need to Crop an Image Online Now?</h3>
                  <p className="text-xs text-blue-100 leading-relaxed font-normal">
                    Crop JPG, PNG, and photos online for free. Adjust aspect ratios or custom dimensions in seconds without Photoshop.
                  </p>
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs shadow-md hover:bg-blue-50 transition-all active:scale-95"
                  >
                    <span>Crop Your Image Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </aside>

            {/* MAIN ARTICLE CONTENT */}
            <main className="flex-1 max-w-3xl space-y-10 text-base leading-relaxed font-normal">
              
              {/* INTRO PARAGRAPHS */}
              <div className="space-y-4 text-lg">
                <p>
                  If you need to <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop an image online for free</Link>, you don&rsquo;t necessarily need expensive photo-editing software or advanced editing skills. An <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>online image cropper</Link> can help you quickly remove unwanted areas, change the composition of a photo, or prepare an image for a website, social media platform, profile picture, or other digital use.
                </p>
                <p>
                  But how do you <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop an image online</Link>? Can you <Link href="/convert/jpg-to-png" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop JPG and PNG images</Link> for free? Can you <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop a picture without Photoshop</Link>? And what is the easiest way to <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop an image while maintaining its quality</Link>?
                </p>
                <p>
                  This guide answers the most common questions about free online image cropping and explains how to crop photos, pictures, JPGs, PNGs, and other image files directly from your browser.
                </p>
              </div>

              {/* SECTION 1 */}
              <section
                id="what-does-it-mean-to-crop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Does It Mean to Crop an Image?
                </h2>
                <p>
                  Cropping an image means removing unwanted portions of a photo or picture to keep only the area you need.
                </p>
                <p>
                  For example, if your photo contains too much empty space around the subject, you can <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop the edges of your image</Link> to focus attention on the important part of the photo.
                </p>
                <p className="font-semibold">Cropping can help you:</p>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium p-5 rounded-2xl border transition-colors duration-300 ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10 text-slate-300'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Remove unwanted areas from a photo</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Focus on a specific subject</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Change the composition of an image</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Create a specific image size</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Prepare images for social media</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Create profile pictures</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Optimize images for websites</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Remove unnecessary space</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Create thumbnails</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" /> Prepare product images</div>
                </div>
                <p>
                  Cropping is different from resizing. Cropping removes part of an image, while <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>resizing changes the dimensions</Link> of the entire image.
                </p>
              </section>

              {/* SECTION 2 */}
              <section
                id="how-do-i-crop-online-for-free"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop an Image Online for Free?
                </h2>
                <p>
                  Cropping an image online is usually a simple process.
                </p>
                <div className="space-y-4 pt-2">
                  <div className={`p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1">Step 1: Upload Your Image</h3>
                    <p className="text-sm">Start by uploading the photo or image you want to crop to our <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>free online image cropper</Link>. Depending on the tool, you can upload common formats such as JPG, JPEG, PNG, and WebP.</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1">Step 2: Select the Crop Area</h3>
                    <p className="text-sm">Once your image is loaded, choose the area you want to keep. Drag the crop box around the image and adjust its edges or corners freely.</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1">Step 3: Adjust the Crop</h3>
                    <p className="text-sm">Move and resize the selection box until you have the exact composition you want. Remove unnecessary areas from the top, bottom, left, or right sides of your photo.</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1">Step 4: Apply the Crop</h3>
                    <p className="text-sm">Once you are happy with your selection, apply the crop. The cropper instantly creates a clean, cropped version of your picture.</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1">Step 5: Download Your Cropped Image</h3>
                    <p className="text-sm">Download the finished image and use it wherever you need. The entire process is completed directly in your browser without installing desktop software.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 3 */}
              <section
                id="is-there-a-free-online-cropper"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Is There a Free Online Image Cropper?
                </h2>
                <p>
                  Yes. There are online tools like <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link> that allow you to crop images without paying for traditional photo-editing software.
                </p>
                <p>
                  A <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>free online image cropper</Link> is useful when you only need basic image editing and don&rsquo;t want to install a desktop application. For simple tasks such as cropping, resizing, or adjusting an image, an online tool is much faster and easier.
                </p>
                <p className="font-semibold">When choosing a free image cropper, look for key features such as:</p>
                <ul className={`list-disc pl-6 space-y-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>Easy image upload</li>
                  <li><Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>JPG and PNG support</Link></li>
                  <li>Custom crop dimensions</li>
                  <li>Aspect ratio options</li>
                  <li>Freeform and freehand cropping</li>
                  <li>High-quality output without watermarks</li>
                  <li>Browser-based client-side editing</li>
                  <li>Instant easy downloading</li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section
                id="crop-without-downloading-software"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Can I Crop a Photo Online Without Downloading Software?
                </h2>
                <p>
                  One of the main advantages of browser-based image cropping tools is that you can edit an image directly inside your web browser. You don&rsquo;t necessarily need Photoshop or a heavy desktop photo editor.
                </p>
                <p>
                  The typical process is simple: <strong>Open online cropper &rarr; Upload photo &rarr; Select crop area &rarr; Crop &rarr; Download.</strong>
                </p>
                <p>
                  This makes <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>online photo cropping</Link> particularly convenient when using a computer or mobile device and needing to make a quick, high-precision edit.
                </p>
              </section>

              {/* SECTION 5 */}
              <section
                id="crop-without-photoshop"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop an Image Without Photoshop?
                </h2>
                <p>
                  Yes. You don&rsquo;t need Photoshop just to crop an image. While professional software provides complex layering features, a clean <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>online image cropper</Link> is more than enough for everyday cropping tasks.
                </p>
                <p>
                  If your goal is simply to remove unwanted background areas, alter framing, or <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop a photo to a specific size</Link>, an online web tool provides a much faster workflow.
                </p>
              </section>

              {/* SECTION 6 */}
              <section
                id="crop-jpg-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop a JPG Image Online?
                </h2>
                <p>
                  To <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop a JPG online</Link>, upload your JPG or JPEG file to our cropping tool and select the area you want to keep. After adjusting the selection, apply the crop and download your file.
                </p>
                <p>
                  JPG is one of the most widely used image formats for photographs, website graphics, blog pictures, and social media media. If you also need to shrink the resulting file size after cropping, you can use our <Link href="/blog/compress-image" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>image compression guide</Link> or format tools.
                </p>
              </section>

              {/* SECTION 7 */}
              <section
                id="crop-png-online"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop a PNG Image Online?
                </h2>
                <p>
                  <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>Cropping a PNG image online</Link> works seamlessly. Upload your PNG, select your target area, adjust the crop boundary, and download.
                </p>
                <p>
                  PNG is particularly useful when an image contains transparency, logos, icons, or vector graphics. Our cropper preserves transparent backgrounds when exporting PNG files. If you need to convert formats, check out our <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>PNG to JPG converter</Link>.
                </p>
              </section>

              {/* SECTION 8 */}
              <section
                id="crop-on-phone-for-free"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop an Image on My Phone for Free?
                </h2>
                <p>
                  Yes! Browser-based tools like <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link> are fully optimized for smartphones and tablets.
                </p>
                <p>
                  Open your mobile browser (Safari, Chrome, Firefox), upload a photo directly from your camera roll, adjust the crop selection using touchscreen gestures, and save your cropped picture instantly. No app installation needed.
                </p>
              </section>

              {/* SECTION 9 */}
              <section
                id="crop-to-specific-size"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop a Picture to a Specific Size?
                </h2>
                <p>
                  If your upload portal requires exact pixel dimensions (such as 500 &times; 500 px, 1080 &times; 1080 px, or 1200 &times; 630 px), choose a tool that allows you to enter specific width and height values.
                </p>
                <p>
                  If you need a specific target file size in kilobytes for application portals, read our detailed tutorial on <Link href="/blog/how-to-resize-image-to-50kb" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>how to resize images to 50KB</Link>.
                </p>
              </section>

              {/* SECTION 10 */}
              <section
                id="what-is-aspect-ratio"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is an Aspect Ratio in Image Cropping?
                </h2>
                <p>
                  An aspect ratio describes the proportional relationship between an image&rsquo;s width and height.
                </p>
                <div className={`p-5 rounded-2xl border space-y-2 font-medium ${isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>1:1</strong> &mdash; Square format (Profile pictures, Instagram posts)</li>
                    <li><strong>4:3</strong> &mdash; Standard digital camera photo format</li>
                    <li><strong>3:2</strong> &mdash; Traditional 35mm film photography ratio</li>
                    <li><strong>16:9</strong> &mdash; Modern HD widescreen video &amp; banners</li>
                    <li><strong>9:16</strong> &mdash; Vertical mobile story format (TikTok, Reels, Shorts)</li>
                  </ul>
                </div>
              </section>

              {/* SECTION 11 */}
              <section
                id="crop-to-square"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop an Image to a Square?
                </h2>
                <p>
                  To <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>crop an image into a square</Link>, choose a 1:1 aspect ratio preset. Upload your picture, position the square crop box centered over your subject, apply the crop, and download.
                </p>
              </section>

              {/* SECTION 12 */}
              <section
                id="crop-into-circle"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop an Image Into a Circle?
                </h2>
                <p>
                  A standard crop creates rectangular boundaries. If you need a circular image for avatars, team profile photos, or website icons, select a circular shape mask in our <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>online image cropper tool</Link>.
                </p>
              </section>

              {/* SECTION 13 */}
              <section
                id="crop-custom-irregular-shape"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Can I Crop an Image Into a Custom or Irregular Shape?
                </h2>
                <p>
                  Yes! If you want to crop around custom outlines, curves, or irregular figures, refer to our comprehensive step-by-step guide on <Link href="/blog/how-to-draw-a-custom-freehand-shape-and-crop-an-image" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>how to draw a custom freehand shape and crop an image</Link>.
                </p>
              </section>

              {/* SECTION 14 */}
              <section
                id="crop-around-person"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop Around a Person in a Photo?
                </h2>
                <p>
                  To crop around a person rather than leaving a broad box around them, use a freehand outline selector. For festive portraits, read our guide on <Link href="/blog/how-to-crop-festive-images-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>cropping festive portrait photos</Link>.
                </p>
              </section>

              {/* SECTION 15 */}
              <section
                id="does-cropping-reduce-quality"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Does Cropping Reduce Image Quality?
                </h2>
                <p>
                  Cropping removes outer pixel data. If you start with a high-resolution photo and crop a moderate area, visual quality remains sharp. However, cropping a tiny fragment and stretching it larger can make pixels visible. Always start with high-quality source photos.
                </p>
              </section>

              {/* SECTION 16 */}
              <section
                id="cropping-vs-resizing"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Is the Difference Between Cropping and Resizing?
                </h2>
                <p>
                  <strong>Cropping</strong> removes unwanted outer portions of an image while preserving the scale of internal subjects.
                </p>
                <p>
                  <strong>Resizing</strong> scales the entire image down or up (changing width, height, or file size). Learn more in our guide on <Link href="/blog/how-to-resize-image-without-losing-quality" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>resizing images without quality loss</Link>.
                </p>
              </section>

              {/* SECTION 17 */}
              <section
                id="crop-without-losing-quality"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  How Do I Crop an Image Without Losing Quality?
                </h2>
                <p>
                  To keep your cropped photos crisp: start with high-resolution original files, avoid repeated lossy compression saves, export in PNG when preserving vector lines or text, and use <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages online cropper</Link>.
                </p>
              </section>

              {/* SECTION 18 */}
              <section
                id="why-use-online-cropper"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Why Should I Use an Online Image Cropper?
                </h2>
                <div className={`p-6 rounded-2xl border space-y-3 font-medium ${isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <p><strong>Convenience:</strong> Edit photos directly inside your web browser.</p>
                  <p><strong>Speed:</strong> Crop photos, JPGs, and PNGs in seconds.</p>
                  <p><strong>Accessibility:</strong> Works on desktop, laptop, iPhone, and Android devices.</p>
                  <p><strong>Simplicity:</strong> Clean UI requiring no complex software skills.</p>
                  <p><strong>Cost:</strong> 100% free with no hidden fees or watermarks.</p>
                </div>
              </section>

              {/* SECTION 19 */}
              <section
                id="types-of-images-supported"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  What Types of Images Can I Crop Online?
                </h2>
                <p>
                  With <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link>, you can crop all standard image formats including <Link href="/convert/png-to-jpg" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>JPG, JPEG, PNG, WebP, GIF, and BMP</Link>.
                </p>
              </section>

              {/* SECTION 20 CTA */}
              <section
                id="cropmyimages-cta"
                className={`space-y-4 scroll-mt-28 border-t pt-8 transition-colors duration-300 ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Crop Your Images Online With CropMyImages
                </h2>
                <p>
                  Need a quick and simple way to crop an image online for free? <Link href="/" target="_blank" rel="noopener noreferrer" className={inlineLinkCls}>CropMyImages</Link> is designed to make photo cropping effortless without requiring complicated editing software.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Crop Image Online Now</span>
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
                    <span>Format Converter &amp; Compressor</span>
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
      <Footer />
    </div>
  );
}
