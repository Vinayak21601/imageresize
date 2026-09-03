'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Crop, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { logoutUser } from '@/lib/redux/slices/authSlice';

export function ProfileStudio() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-10 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-100 animate-pulse" />
          <div className="mt-4 h-6 w-48 mx-auto bg-zinc-100 rounded-xl animate-pulse" />
          <div className="mt-2 h-4 w-64 mx-auto bg-zinc-50 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-10 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to view your profile</h2>
          <p className="text-sm text-slate-500">Use Google to sign in and access your account.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* USER PROFILE CARD */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="flex flex-col items-center text-center space-y-5">

          {/* Avatar */}
          <div className="relative">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-lg ring-2 ring-zinc-200"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-zinc-100 border-4 border-white shadow-lg ring-2 ring-zinc-200 flex items-center justify-center">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-[3px] border-white flex items-center justify-center text-xs text-white font-bold shadow-sm" title="Online">
              ✓
            </span>
          </div>

          {/* Name & Email */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {user.email}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Crop className="w-4 h-4" />
              Launch Studio
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-slate-800 border border-zinc-200/80 text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
