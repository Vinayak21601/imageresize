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

// Pricing Tiers Data
const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'For casual image editing',
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    popular: false,
    buttonText: 'Get Started',
    buttonHref: '/',
    buttonVariant: 'secondary',
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
    subtitle: 'For professionals & creators',
    monthlyPrice: 6.00,
    yearlyPrice: 4.99,
    badge: 'MOST POPULAR',
    popular: true,
    buttonText: 'Get Started Pro',
    buttonHref: '/?plan=pro',
    buttonVariant: 'primary',
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
    subtitle: 'For power users & agencies',
    monthlyPrice: 15.00,
    yearlyPrice: 11.99,
    badge: 'BEST VALUE',
    popular: false,
    buttonText: 'Get Started Ultra',
    buttonHref: '/?plan=ultra',
    buttonVariant: 'secondary',
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
const COMPARISON_FEATURES = [
  {
    category: 'Limits & Storage',
    items: [
      {
        name: 'File size per image',
        free: '10MB',
        pro: '50MB',
        ultra: '500MB'
      },
      {
        name: 'Batch Processing',
        free: 'Limited (3 files)',
        pro: 'Large batch (50 files)',
        ultra: 'Highest batch (Unlimited)'
      },
      {
        name: 'Processing Speed',
        free: 'Standard',
        pro: 'Fast (2x GPU accelerated)',
        ultra: 'Ultra-fast (5x priority)'
      }
    ]
  },
  {
    category: 'Tools & Functionality',
    items: [
      {
        name: 'Other Tools',
        free: 'Full access to basic tools',
        pro: 'Full access to premium tools',
        ultra: 'Full access to all suite tools'
      },
      {
        name: 'Output image format',
        free: 'WEBP, JPG, PNG',
        pro: 'WEBP, JPG, PNG, AVIF',
        ultra: 'All formats + High Res SVG'
      },
      {
        name: 'Custom Dimension Presets',
        free: true,
        pro: true,
        ultra: true
      },
      {
        name: 'One-time Processing',
        free: true,
        pro: true,
        ultra: true
      }
    ]
  },
  {
    category: 'Security & Support',
    items: [
      {
        name: 'Support',
        free: 'Community Time',
        pro: 'Priority Contact',
        ultra: '24/7 VIP Support'
      },
      {
        name: 'Secure & Certified',
        free: true,
        pro: true,
        ultra: true
      },
      {
        name: 'Ads-free',
        free: false,
        pro: true,
        ultra: true
      }
    ]
  }
];

