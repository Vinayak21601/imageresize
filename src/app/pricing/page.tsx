'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Search
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';

// The exact CropMyImages image processing features
const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    unit: 'Forever',
    subtitle: 'For casual image editing',
    buttonText: 'Sign Up Now',
    buttonHref: '/',
    subButtonNote: 'Billed monthly',
    featuresHeading: 'Free plan includes:',
    features: [
      'Standard image conversion speed',
      'Basic image cropping & aspect ratios',
      '10MB max file size per image',
      'Standard compression algorithm',
      'Watermark-free exports',
      'Community & email support',
      'Ad-supported interface'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$6.99',
    unit: '/ month',
    subtitle: 'For professionals & creators',
    buttonText: 'Start Free Trial',
    buttonHref: '/?plan=pro',
    subButtonNote: 'Billed monthly',
    featuresHeading: 'All free plan features, plus:',
    features: [
      'Full access to image resizer tools',
      'Multi-unit converter (px, in, cm, mm)',
      '50MB max file size per image',
      'Fast image processing speed (2x)',
      'Batch conversion (up to 50 files)',
      'Target file size compressor (KB limits)',
      'Saved custom cropper presets',
      '100% Ad-free experience',
      '24/7 Priority support'
    ]
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: '$9.99',
    unit: '/ month',
    subtitle: 'For power users & agencies',
    buttonText: 'Start Free Trial',
    buttonHref: '/?plan=ultra',
    subButtonNote: 'Billed monthly',
    featuresHeading: 'All pro plan features, plus:',
    features: [
      'Maximum image processing speed (5x)',
      'Unlimited batch processing size',
      '500MB max file size per image',
      'Advanced target compression (KB/MB)',
      'Custom QR brand logo overlays',
      'Custom domain short links',
      '100% Ad-free experience',
      'Priority 24/7 VIP Support'
    ]
  }
];

// Feature Comparison Matrix
const COMPARISON_ROWS = [
  {
    name: 'Starting per image',
    free: '10MB',
    pro: 'Larger file size (50MB)',
    ultra: 'Highest file size (500MB)'
  },
  {
    name: 'Batch Processing',
    free: 'Limited (3 files)',
    pro: 'Large batch (50 files)',
    ultra: 'Highest batch limit (Unlimited)'
  },
  {
    name: 'Other Tools',
    free: 'Full access to basic tools',
    pro: 'Full access to premium tools',
    ultra: 'Full access to all suite tools'
  },
  {
    name: 'Output image limit',
    free: '100 images / 1 hour image processing',
    pro: '100 images / 1 hour image processing',
    ultra: 'Unlimited images'
  },
  {
    name: 'Support',
    free: 'Community Support',
    pro: 'Priority Support',
    ultra: '24/7 Support'
  },
  {
    name: 'One-time Processing',
    free: 'Included',
    pro: 'Included',
    ultra: 'Included'
  },
  {
    name: 'Secure and Certified (HTTPS)',
    free: 'Included',
    pro: 'Included',
    ultra: 'Included'
  },
  {
    name: 'SSL/TLS Certified',
    free: 'Included',
    pro: 'Included',
    ultra: 'Included'
  },
  {
    name: 'Ad policy',
    free: 'Ad-supported',
    pro: 'No ads',
    ultra: 'No ads'
  }
];

