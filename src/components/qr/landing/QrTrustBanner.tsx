'use client';

import React from 'react';
import { QrCode, ShieldCheck, Zap, Globe, Sparkles, Award } from 'lucide-react';

export function QrTrustBanner() {
  const stats = [
    {
      icon: QrCode,
      value: '10M+',
      label: 'QR Codes Generated',
      highlight: 'Global print & digital',
    },
    {
      icon: ShieldCheck,
      value: '99.9%',
      label: 'Redirect Reliability',
      highlight: 'Zero broken links',
    },
    {
      icon: Zap,
      value: '< 15ms',
      label: 'Ultra-Fast Redirects',
      highlight: 'Edge worker cached',
    },
    {
      icon: Globe,
      value: '180+',
      label: 'Countries Active',
      highlight: 'Global scanner network',
    },
  ];

  return (
    <section className="w-full py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trusted Solution</p>
              <h3 className="text-base font-bold text-slate-900">Powering millions of QR scans worldwide</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              100% Dynamic Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Vector SVG &amp; EPS Export
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                    {stat.value}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{stat.label}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.highlight}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
