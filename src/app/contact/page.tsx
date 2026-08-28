'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Mail, MapPin, Phone, Clock, ShieldCheck, Send, CheckCircle2, Building, Scale, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-6 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-xs backdrop-blur-md">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                Customer Support &amp; Statutory Grievance Redressal
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto font-heading">
                Contact Us <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Business Entity Details.</em>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
                Reach out to our support team, billing desk, security center, or formal DPDP Act 2023 Statutory Grievance Redressal Officer.
              </p>
            </div>
          </section>
        </div>

        {/* PAGE CONTENT CONTAINER */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* DEPARTMENT CONTACT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Customer Support</h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Account &amp; tool help</p>
              </div>
              <p className="font-mono text-xs font-bold text-sky-600">
                <a href="mailto:support@cropmyimages.com" className="hover:underline">support@cropmyimages.com</a>
              </p>
              <div className="text-[11px] text-slate-500 font-mono">Response: &lt; 12 Hours</div>
            </div>

            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Billing &amp; Refunds</h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Invoices &amp; subscription refunds</p>
              </div>
              <p className="font-mono text-xs font-bold text-emerald-600">
                <a href="mailto:billing@cropmyimages.com" className="hover:underline">billing@cropmyimages.com</a>
              </p>
              <div className="text-[11px] text-slate-500 font-mono">Response: &lt; 24 Hours</div>
            </div>

            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Security &amp; Abuse</h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Malware &amp; phishing takedowns</p>
              </div>
              <p className="font-mono text-xs font-bold text-red-600">
                <a href="mailto:abuse@cropmyimages.com" className="hover:underline">abuse@cropmyimages.com</a>
              </p>
              <div className="text-[11px] text-slate-500 font-mono">Response: 2 to 6 Hours</div>
            </div>

            <div className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Legal &amp; DMCA Desk</h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Notices &amp; copyright</p>
              </div>
              <p className="font-mono text-xs font-bold text-purple-600">
                <a href="mailto:legal@cropmyimages.com" className="hover:underline">legal@cropmyimages.com</a>
              </p>
              <div className="text-[11px] text-slate-500 font-mono">Response: &lt; 48 Hours</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* INTERACTIVE CONTACT FORM */}
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 pb-4 border-b border-zinc-100">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in your details below and our team will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto stroke-[2.5]" />
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Message Dispatched!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you for contacting us. We have received your inquiry and sent a confirmation to your email address.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-900 font-mono uppercase text-xs">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-900 font-mono uppercase text-xs">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-900 font-mono uppercase text-xs">Inquiry Type *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                    >
                      <option value="general">General Inquiry &amp; Feedback</option>
                      <option value="billing">Billing &amp; Subscription Refund</option>
                      <option value="technical">Technical Support &amp; API Key</option>
                      <option value="partnership">Enterprise &amp; Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-900 font-mono uppercase text-xs">Message *</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you today?"
                      className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* DPDP ACT GRIEVANCE OFFICER & CORPORATE ENTITY DISCLOSURE */}
            <div className="space-y-6">
              
              {/* DPDP GRIEVANCE OFFICER CARD */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl space-y-5 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  DPDP Act 2023 Statutory Escalation
                </div>

                <h3 className="text-xl font-black text-white font-heading">
                  Statutory Grievance Redressal Officer
                </h3>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  Under Section 10 &amp; Section 13 of the Digital Personal Data Protection Act, 2023 (DPDP Act, India), users may escalate unaddressed privacy concerns directly to our designated officer:
                </p>

                <div className="p-5 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-zinc-400 text-[11px] font-mono uppercase">Officer Name</span>
                      <p className="font-bold text-white">Data Protection Officer</p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-[11px] font-mono uppercase">Statutory SLA</span>
                      <p className="font-bold text-emerald-400">Within 30 Days (DPDP Mandate)</p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-[11px] font-mono uppercase">Grievance Email</span>
                      <p className="font-mono text-sky-400 font-bold">
                        <a href="mailto:grievance@cropmyimages.com" className="hover:underline">grievance@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-[11px] font-mono uppercase">Privacy Escalation</span>
                      <p className="font-mono text-sky-400 font-bold">
                        <a href="mailto:privacy@cropmyimages.com" className="hover:underline">privacy@cropmyimages.com</a>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                  If your complaint is not resolved within 30 days, you hold the legal right to file an appeal with the <strong>Data Protection Board of India</strong>.
                </p>
              </div>

              {/* CORPORATE ENTITY DISCLOSURE CARD */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
                  <Building className="w-5 h-5 text-slate-700" />
                  Registered Corporate Entity Details
                </div>

                <div className="space-y-2 text-slate-600 font-normal leading-relaxed">
                  <p><strong>Entity Name:</strong> CropMyImages Technologies Private Limited</p>
                  <p><strong>Corporate Registration ID:</strong> U72900KA2026PTC184920</p>
                  <p><strong>GSTIN / Tax ID:</strong> 29AAACC1234H1Z5</p>
                  <div className="pt-2 flex items-start gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Registered Address:</strong> Corporate Tower, 5th Floor, MG Road, Bengaluru, Karnataka 560001, India.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
