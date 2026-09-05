import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Crop,
  Search,
  ChevronRight,
  Layers,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Image Processing Blog & How-To Guides | CropMyImages',
  description:
    'Free guides and tutorials on image cropping, unit resizing (px, in, cm, mm), target file size compression (KB/MB), format conversions, and festive photo editing.',
  keywords: [
    'image resizer blog',
    'how to crop photos',
    'compress image guide',
    'aspect ratio cropper guide',
    'photo editing tutorials',
    'festive photo crop tips'
  ],
  alternates: {
    canonical: 'https://cropmyimages.com/blog',
  },
  openGraph: {
    title: 'Image Processing Blog & How-To Guides | CropMyImages',
    description:
      'Free guides and tutorials on image cropping, unit resizing, target file size compression, format conversions, and festive photo editing.',
    url: 'https://cropmyimages.com/blog',
    siteName: 'CropMyImages',
    type: 'website',
  },
};

const BLOG_POSTS = [
  {
    slug: 'how-to-crop-festive-images-without-losing-quality',
    title: 'How to Crop Festive Images Without Losing Quality (Janmashtami & Teachers\' Day Special)',
    excerpt: 'Learn how to crop festive photos without losing resolution. Perfect for Krishna Janmashtami & Teachers\' Day WhatsApp status & social media posts.',
    category: 'Festive Guide',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    date: 'September 4, 2026',
    readTime: '5 min read',
    featured: true,
    image: '/Select-Image.webp',
  },
  {
    slug: 'how-to-resize-image-without-losing-quality',
    title: 'How to Resize an Image Without Losing Quality',
    excerpt: 'Understand aspect ratio, image dimensions, DPI resolution, and file formats with practical tips for crisp, sharp image resizing.',
    category: 'Image Editing',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    date: 'August 30, 2026',
    readTime: '7 min read',
    featured: false,
    image: '/enter-target-size.webp',
  },
  {
    slug: 'compress-image',
    title: 'Compress Image Online Without Losing Quality',
    excerpt: 'Reduce image file size (JPG, PNG, WebP) quickly with lossy and lossless compression settings without sacrificing visual sharpness.',
    category: 'Optimization',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    date: 'September 1, 2026',
    readTime: '6 min read',
    featured: false,
    image: '/resize.webp',
  },
  {
    slug: 'how-to-draw-a-custom-freehand-shape-and-crop-an-image',
    title: 'How to Draw a Custom Freehand Shape and Crop an Image',
    excerpt: 'Draw custom outlines around objects, people, products, and signatures. Crop into irregular freeform shapes online with transparent PNG export.',
    category: 'Custom Cropping',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    date: 'September 5, 2026',
    readTime: '6 min read',
    featured: false,
    image: '/blogimages/cropfirstrule.webp',
  },
  {
    slug: 'how-to-resize-image-to-50kb',
    title: 'How to Resize an Image to 50KB or 100KB',
    excerpt: 'Step-by-step tutorial to compress images down to strict KB file limits for online application forms, passport photos, and exam portals.',
    category: 'File Compression',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    date: 'August 28, 2026',
    readTime: '5 min read',
    featured: false,
    image: '/Select-Image.webp',
  },
  {
    slug: 'how-to-crop-an-image-online-for-free',
    title: 'How Do I Crop an Image Online for Free? Easy Guide',
    excerpt: 'Learn how to crop JPG, PNG, and photos online for free without Photoshop. Easily adjust aspect ratios, custom dimensions, and shapes.',
    category: 'Free Cropping',
    badgeColor: 'bg-[#1E50F2]/10 text-[#1E50F2] dark:text-sky-400 border-blue-200',
    date: 'September 5, 2026',
    readTime: '6 min read',
    featured: false,
    image: '/blogimages/cropfirstrule.webp',
  },
];

export default function BlogListingPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => p.slug !== featuredPost.slug);

  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CropMyImages Blog',
    url: 'https://cropmyimages.com/blog',
    description: 'Guides, tutorials, and tips on high-precision image cropping, unit resizing, and compression.',
    publisher: {
      '@type': 'Organization',
      name: 'CropMyImages',
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 dark:selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-300">
      <script
        id="blog-listing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />

      {/* HERO HEADER SECTION WITH SKY BACKDROP */}
      <div className="bg-sky-cloud-hero border-b border-zinc-200/60 dark:border-white/10 pb-16 pt-4 transition-colors duration-300">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-8">
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1E50F2] dark:text-sky-400" />
            <span className="text-[#1E50F2] dark:text-sky-400 font-bold">Blog &amp; Guides</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Image Processing <em className="font-serif italic font-normal text-slate-900 dark:text-sky-300">Blog &amp; Guides</em>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Free tutorials, technical guides, and festive editing tips for cropping photos, unit resizing (px, in, cm, mm), and target file size compression.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* FEATURED POST HERO CARD */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E50F2] dark:text-sky-400">
            <Sparkles className="w-4 h-4 text-[#1E50F2] dark:text-sky-400" />
            <span>Featured Article</span>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-2xl hover:shadow-md transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${featuredPost.badgeColor}`}>
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#1E50F2] dark:hover:text-sky-400 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{featuredPost.date}</span>
                  
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-[#1E50F2] dark:hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-inner">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-auto object-contain rounded-xl max-h-[240px] mx-auto"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ALL ARTICLES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1E50F2] dark:text-sky-400" />
              <span>All Tutorials &amp; Articles</span>
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{BLOG_POSTS.length} Articles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-xl hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${post.badgeColor}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#1E50F2] dark:hover:text-sky-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-[#1E50F2] dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
