'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CONVERSION_PAIRS } from '@/lib/conversions';

interface FormatSwitcherProps {
  currentPairId?: string;
  onSelectPair?: (pairId: string) => void;
}

export function FormatSwitcher({ currentPairId, onSelectPair }: FormatSwitcherProps) {
  const featuredPairs = [
    'heic-to-jpg',
    'jpg-to-jpeg',
    'png-to-jpg',
    'webp-to-png',
    'jpg-to-webp',
    'svg-to-png',
    'png-to-webp',
    'gif-to-webp',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 bg-white/80 border border-zinc-200/80 p-3 rounded-2xl shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Quick Format Converters</span>
        </div>
        <span className="text-[10px] text-slate-600 font-medium">100% In-Browser &amp; Free</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {featuredPairs.map((pairKey) => {
          const pair = CONVERSION_PAIRS[pairKey];
          if (!pair) return null;

          const isActive = currentPairId === pairKey;

          if (onSelectPair) {
            return (
              <button
                key={pairKey}
                type="button"
                onClick={() => onSelectPair(pairKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200/80 hover:border-zinc-300'
                }`}
              >
                <span>{pair.fromFormat}</span>
                <ArrowRight className={`w-3 h-3 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{pair.toFormat}</span>
              </button>
            );
          }

          return (
            <Link
              key={pairKey}
              href={`/convert/${pairKey}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <span>{pair.fromFormat}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
              <span>{pair.toFormat}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
