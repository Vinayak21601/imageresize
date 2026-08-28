'use client';

import React from 'react';
import { BarChart3, Globe, Smartphone, ArrowRight, ShieldCheck, Zap, TrendingUp, Users } from 'lucide-react';

export function QrDashboardTeaser() {
  const handleScrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-20 bg-slate-950 text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-bold text-sky-400 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5" />
            Dynamic Analytics &amp; Control Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Track scans in real time with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-white">
              powerful scanner telemetry.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal max-w-xl mx-auto leading-relaxed">
            Gain deep insights into your marketing campaigns. Monitor scan volume, geographical locations, devices, and peak scanning hours.
          </p>
        </div>

        {/* Dashboard Teaser Mock Frame */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Top Bar Mock */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Campaign: Summer_Menu_Scan
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase">
                    Active Dynamic
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">https://imgsz.link/q/xK9p2L &bull; Target: https://restaurant.com/menu</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                Last 30 Days
              </span>
              <button
                onClick={handleScrollToStudio}
                className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all cursor-pointer shadow-md"
              >
                Create Dynamic QR
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Total Scans</p>
              <p className="text-2xl font-black text-white font-mono">142,850</p>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +24% vs last week
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Unique Scanners</p>
              <p className="text-2xl font-black text-white font-mono">98,420</p>
              <p className="text-[11px] text-slate-400">Unique IP addresses</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Top Device OS</p>
              <p className="text-2xl font-black text-sky-400 font-mono">iOS (64%)</p>
              <p className="text-[11px] text-slate-400">Android 32% &bull; Other 4%</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Top Country</p>
              <p className="text-2xl font-black text-indigo-300 font-mono">United States</p>
              <p className="text-[11px] text-slate-400">New York &bull; 42% volume</p>
            </div>
          </div>

          {/* Visual Graph Mock */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Scan Activity Trend</h4>
              <span className="text-[10px] text-slate-500 font-mono">Peak: 8,420 scans/day</span>
            </div>

            {/* Bar chart mockup */}
            <div className="h-32 flex items-end justify-between gap-1.5 pt-4">
              {[35, 42, 60, 48, 75, 90, 82, 95, 110, 88, 120, 140, 130, 160, 175, 150, 190, 210, 180, 230, 250, 240, 280, 310].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${(h / 310) * 100}%` }}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-sm hover:brightness-125 transition-all"
                  title={`Day ${i + 1}: ${h * 50} scans`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
