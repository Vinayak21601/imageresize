'use client';

import React from 'react';
import { Utensils, Briefcase, Package, Building2, Sparkles, ArrowRight } from 'lucide-react';

export function QrUseCasesGallery() {
  const useCases = [
    {
      category: 'Restaurants & Hospitality',
      icon: Utensils,
      title: 'Contactless Digital Menus',
      description: 'Place custom QR code table tents and window stickers to display PDF food menus, accept table reservations, and gather Google reviews.',
      stats: '40% Faster Table Turnaround',
      tags: ['Table Tents', 'PDF Menus', 'Wi-Fi Access', 'Review Badges'],
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    },
    {
      category: 'Corporate & Networking',
      icon: Briefcase,
      title: 'Digital Business Cards',
      description: 'Print vCard QR codes on physical business cards so clients can save your name, direct phone line, email, and social profiles in 1 tap.',
      stats: '100% Paperless Contact Saving',
      tags: ['vCard Cards', 'Email Signatures', 'Trade Show Badges'],
      gradient: 'from-indigo-500/10 via-sky-500/5 to-transparent',
    },
    {
      category: 'Retail & Packaging',
      icon: Package,
      title: 'Smart Product Packaging',
      description: 'Add QR codes to product boxes, clothing tags, and food labels for instant digital user manuals, warranty activation, and authentic verification.',
      stats: '3.5x Higher Post-Purchase Engagement',
      tags: ['Box Labels', 'Warranty PDF', 'How-to Videos'],
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    },
    {
      category: 'Real Estate & Events',
      icon: Building2,
      title: 'Property Flyers & Event Pass',
      description: 'Place dynamic QR codes on yard signs, listing flyers, and conference banners to launch 3D virtual property tours or issue instant ticket check-ins.',
      stats: '85% Lead Capture Rate',
      tags: ['Yard Signs', 'Open House Tours', 'Event Badges'],
      gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-xs font-bold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            Industry Use Cases
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Designed for print, packaging &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              real-world marketing.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            See how businesses across dining, retail, real estate, and networking leverage custom QR codes to boost customer conversion.
          </p>
        </div>

        {/* Use Cases Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Subtle Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none`} />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                        <IconComponent className="w-5 h-5 text-indigo-300" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-extrabold border border-slate-200">
                      {item.stats}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="relative pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
