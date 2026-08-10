export type UnitType = 'px' | 'in' | 'cm' | 'mm';

export type OutputFormat = 'webp' | 'jpeg' | 'png' | 'avif';

export type ResizeMode = 'crop' | 'size' | 'percentage' | 'preset';

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scaleX: number; // 1 or -1 for horizontal flip
  scaleY: number; // 1 or -1 for vertical flip
}

export interface ImageAdjustments {
  brightness: number;  // 0 - 200 (100 default)
  contrast: number;    // 0 - 200 (100 default)
  saturation: number;  // 0 - 200 (100 default)
  grayscale: number;   // 0 - 100 (0 default)
  blur: number;        // 0 - 10 (0 default)
}

export interface ResizeSettings {
  mode: ResizeMode;
  unit: UnitType;
  dpi: number; // 96 or 300
  targetWidth: number;
  targetHeight: number;
  percentage: number;
  lockAspectRatio: boolean;
  aspectRatio: number | null; // e.g. 1, 16/9, 4/3, or null for freeform
  fillColor: string; // Hex color or transparent for letterboxing
  outputFormat: OutputFormat;
  quality: number; // 1 - 100
  targetSizeKb: number | null; // Optional target compressed file size in KB
  cropShape?: 'rectangle' | 'circle';
  adjustments?: ImageAdjustments;
}

export interface SocialPreset {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'linkedin' | 'web';
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  description: string;
}

export interface ImageMetadata {
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  aspectRatio: number;
  previewUrl: string;
}

export interface ProcessedResult {
  downloadUrl: string;
  finalWidth: number;
  finalHeight: number;
  finalSize: number;
  format: OutputFormat;
}
