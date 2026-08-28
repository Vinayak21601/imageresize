'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { logoutUser } from '@/lib/redux/slices/authSlice';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group pl-1">
          <img
            src="/logo.webp"
            alt="CropMyImages Logo"
            className="h-8 w-8 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform"
          />
          <span className="font-serif italic font-normal text-xl tracking-tight text-slate-900">
            CropMyImages
          </span>
        </Link>

        {/* Floating Pill Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Image Cropper
          </Link>

          <Link
            href="/convert"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname.startsWith('/convert')
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Image Converter
          </Link>

          <Link
            href="/what-is-my-ip"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              pathname === '/what-is-my-ip'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            What is My IP
          </Link>
        </nav>

        {/* Action Buttons & Auth User State */}
        <div className="flex items-center gap-2 pr-1">
          {/* Auth Loading Skeleton: shown while session is being hydrated from cookie (prevents FOUC) */}
          {authLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-7 w-24 rounded-full bg-slate-200 animate-pulse" />
            </div>
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border border-slate-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer border border-rose-200"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline-block">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-5xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 z-50 text-slate-900">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Cropper
            </Link>

            <Link
              href="/convert"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname.startsWith('/convert') ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Image Converter
            </Link>

            {/* <Link
              href="/qr-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/qr-generator' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              QR Generator
            </Link> */}

            {/* <Link
              href="/url-shortener"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/url-shortener' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              URL Shortener
            </Link> */}

            <Link
              href="/what-is-my-ip"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/what-is-my-ip' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              What is My IP
            </Link>

            {/* <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                pathname === '/pricing' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-zinc-100'
              }`}
            >
              Pricing
            </Link> */}
          </div>

          {/* <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-slate-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Sign in
            </Link>
          </div> */}
        </div>
      )}
    </header>
  );
}
