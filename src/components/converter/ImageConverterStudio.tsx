'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Download,
  Upload,
  RefreshCw,
  FileImage,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
  Layers,
  Trash2,
  FileCheck,
  ShieldCheck,
  Sliders,
  Maximize2,
  Lock,
  Unlock,
  Check,
  Scaling,
  Crop,
  Settings2,
  HardDrive,
  Gauge,
  ChevronDown,
  ImagePlus
} from 'lucide-react';

export type OutputFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif' | 'gif' | 'bmp' | 'tiff' | 'pdf';

export interface FormatOption {
  id: OutputFormat;
  label: string;
  ext: string;
  mime: string;
  badge: string;
  description: string;
}

export const FORMAT_OPTIONS: FormatOption[] = [
  { id: 'jpg', label: 'JPG', ext: 'jpg', mime: 'image/jpeg', badge: 'Popular', description: 'Standard JPG photo format' },
  { id: 'jpeg', label: 'JPEG', ext: 'jpeg', mime: 'image/jpeg', badge: 'Standard', description: 'Official JPEG photo format' },
  { id: 'png', label: 'PNG', ext: 'png', mime: 'image/png', badge: 'Lossless', description: 'Supports full alpha transparency & high detail' },
  { id: 'webp', label: 'WEBP', ext: 'webp', mime: 'image/webp', badge: 'Web Standard', description: 'Superior compression for ultra-fast website loading' },
  { id: 'avif', label: 'AVIF', ext: 'avif', mime: 'image/avif', badge: 'Next-Gen', description: 'Maximum compression with rich color depth' },
  { id: 'gif', label: 'GIF', ext: 'gif', mime: 'image/gif', badge: 'Graphics', description: 'Indexed color format for simple web graphics' },
  { id: 'bmp', label: 'BMP', ext: 'bmp', mime: 'image/bmp', badge: 'Raw', description: 'Uncompressed Windows bitmap image' },
  { id: 'tiff', label: 'TIFF', ext: 'tiff', mime: 'image/tiff', badge: 'Print', description: 'Uncompressed archival format for publishing & print' },
  { id: 'pdf', label: 'PDF', ext: 'pdf', mime: 'application/pdf', badge: 'Document', description: 'Encapsulate image inside a portable document' },
];

export interface SizePreset {
  label: string;
  width: number;
  height: number;
}

const SIZE_PRESETS: SizePreset[] = [
  { label: '1080p FHD (1920×1080)', width: 1920, height: 1080 },
  { label: 'Square (1080×1080)', width: 1080, height: 1080 },
  { label: 'Social OG (1200×630)', width: 1200, height: 630 },
  { label: 'Web Banner (800×600)', width: 800, height: 600 },
  { label: 'Thumbnail (400×400)', width: 400, height: 400 },
];

export interface TargetSizePreset {
  label: string;
  val: number;
  unit: 'KB' | 'MB';
}

const TARGET_SIZE_PRESETS: TargetSizePreset[] = [
  { label: '50 KB', val: 50, unit: 'KB' },
  { label: '100 KB', val: 100, unit: 'KB' },
  { label: '200 KB', val: 200, unit: 'KB' },
  { label: '500 KB', val: 500, unit: 'KB' },
  { label: '1 MB', val: 1, unit: 'MB' },
  { label: '2 MB', val: 2, unit: 'MB' },
  { label: '5 MB', val: 5, unit: 'MB' },
];

export interface UploadedImage {
  id: string;
  file: File;
  name: string;
  originalFormat: string;
  originalSize: number;
  originalWidth?: number;
  originalHeight?: number;
  customWidth?: number;
  customHeight?: number;
  previewUrl: string;
  targetFormat: OutputFormat;
  quality: number;
  targetSizeKb?: number | null;
  status: 'idle' | 'converting' | 'completed' | 'error';
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number;
  finalWidth?: number;
  finalHeight?: number;
  errorMessage?: string;
}

interface ImageConverterStudioProps {
  defaultSourceFormat?: string;
  defaultTargetFormat?: OutputFormat;
  title?: string;
  subtitle?: string;
}

