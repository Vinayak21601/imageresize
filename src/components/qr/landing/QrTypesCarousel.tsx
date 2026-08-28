'use client';

import React, { useState } from 'react';
import {
  Link as LinkIcon,
  FileText,
  Wifi,
  UserCheck,
  MessageSquare,
  Smartphone,
  ImageIcon,
  Music,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Download
} from 'lucide-react';

interface QrTypeDetail {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  cta: string;
  previewType: 'url' | 'pdf' | 'wifi' | 'vcard' | 'whatsapp' | 'app' | 'image' | 'audio' | 'multilink';
}

const QR_TYPES: QrTypeDetail[] = [
  {
    id: 'url',
    name: 'Website Link',
    badge: 'Most Popular',
    icon: LinkIcon,
    description: 'Direct users to your website landing page, e-commerce shop, UTM marketing campaigns, or social profiles instantly.',
    features: [
      'Editable target URL anytime (Dynamic)',
      'UTM parameter builder integration',
      'Instant mobile browser auto-open',
      'Real-time scan counter & location tracking'
    ],
    cta: 'Create Website QR Code',
    previewType: 'url',
  },
  {
    id: 'pdf',
    name: 'PDF & Documents',
    badge: 'Restaurant Menus & Catalogs',
    icon: FileText,
    description: 'Share restaurant digital menus, product catalogs, user manuals, and event schedules without printing costly paper booklets.',
    features: [
      'Direct mobile PDF reader viewer',
      'Update PDF document without changing QR',
      'Download & offline save button',
      'Unlimited page count support'
    ],
    cta: 'Create PDF QR Code',
    previewType: 'pdf',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Network',
    badge: 'Zero Typing Required',
    icon: Wifi,
    description: 'Allow guests, customers, and office visitors to connect to WPA/WPA2/WEP Wi-Fi networks in 1 click without typing passwords.',
    features: [
      'Supports WPA, WPA2, WEP & open networks',
      'Hidden SSID support',
      '1-Tap native iOS & Android Wi-Fi join',
      'Encrypted password payload'
    ],
    cta: 'Create Wi-Fi QR Code',
    previewType: 'wifi',
  },
  {
    id: 'vcard',
    name: 'vCard / Business Contact',
    badge: 'Digital Business Card',
    icon: UserCheck,
    description: 'Share your full contact card—phone, email, company, title, website, and address—directly into smartphone contact lists.',
    features: [
      'Adds contact directly to phonebook',
      'Photo avatar & logo support',
      'Social media handle buttons',
      'One-tap call, email & navigation links'
    ],
    cta: 'Create vCard QR Code',
    previewType: 'vcard',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Direct',
    badge: 'Instant Customer Support',
    icon: MessageSquare,
    description: 'Open a direct WhatsApp chat window with pre-filled customer support messages, inquiry templates, or ordering prompts.',
    features: [
      'Pre-filled template message body',
      'International country code selector',
      'Directly launches WhatsApp app',
      'High conversion for customer sales'
    ],
    cta: 'Create WhatsApp QR Code',
    previewType: 'whatsapp',
  },
  {
    id: 'app',
    name: 'App Store Redirect',
    badge: 'Smart OS Detection',
    icon: Smartphone,
    description: 'Single universal QR code that automatically detects if the scanner is using iPhone (Apple App Store) or Android (Google Play).',
    features: [
      'Automatic iOS vs Android routing',
      'Fallback URL for desktop scanners',
      'App Store badge preview',
      'Deep-linking support'
    ],
    cta: 'Create App Store QR Code',
    previewType: 'app',
  },
  {
    id: 'image',
    name: 'Image Showcase',
    badge: 'Visual Gallery',
    icon: ImageIcon,
    description: 'Showcase product photo galleries, real estate listing photos, food presentation slides, or portfolio imagery on mobile.',
    features: [
      'High-resolution image slideshow',
      'Fullscreen zoom & swipe view',
      'Add captions & purchase links',
      'Fast responsive mobile reader'
    ],
    cta: 'Create Image QR Code',
    previewType: 'image',
  },
];

