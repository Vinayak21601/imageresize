'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export function QrFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the difference between a static and a dynamic QR code?',
      a: 'A static QR code encodes the destination data directly into the pixel matrix—it cannot be edited after creation. A dynamic QR code routes through a short redirection URL, allowing you to update the target link, PDF menu, or contact details anytime without re-printing physical materials. Dynamic QR codes also record real-time scan analytics.',
    },
    {
      q: 'Will my generated QR codes ever expire or stop working?',
      a: 'Static QR codes generated on ImageResize never expire and can be scanned an unlimited number of times forever. Dynamic QR codes remain active as long as your account or campaign is active.',
    },
    {
      q: 'Can I add my business logo to the center of the QR code?',
      a: 'Yes! You can upload any PNG, JPEG, or SVG logo file, or pick from our built-in brand presets (Instagram, WhatsApp, Facebook, LinkedIn, YouTube, Twitter/X). Our generator automatically clips background matrix dots to ensure high scannability.',
    },
    {
      q: 'Which file format should I download for professional printing?',
      a: 'For print production (packaging, billboards, flyers, business cards), download vector SVG or EPS files. Vector files can be scaled to any size without losing crispness or pixelating. For web and digital screens, high-resolution PNG is ideal.',
    },
    {
      q: 'Can I create QR codes for PDF digital menus and product catalogs?',
      a: 'Yes! Choose the "PDF" tab in our QR Studio. You can link directly to hosted PDF files or digital menus, allowing customers to view menus directly on their smartphones.',
    },
    {
      q: 'How does the Wi-Fi QR code generator work?',
      a: 'Enter your Wi-Fi network SSID name, encryption protocol (WPA/WPA2/WEP), and password. When guests scan the QR code on iOS or Android, a pop-up appears asking "Join Wi-Fi Network?", connecting them automatically without typing passwords.',
    },
  ];

  return (
    <section className="w-full py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            <HelpCircle className="w-3.5 h-3.5 text-slate-700" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Got questions? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              We&apos;ve got answers.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            Everything you need to know about static vs dynamic QR codes, print formatting, and branding.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg cursor-pointer hover:bg-slate-100/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-slate-900 text-white border-slate-900' : 'text-slate-600'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
