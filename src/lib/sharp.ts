import sharp from 'sharp';
import { OutputFormat, ImageAdjustments } from '@/types/image';

export interface ProcessImageOptions {
  crop?: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
  targetWidth?: number;
  targetHeight?: number;
  fillColor?: string; // hex color e.g. '#ffffff' or 'transparent'
  format: OutputFormat;
  quality?: number; // 1 - 100
  targetSizeKb?: number | null;
  cropShape?: 'rectangle' | 'circle';
  cornerRadius?: number;
  adjustments?: ImageAdjustments;
}

/**
 * Process image buffer on Node.js server using Sharp engine
 */
export async function processImageWithSharp(
  inputBuffer: Buffer,
  options: ProcessImageOptions
): Promise<{ buffer: Buffer; finalWidth: number; finalHeight: number; format: OutputFormat }> {
  let pipeline = sharp(inputBuffer);

  // 1. Rotation and Flips
  if (options.rotate && options.rotate !== 0) {
    pipeline = pipeline.rotate(options.rotate);
  }
  if (options.flipH) {
    pipeline = pipeline.flop();
  }
  if (options.flipV) {
    pipeline = pipeline.flip();
  }

  // Get metadata after orientation transforms
  const metaAfterTransform = await pipeline.metadata();
  const currentWidth = metaAfterTransform.width || 800;
  const currentHeight = metaAfterTransform.height || 600;

  // 2. Crop selection
  if (options.crop) {
    const left = Math.max(0, Math.min(Math.round(options.crop.left), currentWidth - 1));
    const top = Math.max(0, Math.min(Math.round(options.crop.top), currentHeight - 1));
    const width = Math.max(1, Math.min(Math.round(options.crop.width), currentWidth - left));
    const height = Math.max(1, Math.min(Math.round(options.crop.height), currentHeight - top));

    pipeline = pipeline.extract({ left, top, width, height });
  }

  // 3. Resizing & Background Fill (Letterbox option)
  if (options.targetWidth || options.targetHeight) {
    const targetW = options.targetWidth ? Math.round(options.targetWidth) : undefined;
    const targetH = options.targetHeight ? Math.round(options.targetHeight) : undefined;

    if (options.fillColor && options.fillColor !== 'transparent') {
      pipeline = pipeline.resize(targetW, targetH, {
        fit: 'contain',
        background: options.fillColor,
      });
    } else {
      pipeline = pipeline.resize(targetW, targetH, {
        fit: 'inside',
        withoutEnlargement: false,
      });
    }
  }

  // 3.5 Circular or Rounded Corner Mask
  if (options.cropShape === 'circle') {
    const intermediateBuffer = await pipeline.png().toBuffer();
    const meta = await sharp(intermediateBuffer).metadata();
    const w = meta.width || 500;
    const h = meta.height || 500;
    const r = Math.min(w, h) / 2;
    const circleSvg = Buffer.from(
      `<svg width="${w}" height="${h}"><circle cx="${w / 2}" cy="${h / 2}" r="${r}" fill="#000"/></svg>`
    );
    pipeline = sharp(intermediateBuffer).composite([{ input: circleSvg, blend: 'dest-in' }]);
  } else if (options.cornerRadius && options.cornerRadius > 0) {
    const intermediateBuffer = await pipeline.png().toBuffer();
    const meta = await sharp(intermediateBuffer).metadata();
    const w = meta.width || 500;
    const h = meta.height || 500;
    const rx = Math.min(options.cornerRadius, Math.min(w, h) / 2);
    const roundRectSvg = Buffer.from(
      `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="#000"/></svg>`
    );
    pipeline = sharp(intermediateBuffer).composite([{ input: roundRectSvg, blend: 'dest-in' }]);
  }

  // 3.8 Image Adjustments (Brightness, Contrast, Saturation, Grayscale, Blur)
  if (options.adjustments) {
    const { brightness = 100, saturation = 100, grayscale = 0, blur = 0 } = options.adjustments;
    if (brightness !== 100 || saturation !== 100) {
      pipeline = pipeline.modulate({
        brightness: brightness / 100,
        saturation: saturation / 100,
      });
    }
    if (grayscale > 0) {
      pipeline = pipeline.grayscale();
    }
    if (blur > 0) {
      pipeline = pipeline.blur(Math.min(10, Math.max(0.3, blur)));
    }
  }

  // Format mapping
  const format = options.format || 'webp';
  let initialQuality = Math.min(100, Math.max(1, options.quality || 85));

  // Helper to format output at given quality
  const renderBufferAtQuality = async (q: number): Promise<Buffer> => {
    let instance = pipeline.clone();
    switch (format) {
      case 'jpeg':
        return await instance.jpeg({ quality: q, mozjpeg: true }).toBuffer();
      case 'webp':
        return await instance.webp({ quality: q, effort: 4 }).toBuffer();
      case 'avif':
        return await instance.avif({ quality: q, effort: 4 }).toBuffer();
      case 'png':
        // PNG is lossless, compression level 1-9
        const pngCompression = Math.max(1, Math.min(9, Math.floor((100 - q) / 10)));
        return await instance.png({ compressionLevel: pngCompression }).toBuffer();
      default:
        return await instance.webp({ quality: q }).toBuffer();
    }
  };

  let finalBuffer = await renderBufferAtQuality(initialQuality);

  // 4. Intelligent Target File Size Optimization (Quality + Dimensional Downscaling)
  if (options.targetSizeKb && options.targetSizeKb > 0) {
    const targetSizeBytes = options.targetSizeKb * 1024;

    if (finalBuffer.length > targetSizeBytes) {
      let bestBuffer: Buffer | null = null;
      let scale = 1.0;

      // Iteratively downscale dimensions if quality reduction alone cannot fit small target size (e.g. <25KB)
      while (scale >= 0.05) {
        const origW = metaAfterTransform.width || options.targetWidth || 800;
        const origH = metaAfterTransform.height || options.targetHeight || 600;

        let scaledPipeline = pipeline.clone();
        if (scale < 1.0) {
          const sW = Math.max(16, Math.round(origW * scale));
          const sH = Math.max(16, Math.round(origH * scale));
          scaledPipeline = scaledPipeline.resize(sW, sH, { fit: 'cover' });
        }

        const renderScaledAtQuality = async (q: number): Promise<Buffer> => {
          let inst = scaledPipeline.clone();
          switch (format) {
            case 'jpeg':
              return await inst.jpeg({ quality: q, mozjpeg: true }).toBuffer();
            case 'webp':
              return await inst.webp({ quality: q, effort: 4 }).toBuffer();
            case 'avif':
              return await inst.avif({ quality: q, effort: 4 }).toBuffer();
            case 'png':
              const pngComp = Math.max(1, Math.min(9, Math.floor((100 - q) / 10)));
              return await inst.png({ compressionLevel: pngComp, palette: true, quality: q }).toBuffer();
            default:
              return await inst.webp({ quality: q }).toBuffer();
          }
        };

        // Binary search quality from 1 to 95
        let low = 1;
        let high = Math.min(95, initialQuality);
        let localBest: Buffer | null = null;

        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const testBuffer = await renderScaledAtQuality(mid);

          if (testBuffer.length <= targetSizeBytes) {
            localBest = testBuffer;
            low = mid + 1; // Try higher quality under limit
          } else {
            high = mid - 1; // Lower quality
          }
        }

        if (!localBest) {
          // Explicitly check lowest quality (1) at current scale
          const minQBuf = await renderScaledAtQuality(1);
          if (minQBuf.length <= targetSizeBytes) {
            localBest = minQBuf;
          }
        }

        if (localBest) {
          bestBuffer = localBest;
          break; // Found optimal buffer strictly under targetSizeBytes
        }

        // Reduce dimensions by 15% and retry search
        scale -= 0.15;
      }

      if (bestBuffer) {
        finalBuffer = bestBuffer;
      }
    }
  }

  // Get final output dimensions
  const finalMeta = await sharp(finalBuffer).metadata();

  return {
    buffer: finalBuffer,
    finalWidth: finalMeta.width || options.targetWidth || 800,
    finalHeight: finalMeta.height || options.targetHeight || 600,
    format,
  };
}
