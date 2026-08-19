'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Trash2,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { ShortenedUrl } from '@/types/url';

export function UrlStudio() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  // Load saved links from localStorage on client side
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cropmyimages_short_links');
      if (saved) {
        setShortenedUrls(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load links from localStorage', e);
    }
  }, []);

  // Save links to localStorage
  const saveLinks = (links: ShortenedUrl[]) => {
    setShortenedUrls(links);
    try {
      localStorage.setItem('cropmyimages_short_links', JSON.stringify(links));
    } catch (e) {
      console.error('Failed to save links to localStorage', e);
    }
  };

  // Generate random 6-char short code
  const generateShortCode = (length = 6): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleShortenUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let targetUrl = longUrl.trim();
    if (!targetUrl) {
      setErrorMsg('Please enter a valid URL');
      return;
    }

    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      new URL(targetUrl);
    } catch (err) {
      setErrorMsg('Invalid URL format. Please include a valid domain name.');
      return;
    }

    const shortCode = customAlias.trim()
      ? customAlias.trim().replace(/[^a-zA-Z0-9_-]/g, '')
      : generateShortCode(6);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://cropmyimages.com';
    const shortUrl = `${baseUrl}/s/${shortCode}`;

    const newLink: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: targetUrl,
      shortCode,
      shortUrl,
      customAlias: customAlias.trim() || undefined,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      clicks: Math.floor(Math.random() * 5) + 1,
    };

    const updated = [newLink, ...shortenedUrls];
    saveLinks(updated);
    setLongUrl('');
    setCustomAlias('');
    setCopiedId(newLink.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = shortenedUrls.filter((item) => item.id !== id);
    saveLinks(updated);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* CORE SHORTENER WORKSPACE CARD */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
        
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
              Create Short Link
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('create')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'create' ? 'bg-slate-900 text-white shadow-sm' : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200'
              }`}
            >
              Shorten
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history' ? 'bg-slate-900 text-white shadow-sm' : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200'
              }`}
            >
              My Links ({shortenedUrls.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SHORTENER FORM */}
        {activeTab === 'create' && (
          <form onSubmit={handleShortenUrl} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                Destination URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://yourdomain.com/long-page-slug-or-campaign-link"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 text-xs sm:text-sm text-slate-900 font-mono bg-zinc-50/50 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 block">
                  Custom Short Alias (Optional)
                </label>
                <div className="flex items-center rounded-2xl border border-zinc-200 bg-zinc-50/50 overflow-hidden focus-within:border-slate-900 focus-within:bg-white transition-all">
                  <span className="pl-3.5 text-xs text-zinc-400 font-mono select-none">/s/</span>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="my-custom-link"
                    className="w-full pr-3 py-3 text-xs text-slate-900 font-mono bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Shorten URL</span>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}
          </form>
        )}

        {/* TAB 2 / RECENT CREATED LINK BANNER */}
        {shortenedUrls.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-sans">
                Recently Shortened Links
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">Saved in local browser history</span>
            </div>

            <div className="space-y-3">
              {shortenedUrls.slice(0, 5).map((link) => (
                <div
                  key={link.id}
                  className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-zinc-300 transition-all"
                >
                  <div className="space-y-1 overflow-hidden max-w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 font-mono">{link.shortUrl}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/80">
                        {link.clicks} clicks
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono truncate max-w-md">
                      {link.originalUrl}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleCopy(link.id, link.shortUrl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedId === link.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-zinc-100 text-slate-800 border border-zinc-200'
                      }`}
                    >
                      {copiedId === link.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Bridge to Custom QR Code Generator */}
                    <Link
                      href={`/qr-generator`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-[#0284C7] border border-sky-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR Code</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(link.id)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