// FAQ Data
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
    q: 'Can I purchase an account for an entire team?',
    a: 'Yes! Ultra plans support multi-user team seats and shared API quota keys. Contact our sales team for custom enterprise seat volumes.'
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqQuery, setFaqQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Hero Section & Pricing Cards Grid Container with Background Image */}
      <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
        <Navbar />

        <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-slate-800 shadow-sm">
              Simple, Transparent Plans
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
              Pricing that <em className="font-serif italic font-normal text-slate-900">stays small.</em>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto font-light">
              One simple plan for your needs. Billed monthly or annually with zero lock-in contracts.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="pt-6 flex items-center justify-center gap-4">
              <span className={`text-xs sm:text-sm font-semibold transition-colors ${!isYearly ? 'text-slate-900' : 'text-zinc-500'}`}>
                Monthly
              </span>

              <button
                onClick={() => setIsYearly(!isYearly)}
                aria-label="Toggle annual billing"
                className="relative w-16 h-8 rounded-full bg-white border border-zinc-300 p-1 cursor-pointer transition-colors focus:outline-none shadow-sm"
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-black shadow-sm"
                  animate={{ x: isYearly ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>

              <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${isYearly ? 'text-slate-900' : 'text-zinc-500'}`}>
                Yearly
                <span className="px-2.5 py-0.5 text-[11px] font-bold text-white bg-black rounded-full shadow-sm">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {PRICING_TIERS.map((tier) => {
              const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

              return (
                <motion.div
                  key={tier.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative flex flex-col justify-between rounded-3xl transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-b from-sky-400 via-blue-600 to-indigo-600 p-[2px] shadow-xl z-10'
                      : 'bg-white border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-slate-800'
                  }`}
                >
                  <div className={`flex flex-col justify-between h-full rounded-[22px] p-5 sm:p-6 ${tier.popular ? 'bg-white' : ''}`}>

                    {/* Popular Badge */}
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900 text-white font-black text-[9px] tracking-widest uppercase shadow-md border border-slate-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {tier.badge}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Title & Subtitle */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight">
                            {tier.name}
                          </h3>
                          {tier.id === 'ultra' && (
                            <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] text-[9px] font-bold uppercase tracking-wider border border-sky-100">
                              PRO SUITE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-normal">{tier.subtitle}</p>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">/ mo</span>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={tier.buttonHref}
                        className={`w-full py-3 px-4 rounded-full font-bold text-xs text-center uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 ${
                          tier.popular
                            ? 'bg-slate-900 text-white hover:bg-black shadow-slate-900/20 shadow-md'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-slate-900 border border-zinc-200/80'
                        }`}
                      >
                        <span>{tier.buttonText}</span>
                      </Link>

                      <div className="w-full h-px bg-zinc-100" />

                      {/* Feature List */}
                      <div className="space-y-2.5">
                        <div className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider font-sans">
                          What&apos;s included:
                        </div>
                        <ul className="space-y-2 text-xs text-slate-800">
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-normal">
                              <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2 h-2 text-emerald-600 stroke-[3]" />
                              </div>
                              <span className="text-slate-800 font-medium text-[11px]">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-zinc-100 text-center">
                      <span className="text-[10px] text-zinc-500 font-mono font-medium">
                        {tier.id === 'free' ? 'No credit card required' : 'Cancel or change anytime'}
                      </span>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Feature Comparison Matrix Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Compare plan features
          </h2>
          <p className="text-sm text-zinc-500 font-light">Detailed breakdown of quotas, formats, and enterprise support.</p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80">
                <th className="py-5 px-6 text-sm font-bold text-slate-900 w-2/5 font-sans">Overview</th>
                <th className="py-5 px-6 text-sm font-bold text-slate-900 text-center w-1/5">Free</th>
                <th className="py-5 px-6 text-sm font-bold text-slate-900 text-center w-1/5 bg-zinc-100/50">Pro</th>
                <th className="py-5 px-6 text-sm font-bold text-slate-900 text-center w-1/5">Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {COMPARISON_FEATURES.map((category, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-zinc-50/50">
                    <td colSpan={4} className="py-3 px-6 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="hover:bg-zinc-50/80 transition-colors text-xs">
                      <td className="py-4 px-6 font-medium text-slate-800">{item.name}</td>

                      {/* Free Col */}
                      <td className="py-4 px-6 text-center text-zinc-600">
                        {typeof item.free === 'boolean' ? (
                          item.free ? (
                            <span className="text-emerald-600 font-semibold">Included</span>
                          ) : (
                            <span className="text-zinc-400">Not included</span>
                          )
                        ) : (
                          item.free
                        )}
                      </td>

                      {/* Pro Col */}
                      <td className="py-4 px-6 text-center text-slate-900 font-bold bg-zinc-100/40">
                        {typeof item.pro === 'boolean' ? (
                          item.pro ? (
                            <span className="text-black font-extrabold">Included</span>
                          ) : (
                            <span className="text-zinc-400">Not included</span>
                          )
                        ) : (
                          item.pro
                        )}
                      </td>

                      {/* Ultra Col */}
                      <td className="py-4 px-6 text-center text-slate-900 font-bold">
                        {typeof item.ultra === 'boolean' ? (
                          item.ultra ? (
                            <span className="text-black font-extrabold">Included</span>
                          ) : (
                            <span className="text-zinc-400">Not included</span>
                          )
                        ) : (
                          item.ultra
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Table Bottom Action Row */}
              <tr className="bg-zinc-50/80 border-t border-zinc-200">
                <td className="py-6 px-6 font-bold text-slate-900 text-sm">Get Started Today</td>
                <td className="py-6 px-6 text-center">
                  <Link
                    href="/"
                    className="inline-block px-4 py-2 text-xs font-bold text-slate-900 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all"
                  >
                    Get Started
                  </Link>
                </td>
                <td className="py-6 px-6 text-center bg-zinc-100/50">
                  <Link
                    href="/?plan=pro"
                    className="inline-block px-5 py-2 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-sm"
                  >
                    Get Started
                  </Link>
                </td>
                <td className="py-6 px-6 text-center">
                  <Link
                    href="/?plan=ultra"
                    className="inline-block px-4 py-2 text-xs font-bold text-slate-900 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all"
                  >
                    Get Started
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-slate-800 shadow-sm">
            Support &amp; Information
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Frequently <em className="font-serif italic font-normal text-slate-900">asked questions.</em>
          </h2>
          <p className="text-sm text-zinc-500 font-light">
            Got questions? We&apos;ve got answers. If you have any questions, feel free to reach out.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="pricing-faq-search-input"
            type="text"
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
            placeholder="Search questions (e.g. security, refund, quota)..."
            aria-label="Search frequently asked questions"
            className="w-full bg-white border border-zinc-200 focus:border-black rounded-full pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-zinc-400 focus:outline-none transition-colors shadow-sm"
          />
          {faqQuery && (
            <button
              onClick={() => setFaqQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-black font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No matching questions found for &quot;{faqQuery}&quot;.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                      ? 'bg-white text-slate-900 border-zinc-300 shadow-md'
                      : 'bg-white text-slate-900 border-zinc-200/80 hover:border-zinc-300'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-400 font-bold">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-black' : ''
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
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 font-light">
                          <p className="mt-3">{faq.a}</p>
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

      {/* Bottom CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-sky-cloud-hero border border-zinc-200/80 shadow-xl text-center space-y-6">
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Ready to experience high-precision image editing?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-light">
              Start free with no credit card required, or upgrade anytime for lightning-fast GPU-accelerated batch operations.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="px-8 py-3.5 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Launch Studio Free
            </Link>
            <Link
              href="/?plan=pro"
              className="px-8 py-3.5 text-xs font-bold text-slate-900 bg-white/90 hover:bg-white border border-zinc-200 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Upgrade to Pro ($8.99/mo)
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
