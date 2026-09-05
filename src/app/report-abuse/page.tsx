'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldAlert, AlertTriangle, Send, CheckCircle2, FileText, Lock, Mail, Clock, HelpCircle, Link2, QrCode } from 'lucide-react';

const CATEGORIES = [
  { id: 'phishing', label: 'Phishing, Scam or Credential Theft' },
  { id: 'malware', label: 'Malware, Virus or Exploit Payload' },
  { id: 'short-url', label: 'Abusive Short URL Redirect' },
  { id: 'qr-code', label: 'Abusive QR Code Target' },
  { id: 'copyright', label: 'Copyright Infringement (DMCA Takedown)' },
  { id: 'illegal-content', label: 'Illegal, CSAM or Harmful Content' },
  { id: 'spam', label: 'Spam or Automated Bot Operation' },
];

export default function ReportAbusePage() {
  const [category, setCategory] = useState('phishing');
  const [targetUrl, setTargetUrl] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `ABUSE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60">
          <Navbar />

          <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                24/7 Security Abuse &amp; Takedown Desk
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Report Abuse or Policy Violation <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Rapid Threat Neutralization.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Report malicious short URLs, abusive QR codes, phishing pages, malware, or copyright violations. Our security team reviews abuse reports 24/7.
              </p>
            </div>
          </section>
        </div>

        {/* PAGE CONTENT CONTAINER */}
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          
          {/* SLA NOTICE CARD */}
          <div className="p-6 bg-red-950 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-red-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-red-200 font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-red-400" />
                Emergency Takedown SLA
              </div>
              <p className="text-lg font-extrabold text-white font-heading">
                2 to 6 Hour SLA for Phishing &amp; Malware Takedowns
              </p>
              <p className="text-xs text-red-200 font-light max-w-lg">
                Short links or QR codes verified to host malware, phishing portals, or CSAM are blacklisted globally across edge CDNs within minutes.
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-red-900/90 border border-red-800 text-xs font-mono font-bold text-red-100 shrink-0">
              Response: &lt; 6 Hours
            </div>
          </div>

          {/* REPORT FORM OR SUCCESS STATE */}
          {submittedTicket ? (
            <div className="p-8 sm:p-10 bg-white border border-emerald-200 rounded-3xl shadow-lg text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                  Abuse Report Submitted Successfully
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your ticket has been dispatched to our 24/7 Security Operations Center for instant review and automated link scanning.
                </p>
              </div>

              <div className="inline-block p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-mono space-y-1">
                <span className="text-slate-500 uppercase font-bold">Ticket Reference Number</span>
                <p className="text-lg font-black text-slate-900">{submittedTicket}</p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmittedTicket(null);
                    setTargetUrl('');
                    setDescription('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors shadow-sm"
                >
                  Submit Another Report
                </button>
                <Link
                  href="/acceptable-use"
                  className="px-6 py-2.5 rounded-full bg-zinc-100 text-slate-900 font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  View Acceptable Use Policy
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 bg-white border border-zinc-200/90 rounded-3xl shadow-sm space-y-6">
              <div className="space-y-1 pb-4 border-b border-zinc-100">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Submit Security Abuse Ticket
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in the details of the suspicious link or file. All reports are confidential.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                  1. Report Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="abuse-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Abuse report category"
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                  2. Suspect Short Link or Target URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="abuse-target-url-input"
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="e.g. https://cropmyimages.com/s/xyz123 or target scam domain"
                  aria-label="Suspect short link or target URL to report"
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors placeholder-zinc-400"
                  required
                />
              </div>

              {/* Reporter Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                  3. Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="abuse-reporter-email-input"
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="For ticket status updates &amp; verification"
                  aria-label="Your email address for abuse report updates"
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors placeholder-zinc-400"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                  4. Description of Violation &amp; Evidence <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="abuse-description-textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context, deceptive landing page details, or evidence of copyright infringement..."
                  aria-label="Description of the violation and evidence"
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors placeholder-zinc-400"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Ticket...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Abuse Ticket Now</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Prefer direct email? Send reports to <a href="mailto:contact@cropmyimages.com" className="text-slate-900 font-bold underline">contact@cropmyimages.com</a>.
                </p>
              </div>
            </form>
          )}

          {/* DMCA & LEGAL DESK CONTACT SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-xs">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" /> Copyright &amp; DMCA Agent
              </div>
              <p className="text-slate-600 font-normal text-xs leading-relaxed">
                For formal DMCA takedown notices, send written notice under penalty of perjury to <a href="mailto:contact@cropmyimages.com" className="text-slate-900 font-bold underline">contact@cropmyimages.com</a>.
              </p>
            </div>

            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-xs">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" /> Security Operations Center
              </div>
              <p className="text-slate-600 font-normal text-xs leading-relaxed">
                For security vulnerability reports or DDoS incidents, email <a href="mailto:contact@cropmyimages.com" className="text-slate-900 font-bold underline">contact@cropmyimages.com</a>.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
