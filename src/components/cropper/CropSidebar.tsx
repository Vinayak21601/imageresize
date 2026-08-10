'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Maximize2, 
  Percent, 
  Share2, 
  Lock, 
  Unlock, 
  Download, 
  Palette, 
  FileText,
  Sparkles,
  Eraser,
  Target,
  Info,
  Square,
  Circle,
  Sun,
  RotateCcw
} from 'lucide-react';
import { ResizeSettings, UnitType, OutputFormat, ImageMetadata, CropData } from '@/types/image';
import { SOCIAL_PRESETS } from '@/lib/presets';
import { convertToPixels, convertFromPixels } from '@/lib/units';
import { AdBanner } from '@/components/common/AdBanner';

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      );
    case 'web':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    default:
      return null;
  }
}

interface CropSidebarProps {
  metadata: ImageMetadata;
  cropData: CropData;
  settings: ResizeSettings;
  onUpdateSettings: (newSettings: Partial<ResizeSettings>) => void;
  onExecuteProcess: () => void;
  isProcessing: boolean;
  onRemoveBackground?: () => Promise<void>;
  onSmartCrop?: () => Promise<void>;
  isRemovingBg?: boolean;
  isSmartCropping?: boolean;
}

export function CropSidebar({
  metadata,
  cropData,
  settings,
  onUpdateSettings,
  onExecuteProcess,
  isProcessing,
  onRemoveBackground,
  onSmartCrop,
  isRemovingBg = false,
  isSmartCropping = false,
}: CropSidebarProps) {
  const [activeTab, setActiveTab] = useState<'ratio' | 'size' | 'percentage' | 'adjust' | 'preset'>('ratio');
  const [showAiInfo, setShowAiInfo] = useState(false);

  const [widthInput, setWidthInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('');

  useEffect(() => {
    const currentPxW = settings.targetWidth || cropData.width || metadata.width;
    const currentPxH = settings.targetHeight || cropData.height || metadata.height;

    const formattedW = convertFromPixels(currentPxW, settings.unit, settings.dpi);
    const formattedH = convertFromPixels(currentPxH, settings.unit, settings.dpi);

    setWidthInput(formattedW.toString());
    setHeightInput(formattedH.toString());
  }, [settings.unit, settings.dpi, settings.targetWidth, settings.targetHeight, cropData.width, cropData.height, metadata.width, metadata.height]);

  const handleUnitChange = (newUnit: UnitType) => {
    onUpdateSettings({ unit: newUnit });
  };

  const handleWidthChange = (valStr: string) => {
    setWidthInput(valStr);
    const num = parseFloat(valStr);
    if (!isNaN(num) && num > 0) {
      const pxWidth = convertToPixels(num, settings.unit, settings.dpi);
      let pxHeight = settings.targetHeight;

      if (settings.lockAspectRatio) {
        const ratio = settings.aspectRatio || cropData.width / cropData.height || metadata.aspectRatio;
        pxHeight = pxWidth / ratio;
        setHeightInput(convertFromPixels(pxHeight, settings.unit, settings.dpi).toString());
      }

      onUpdateSettings({
        targetWidth: Math.round(pxWidth),
        targetHeight: Math.round(pxHeight),
        mode: 'size',
      });
    }
  };

  const handleHeightChange = (valStr: string) => {
    setHeightInput(valStr);
    const num = parseFloat(valStr);
    if (!isNaN(num) && num > 0) {
      const pxHeight = convertToPixels(num, settings.unit, settings.dpi);
      let pxWidth = settings.targetWidth;

      if (settings.lockAspectRatio) {
        const ratio = settings.aspectRatio || cropData.width / cropData.height || metadata.aspectRatio;
        pxWidth = pxHeight * ratio;
        setWidthInput(convertFromPixels(pxWidth, settings.unit, settings.dpi).toString());
      }

      onUpdateSettings({
        targetWidth: Math.round(pxWidth),
        targetHeight: Math.round(pxHeight),
        mode: 'size',
      });
    }
  };

  const handlePercentageChange = (pct: number) => {
    const newW = Math.round((cropData.width || metadata.width) * (pct / 100));
    const newH = Math.round((cropData.height || metadata.height) * (pct / 100));

    onUpdateSettings({
      percentage: pct,
      targetWidth: newW,
      targetHeight: newH,
      mode: 'percentage',
    });
  };

  const handlePresetSelect = (preset: typeof SOCIAL_PRESETS[0]) => {
    onUpdateSettings({
      targetWidth: preset.width,
      targetHeight: preset.height,
      aspectRatio: preset.aspectRatio,
      mode: 'preset',
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
      
      {/* AI MAGIC TOOLS CARD */}
      <div className="bg-slate-50 border border-zinc-200/80 rounded-2xl p-3.5 space-y-2.5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs text-slate-900 tracking-tight font-sans">
              AI Magic Tools
            </span>
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAiInfo(!showAiInfo)}
              onMouseEnter={() => setShowAiInfo(true)}
              className="p-1 rounded-full text-zinc-400 hover:text-slate-900 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              title="AI Tools Info"
            >
              <Info className="w-4 h-4" />
            </button>

            {showAiInfo && (
              <div 
                className="absolute right-0 top-7 w-64 bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl z-50 text-[11px] space-y-2 animate-in fade-in zoom-in-95 duration-150 border border-slate-700"
                onMouseLeave={() => setShowAiInfo(false)}
              >
                <div className="flex items-center justify-between border-b border-zinc-700 pb-1.5 font-bold">
                  <span>How AI Tools Work</span>
                  <button type="button" onClick={() => setShowAiInfo(false)} className="text-zinc-400 hover:text-white text-xs">✕</button>
                </div>
                <div className="space-y-2 text-zinc-300 font-light leading-relaxed">
                  <p><strong className="text-white font-semibold">AI Remove BG:</strong> Erases image backgrounds in 1-click directly in your browser.</p>
                  <p><strong className="text-white font-semibold">AI Smart Focus:</strong> Detects faces/subjects and centers crop frames for social media ratios.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* AI BG Removal */}
          <button
            type="button"
            onClick={onRemoveBackground}
            disabled={isRemovingBg || !onRemoveBackground}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 text-xs font-bold text-slate-900 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer group"
          >
            {isRemovingBg ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px]">Erasing BG...</span>
              </>
            ) : (
              <>
                <Eraser className="w-3.5 h-3.5 text-[#0284C7] group-hover:text-white transition-colors" />
                <span className="text-[11px]">AI Remove BG</span>
              </>
            )}
          </button>

          {/* AI Smart Focus */}
          <button
            type="button"
            onClick={onSmartCrop}
            disabled={isSmartCropping || !onSmartCrop}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 text-xs font-bold text-slate-900 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer group"
          >
            {isSmartCropping ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px]">Analyzing...</span>
              </>
            ) : (
              <>
                <Target className="w-3.5 h-3.5 text-[#0284C7] group-hover:text-white transition-colors" />
                <span className="text-[11px]">AI Smart Focus</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-PILL MODE TABS */}
      <div className="grid grid-cols-5 gap-1 bg-zinc-100 p-1.5 rounded-full text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => { setActiveTab('ratio'); onUpdateSettings({ mode: 'crop' }); }}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'ratio' ? 'bg-black text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Ratio
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('size'); onUpdateSettings({ mode: 'size' }); }}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'size' ? 'bg-black text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Size
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('percentage'); onUpdateSettings({ mode: 'percentage' }); }}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'percentage' ? 'bg-black text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          Scale %
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('adjust'); }}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'adjust' ? 'bg-black text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          Adjust
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('preset'); onUpdateSettings({ mode: 'preset' }); }}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'preset' ? 'bg-black text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Presets
        </button>
      </div>

      {/* TAB CONTENT 1: ASPECT RATIO PRESETS */}
      {activeTab === 'ratio' && (
        <div className="space-y-4">
          {/* Crop Shape Selector (Rectangle vs Circle) */}
          <div className="space-y-1.5 pb-3 border-b border-zinc-200/80">
            <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
              Crop Frame Shape
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ cropShape: 'rectangle' })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  settings.cropShape !== 'circle'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-zinc-50 text-slate-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>Rectangle</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ cropShape: 'circle', aspectRatio: 1 })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  settings.cropShape === 'circle'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-zinc-50 text-slate-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
                <span>Circle Avatar</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
              Aspect Ratio Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Freeform', value: null },
                { label: '1:1 Square', value: 1 },
                { label: '16:9 HD', value: 16 / 9 },
                { label: '1.91:1 OG Meta', value: 1200 / 630 },
                { label: '9:16 Story', value: 9 / 16 },
                { label: '4:3 Standard', value: 4 / 3 },
              ].map((ratio) => (
                <button
                  key={ratio.label}
                  type="button"
                  onClick={() => onUpdateSettings({ aspectRatio: ratio.value })}
                  className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    settings.aspectRatio === ratio.value
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-zinc-50 text-slate-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: RESIZE BY SIZE (px, in, cm, mm) */}
      {activeTab === 'size' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
              Unit &amp; Dimensions
            </label>

            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-full border border-zinc-200/80">
              {(['px', 'in', 'cm', 'mm'] as UnitType[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => handleUnitChange(u)}
                  className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full uppercase transition-colors ${
                    settings.unit === u ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-zinc-500 mb-1 block">
                Width ({settings.unit})
              </label>
              <input
                type="number"
                value={widthInput}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-black font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-500 mb-1 block">
                Height ({settings.unit})
              </label>
              <input
                type="number"
                value={heightInput}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-black font-mono font-bold"
              />
            </div>
          </div>

          {/* Aspect Lock & DPI */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => onUpdateSettings({ lockAspectRatio: !settings.lockAspectRatio })}
              className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-black"
            >
              {settings.lockAspectRatio ? (
                <Lock className="w-4 h-4 text-slate-900" />
              ) : (
                <Unlock className="w-4 h-4 text-zinc-400" />
              )}
              Lock Aspect Ratio
            </button>

            {settings.unit !== 'px' && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold">
                <span>DPI:</span>
                <select
                  value={settings.dpi}
                  onChange={(e) => onUpdateSettings({ dpi: parseInt(e.target.value) })}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs text-slate-900"
                >
                  <option value={96}>96 DPI (Web)</option>
                  <option value={300}>300 DPI (Print)</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: BY PERCENTAGE */}
      {activeTab === 'percentage' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
              Scale Percentage
            </label>
            <span className="text-base font-black font-mono text-slate-900">{settings.percentage}%</span>
          </div>

          <input
            type="range"
            min={1}
            max={300}
            value={settings.percentage}
            onChange={(e) => handlePercentageChange(parseInt(e.target.value))}
            className="w-full h-2.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
          />

          <div className="flex justify-between text-[11px] font-mono text-zinc-400">
            <span>1%</span>
            <span>50%</span>
            <span>100% (Original)</span>
            <span>200%</span>
            <span>300%</span>
          </div>

          <div className="p-4 bg-zinc-900 text-white rounded-2xl shadow-md flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Target Dimension:</span>
            <span className="font-mono text-base font-black text-white">
              {settings.targetWidth || Math.round((cropData.width || metadata.width) * (settings.percentage / 100))} x{' '}
              {settings.targetHeight || Math.round((cropData.height || metadata.height) * (settings.percentage / 100))} px
            </span>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: SOCIAL MEDIA PRESETS */}
      {activeTab === 'preset' && (
        <div className="space-y-4">
          <label className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider block">
            Social Media Platform Presets
          </label>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {SOCIAL_PRESETS.map((preset) => {
              const getIconColor = (p: string) => {
                switch (p) {
                  case 'instagram': return 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white';
                  case 'facebook': return 'bg-[#1877F2] text-white';
                  case 'twitter': return 'bg-black text-white';
                  case 'youtube': return 'bg-[#FF0000] text-white';
                  case 'linkedin': return 'bg-[#0A66C2] text-white';
                  case 'web': return 'bg-[#0284C7] text-white';
                  default: return 'bg-zinc-800 text-white';
                }
              };

              const isSelected = settings.targetWidth === preset.width && settings.targetHeight === preset.height;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'bg-black text-white border-black font-bold shadow-md'
                      : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${getIconColor(preset.platform)}`}>
                      <PlatformIcon platform={preset.platform} />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.name}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {preset.width} x {preset.height} px
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Background Fill */}
          <div className="pt-3 border-t border-zinc-200 space-y-2">
            <label className="text-xs font-extrabold text-zinc-500 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-slate-900" />
              Background Fill (Letterbox Padding)
            </label>
            <div className="flex items-center gap-2">
              {[
                { name: 'Transparent', value: 'transparent' },
                { name: 'White', value: '#ffffff' },
                { name: 'Black', value: '#000000' },
                { name: 'Slate', value: '#0f172a' },
              ].map((bg) => (
                <button
                  key={bg.name}
                  type="button"
                  onClick={() => onUpdateSettings({ fillColor: bg.value })}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl border ${
                    settings.fillColor === bg.value
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-black'
                  }`}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: LIVE IMAGE ADJUSTMENTS */}
      {activeTab === 'adjust' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
            <label className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block font-sans">
              Color &amp; Filter Sliders
            </label>
            <button
              type="button"
              onClick={() => onUpdateSettings({
                adjustments: { brightness: 100, contrast: 100, saturation: 100, grayscale: 0, blur: 0 }
              })}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-600 hover:text-black transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          <div className="space-y-3.5">
            {/* Brightness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Brightness</span>
                <span className="font-mono text-[11px] font-bold">{settings.adjustments?.brightness ?? 100}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={settings.adjustments?.brightness ?? 100}
                onChange={(e) => onUpdateSettings({
                  adjustments: {
                    brightness: Number(e.target.value),
                    contrast: settings.adjustments?.contrast ?? 100,
                    saturation: settings.adjustments?.saturation ?? 100,
                    grayscale: settings.adjustments?.grayscale ?? 0,
                    blur: settings.adjustments?.blur ?? 0,
                  }
                })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Contrast</span>
                <span className="font-mono text-[11px] font-bold">{settings.adjustments?.contrast ?? 100}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={settings.adjustments?.contrast ?? 100}
                onChange={(e) => onUpdateSettings({
                  adjustments: {
                    brightness: settings.adjustments?.brightness ?? 100,
                    contrast: Number(e.target.value),
                    saturation: settings.adjustments?.saturation ?? 100,
                    grayscale: settings.adjustments?.grayscale ?? 0,
                    blur: settings.adjustments?.blur ?? 0,
                  }
                })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Saturation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Saturation</span>
                <span className="font-mono text-[11px] font-bold">{settings.adjustments?.saturation ?? 100}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={settings.adjustments?.saturation ?? 100}
                onChange={(e) => onUpdateSettings({
                  adjustments: {
                    brightness: settings.adjustments?.brightness ?? 100,
                    contrast: settings.adjustments?.contrast ?? 100,
                    saturation: Number(e.target.value),
                    grayscale: settings.adjustments?.grayscale ?? 0,
                    blur: settings.adjustments?.blur ?? 0,
                  }
                })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Grayscale */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Grayscale (B&amp;W)</span>
                <span className="font-mono text-[11px] font-bold">{settings.adjustments?.grayscale ?? 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.adjustments?.grayscale ?? 0}
                onChange={(e) => onUpdateSettings({
                  adjustments: {
                    brightness: settings.adjustments?.brightness ?? 100,
                    contrast: settings.adjustments?.contrast ?? 100,
                    saturation: settings.adjustments?.saturation ?? 100,
                    grayscale: Number(e.target.value),
                    blur: settings.adjustments?.blur ?? 0,
                  }
                })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Blur */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Blur</span>
                <span className="font-mono text-[11px] font-bold">{settings.adjustments?.blur ?? 0} px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={settings.adjustments?.blur ?? 0}
                onChange={(e) => onUpdateSettings({
                  adjustments: {
                    brightness: settings.adjustments?.brightness ?? 100,
                    contrast: settings.adjustments?.contrast ?? 100,
                    saturation: settings.adjustments?.saturation ?? 100,
                    grayscale: settings.adjustments?.grayscale ?? 0,
                    blur: Number(e.target.value),
                  }
                })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
        </div>
      )}

      {/* EXPORT SETTINGS & TARGET FILE SIZE */}
      <div className="pt-4 border-t border-zinc-200 space-y-4">
        <label className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider block">
          Export Settings
        </label>

        {/* Output Format */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { fmt: 'webp', label: 'WEBP' },
            { fmt: 'jpeg', label: 'JPG' },
            { fmt: 'png', label: 'PNG' },
            { fmt: 'avif', label: 'AVIF' },
          ].map((f) => (
            <button
              key={f.fmt}
              type="button"
              onClick={() => onUpdateSettings({ outputFormat: f.fmt as OutputFormat })}
              className={`py-2 text-xs font-black font-mono rounded-xl border transition-all ${
                settings.outputFormat === f.fmt
                  ? 'bg-black border-black text-white shadow-sm'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Quality Slider */}
        {settings.outputFormat !== 'png' && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-zinc-500">
              <span>Quality ({settings.quality}%)</span>
              <span className="font-mono text-slate-900 font-bold">
                {settings.quality > 80 ? 'High' : settings.quality > 50 ? 'Medium' : 'Low'}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={settings.quality}
              onChange={(e) => onUpdateSettings({ quality: parseInt(e.target.value) })}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>
        )}

        {/* Target File Size in KB */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-900" />
              Target File Size (Max KB)
            </label>
            <span className="text-[10px] text-zinc-400 font-mono">Optional</span>
          </div>
          <input
            type="number"
            min={1}
            placeholder="e.g. 15 (for <15 KB target)"
            value={settings.targetSizeKb || ''}
            onChange={(e) =>
              onUpdateSettings({
                targetSizeKb: e.target.value ? Math.max(1, parseInt(e.target.value)) : null,
              })
            }
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-black font-mono placeholder:text-zinc-400 font-bold"
          />

          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {[10, 20, 50, 100, 200].map((kb) => (
              <button
                key={kb}
                type="button"
                onClick={() => onUpdateSettings({ targetSizeKb: kb })}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                  settings.targetSizeKb === kb
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-black hover:bg-zinc-100'
                }`}
              >
                &lt;{kb} KB
              </button>
            ))}
            {settings.targetSizeKb !== null && (
              <button
                type="button"
                onClick={() => onUpdateSettings({ targetSizeKb: null })}
                className="px-2 py-1 text-[10px] font-bold text-rose-600 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AD BANNER SLOT */}
      <AdBanner slot="sidebar-rect-300" format="rectangle" label="Advertisement" />

      {/* ACTION CTA BUTTON */}
      <button
        type="button"
        onClick={onExecuteProcess}
        disabled={isProcessing}
        className="w-full py-4 px-6 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer uppercase tracking-wider"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing Image...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5 text-white" />
            <span>Crop &amp; Download Image</span>
          </>
        )}
      </button>
    </div>
  );
}
