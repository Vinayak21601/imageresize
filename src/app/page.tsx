'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FileUpload } from '@/components/common/FileUpload';
import { CropCanvas } from '@/components/cropper/CropCanvas';
import { CropSidebar } from '@/components/cropper/CropSidebar';
import { ResultModal } from '@/components/cropper/ResultModal';
import { AdBanner } from '@/components/common/AdBanner';
import { ImageMetadata, CropData, ResizeSettings } from '@/types/image';
import { convertToPixels } from '@/lib/units';
import { GoogleOneTap } from '@/components/common/GoogleOneTap';
import {
  Crop,
  Share2,
  ChevronDown,
  FileCheck,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);

  const [cropData, setCropData] = useState<CropData>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
  });

  const [settings, setSettings] = useState<ResizeSettings>({
    mode: 'crop',
    unit: 'px',
    dpi: 96,
    targetWidth: 0,
    targetHeight: 0,
    percentage: 100,
    lockAspectRatio: false,
    aspectRatio: null,
    fillColor: 'transparent',
    outputFormat: 'webp',
    quality: 85,
    targetSizeKb: null,
    cropShape: 'rectangle',
    cornerRadius: 0,
    adjustments: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      grayscale: 0,
      blur: 0,
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [isSmartCropping, setIsSmartCropping] = useState(false);
  const [smartCropProgress, setSmartCropProgress] = useState<number>(0);
  const [smartCropSuccess, setSmartCropSuccess] = useState<boolean>(false);
  const cropperInstanceRef = useRef<any>(null);

  const [result, setResult] = useState<{
    downloadUrl: string;
    finalSize: number;
    finalWidth: number;
    finalHeight: number;
    format: string;
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CropMyImages',
        text: 'High Precision Image Cropper & Resizer Engine',
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const faqs = [

    {
      q: 'How do I crop an image online without losing quality?',
      a: 'To crop an image without losing quality, upload your high-resolution original image into CropMyImages, adjust the interactive crop handles or lock your aspect ratio, and export in WebP or PNG format. Our high-precision engine preserves maximum image sharpness.',
    },
    {
      q: 'Can I crop photos by exact dimensions in pixels, inches, cm, or mm?',
      a: 'Yes! CropMyImages allows you to enter exact custom dimensions in pixels (px), inches (in), centimeters (cm), or millimeters (mm) with adjustable DPI settings (96 DPI for web displays or 300 DPI for high-resolution printing).',
    },
    {
      q: 'How do I crop an image into a circle or rounded rectangle shape?',
      a: 'Switch the crop shape setting in CropMyImages from Rectangle to Circle or adjust the Corner Radius slider (0px to 100px) to export circular cropped photos or soft-corner graphics with transparent backgrounds.',
    },
    {
      q: 'How do I crop images for social media like Instagram, Facebook, and YouTube?',
      a: 'CropMyImages provides one-click aspect ratio presets for all social media platforms: 1:1 for Instagram square posts & profile pictures, 9:16 for Instagram Stories, Reels & TikTok, 16:9 for YouTube thumbnails & Facebook headers, and 4:5 for portrait feeds.',
    },
    {
      q: 'How does target file size compression in KB work?',
      a: 'Under Export Settings, enter your target maximum file size in KB (e.g. 100 KB for passport applications or exam forms). Our server engine runs binary search quality optimization to compress the image under your exact KB limit.',
    },
    {
      q: 'Can I convert image formats while cropping (JPG, PNG, WebP, AVIF)?',
      a: 'Yes! You can upload any image format (JPG, PNG, WebP, AVIF, GIF, SVG) and instantly convert it to WebP, PNG, JPG, or AVIF while cropping.',
    },
    {
      q: 'Are my uploaded photos stored on the server or database?',
      a: 'No. CropMyImages strictly respects user privacy. Your images are processed strictly in server memory (RAM) and are permanently discarded immediately after processing.',
    },
  ];

  const handleImageSelected = (file: File, meta: ImageMetadata) => {
    setSelectedFile(file);
    setMetadata(meta);
    setSettings((prev) => ({
      ...prev,
      targetWidth: meta.width,
      targetHeight: meta.height,
    }));
  };

  const handleUpdateSettings = (newSettings: Partial<ResizeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetImage = () => {
    setSelectedFile(null);
    setMetadata(null);
    setResult(null);
  };

  const handleExecuteCrop = async () => {
    if (!selectedFile || !metadata) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      let targetW = settings.targetWidth || cropData.width || metadata.width;
      let targetH = settings.targetHeight || cropData.height || metadata.height;

      if (settings.mode === 'size' && settings.unit !== 'px') {
        targetW = convertToPixels(targetW, settings.unit, settings.dpi);
        targetH = convertToPixels(targetH, settings.unit, settings.dpi);
      }

      formData.append(
        'settings',
        JSON.stringify({
          ...settings,
          targetWidth: targetW,
          targetHeight: targetH,
          originalWidth: metadata.width,
          originalHeight: metadata.height,
        })
      );

      formData.append('crop', JSON.stringify(cropData));

      const res = await fetch('/api/crop', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to process crop');
      }

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const finalWidth = parseInt(res.headers.get('X-Final-Width') || targetW.toString());
      const finalHeight = parseInt(res.headers.get('X-Final-Height') || targetH.toString());
      const finalSize = parseInt(res.headers.get('X-Final-Size') || blob.size.toString());

      setResult({
        downloadUrl,
        finalSize,
        finalWidth,
        finalHeight,
        format: settings.outputFormat,
      });
    } catch (err: any) {
      alert(err.message || 'Error processing crop request');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile || !metadata) return;
    setIsRemovingBg(true);
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(selectedFile);
      const newFile = new File([blob], metadata.name.replace(/\.[^/.]+$/, "") + "-nobg.png", {
        type: 'image/png'
      });
      const newPreviewUrl = URL.createObjectURL(blob);

      setSelectedFile(newFile);
      setMetadata({
        name: newFile.name,
        type: 'image/png',
        size: blob.size,
        width: metadata.width,
        height: metadata.height,
        aspectRatio: metadata.aspectRatio,
        previewUrl: newPreviewUrl,
      });
      setSettings(prev => ({ ...prev, outputFormat: 'png' }));
    } catch (err: any) {
      console.error('BG removal failed:', err);
      alert('Background removal error: ' + (err.message || 'Failed to process image'));
    } finally {
      setIsRemovingBg(false);
    }
  };

  const handleSmartCrop = async () => {
    if (!metadata || !cropperInstanceRef.current) return;
    setSmartCropSuccess(false);
    setIsSmartCropping(true);
    setSmartCropProgress(15);
    try {
      const smartcrop = (await import('smartcrop')).default;
      setSmartCropProgress(40);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = metadata.previewUrl;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });
      setSmartCropProgress(65);

      const currentRatio = settings.aspectRatio || (cropData.width / cropData.height) || metadata.aspectRatio;
      const calcW = 800;
      const calcH = Math.round(800 / currentRatio);

      const result = await smartcrop.crop(img, { width: calcW, height: calcH });
      setSmartCropProgress(90);

      if (result && result.topCrop) {
        const c = result.topCrop;
        cropperInstanceRef.current.setData({
          x: c.x,
          y: c.y,
          width: c.width,
          height: c.height,
        });
      }
      setSmartCropProgress(100);
      setSmartCropSuccess(true);
      setTimeout(() => {
        setSmartCropSuccess(false);
      }, 4000);
    } catch (err: any) {
      console.error('Smart crop failed:', err);
      alert('Smart Focus detection error: ' + (err.message || 'Failed to analyze subject'));
    } finally {
      setIsSmartCropping(false);
      setSmartCropProgress(0);
    }
  };

  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CropMyImages - The Best Website to Crop Images Online',
    url: 'https://cropmyimages.com',
    description: 'CropMyImages is the best website to crop images online for free. Precision cropping, unit resizing (px, in, cm, mm), circular crop shape, social media aspect ratio presets, and target file size compression.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div itemScope itemType="https://schema.org/WebApplication" className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* JSON-LD Structured Schemas for AI Agents & Search Crawlers */}
      <script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Google One Tap Auto Sign-In for unauthenticated visitors */}
      <GoogleOneTap />

      <main className="flex-1 w-full">
        {/* HERO + STUDIO SECTION WITH BACKGROUND IMAGE BACKDROP */}
        <div className="relative bg-sky-cloud-hero overflow-hidden min-h-screen flex flex-col justify-between">
          <Navbar />

          <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center space-y-4">

              {/* Hero H1 Headline */}
              <h1 itemProp="name" className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading whitespace-normal sm:whitespace-nowrap max-w-5xl mx-auto">
                The best website to <em className="font-serif italic font-normal text-slate-900">crop images online.</em>
              </h1>

              <p itemProp="description" className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed">
                CropMyImages is the best website to crop images online for free. Precision cropping, unit sizing (px, in, cm, mm), circular crop shapes, social media aspect ratio presets, and target file size compression.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="#studio"
                  className="px-6 py-3 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Launch Studio
                </a>
                <a
                  href="#how-to"
                  className="px-6 py-3 text-xs font-bold text-slate-900 bg-white/90 hover:bg-white border border-zinc-200/80 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  How it works
                </a>
              </div>

            </div>
          </section>

          <div id="studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 scroll-mt-6">

            {/* TOP LEADERBOARD ADSENSE BANNER */}
            <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />

            {/* DIRECT IMAGE CROPPER STUDIO SECTION */}
            {!selectedFile ? (
              <div className="max-w-4xl mx-auto py-6 space-y-6">
                <FileUpload onImageSelected={handleImageSelected} />
              </div>
            ) : (
              <div className="space-y-6 py-6">
                {/* Workspace Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-zinc-200/80 p-4 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetImage}
                      className="p-2 text-slate-700 hover:text-black hover:bg-zinc-100 bg-zinc-50 border border-zinc-200 rounded-full transition-all"
                      title="Upload different image"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div>
                      <div className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 font-sans font-body !font-sans">
                        {metadata?.name}
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">
                        Original: {metadata?.width} x {metadata?.height} px ({(metadata?.size! / 1024).toFixed(1)} KB)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 hover:bg-zinc-100 bg-zinc-50 border border-zinc-200 rounded-full transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Change Image
                  </button>
                </div>

                {/* Workspace Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 xl:col-span-8">
                    <CropCanvas
                      imageSrc={metadata?.previewUrl || ''}
                      aspectRatio={settings.aspectRatio}
                      cropShape={settings.cropShape}
                      cornerRadius={settings.cornerRadius}
                      adjustments={settings.adjustments}
                      onCropChange={setCropData}
                      onCropperReady={(c) => { cropperInstanceRef.current = c; }}
                      onChangeImage={handleResetImage}
                    />
                  </div>

                  <div className="lg:col-span-5 xl:col-span-4 h-full">
                    <CropSidebar
                      metadata={metadata!}
                      cropData={cropData}
                      settings={settings}
                      onUpdateSettings={handleUpdateSettings}
                      onExecuteProcess={handleExecuteCrop}
                      isProcessing={isProcessing}
                      onRemoveBackground={handleRemoveBackground}
                      onSmartCrop={handleSmartCrop}
                      isRemovingBg={isRemovingBg}
                      isSmartCropping={isSmartCropping}
                      smartCropProgress={smartCropProgress}
                      smartCropSuccess={smartCropSuccess}
                      onDismissSmartCropSuccess={() => setSmartCropSuccess(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* IN-ARTICLE ADSENSE BANNER */}
          <div className="max-w-5xl mx-auto my-8">
            <AdBanner slot="in-article-display" format="auto" label="Sponsored Content" />
          </div>

          {/* HOW TO RESIZE AN IMAGE TUTORIAL SECTION */}
          <section id="how-to" itemScope itemType="https://schema.org/HowTo" className="">
            <meta itemProp="name" content="How to crop your image in 3 simple steps" />
            <div className="max-w-5xl mx-auto space-y-2">

              {/* Section Header */}
              <div className="text-center space-y-3 max-w-5xl mx-auto px-4">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading whitespace-normal sm:whitespace-nowrap">
                  How to crop your image in <em className="font-serif italic font-normal text-slate-900">3 simple steps</em>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed ">
                  Follow these quick steps to scale, crop, and resize any photo or graphics file in seconds.
                </p>
              </div>


              <div className="relative">
                {/* Central Vertical Line (Desktop View) */}
                <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-0.5 -translate-x-1/2 bg-slate-300/80 z-0" />

                <div className="space-y-12 md:space-y-16 relative z-10">

                  {/* STEP 1: Image Left, Number Center, Text Right */}
                  <div itemProp="step" itemScope itemType="https://schema.org/HowToStep" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <meta itemProp="position" content="1" />
                    {/* Left: Image Container */}
                    <div className="md:col-span-5 flex justify-center md:justify-end order-2 md:order-1">
                      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:scale-[1.02] transition-all">
                        <img
                          src="/Select-Image.webp"
                          alt="Step 1: Select or drop an image file to crop online for free"
                          width={500}
                          height={350}
                          loading="lazy"
                          decoding="async"
                          itemProp="image"
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Center: Badge 1 */}
                    <div className="md:col-span-2 flex justify-center order-1 md:order-2">
                      <div className="w-10 h-10 rounded-full bg-[#1E50F2] text-white font-black text-sm flex items-center justify-center border-4 border-white shadow-md shadow-blue-500/30">
                        1
                      </div>
                    </div>

                    {/* Right: Step Info */}
                    <div className="md:col-span-5 text-center md:text-left space-y-2 order-3">
                      <h3 itemProp="name" className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                        Select your image
                      </h3>
                      <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm mx-auto md:mx-0">
                        Click on the <strong className="text-slate-900 font-semibold">&quot;Select Image&quot;</strong> button or drop your photo directly from your computer, tablet, or phone to get started.
                      </p>
                    </div>
                  </div>

                  {/* STEP 2: Text Left, Number Center, Image Right */}
                  <div itemProp="step" itemScope itemType="https://schema.org/HowToStep" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <meta itemProp="position" content="2" />
                    {/* Left: Step Info */}
                    <div className="md:col-span-5 text-center md:text-right space-y-2 order-2 md:order-1">
                      <h3 itemProp="name" className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                        Enter target size &amp; customise
                      </h3>
                      <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm mx-auto md:ml-auto md:mr-0">
                        Enter a new target size for your image (dimensions in px, in, cm, mm, or target file size in KB/MB) and lock aspect ratio or adjust crop.
                      </p>
                    </div>

                    {/* Center: Badge 2 */}
                    <div className="md:col-span-2 flex justify-center order-1 md:order-2">
                      <div className="w-10 h-10 rounded-full bg-[#1E50F2] text-white font-black text-sm flex items-center justify-center border-4 border-white shadow-md shadow-blue-500/30">
                        2
                      </div>
                    </div>

                    {/* Right: Image Container */}
                    <div className="md:col-span-5 flex justify-center md:justify-start order-3">
                      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:scale-[1.02] transition-all">
                        <img
                          src="/enter-target-size.webp"
                          alt="Step 2: Enter target size in pixels, inches, cm, mm, or KB target file size"
                          width={500}
                          height={350}
                          loading="lazy"
                          decoding="async"
                          itemProp="image"
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Image Left, Number Center, Text Right */}
                  <div itemProp="step" itemScope itemType="https://schema.org/HowToStep" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <meta itemProp="position" content="3" />
                    {/* Left: Image Container */}
                    <div className="md:col-span-5 flex justify-center md:justify-end order-2 md:order-1">
                      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:scale-[1.02] transition-all">
                        <img
                          src="/resize.webp"
                          alt="Step 3: Crop image and download in WebP, PNG, JPG, or AVIF"
                          width={500}
                          height={350}
                          loading="lazy"
                          decoding="async"
                          itemProp="image"
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Center: Badge 3 */}
                    <div className="md:col-span-2 flex justify-center order-1 md:order-2">
                      <div className="w-10 h-10 rounded-full bg-[#1E50F2] text-white font-black text-sm flex items-center justify-center border-4 border-white shadow-md shadow-blue-500/30">
                        3
                      </div>
                    </div>

                    {/* Right: Step Info */}
                    <div className="md:col-span-5 text-center md:text-left space-y-2 order-3">
                      <h3 itemProp="name" className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                        Crop &amp; download
                      </h3>
                      <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm mx-auto md:mx-0">
                        Click the <strong className="text-slate-900 font-semibold">&quot;Crop Image&quot;</strong> button to instantly process your cropped image and export in WebP, PNG, JPG, or AVIF format.
                      </p>
                    </div>
                  </div>

                </div>
              </div>



            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
                  Frequently <em className="font-serif italic font-normal text-slate-900">asked questions.</em>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                        ? 'bg-white text-slate-700 border-blue-300 shadow-md ring-1 ring-blue-500/20'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300'
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer font-sans"
                      >
                        <span className="text-slate-800 font-normal text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1E50F2]' : 'text-slate-400'
                            }`}
                        />
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 text-sm sm:text-base font-normal text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* BOTTOM ADSENSE BANNER */}
          <div className="py-8">
            <AdBanner slot="bottom-landing-banner" format="auto" label="Advertisement" />
          </div>
        </div>
      </main>

      {/* RESULT DOWNLOAD MODAL */}
      {result && metadata && selectedFile && (
        <ResultModal
          downloadUrl={result.downloadUrl}
          filename={selectedFile.name}
          originalSize={metadata.size}
          finalSize={result.finalSize}
          finalWidth={result.finalWidth}
          finalHeight={result.finalHeight}
          format={result.format}
          onClose={() => setResult(null)}
        />
      )}

      <Footer />
    </div>
  );
}
