import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { DollarSign, RefreshCcw, CheckCircle2, XCircle, Clock, FileText, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'CropMyImages Refund & Cancellation Policy detailing subscription cancellations, 14-day refund eligibility, payment gateway processing timelines, and billing support response SLA.',
  keywords: [
    'refund policy',
    'cancellation policy',
    '14 day money back guarantee',
    'subscription cancellation',
    'stripe refund timeline',
    'razorpay refund SLA',
    'cropmyimages billing',
  ],
};

const SECTIONS = [
  { id: 'introduction', label: '1. Overview & Subscription Model' },
  { id: 'how-to-cancel', label: '2. How to Cancel Subscription' },
  { id: 'refund-eligibility', label: '3. 14-Day Refund Guarantee' },
  { id: 'non-refundable', label: '4. Non-Refundable Scenarios' },
  { id: 'processing-timelines', label: '5. Gateway Processing Times' },
  { id: 'chargebacks', label: '6. Chargeback & Dispute Policy' },
  { id: 'support-sla', label: '7. Billing Support & Response SLA' },
];

export default function RefundsPage() {
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
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Hassle-Free 14-Day Money-Back Guarantee
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Refund &amp; Cancellation Policy <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Clear Billing Commitments.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Transparent rules on subscription cancellations, refund eligibility, payment gateway processing schedules, and support response guarantees.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
                <span>Effective Date: {lastUpdated}</span>
                <span>•</span>
                <span>Version 2.2</span>
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
                Policy Index
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
                  href="#support-sla"
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Billing Desk
                </a>
              </div>
            </aside>

            {/* MAIN POLICY CONTENT */}
            <div className="lg:col-span-3 space-y-12 text-slate-800 leading-relaxed font-normal">
              
              {/* HIGHLIGHT GUARANTEE CARD */}
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm font-heading">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  100% Risk-Free 14-Day Refund Guarantee
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 font-normal leading-relaxed">
                  All first-time Pro and Ultra paid subscription plans come with an unconditional <strong>14-day money-back guarantee</strong>. If you are not completely satisfied with our performance, request a full refund within 14 days of purchase — no questions asked.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="introduction" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Overview &amp; Subscription Model
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  CropMyImages offers both free web utilities and recurring paid subscription plans (Pro &amp; Ultra) billed on a monthly or annual basis.
                </p>
                <p className="text-sm text-slate-700">
                  All payments are processed securely via PCI-DSS certified payment gateways (Stripe &amp; Razorpay). This policy outlines how you can manage or cancel your active plan and request refunds.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="how-to-cancel" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    How to Cancel Your Subscription
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You can cancel your subscription at any time without calling or emailing support through simple self-service steps:
                </p>

                <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
                  <li>Log into your account at <Link href="/profile" className="text-slate-900 font-bold underline">https://cropmyimages.com/profile</Link>.</li>
                  <li>Navigate to the <strong>Billing &amp; Subscriptions</strong> tab.</li>
                  <li>Click <strong>Cancel Subscription</strong> and confirm.</li>
                </ol>

                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-slate-700 space-y-1">
                  <strong>Access Retention Post-Cancellation:</strong>
                  <p className="text-slate-600 font-normal">
                    When you cancel, your paid Pro or Ultra features remain fully active until the end of your paid billing period. You will not be charged again on the next renewal date.
                  </p>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="refund-eligibility" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    14-Day Refund Eligibility Criteria
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  To qualify for a 100% full refund under our 14-Day Money-Back Guarantee, your request must satisfy the following conditions:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> First-Time Purchase Window
                    </span>
                    <p className="text-emerald-900 font-normal">The refund claim is submitted within 14 calendar days of your initial plan upgrade.</p>
                  </div>

                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Account in Good Standing
                    </span>
                    <p className="text-emerald-900 font-normal">Your account has not been suspended for Acceptable Use Policy violations or spam operations.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 4 */}
              <section id="non-refundable" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Non-Refundable Scenarios
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Refunds will NOT be issued under the following circumstances:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>Requests Submitted After 14 Days:</strong> Cancellation requests submitted after the initial 14-day window has expired.</li>
                  <li><strong>Subsequent Renewal Billings:</strong> Automatic monthly or annual renewals where cancellation was not requested prior to the renewal date.</li>
                  <li><strong>Accounts Terminated for Cause:</strong> Accounts banned or suspended due to AUP violations, malware distribution, phishing, or bot spam.</li>
                  <li><strong>Custom Enterprise Quotas:</strong> Special enterprise contracts with custom SLA provisions.</li>
                </ul>
              </section>

              {/* SECTION 5 */}
              <section id="processing-timelines" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Refund Processing Timelines &amp; Payment Gateways
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Once approved by our billing desk, refunds are returned to the original payment method. Gateway processing times vary as follows:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 text-xs sm:text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 text-slate-900 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3 font-mono">Payment Method</th>
                        <th className="p-3 font-mono">Gateway</th>
                        <th className="p-3 font-mono">Approval SLA</th>
                        <th className="p-3 font-mono">Bank Credit Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      <tr>
                        <td className="p-3 font-semibold">Credit / Debit Card</td>
                        <td className="p-3">Stripe</td>
                        <td className="p-3 text-emerald-600 font-bold">24 Hours</td>
                        <td className="p-3">5 to 10 business days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">UPI / Net Banking</td>
                        <td className="p-3">Razorpay</td>
                        <td className="p-3 text-emerald-600 font-bold">24 Hours</td>
                        <td className="p-3">2 to 5 business days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">PayPal / Wallet</td>
                        <td className="p-3">Stripe / Partner</td>
                        <td className="p-3 text-emerald-600 font-bold">24 Hours</td>
                        <td className="p-3">1 to 3 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="chargebacks" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Chargeback &amp; Billing Dispute Protocol
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We strongly encourage users to contact our billing team before initiating a credit card chargeback or bank dispute. Unjustified chargebacks cause account locks and blacklisting across our payment gateway network. We resolve 100% of valid refund requests directly within 24 hours.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="support-sla" className="scroll-mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Billing Support &amp; Response SLA
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  To request a refund or inquire about a billing transaction, email our dedicated support desk with your invoice number or registered account email:
                </p>

                <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Billing Desk Email</span>
                      <p className="font-mono text-sky-400 font-bold text-base">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Support Response SLA</span>
                      <p className="font-bold text-emerald-400 text-sm">Within 24 Hours Guaranteed</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-start gap-2 text-zinc-400 text-xs">
                    <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>
                      Our billing support team operates 24/7. All refund applications are reviewed and processed within 24 hours.
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