function detectFileFormat(file: File): string {
  const ext = file.name.split('.').pop()?.toUpperCase();
  if (ext) return ext;
  if (file.type.includes('png')) return 'PNG';
  if (file.type.includes('jpeg')) return 'JPEG';
  if (file.type.includes('jpg')) return 'JPG';
  if (file.type.includes('webp')) return 'WEBP';
  if (file.type.includes('avif')) return 'AVIF';
  if (file.type.includes('heic')) return 'HEIC';
  if (file.type.includes('heif')) return 'HEIF';
  if (file.type.includes('gif')) return 'GIF';
  if (file.type.includes('bmp')) return 'BMP';
  if (file.type.includes('tiff')) return 'TIFF';
  if (file.type.includes('svg')) return 'SVG';
  return 'IMAGE';
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function ImageConverterStudio({
  defaultTargetFormat = 'jpeg',
  title,
  subtitle,
}: ImageConverterStudioProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [globalTargetFormat, setGlobalTargetFormat] = useState<OutputFormat>(defaultTargetFormat);
  const [quality, setQuality] = useState<number>(90);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isConvertingAll, setIsConvertingAll] = useState(false);
  const [uploadToast, setUploadToast] = useState<{ count: number; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);

  // Custom Size State
  const [sizeMode, setSizeMode] = useState<'original' | 'custom' | 'scale'>('original');
  const [customWidth, setCustomWidth] = useState<number | ''>('');
  const [customHeight, setCustomHeight] = useState<number | ''>('');
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

  // Target Output File Size State (KB / MB)
  const [targetSizeEnabled, setTargetSizeEnabled] = useState<boolean>(false);
  const [targetSizeValue, setTargetSizeValue] = useState<number | ''>('');
  const [targetSizeUnit, setTargetSizeUnit] = useState<'KB' | 'MB'>('KB');

  // Custom Dropdown Popover State
  const [openFormatMenuId, setOpenFormatMenuId] = useState<string | null>(null);
  const [openSizeMenuId, setOpenSizeMenuId] = useState<string | null>(null);
  const [cardUnit, setCardUnit] = useState<'KB' | 'MB'>('KB');

  useEffect(() => {
    const handleGlobalClick = () => {
      setOpenFormatMenuId(null);
      setOpenSizeMenuId(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Synchronize target format when defaultTargetFormat changes from URL prop
  useEffect(() => {
    if (defaultTargetFormat) {
      setGlobalTargetFormat(defaultTargetFormat);
      setImages((prev) =>
        prev.map((item) =>
          item.status === 'completed'
            ? item
            : { ...item, targetFormat: defaultTargetFormat }
        )
      );
    }
  }, [defaultTargetFormat]);

  const handleGlobalTargetFormatChange = (newFmt: OutputFormat) => {
    setGlobalTargetFormat(newFmt);
    setImages((prev) =>
      prev.map((item) =>
        item.status === 'completed'
          ? item
          : { ...item, targetFormat: newFmt }
      )
    );
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const newItems: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      // Validate image types
      if (!file.type.startsWith('image/') && !file.name.match(/\.(heic|heif|avif|tiff|bmp|svg|ico)$/i)) {
        return;
      }

      const detected = detectFileFormat(file);
      const previewUrl = URL.createObjectURL(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const item: UploadedImage = {
        id,
        file,
        name: file.name,
        originalFormat: detected,
        originalSize: file.size,
        previewUrl,
        targetFormat: globalTargetFormat,
        quality,
        status: 'idle',
      };

      // Measure dimensions
      const img = new Image();
      img.onload = () => {
        setImages((prev) =>
          prev.map((i) =>
            i.id === id
              ? {
                ...i,
                originalWidth: img.naturalWidth,
                originalHeight: img.naturalHeight,
                customWidth: sizeMode === 'custom' && typeof customWidth === 'number' ? customWidth : undefined,
                customHeight: sizeMode === 'custom' && typeof customHeight === 'number' ? customHeight : undefined,
              }
              : i
          )
        );
      };
      img.src = previewUrl;

      newItems.push(item);
    });

    if (newItems.length > 0) {
      setImages((prev) => [...prev, ...newItems]);
      setUploadToast({ count: newItems.length, name: newItems[0].name });

      // Smoothly slide / scroll to the uploaded file queue
      setTimeout(() => {
        queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

      setTimeout(() => {
        setUploadToast(null);
      }, 4000);
    }
  }, [globalTargetFormat, quality, sizeMode, customWidth, customHeight]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item?.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setImages([]);
  };

  // Handle custom width input change with aspect ratio recalculation
  const handleWidthChange = (val: string, baseImage?: UploadedImage) => {
    if (val === '') {
      setCustomWidth('');
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    setCustomWidth(num);

    const refItem = baseImage || images[0];
    if (lockAspectRatio && refItem?.originalWidth && refItem?.originalHeight) {
      const calculatedH = Math.round((num / refItem.originalWidth) * refItem.originalHeight);
      setCustomHeight(calculatedH);
    }
  };

  // Handle custom height input change with aspect ratio recalculation
  const handleHeightChange = (val: string, baseImage?: UploadedImage) => {
    if (val === '') {
      setCustomHeight('');
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    setCustomHeight(num);

    const refItem = baseImage || images[0];
    if (lockAspectRatio && refItem?.originalWidth && refItem?.originalHeight) {
      const calculatedW = Math.round((num / refItem.originalHeight) * refItem.originalWidth);
      setCustomWidth(calculatedW);
    }
  };

  // Apply a size preset
  const applyPreset = (preset: SizePreset) => {
    setSizeMode('custom');
    setCustomWidth(preset.width);
    setCustomHeight(preset.height);
  };

  // Apply target file size preset (KB / MB)
  const applyTargetSizePreset = (preset: TargetSizePreset) => {
    setTargetSizeEnabled(true);
    setTargetSizeValue(preset.val);
    setTargetSizeUnit(preset.unit);
  };

  // ─── Image Conversion Engine (Canvas + Target Size Binary Search + Server Fallback) ───
  const convertSingleImage = async (
    item: UploadedImage,
    targetFmt: OutputFormat,
    q: number
  ): Promise<UploadedImage> => {
    // Determine effective target dimensions
    let effWidth = item.customWidth;
    let effHeight = item.customHeight;

    if (!effWidth && !effHeight) {
      if (sizeMode === 'custom' && typeof customWidth === 'number') {
        effWidth = customWidth;
        effHeight = typeof customHeight === 'number' ? customHeight : undefined;
      } else if (sizeMode === 'scale' && scalePercent !== 100 && item.originalWidth && item.originalHeight) {
        effWidth = Math.round((item.originalWidth * scalePercent) / 100);
        effHeight = Math.round((item.originalHeight * scalePercent) / 100);
      }
    }

    // Determine target size in KB
    const effectiveTargetKb =
      item.targetSizeKb !== undefined && item.targetSizeKb !== null
        ? item.targetSizeKb
        : targetSizeEnabled && typeof targetSizeValue === 'number' && targetSizeValue > 0
          ? targetSizeUnit === 'MB'
            ? targetSizeValue * 1024
            : targetSizeValue
          : undefined;

    // 1. High-Fidelity PDF Conversion with jsPDF
    if (targetFmt === 'pdf') {
      try {
        const { jsPDF } = await import('jspdf');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = item.previewUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(true);
          img.onerror = reject;
        });

        const outW = effWidth || img.naturalWidth || 800;
        const outH = effHeight || img.naturalHeight || 600;
        canvas.width = outW;
        canvas.height = outH;

        // Clean white background for PDF page
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, outW, outH);
        ctx?.drawImage(img, 0, 0, outW, outH);

        const jpegDataUrl = canvas.toDataURL('image/jpeg', Math.min(1, Math.max(0.6, q / 100)));

        const orientation = outW >= outH ? 'landscape' : 'portrait';
        const doc = new jsPDF({
          orientation,
          unit: 'px',
          format: [outW, outH],
          hotfixes: ['px_scaling'],
        });

        doc.addImage(jpegDataUrl, 'JPEG', 0, 0, outW, outH);
        const pdfBlob = doc.output('blob');

        return {
          ...item,
          targetFormat: 'pdf',
          status: 'completed',
          convertedBlob: pdfBlob,
          convertedUrl: URL.createObjectURL(pdfBlob),
          convertedSize: pdfBlob.size,
          finalWidth: outW,
          finalHeight: outH,
        };
      } catch (err: any) {
        console.error('PDF generation error:', err);
        return {
          ...item,
          status: 'error',
          errorMessage: err.message || 'Failed to generate PDF document from image.',
        };
      }
    }

    // 2. Client-side HTML5 Canvas Conversion with Intelligent Target Size Compression (KB / MB)
    if (['jpeg', 'jpg', 'png', 'webp'].includes(targetFmt) && !item.name.match(/\.(heic|heif|tiff|avif)$/i)) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = item.previewUrl;

        await new Promise((resolve, reject) => {
          img.onload = () => resolve(true);
          img.onerror = reject;
        });

        const outW = effWidth || img.naturalWidth;
        const outH = effHeight || img.naturalHeight;

        canvas.width = outW;
        canvas.height = outH;

        if (targetFmt === 'jpeg' || targetFmt === 'jpg') {
          ctx!.fillStyle = '#FFFFFF';
          ctx!.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx!.drawImage(img, 0, 0, outW, outH);

        const mime = (targetFmt === 'jpeg' || targetFmt === 'jpg') ? 'image/jpeg' : targetFmt === 'png' ? 'image/png' : 'image/webp';

        let blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), mime, q / 100)
        );

        // Target File Size Optimization Loop (KB / MB limit)
        if (effectiveTargetKb && effectiveTargetKb > 0 && blob) {
          const targetBytes = effectiveTargetKb * 1024;
          if (blob.size > targetBytes) {
            let low = 5;
            let high = Math.min(95, q);
            let bestBlob = blob;

            // Binary search quality levels
            while (low <= high) {
              const mid = Math.floor((low + high) / 2);
              const testBlob = await new Promise<Blob | null>((resolve) =>
                canvas.toBlob((b) => resolve(b), mime, mid / 100)
              );
              if (testBlob && testBlob.size <= targetBytes) {
                bestBlob = testBlob;
                low = mid + 1; // Try higher quality
              } else {
                high = mid - 1; // Reduce quality
              }
            }

            // If quality alone cannot hit the target (e.g. <30KB request on a large photo), scale dimensions down
            if (bestBlob.size > targetBytes) {
              let scale = 0.9;
              while (scale >= 0.15) {
                const scaledCanvas = document.createElement('canvas');
                const scaledCtx = scaledCanvas.getContext('2d');
                scaledCanvas.width = Math.max(16, Math.round(outW * scale));
                scaledCanvas.height = Math.max(16, Math.round(outH * scale));
                if (targetFmt === 'jpeg' || targetFmt === 'jpg') {
                  scaledCtx!.fillStyle = '#FFFFFF';
                  scaledCtx!.fillRect(0, 0, scaledCanvas.width, scaledCanvas.height);
                }
                scaledCtx!.drawImage(img, 0, 0, scaledCanvas.width, scaledCanvas.height);
                const testBlob = await new Promise<Blob | null>((resolve) =>
                  scaledCanvas.toBlob((b) => resolve(b), mime, 0.7)
                );
                if (testBlob && testBlob.size <= targetBytes) {
                  bestBlob = testBlob;
                  break;
                }
                scale -= 0.15;
              }
            }

            blob = bestBlob;
          }
        }

        if (blob) {
          return {
            ...item,
            targetFormat: targetFmt,
            status: 'completed',
            convertedBlob: blob,
            convertedUrl: URL.createObjectURL(blob),
            convertedSize: blob.size,
            finalWidth: outW,
            finalHeight: outH,
          };
        }
      } catch (err) {
        console.warn('Canvas conversion fallback to server API:', err);
      }
    }

    // 3. High-Fidelity Server Conversion Fallback (Sharp handles HEIC, AVIF, TIFF, BMP, GIF, targetSizeKb)
    try {
      const formData = new FormData();
      formData.append('image', item.file);
      formData.append('format', targetFmt);
      formData.append('quality', q.toString());
      if (effWidth) formData.append('width', effWidth.toString());
      if (effHeight) formData.append('height', effHeight.toString());
      if (effectiveTargetKb) formData.append('targetSizeKb', effectiveTargetKb.toString());

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/image/convert`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server conversion error (${res.statusText})`);
      }

      const blob = await res.blob();
      const finalW = parseInt(res.headers.get('X-Image-Width') || (effWidth || item.originalWidth || 0).toString());
      const finalH = parseInt(res.headers.get('X-Image-Height') || (effHeight || item.originalHeight || 0).toString());

      return {
        ...item,
        targetFormat: targetFmt,
        status: 'completed',
        convertedBlob: blob,
        convertedUrl: URL.createObjectURL(blob),
        convertedSize: blob.size,
        finalWidth: finalW,
        finalHeight: finalH,
      };
    } catch (err: any) {
      console.error('Conversion failed for item:', item.name, err);
      return {
        ...item,
        status: 'error',
        errorMessage: err.message || 'Failed to convert file format.',
      };
    }
  };

  const handleConvertAll = async () => {
    if (images.length === 0) return;
    setIsConvertingAll(true);

    setImages((prev) =>
      prev.map((i) => (i.status !== 'completed' ? { ...i, status: 'converting' } : i))
    );

    const updated = await Promise.all(
      images.map(async (item) => {
        if (item.status === 'completed') return item;
        return await convertSingleImage(item, item.targetFormat, quality);
      })
    );

    setImages(updated);
    setIsConvertingAll(false);
  };

  const handleDownload = (item: UploadedImage) => {
    if (!item.convertedUrl) return;
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const ext = FORMAT_OPTIONS.find((f) => f.id === item.targetFormat)?.ext || 'jpg';
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = `${baseName}-converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    images.forEach((item) => {
      if (item.status === 'completed') {
        handleDownload(item);
      }
    });
  };

  const completedCount = images.filter((i) => i.status === 'completed').length;
  const hasItems = images.length > 0;

  const uncompletedItems = images.filter((i) => i.status !== 'completed');
  const activeQueueItems = uncompletedItems.length > 0 ? uncompletedItems : images;
  const targetFormatsInQueue = Array.from(new Set(activeQueueItems.map((i) => i.targetFormat)));
  const isUniformTargetFormat = targetFormatsInQueue.length === 1;
  const activeFormatName = isUniformTargetFormat && targetFormatsInQueue[0] ? targetFormatsInQueue[0].toUpperCase() : null;

  const convertAllButtonText = isConvertingAll
    ? 'Converting Images...'
    : activeFormatName
      ? `Convert All to ${activeFormatName}`
      : `Convert All (${images.length} Files)`;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">

      {/* 1. HERO HEADER */}
      <div className="text-center space-y-3">

        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading max-w-5xl mx-auto">
          {title || 'The best free website to convert images to any format.'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          {subtitle || 'Upload any image (PNG, JPG, HEIC, WEBP, AVIF, GIF, BMP, TIFF) and instantly convert it to your chosen format with custom dimensions and target output file size in KB or MB.'}
        </p>
      </div>

      {/* 2. TARGET FORMAT & SETTINGS PANEL */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

        {/* ROW 1: FORMAT SELECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 font-sans font-body !font-sans">
              <Layers className="w-5 h-5 text-slate-800" />
              <span>1. Choose Target Output Format</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Select the file format you want your images converted into.
            </p>
          </div>

          {/* Quality Slider */}
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/80 px-4 py-2 rounded-2xl w-full sm:w-auto">
            <Sliders className="w-4 h-4 text-slate-600 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Quality: {quality}%</span>
              <input
                id="converter-quality-slider"
                type="range"
                min="50"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                aria-label="Image conversion quality slider"
                className="w-24 sm:w-32 h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Format Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {FORMAT_OPTIONS.map((opt) => {
            const isSelected = globalTargetFormat === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleGlobalTargetFormatChange(opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative group cursor-pointer flex flex-col justify-between ${isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                  : 'bg-zinc-50 hover:bg-white text-slate-900 border-zinc-200/80 hover:border-slate-300'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs sm:text-sm">{opt.label}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${isSelected ? 'bg-white/20 text-white' : 'bg-zinc-200 text-slate-700'
                      }`}>
                      {opt.ext}
                    </span>
                  </div>
                  <p className={`text-[10px] line-clamp-2 leading-snug font-normal ${isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                    {opt.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ROW 2: OPTIONAL CUSTOM DIMENSIONS */}
        <div className="pt-4 border-t border-zinc-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans font-body !font-sans">
                <Scaling className="w-4 h-4 text-slate-700" />
                <span>2. Custom Output Dimensions (Optional)</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Keep original image resolution or resize to custom width &amp; height.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setSizeMode('original'); setCustomWidth(''); setCustomHeight(''); }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sizeMode === 'original' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Original Size
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('custom')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sizeMode === 'custom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Custom Dimensions
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('scale')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sizeMode === 'scale' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Scale Percentage
              </button>
            </div>
          </div>

          {/* CUSTOM SIZE INPUT FIELDS */}
          {sizeMode === 'custom' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-wrap items-center gap-4">

                {/* WIDTH INPUT */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Width (px)</label>
                  <div className="relative">
                    <input
                      id="converter-custom-width-input"
                      type="number"
                      placeholder="e.g. 1920"
                      value={customWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      aria-label="Custom output width in pixels"
                      className="w-32 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">px</span>
                  </div>
                </div>

                {/* LOCK ASPECT RATIO BUTTON */}
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => setLockAspectRatio((prev) => !prev)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${lockAspectRatio
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-600 border-zinc-200 hover:text-slate-900'
                      }`}
                    title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                  >
                    {lockAspectRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{lockAspectRatio ? 'Ratio Locked' : 'Ratio Unlocked'}</span>
                  </button>
                </div>

                {/* HEIGHT INPUT */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Height (px)</label>
                  <div className="relative">
                    <input
                      id="converter-custom-height-input"
                      type="number"
                      placeholder="e.g. 1080"
                      value={customHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      aria-label="Custom output height in pixels"
                      className="w-32 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">px</span>
                  </div>
                </div>

                {/* QUICK SIZE PRESETS */}
                <div className="space-y-1 flex-1 min-w-[200px]">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Popular Size Presets</label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {SIZE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${customWidth === preset.width && customHeight === preset.height
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-zinc-200 hover:bg-zinc-100'
                          }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCALE PERCENTAGE SLIDER */}
          {sizeMode === 'scale' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Scaling: {scalePercent}% of original dimensions</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {scalePercent === 100 ? 'Original Size' : scalePercent < 100 ? 'Downscaled' : 'Upscaled'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 font-mono">25%</span>
                <input
                  id="converter-scale-slider"
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={scalePercent}
                  onChange={(e) => setScalePercent(Number(e.target.value))}
                  aria-label="Image scale percentage slider"
                  className="flex-1 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <span className="text-xs font-bold text-slate-500 font-mono">200%</span>
              </div>
              <div className="flex gap-2 pt-1">
                {[50, 75, 100, 125, 150].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setScalePercent(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${scalePercent === pct ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-zinc-200 hover:bg-zinc-100'
                      }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ROW 3: TARGET OUTPUT FILE SIZE (KB / MB) */}
        <div className="pt-4 border-t border-zinc-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans font-body !font-sans">
                <Gauge className="w-4 h-4 text-slate-700" />
                <span>3. Target Output File Size in KB / MB (Optional)</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Compress the output image to stay strictly under a specific KB or MB limit (e.g. for portals, forms, email limits).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTargetSizeEnabled(!targetSizeEnabled);
                  if (!targetSizeEnabled && !targetSizeValue) setTargetSizeValue(200);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${targetSizeEnabled
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-slate-700 border-zinc-200'
                  }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>{targetSizeEnabled ? 'Limit Active' : 'Set KB/MB Limit'}</span>
              </button>
            </div>
          </div>

          {/* TARGET FILE SIZE INPUT & PRESETS */}
          {targetSizeEnabled && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-wrap items-center gap-4">

                {/* VALUE INPUT + UNIT TOGGLE */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Max File Size ({targetSizeUnit})
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="converter-target-size-input"
                      type="number"
                      step={targetSizeUnit === 'MB' ? '0.1' : '1'}
                      min="1"
                      placeholder={targetSizeUnit === 'MB' ? 'e.g. 1.5' : 'e.g. 200'}
                      value={targetSizeValue}
                      onChange={(e) => setTargetSizeValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      aria-label="Target maximum output file size"
                      className="w-32 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                    />

                    {/* UNIT TOGGLE PILL */}
                    <div className="inline-flex p-0.5 bg-zinc-200 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTargetSizeUnit('KB')}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${targetSizeUnit === 'KB' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:text-black'
                          }`}
                      >
                        KB
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetSizeUnit('MB')}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${targetSizeUnit === 'MB' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:text-black'
                          }`}
                      >
                        MB
                      </button>
                    </div>
                  </div>
                </div>

                {/* TARGET SIZE PRESETS */}
                <div className="space-y-1 flex-1 min-w-[200px]">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Quick Size Presets</label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {TARGET_SIZE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyTargetSizePreset(preset)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${targetSizeValue === preset.val && targetSizeUnit === preset.unit
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-zinc-200 hover:bg-zinc-100'
                          }`}
                      >
                        {preset.label}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        setTargetSizeEnabled(false);
                        setTargetSizeValue('');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      Clear Limit
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. UPLOAD DROPZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-between w-full min-h-[350px] p-5 sm:p-7 rounded-3xl sm:rounded-[2rem] border border-white/60 bg-gradient-to-b from-[#D4E8FA] via-[#B8D9F8] to-[#4B8DF8] transition-all cursor-pointer group overflow-hidden shadow-xl backdrop-blur-xl ${
          isDragOver
            ? 'scale-[1.01] ring-4 ring-[#2A65FF]/40'
            : 'hover:shadow-[0_20px_45px_rgba(75,141,248,0.35)] hover:scale-[1.003]'
        }`}
      >
        <input
          id="converter-file-upload-input"
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.heic,.heif,.avif,.tiff,.bmp,.svg"
          onChange={handleFileChange}
          aria-label="Upload image files for format conversion"
          className="hidden"
        />

        {/* TOP GLOWING CENTRAL BLUE ICON WITH AURA */}
        <div className="relative flex flex-col items-center justify-center my-2 pointer-events-none">
          {/* Animated outer aura ring */}
          <div className="absolute w-28 h-28 rounded-full bg-[#2A65FF]/30 blur-xl animate-pulse pointer-events-none" />
          
          {/* Compact 3D Blue Icon Container */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#1E50F2] via-[#2A65FF] to-[#3B82F6] flex items-center justify-center shadow-[0_10px_25px_rgba(30,80,242,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Upload className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* MIDDLE FLOATING WHITE CARD WITH COMPACT FONTS */}
        <div className="w-full max-w-lg bg-white backdrop-blur-md border border-white/80 rounded-2xl p-4 sm:p-5 shadow-md space-y-2 pointer-events-none transition-all group-hover:-translate-y-0.5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl  text-[#1E50F2] flex items-center justify-center shrink-0 shadow-2xs">
              <FileImage className="w-4.5 h-4.5 text-[#1E50F2]" />
            </div>
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans">
                  Drop your image here, or <span className="text-[#1E50F2] font-black underline underline-offset-2">Browse</span>
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                Universal image converter studio. Supports PNG, JPG, WEBP, HEIC, AVIF &amp; GIF up to 50MB.
              </p>
              
              <div className="pt-1.5 flex flex-wrap items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-700">
                <span className="px-2 py-0.5 bg-white/80 rounded-full border border-zinc-200/80 shadow-2xs">Auto Format Detection</span>
                <span className="px-2 py-0.5 bg-white/80 rounded-full border border-zinc-200/80 shadow-2xs">Target Size in KB &bull; MB</span>
                <span className="px-2 py-0.5 bg-white/80 rounded-full border border-zinc-200/80 shadow-2xs">Custom Dimensions</span>
                <span className="px-2 py-0.5 bg-white/80 rounded-full border border-zinc-200/80 shadow-2xs">100% Privacy</span>
              </div>

              <div className="pt-1 flex items-center text-xs font-bold text-[#1E50F2] gap-1">
                <span>Select Files from Device</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* UPLOAD SUCCESS BADGE */}
        {images.length > 0 && (
          <div className="pt-2 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-900 text-xs font-extrabold shadow-sm animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{images.length} Image{images.length > 1 ? 's' : ''} Ready Below</span>
            </div>
          </div>
        )}

        {/* BOTTOM FLOATING TRANSLUCENT ACTION PILL BAR */}
        <div className="w-full max-w-lg bg-white/20 border border-white/40 backdrop-blur-md rounded-xl px-4 py-2.5 text-white flex items-center justify-between mt-3 shadow-inner text-xs font-medium pointer-events-none">
          <span className="text-white/95 text-xs font-medium drop-shadow-2xs truncate pr-2">
            Ready to convert your photos? Click anywhere to start
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#1E50F2] text-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ImagePlus className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {hasItems && (
        <div ref={queueRef} id="conversion-queue" className="space-y-4 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-base sm:text-lg font-black text-slate-900 font-sans font-body !font-sans">
                  Uploaded Queue ({images.length} Image{images.length > 1 ? 's' : ''})
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Target conversion: <span className="font-bold text-slate-900 uppercase">{globalTargetFormat}</span>
                {sizeMode === 'custom' && customWidth && customHeight && (
                  <span className="text-slate-700 font-mono"> &bull; Resizing to {customWidth}&times;{customHeight}px</span>
                )}
                {sizeMode === 'scale' && scalePercent !== 100 && (
                  <span className="text-slate-700 font-mono"> &bull; Scaling to {scalePercent}%</span>
                )}
                {targetSizeEnabled && targetSizeValue && (
                  <span className="text-emerald-700 font-mono font-bold"> &bull; Target File Size: &le; {targetSizeValue} {targetSizeUnit}</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={handleConvertAll}
                disabled={isConvertingAll}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isConvertingAll ? 'animate-spin' : ''}`} />
                <span>{convertAllButtonText}</span>
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ({completedCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {images.map((item) => {
              const hasConverted = item.status === 'completed';
              const isConverting = item.status === 'converting';
              const isError = item.status === 'error';
              const savings =
                hasConverted && item.convertedSize
                  ? Math.round(((item.originalSize - item.convertedSize) / item.originalSize) * 100)
                  : 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-3xl p-5 sm:p-6 transition-all shadow-sm ${hasConverted
                    ? 'border-emerald-200 bg-emerald-50/15 ring-1 ring-emerald-500/10'
                    : isConverting
                      ? 'border-sky-200 bg-sky-50/15 ring-1 ring-sky-500/10'
                      : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">

                    {/* LEFT SECTION: THUMBNAIL + FILE DETAILS */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      {/* Image Thumbnail */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0 shadow-inner group">
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* File Name + Metadata */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate max-w-xs sm:max-w-md" title={item.name}>
                          {item.name}
                        </h4>

                        {/* BADGES ROW (DETECTED FORMAT + STATUS) */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* FORMAT BADGE */}
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono font-bold text-[10px] uppercase shadow-xs">
                            Detected: {item.originalFormat}
                          </span>

                          {/* STATUS BADGE */}
                          {hasConverted ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Converted to {item.targetFormat.toUpperCase()}
                            </span>
                          ) : isConverting ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                              <RefreshCw className="w-3 h-3 text-sky-600 animate-spin" />
                              Converting...
                            </span>
                          ) : isError ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                              Conversion Failed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Ready
                            </span>
                          )}
                        </div>

                        {/* STRUCTURED METRICS ROW */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 font-medium">Original:</span>
                            <span className="font-mono font-bold text-slate-800">{formatBytes(item.originalSize)}</span>
                            {item.originalWidth && item.originalHeight && (
                              <span className="font-mono text-slate-500 text-[11px]">({item.originalWidth}&times;{item.originalHeight}px)</span>
                            )}
                          </div>

                          {hasConverted && item.convertedSize && (
                            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                              <span>&bull;</span>
                              <span className="text-emerald-800 font-medium">Converted:</span>
                              <span className="font-mono font-black text-emerald-900 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                {formatBytes(item.convertedSize)}
                              </span>
                              {item.finalWidth && item.finalHeight && (
                                <span className="font-mono text-emerald-700 text-[11px]">({item.finalWidth}&times;{item.finalHeight}px)</span>
                              )}
                              {savings > 0 && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  -{savings}% smaller
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* MIDDLE SECTION: CONVERSION ROUTE & SIZE CONTROL */}
                    <div className="flex flex-wrap items-center gap-3 bg-zinc-50 border border-zinc-200/80 px-4 py-2.5 rounded-2xl shrink-0 self-stretch sm:self-auto justify-center">
                      <div className="text-center">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">From</span>
                        <span className="font-mono font-bold text-xs text-slate-800 uppercase">{item.originalFormat}</span>
                      </div>

                      <div className="p-1 rounded-full bg-white border border-zinc-200 text-slate-400">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      </div>

                      <div className="flex flex-col items-center relative">
                        <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">To</span>

                        {/* Custom Format Selector Pill Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSizeMenuId(null);
                            setOpenFormatMenuId(openFormatMenuId === item.id ? null : item.id);
                          }}
                          className="flex items-center gap-1.5 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 hover:border-slate-900 rounded-xl px-2.5 py-1 font-mono font-black text-xs text-slate-900 uppercase transition-all shadow-xs cursor-pointer group"
                          title="Click to select target format for this image"
                        >
                          <span>{item.targetFormat.toUpperCase()}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform ${openFormatMenuId === item.id ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Custom Floating Format Popover Menu */}
                        {openFormatMenuId === item.id && (
                          <div
                            className="absolute top-full mt-1.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-32 bg-white border border-zinc-200/90 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 font-mono text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1 border-b border-zinc-100 mb-1">
                              Target Format
                            </div>
                            <div className="space-y-0.5 max-h-48 overflow-y-auto pr-0.5">
                              {FORMAT_OPTIONS.map((f) => {
                                const isSelected = item.targetFormat === f.id;
                                return (
                                  <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => {
                                      const newFmt = f.id as OutputFormat;
                                      setImages((prev) =>
                                        prev.map((i) =>
                                          i.id === item.id
                                            ? {
                                              ...i,
                                              targetFormat: newFmt,
                                              status: i.status === 'completed' ? 'idle' : i.status,
                                            }
                                            : i
                                        )
                                      );
                                      setOpenFormatMenuId(null);
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl font-bold uppercase text-xs transition-all cursor-pointer ${isSelected
                                      ? 'bg-slate-900 text-white shadow-xs'
                                      : 'text-slate-700 hover:bg-zinc-100 hover:text-slate-900'
                                      }`}
                                  >
                                    <span>{f.ext.toUpperCase()}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="h-5 w-px bg-zinc-200 mx-0.5 hidden sm:block" />

                      {/* Per-Card Target Output File Size Control */}
                      <div className="flex flex-col items-center relative">
                        <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Max File Size</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenFormatMenuId(null);
                            setOpenSizeMenuId(openSizeMenuId === item.id ? null : item.id);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer group ${item.targetSizeKb
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                            : 'bg-white hover:bg-slate-900 hover:text-white border-zinc-200/80 text-slate-700'
                            }`}
                          title="Set target max file size limit (KB / MB) for this image"
                        >
                          <Gauge className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                          <span>
                            {item.targetSizeKb
                              ? item.targetSizeKb >= 1024
                                ? `< ${(item.targetSizeKb / 1024).toFixed(1)} MB`
                                : `< ${item.targetSizeKb} KB`
                              : 'No Limit'}
                          </span>
                          <ChevronDown className={`w-3 h-3 text-slate-500 group-hover:text-white transition-transform ${openSizeMenuId === item.id ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Target Size Popover Menu */}
                        {openSizeMenuId === item.id && (
                          <div
                            className="absolute top-full mt-1.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-60 bg-white border border-zinc-200/90 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 font-sans text-xs space-y-2.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Target Max Size</span>
                              {item.targetSizeKb ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setImages((prev) =>
                                      prev.map((i) => (i.id === item.id ? { ...i, targetSizeKb: null, status: i.status === 'completed' ? 'idle' : i.status } : i))
                                    );
                                    setOpenSizeMenuId(null);
                                  }}
                                  className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                                >
                                  Clear Limit
                                </button>
                              ) : null}
                            </div>

                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-zinc-400 uppercase">Select Target KB / MB Cap</span>
                              <div className="grid grid-cols-3 gap-1">
                                {[50, 100, 200, 500, 1024, 2048, 5120].map((kb) => {
                                  const label = kb >= 1024 ? `< ${kb / 1024} MB` : `< ${kb} KB`;
                                  const isSel = item.targetSizeKb === kb;
                                  return (
                                    <button
                                      key={kb}
                                      type="button"
                                      onClick={() => {
                                        setImages((prev) =>
                                          prev.map((i) => (i.id === item.id ? { ...i, targetSizeKb: kb, status: i.status === 'completed' ? 'idle' : i.status } : i))
                                        );
                                        setOpenSizeMenuId(null);
                                      }}
                                      className={`py-1 px-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all cursor-pointer ${isSel
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-zinc-50 text-slate-700 border-zinc-200 hover:bg-zinc-100'
                                        }`}
                                    >
                                      {label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* CUSTOM SIZE INPUT FIELD */}
                            <div className="space-y-1 pt-1.5 border-t border-zinc-100">
                              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Custom Limit (Type Value)</span>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  min="1"
                                  placeholder={cardUnit === 'MB' ? 'e.g. 1.5' : 'e.g. 150'}
                                  value={
                                    item.targetSizeKb
                                      ? cardUnit === 'MB'
                                        ? (item.targetSizeKb / 1024).toString()
                                        : item.targetSizeKb.toString()
                                      : ''
                                  }
                                  onChange={(e) => {
                                    const valStr = e.target.value;
                                    if (valStr === '') {
                                      setImages((prev) =>
                                        prev.map((i) => (i.id === item.id ? { ...i, targetSizeKb: null, status: i.status === 'completed' ? 'idle' : i.status } : i))
                                      );
                                      return;
                                    }
                                    const parsed = parseFloat(valStr);
                                    if (isNaN(parsed) || parsed <= 0) return;
                                    const kbVal = cardUnit === 'MB' ? Math.round(parsed * 1024) : Math.round(parsed);
                                    setImages((prev) =>
                                      prev.map((i) => (i.id === item.id ? { ...i, targetSizeKb: kbVal, status: i.status === 'completed' ? 'idle' : i.status } : i))
                                    );
                                  }}
                                  className="w-full px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />

                                <div className="inline-flex p-0.5 bg-zinc-200 rounded-lg shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setCardUnit('KB')}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-black font-mono transition-all ${cardUnit === 'KB' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-black'
                                      }`}
                                  >
                                    KB
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCardUnit('MB')}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-black font-mono transition-all ${cardUnit === 'MB' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-black'
                                      }`}
                                  >
                                    MB
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT SECTION: ACTION BUTTONS */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-zinc-100">
                      {hasConverted ? (
                        <button
                          type="button"
                          onClick={() => handleDownload(item)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download {item.targetFormat.toUpperCase()}</span>
                        </button>
                      ) : isConverting ? (
                        <div className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-100 text-slate-800 text-xs font-bold">
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-700" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={async () => {
                            setImages((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, status: 'converting' } : i))
                            );
                            const res = await convertSingleImage(item, item.targetFormat, quality);
                            setImages((prev) => prev.map((i) => (i.id === item.id ? res : i)));
                          }}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Convert to {item.targetFormat.toUpperCase()}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(item.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 rounded-2xl hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                        title="Remove image from queue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. PRIVACY & PERFORMANCE FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-200/80">
        <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-900">
            <Gauge className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Target File Size (KB &bull; MB)</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Intelligent compression and downscaling algorithms optimize files to fit under strict KB and MB caps with maximal clarity.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">100% Privacy Guarantee</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Your images remain private on your computer or phone. We do not store, view, or retain your personal photographs.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-900">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Custom Sizing Fidelity</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            High-precision pixel interpolation preserves sharpness, text clarity, and proportions when resizing dimensions.
          </p>
        </div>
      </div>

    </div>
  );
}
