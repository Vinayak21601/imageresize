import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function logImageOperation(data: {
  originalName: string;
  inputFormat: string;
  outputFormat: string;
  originalWidth: number;
  originalHeight: number;
  finalWidth: number;
  finalHeight: number;
  unit: string;
  originalSizeBytes: number;
  finalSizeBytes: number;
  targetSizeKb?: number | null;
  mode: string;
}) {
  try {
    await prisma.imageOperation.create({
      data: {
        originalName: data.originalName,
        inputFormat: data.inputFormat,
        outputFormat: data.outputFormat,
        originalWidth: Math.round(data.originalWidth),
        originalHeight: Math.round(data.originalHeight),
        finalWidth: Math.round(data.finalWidth),
        finalHeight: Math.round(data.finalHeight),
        unit: data.unit || 'px',
        originalSizeBytes: data.originalSizeBytes,
        finalSizeBytes: data.finalSizeBytes,
        targetSizeKb: data.targetSizeKb ? Math.round(data.targetSizeKb) : null,
        mode: data.mode,
      },
    });
  } catch (error) {
    // If MySQL connection fails or DB is not reachable, log warning without breaking image processing
    console.warn('[Database Log Notice] MySQL DB unreachable or pending migration:', error);
  }
}
