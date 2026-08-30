'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Link2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Zap,
  Tag,
  Globe,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function UrlShortenerComingSoonPage() {
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
              id="back-to-url-shortener-page"
              href="/url-shortener"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1E50F2] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to URL Shortener Page</span>
            </Link>
          </div>

          {/* COMING SOON HERO CARD */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Top Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#1E50F2] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1E50F2] animate-pulse" />
              <span>COMING SOON &bull; EARLY ACCESS DISCOUNT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans">
              Smart URL Shortener <br />
              <span className="text-[#1E50F2]">Is Launching Soon</span>
            </h1>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
              We are finalizing our premium link shortener platform complete with custom branded domains, link click telemetry analytics, password protection, and automated QR generation. Sign up now to claim early access at our lowest price ever!
            </p>

            {/* SIGNUP FORM CONTAINER */}
            <div className="max-w-md mx-auto pt-2">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="url-signup-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-[#1E50F2] focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                    />
                  </div>

                  <button
                    id="url-signup-submit-btn"
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
                  <h3 className="text-base font-bold text-emerald-900">You’re Saved on the VIP Early Access List!</h3>
                  <p className="text-xs text-emerald-700">
                    Your early access discount has been secured. We will email you at <strong>{email}</strong> as soon as the platform goes live.
                  </p>
                </div>
              )}
            </div>

            {/* EARLY BIRD PERKS BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Tag className="w-4 h-4 text-[#1E50F2]" />
                <span>Up to 70% Off Launch Pricing</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Zap className="w-4 h-4 text-[#1E50F2]" />
                <span>Instant Beta Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Lock className="w-4 h-4 text-[#1E50F2]" />
                <span>Locked-In Lowest Price</span>
              </div>
            </div>

          </div>

          {/* UPCOMING FEATURES TEASER GRID */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-slate-900">Key Features Under Construction</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">01</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Branded Custom Domains</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Connect your own custom domain name (e.g. <code>link.yourbrand.com</code>) for professional brand recognition.</p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">02</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Real-time Analytics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Monitor click counts, referrer sources, geographic distribution, and device metrics.</p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E50F2] flex items-center justify-center font-bold text-xs">03</div>
                <h3 className="font-extrabold text-slate-900 text-sm">Password &amp; Expiration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Set custom passwords, expiration dates, and max click limits for sensitive link sharing.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
