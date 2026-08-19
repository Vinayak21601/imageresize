'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Link as LinkIcon,
  FileText,
  Wifi,
  UserCheck,
  MessageSquare,
  Mail,
  Palette,
  Layers,
  Image as ImageIcon,
  Download,
  RotateCcw,
  Sparkles,
  Check,
  ShieldCheck,
  CreditCard,
  Camera,
  PhoneCall,
  Copy,
  CheckCircle2
} from 'lucide-react';
import {
  QrOptions,
  QrContentType,
  QrDotStyle,
  QrEyeFrameStyle,
  QrEyeBallStyle,
  QrPresetTheme
} from '@/types/qr';

const PRESET_THEMES = [
  {
    id: 'instagram',
    name: 'Instagram Gradient',
    dotStyle: 'classy-rounded' as QrDotStyle,
    eyeFrameStyle: 'rounded' as QrEyeFrameStyle,
    eyeBallStyle: 'circle' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#833AB4',
    gradientColor2: '#FD1D1D',
    gradientRotation: 45,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#E1306C',
    eyeBallColor: '#F56040',
  },
  {
    id: 'neon',
    name: 'Neon Cyber',
    dotStyle: 'dots' as QrDotStyle,
    eyeFrameStyle: 'circle' as QrEyeFrameStyle,
    eyeBallStyle: 'circle' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#00F2FE',
    gradientColor2: '#4FACFE',
    gradientRotation: 90,
    bgColor: '#0F172A',
    eyeFrameColor: '#00F2FE',
    eyeBallColor: '#38BDF8',
  },
  {
    id: 'emerald',
    name: 'Emerald Business',
    dotStyle: 'rounded' as QrDotStyle,
    eyeFrameStyle: 'rounded' as QrEyeFrameStyle,
    eyeBallStyle: 'circle' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#064E3B',
    gradientColor2: '#10B981',
    gradientRotation: 135,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#047857',
    eyeBallColor: '#059669',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    dotStyle: 'extra-rounded' as QrDotStyle,
    eyeFrameStyle: 'rounded' as QrEyeFrameStyle,
    eyeBallStyle: 'circle' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#FF512F',
    gradientColor2: '#DD2476',
    gradientRotation: 45,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#FF512F',
    eyeBallColor: '#DD2476',
  },
  {
    id: 'gold',
    name: 'Gold Luxury',
    dotStyle: 'classy' as QrDotStyle,
    eyeFrameStyle: 'square' as QrEyeFrameStyle,
    eyeBallStyle: 'square' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#F59E0B',
    gradientColor2: '#D97706',
    gradientRotation: 45,
    bgColor: '#18181B',
    eyeFrameColor: '#F59E0B',
    eyeBallColor: '#FBBF24',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Green',
    dotStyle: 'rounded' as QrDotStyle,
    eyeFrameStyle: 'rounded' as QrEyeFrameStyle,
    eyeBallStyle: 'circle' as QrEyeBallStyle,
    useGradient: true,
    dotColor: '#075E54',
    gradientColor2: '#25D366',
    gradientRotation: 90,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#128C7E',
    eyeBallColor: '#25D366',
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    dotStyle: 'square' as QrDotStyle,
    eyeFrameStyle: 'square' as QrEyeFrameStyle,
    eyeBallStyle: 'square' as QrEyeBallStyle,
    useGradient: false,
    dotColor: '#F8FAFC',
    gradientColor2: '#E2E8F0',
    gradientRotation: 0,
    bgColor: '#09090B',
    eyeFrameColor: '#F8FAFC',
    eyeBallColor: '#E2E8F0',
  },
];

