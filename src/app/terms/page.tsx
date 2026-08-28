import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FileText, ShieldAlert, CheckCircle, Scale, DollarSign, AlertCircle, RefreshCw, Lock, HelpCircle, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & User Agreement',
  description:
    'CropMyImages Terms of Service covering account rules, product licence, user responsibilities, plan limits, subscription billing, refund policy, disclaimers, limitation of liability, termination, and governing law.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'acceptable use policy',
    'plan limits',
    'cropmyimages terms',
  ],
};

const SECTIONS = [
  { id: 'agreement', label: '1. Agreement to Terms' },
  { id: 'eligibility', label: '2. Account Rules & Eligibility' },
  { id: 'licence', label: '3. Product Licence & Scope' },
  { id: 'aup', label: '4. Acceptable Use Policy' },
  { id: 'plan-limits', label: '5. Plan Limits & Tiered Quotas' },
  { id: 'payments', label: '6. Payment Terms & Refunds' },
  { id: 'sla-changes', label: '7. Service Changes & Availability' },
  { id: 'ip-ownership', label: '8. Intellectual Property & Rights' },
  { id: 'disclaimers', label: '9. Disclaimers & Liability' },
  { id: 'indemnity', label: '10. Indemnification' },
  { id: 'termination', label: '11. Suspension & Termination' },
  { id: 'governing-law', label: '12. Governing Law & Jurisdiction' },
  { id: 'contact', label: '13. Legal Notices & Contact' },
];

