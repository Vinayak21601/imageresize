import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldAlert, AlertTriangle, Link2, QrCode, FileText, Lock, ShieldCheck, Mail, MapPin, Ban, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy (AUP)',
  description:
    'CropMyImages Acceptable Use Policy detailing rules against phishing, malware, spam, harmful links, copyright violations, and misuse of URL shortener & QR tools.',
  keywords: [
    'acceptable use policy',
    'aup',
    'phishing ban',
    'url shortener rules',
    'qr code abuse policy',
    'anti-spam policy',
    'cropmyimages legal',
  ],
};

const SECTIONS = [
  { id: 'introduction', label: '1. Overview & Purpose' },
  { id: 'prohibited-content', label: '2. Prohibited Content & Media' },
  { id: 'phishing-malware', label: '3. Phishing & Malware Threats' },
  { id: 'url-qr-misuse', label: '4. URL Shortener & QR Tool Rules' },
  { id: 'spam-botting', label: '5. Spam, Botting & Quota Bypass' },
  { id: 'copyright-dmca', label: '6. Copyright & DMCA Takedowns' },
  { id: 'security-research', label: '7. Responsible Disclosure' },
  { id: 'enforcement', label: '8. Enforcement & Reporting' },
  { id: 'reporting-abuse', label: '9. Abuse Reporting & SLA' },
];

