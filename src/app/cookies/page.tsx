import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Cookie, Database, Eye, ShieldCheck, FileText, Lock, Settings, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie & Local Storage Policy',
  description:
    'CropMyImages Cookie & Local Storage Policy detailing session cookies, Google Analytics, Google AdSense (DART cookie), browser local storage, and consent preferences.',
  keywords: [
    'cookie policy',
    'DART cookie',
    'Google AdSense cookies',
    'analytics cookies',
    'local storage usage',
    'cookie consent opt out',
    'cropmyimages privacy',
  ],
};

const SECTIONS = [
  { id: 'introduction', label: '1. What Are Cookies & LocalStorage' },
  { id: 'essential-cookies', label: '2. Strictly Necessary Cookies' },
  { id: 'analytics-cookies', label: '3. Analytics & Performance' },
  { id: 'advertising-cookies', label: '4. Google AdSense & DART Cookies' },
  { id: 'local-storage', label: '5. Browser Local Storage Usage' },
  { id: 'manage-optout', label: '6. How to Manage & Opt-Out' },
  { id: 'contact', label: '7. Policy Updates & Contact' },
];

export default function CookiePolicyPage() {
  const lastUpdated = 'August 20, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <Cookie className="w-4 h-4 text-amber-600" />
                Transparent Cookie &amp; Storage Preferences
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Cookie Policy <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Local Storage Usage.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Learn how CropMyImages uses cookies, local storage, analytics, and advertising pixels to power your image editing workflow and save your settings.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
                <span>Effective Date: {lastUpdated}</span>
                <span>•</span>
                <span>Version 2.1</span>
              </div>
            </div>
          </section>
        </div>

        {/* PAGE CONTENT CONTAINER */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            
            {/* STICKY TABLE OF CONTENTS SIDEBAR */}
            <aside className="hidden lg:block sticky top-8 bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono pb-2 border-b border-zinc-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                Cookie Index
              </div>
              <nav className="space-y-1 text-xs">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-zinc-100 font-medium transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>
              <div className="pt-4 border-t border-zinc-100">
                <a
                  href="#manage-optout"
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Opt-Out Options
                </a>
              </div>
            </aside>

            {/* MAIN COOKIE CONTENT */}
            <div className="lg:col-span-3 space-y-12 text-slate-800 leading-relaxed font-normal">
              
              {/* SUMMARY CARD */}
              <div className="p-6 bg-amber-50/80 border border-amber-200/80 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm font-heading">
                  <Cookie className="w-5 h-5 text-amber-700 shrink-0" />
                  Your Choice &amp; Control
                </div>
                <p className="text-xs sm:text-sm text-amber-900 font-normal leading-relaxed">
                  We use cookies to maintain your login session, remember your image aspect ratio presets, analyze site traffic, and deliver personalized ads. You can manage or disable non-essential advertising cookies at any time.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="introduction" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    What Are Cookies &amp; Local Storage?
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  <strong>Cookies</strong> are small text files placed on your computer or mobile device when you visit a website. They enable websites to recognize your device, save your preferences, and maintain secure sessions.
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Local Storage (HTML5 Web Storage)</strong> is a browser technology that allows web applications to store data locally in your browser without transmitting it to our servers on every request. We use LocalStorage primarily to render real-time image edits locally in your browser.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="essential-cookies" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Strictly Necessary &amp; Essential Cookies
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  These cookies are essential to enable core application features, secure user authentication, and prevent rate-limit abuse. They cannot be disabled in our system:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 text-xs sm:text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 text-slate-900 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3 font-mono">Cookie Name</th>
                        <th className="p-3 font-mono">Type</th>
                        <th className="p-3 font-mono">Purpose</th>
                        <th className="p-3 font-mono">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      <tr>
                        <td className="p-3 font-mono font-semibold">__session</td>
                        <td className="p-3">Essential</td>
                        <td className="p-3">Maintains active user login session &amp; authentication state</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold">csrf_token</td>
                        <td className="p-3">Security</td>
                        <td className="p-3">Protects forms against Cross-Site Request Forgery (CSRF)</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold">quota_ref</td>
                        <td className="p-3">Functional</td>
                        <td className="p-3">Tracks daily free processing limit resets</td>
                        <td className="p-3">24 Hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="analytics-cookies" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Analytics &amp; Performance Cookies
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Analytics cookies help us understand how visitors interact with our site by gathering aggregated, non-identifying traffic statistics:
                </p>

                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-900">Google Analytics (_ga, _gid, _gat):</div>
                  <p className="text-slate-600 font-normal leading-relaxed">
                    Collects anonymized data regarding page views, conversion rates, loading latency, and referral sources. This data is used solely to improve our user experience and server response times.
                  </p>
                </div>
              </section>

              {/* SECTION 4 */}
              <section id="advertising-cookies" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Google AdSense &amp; DART Cookie Policy
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  CropMyImages displays non-intrusive advertisements via <strong>Google AdSense</strong> on free tier pages to support our free web utilities.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">The DART Cookie:</span>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      Google, as a third-party vendor, uses cookies to serve ads on CropMyImages. Google&apos;s use of the <strong>DART cookie</strong> enables it to serve ads based on your visit to our site and other sites on the Internet.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Ad Personalization Controls:</span>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold underline">Google Ad Settings</a> or <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold underline">Network Advertising Initiative</a>.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 5 */}
              <section id="local-storage" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Browser Local Storage Keys Used
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  To provide a fast, client-side image editing experience, we save application state in your browser&apos;s LocalStorage:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 text-xs sm:text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 text-slate-900 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3 font-mono">Storage Key</th>
                        <th className="p-3 font-mono">Purpose</th>
                        <th className="p-3 font-mono">Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">cmi_aspect_ratio_preset</td>
                        <td className="p-3">Saves your last selected crop aspect ratio (1:1, 16:9, 4:3)</td>
                        <td className="p-3 font-mono">Local Browser Only</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">cmi_unit_preference</td>
                        <td className="p-3">Saves unit choice (px, in, cm, mm) for resizing tools</td>
                        <td className="p-3 font-mono">Local Browser Only</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">cmi_recent_conversions</td>
                        <td className="p-3">Saves recent conversion history for quick re-download</td>
                        <td className="p-3 font-mono">Local Browser Only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="manage-optout" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    How to Manage, Block &amp; Opt-Out of Cookies
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You hold full control over how cookies are handled on your device:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Browser Cookie Controls:</span>
                    <p className="text-slate-600 font-normal">
                      Most browsers allow you to block or delete cookies via settings (Chrome: Settings &gt; Privacy and Security; Firefox: Preferences &gt; Privacy &amp; Security).
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Ad-Free Upgrade Option:</span>
                    <p className="text-slate-600 font-normal">
                      Subscribing to our Pro or Ultra plans instantly disables all third-party advertising cookies and tracking scripts.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7 */}
              <section id="contact" className="scroll-mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Policy Updates &amp; Privacy Contact
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  We may update this Cookie Policy periodically to reflect technological changes. For any questions regarding cookies or privacy preferences, contact our Privacy Office:
                </p>

                <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Privacy Desk</span>
                      <p className="font-mono text-sky-400 font-bold text-base">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Grievance Officer</span>
                      <p className="font-mono text-sky-400 font-bold text-base">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-start gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>
                      CropMyImages Privacy Office, Corporate Tower, MG Road, Bengaluru, Karnataka 560001, India.
                    </span>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
