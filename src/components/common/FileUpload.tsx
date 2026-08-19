'use client';

import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
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
      className={`relative flex flex-col items-center justify-center w-full min-h-[380px] p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.03)] ${isDragging
          ? 'border-slate-900 bg-sky-50/50 scale-[1.01] shadow-xl'
          : 'border-zinc-200 bg-white hover:border-slate-800 hover:shadow-lg'
        }`}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp, image/avif, image/gif, image/svg+xml"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      <div className="flex flex-col items-center text-center max-w-md pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
          <Upload className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 font-sans">
          Drop your image here or <span className="text-black font-extrabold underline underline-offset-4">browse</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-normal">
          High-precision cropping &amp; resizing studio. Supports PNG, JPG, WEBP, AVIF.
        </p>

        <div className="text-xs text-zinc-400 font-medium tracking-wide">
          Max file size: <span className="text-slate-900 font-bold">10 MB</span> per image.
        </div>
      </div>
    </div>
  );
}
