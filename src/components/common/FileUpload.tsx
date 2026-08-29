'use client';

import React, { useCallback, useState } from 'react';
import { Upload, ImagePlus, ArrowRight, Sparkles, FileImage } from 'lucide-react';
import { ImageMetadata } from '@/types/image';

interface FileUploadProps {
  onImageSelected: (file: File, metadata: ImageMetadata) => void;
}

export function FileUpload({ onImageSelected }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (PNG, JPG, WEBP, AVIF, GIF, SVG).');
        return;
      }

      const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB cap
      if (file.size > MAX_SIZE_BYTES) {
        alert('File size exceeds the 10 MB limit. Please select a smaller image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const metadata: ImageMetadata = {
            name: file.name,
            type: file.type,
            size: file.size,
            width: img.width,
            height: img.height,
            aspectRatio: img.width / img.height,
            previewUrl,
          };
          onImageSelected(file, metadata);
        };
        img.src = previewUrl;
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative flex flex-col items-center justify-between w-full min-h-[350px] p-5 sm:p-7 rounded-3xl sm:rounded-[2rem] border border-white/60 bg-gradient-to-b from-[#D4E8FA] via-[#B8D9F8] to-[#4B8DF8] transition-all cursor-pointer group overflow-hidden shadow-xl backdrop-blur-xl ${
        isDragging
          ? 'scale-[1.01] ring-4 ring-[#2A65FF]/40'
          : 'hover:shadow-[0_20px_45px_rgba(75,141,248,0.35)] hover:scale-[1.003]'
      }`}
    >
      <input
        id="image-file-upload-input"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/avif, image/gif, image/svg+xml"
        onChange={handleFileInput}
        aria-label="Upload image file for cropping and resizing"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
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
      <div className="w-full max-w-lg bg-white backdrop-blur-md border border-white/80 rounded-2xl p-4 sm:p-5 shadow-md space-y-2 pointer-events-none transition-all group-hover:bg-[#EBECEF]/95 group-hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#DCE6FA] text-[#1E50F2] flex items-center justify-center shrink-0 shadow-2xs">
            <FileImage className="w-4.5 h-4.5 text-[#1E50F2]" />
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans">
                Drop your image here, or <span className="text-[#1E50F2] font-black underline underline-offset-2">Browse</span>
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
              High-precision cropping studio. Supports PNG, JPG, WEBP, AVIF &amp; GIF up to 10MB.
            </p>
            <div className="pt-1 flex items-center text-xs font-bold text-[#1E50F2] gap-1">
              <span>Select File from Device</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FLOATING TRANSLUCENT ACTION PILL BAR */}
      <div className="w-full max-w-lg bg-white/20 border border-white/40 backdrop-blur-md rounded-xl px-4 py-2.5 text-white flex items-center justify-between mt-3 shadow-inner text-xs font-medium pointer-events-none">
        <span className="text-white/95 text-xs font-medium drop-shadow-2xs truncate pr-2">
          Ready to upload your photo? Click anywhere to start
        </span>
        <div className="w-7 h-7 rounded-lg bg-[#1E50F2] text-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <ImagePlus className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