// 17 FAQs matching reference
const FAQS = [
  {
    q: 'Are my payment details secure?',
    a: 'Yes, absolutely. All transactions are encrypted with enterprise-grade 256-bit SSL encryption and processed via Stripe. We never store your full credit card credentials on our servers.'
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your subscription at any time with a single click from your account panel. Your subscription will remain active until the end of your paid billing period.'
  },
  {
    q: 'Are there any hidden fees or extra charges?',
    a: 'No, there are zero hidden fees. What you see is what you pay. All taxes and features associated with your plan are transparently stated.'
  },
  {
    q: 'What if I am not happy with the service?',
    a: 'We offer a 14-day money-back guarantee for all paid subscriptions. If CropMyImages does not meet your expectations, contact our support team for a full refund.'
  },
  {
    q: 'How does the billing cycle work for my subscription?',
    a: 'Subscriptions are billed automatically on either a monthly or annual basis depending on your selected plan. Billed annual plans come with a 20% discount.'
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you will only be charged the pro-rated difference for the remainder of your billing cycle.'
  },
  {
    q: 'Can I try the pro features for free?',
    a: 'Yes, all new users can access our standard free tier with no credit card required. You can also request a 7-day Pro trial from our support dashboard.'
  },
  {
    q: 'How is my free daily quota calculated?',
    a: 'Free daily processing limits reset automatically every 24 hours at 00:00 UTC based on your IP and account session.'
  },
  {
    q: 'When does my free daily quota reset?',
    a: 'Your free daily quota resets every 24 hours at midnight UTC.'
  },
  {
    q: 'What happens if I reach my free daily quota?',
    a: 'If you hit your free daily limit, you can either wait until the daily reset or upgrade to a Pro or Ultra plan for unlimited instant image processing.'
  },
  {
    q: 'How fast is the image processing speed?',
    a: 'Our Pro and Ultra plans run on high-performance processing clusters, rendering crops and resizes in under 100 milliseconds.'
  },
  {
    q: 'Does my image data get stored on your servers?',
    a: 'No! Privacy is our core priority. All cropped or converted images are processed in memory and permanently deleted from our cache within 1 hour.'
  },
  {
    q: 'Where are the files processed and stored?',
    a: 'Files are processed locally in your web browser whenever possible for maximum privacy. Server-side batch operations are executed on secure, isolated cloud workers.'
  },
  {
    q: 'Can I upgrade or downgrade my subscription plan?',
    a: 'Yes, plan changes take effect immediately. Upgrades are pro-rated and downgrades adjust your next renewal date.'
  },
  {
    q: 'What currency do you charge in?',
    a: 'Prices are listed in USD ($). International card issuers will automatically convert the charge to your local currency at checkout.'
  },
  {
    q: 'Do you issue VAT invoices?',
    a: 'Yes, automated PDF tax invoices with full VAT/GST details are sent to your billing email immediately after every transaction.'
  },
  {
    q: 'Can I purchase a corporate account for our employees?',
    a: 'Yes! Ultra plans support multi-user team seats and shared API quota keys. Contact our sales team for custom enterprise seat volumes.'
  }
];

