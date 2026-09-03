import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  try {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });
    }
    return globalForPrisma.prisma;
  } catch (err) {
    console.warn('[Prisma Init Warning] Failed to initialize PrismaClient:', err);
    return null;
  }
}

export const prisma = getPrismaClient();

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
    const client = getPrismaClient();
    if (!client) return;

    await client.imageOperation.create({
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
    console.warn('[Database Log Notice] MySQL DB unreachable or pending migration:', error);
  }
}
