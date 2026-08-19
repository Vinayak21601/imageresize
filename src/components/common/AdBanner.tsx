'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Google AdSense Banner Component
 * Designed with fixed container sizes to prevent Cumulative Layout Shift (CLS).
 * Renders a stylish developer placeholder when ad client ID is not configured.
 */
export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdBannerProps) {
  // AdSense hidden for now as requested
  return null;
}
