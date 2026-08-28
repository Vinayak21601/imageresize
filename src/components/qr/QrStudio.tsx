'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Globe,
  FileText,
  ImageIcon,
  UserCheck,
  Video,
  ChevronDown,
  X,
  Upload,
  Download,
  Copy,
  Wifi,
  MessageSquare,
  Mail,
  Sparkles,
  RotateCw,
  Info,
  CheckCircle2,
  Phone,
  MapPin,
  Bell,
  ArrowRight
} from 'lucide-react';
import {
  QrOptions,
  QrContentType,
  QrDotStyle,
  QrEyeFrameStyle,
  QrEyeBallStyle
} from '@/types/qr';
import { useAppSelector } from '@/lib/redux/store';
import { AuthModal } from '@/components/common/AuthModal';

// Frame Options
const FRAMES = [
  { id: 'none', label: 'No Frame' },
  { id: 'envelope', label: 'Envelope', badgeText: 'SCAN ME' },
  { id: 'screen', label: 'Screen', badgeText: 'SCAN ME' },
  { id: 'tray', label: 'Hand Tray', badgeText: 'ORDER HERE' },
  { id: 'starburst', label: 'Starburst', badgeText: 'OFFER' },
  { id: 'beer', label: 'Beer Mug', badgeText: 'DRINK ME' },
  { id: 'scooter', label: 'Delivery', badgeText: 'DELIVERY' },
  { id: 'coffee', label: 'Coffee Cup', badgeText: 'SCAN ME' },
];

// Preset Logos (Matching Screenshot 3)
const LOGO_PRESETS = [
  { id: 'none', label: 'No Logo', color: 'bg-slate-100 text-slate-400' },
  { id: 'whatsapp', label: 'WhatsApp', color: 'bg-emerald-500 text-white', icon: Phone },
  { id: 'link', label: 'Link', color: 'bg-purple-600 text-white', icon: Globe },
  { id: 'location', label: 'Location', color: 'bg-rose-500 text-white', icon: MapPin },
  { id: 'wifi', label: 'Wi-Fi', color: 'bg-teal-500 text-white', icon: Wifi },
  { id: 'vcard', label: 'vCard', color: 'bg-blue-600 text-white', icon: UserCheck },
  { id: 'email', label: 'Email', color: 'bg-amber-600 text-white', icon: Mail },
  { id: 'scan', label: 'Scan', color: 'bg-fuchsia-600 text-white', icon: Sparkles },
  { id: 'bell', label: 'Bell', color: 'bg-emerald-600 text-white', icon: Bell },
];

// Shape Styles (Matrix Dots)
const SHAPE_STYLES = [
  { id: 'square', name: 'Square' },
  { id: 'dots', name: 'Dots' },
  { id: 'rounded', name: 'Rounded' },
  { id: 'extra-rounded', name: 'Smooth' },
  { id: 'classy', name: 'Classy' },
  { id: 'classy-rounded', name: 'Fancy' },
];

// Eye Border Styles (Outer Corner Frame)
const EYE_BORDER_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'circle', label: 'Circle' },
  { id: 'rounded', label: 'Rounded' },
];

// Eye Center Styles (Inner Eye Ball)
const EYE_CENTER_STYLES = [
  { id: 'square', label: 'Square Ball' },
  { id: 'circle', label: 'Circle Ball' },
];

// Error Correction Levels
const LEVEL_OPTIONS = [
  { level: 'L', percent: '7%', desc: 'Low (~7% recovery)' },
  { level: 'M', percent: '15%', desc: 'Medium (~15% recovery)' },
  { level: 'Q', percent: '25%', desc: 'Quality (~25% recovery)' },
  { level: 'H', percent: '30%', desc: 'High (~30% recovery)' },
];