export function QrTypesCarousel() {
  const [activeTypeId, setActiveTypeId] = useState<string>('url');

  const activeType = QR_TYPES.find((t) => t.id === activeTypeId) || QR_TYPES[0];

  const handleSelectType = (id: string) => {
    setActiveTypeId(id);
  };

  const handleScrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-bold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Versatile QR Content Types
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Generates QR codes for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              every business use case.
            </span>
          </h2>
          <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
            Choose from 8+ specialized QR code content types. Switch live destination links anytime without re-printing.
          </p>
        </div>

        {/* Tab Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth justify-start md:justify-center">
          {QR_TYPES.map((type) => {
            const IconComp = type.icon;
            const isActive = type.id === activeTypeId;
            return (
              <button
                key={type.id}
                onClick={() => handleSelectType(type.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Type Showcase Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-800">
              {activeType.badge}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-sans flex items-center gap-3">
                {activeType.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {activeType.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeType.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleScrollToStudio}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-95"
              >
                <span>{activeType.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mobile Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-[6px] border-slate-800 overflow-hidden">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-slate-950 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Mobile Screen Content */}
              <div className="w-full h-full bg-slate-50 rounded-[34px] overflow-hidden pt-7 px-4 pb-4 flex flex-col justify-between relative font-sans">
                
                {/* Header Mock */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Scan Preview</span>
                </div>

                {/* Dynamic Screen Mock depending on Active Type */}
                <div className="flex-1 py-4 flex flex-col justify-center">
                  {activeType.previewType === 'url' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-900">https://yourbrand.com</p>
                      <p className="text-[10px] text-slate-500">Redirecting scanner instantly to main target landing page...</p>
                      <div className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold">
                        Open Website
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'pdf' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-900">Summer_Menu_2026.pdf</p>
                          <p className="text-[10px] text-slate-400">12 Pages &bull; 4.2 MB</p>
                        </div>
                      </div>
                      <div className="h-20 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-[10px]">
                        PDF Digital Viewer
                      </div>
                      <div className="w-full py-2 bg-rose-600 text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" /> View Menu PDF
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'wifi' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-900">Guest_WiFi_5G</p>
                      <p className="text-[10px] text-slate-500">Security: WPA2 &bull; Password Auto-Filled</p>
                      <div className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-bold shadow-xs">
                        Connect to Network
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'vcard' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        JD
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">John Doe</p>
                        <p className="text-[10px] text-slate-500">Chief Executive Officer</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-600">
                        <span className="px-2 py-1 bg-slate-100 rounded-md flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" /> Call
                        </span>
                        <span className="px-2 py-1 bg-slate-100 rounded-md flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" /> Email
                        </span>
                      </div>
                      <div className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold">
                        Save to Contacts
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'whatsapp' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">WhatsApp Chat</p>
                          <p className="text-[9px] text-emerald-600 font-semibold">+1 (555) 019-2834</p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl text-[10px] text-slate-700 font-medium">
                        "Hi! I would like to inquire about your services."
                      </div>
                      <div className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-bold text-center">
                        Open Chat in WhatsApp
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'app' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                      <div className="w-10 h-10 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-900">MyApp Pro</p>
                      <p className="text-[10px] text-slate-500">Auto-detecting App Store vs Google Play...</p>
                      <div className="w-full py-2 bg-black text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-1">
                        Get App on Store
                      </div>
                    </div>
                  )}

                  {activeType.previewType === 'image' && (
                    <div className="space-y-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                      <div className="w-full h-24 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-xl flex items-center justify-center text-white text-[10px] font-bold">
                        Image Gallery Showcase
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 text-center">Product Showcase Photo</p>
                    </div>
                  )}
                </div>

                {/* Footer Mock Bar */}
                <div className="py-1 text-center">
                  <span className="text-[9px] font-semibold text-slate-400">Powered by ImageResize QR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
