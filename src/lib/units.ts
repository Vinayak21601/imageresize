import { UnitType } from '@/types/image';

/**
 * Convert value from given unit to Pixels
 */
export function convertToPixels(value: number, unit: UnitType, dpi: number = 96): number {
  if (!value || isNaN(value)) return 0;
  switch (unit) {
    case 'in':
      return value * dpi;
    case 'cm':
      return (value / 2.54) * dpi;
    case 'mm':
      return (value / 25.4) * dpi;
    case 'px':
    default:
      return value;
  }
}

/**
 * Convert value from Pixels to target unit
 */
export function convertFromPixels(pixels: number, unit: UnitType, dpi: number = 96): number {
  if (!pixels || isNaN(pixels)) return 0;
  switch (unit) {
    case 'in':
      return parseFloat((pixels / dpi).toFixed(2));
    case 'cm':
      return parseFloat(((pixels / dpi) * 2.54).toFixed(2));
    case 'mm':
      return parseFloat(((pixels / dpi) * 25.4).toFixed(1));
    case 'px':
    default:
      return Math.round(pixels);
  }
}

/**
 * Format bytes to readable human string (KB / MB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
