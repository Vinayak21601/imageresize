'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FLOATING FEEDBACK TRIGGER BUTTON (Mobile & Desktop Responsive) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-[11px] sm:text-xs font-bold shadow-2xl border border-slate-800 transition-all active:scale-95 cursor-pointer group"
        title="Give Feedback & Suggest Features"
      >
        <MessageSquarePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
        <span>Feedback</span>
      </button>

      {/* FEEDBACK MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-[95vw] sm:w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
            
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-slate-700 hover:text-slate-900 border border-zinc-200 transition cursor-pointer shadow-xs"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-1 sm:p-4">
              <FeedbackForm />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
