import { NextRequest, NextResponse } from 'next/server';
import { processImageWithSharp } from '@/lib/sharp';
import { logImageOperation } from '@/lib/db';
import { OutputFormat } from '@/types/image';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const settingsJson = formData.get('settings') as string | null;
    const cropJson = formData.get('crop') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File size exceeds the 10MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    const originalSizeBytes = inputBuffer.length;

    const settings = settingsJson ? JSON.parse(settingsJson) : {};
    const crop = cropJson ? JSON.parse(cropJson) : undefined;

    const outputFormat: OutputFormat = settings.outputFormat || 'webp';

    // Process image using Sharp engine
    const { buffer: outputBuffer, finalWidth, finalHeight } = await processImageWithSharp(inputBuffer, {
      crop: crop ? {
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      } : undefined,
      rotate: crop?.rotate || 0,
      flipH: crop?.scaleX === -1,
      flipV: crop?.scaleY === -1,
      targetWidth: settings.targetWidth,
      targetHeight: settings.targetHeight,
      fillColor: settings.fillColor,
      format: outputFormat,
      quality: settings.quality || 85,
      targetSizeKb: settings.targetSizeKb,
      cropShape: settings.cropShape,
      adjustments: settings.adjustments,
    });

    const finalSizeBytes = outputBuffer.length;

    // Log to MySQL database (non-blocking)
    logImageOperation({
      originalName: file.name || 'image',
      inputFormat: file.type.split('/')[1] || 'jpeg',
      outputFormat,
      originalWidth: settings.originalWidth || finalWidth,
      originalHeight: settings.originalHeight || finalHeight,
      finalWidth,
      finalHeight,
      unit: settings.unit || 'px',
      originalSizeBytes,
      finalSizeBytes,
      targetSizeKb: settings.targetSizeKb,
      mode: settings.mode || 'crop',
    }).catch(() => {});

    // Return binary file stream with download header
    const fileExtension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
    const downloadFilename = `cropped-${Date.now()}.${fileExtension}`;

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        'Content-Type': `image/${outputFormat}`,
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
        'Content-Length': outputBuffer.length.toString(),
        'X-Final-Width': finalWidth.toString(),
        'X-Final-Height': finalHeight.toString(),
        'X-Final-Size': finalSizeBytes.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error processing image crop route:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process image' },
      { status: 500 }
    );
  }
}
