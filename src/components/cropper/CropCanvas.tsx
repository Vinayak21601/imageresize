'use client';

import React, { useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical, ZoomIn, ZoomOut, RefreshCw, ImagePlus } from 'lucide-react';
import { CropData, ImageAdjustments } from '@/types/image';

export interface ReactCropperElement extends HTMLImageElement {
  cropper: Cropper;
}

interface CropCanvasProps {
  imageSrc: string;
  aspectRatio: number | null;
  cropShape?: 'rectangle' | 'circle';
  cornerRadius?: number;
  adjustments?: ImageAdjustments;
  onCropChange: (data: CropData) => void;
  onCropperReady?: (cropper: Cropper) => void;
  onChangeImage?: () => void;
}

export function CropCanvas({ imageSrc, aspectRatio, cropShape = 'rectangle', cornerRadius = 0, adjustments, onCropChange, onCropperReady, onChangeImage }: CropCanvasProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const filterStyle = adjustments ? {
    filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) grayscale(${adjustments.grayscale}%) blur(${adjustments.blur}px)`
  } : undefined;

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      if (cropShape === 'circle') {
        cropper.setAspectRatio(1);
      } else if (aspectRatio === null) {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(aspectRatio);
      }
    }
  }, [aspectRatio, cropShape]);

  const handleCropEvent = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    if (onCropperReady) {
      onCropperReady(cropper);
    }

    const data = cropper.getData(true);
    onCropChange({
      x: Math.round(data.x),
      y: Math.round(data.y),
      width: Math.round(data.width),
      height: Math.round(data.height),
      rotate: data.rotate,
      scaleX: data.scaleX,
      scaleY: data.scaleY,
    });
  };

  const handleRotateLeft = () => {
    cropperRef.current?.cropper.rotate(-90);
  };

  const handleRotateRight = () => {
    cropperRef.current?.cropper.rotate(90);
  };

  const handleFlipH = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const data = cropper.getData();
      cropper.scaleX(data.scaleX === -1 ? 1 : -1);
    }
  };

  const handleFlipV = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const data = cropper.getData();
      cropper.scaleY(data.scaleY === -1 ? 1 : -1);
    }
  };

  const handleZoomIn = () => {
    cropperRef.current?.cropper.zoom(0.1);
  };

  const handleZoomOut = () => {
    cropperRef.current?.cropper.zoom(-0.1);
  };

  const handleReset = () => {
    cropperRef.current?.cropper.reset();
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-3xl border border-zinc-200/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      {/* Targeted CSS for Live Image Adjustments */}
      {adjustments && (
        <style font-sans="true">{`
          .cropper-container .cropper-canvas img,
          .cropper-container .cropper-view-box img {
            filter: brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) grayscale(${adjustments.grayscale}%) blur(${adjustments.blur}px) !important;
            transition: filter 0.15s ease;
          }
        `}</style>
      )}

      {/* Targeted CSS for Live Corner Radius */}
      {cornerRadius > 0 && cropShape !== 'circle' && (
        <style>{`
          .cropper-view-box, .cropper-face {
            border-radius: ${Math.min(cornerRadius, 50)}px !important;
          }
        `}</style>
      )}

      {/* Canvas Workspace Stage */}
      <div 
        className={`relative w-full h-[540px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-zinc-200/80 shadow-inner ${cropShape === 'circle' ? 'cropper-circle-mask' : ''}`}
      >
        <Cropper
          ref={cropperRef}
          src={imageSrc}
          style={{ height: '100%', width: '100%' }}
          initialAspectRatio={cropShape === 'circle' ? 1 : (aspectRatio || NaN)}
          guides={cropShape !== 'circle'}
          viewMode={1}
          dragMode="none"
          toggleDragModeOnDblclick={false}
          cropBoxMovable={true}
          cropBoxResizable={true}
          minCropBoxHeight={20}
          minCropBoxWidth={20}
          background={true}
          responsive={true}
          autoCropArea={0.85}
          checkOrientation={false}
          zoomOnWheel={false}
          cropend={handleCropEvent}
          ready={handleCropEvent}
          zoom={handleCropEvent}
        />
      </div>

      {/* Canvas Controls Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRotateLeft}
            title="Rotate Left 90°"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            90° Left
          </button>
          
          <button
            type="button"
            onClick={handleRotateRight}
            title="Rotate Right 90°"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            90° Right
          </button>

          <div className="h-4 w-px bg-zinc-200 mx-1" />

          <button
            type="button"
            onClick={handleFlipH}
            title="Flip Horizontal"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
            Flip H
          </button>

          <button
            type="button"
            onClick={handleFlipV}
            title="Flip Vertical"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FlipVertical className="w-3.5 h-3.5" />
            Flip V
          </button>

          {onChangeImage && (
            <>
              <div className="h-4 w-px bg-zinc-200 mx-1 hidden sm:block" />
              <button
                type="button"
                onClick={onChangeImage}
                title="Upload or select a different image"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer group"
              >
                <ImagePlus className="w-3.5 h-3.5 text-[#0284C7] group-hover:text-white transition-colors" />
                Change Image
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-2.5 text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-2.5 text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset Canvas"
            className="p-2.5 text-slate-700 bg-white hover:bg-slate-900 hover:text-white border border-zinc-200/80 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
