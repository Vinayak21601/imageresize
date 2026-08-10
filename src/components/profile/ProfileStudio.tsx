'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Zap,
  Globe,
  QrCode,
  Link2,
  Crop,
  Copy,
  Check,
  Key,
  ExternalLink,
  Settings,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  LogOut,
  Layers
} from 'lucide-react';
import { FeedbackForm } from '@/components/common/FeedbackForm';

export function ProfileStudio() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Mock User Data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@pro-creator.com',
    plan: 'PRO MEMBER',
    joinedDate: 'January 2026',
    status: 'Active Subscription',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    apiKey: 'img_live_98a72b4c19d83e7f9a542b',
    stats: {
      imagesProcessed: 142,
      savedPresets: 5,
      qrCodesCreated: 18,
      shortUrlsCreated: 12,
      totalClicks: 1420,
      apiRequestsUsed: 1420,
      maxApiRequests: 10000,
    },
  };

  const recentShortUrls = [
    { id: '1', short: 'imagestudio.pro/s/hero-banner', original: 'https://imagestudio.pro/pricing?ref=banner', clicks: 842, date: '2 hours ago' },
    { id: '2', short: 'imagestudio.pro/s/qr-promo', original: 'https://imagestudio.pro/qr-generator', clicks: 394, date: '1 day ago' },
    { id: '3', short: 'imagestudio.pro/s/ip-tool', original: 'https://imagestudio.pro/what-is-my-ip', clicks: 184, date: '3 days ago' },
  ];

  const savedPresets = [
    { name: 'Instagram Square', dims: '1080 × 1080 px', ratio: '1:1' },
    { name: 'YouTube Banner', dims: '2560 × 1440 px', ratio: '16:9' },
    { name: 'OpenGraph Meta', dims: '1200 × 630 px', ratio: '1.91:1' },
    { name: 'LinkedIn Cover', dims: '1584 × 396 px', ratio: '4:1' },
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. USER PROFILE HEADER CARD (Clean Monochrome Dark Slate Design) */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-2">
          
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white shadow-md ring-2 ring-zinc-200"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-xs text-white font-bold shadow-sm" title="Online Active">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-zinc-300" />
                  {user.plan}
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 font-medium">{user.email}</p>
              
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200/80 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  {user.status}
                </span>
                <span className="text-slate-300">•</span>
                <span>Member since {user.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Manage PRO Plan</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 border border-zinc-200/80 transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* METRICS ROW (Clean Monochrome Stat Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1.5">
                <Crop className="w-3.5 h-3.5 text-slate-700" />
                Images Processed
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-200/80 text-slate-800 border border-zinc-300/80">
                Cropper
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
              {user.stats.imagesProcessed}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-slate-700" />
                QR Codes Created
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-200/80 text-slate-800 border border-zinc-300/80">
                Studio
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
              {user.stats.qrCodesCreated}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-slate-700" />
                Short Links
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-200/80 text-slate-800 border border-zinc-300/80">
                Analytics
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
              {user.stats.shortUrlsCreated} <span className="text-xs font-normal text-slate-500 font-sans">({user.stats.totalClicks} clicks)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-slate-700" />
                Monthly API Quota
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-200/80 text-slate-800 border border-zinc-300/80">
                14.2%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
              1,420 <span className="text-xs font-normal text-slate-500 font-sans">/ 10,000</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. ALL FEATURES & SUITE DIRECTORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-800" />
            Your ImageStudio PRO Suite Tools
          </h2>
          <span className="text-xs text-slate-500 font-medium">5 Tools Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TOOL 1: IMAGE CROpper */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-100 text-slate-900 border border-zinc-200">
                  <Crop className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200">
                  Primary Tool
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Image Cropper &amp; Unit Resizer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crop images with aspect ratios, resize in multi-units (px, in, cm, mm), and compress to target file size (KB).
              </p>

              {/* Presets list preview */}
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saved Presets</div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {savedPresets.slice(0, 3).map((p) => (
                    <span key={p.name} className="px-2 py-0.5 rounded-md bg-zinc-100 text-slate-800 font-medium border border-zinc-200">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Open Image Cropper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* TOOL 2: WHAT IS MY IP */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-100 text-slate-900 border border-zinc-200">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200">
                  Network Tool
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">What Is My IP &amp; Geolocation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detect your public IPv4 &amp; IPv6 addresses, ISP network, ASN, timezone, and VPN/Proxy security flags.
              </p>

              <div className="pt-2 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1 font-mono text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Your Active Connection</div>
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>152.59.97.250</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 text-slate-800 font-sans font-bold">IPv4</span>
                </div>
              </div>
            </div>

            <Link
              href="/what-is-my-ip"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Open IP Lookup Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* TOOL 3: QR GENERATOR */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-100 text-slate-900 border border-zinc-200">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200">
                  Marketing Tool
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">QR Code Studio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate custom high-resolution QR codes for URLs, WiFi credentials, vCards, and vector SVG exports.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>18 Codes Saved</span>
                <span className="text-slate-900 font-bold">PNG / SVG / WEBP</span>
              </div>
            </div>

            <Link
              href="/qr-generator"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Open QR Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* TOOL 4: URL SHORTENER */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-100 text-slate-900 border border-zinc-200">
                  <Link2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200">
                  Analytics Tool
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">URL Shortener &amp; Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create branded short links, track real-time click analytics, referrer channels, and QR code integration.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>12 Active Links</span>
                <span className="text-slate-900 font-bold">1,420 Clicks Tracked</span>
              </div>
            </div>

            <Link
              href="/url-shortener"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Open Shortener</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* TOOL 5: BATCH FORMAT CONVERTER */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-100 text-slate-900 border border-zinc-200">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200">
                  Batch Converter
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Format Converter Suite</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant multi-format image conversion with zero quality loss.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                <Link href="/convert/heic-to-jpg" className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 font-bold text-slate-800 text-center transition-colors">
                  HEIC → JPG
                </Link>
                <Link href="/convert/webp-to-png" className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 font-bold text-slate-800 text-center transition-colors">
                  WebP → PNG
                </Link>
                <Link href="/convert/png-to-svg" className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 font-bold text-slate-800 text-center transition-colors">
                  PNG → SVG
                </Link>
                <Link href="/convert/svg-to-png" className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 font-bold text-slate-800 text-center transition-colors">
                  SVG → PNG
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. RECENT SHORT LINKS & CLICK ANALYTICS */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Short Links &amp; Analytics</h2>
            <p className="text-xs text-slate-500">Live click counts for your created URLs</p>
          </div>
          <Link href="/url-shortener" className="text-xs text-slate-900 hover:text-black font-bold flex items-center gap-1">
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-zinc-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3">Short URL</th>
                <th className="px-4 py-3">Original Destination</th>
                <th className="px-4 py-3">Total Clicks</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-mono">
              {recentShortUrls.map((link) => (
                <tr key={link.id} className="hover:bg-zinc-50/80 transition">
                  <td className="px-4 py-3.5 font-bold text-slate-900">{link.short}</td>
                  <td className="px-4 py-3.5 text-slate-600 max-w-[200px] truncate">{link.original}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 font-sans">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-slate-800 border border-zinc-200 font-mono font-bold">
                      <TrendingUp className="w-3 h-3 text-slate-700" />
                      {link.clicks} clicks
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-sans">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(link.short)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-[11px] shadow-xs active:scale-95 transition cursor-pointer"
                    >
                      {copiedUrl === link.short ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-300" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PRO API KEYS & DEVELOPER ACCESS */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-zinc-100 text-slate-900 border border-zinc-200">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">PRO Developer API Key</h2>
              <p className="text-xs text-slate-500">Authenticate server-side image processing requests</p>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-800 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            Active Key
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Production API Secret Key</div>
            <div className="font-bold text-slate-900 break-all">{user.apiKey}</div>
          </div>

          <button
            type="button"
            onClick={handleCopyKey}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all active:scale-95 shadow-xs cursor-pointer flex-shrink-0"
          >
            {copiedKey ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Key Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy Key</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. USER FEEDBACK & IMPROVEMENT SUGGESTIONS FORM */}
      <FeedbackForm />

    </div>
  );
}