export default function TermsOfServicePage() {
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
                <Scale className="w-4 h-4 text-sky-600" />
                Binding Legal Agreement &amp; Terms of Use
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Terms of Service <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Product Licence Agreement.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Please read these terms carefully before using CropMyImages. They govern your access, subscription plans, user content ownership, and service usage.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
                <span>Effective Date: {lastUpdated}</span>
                <span>•</span>
                <span>Version 3.1</span>
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
                Terms Index
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
                  href="#contact"
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Legal Help
                </a>
              </div>
            </aside>

            {/* MAIN TERMS CONTENT */}
            <div className="lg:col-span-3 space-y-12 text-slate-800 leading-relaxed font-normal">
              
              {/* SUMMARY HIGHLIGHT CARD */}
              <div className="p-6 bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 border border-sky-200/80 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-heading">
                  <CheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                  Key Highlights of Our Terms
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-normal leading-relaxed">
                  • <strong>100% User Content Ownership:</strong> You retain complete ownership and copyright of all images you process.<br />
                  • <strong>No Hidden Fees:</strong> Pricing is transparent with a 14-day money-back guarantee.<br />
                  • <strong>Fair Usage:</strong> Free and paid tiers come with defined daily quotas and file size limits.<br />
                  • <strong>Privacy First:</strong> Processed files are ephemeral and never used to train AI models.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="agreement" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Agreement to Terms
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and <strong>CropMyImages</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and use of <Link href="/" className="text-slate-900 font-semibold underline underline-offset-4 decoration-zinc-300 hover:decoration-slate-900">https://cropmyimages.com</Link> and all associated utilities.
                </p>
                <p className="text-sm text-slate-700">
                  By accessing, browsing, or using our website, tools, or services, you agree that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy" className="text-slate-900 font-semibold underline">Privacy Policy</Link>.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="eligibility" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Account Rules &amp; Registration Eligibility
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You must be at least 18 years old (or the legal age of majority in your jurisdiction) to create an account or subscribe to paid plans. If you are between 13 and 18, you may use the service only under the supervision of a parent or legal guardian.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>Account Accuracy:</strong> You agree to provide accurate, complete, and updated registration details.</li>
                  <li><strong>Credential Security:</strong> You are solely responsible for safeguarding your login credentials and for all activities under your account.</li>
                  <li><strong>Unauthorized Access:</strong> You must notify us immediately at <a href="mailto:contact@cropmyimages.com" className="text-sky-600 font-semibold underline">contact@cropmyimages.com</a> upon detecting any account breach.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section id="licence" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Product Licence &amp; Scope of Service
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Subject to your compliance with these Terms, CropMyImages grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable licence to access and use our web-based image processing tools (cropper, unit resizer, format converters, QR code generator, IP lookup, and URL shortener; please note that the QR Code Generator and URL Shortener tools are currently under active development and do not have full functionality yet).
                </p>
                <p className="text-xs text-slate-600">
                  This licence is strictly for personal, professional, or internal business operations in accordance with your chosen subscription tier.
                </p>
              </section>

              {/* SECTION 4 */}
              <section id="aup" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    User Responsibility &amp; Acceptable Use Policy (AUP)
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You agree to use CropMyImages responsibly and lawfully. You must NOT:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-red-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600" /> Illegal Content
                    </span>
                    <p className="text-red-950 font-normal">Do not upload CSAM, child abuse media, hate speech, terrorism content, or materials violating applicable laws.</p>
                  </div>

                  <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-red-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600" /> IP Infringement
                    </span>
                    <p className="text-red-950 font-normal">Do not process images for which you do not possess valid copyright, trademark, or authorization.</p>
                  </div>

                  <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-red-900 flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 text-red-600" /> Rate-Limit Evasion
                    </span>
                    <p className="text-red-950 font-normal">Do not deploy automated bots, scrapers, proxies, or exploits to bypass daily quota caps or API limits.</p>
                  </div>

                  <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-red-900 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-red-600" /> Reverse Engineering
                    </span>
                    <p className="text-red-950 font-normal">Do not attempt to decompile, disassemble, modify, or extract proprietary algorithms from our engine.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 5 */}
              <section id="plan-limits" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Plan Limits &amp; Tiered Quotas
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Feature access and processing quotas are governed by your selected plan (Free, Pro, or Ultra). Detailed feature matrix is published at <Link href="/pricing" className="text-sky-600 font-semibold underline">Pricing Page</Link>:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 text-xs sm:text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 text-slate-900 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3 font-mono">Plan</th>
                        <th className="p-3 font-mono">Max File Size</th>
                        <th className="p-3 font-mono">Batch Size</th>
                        <th className="p-3 font-mono">Processing Speed</th>
                        <th className="p-3 font-mono">API Quota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Free Tier</td>
                        <td className="p-3">5MB per image</td>
                        <td className="p-3">3 files / batch</td>
                        <td className="p-3">Standard</td>
                        <td className="p-3">None</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-sky-700">Pro Plan ($8.99/mo)</td>
                        <td className="p-3">50MB per image</td>
                        <td className="p-3">50 files / batch</td>
                        <td className="p-3">2x Fast GPU</td>
                        <td className="p-3">10,000 / month</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-indigo-700">Ultra Plan ($9.99/mo)</td>
                        <td className="p-3">500MB per image</td>
                        <td className="p-3">Unlimited batch</td>
                        <td className="p-3">5x Priority GPU</td>
                        <td className="p-3">100,000 / month</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="payments" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Payment Terms, Subscriptions &amp; Refunds
                  </h2>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <p>
                    <strong>Automatic Billing:</strong> Subscriptions are billed in advance on a recurring monthly or annual cycle based on your selection. Subscriptions automatically renew unless cancelled prior to the renewal date.
                  </p>
                  <p>
                    <strong>Cancellation:</strong> You may cancel your subscription at any time via your account settings dashboard. Upon cancellation, your access remains active until the end of your current billing period.
                  </p>
                  
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 font-normal leading-relaxed">
                    <strong>14-Day Money-Back Guarantee:</strong> We offer a hassle-free 14-day money-back guarantee on all first-time paid subscriptions. If you are unsatisfied, contact <a href="mailto:contact@cropmyimages.com" className="font-bold underline">contact@cropmyimages.com</a> within 14 days of purchase for a full refund.
                  </div>
                </div>
              </section>

              {/* SECTION 7 */}
              <section id="sla-changes" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Service Modifications &amp; Availability
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We constantly update and improve our software engine. We reserve the right to modify, add, or deprecate features with or without notice. While we endeavor to maintain 99.9% platform availability, we do not warrant uninterrupted access or SLA uptime guarantees for free tier usage.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="ip-ownership" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Intellectual Property &amp; Content Ownership
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900">Your Content (100% Retained)</div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      You retain 100% full ownership, copyright, and commercial rights to all images, logos, and files uploaded or transformed using CropMyImages. We claim zero ownership over your media.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900">CropMyImages Platform IP</div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      All platform code, design components, branding, logos, algorithms, and interface text are protected by copyright, trademark, and intellectual property laws owned by CropMyImages.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 9 */}
              <section id="disclaimers" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Disclaimers &amp; Limitation of Liability
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CROPMYIMAGES DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  IN NO EVENT SHALL CROPMYIMAGES, ITS DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO CROPMYIMAGES IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="indemnity" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    10
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Indemnification Clause
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You agree to defend, indemnify, and hold harmless CropMyImages and its officers, directors, employees, and agents from and against any third-party claims, liabilities, losses, or legal fees resulting from your violation of these Terms, unauthorized content uploads, or infringement of third-party rights.
                </p>
              </section>

              {/* SECTION 11 */}
              <section id="termination" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    11
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Suspension &amp; Termination of Service
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We reserve the right to suspend or terminate your account access immediately, without prior notice, if you breach our Acceptable Use Policy, engage in fraudulent transactions, or abuse server resources.
                </p>
              </section>

              {/* SECTION 12 */}
              <section id="governing-law" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    12
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Governing Law &amp; Dispute Resolution
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law principles. Any legal disputes or claims arising out of these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bengaluru, Karnataka, India</strong>.
                </p>
              </section>

              {/* SECTION 13 */}
              <section id="contact" className="scroll-mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-sm">
                    13
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Legal Notices &amp; Official Contact Details
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  For formal legal notices, questions regarding these Terms of Service, or licensing inquiries, please contact our legal counsel team:
                </p>

                <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Legal Counsel Desk</span>
                      <p className="font-mono text-sky-400 font-semibold">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Customer Support</span>
                      <p className="font-mono text-sky-400 font-semibold">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-start gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>
                      CropMyImages Legal Dept, Corporate Tower, MG Road, Bengaluru, Karnataka 560001, India.
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
