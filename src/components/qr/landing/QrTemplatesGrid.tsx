'use client';

import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export function QrTemplatesGrid() {
  const frames = [
    {
      name: 'Scan Me Badge',
      badgeText: 'SCAN ME',
      color: 'bg-slate-900 text-white',
      borderColor: 'border-slate-900',
      description: 'Classic call-to-action border for flyers, business cards & posters.',
    },
    {
      name: 'Order Here Frame',
      badgeText: 'ORDER HERE',
      color: 'bg-amber-500 text-slate-950 font-black',
      borderColor: 'border-amber-500',
      description: 'Designed for restaurant dining tables, food menus & pickup counters.',
    },
    {
      name: 'Connect Wi-Fi Frame',
      badgeText: 'FREE WI-FI',
      color: 'bg-emerald-600 text-white',
      borderColor: 'border-emerald-600',
      description: 'Ideal for hotels, coffee shops, guest lobbies & co-working spaces.',
    },
    {
      name: 'Follow Us Social',
      badgeText: 'FOLLOW US',
      color: 'bg-indigo-600 text-white',
      borderColor: 'border-indigo-600',
      description: 'Perfect for retail checkout desks, Instagram tags & product inserts.',
    },
    {
      name: 'Review Us Badge',
      badgeText: 'LEAVE A REVIEW',
      color: 'bg-rose-600 text-white',
      borderColor: 'border-rose-600',
      description: 'Boost Google Reviews, Trustpilot feedback & customer ratings.',
    },
    {
      name: 'Minimal Clean Border',
      badgeText: 'SCAN HERE',
      color: 'bg-slate-200 text-slate-900',
      borderColor: 'border-slate-300',
      description: 'Subtle high-contrast frame for minimalist luxury branding.',
    },
  ];

  const handleSelectFrame = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-bold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Custom Frame Templates
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Boost scan rates with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              eye-catching CTA frames.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            Adding a clear call-to-action border frame increases QR scan conversion by up to 80%. Select your preset frame in the studio.
          </p>
        </div>

        {/* Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {frames.map((frame, idx) => (
            <div
              key={idx}
              onClick={handleSelectFrame}
              className="group p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Frame Preview Visual */}
                <div className={`p-4 rounded-2xl bg-white border-2 ${frame.borderColor} flex flex-col items-center justify-center space-y-3 shadow-xs`}>
                  {/* QR Matrix Mock */}
                  <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                    <div className="w-full h-full border-2 border-white/20 rounded border-dashed flex items-center justify-center text-white/50 text-[10px] font-mono">
                      QR CODE
                    </div>
                  </div>
                  {/* Badge */}
                  <div className={`px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-xs ${frame.color}`}>
                    {frame.badgeText}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-indigo-600 transition-colors">
                    {frame.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {frame.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-bold text-slate-900">
                <span className="text-slate-500 font-semibold group-hover:text-indigo-600 transition-colors">Apply in Studio</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
