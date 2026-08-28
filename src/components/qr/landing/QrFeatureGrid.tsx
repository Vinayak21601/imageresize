'use client';

import React from 'react';
import {
  Palette,
  RotateCcw,
  Download,
  BarChart3,
  Lock,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function QrFeatureGrid() {
  const features = [
    {
      icon: Palette,
      badge: 'Design Freedom',
      title: 'Custom Brand & Dot Styling',
      description: 'Choose from 6 dot patterns, custom corner frame eyes, 2-color linear gradients, and embed your PNG/SVG logo in the center with zero scan degradation.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      icon: RotateCcw,
      badge: 'Zero Reprinting',
      title: '100% Dynamic QR Codes',
      description: 'Change target destination links, update PDF catalogs, or edit contact details anytime without having to re-print physical flyers, packaging, or cards.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      icon: Download,
      badge: 'Print Production',
      title: 'Vector SVG, EPS & High-Res Export',
      description: 'Download print-ready vector files (SVG & EPS) and ultra high-definition PNG images (up to 4000x4000px, 300 DPI) for billboard & packaging printing.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: BarChart3,
      badge: 'Scan Analytics',
      title: 'Real-Time Scan Telemetry',
      description: 'Track scanner demographics in real-time—monitor daily scan volume, scanner geographical country & city distribution, device OS (iOS vs Android), and top hours.',
      color: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      icon: Lock,
      badge: 'Enterprise Security',
      title: 'Password & Expiration Caps',
      description: 'Secure sensitive document QR codes behind password protection, set hard expiry dates, or cap maximum allowed scan iterations.',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      icon: Layers,
      badge: 'Bulk Operations',
      title: 'Bulk Generation & Custom Frames',
      description: 'Generate hundreds of customized QR codes at once via CSV upload or custom call-to-action border frame badges ("SCAN ME", "ORDER NOW").',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section className="w-full py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            Enterprise-Grade Platform
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Everything you need to create, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              customize &amp; track QR codes.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            Built for design agencies, retail brands, restaurants, and event organizers who demand visual excellence and reliable scan tracking.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-slate-50/50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${item.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-950 transition-colors font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Included in generator
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
