'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { logoutUser } from '@/lib/redux/slices/authSlice';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme } = useHeroTheme();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-2.5 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex h-13 sm:h-14 max-w-7xl items-center justify-between px-2.5 sm:px-6 rounded-full backdrop-blur-xl transition-colors duration-200 ${
          isDark
            ? 'bg-slate-950/85 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/90 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
        }`}
      >

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0 pl-0.5">
          <img
            src="/logo.webp"
            alt="CropMyImages Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform shrink-0"
          />
          <span
            className={`font-serif italic font-normal text-base sm:text-xl tracking-tight transition-colors whitespace-nowrap shrink-0 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            CropMyImages
          </span>
        </Link>

        {/* Floating Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname === '/'
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            Image Cropper
          </Link>

          <Link
            href="/convert"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname.startsWith('/convert')
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            Image Converter
          </Link>

          <Link
            href="/what-is-my-ip"
            className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
              pathname === '/what-is-my-ip'
                ? isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-white font-bold shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            What is My IP
          </Link>
        </nav>

        {/* Action Buttons & Auth User State */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Hostinger-style Animated Theme Switch Toggle */}
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            className={`relative w-11 h-6 sm:w-13 sm:h-7 rounded-full p-0.5 transition-all duration-300 cursor-pointer flex items-center shadow-inner select-none shrink-0 ${
              isDark
                ? 'bg-slate-900 border border-indigo-500/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                : 'bg-sky-100 border border-sky-300/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]'
            }`}
            title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {/* Background Sky/Night Micro Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
              <span
                className={`text-[8px] sm:text-[9px] transition-all duration-300 ${
                  isDark ? 'opacity-80 text-indigo-300 translate-x-0' : 'opacity-0 -translate-x-1'
                }`}
              >
                ✦
              </span>
              <span
                className={`text-[9px] sm:text-[10px] transition-all duration-300 ${
                  !isDark ? 'opacity-70 text-sky-400 translate-x-0' : 'opacity-0 translate-x-1'
                }`}
              >
                ☁
              </span>
            </div>

            {/* Sliding Knob with Spring-like Transition */}
            <div
              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center transition-all duration-300 ease-out z-10 shrink-0 ${
                isDark
                  ? 'translate-x-[20px] sm:translate-x-[24px] bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.5)] rotate-0'
                  : 'translate-x-0 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-[0_2px_8px_rgba(245,158,11,0.45)] -rotate-180'
              }`}
            >
              {isDark ? (
                <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-100 fill-indigo-100/30" />
              ) : (
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-950 fill-amber-950/20" />
              )}
            </div>
          </button>

          {/* Auth Loading Skeleton */}
          {authLoading ? (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div className={`h-6 sm:h-7 w-16 sm:w-24 rounded-full animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full border ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-300 shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="hidden sm:inline-block text-xs font-bold max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer border border-rose-200 shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline-block">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'text-slate-950 bg-white hover:bg-slate-100'
                  : 'text-white bg-slate-900 hover:bg-black'
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer shrink-0 ${
              isDark
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden mt-3 max-w-5xl mx-auto rounded-3xl backdrop-blur-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 z-50 transition-all ${
            isDark
              ? 'bg-slate-950/95 border border-white/15 shadow-2xl text-white'
              : 'bg-white/95 border border-white/80 shadow-2xl text-slate-900'
          }`}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/'
                  ? isDark
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Cropper
            </Link>

            <Link
              href="/convert"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname.startsWith('/convert')
                  ? isDark
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Converter
            </Link>

            <Link
              href="/what-is-my-ip"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/what-is-my-ip'
                  ? isDark
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              What is My IP
            </Link>
          </div>

          {/* Auth State in Mobile Menu */}
          <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-zinc-100'}`}>
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-7 h-7 rounded-full border border-slate-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold truncate max-w-[150px]">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer border border-rose-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-center w-full py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                  isDark
                    ? 'text-slate-950 bg-white hover:bg-slate-100'
                    : 'text-white bg-slate-900 hover:bg-black'
                }`}
              >
                Sign In to Account
              </Link>
            )}
          </div>

          {/* Mobile Theme Toggle row */}
          <div
            className={`pt-3 border-t flex items-center justify-between px-2 ${
              isDark ? 'border-white/10' : 'border-zinc-100'
            }`}
          >
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Theme: <strong className="capitalize">{theme}</strong>
            </span>
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 text-indigo-200 border border-indigo-500/30 hover:bg-slate-800'
                  : 'bg-sky-100 text-slate-800 border border-sky-200 hover:bg-sky-200'
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300/30" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
              )}
              <span>{isDark ? 'Switch to Day' : 'Switch to Night'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
