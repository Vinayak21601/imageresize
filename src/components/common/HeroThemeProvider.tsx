'use client';

import React, { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

type HeroTheme = 'light' | 'dark';

interface HeroThemeContextValue {
  theme: HeroTheme;
  toggleTheme: (event?: React.MouseEvent | { clientX: number; clientY: number }) => void;
  setTheme: (theme: HeroTheme) => void;
}

const HeroThemeContext = createContext<HeroThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const STORAGE_KEY = 'cmi_hero_theme';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('cmi-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cmi-theme-change', callback);
  };
}

function getSnapshot(): HeroTheme {
  if (typeof window === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-hero-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // Ignore storage errors
  }
  return 'light';
}

function getServerSnapshot(): HeroTheme {
  return 'light';
}

export function HeroThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: HeroTheme) => {
    document.documentElement.setAttribute('data-hero-theme', newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore private browsing storage quota errors
    }
    window.dispatchEvent(new Event('cmi-theme-change'));
  }, []);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | { clientX: number; clientY: number }) => {
      const nextTheme: HeroTheme = theme === 'dark' ? 'light' : 'dark';

      // Circular Reveal View Transition (Hostinger style animation)
      // Check if startViewTransition is available and reduced-motion is not requested
      interface DocWithViewTransition {
        startViewTransition?: (callback: () => void) => { ready: Promise<void> };
      }
      const doc = document as unknown as DocWithViewTransition;

      if (
        typeof doc.startViewTransition !== 'function' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setTheme(nextTheme);
        return;
      }

      const x =
        event && 'clientX' in event && typeof event.clientX === 'number'
          ? event.clientX
          : window.innerWidth / 2;
      const y =
        event && 'clientY' in event && typeof event.clientY === 'number'
          ? event.clientY
          : 30;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 450,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    },
    [theme, setTheme]
  );

  return (
    <HeroThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  return useContext(HeroThemeContext);
}
