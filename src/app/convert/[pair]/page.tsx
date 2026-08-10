'use client';

import React, { useState, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Crop,
  Download,
  Share2,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FileUpload } from '@/components/common/FileUpload';
import { CropCanvas } from '@/components/cropper/CropCanvas';
import { CropSidebar } from '@/components/cropper/CropSidebar';
import { ResultModal } from '@/components/cropper/ResultModal';
import { FormatSwitcher } from '@/components/common/FormatSwitcher';
import { AdBanner } from '@/components/common/AdBanner';
import { CONVERSION_PAIRS } from '@/lib/conversions';
import { ResizeSettings, ImageMetadata, CropData, ProcessedResult } from '@/types/image';

interface ConvertPageProps {
  params: Promise<{
    pair: string;
  }>;
}

export default function ConvertPage({ params }: ConvertPageProps) {
  const resolvedParams = use(params);
  const pairKey = resolvedParams.pair.toLowerCase();
  const pairInfo = CONVERSION_PAIRS[pairKey] || CONVERSION_PAIRS['heic-to-jpg'];

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
    outputFormat: pairInfo.outputFormat,
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

  const handleImageSelected = (file: File, meta: ImageMetadata) => {
    setSelectedFile(file);
    setMetadata(meta);
    setSettings((prev) => ({
      ...prev,
      targetWidth: meta.width,
      targetHeight: meta.height,
      outputFormat: pairInfo.outputFormat,
    }));
  };

  const handleResetImage = () => {
    if (metadata?.previewUrl) {
      URL.revokeObjectURL(metadata.previewUrl);
    }
    setSelectedFile(null);
    setMetadata(null);
    setResult(null);
  };

  const handleUpdateSettings = (newSettings: Partial<ResizeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile || !metadata) return;
    setIsRemovingBg(true);
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(selectedFile);
      const newFile = new File([blob], metadata.name.replace(/\.[^/.]+$/, '') + '-nobg.png', {
        type: 'image/png',
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
      setSettings((prev) => ({ ...prev, outputFormat: 'png' }));
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

      const result = await smartcrop.crop(img, { width: 100, height: 100 });
      if (result.topCrop) {
        const c = result.topCrop;
        cropperInstanceRef.current.setData({
          x: Math.round(c.x),
          y: Math.round(c.y),
          width: Math.round(c.width),
          height: Math.round(c.height),
        });
      }
    } catch (err: any) {
      console.error('Smart crop failed:', err);
      alert('Smart Focus detection error: ' + (err.message || 'Failed to analyze subject'));
    } finally {
      setIsSmartCropping(false);
    }
  };

  const handleExecuteCrop = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('settings', JSON.stringify(settings));
      formData.append('crop', JSON.stringify(cropData));

      const response = await fetch('/api/crop', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image conversion failed');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const resWidth = response.headers.get('X-Final-Width');
      const resHeight = response.headers.get('X-Final-Height');
      const resFormat = response.headers.get('X-Final-Format');

      setResult({
        downloadUrl,
        finalSize: blob.size,
        finalWidth: resWidth ? parseInt(resWidth) : settings.targetWidth || metadata?.width || 0,
        finalHeight: resHeight ? parseInt(resHeight) : settings.targetHeight || metadata?.height || 0,
        format: resFormat || settings.outputFormat,
      });
    } catch (err: any) {
      console.error('Processing Error:', err);
      alert('Failed to process image: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO HEADER WITH LIGHT BLUE CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                {pairInfo.badge} &bull; Instant Format Conversion
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-heading">
                {pairInfo.h1}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                {pairInfo.description}
              </p>
            </div>
          </section>

          {/* STUDIO CONTAINER */}
          <div id="studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 scroll-mt-6">
            
            {/* Quick Format Switcher */}
            <FormatSwitcher currentPairId={pairKey} />

            {/* TOP LEADERBOARD BANNER */}
            <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />

            {!selectedFile ? (
              <div className="max-w-4xl mx-auto py-4 space-y-6">
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
                      className="p-2 text-slate-700 hover:text-black hover:bg-zinc-100 bg-zinc-50 border border-zinc-200 rounded-full transition-all cursor-pointer"
                      title="Upload different image"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div>
                      <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 font-sans">
                        {metadata?.name}
                      </h2>
                      <p className="text-xs text-slate-600 font-mono">
                        Original: {metadata?.width} x {metadata?.height} px ({(metadata?.size! / 1024).toFixed(1)} KB)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetImage}
                      className="px-4 py-2 text-xs font-bold text-slate-700 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all cursor-pointer"
                    >
                      Change Image
                    </button>

                    <button
                      type="button"
                      onClick={handleExecuteCrop}
                      disabled={isProcessing}
                      className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-full transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Convert to {pairInfo.toFormat}</span>
                        </>
                      )}
                    </button>
                  </div>
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
                      onCropperReady={(c) => {
                        cropperInstanceRef.current = c;
                      }}
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

        {/* HOW TO CONVERT SECTION */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200/80">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                How to convert {pairInfo.fromFormat} to {pairInfo.toFormat}
              </h2>
              <p className="text-sm text-slate-700 font-normal">
                Follow these 3 simple steps to transform your image in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Upload File</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Drop your {pairInfo.fromFormat} image or click to select a file from your computer or phone.
                </p>
              </div>

              <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Adjust &amp; Resize</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Optional: Crop image frame, tweak brightness/contrast sliders, or specify target file size (KB).
                </p>
              </div>

              <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Download {pairInfo.toFormat}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Click Convert to process your file in milliseconds and download your ready-to-use {pairInfo.toFormat} file.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RESULT DOWNLOAD MODAL */}
        {result && metadata && selectedFile && (
          <ResultModal
            downloadUrl={result.downloadUrl}
            filename={selectedFile.name}
            originalSize={metadata.size}
            finalSize={result.finalSize}
            finalWidth={result.finalWidth}
            finalHeight={result.finalHeight}
            format={result.format || pairInfo.outputFormat}
            onClose={() => setResult(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
