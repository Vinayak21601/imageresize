'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import {
  loginWithGoogle,
  requestEmailOtp,
  verifyEmailOtp,
} from '@/lib/redux/slices/authSlice';
import {
  Mail,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Crop,
  RefreshCw,
  UserCheck,
  Edit2,
  Send,
  CheckCircle2
} from 'lucide-react';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '541362066453-ig1tqlg2s5k96l7uv2lfoa6c7mpouka4.apps.googleusercontent.com';

export default function LoginPage() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useAppDispatch();
  const { user: userSession, isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const isInitializedRef = useRef(false);

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

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
                message: `Successfully authenticated as ${result.payload.name} (${result.payload.email}) via Google.`,
              });
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

      if (!isAuthenticated) {
        (window as any).google.accounts.id.prompt();
      }

      const btnContainer = document.getElementById('google-btn-container');
      if (btnContainer) {
        btnContainer.innerHTML = '';
        const containerWidth = Math.min(320, btnContainer.clientWidth || 320);
        (window as any).google.accounts.id.renderButton(btnContainer, {
          theme: isDark ? 'filled_black' : 'outline',
          size: 'large',
          shape: 'pill',
          width: containerWidth,
        });
      }
    } catch (err) {
      console.error('Error initializing Google Identity Services:', err);
    }
  };

  useEffect(() => {
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
  }, [isAuthenticated, isDark]);

  // Handle Step 1: Send OTP to Email
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!agreeToTerms) {
      setNotification({
        type: 'error',
        message: 'Please agree to the Terms of Service and Privacy Policy to proceed.',
      });
      return;
    }

    if (!email || !email.includes('@')) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsRequesting(true);
    const result = await dispatch(requestEmailOtp(email));
    setIsRequesting(false);

    if (requestEmailOtp.fulfilled.match(result)) {
      setNotification({
        type: 'success',
        message: `6-digit verification code sent to ${email}`,
      });
      setOtpStep('verify');
      setResendTimer(60);
    } else {
      setNotification({
        type: 'error',
        message: (result.payload as string) || 'Failed to send verification code.',
      });
    }
  };

  // Handle Step 2: Verify OTP & Sign In
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setNotification({
        type: 'error',
        message: 'Please enter the full 6-digit verification code.',
      });
      return;
    }

    setIsVerifying(true);
    const result = await dispatch(verifyEmailOtp({ email, otp: otpCode }));
    setIsVerifying(false);

    if (verifyEmailOtp.fulfilled.match(result)) {
      setNotification({
        type: 'success',
        message: `Signed in as ${result.payload.email}. Redirecting...`,
      });
      router.replace('/');
    } else {
      setNotification({
        type: 'error',
        message: (result.payload as string) || 'Invalid or expired code. Please try again.',
      });
    }
  };

  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-[#0D111A]' : 'bg-[#F8FAFC]'}`}>
        <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-indigo-400' : 'border-slate-900'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans selection:bg-slate-900 selection:text-white ${isDark ? 'bg-[#0D111A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Load Google Identity Services SDK Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogleAuth}
      />

      <main className="flex-1 w-full">
        {/* HERO SECTION WITH BACKDROP */}
        <div className={`relative border-b transition-colors duration-300 pb-12 sm:pb-16 ${isDark ? 'bg-[#0D111A] border-white/10' : 'bg-sky-cloud-hero border-zinc-200/60'}`}>
          <Navbar />

          <section className="pt-6 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
              <h1 className={`text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Sign in to your account on a <br className="hidden sm:inline" />
                <em className={`font-serif italic font-normal ${isDark ? 'text-indigo-300' : 'text-slate-900'}`}>quieter kind of studio.</em>
              </h1>

              <p className={`text-xs sm:text-base max-w-xl mx-auto font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Access your CropMyImages tools, custom presets, QR codes, and saved export settings with Google One Tap or Email OTP.
              </p>
            </div>
          </section>

          {/* MAIN AUTH CONTAINER */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Studio Highlights */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6 pr-4">
                <div className="space-y-3">
                  <span className={`text-xs font-mono font-bold tracking-widest uppercase ${isDark ? 'text-indigo-400' : 'text-slate-500'}`}>
                    Welcome Back
                  </span>
                  <h3 className={`text-2xl font-black tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Everything you need in one studio workspace.
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Access your saved custom dimension presets, image conversion tools, and target size export settings.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className={`p-3.5 rounded-2xl border shadow-xs backdrop-blur-md flex items-center gap-3.5 transition-colors ${
                    isDark ? 'bg-slate-900/80 border-white/10 text-slate-200' : 'bg-white/90 border-zinc-200/80 text-slate-900'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDark ? 'bg-slate-950 border-white/10 text-indigo-300' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}>
                      <Crop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Smart Image Engine</h4>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Target KB compression &amp; format conversion</p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border shadow-xs backdrop-blur-md flex items-center gap-3.5 transition-colors ${
                    isDark ? 'bg-slate-900/80 border-white/10 text-slate-200' : 'bg-white/90 border-zinc-200/80 text-slate-900'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border font-bold text-xs ${
                      isDark ? 'bg-slate-950 border-white/10 text-indigo-300' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}>
                      100%
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Browser-Based Privacy</h4>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Local client processing with zero cloud data storage</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Auth Card */}
              <div className="lg:col-span-7 w-full max-w-md mx-auto">
                <div className={`backdrop-blur-2xl border rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                    : 'bg-white/90 border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)]'
                }`}>
                  
                  {/* Card Header */}
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-black tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Sign in to CropMyImages
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Sign in instantly with Google One Tap or receive a 6-digit email code.
                    </p>
                  </div>

                  {/* Logged In State Badge */}
                  {userSession && (
                    <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
                      isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    }`}>
                      {userSession.picture ? (
                        <img
                          src={userSession.picture}
                          alt={userSession.name || 'User'}
                          className="w-10 h-10 rounded-full border border-emerald-400 object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                          <UserCheck className="w-5 h-5" />
                        </div>
                      )}
                      <div className="text-xs min-w-0">
                        <div className="font-bold truncate">{userSession.name || 'Logged In User'}</div>
                        <div className="font-mono text-[11px] opacity-80 truncate">{userSession.email}</div>
                      </div>
                    </div>
                  )}

                  {/* Notification Feedback Banner */}
                  {notification && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs font-medium border flex items-start gap-2.5 ${
                        notification.type === 'success'
                          ? isDark ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : notification.type === 'info'
                          ? isDark ? 'bg-sky-950/50 text-sky-300 border-sky-500/30' : 'bg-sky-50 text-sky-800 border-sky-200'
                          : isDark ? 'bg-rose-950/50 text-rose-300 border-rose-500/30' : 'bg-rose-50 text-rose-800 border-rose-200'
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
                      <div className={`w-full border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
                    </div>
                    <span className={`relative px-3 text-[11px] font-mono uppercase tracking-wider ${
                      isDark ? 'bg-[#121824] text-slate-400' : 'bg-white text-slate-400'
                    }`}>
                      Or Email OTP Code
                    </span>
                  </div>

                  {/* STEP 1: REQUEST OTP FORM */}
                  {otpStep === 'request' && (
                    <form onSubmit={handleRequestOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold block ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                          <input
                            id="login-email-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="yourname@domain.com"
                            aria-label="Email address for OTP sign in"
                            required
                            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs transition-all ${
                              isDark
                                ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                                : 'bg-slate-50 border border-slate-200/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Terms & Privacy Agreement Checkbox */}
                      <div className="flex items-start gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          checked={agreeToTerms}
                          onChange={(e) => setAgreeToTerms(e.target.checked)}
                          className={`w-4 h-4 rounded mt-0.5 shrink-0 cursor-pointer ${
                            isDark
                              ? 'bg-slate-950 border-slate-700 text-indigo-500 focus:ring-indigo-500'
                              : 'bg-slate-100 border-slate-300 text-slate-900 focus:ring-slate-900'
                          }`}
                        />
                        <label htmlFor="agreeToTerms" className={`text-xs select-none cursor-pointer leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          By signing in, you agree to CropMyImages&apos;s{' '}
                          <Link
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline font-semibold transition-colors ${
                              isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'
                            }`}
                          >
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline font-semibold transition-colors ${
                              isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'
                            }`}
                          >
                            Privacy Policy
                          </Link>.
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isRequesting}
                        className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-3 ${
                          isDark
                            ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-white/5'
                            : 'bg-slate-900 hover:bg-black text-white'
                        }`}
                      >
                        {isRequesting ? (
                          <>
                            <RefreshCw className={`w-4 h-4 animate-spin ${isDark ? 'text-slate-950' : 'text-white'}`} />
                            <span>Sending Code...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Verification Code</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: VERIFY OTP FORM */}
                  {otpStep === 'verify' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
                      <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="min-w-0 pr-2">
                          <span className="text-[11px] block text-slate-400">Code sent to:</span>
                          <span className="font-bold truncate block">{email}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpStep('request');
                            setOtpCode('');
                          }}
                          className={`flex items-center gap-1 text-[11px] font-bold underline cursor-pointer shrink-0 ${
                            isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'
                          }`}
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Change</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold block ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          6-Digit Verification Code
                        </label>
                        <div className="relative">
                          <KeyRound className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                          <input
                            id="login-otp-input"
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            aria-label="6-digit verification code"
                            autoFocus
                            required
                            className={`w-full pl-10 pr-4 py-3 rounded-2xl text-base font-mono font-bold tracking-[0.25em] text-center transition-all ${
                              isDark
                                ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                                : 'bg-slate-50 border border-slate-200/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          disabled={resendTimer > 0 || isRequesting}
                          onClick={handleRequestOtp}
                          className={`font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed ${
                            resendTimer > 0
                              ? 'text-slate-400 dark:text-slate-500'
                              : isDark ? 'text-indigo-400 hover:underline' : 'text-blue-600 hover:underline'
                          }`}
                        >
                          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                        </button>

                        <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          Code expires in 10 mins
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isVerifying || otpCode.length !== 6}
                        className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2 ${
                          isDark
                            ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-white/5'
                            : 'bg-slate-900 hover:bg-black text-white'
                        }`}
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className={`w-4 h-4 animate-spin ${isDark ? 'text-slate-950' : 'text-white'}`} />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Verify &amp; Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

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
