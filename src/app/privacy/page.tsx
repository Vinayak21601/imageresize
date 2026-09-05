import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldCheck, Lock, Eye, FileText, UserCheck, Scale, Server, Bell, HelpCircle, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & DPDP Act 2023 Compliance',
  description:
    'CropMyImages Privacy Policy detailing personal data processing, DPDP Act 2023 compliance, cookies, sub-processors, retention policies, data subject rights, and grievance officer contact.',
  keywords: [
    'privacy policy',
    'DPDP Act 2023 compliance',
    'data fiduciary',
    'data principal rights',
    'cookie policy',
    'grievance officer',
    'cropmyimages privacy',
  ],
};

const SECTIONS = [
  { id: 'introduction', label: '1. Introduction & DPDP Scope' },
  { id: 'data-collected', label: '2. Information We Collect' },
  { id: 'purpose-processing', label: '3. Purpose & Legal Basis' },
  { id: 'processors', label: '4. Third-Party Sub-Processors' },
  { id: 'cookies-ads', label: '5. Cookies & Advertising' },
  { id: 'retention', label: '6. Data Retention Schedule' },
  { id: 'data-rights', label: '7. Data Principal Rights (DPDP)' },
  { id: 'children-data', label: '8. Children’s Personal Data' },
  { id: 'security', label: '9. Data Security Measures' },
  { id: 'grievance', label: '10. Grievance Officer & Contact' },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = 'August 20, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60">
          <Navbar />

          <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                DPDP Act 2023 &amp; Global Privacy Compliant
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Privacy Policy <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Data Protection Standards.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                Clear transparency on how CropMyImages handles your data, respects your privacy, and enforces strict compliance under India&apos;s Digital Personal Data Protection (DPDP) Act 2023.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
                <span>Effective Date: {lastUpdated}</span>
                <span>•</span>
                <span>Version 2.4</span>
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
                Navigation Index
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
                  href="#grievance"
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Grievance Officer
                </a>
              </div>
            </aside>

            {/* MAIN POLICY CONTENT */}
            <div className="lg:col-span-3 space-y-12 text-slate-800 leading-relaxed font-normal">
              
              {/* DPDP HIGHLIGHT NOTICE CARD */}
              <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm font-heading">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  DPDP Act 2023 Compliance Statement (Digital Personal Data Protection Act, India)
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-normal leading-relaxed">
                  CropMyImages acts as a <strong>Data Fiduciary</strong> under the Digital Personal Data Protection Act, 2023 (DPDP Act). We process personal digital data only for specified, lawful purposes with explicit consent or legitimate statutory uses. You, as a <strong>Data Principal</strong>, enjoy full statutory rights to access, correct, erase, or withdraw consent at any time.
                </p>
              </div>

              {/* SECTION 1 */}
              <section id="introduction" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Introduction &amp; Scope
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Welcome to <strong>CropMyImages</strong> (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;). We operate the website located at <Link href="/" className="text-slate-900 font-semibold underline underline-offset-4 decoration-zinc-300 hover:decoration-slate-900">https://cropmyimages.com</Link> and associated web application utilities (including image cropper, unit resizer, format converters, QR generator, IP lookup, and URL shortener; please note that QR Generator and URL Shortener features are currently under active development and do not have full functionality).
                </p>
                <p className="text-sm text-slate-700">
                  This Privacy Policy outlines how we collect, store, process, transfer, and safeguard your personal data. By accessing or using our service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our data practices, please refrain from using our services.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="data-collected" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Information We Collect
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We adhere to strict data minimization principles. We only collect information that is strictly necessary to provide and optimize our web tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-sky-600" /> Account &amp; Identity Data
                    </div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      Email address, display name, profile image, and hashed credentials when you register an account or subscribe to paid plans.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <Server className="w-4 h-4 text-emerald-600" /> Technical &amp; Usage Logs
                    </div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      IP address, browser user-agent, operating system, referrer URL, diagnostic request metrics, and daily usage quota counters.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-600" /> Uploaded Images &amp; Media
                    </div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      Image files uploaded for cropping or conversion. <strong>Client-side canvas editing is performed locally in your browser.</strong> Ephemeral server-processed files are held in RAM and purged automatically.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-600" /> Payment &amp; Billing Info
                    </div>
                    <p className="text-slate-600 font-normal leading-relaxed">
                      Payment transactions are handled directly by PCI-DSS certified payment gateways (Stripe / Razorpay). We never store full credit card details.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed font-normal">
                  <strong>Zero AI Training Guarantee:</strong> We never harvest, inspect, sell, or utilize your uploaded images to train machine learning models or artificial intelligence algorithms.
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="purpose-processing" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Purpose &amp; Lawful Grounds for Processing
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Under Section 4 and Section 6 of the DPDP Act 2023, personal data is processed solely for lawful purposes on the basis of consent or specified legitimate uses:
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>Service Execution:</strong> Executing image cropping, format conversions, unit resizing (px, cm, in, mm), QR rendering, and IP lookups as requested.</li>
                  <li><strong>Account Management:</strong> Authenticating your login sessions, managing billing plans, and delivering transaction receipts.</li>
                  <li><strong>Security &amp; Abuse Prevention:</strong> Monitoring API rate limits, detecting bot traffic, preventing DDoS attacks, and ensuring platform integrity.</li>
                  <li><strong>Legal &amp; Regulatory Compliance:</strong> Fulfilling statutory requirements under applicable Indian laws and global regulations.</li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section id="processors" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Third-Party Data Processors (Sub-Processors)
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We work with trusted third-party service providers (Data Processors) under strict data protection agreements. These processors operate under contract and cannot use your data for any unauthorized purpose:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-100 text-slate-900 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3 font-mono">Processor</th>
                        <th className="p-3 font-mono">Category</th>
                        <th className="p-3 font-mono">Purpose</th>
                        <th className="p-3 font-mono">Data Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      <tr>
                        <td className="p-3 font-semibold">Vercel Inc.</td>
                        <td className="p-3">Hosting &amp; Edge Network</td>
                        <td className="p-3">Web hosting &amp; serverless deployment</td>
                        <td className="p-3">USA / Global Edge</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Cloudflare, Inc.</td>
                        <td className="p-3">CDN &amp; DDoS Security</td>
                        <td className="p-3">DNS, SSL encryption &amp; bot protection</td>
                        <td className="p-3">Global Edge</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Stripe / Razorpay</td>
                        <td className="p-3">Payment Gateway</td>
                        <td className="p-3">PCI-DSS checkout &amp; subscription billing</td>
                        <td className="p-3">USA / India</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Google LLC</td>
                        <td className="p-3">Analytics &amp; Advertising</td>
                        <td className="p-3">Traffic insights &amp; Google AdSense ads</td>
                        <td className="p-3">USA / Global</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 5 */}
              <section id="cookies-ads" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Cookies, Advertising &amp; Tracking Technologies
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We use cookies, web beacons, and browser local storage to maintain session state, save application preferences, and serve non-intrusive advertisements.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Google AdSense &amp; DART Cookie Policy:</span>
                    <p className="text-slate-600 font-normal">
                      Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to CropMyImages or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-semibold hover:underline">Google Ad Settings</a> or <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-semibold hover:underline">aboutads.info</a>.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Managing Cookie Preferences:</span>
                    <p className="text-slate-600 font-normal">
                      You can modify your browser settings to decline or purge cookies at any time. Disabling essential session cookies may affect active account login state.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="retention" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Data Retention &amp; Automated Disposal Schedule
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  Data is retained strictly for as long as necessary to fulfill the processing purpose or satisfy statutory obligations under applicable law:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-center space-y-1">
                    <div className="font-mono text-xs font-bold text-slate-500 uppercase">Processed Images</div>
                    <div className="text-lg font-black text-emerald-600 font-mono">Max 1 Hour</div>
                    <p className="text-slate-600 font-normal text-[11px]">Purged automatically from ephemeral RAM cache</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-center space-y-1">
                    <div className="font-mono text-xs font-bold text-slate-500 uppercase">Account Data</div>
                    <div className="text-lg font-black text-slate-900 font-mono">Account Life + 30 Days</div>
                    <p className="text-slate-600 font-normal text-[11px]">Hard deleted 30 days after account deletion request</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-center space-y-1">
                    <div className="font-mono text-xs font-bold text-slate-500 uppercase">Security Audit Logs</div>
                    <div className="text-lg font-black text-slate-900 font-mono">90 Days</div>
                    <p className="text-slate-600 font-normal text-[11px]">Retained for intrusion detection &amp; rate limit enforcement</p>
                  </div>
                </div>
              </section>

              {/* SECTION 7 */}
              <section id="data-rights" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Data Principal Rights under DPDP Act 2023
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  As a Data Principal under the DPDP Act 2023 (and equivalent rights under GDPR/CCPA for international users), you possess the following enforceable statutory rights:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Right to Information &amp; Access:</span>
                    <p className="text-slate-600 font-normal">Request a summary of your personal data being processed and identities of all sub-processors.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Right to Correction &amp; Erasure:</span>
                    <p className="text-slate-600 font-normal">Correct inaccurate data or request complete deletion (&quot;Right to be Forgotten&quot;).</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Right to Withdraw Consent:</span>
                    <p className="text-slate-600 font-normal">Easily revoke previously granted processing consent at any time without fee or restriction.</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900">Right to Nominate:</span>
                    <p className="text-slate-600 font-normal">Nominate another individual to exercise your data rights in the event of death or incapacity.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-mono pt-2">
                  To exercise any of these rights, email your written request to <a href="mailto:contact@cropmyimages.com" className="text-slate-900 font-semibold underline">contact@cropmyimages.com</a>.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="children-data" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Children’s Personal Data Protections
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  In compliance with Section 9 of the DPDP Act 2023, CropMyImages does not knowingly process personal data of children under 18 years of age without verifiable parental consent. We do not conduct targeted advertising, tracking, or behavioral monitoring directed at minors.
                </p>
                <p className="text-xs text-slate-600">
                  If you believe a child has provided us with personal data without parental authorization, please contact our Grievance Officer immediately for prompt data erasure.
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="security" className="scroll-mt-12 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Data Security Measures
                  </h2>
                </div>

                <p className="text-sm text-slate-700">
                  We employ rigorous technical, organizational, and physical safeguards to protect personal data against unauthorized access, loss, or disclosure:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  <li><strong>TLS 1.3 Encryption:</strong> All data in transit is encrypted using modern SSL/TLS protocols.</li>
                  <li><strong>AES-256 Storage:</strong> Database backups and tokens stored at rest are encrypted using 256-bit encryption.</li>
                  <li><strong>Access Controls:</strong> Strict role-based access control (RBAC) and mandatory multi-factor authentication for technical staff.</li>
                  <li><strong>Client-Side Isolation:</strong> Image rendering and pixel operations run inside client browser sandboxes whenever possible.</li>
                </ul>
              </section>

              {/* SECTION 10 */}
              <section id="grievance" className="scroll-mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-sm">
                    10
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Grievance Officer &amp; Statutory Redressal Details
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Under Section 10 and Section 13 of the DPDP Act 2023, CropMyImages has designated a <strong>Data Protection &amp; Grievance Redressal Officer</strong>. For any privacy inquiries, data deletion requests, or formal complaints, please reach out directly using the details below:
                </p>

                <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Designated Officer</span>
                      <p className="font-bold text-white text-sm">Grievance Redressal Officer</p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Statutory Response SLA</span>
                      <p className="font-bold text-emerald-400 text-sm">Within 30 Days (DPDP Mandate)</p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Grievance Email</span>
                      <p className="font-mono text-sky-400 font-semibold">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase">Privacy Escalation</span>
                      <p className="font-mono text-sky-400 font-semibold">
                        <a href="mailto:contact@cropmyimages.com" className="hover:underline">contact@cropmyimages.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-start gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>
                      CropMyImages Data Protection Office, Corporate Tower, MG Road, Bengaluru, Karnataka 560001, India.
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                  If your grievance is not resolved satisfactorily by our officer within the 30-day statutory period, you hold the legal right under DPDP Act Section 13 to escalate your complaint to the <strong>Data Protection Board of India</strong>.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
