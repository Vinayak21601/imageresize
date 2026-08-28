'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-6">
          
          <div className="flex items-center justify-center gap-3">
            <img
              src="/logo.webp"
              alt="CropMyImages Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="font-serif italic font-normal text-2xl tracking-tight text-slate-900">
              CropMyImages
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              This page couldn&apos;t load
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We encountered an unexpected load error. Click below to reload the page or return to safety.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Reload Page
            </button>

            <Link
              href="/"
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all text-center block"
            >
              Return to Homepage
            </Link>
          </div>

        </div>
      </body>
    </html>
  );
}
