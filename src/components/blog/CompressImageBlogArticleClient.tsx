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
  ShieldCheck,
  Zap,
  HardDrive
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';

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

export function CompressImageBlogArticleClient({ faqItems }: CompressImageBlogArticleClientProps) {
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
    <div className="relative w-full">
      {/* READING PROGRESS BAR (FIXED TOP) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-[#1E50F2] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article itemScope itemType="https://schema.org/BlogPosting" className="w-full">
        {/* HERO ARTICLE HEADER WITH INTEGRATED NAVBAR */}
        <header className="bg-sky-cloud-hero border-b border-zinc-200/60 pb-12 sm:pb-16 pt-4">
          <Navbar />
          <div className="max-w-4xl mx-auto space-y-6 text-center pt-8 px-4 sm:px-6 lg:px-8">
            
            {/* BREADCRUMB NAVIGATION */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] shrink-0" />
              <span className="text-slate-900">Blog</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] shrink-0" />
              <span className="text-[#1E50F2] truncate max-w-[200px] sm:max-w-none">Compress Image Online</span>
            </nav>

            {/* H1 TITLE */}
            <h1
              itemProp="headline"
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans max-w-3xl mx-auto"
            >
              Compress Image Online Without Losing Too Much Quality
            </h1>

            {/* META DETAILS (AUTHOR, DATE, READ TIME) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-semibold pt-2">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <User className="w-4 h-4 text-[#1E50F2] shrink-0" />
                <span itemProp="name">CropMyImages Editorial</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
                <Calendar className="w-4 h-4 text-[#1E50F2] shrink-0" />
                <time itemProp="datePublished" dateTime="2026-09-01">September 1, 2026</time>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
                <Clock className="w-4 h-4 text-[#1E50F2] shrink-0" />
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

              {/* QUICK RESIZE & COMPRESS TOOL CALL-TO-ACTION CARD */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 space-y-3 shadow-lg">
                <h4 className="font-bold text-sm">Need to compress an image right now?</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">
                  Compress JPG, PNG, WEBP, and AVIF files to target KB or MB file sizes instantly.
                </p>
                <Link
                  href="/convert"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#1E50F2] font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span>Open Online Image Compressor</span>
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
                    src="/enter-target-size.webp"
                    alt="Target File Size Compression in KB or MB"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">1. Target File Size Compression (KB / MB)</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/blogimages/Export-JPG-WebP-Format.webp"
                    alt="Compress JPG and PNG Images Online"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">2. Compress JPG &amp; PNG Images Online</span>
                </div>
                <div className="space-y-2 text-center">
                  <img
                    src="/blogimages/modernformats.webp"
                    alt="Lossless and Lossy Compression Formats"
                    width={500}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <span className="text-xs text-slate-500 font-medium">3. Lossless &amp; Lossy Compression Options</span>
                </div>
              </div>

              {/* ARTICLE INTRO */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  Images are an important part of almost every website, social media post, online form, presentation, and digital document. But there is one common problem: large image file sizes.
                </p>
                <p>
                  A high-resolution photo can look great, but if the file is too large, it can take longer to upload, share, or load on a website. This is where image compression can help.
                </p>
                <p>
                  If you are looking for a simple way to <strong>compress an image online</strong>, you can use our <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">free online image compressor</Link> to reduce the file size while keeping the image looking clear and usable.
                </p>
                <p>
                  In this guide, we&rsquo;ll explain what image compression is, why it matters, and how you can easily compress JPG, PNG, and other image files online.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="what-is-image-compression" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What Does It Mean to Compress an Image?
                </h2>
                <p>
                  To compress an image means reducing its file size by removing unnecessary data from the image. For example, a photo that is 5 MB may be compressed to a much smaller size, making it easier to upload or share.
                </p>
                <p>The goal is not simply to make an image smaller. Good compression tries to find a balance between:</p>
                <ul className="list-disc pl-6 space-y-1.5 font-medium text-slate-700">
                  <li>File size</li>
                  <li>Image quality</li>
                  <li>Loading speed</li>
                  <li>Storage space</li>
                </ul>
                <p>
                  The right amount of compression depends on how you plan to use the image.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="why-should-you-compress-images" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Why Should You Compress Images?
                </h2>
                <p>
                  Large image files can create several problems, especially when you are uploading images to a website or sending them online.
                </p>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">1. Faster Website Loading</h3>
                    <p className="text-slate-700">
                      Large images can take longer to load. Compressing images can reduce their file size and help improve page loading performance. This is particularly useful for websites that contain many product images, blog images, banners, or photographs.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">2. Easier Uploads</h3>
                    <p className="text-slate-700">
                      Many websites and online forms have file-size limits. If your image is too large, you may see an error when trying to upload it. Compressing the image can help bring the file within the required limit.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">3. Save Storage Space</h3>
                    <p className="text-slate-700">
                      Compressed images take up less storage space. This is useful when you have hundreds or thousands of photos stored on your phone, computer, website, or cloud storage.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">4. Faster Sharing</h3>
                    <p className="text-slate-700">
                      Smaller image files are generally easier and quicker to upload and share through email, messaging apps, websites, and social media platforms.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="how-to-compress-an-image-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Compress an Image Online
                </h2>
                <p>
                  You don&rsquo;t always need complicated photo-editing software to reduce an image&rsquo;s file size. A simple online image compressor can do the job in a few steps:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-slate-800 font-medium">
                  <li>
                    <strong>Step 1: Choose Your Image</strong> &mdash; Select the photo or image you want to compress from your device.
                  </li>
                  <li>
                    <strong>Step 2: Upload the Image</strong> &mdash; Upload your image to an online image compression tool like <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">CropMyImages Converter &amp; Compressor</Link>. You can compress formats such as JPG, JPEG, PNG, WEBP, AVIF, and GIF.
                  </li>
                  <li>
                    <strong>Step 3: Compress the Image</strong> &mdash; The tool processes the image and reduces its file size based on your quality slider or KB target limit.
                  </li>
                  <li>
                    <strong>Step 4: Download the Compressed Image</strong> &mdash; Once compression is complete, download the smaller image and check that the quality is suitable for your purpose.
                  </li>
                </ol>
              </section>

              {/* SECTION 4 */}
              <section id="compress-jpg-images-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Compress JPG Images Online
                </h2>
                <p>
                  JPG, also known as JPEG, is one of the most commonly used image formats. It is widely used for photographs, website images, social media graphics, blog images, and digital documents.
                </p>
                <p>
                  If you have a large JPG file, you can <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">compress JPG images online</Link> to reduce the file size while keeping the image visually clear. JPG compression is especially useful for photographs because JPG files are already designed to store photographic images efficiently.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="compress-png-images-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Compress PNG Images Online
                </h2>
                <p>
                  PNG is another popular image format, especially when transparency or sharper graphics are required. PNG files can sometimes be larger than JPG files, particularly when they contain detailed graphics.
                </p>
                <p>
                  If you have a large PNG, our <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">online PNG compressor</Link> can help reduce its file size. PNG is commonly used for logos, icons, illustrations, screenshots, and graphics with transparent backgrounds. However, the best format depends on what you are using the image for.
                </p>
              </section>

              {/* SECTION 6 */}
              <section id="does-compressing-reduce-quality" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Does Compressing an Image Reduce Quality?
                </h2>
                <p>
                  It can, but it doesn&rsquo;t always have to be noticeable. Image compression generally falls into two categories: lossy compression and lossless compression.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">Lossy Compression</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Lossy compression removes some image data to achieve a smaller file size. It can provide significant file-size reduction, but excessive compression may make an image look blurry, pixelated, or less detailed.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">Lossless Compression</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Lossless compression reduces file size without permanently removing image information. The reduction may not be as large as with lossy compression, but it is useful when maintaining the original image information is important.
                    </p>
                  </div>
                </div>
                <p>
                  The key is to choose the right level of compression instead of trying to make every image as small as possible.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="compression-vs-resizing" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Image Compression vs Image Resizing
                </h2>
                <p>
                  Image compression and image resizing are often confused, but they are not the same thing:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 font-medium">
                  <li><strong>Image compression</strong> reduces the file size in KB or MB.</li>
                  <li><strong>Image resizing</strong> changes the pixel dimensions of an image, such as changing it from 4000 &times; 3000 pixels to 1600 &times; 1200 pixels.</li>
                </ul>
                <p>
                  In many cases, using both together can significantly reduce the final file size. For example, if you have a large photograph that is much bigger than the size needed for your website, you could first <Link href="/" className="text-[#1E50F2] font-semibold hover:underline">resize the image</Link> and then <Link href="/convert" className="text-[#1E50F2] font-semibold hover:underline">compress it</Link>.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="what-file-size-to-aim-for" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  What Image File Size Should You Aim For?
                </h2>
                <p>
                  There isn&rsquo;t one perfect image size for every situation. The ideal file size depends on where the image will be used:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                        <th className="py-3 px-4">Use Case</th>
                        <th className="py-3 px-4">Suggested Approach</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Website images</td>
                        <td className="py-3 px-4">Compress and resize where appropriate</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Blog images</td>
                        <td className="py-3 px-4">Keep them clear but avoid unnecessarily large files</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Social media</td>
                        <td className="py-3 px-4">Follow the platform&rsquo;s recommended dimensions</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Email attachments</td>
                        <td className="py-3 px-4">Reduce file size for easier sharing</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Online forms</td>
                        <td className="py-3 px-4">Meet the website&rsquo;s maximum file-size requirement</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Documents</td>
                        <td className="py-3 px-4">Compress large images before inserting them</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="pt-2">
                  If a website specifically asks for an image under a certain size, such as 50 KB, 100 KB, or 200 KB, check our guide on <Link href="/blog/how-to-resize-image-to-50kb" className="text-[#1E50F2] font-semibold hover:underline">how to resize an image to 50KB</Link>.
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="compress-to-specific-size" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  How to Compress an Image to a Specific Size
                </h2>
                <p>
                  Sometimes you don&rsquo;t just want to make an image smaller. You need it to meet a specific file-size requirement (e.g. <em>&ldquo;Compress image to 100KB&rdquo;</em>).
                </p>
                <p>A useful workflow is:</p>
                <ol className="list-decimal pl-6 space-y-1.5 text-slate-700 font-medium">
                  <li>Upload the original image.</li>
                  <li>Resize it if the dimensions are unnecessarily large.</li>
                  <li>Compress the image to your target KB or MB limit.</li>
                  <li>Check the resulting file size.</li>
                  <li>Repeat with different settings if necessary.</li>
                  <li>Download the final image.</li>
                </ol>
              </section>

              {/* SECTION 10 */}
              <section id="tips-for-compressing-without-losing-quality" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Tips for Compressing Images Without Losing Visible Quality
                </h2>
                <p className="text-slate-600">Want to reduce image size while keeping it looking good? Try these simple tips:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-800 bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] shrink-0 mt-0.5" />
                    <div><strong>Use the Right Format:</strong> JPG for photographs; PNG for transparency.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] shrink-0 mt-0.5" />
                    <div><strong>Don&rsquo;t Over-Compress:</strong> Avoid setting quality to minimum.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] shrink-0 mt-0.5" />
                    <div><strong>Resize Oversized Images:</strong> Scale down pixels first before compressing.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] shrink-0 mt-0.5" />
                    <div><strong>Check Final Preview:</strong> Ensure text &amp; details remain crisp.</div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E50F2] shrink-0 mt-0.5" />
                    <div><strong>Keep Original Backup:</strong> Always keep a high-res original saved safely.</div>
                  </div>
                </div>
              </section>

              {/* SECTION 11 */}
              <section id="is-it-safe-to-compress-online" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
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
              <section id="why-use-cropmyimages" className="space-y-4 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Why Use CropMyImages to Compress Images?
                </h2>
                <p>
                  CropMyImages is designed to make common image-editing tasks simple and accessible. Instead of opening complicated software just to prepare an image for uploading, you can use our free online image tools for everyday tasks such as resizing, cropping, and reducing image file size.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/convert"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E50F2] text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
                  >
                    <span>Compress Image Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200"
                  >
                    <span>Resize &amp; Crop Studio</span>
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
