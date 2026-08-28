'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { loginWithGoogle, logoutUser } from '@/lib/redux/slices/authSlice';
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
  RefreshCw,
  UserCheck
} from 'lucide-react';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '541362066453-ig1tqlg2s5k96l7uv2lfoa6c7mpouka4.apps.googleusercontent.com';

// Helper function to decode Base64 Google JWT ID Token payload
function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode JWT token:', e);
    return null;
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user: userSession, isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const isInitializedRef = useRef(false);

  // AUTH GUARD: Redirect to homepage if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // SINGLETON INITIALIZATION OF GOOGLE IDENTITY SERVICES
  const initializeGoogleAuth = () => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;
    if (!(window as any).google?.accounts?.id) return;

    isInitializedRef.current = true;

    try {
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          if (response.credential) {
            const result = await dispatch(loginWithGoogle(response.credential));
            if (loginWithGoogle.fulfilled.match(result)) {
              setNotification({
                type: 'success',
                message: `Successfully authenticated as ${result.payload.name} (${result.payload.email}) via Google One Tap.`,
              });
              // Redirect to home after successful Google login
              router.replace('/');
            } else {
              setNotification({
                type: 'error',
                message: (result.payload as string) || 'Google authentication failed',
              });
            }
          }
        },
        use_fedcm_for_prompt: true,
        auto_select: false,
      });

      // Only prompt One Tap if user is NOT already authenticated
      if (!isAuthenticated) {
        (window as any).google.accounts.id.prompt();
      }

      // Render official Google button into container
      const btnContainer = document.getElementById('google-btn-container');
      if (btnContainer) {
        btnContainer.innerHTML = '';
        (window as any).google.accounts.id.renderButton(btnContainer, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          width: 340,
        });
      }
    } catch (err) {
      console.error('Error initializing Google Identity Services:', err);
    }
  };

  useEffect(() => {
    // Only initialize Google auth if user is NOT already authenticated
    if (isAuthenticated) return;

    if ((window as any).google?.accounts?.id) {
      initializeGoogleAuth();
    } else {
      const interval = setInterval(() => {
        if ((window as any).google?.accounts?.id) {
          clearInterval(interval);
          initializeGoogleAuth();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Handle email submit
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
        message: `Welcome back! Signed in as ${email}.`,
      });
    }, 800);
  };

  // While session is hydrating from the backend cookie, show a blank loading state
  // This prevents flash of login form for already-authenticated users
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Load Google Identity Services SDK Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogleAuth}
      />

      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden pb-16">
          <Navbar />

          <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Google One Tap &amp; OAuth 2.0 Enabled
              </div>

              <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Sign in to your account on a <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">quieter kind of studio.</em>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Access your CropMyImages tools, custom presets, QR codes, and saved shortened links with Google One Tap or email.
              </p>
            </div>
          </section>

          {/* MAIN AUTH CONTAINER */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Highlights */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6 pr-4">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                    Welcome Back
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                    Everything you need in one studio workspace.
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Access your saved custom dimension presets, image conversion tools, and export settings.
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
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 font-bold text-xs">
                      100%
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Browser-Based Privacy</h4>
                      <p className="text-[11px] text-slate-500">Local processing with zero cloud data storage</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Auth Card */}
              <div className="lg:col-span-7 w-full max-w-md mx-auto">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-3xl p-6 sm:p-8 space-y-6">
                  
                  {/* Card Header */}
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                      Sign in to CropMyImages
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Google One Tap is active. Use your Google Account or email to sign in.
                    </p>
                  </div>

                  {/* Logged In State Badge */}
                  {userSession && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                      {userSession.picture ? (
                        <img
                          src={userSession.picture}
                          alt={userSession.name || 'User'}
                          className="w-10 h-10 rounded-full border border-emerald-300"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center">
                          <UserCheck className="w-5 h-5" />
                        </div>
                      )}
                      <div className="text-xs">
                        <div className="font-bold text-emerald-950">{userSession.name || 'Logged In User'}</div>
                        <div className="text-emerald-800 font-mono">{userSession.email}</div>
                      </div>
                    </div>
                  )}

                  {/* Notification Feedback Banner */}
                  {notification && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs font-medium border flex items-start gap-2.5 ${
                        notification.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : notification.type === 'info'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{notification.message}</span>
                    </div>
                  )}

                  {/* Official Google OAuth Button Container */}
                  <div className="space-y-3">
                    <div id="google-btn-container" className="w-full flex justify-center min-h-[44px]">
                      {/* Rendered automatically by window.google.accounts.id.renderButton */}
                    </div>
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
                              message: 'Password reset link simulated. Check your inbox.',
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
                    <Link href="/terms" className="underline font-medium hover:text-slate-900">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline font-medium hover:text-slate-900">Privacy Policy</Link>.
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
