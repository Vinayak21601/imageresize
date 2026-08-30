'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Zap,
  Tag,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function QrComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#1E50F2] selection:text-white">
      <Navbar />

      <main className="flex-1 w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full mx-auto space-y-8 text-center">
          
          {/* BACK LINK */}
          <div className="flex justify-start">
            <Link
              id="back-to-qr-page"
              href="/qr-generator"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1E50F2] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Current QR Generator</span>
            </Link>
          </div>

          {/* COMING SOON HERO CARD */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Top Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#1E50F2] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1E50F2] animate-pulse" />
              <span>COMING SOON &bull; EARLY BIRD DISCOUNT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans">
              Custom QR Generator 2.0 <br />
              <span className="text-[#1E50F2]">Is Almost Here</span>
            </h1>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
              We are upgrading our QR generator engine with dynamic scan tracking, custom logo vector embedding, high-res SVG export, and custom color themes. Sign up today to lock in early bird access at our lowest price ever!
            </p>

            {/* SIGNUP FORM CONTAINER */}
            <div className="max-w-md mx-auto pt-2">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="qr-signup-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-[#1E50F2] focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                    />
                  </div>

                  <button
                    id="qr-signup-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1E50F2] hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Discount...</span>
                    ) : (
                      <>
                        <span>Get Early Access at Lowest Price</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">You’re on the VIP Early Access List!</h3>
                  <p className="text-xs text-emerald-700">
                    We’ve reserved your early access discount. We’ll notify you at <strong>{email}</strong> the moment QR 2.0 launches.
                  </p>
                </div>
              )}
            </div>

            {/* EARLY BIRD PERKS BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Tag className="w-4 h-4 text-[#1E50F2]" />
                <span>Up to 70% Off Launch Price</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Zap className="w-4 h-4 text-[#1E50F2]" />
                <span>Priority Beta Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Lock className="w-4 h-4 text-[#1E50F2]" />
                <span>Locked-In Lifetime Rates</span>
              </div>
            </div>

          </div>

          {/* UPCOMING FEATURES TEASER GRID */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-slate-900">What’s Coming in QR 2.0?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">01</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Dynamic Scan Analytics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Track total scan counts, geographic locations, and device types in real-time.</p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">02</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Custom Logo Embedding</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Upload your brand logo or icon to embed automatically inside the QR center dot frame.</p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">03</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Vector SVG &amp; PDF Export</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Export print-ready vector files for merchandise, business cards, flyers, and billboards.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