export function QrStudio() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<any>(null);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Auth modal popup trap state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingFormat, setPendingFormat] = useState<'png' | 'svg' | 'jpeg' | 'webp'>('png');

  // Sub-tabs in Section 2: Frame | Shape | Logo | Level
  const [designTab, setDesignTab] = useState<'frame' | 'shape' | 'logo' | 'level'>('frame');
  const [selectedFrame, setSelectedFrame] = useState<string>('none');
  const [selectedLogoPreset, setSelectedLogoPreset] = useState<string>('none');

  // Validation
  const [showRequiredError, setShowRequiredError] = useState(false);

  // Main QR Options (Empty URL by default as requested!)
  const [options, setOptions] = useState<QrOptions>({
    contentType: 'url',
    url: '', // Empty by default
    text: '',
    wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA',
      hidden: false,
    },
    vcard: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: '',
      website: '',
    },
    whatsapp: {
      phone: '',
      message: '',
    },
    email: {
      to: '',
      subject: '',
      body: '',
    },
    upi: {
      vpa: '',
      name: '',
      amount: '',
      note: '',
    },
    instagram: {
      username: '',
    },
    sms: {
      phone: '',
      message: '',
    },

    presetTheme: undefined,

    // Styling
    dotStyle: 'rounded',
    eyeFrameStyle: 'square',
    eyeBallStyle: 'square',

    // Colors
    useGradient: false,
    dotColor: '#000000',
    gradientColor2: '#000000',
    gradientRotation: 0,
    bgColor: '#FFFFFF',
    eyeFrameColor: '#000000',
    eyeBallColor: '#000000',

    // Logo
    logoUrl: null,
    logoSize: 0.3,
    logoMargin: 4,

    // Dimensions
    size: 240,
    margin: 8,
    errorCorrection: 'L',
  });

  // Calculate encoded payload
  const getEncodedData = (): string => {
    switch (options.contentType) {
      case 'url':
        return options.url || 'https://www.myweb.com/';
      case 'text':
        return options.text || 'Sample Text';
      case 'wifi':
        return `WIFI:S:${options.wifi.ssid || 'MyNetwork'};T:${options.wifi.encryption};P:${options.wifi.password};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${options.vcard.lastName};${options.vcard.firstName};;;\nFN:${options.vcard.firstName} ${options.vcard.lastName}\nTEL:${options.vcard.phone}\nEMAIL:${options.vcard.email}\nEND:VCARD`;
      default:
        return options.url || 'https://www.myweb.com/';
    }
  };

  // Render QR Code via qr-code-styling
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
            typeNumber: 0,
            mode: 'Byte',
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
            color: options.dotColor,
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
        } else {
          qrCodeInstanceRef.current.update(qrConfig);
        }

        if (isMounted && qrRef.current) {
          qrRef.current.innerHTML = '';
          qrCodeInstanceRef.current.append(qrRef.current);
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

  const router = useRouter();

  // Handle Create / Action button click (Redirection to Dashboard)
  const handleActionClick = () => {
    if (!options.url && options.contentType === 'url') {
      setShowRequiredError(true);
    }
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      router.push('/profile');
    }
  };

  // Invert colors handler
  const handleInvertColors = (target: 'shape' | 'eyes') => {
    if (target === 'shape') {
      setOptions((prev) => ({
        ...prev,
        dotColor: prev.bgColor,
        bgColor: prev.dotColor,
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        eyeFrameColor: prev.eyeBallColor,
        eyeBallColor: prev.eyeFrameColor,
      }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions((prev) => ({ ...prev, logoUrl: event.target?.result as string }));
        setSelectedLogoPreset('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans text-slate-900">
      {/* AUTH MODAL POPUP (Shown ONLY when user is NOT logged in) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          router.push('/profile');
        }}
        title="Sign up to create & manage your QR code"
        subtitle="Sign up with Google or your email to generate custom QR codes, edit target links dynamically, and inspect scan analytics in your dashboard."
      />

      {/* MAIN STUDIO OUTER CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* TOP CONTENT TYPE SELECTION TAB STRIP */}
        <div className="bg-white border-b border-slate-100 p-3 sm:p-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            
            {/* Website Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'url' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                options.contentType === 'url'
                  ? 'bg-[#edf2fe] border-blue-200 text-[#2563eb] shadow-xs'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${options.contentType === 'url' ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span>Website</span>
            </button>

            {/* Text Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'text' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                options.contentType === 'text'
                  ? 'bg-[#edf2fe] border-blue-200 text-[#2563eb] shadow-xs'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${options.contentType === 'text' ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-600'}`}>
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span>Text</span>
            </button>

            {/* PDF Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'pdf' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                options.contentType === 'pdf'
                  ? 'bg-[#edf2fe] border-blue-200 text-[#2563eb] shadow-xs'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${options.contentType === 'pdf' ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-600'}`}>
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span>PDF</span>
            </button>

            {/* Images Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'image' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                options.contentType === 'image'
                  ? 'bg-[#edf2fe] border-blue-200 text-[#2563eb] shadow-xs'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${options.contentType === 'image' ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-600'}`}>
                <ImageIcon className="w-3.5 h-3.5" />
              </div>
              <span>Images</span>
            </button>

            {/* vCard Plus Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'vcard' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                options.contentType === 'vcard'
                  ? 'bg-[#edf2fe] border-blue-200 text-[#2563eb] shadow-xs'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${options.contentType === 'vcard' ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-600'}`}>
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span>vCard Plus</span>
            </button>

            {/* Video Tab */}
            <button
              type="button"
              onClick={() => setOptions((prev) => ({ ...prev, contentType: 'url' }))}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600">
                <Video className="w-3.5 h-3.5" />
              </div>
              <span>Video</span>
            </button>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0"
            title="More Options"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* MAIN 2-PANEL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT PANEL (2/3 width) */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
            
            {/* ── STEP 1: COMPLETE THE CONTENT ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded font-bold text-xs flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-sans">
                  Complete the content
                </h3>
              </div>

              <div className="pl-9 space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  {options.contentType === 'url' && 'Enter your Website'}
                  {options.contentType === 'text' && 'Enter your Plain Text'}
                  {options.contentType === 'pdf' && 'Enter PDF Document URL'}
                  {options.contentType === 'image' && 'Enter Image Gallery URL'}
                  {options.contentType === 'vcard' && 'vCard Contact Details'}
                </label>

                {options.contentType === 'url' && (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={options.url}
                      onChange={(e) => {
                        setOptions((prev) => ({ ...prev, url: e.target.value }));
                        if (e.target.value) setShowRequiredError(false);
                      }}
                      placeholder="E.g. https://www.myweb.com/"
                      className={`w-full max-w-md px-4 py-3 bg-white border rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all font-sans ${
                        showRequiredError && !options.url
                          ? 'border-red-500 focus:border-red-600 bg-red-50/20'
                          : 'border-blue-500 focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    {showRequiredError && !options.url && (
                      <p className="text-[11px] font-medium text-red-600 flex items-center gap-1 pt-0.5">
                        <Info className="w-3 h-3" /> Required field
                      </p>
                    )}
                  </div>
                )}

                {options.contentType === 'text' && (
                  <textarea
                    rows={3}
                    value={options.text}
                    onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}
                    placeholder="E.g. Enter your text message here..."
                    className="w-full max-w-md px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all font-sans"
                  />
                )}

                {options.contentType === 'pdf' && (
                  <input
                    type="url"
                    value={options.url}
                    onChange={(e) => setOptions((prev) => ({ ...prev, url: e.target.value }))}
                    placeholder="E.g. https://example.com/document.pdf"
                    className="w-full max-w-md px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 font-sans"
                  />
                )}
              </div>
            </div>

            {/* HORIZONTAL DIVIDER LINE */}
            <div className="border-t border-slate-100 my-6" />

            {/* ── STEP 2: DESIGN YOUR QR ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded font-bold text-xs flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-sans">
                  Design your QR
                </h3>
              </div>

              <div className="pl-9 space-y-4">
                
                {/* Sub-tabs Bar: Frame | Shape | Logo | Level */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  {[
                    { id: 'frame', label: 'Frame' },
                    { id: 'shape', label: 'Shape' },
                    { id: 'logo', label: 'Logo' },
                    { id: 'level', label: 'Level' },
                  ].map((t) => {
                    const isActive = designTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDesignTab(t.id as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#edf2fe] text-[#2563eb]'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                {/* ────────────────────────────────────────────────────────── */}
                {/* 1. FRAME TAB (MATCHING SCREENSHOT 1) */}
                {/* ────────────────────────────────────────────────────────── */}
                {designTab === 'frame' && (
                  <div className="bg-[#fafbfc] border border-slate-200/80 rounded-xl p-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
                    
                    {/* No Frame Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('none')}
                      className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'none'
                          ? 'bg-[#edf2fe] border-blue-500 text-blue-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                      title="No Frame"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center relative">
                        <div className="w-7 h-0.5 bg-current rotate-45 absolute" />
                      </div>
                    </button>

                    {/* Frame 2: Envelope */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('envelope')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'envelope'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Envelope Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">SCAN ME</div>
                      </div>
                    </button>

                    {/* Frame 3: Screen */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('screen')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'screen'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Screen Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">SCAN ME</div>
                      </div>
                    </button>

                    {/* Frame 4: Tray */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('tray')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'tray'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Hand Tray Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">ORDER HERE</div>
                      </div>
                    </button>

                    {/* Frame 5: Starburst */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('starburst')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'starburst'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Starburst Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">OFFER</div>
                      </div>
                    </button>

                    {/* Frame 6: Beer */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('beer')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'beer'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Beer Mug Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">DRINK ME</div>
                      </div>
                    </button>

                    {/* Frame 7: Scooter */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('scooter')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'scooter'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Delivery Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">DELIVERY</div>
                      </div>
                    </button>

                    {/* Frame 8: Coffee */}
                    <button
                      type="button"
                      onClick={() => setSelectedFrame('coffee')}
                      className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1.5 shrink-0 transition-all cursor-pointer ${
                        selectedFrame === 'coffee'
                          ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      title="Coffee Cup Frame"
                    >
                      <div className="w-10 h-10 border border-slate-800 rounded flex flex-col items-center justify-between p-1 bg-white">
                        <div className="w-5 h-5 border border-slate-800 rounded-xs flex items-center justify-center text-[7px] font-mono">QR</div>
                        <div className="w-full bg-slate-900 text-[5px] text-white font-mono font-bold text-center rounded-xs">SCAN ME</div>
                      </div>
                    </button>

                  </div>
                )}

                {/* ────────────────────────────────────────────────────────── */}
                {/* 2. SHAPE TAB (MATCHING SCREENSHOT 2) */}
                {/* ────────────────────────────────────────────────────────── */}
                {designTab === 'shape' && (
                  <div className="space-y-4">
                    
                    {/* Top Card: Shape Style & Colors */}
                    <div className="bg-[#fafbfc] border border-slate-200/80 rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800">Shape style</h4>

                      {/* Horizontal list of dot pattern shapes */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {SHAPE_STYLES.map((st) => {
                          const isSelected = options.dotStyle === st.id;
                          return (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setOptions((prev) => ({ ...prev, dotStyle: st.id as QrDotStyle }))}
                              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                              title={st.name}
                            >
                              <div className="w-8 h-8 flex flex-wrap items-center justify-center gap-0.5 p-1 bg-slate-900 rounded-xs">
                                <div className="w-2 h-2 bg-white rounded-xs" />
                                <div className="w-2 h-2 bg-white rounded-xs" />
                                <div className="w-2 h-2 bg-white rounded-xs" />
                                <div className="w-2 h-2 bg-white rounded-xs" />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Shape Color Pickers + Invert Button */}
                      <div className="p-4 bg-slate-100/70 border border-slate-200/60 rounded-xl flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          
                          {/* Border / Dot Colour */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-700 block">Border colour</span>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
                              <span>{options.dotColor.toUpperCase()}</span>
                              <input
                                type="color"
                                value={options.dotColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, dotColor: e.target.value }))}
                                className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                              />
                            </div>
                          </div>

                          {/* Background Colour */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-700 block">Background colour</span>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
                              <span>{options.bgColor.toUpperCase()}</span>
                              <input
                                type="color"
                                value={options.bgColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value }))}
                                className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Invert Button */}
                        <button
                          type="button"
                          onClick={() => handleInvertColors('shape')}
                          className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Invert</span>
                        </button>
                      </div>

                    </div>

                    {/* Bottom Card: Border Style & Center Style (Corner Eyes) */}
                    <div className="bg-[#fafbfc] border border-slate-200/80 rounded-2xl p-5 space-y-5">
                      
                      {/* Outer Eye Border Style */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-800">Border style</h4>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                          {EYE_BORDER_STYLES.map((b) => {
                            const isSelected = options.eyeFrameStyle === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setOptions((prev) => ({ ...prev, eyeFrameStyle: b.id as QrEyeFrameStyle }))}
                                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                                title={b.label}
                              >
                                <div className="w-7 h-7 border-2 border-slate-900 rounded-xs flex items-center justify-center">
                                  <div className="w-3 h-3 bg-slate-900 rounded-xs" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Inner Eye Center Style */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-800">Center style</h4>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                          {EYE_CENTER_STYLES.map((c) => {
                            const isSelected = options.eyeBallStyle === c.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setOptions((prev) => ({ ...prev, eyeBallStyle: c.id as QrEyeBallStyle }))}
                                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                                title={c.label}
                              >
                                <div className={`w-5 h-5 bg-slate-900 ${c.id === 'circle' ? 'rounded-full' : 'rounded-xs'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Corner Eyes Color Pickers */}
                      <div className="p-4 bg-slate-100/70 border border-slate-200/60 rounded-xl flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-700 block">Border colour</span>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
                              <span>{options.eyeFrameColor.toUpperCase()}</span>
                              <input
                                type="color"
                                value={options.eyeFrameColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, eyeFrameColor: e.target.value }))}
                                className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-700 block">Background colour</span>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
                              <span>{options.eyeBallColor.toUpperCase()}</span>
                              <input
                                type="color"
                                value={options.eyeBallColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, eyeBallColor: e.target.value }))}
                                className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                              />
                            </div>
                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() => handleInvertColors('eyes')}
                          className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Invert</span>
                        </button>
                      </div>

                    </div>

                  </div>
                )}

                {/* ────────────────────────────────────────────────────────── */}
                {/* 3. LOGO TAB (MATCHING SCREENSHOT 3) */}
                {/* ────────────────────────────────────────────────────────── */}
                {designTab === 'logo' && (
                  <div className="bg-[#fafbfc] border border-slate-200/80 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-800">Select a logo</h4>

                    {/* Presets Grid */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {LOGO_PRESETS.map((logo) => {
                        const IconComp = logo.icon;
                        const isSelected = selectedLogoPreset === logo.id;
                        return (
                          <button
                            key={logo.id}
                            type="button"
                            onClick={() => {
                              setSelectedLogoPreset(logo.id);
                              if (logo.id === 'none') {
                                setOptions((prev) => ({ ...prev, logoUrl: null }));
                              }
                            }}
                            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#edf2fe] border-blue-500 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                            title={logo.label}
                          >
                            {logo.id === 'none' ? (
                              <div className="w-7 h-7 rounded-full border-2 border-slate-400 flex items-center justify-center relative text-slate-400">
                                <div className="w-6 h-0.5 bg-current rotate-45 absolute" />
                              </div>
                            ) : (
                              <div className={`w-10 h-10 rounded-full ${logo.color} flex items-center justify-center shadow-xs`}>
                                {IconComp && <IconComp className="w-5 h-5" />}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Drag & Drop Upload Dotted Box */}
                    <div className="pt-2">
                      <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center cursor-pointer transition-all">
                        <Upload className="w-5 h-5 text-slate-600" />
                        <span className="text-xs font-semibold text-slate-700">
                          Drag and drop or click to upload a logo <span className="text-slate-400 font-normal">(JPG, JPEG, or PNG / 2MB max)</span>
                        </span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────── */}
                {/* 4. LEVEL TAB (MATCHING SCREENSHOT 4) */}
                {/* ────────────────────────────────────────────────────────── */}
                {designTab === 'level' && (
                  <div className="bg-[#fafbfc] border border-slate-200/80 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-800">Select a level</h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {LEVEL_OPTIONS.map((item) => {
                        const isSelected = options.errorCorrection === item.level;
                        return (
                          <div
                            key={item.level}
                            onClick={() => setOptions((prev) => ({ ...prev, errorCorrection: item.level as any }))}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-between space-y-3 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#edf2fe] border-blue-500 shadow-md'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            {/* QR Matrix Visual Specimen */}
                            <div className={`w-24 h-24 rounded-xl p-2 border flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-900 text-white border-slate-900'}`}>
                              <div className="w-full h-full border border-white/30 rounded flex items-center justify-center font-mono text-[9px] font-bold">
                                {item.level}
                              </div>
                            </div>

                            {/* Label & Percentage Badge */}
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-extrabold ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                                Level {item.level}
                              </span>
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${isSelected ? 'bg-white border-blue-400 text-blue-700' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                                {item.percent}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* RIGHT PANEL (1/3 width) - STEP 3: DOWNLOAD YOUR QR */}
          <div className="lg:col-span-4 bg-[#f8f9fa] border-l border-slate-100 p-6 sm:p-8 flex flex-col items-center justify-between text-center min-h-[420px]">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-slate-800 text-white rounded font-bold text-xs flex items-center justify-center shadow-xs">
                3
              </span>
              <h3 className="text-base font-extrabold text-slate-900 font-sans">
                Create your QR
              </h3>
            </div>

            {/* WHITE CARD WITH SHADOW CONTAINING REAL-TIME CANVAS */}
            <div className="relative p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center justify-center my-6 min-h-[220px] w-full max-w-[220px] mx-auto">
              <div ref={qrRef} className="flex items-center justify-center max-w-full" />
            </div>

            {/* CREATE / GET STARTED ACTION BUTTON */}
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              <button
                type="button"
                onClick={handleActionClick}
                className="bg-slate-900 hover:bg-black text-white font-extrabold px-6 py-3 rounded-full shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 w-full max-w-[200px]"
              >
                <span>Create QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
