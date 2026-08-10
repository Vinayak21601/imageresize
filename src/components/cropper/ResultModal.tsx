'use client';

import React from 'react';
import { Download, CheckCircle2, X, TrendingDown } from 'lucide-react';
import { formatBytes } from '@/lib/units';
import { AdBanner } from '@/components/common/AdBanner';

interface ResultModalProps {
  downloadUrl: string;
  filename: string;
  originalSize: number;
  finalSize: number;
  finalWidth: number;
  finalHeight: number;
  format: string;
  onClose: () => void;
}

export function ResultModal({
  downloadUrl,
  filename,
  originalSize,
  finalSize,
  finalWidth,
  finalHeight,
  format,
  onClose,
}: ResultModalProps) {
  const savingsPct = Math.round(((originalSize - finalSize) / originalSize) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-zinc-200/80 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden space-y-6">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-slate-900 hover:bg-zinc-100 rounded-full bg-zinc-50 border border-zinc-200 transition-all cursor-pointer"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center font-bold shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-heading">
              Image Processed Successfully!
            </h3>
            <p className="text-xs text-zinc-500 font-light">Ready for instant high-speed download</p>
          </div>
        </div>

        {/* Image Preview Thumbnail */}
        <div className="w-full max-h-56 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center p-3 overflow-hidden shadow-inner">
          <img
            src={downloadUrl}
            alt="Processed result"
            className="max-h-48 object-contain rounded-xl shadow-sm"
          />
        </div>

        {/* Statistics Card */}
        <div className="p-4 sm:p-5 bg-zinc-50/80 border border-zinc-200/80 text-slate-900 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-500 pb-2.5 border-b border-zinc-200/70">
            <span>Original File Size:</span>
            <span className="text-slate-900 font-bold">{formatBytes(originalSize)}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-500 pb-2.5 border-b border-zinc-200/70">
            <span>Final Cropped Size:</span>
            <span className="text-emerald-600 font-black text-sm">{formatBytes(finalSize)}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-500">
            <span>Dimensions &amp; Format:</span>
            <span className="text-slate-900 font-bold">
              {finalWidth} x {finalHeight} px ({(format || 'jpg').toUpperCase()})
            </span>
          </div>

          {savingsPct > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold font-sans">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>File Size Optimization</span>
              </div>
              <span className="font-extrabold font-mono text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
                -{savingsPct}% REDUCED
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={downloadUrl}
            download={`cropped-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`}
            className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-white" />
            Download File
          </a>

          <button
            type="button"
            onClick={onClose}
            className="py-3.5 px-5 bg-zinc-100 hover:bg-zinc-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-full border border-zinc-200/80 transition-all cursor-pointer active:scale-95"
          >
            Crop Another
          </button>
        </div>
      </div>
    </div>
  );
}
