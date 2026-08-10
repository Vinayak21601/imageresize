'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Google AdSense Banner Component
 * Designed with fixed container sizes to prevent Cumulative Layout Shift (CLS).
 * Renders a stylish developer placeholder when ad client ID is not configured.
 */
export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log('AdSense execution error:', err);
    }
  }, []);

  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

  return (
    <div className={`my-4 flex flex-col items-center justify-center w-full overflow-hidden ${className}`}>
      {/* Small subtle label */}
      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">
        {label}
      </span>

      {adClientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={adClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        /* Developer Mode Placeholder (Stylized matching Divi Neon theme) */
        <div className="w-full min-h-[90px] rounded-xl border border-dashed border-zinc-800 bg-zinc-950/60 p-4 flex flex-col items-center justify-center text-center group hover:border-[#CCFF00]/40 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-200">
              Google AdSense Space ({format.toUpperCase()})
            </span>
          </div>
          <p className="text-[11px] text-zinc-600 mt-0.5">
            Add <code className="text-[#CCFF00] bg-zinc-900 px-1 py-0.5 rounded">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in .env to activate
          </p>
        </div>
      )}
    </div>
  );
}
