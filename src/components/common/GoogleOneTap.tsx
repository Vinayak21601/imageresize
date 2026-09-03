'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { loginWithGoogle } from '@/lib/redux/slices/authSlice';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '541362066453-ig1tqlg2s5k96l7uv2lfoa6c7mpouka4.apps.googleusercontent.com';

// Key used to suppress repeated One Tap popups after user dismisses it
const DISMISS_KEY = 'cmi_onetap_dismissed';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * GoogleOneTap — Auto-triggers Google One Tap prompt for unauthenticated visitors.
 * Place this component once in your root layout or homepage.
 * It will NOT render anything visible; it only loads the GSI script and calls prompt().
 */
export function GoogleOneTap() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const initializedRef = useRef(false);

  const isDismissed = (): boolean => {
    if (typeof window === 'undefined') return false;
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DURATION_MS;
  };

  const initOneTap = () => {
    if (typeof window === 'undefined') return;
    if (initializedRef.current) return;
    if (!(window as any).google?.accounts?.id) return;

    initializedRef.current = true;

    (window as any).google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: any) => {
        if (response.credential) {
          const result = await dispatch(loginWithGoogle(response.credential));
          if (loginWithGoogle.fulfilled.match(result)) {
            localStorage.removeItem(DISMISS_KEY);
            // User stays on current page — no redirect
          }
        }
      },
      use_fedcm_for_prompt: false,
      auto_select: true, // Auto-select if user has exactly one Google session
      cancel_on_tap_outside: true,
      prompt_parent_id: undefined,
    });

    // Show the One Tap prompt
    (window as any).google.accounts.id.prompt((notification: any) => {
      // If user dismissed the prompt, record it so we don't annoy them for 24h
      if (
        notification.isNotDisplayed?.() ||
        notification.isSkippedMoment?.() ||
        notification.isDismissedMoment?.()
      ) {
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
      }
    });
  };

  useEffect(() => {
    // Don't show One Tap if user is already logged in, auth is still loading, or was recently dismissed
    if (loading || isAuthenticated || isDismissed()) return;

    // If GSI script is already loaded
    if ((window as any).google?.accounts?.id) {
      initOneTap();
    }
    // Otherwise wait for the Script onLoad callback
  }, [loading, isAuthenticated]);

  // Don't render anything if user is already authenticated or was recently dismissed
  if (isAuthenticated || loading) return null;

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initOneTap}
    />
  );
}
