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
      q: 'How does the interactive Image Cropper work?',
      a: 'Upload any image (JPG, PNG, WEBP, AVIF up to 50MB) and adjust the crop box with live handles. Choose aspect ratios like 1:1, 16:9, 9:16 or enter custom pixel dimensions.',
    },
    {
      q: 'Can I resize images by units like inches, cm, or mm?',
      a: 'Yes! Switch to the "By Size" tab, select your preferred unit (px, in, cm, mm), choose between 96 DPI for web or 300 DPI for print, and lock the aspect ratio.',
    },
    {
      q: 'How does Target Output File Size compression work?',
      a: 'Under Export Settings, enter your target max size in KB (e.g. 200 KB). Our automated image engine runs binary search quality iterations to compress the file under your exact size target.',
    },
    {
      q: 'Are my images stored or uploaded permanently?',
      a: 'No. Images are processed temporarily in memory on the server for instant rendering and discarded immediately after download.',
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
    setIsSmartCropping(true);
    try {
      const smartcrop = (await import('smartcrop')).default;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = metadata.previewUrl;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

      const currentRatio = settings.aspectRatio || (cropData.width / cropData.height) || metadata.aspectRatio;
      const calcW = 800;
      const calcH = Math.round(800 / currentRatio);

      const result = await smartcrop.crop(img, { width: calcW, height: calcH });
      if (result && result.topCrop) {
        const c = result.topCrop;
        cropperInstanceRef.current.setData({
          x: c.x,
          y: c.y,
          width: c.width,
          height: c.height,
        });
      }
    } catch (err: any) {
      console.error('Smart crop failed:', err);
      alert('Smart Focus detection error: ' + (err.message || 'Failed to analyze subject'));
    } finally {
      setIsSmartCropping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO + STUDIO SECTION WITH BACKGROUND IMAGE BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">

            
              {/* Headline with Mixed Serif Italic Typography */}
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-heading">
                Crop &amp; resize images on a <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">quieter kind of engine.</em>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed">
                High-performance web image engine for precision cropping, unit resizing (px, in, cm, mm), social media presets, and target file size compression.
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
                      <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 font-sans">
                        {metadata?.name}
                      </h2>
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
                      adjustments={settings.adjustments}
                      onCropChange={setCropData}
                      onCropperReady={(c) => { cropperInstanceRef.current = c; }}
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
          <section id="how-to" className="py-16 border-t border-zinc-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* Left Steps Info */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-bold text-slate-900 shadow-sm">
                    Simple 3-Step Guide
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
                    Built for creators who <br />
                    <em className="font-serif italic font-normal text-slate-900">value precision.</em>
                  </h2>
                  <p className="text-sm text-slate-700 font-normal">
                    Follow these quick steps to scale, crop, and resize any photo or graphics file in seconds.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-bold text-sm shadow-sm">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        Select Image
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Click on the <strong className="text-slate-900 font-semibold">&quot;Select Image&quot;</strong> button to select an image from your device.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-bold text-sm shadow-sm">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        Enter Target Size
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Enter a new target size for your image (dimensions in px, in, cm, or KB target file size).
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-bold text-sm shadow-sm">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        Resize Image
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Click the <strong className="text-slate-900 font-semibold">&quot;Resize Image&quot;</strong> button to resize and export your image.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual Guide Component Mockup */}
              <div className="lg:col-span-6 relative min-h-[460px]">
                <div className="relative w-full h-full min-h-[460px] rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-xl overflow-hidden flex flex-col justify-between">

                  {/* Grid pattern background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />

                  {/* Top Row: Step 1 (Left) and Step 2 (Right) */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">

                    {/* Step 1 Card */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-md">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                        </div>
                        <span className="font-mono text-zinc-500 text-[10px] font-bold">1. Select Image</span>
                      </div>

                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-100 border border-zinc-200">
                        <img
                          src="/user-sample.jpg"
                          alt="Selected User Photo"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-2 border-2 border-black rounded-lg shadow-sm">
                          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black rounded-full" />
                          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-black rounded-full" />
                          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black rounded-full" />
                          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black rounded-full" />
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>4032 x 3024 px</span>
                        <span className="text-black font-bold">4.0 MB</span>
                      </div>
                    </div>

                    {/* Step 2 Card */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-md space-y-2.5 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-zinc-100 pb-1.5 flex items-center justify-between">
                          <span>2. Enter Target Size</span>
                          <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[9px]">SETTINGS</span>
                        </div>

                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                            <span className="text-zinc-500">Target Width</span>
                            <span className="font-mono text-slate-900 font-bold">1920 px</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                            <span className="text-zinc-500">Target Height</span>
                            <span className="font-mono text-slate-900 font-bold">1080 px</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                            <span className="text-zinc-500">Target Format</span>
                            <span className="font-mono text-slate-900 font-bold">WEBP</span>
                          </div>
                        </div>
                      </div>

                      {/* Share this website with others button */}
                      <button
                        type="button"
                        onClick={handleShareWebsite}
                        className="w-full mt-2 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-slate-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-900" />
                        {copiedShare ? 'Copied to Clipboard!' : 'Share website'}
                      </button>
                    </div>

                  </div>

                  {/* Bottom Row: Step 3 Card */}
                  <div className="relative z-10 mt-4 rounded-2xl border-2 border-black bg-white p-3.5 shadow-lg">
                    <div className="flex items-center justify-between mb-2.5 text-[11px] font-mono">
                      <span className="text-slate-900 font-bold">3. Click &quot;Resize Image&quot;</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-bold text-[9px]">READY</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-5 relative rounded-xl overflow-hidden h-24 bg-zinc-100 border border-zinc-200">
                        <img
                          src="/user-sample.jpg"
                          alt="Resized Result Photo"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black text-white text-[9px] font-mono font-bold">
                          1920 x 1080 px (350 KB)
                        </div>
                      </div>

                      <div className="sm:col-span-7 space-y-2">
                        <p className="text-xs text-zinc-500 font-light">
                          Output processed in <strong className="text-slate-900">48 ms</strong> with high-precision engine.
                        </p>
                        <div className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold text-center uppercase tracking-wider shadow-sm cursor-pointer hover:bg-zinc-800 transition-colors">
                          Resize Image
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* FEATURE GRID */}
          <section className="py-16 space-y-12 border-t border-zinc-200/80">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-heading">
                Built for modern web workflows.
              </h2>
              <p className="text-slate-700 text-sm max-w-lg mx-auto font-normal">
                Everything you need to crop, format, scale, and optimize images in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black shadow-sm">
                  <Crop className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-sans">Interactive Canvas Cropper</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Full visual handles with 1:1, 16:9, 9:16, 4:3 ratios, 90° rotations, and horizontal/vertical flip controls.
                </p>
              </div>

              <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black shadow-sm">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-sans">Social Media Presets</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Preconfigured templates for Instagram, Facebook, Twitter/X, YouTube &amp; LinkedIn with customizable background fill padding.
                </p>
              </div>

              <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black shadow-sm">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-sans">Export &amp; Format Control</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Export to WEBP, JPG, PNG &amp; AVIF with custom compression sliders and target file size calculations in KB.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-16 border-t border-zinc-200/80">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
                  Frequently <em className="font-serif italic font-normal text-slate-900">asked questions.</em>
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                        ? 'bg-white text-slate-900 border-zinc-300 shadow-md'
                        : 'bg-white text-slate-900 border-zinc-200/80 hover:border-zinc-300'
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-5 text-left font-bold text-base flex items-center justify-between gap-4 cursor-pointer font-sans"
                      >
                        <span className="text-slate-900 font-bold">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-black' : 'text-zinc-400'
                            }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm font-light text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                          {faq.a}
                        </div>
                      )}
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