export default function PricingPage() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqQuery, setFaqQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#05070B] text-slate-100 selection:bg-blue-600 selection:text-white'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white'
      }`}
    >
      {/* HERO SECTION WITH CLOUD BACKDROP (MATCHING OTHER SECTIONS) */}
      <div
        className={`relative bg-sky-cloud-hero border-b overflow-hidden transition-colors duration-300 ${
          isDark ? 'border-white/10' : 'border-zinc-200/60'
        }`}
      >
        <Navbar />

        {/* HERO HEADLINE (MATCHING OTHER HERO SECTIONS) */}
        <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1
              className={`text-3xl sm:text-3xl md:text-3xl font-black tracking-tight leading-tight max-w-4xl mx-auto font-heading transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Affordable pricing for your{' '}
              <em
                className={`font-serif italic font-normal transition-colors duration-300 ${
                  isDark ? 'text-sky-300' : 'text-slate-900'
                }`}
              >
                image processing needs.
              </em>
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Simple, transparent pricing for all creators.
            </p>
          </div>
        </section>

        {/* THE 3 PRICING CARDS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* CARD 1: FREE */}
              <div
                className={`rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0D111A] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/20'
                    : 'bg-white border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(30,80,242,0.06)]'
                }`}
              >
                <div className="space-y-5">
                  <h3
                    className={`!font-sans text-base font-bold transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Free
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`!font-sans text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      $0
                    </span>
                    <span
                      className={`!font-sans text-xs font-medium transition-colors ${
                        isDark ? 'text-zinc-400' : 'text-slate-500'
                      }`}
                    >
                      Forever
                    </span>
                  </div>

                  <p
                    className={`!font-sans text-xs font-normal leading-relaxed min-h-[32px] transition-colors ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    For casual image editing
                  </p>

                  {/* Button */}
                  <div className="pt-2">
                    <Link
                      href="/"
                      className={`!font-sans w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-98 ${
                        isDark
                          ? 'bg-[#161B26] hover:bg-[#1E2433] border border-white/10 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80'
                      }`}
                    >
                      Sign Up Now
                    </Link>
                    <span
                      className={`!font-sans text-[11px] text-center block mt-2 font-normal transition-colors ${
                        isDark ? 'text-zinc-500' : 'text-slate-400'
                      }`}
                    >
                      Billed monthly
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    className={`w-full h-px my-4 transition-colors ${
                      isDark ? 'bg-white/[0.08]' : 'bg-slate-100'
                    }`}
                  />

                  {/* Features */}
                  <div className="space-y-3 pt-1">
                    <div
                      className={`!font-sans text-xs font-bold transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Free plan includes:
                    </div>
                    <ul
                      className={`space-y-2.5 text-xs font-normal !font-sans transition-colors ${
                        isDark ? 'text-zinc-300' : 'text-slate-600'
                      }`}
                    >
                      {PRICING_TIERS[0].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <Check
                            className={`w-3.5 h-3.5 stroke-[2.5] shrink-0 ${
                              isDark ? 'text-zinc-400' : 'text-slate-400'
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CARD 2: PRO (THE HERO RADIANT BLUE CARD) */}
              <div className="rounded-[2rem] p-7 sm:p-8 bg-gradient-to-b from-[#2B4BEE] via-[#243ED4] to-[#182B99] text-white border border-blue-400/30 shadow-[0_12px_45px_rgba(37,99,235,0.35)] flex flex-col justify-between relative transition-all duration-300 hover:shadow-[0_16px_55px_rgba(37,99,235,0.45)] md:-translate-y-2">
                <div className="space-y-5">
                  <h3 className="!font-sans text-base font-bold text-white">
                    Pro
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="!font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      $6.99
                    </span>
                    <span className="!font-sans text-xs text-blue-100 font-medium">
                      / month
                    </span>
                  </div>

                  <p className="!font-sans text-xs text-blue-100/90 font-normal leading-relaxed min-h-[32px]">
                    For professionals &amp; creators
                  </p>

                  {/* Crisp White CTA Button */}
                  <div className="pt-2">
                    <Link
                      href="/?plan=pro"
                      className="!font-sans w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 transition-all shadow-md flex items-center justify-center cursor-pointer active:scale-98"
                    >
                      Start Free Trial
                    </Link>
                    <span className="!font-sans text-[11px] text-blue-200/90 text-center block mt-2 font-normal">
                      Billed monthly
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-blue-300/20 my-4" />

                  {/* Features */}
                  <div className="space-y-3 pt-1">
                    <div className="!font-sans text-xs font-bold text-white">
                      All free plan features, plus:
                    </div>
                    <ul className="space-y-2.5 text-xs text-white font-normal !font-sans">
                      {PRICING_TIERS[1].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <Check className="w-3.5 h-3.5 text-white stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CARD 3: ULTRA */}
              <div
                className={`rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0D111A] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/20'
                    : 'bg-white border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(30,80,242,0.06)]'
                }`}
              >
                <div className="space-y-5">
                  <h3
                    className={`!font-sans text-base font-bold transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Ultra
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`!font-sans text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      $9.99
                    </span>
                    <span
                      className={`!font-sans text-xs font-medium transition-colors ${
                        isDark ? 'text-zinc-400' : 'text-slate-500'
                      }`}
                    >
                      / month
                    </span>
                  </div>

                  <p
                    className={`!font-sans text-xs font-normal leading-relaxed min-h-[32px] transition-colors ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    For power users &amp; agencies
                  </p>

                  {/* Button */}
                  <div className="pt-2">
                    <Link
                      href="/?plan=ultra"
                      className={`!font-sans w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-98 ${
                        isDark
                          ? 'bg-[#161B26] hover:bg-[#1E2433] border border-white/10 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80'
                      }`}
                    >
                      Start Free Trial
                    </Link>
                    <span
                      className={`!font-sans text-[11px] text-center block mt-2 font-normal transition-colors ${
                        isDark ? 'text-zinc-500' : 'text-slate-400'
                      }`}
                    >
                      Billed monthly
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    className={`w-full h-px my-4 transition-colors ${
                      isDark ? 'bg-white/[0.08]' : 'bg-slate-100'
                    }`}
                  />

                  {/* Features */}
                  <div className="space-y-3 pt-1">
                    <div
                      className={`!font-sans text-xs font-bold transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      All pro plan features, plus:
                    </div>
                    <ul
                      className={`space-y-2.5 text-xs font-normal !font-sans transition-colors ${
                        isDark ? 'text-zinc-300' : 'text-slate-600'
                      }`}
                    >
                      {PRICING_TIERS[2].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <Check
                            className={`w-3.5 h-3.5 stroke-[2.5] shrink-0 ${
                              isDark ? 'text-zinc-400' : 'text-slate-400'
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
        </section>
      </div>

      {/* MAIN BODY: COMPARISON MATRIX & FAQ */}
      <main className="flex-1 w-full">
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2
              className={`!font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Compare plan features
            </h2>
            <p
              className={`!font-sans text-xs sm:text-sm font-normal transition-colors ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Detailed breakdown of processing limits, formats, and enterprise capability.
            </p>
          </div>

          {/* Clean Day / Dark Table */}
          <div
            className={`overflow-x-auto rounded-3xl border shadow-xl transition-colors ${
              isDark
                ? 'border-white/[0.08] bg-[#0D111A]'
                : 'border-slate-200/80 bg-white'
            }`}
          >
            <table className="w-full text-left border-collapse min-w-[650px] text-xs !font-sans">
              <thead>
                <tr
                  className={`border-b transition-colors ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.02]'
                      : 'border-slate-200/80 bg-slate-50/70'
                  }`}
                >
                  <th
                    className={`py-4 px-6 font-bold w-2/5 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Overview
                  </th>
                  <th
                    className={`py-4 px-6 font-bold text-center w-1/5 transition-colors ${
                      isDark ? 'text-zinc-300' : 'text-slate-600'
                    }`}
                  >
                    Free
                  </th>
                  <th
                    className={`py-4 px-6 font-bold text-center w-1/5 transition-colors ${
                      isDark ? 'text-sky-400 bg-blue-950/30' : 'text-[#1E50F2] bg-blue-50/50'
                    }`}
                  >
                    Pro
                  </th>
                  <th
                    className={`py-4 px-6 font-bold text-center w-1/5 transition-colors ${
                      isDark ? 'text-zinc-300' : 'text-slate-600'
                    }`}
                  >
                    Ultra
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y transition-colors ${
                  isDark ? 'divide-white/[0.06]' : 'divide-slate-100'
                }`}
              >
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td
                      className={`py-3.5 px-6 font-medium transition-colors ${
                        isDark ? 'text-zinc-300' : 'text-slate-700'
                      }`}
                    >
                      {row.name}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-center transition-colors ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}
                    >
                      {row.free}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-center font-semibold transition-colors ${
                        isDark
                          ? 'text-white bg-blue-950/20'
                          : 'text-slate-900 bg-blue-50/30'
                      }`}
                    >
                      {row.pro}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-center font-semibold transition-colors ${
                        isDark ? 'text-zinc-200' : 'text-slate-800'
                      }`}
                    >
                      {row.ultra}
                    </td>
                  </tr>
                ))}

                {/* Table Bottom Action Row */}
                <tr
                  className={`border-t transition-colors ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.02]'
                      : 'border-slate-200/80 bg-slate-50/50'
                  }`}
                >
                  <td className="py-5 px-6 font-semibold"></td>
                  <td className="py-5 px-6 text-center">
                    <Link
                      href="/"
                      className={`inline-block px-5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs ${
                        isDark
                          ? 'text-white bg-[#161B26] hover:bg-[#1E2433] border border-white/10'
                          : 'text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      Sign Up Now
                    </Link>
                  </td>
                  <td
                    className={`py-5 px-6 text-center ${
                      isDark ? 'bg-blue-950/20' : 'bg-blue-50/30'
                    }`}
                  >
                    <Link
                      href="/?plan=pro"
                      className="inline-block px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#1E50F2] hover:bg-[#1945D4] transition-colors shadow-xs"
                    >
                      Start Free Trial
                    </Link>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <Link
                      href="/?plan=ultra"
                      className={`inline-block px-5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs ${
                        isDark
                          ? 'text-white bg-[#161B26] hover:bg-[#1E2433] border border-white/10'
                          : 'text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      Start Free Trial
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-12 space-y-6">
          <div className="text-center space-y-2">
            <h2
              className={`!font-sans text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`!font-sans text-xs sm:text-sm font-normal transition-colors ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Frequently asked questions regarding our pricing plans and processing services.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search
              className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-zinc-400' : 'text-slate-400'
              }`}
            />
            <input
              id="pricing-faq-search-input"
              type="text"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Search questions (e.g. security, refund, quota)..."
              aria-label="Search frequently asked questions"
              className={`!font-sans w-full rounded-xl pl-11 pr-4 py-2.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#2B4BEE]/40 focus:border-[#2B4BEE] ${
                isDark
                  ? 'bg-[#0D111A] border border-white/[0.1] text-white placeholder-zinc-500'
                  : 'bg-white border border-slate-200/80 text-slate-900 placeholder-slate-400 shadow-xs'
              }`}
            />
            {faqQuery && (
              <button
                type="button"
                onClick={() => setFaqQuery('')}
                className={`!font-sans absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold cursor-pointer ${
                  isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Clear
              </button>
            )}
          </div>

          {/* 17 FAQs List */}
          <div className="space-y-2.5 pt-2">
            {filteredFaqs.length === 0 ? (
              <div
                className={`!font-sans text-center py-12 text-xs ${
                  isDark ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                No matching questions found for &quot;{faqQuery}&quot;.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border overflow-hidden transition-all ${
                      isDark
                        ? 'border-white/[0.08] bg-[#0D111A]'
                        : 'border-slate-200/80 bg-white shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className={`w-full flex items-center justify-between p-4 text-left transition-colors cursor-pointer ${
                        isDark
                          ? 'hover:bg-white/[0.02]'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <span
                        className={`!font-sans text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs font-bold ${
                            isDark ? 'text-zinc-500' : 'text-slate-400'
                          }`}
                        >
                          {idx + 1}.
                        </span>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                          isOpen
                            ? isDark ? 'rotate-180 text-sky-400' : 'rotate-180 text-[#1E50F2]'
                            : isDark ? 'text-zinc-400' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`!font-sans p-4 text-xs leading-relaxed border-t transition-colors ${
                              isDark
                                ? 'text-zinc-300 border-white/[0.06] bg-black/20'
                                : 'text-slate-600 border-slate-100 bg-slate-50/40'
                            }`}
                          >
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div
            className={`relative rounded-3xl p-8 sm:p-10 overflow-hidden border text-center space-y-6 shadow-xl transition-colors ${
              isDark
                ? 'border-white/[0.08] bg-[#0D111A]'
                : 'border-slate-200/80 bg-white'
            }`}
          >
            <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
              <h3
                className={`!font-sans text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Ready to experience high-precision image editing?
              </h3>
              <p
                className={`!font-sans text-xs sm:text-sm font-normal transition-colors ${
                  isDark ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                Start free with no credit card required, or upgrade anytime for batch operations and ad-free editing.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className={`!font-sans px-6 py-2.5 text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer ${
                  isDark
                    ? 'text-white bg-[#161B26] hover:bg-[#1E2433] border border-white/10'
                    : 'text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                Launch Studio Free
              </Link>
              <Link
                href="/?plan=pro"
                className="!font-sans px-6 py-2.5 text-xs font-bold text-white bg-[#1E50F2] hover:bg-[#1945D4] rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
