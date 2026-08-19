'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Crop,
  QrCode,
  Link2,
  RefreshCw
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Handle simulated login submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!email || !password) {
      setNotification({
        type: 'error',
        message: 'Please enter both your email address and password.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: `Welcome back! Successfully signed in as ${email} (Frontend Demo Mode).`
      });
    }, 1000);
  };

  // Handle simulated Google Login
  const handleGoogleLogin = () => {
    setNotification(null);
    setSocialLoading('google');
    setTimeout(() => {
      setSocialLoading(null);
      setNotification({
        type: 'info',
        message: 'Google Sign-In initialized! (Frontend Demo Mode - Google OAuth 2.0 connection ready).'
      });
    }, 1000);
  };

  // Handle simulated GitHub Login
  const handleGithubLogin = () => {
    setNotification(null);
    setSocialLoading('github');
    setTimeout(() => {
      setSocialLoading(null);
      setNotification({
        type: 'info',
        message: 'GitHub OAuth initialized! (Frontend Demo Mode).'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP MATCHING WEBSITE ENGINE */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden pb-16">
          <Navbar />

          <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Secured Single Sign-On &bull; Free &amp; Instant Access
              </div>

              {/* H1 Heading with font-heading and font-serif italic */}
              <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Sign in to your account on a <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">quieter kind of studio.</em>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Access your CropMyImages tools, custom presets, QR codes, and saved shortened links with Google Sign-In or email.
              </p>
            </div>
          </section>

          {/* MAIN AUTH CONTAINER MATCHING WEBSITE CARD STYLING */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Feature Highlights (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6 pr-4">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                    Welcome Back
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                    Everything you need in one studio workspace.
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Access your saved custom dimension presets, vector QR codes with logo overlays, shortened links, and click history.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-zinc-200/80 shadow-sm backdrop-blur-md flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                      <Crop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Smart Image Engine</h4>
                      <p className="text-[11px] text-slate-500">Target KB compression &amp; unit conversion</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-zinc-200/80 shadow-sm backdrop-blur-md flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Custom QR Generator</h4>
                      <p className="text-[11px] text-slate-500">Vector SVG &amp; logo overlays</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-zinc-200/80 shadow-sm backdrop-blur-md flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                      <Link2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">URL Shortener &amp; Stats</h4>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight font-sans">
                      All-in-one Web Engine
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Save custom crop presets, manage target image dimensions, generate styled QR codes, and track short URL click analytics in one unified workspace.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                      <span>High-precision unit conversion (px, in, cm, mm)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                      <span>Cloud preset synchronization &amp; export settings</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                      <span>Zero image uploading — 100% browser-based privacy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 w-full max-w-md mx-auto">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-3xl p-6 sm:p-8 space-y-6">
                  
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                      Sign in to CropMyImages
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose your preferred sign-in method to access your studio account.
                    </p>
                  </div>

                  {notification && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs font-medium border flex items-start gap-2.5 ${
                        notification.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{notification.message}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loadingMethod === 'google'}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-800 transition-all shadow-sm active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {loadingMethod === 'google' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-70"
                    >
                      {socialLoading === 'github' ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      )}
                      <span>Continue with GitHub</span>
                    </button>
                  </div>

                  {/* Divider Line */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <span className="relative px-3 bg-white text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Or email
                    </span>
                  </div>

                  {/* Email & Password Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 block">Password</label>
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            setNotification({
                              type: 'info',
                              message: 'Password reset link simulated. Check your inbox.'
                            });
                          }}
                          className="text-[11px] font-bold text-slate-900 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <label htmlFor="rememberMe" className="text-xs text-slate-600 select-none cursor-pointer">
                        Keep me signed in on this browser
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Terms & Conditions note */}
                  <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                    By signing in, you agree to CropMyImages&apos;s{' '}
                    <Link href="#" className="underline font-medium hover:text-slate-900">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="#" className="underline font-medium hover:text-slate-900">Privacy Policy</Link>.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