export default function AcceptableUsePage() {
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
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Zero Tolerance for Abuse &amp; Malicious Exploitation
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Acceptable Use Policy <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Community Safety Rules.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Rules governing permissible service usage, content standards, and strict prohibitions against phishing, malware, spam, and utility misuse.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
                <span>Effective Date: {lastUpdated}</span>
                <span>•</span>
                <span>Version 2.0</span>
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
                AUP Navigation
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
                  href="#reporting-abuse"
                  className="w-full py-2 px-3 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Report Abuse
                </a>
              </div>
            </aside>

            {/* MAIN AUP CONTENT */}
            <div className="lg:col-span-3 space-y-12 text-slate-800 leading-relaxed font-normal">
              
              {/* WARNING CARD */}
              <div className="p-6 bg-red-50 border border-red-200 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-red-950 font-bold text-sm font-heading">
                  <Ban className="w-5 h-5 text-red-600 shrink-0" />
                  Zero Tolerance Enforcement Policy
                </div>
                <p className="text-xs sm:text-sm text-red-900 font-normal leading-relaxed">
                  CropMyImages maintains automated threat detection mechanisms and live domain monitoring. Accounts or short links created for phishing, scam distribution, malware delivery, or illegal activity are <strong>permanently banned immediately without refund or warning</strong>, and reported to relevant law enforcement agencies.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="introduction" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Overview &amp; Purpose
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  This Acceptable Use Policy (&quot;AUP&quot;) sets forth the mandatory standards of conduct required for all users accessing <strong>CropMyImages</strong> (<Link href="/" className="text-slate-900 font-semibold underline">https://cropmyimages.com</Link>) and its web tools.
                </p>
                <p className="text-sm text-slate-700">
                  Our mission is to provide high-precision, privacy-focused image editing and utility tools. This policy ensures our infrastructure remains safe, reliable, and free from abuse, scams, and unlawful exploits.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="prohibited-content" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Prohibited Content &amp; Media
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  You are strictly prohibited from uploading, processing, generating, or linking to media or content that falls into any of the following categories:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Child Exploitation Media (CSAM):</span>
                    <p className="text-slate-600 font-normal">Any child sexual abuse material or child exploitation content. Zero tolerance — immediate law enforcement notification (NCMEC/ICAC).</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Illegal &amp; Violent Media:</span>
                    <p className="text-slate-600 font-normal">Content promoting illegal drugs, human trafficking, terrorism, violent extremism, or instructions on weapon manufacturing.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Hate Speech &amp; Harassment:</span>
                    <p className="text-slate-600 font-normal">Media intended to incite violence, stalk, threaten, harass, or demean individuals based on race, religion, gender, or orientation.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Non-Consensual Imagery:</span>
                    <p className="text-slate-600 font-normal">Non-consensual intimate imagery, deepfakes designed for defamation, or impersonation of real individuals without authorization.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="phishing-malware" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Phishing, Malware &amp; Cyber Security Threats
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  CropMyImages tools must never be utilized to execute cyberattacks or deceptive campaigns. The following activities are strictly banned:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>Credential Harvesting / Phishing:</strong> Hosting or linking to deceptive login portals designed to steal banking credentials, passwords, or personal identity details.</li>
                  <li><strong>Malware Distribution:</strong> Distributing viruses, ransomware, trojans, keyloggers, spyware, or malicious script payloads.</li>
                  <li><strong>Exploit Hosting:</strong> Uploading files engineered to exploit browser vulnerabilities or trigger buffer overflows.</li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section id="url-qr-misuse" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Misuse of URL Shortener &amp; QR Code Generator Features
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Our <Link href="/url-shortener" className="text-sky-600 font-semibold underline">URL Shortener</Link> and <Link href="/qr-generator" className="text-sky-600 font-semibold underline">QR Generator</Link> tools are provided for legitimate web navigation and marketing. <em>(Please note: both the URL Shortener and QR Code Generator features are currently in progress and under active development with limited functionality).</em> We enforce real-time URL scanning for all short link destination targets.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-amber-700" /> Banned Shortener Destinations
                    </span>
                    <p className="text-amber-950 font-normal">Short links pointing to phishing portals, illicit gambling, pirated software downloads, deceptive pop-up traps, or crypto scam pages will be disabled instantly.</p>
                  </div>

                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-700" /> Banned QR Codes
                    </span>
                    <p className="text-amber-950 font-normal">QR codes generated for physical flyering or online distribution that redirect to malicious WiFi networks, fraudulent payment gateways, or unauthorized SMS triggers are prohibited.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-mono">
                  Note: Short links found in violation are blacklisted globally and disabled across all edge node CDNs within seconds.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="spam-botting" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Spam, Botting &amp; Quota Bypassing
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  To ensure equitable service performance for all users, you must not engage in platform automated abuse:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>Unsolicited Bulk Spam:</strong> Using short links or QR codes in unsolicited email (SPAM), SMS spam, or automated social media bot spamming.</li>
                  <li><strong>Rate Limit Evasion:</strong> Utilizing IP rotation networks, headless browser farms, or proxy chains to circumvent free daily processing quotas.</li>
                  <li><strong>Denial of Service (DDoS):</strong> Flooding servers with artificial traffic spikes to degrade platform availability.</li>
                </ul>
              </section>

              {/* SECTION 6 */}
              <section id="copyright-dmca" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Copyright Protection &amp; DMCA Takedown Procedure
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  CropMyImages respects intellectual property rights. If you are a copyright owner or authorized agent and believe content processed or hosted via our short links infringes your copyright, submit a formal DMCA takedown notice containing:
                </p>

                <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
                  <li>Identification of the copyrighted work claimed to have been infringed.</li>
                  <li>Specific URL or short link location of the allegedly infringing material.</li>
                  <li>Your full contact information (name, address, telephone, email).</li>
                  <li>A statement of good faith belief that use is unauthorized.</li>
                  <li>Physical or electronic signature under penalty of perjury.</li>
                </ol>

                <p className="text-xs text-slate-600 pt-2">
                  Send notices to our Designated Copyright Agent at <a href="mailto:dmca@cropmyimages.com" className="text-slate-900 font-bold underline">dmca@cropmyimages.com</a>. Repeat infringers will have their accounts permanently terminated.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="security-research" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Security Vulnerability Research &amp; Responsible Disclosure
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We encourage security researchers to test our infrastructure responsibly. Security researchers must not destroy user data, disrupt services, or access private account details. Report security findings directly to <a href="mailto:security@cropmyimages.com" className="text-sky-600 font-semibold underline">security@cropmyimages.com</a>.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="enforcement" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Enforcement Measures &amp; Penalties
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Failure to comply with this AUP may result in immediate administrative action:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1 text-center">
                    <span className="font-bold text-amber-700 font-mono text-xs uppercase">Warning Notice</span>
                    <p className="text-slate-600 font-normal text-[11px]">Minor policy infractions receive a formal written notice &amp; temporary link block.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1 text-center">
                    <span className="font-bold text-orange-700 font-mono text-xs uppercase">Account Suspension</span>
                    <p className="text-slate-600 font-normal text-[11px]">Repeated quota bypass or suspicious links result in a 30-day account freeze.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1 text-center">
                    <span className="font-bold text-red-700 font-mono text-xs uppercase">Permanent Ban</span>
                    <p className="text-slate-600 font-normal text-[11px]">Phishing, malware, CSAM, or fraud triggers permanent ban &amp; police escalation.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 9 */}
              <section id="reporting-abuse" className="scroll-mt-12 bg-red-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white text-red-950 flex items-center justify-center font-black text-sm">
                    9
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Abuse Reporting Desk &amp; 24/7 Response SLA
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-red-100 font-light leading-relaxed">
                  If you discover a short link, QR code, or account hosted on CropMyImages that violates this Acceptable Use Policy, please notify our 24/7 security abuse desk immediately:
                </p>

                <div className="p-6 bg-red-900/80 border border-red-800 rounded-2xl space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-red-300 text-xs font-mono uppercase">Abuse Desk Email</span>
                      <p className="font-mono text-white font-bold text-base">
                        <a href="mailto:abuse@cropmyimages.com" className="hover:underline">abuse@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-red-300 text-xs font-mono uppercase">Takedown Response SLA</span>
                      <p className="font-bold text-emerald-400 text-sm">Within 2 to 6 Hours (24/7)</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-red-800 flex items-start gap-2 text-red-200 text-xs">
                    <ShieldCheck className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
                    <span>
                      Please include the exact short URL or QR code file, a screenshot of the violation, and your contact info for rapid verification.
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
