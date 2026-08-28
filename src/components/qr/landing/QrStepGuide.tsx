'use client';

import React from 'react';
import { Layers, Palette, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export function QrStepGuide() {
  const steps = [
    {
      step: '01',
      icon: Layers,
      title: 'Select Content Type',
      description: 'Choose your destination type—Website URL, PDF menu/catalog, Wi-Fi login credentials, vCard contact, or WhatsApp message template.',
    },
    {
      step: '02',
      icon: Palette,
      title: 'Customize Brand Design',
      description: 'Tailor your QR matrix with custom dot shapes, corner eyes, 2-color linear gradients, CTA frames, and upload your central brand logo.',
    },
    {
      step: '03',
      icon: Download,
      title: 'Download & Track Scans',
      description: 'Export in vector SVG/EPS for professional printing or high-res PNG. Monitor scan volume, geographical locations, and devices in real time.',
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-bold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            How to create custom QR codes <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              in under 60 seconds.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            No design software required. Generate high-resolution, print-ready custom QR codes directly from your browser.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-4xl font-black text-slate-200 font-mono tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