export function QrStudio() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<'content' | 'shapes' | 'colors' | 'logo'>('content');
  const [copied, setCopied] = useState(false);

  const [options, setOptions] = useState<QrOptions>({
    contentType: 'url',
    url: 'https://cropmyimages.com',
    text: 'Hello from CropMyImages!',
    wifi: {
      ssid: 'MyHomeWiFi',
      password: 'SecretPassword123',
      encryption: 'WPA',
      hidden: false,
    },
    vcard: {
      firstName: 'Alex',
      lastName: 'Morgan',
      phone: '+1 555 019 2831',
      email: 'alex@company.com',
      company: 'Acme Design Corp',
      jobTitle: 'Creative Director',
      website: 'https://company.com',
    },
    whatsapp: {
      phone: '15550192831',
      message: 'Hi! I found your QR code and would like to get in touch.',
    },
    email: {
      to: 'hello@company.com',
      subject: 'Inquiry from QR Code',
      body: 'Hi, I would like to learn more about your services.',
    },
    upi: {
      vpa: 'merchant@upi',
      name: 'Acme Store',
      amount: '499',
      note: 'Payment for order #108',
    },
    instagram: {
      username: 'creator_studio',
    },
    sms: {
      phone: '15550192831',
      message: 'Subscribe me to daily updates',
    },

    // Preset Theme
    presetTheme: undefined,

    // Styling
    dotStyle: 'rounded',
    eyeFrameStyle: 'rounded',
    eyeBallStyle: 'circle',

    // Colors
    useGradient: true,
    dotColor: '#0F172A',
    gradientColor2: '#0284C7',
    gradientRotation: 45,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#0F172A',
    eyeBallColor: '#0284C7',

    // Logo
    logoUrl: null,
    logoSize: 0.35,
    logoMargin: 4,

    // Dimensions
    size: 400,
    margin: 10,
    errorCorrection: 'Q',
  });

  // Calculate encoded payload string
  const getEncodedData = (): string => {
    switch (options.contentType) {
      case 'url':
        return options.url || 'https://cropmyimages.com';
      case 'text':
        return options.text || 'Hello World';
      case 'wifi':
        return `WIFI:S:${options.wifi.ssid};T:${options.wifi.encryption};P:${options.wifi.password};H:${options.wifi.hidden ? 'true' : 'false'};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${options.vcard.lastName};${options.vcard.firstName};;;\nFN:${options.vcard.firstName} ${options.vcard.lastName}\nORG:${options.vcard.company}\nTITLE:${options.vcard.jobTitle}\nTEL:${options.vcard.phone}\nEMAIL:${options.vcard.email}\nURL:${options.vcard.website}\nEND:VCARD`;
      case 'whatsapp':
        return `https://wa.me/${options.whatsapp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(options.whatsapp.message)}`;
      case 'email':
        return `mailto:${options.email.to}?subject=${encodeURIComponent(options.email.subject)}&body=${encodeURIComponent(options.email.body)}`;
      case 'upi':
        return `upi://pay?pa=${encodeURIComponent(options.upi.vpa)}&pn=${encodeURIComponent(options.upi.name)}${options.upi.amount ? `&am=${options.upi.amount}` : ''}${options.upi.note ? `&tn=${encodeURIComponent(options.upi.note)}` : ''}`;
      case 'instagram':
        return `https://instagram.com/${options.instagram.username.replace('@', '')}`;
      case 'sms':
        return `SMSTO:${options.sms.phone}:${options.sms.message}`;
      default:
        return options.url;
    }
  };

  // Initialize and update QRCodeStyling instance
  useEffect(() => {
    let isMounted = true;

    async function renderQrCode() {
      if (typeof window === 'undefined') return;

      try {
        const QRCodeStyling = (await import('qr-code-styling')).default;
        const dataPayload = getEncodedData();

        const qrConfig: any = {
          width: options.size,
          height: options.size,
          type: 'svg',
          data: dataPayload,
          image: options.logoUrl || undefined,
          margin: options.margin,
          qrOptions: {
            errorCorrectionLevel: options.errorCorrection,
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: options.logoSize,
            margin: options.logoMargin,
            crossOrigin: 'anonymous',
          },
          dotsOptions: {
            type: options.dotStyle,
            color: options.useGradient ? undefined : options.dotColor,
            gradient: options.useGradient
              ? {
                  type: 'linear',
                  rotation: (options.gradientRotation * Math.PI) / 180,
                  colorStops: [
                    { offset: 0, color: options.dotColor },
                    { offset: 1, color: options.gradientColor2 },
                  ],
                }
              : undefined,
          },
          backgroundOptions: {
            color: options.bgColor,
          },
          cornersSquareOptions: {
            type: options.eyeFrameStyle,
            color: options.eyeFrameColor,
          },
          cornersDotOptions: {
            type: options.eyeBallStyle,
            color: options.eyeBallColor,
          },
        };

        if (!qrCodeInstanceRef.current) {
          qrCodeInstanceRef.current = new QRCodeStyling(qrConfig);
          if (qrRef.current && isMounted) {
            qrRef.current.innerHTML = '';
            qrCodeInstanceRef.current.append(qrRef.current);
          }
        } else {
          qrCodeInstanceRef.current.update(qrConfig);
        }
      } catch (err) {
        console.error('Failed to render QR Code:', err);
      }
    }

    renderQrCode();

    return () => {
      isMounted = false;
    };
  }, [options]);

  const applyTheme = (theme: typeof PRESET_THEMES[0]) => {
    setOptions((prev) => ({
      ...prev,
      presetTheme: theme.id as QrPresetTheme,
      dotStyle: theme.dotStyle,
      eyeFrameStyle: theme.eyeFrameStyle,
      eyeBallStyle: theme.eyeBallStyle,
      useGradient: theme.useGradient,
      dotColor: theme.dotColor,
      gradientColor2: theme.gradientColor2,
      gradientRotation: theme.gradientRotation,
      bgColor: theme.bgColor,
      eyeFrameColor: theme.eyeFrameColor,
      eyeBallColor: theme.eyeBallColor,
    }));
  };

  const handleDownload = (format: 'png' | 'svg' | 'jpeg' | 'webp') => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current.download({
        name: `qrcode-${options.contentType}-${Date.now()}`,
        extension: format,
      });
    }
  };

  const handleCopyClipboard = async () => {
    if (!qrCodeInstanceRef.current) return;
    try {
      const blob = await qrCodeInstanceRef.current.getRawData('png');
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Copy to clipboard failed:', e);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions((prev) => ({ ...prev, logoUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* PRESET BRAND THEMES BAR */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-sans">
              Preset Brand Styling Themes
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">One-click designer aesthetics</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {PRESET_THEMES.map((theme) => {
            const isSelected = options.presetTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => applyTheme(theme)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-slate-800 border-zinc-200'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{
                    background: theme.useGradient
                      ? `linear-gradient(45deg, ${theme.dotColor}, ${theme.gradientColor2})`
                      : theme.dotColor,
                  }}
                />
                <span>{theme.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CUSTOMIZATION PANELS */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
          
          {/* TOP TAB CONTROL PILLS */}
          <div className="grid grid-cols-4 gap-1.5 bg-zinc-100 p-1.5 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'content' ? 'bg-slate-900 text-white shadow-md font-bold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('shapes')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'shapes' ? 'bg-slate-900 text-white shadow-md font-bold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Shapes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'colors' ? 'bg-slate-900 text-white shadow-md font-bold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Colors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('logo')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'logo' ? 'bg-slate-900 text-white shadow-md font-bold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Logo</span>
            </button>
          </div>

          {/* TAB 1: CONTENT TYPE SELECTION */}
          {activeTab === 'content' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
                  Select Content Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'url', label: 'URL Link', icon: LinkIcon },
                    { key: 'upi', label: 'UPI / GPay', icon: CreditCard },
                    { key: 'instagram', label: 'Instagram', icon: Camera },
                    { key: 'wifi', label: 'WiFi Network', icon: Wifi },
                    { key: 'vcard', label: 'Contact Card', icon: UserCheck },
                    { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { key: 'email', label: 'Email', icon: Mail },
                    { key: 'sms', label: 'SMS Text', icon: PhoneCall },
                    { key: 'text', label: 'Plain Text', icon: FileText },
                  ].map((type) => {
                    const Icon = type.icon;
                    const isSelected = options.contentType === type.key;
                    return (
                      <button
                        key={type.key}
                        type="button"
                        onClick={() => setOptions((prev) => ({ ...prev, contentType: type.key as QrContentType }))}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FORM INPUTS ACCORDING TO CONTENT TYPE */}
              <div className="space-y-4 pt-2 border-t border-zinc-100">
                {options.contentType === 'url' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">Website URL / Link</label>
                    <input
                      type="url"
                      value={options.url}
                      onChange={(e) => setOptions((prev) => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900 bg-zinc-50/50"
                    />
                  </div>
                )}

                {options.contentType === 'upi' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">VPA Address (UPI ID)</label>
                        <input
                          type="text"
                          value={options.upi.vpa}
                          onChange={(e) => setOptions((prev) => ({ ...prev, upi: { ...prev.upi, vpa: e.target.value } }))}
                          placeholder="merchant@upi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">Payee Name</label>
                        <input
                          type="text"
                          value={options.upi.name}
                          onChange={(e) => setOptions((prev) => ({ ...prev, upi: { ...prev.upi, name: e.target.value } }))}
                          placeholder="Store Name"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-sans"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">Amount (Optional)</label>
                        <input
                          type="number"
                          value={options.upi.amount}
                          onChange={(e) => setOptions((prev) => ({ ...prev, upi: { ...prev.upi, amount: e.target.value } }))}
                          placeholder="499"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">Transaction Note</label>
                        <input
                          type="text"
                          value={options.upi.note}
                          onChange={(e) => setOptions((prev) => ({ ...prev, upi: { ...prev.upi, note: e.target.value } }))}
                          placeholder="Order #108"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {options.contentType === 'instagram' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">Instagram Handle / Username</label>
                    <div className="flex items-center">
                      <span className="px-3.5 py-3 rounded-l-xl bg-zinc-100 border border-r-0 border-zinc-200 text-xs font-bold text-slate-600">@</span>
                      <input
                        type="text"
                        value={options.instagram.username}
                        onChange={(e) => setOptions((prev) => ({ ...prev, instagram: { username: e.target.value } }))}
                        placeholder="yourname"
                        className="w-full px-3.5 py-3 rounded-r-xl border border-zinc-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900 bg-zinc-50/50"
                      />
                    </div>
                  </div>
                )}

                {options.contentType === 'text' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">Plain Text / Note</label>
                    <textarea
                      rows={3}
                      value={options.text}
                      onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}
                      placeholder="Type your message or notes here..."
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-slate-900 font-sans focus:outline-none focus:border-slate-900 bg-zinc-50/50"
                    />
                  </div>
                )}

                {options.contentType === 'wifi' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">Network SSID (Name)</label>
                        <input
                          type="text"
                          value={options.wifi.ssid}
                          onChange={(e) => setOptions((prev) => ({ ...prev, wifi: { ...prev.wifi, ssid: e.target.value } }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-900">WiFi Password</label>
                        <input
                          type="text"
                          value={options.wifi.password}
                          onChange={(e) => setOptions((prev) => ({ ...prev, wifi: { ...prev.wifi, password: e.target.value } }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <label className="font-bold text-slate-900">Security Type:</label>
                      {(['WPA', 'WEP', 'nopass'] as const).map((type) => (
                        <label key={type} className="flex items-center gap-1 cursor-pointer font-medium">
                          <input
                            type="radio"
                            name="encryption"
                            checked={options.wifi.encryption === type}
                            onChange={() => setOptions((prev) => ({ ...prev, wifi: { ...prev.wifi, encryption: type } }))}
                            className="accent-slate-900"
                          />
                          <span>{type === 'nopass' ? 'Open (None)' : type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {options.contentType === 'vcard' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={options.vcard.firstName}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, firstName: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={options.vcard.lastName}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, lastName: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={options.vcard.phone}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, phone: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={options.vcard.email}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, email: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={options.vcard.company}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, company: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50"
                      />
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={options.vcard.jobTitle}
                        onChange={(e) => setOptions((prev) => ({ ...prev, vcard: { ...prev.vcard, jobTitle: e.target.value } }))}
                        className="px-3 py-2 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50"
                      />
                    </div>
                  </div>
                )}

                {options.contentType === 'whatsapp' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">Phone Number (with Country Code)</label>
                      <input
                        type="text"
                        value={options.whatsapp.phone}
                        onChange={(e) => setOptions((prev) => ({ ...prev, whatsapp: { ...prev.whatsapp, phone: e.target.value } }))}
                        placeholder="15550192831"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">Pre-filled Message</label>
                      <input
                        type="text"
                        value={options.whatsapp.message}
                        onChange={(e) => setOptions((prev) => ({ ...prev, whatsapp: { ...prev.whatsapp, message: e.target.value } }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-sans"
                      />
                    </div>
                  </div>
                )}

                {options.contentType === 'email' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">Recipient Email</label>
                      <input
                        type="email"
                        value={options.email.to}
                        onChange={(e) => setOptions((prev) => ({ ...prev, email: { ...prev.email, to: e.target.value } }))}
                        placeholder="hello@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">Email Subject</label>
                      <input
                        type="text"
                        value={options.email.subject}
                        onChange={(e) => setOptions((prev) => ({ ...prev, email: { ...prev.email, subject: e.target.value } }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-sans"
                      />
                    </div>
                  </div>
                )}

                {options.contentType === 'sms' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">SMS Phone Number</label>
                      <input
                        type="text"
                        value={options.sms.phone}
                        onChange={(e) => setOptions((prev) => ({ ...prev, sms: { ...prev.sms, phone: e.target.value } }))}
                        placeholder="15550192831"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-900">SMS Text Body</label>
                      <input
                        type="text"
                        value={options.sms.message}
                        onChange={(e) => setOptions((prev) => ({ ...prev, sms: { ...prev.sms, message: e.target.value } }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-slate-900 bg-zinc-50/50 font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DOT MATRIX & EYE SHAPES */}
          {activeTab === 'shapes' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Dot Pattern Shapes */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
                  Matrix Dot Patterns
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'square', label: 'Classic Square' },
                    { key: 'dots', label: 'Circular Dots' },
                    { key: 'rounded', label: 'Rounded Matrix' },
                    { key: 'extra-rounded', label: 'Extra Rounded' },
                    { key: 'classy', label: 'Classy Curves' },
                    { key: 'classy-rounded', label: 'Classy Smooth' },
                  ].map((shape) => (
                    <button
                      key={shape.key}
                      type="button"
                      onClick={() => setOptions((prev) => ({ ...prev, dotStyle: shape.key as QrDotStyle, presetTheme: undefined }))}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        options.dotStyle === shape.key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Eye Frame Shapes */}
              <div className="space-y-2 pt-3 border-t border-zinc-100">
                <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
                  Corner Eye Frame Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'square', label: 'Square Frame' },
                    { key: 'circle', label: 'Circle Frame' },
                    { key: 'rounded', label: 'Rounded Frame' },
                  ].map((eye) => (
                    <button
                      key={eye.key}
                      type="button"
                      onClick={() => setOptions((prev) => ({ ...prev, eyeFrameStyle: eye.key as QrEyeFrameStyle, presetTheme: undefined }))}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        options.eyeFrameStyle === eye.key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200'
                      }`}
                    >
                      {eye.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Ball Center Shapes */}
              <div className="space-y-2 pt-3 border-t border-zinc-100">
                <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
                  Corner Eye Ball Center
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'square', label: 'Square Ball' },
                    { key: 'circle', label: 'Circle Ball' },
                  ].map((ball) => (
                    <button
                      key={ball.key}
                      type="button"
                      onClick={() => setOptions((prev) => ({ ...prev, eyeBallStyle: ball.key as QrEyeBallStyle, presetTheme: undefined }))}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        options.eyeBallStyle === ball.key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-slate-700 border-zinc-200'
                      }`}
                    >
                      {ball.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiet Zone Margin */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-100">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider block font-sans">
                    Quiet Zone Margin
                  </label>
                  <span className="font-mono text-[11px] font-bold text-slate-600">{options.margin}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="2"
                  value={options.margin}
                  onChange={(e) => setOptions((prev) => ({ ...prev, margin: parseInt(e.target.value, 10) }))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>

            </div>
          )}

          {/* TAB 3: COLORS & GRADIENTS */}
          {activeTab === 'colors' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Gradient Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">2-Color Gradient Fill</div>
                  <div className="text-[10px] text-slate-600 font-normal">Enable smooth linear color transitions for QR dots</div>
                </div>
                <input
                  type="checkbox"
                  checked={options.useGradient}
                  onChange={(e) => setOptions((prev) => ({ ...prev, useGradient: e.target.checked, presetTheme: undefined }))}
                  className="w-5 h-5 accent-slate-900 cursor-pointer"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Primary Dot Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.dotColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, dotColor: e.target.value, presetTheme: undefined }))}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={options.dotColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, dotColor: e.target.value, presetTheme: undefined }))}
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono text-slate-900"
                    />
                  </div>
                </div>

                {options.useGradient && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">Gradient Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={options.gradientColor2}
                        onChange={(e) => setOptions((prev) => ({ ...prev, gradientColor2: e.target.value, presetTheme: undefined }))}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 p-0.5"
                      />
                      <input
                        type="text"
                        value={options.gradientColor2}
                        onChange={(e) => setOptions((prev) => ({ ...prev, gradientColor2: e.target.value, presetTheme: undefined }))}
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Eye Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Eye Frame Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.eyeFrameColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, eyeFrameColor: e.target.value, presetTheme: undefined }))}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={options.eyeFrameColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, eyeFrameColor: e.target.value, presetTheme: undefined }))}
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Eye Ball Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.eyeBallColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, eyeBallColor: e.target.value, presetTheme: undefined }))}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={options.eyeBallColor}
                      onChange={(e) => setOptions((prev) => ({ ...prev, eyeBallColor: e.target.value, presetTheme: undefined }))}
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-100">
                <label className="text-xs font-bold text-slate-900">Background Canvas Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={options.bgColor}
                    onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value, presetTheme: undefined }))}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={options.bgColor}
                    onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value, presetTheme: undefined }))}
                    className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: BRAND LOGO OVERLAY */}
          {activeTab === 'logo' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Upload Custom Brand Logo</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={handleLogoUpload}
                  className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 font-normal">
                  Upload your PNG or SVG logo to overlay in the center with smart background dot clipping.
                </p>
              </div>

              {options.logoUrl && (
                <div className="space-y-4 pt-3 border-t border-zinc-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Current Logo Loaded</span>
                    <button
                      type="button"
                      onClick={() => setOptions((prev) => ({ ...prev, logoUrl: null }))}
                      className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove Logo
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>Logo Scale Size</span>
                      <span className="font-mono text-[11px] font-bold">{Math.round(options.logoSize * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.4"
                      step="0.05"
                      value={options.logoSize}
                      onChange={(e) => setOptions((prev) => ({ ...prev, logoSize: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: LIVE STAGE PREVIEW & EXPORTS */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-3xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                Live QR Preview
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setOptions((prev) => ({
                ...prev,
                presetTheme: undefined,
                dotStyle: 'rounded',
                eyeFrameStyle: 'rounded',
                eyeBallStyle: 'circle',
                useGradient: true,
                dotColor: '#0F172A',
                gradientColor2: '#0284C7',
                bgColor: '#FFFFFF',
                eyeFrameColor: '#0F172A',
                eyeBallColor: '#0284C7',
                logoUrl: null,
              }))}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Design
            </button>
          </div>

          {/* QR Code Render Target Container */}
          <div className="w-full flex items-center justify-center p-4 sm:p-6 bg-zinc-50 border border-zinc-200/80 rounded-3xl shadow-inner min-h-[340px]">
            <div 
              ref={qrRef} 
              className="w-full max-w-[340px] aspect-square rounded-2xl shadow-lg border border-zinc-200/60 p-3 bg-white flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-full [&_svg]:object-contain [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-contain" 
            />
          </div>

          {/* Copy to Clipboard + Downloads */}
          <div className="space-y-3">
            <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
              High-Resolution Export
            </label>

            <button
              type="button"
              onClick={handleCopyClipboard}
              className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Copied Image to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Image to Clipboard</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>PNG (HD)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('svg')}
                className="py-3 px-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-slate-900 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-700" />
                <span>SVG (Vector)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('webp')}
                className="py-2.5 px-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
              >
                WEBP
              </button>

              <button
                type="button"
                onClick={() => handleDownload('jpeg')}
                className="py-2.5 px-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
              >
                JPEG
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-center">
            <span className="text-[11px] text-slate-500 font-mono font-medium">
              100% In-Browser Rendering &bull; Zero Server Tracking
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
