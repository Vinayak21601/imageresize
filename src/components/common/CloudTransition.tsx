'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface CloudLayer {
  id: number;
  x: number; // %
  y: number; // %
  scale: number;
  rotate: number;
  opacity: number;
  depth: number; // z-index / perspective depth
}

const INITIAL_CLOUDS: CloudLayer[] = [
  { id: 1, x: 20, y: 30, scale: 1.2, rotate: -5, opacity: 0.85, depth: 1 },
  { id: 2, x: 75, y: 25, scale: 1.5, rotate: 10, opacity: 0.9, depth: 2 },
  { id: 3, x: 15, y: 70, scale: 1.8, rotate: -8, opacity: 0.8, depth: 3 },
  { id: 4, x: 80, y: 65, scale: 1.4, rotate: 4, opacity: 0.85, depth: 2 },
  { id: 5, x: 50, y: 45, scale: 2.2, rotate: 0, opacity: 0.95, depth: 4 },
];

export function CloudTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // Only trigger transition on actual page changes (not on initial mount)
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // 600ms quick, crisp cinematic flythrough

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  if (!isTransitioning) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
      style={{
        perspective: '600px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* SKY BACKDROP FLASH (Gentle sky-blue atmosphere) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#548cb3]/40 via-[#8dc8e7]/30 to-white/40 backdrop-blur-[2px] animate-cloud-sky-flash" />

      {/* 3D PERSPECTIVE CLOUD WORLD */}
      <div className="relative w-full h-full preserve-3d">
        {INITIAL_CLOUDS.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute rounded-full pointer-events-none animate-cloud-flythrough"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              width: `${260 * cloud.scale}px`,
              height: `${140 * cloud.scale}px`,
              marginLeft: `-${130 * cloud.scale}px`,
              marginTop: `-${70 * cloud.scale}px`,
              opacity: cloud.opacity,
              transform: `rotate(${cloud.rotate}deg)`,
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 75%)',
              filter: 'blur(16px)',
              animationDelay: `${(cloud.depth - 1) * 40}ms`,
            }}
          />
        ))}

        {/* EXTRA AMBIENT FLUFFY DRIFT PUFFS */}
        <div
          className="absolute inset-0 bg-radial from-white/70 via-white/20 to-transparent animate-cloud-fog-puff"
          style={{ filter: 'blur(30px)' }}
        />
      </div>
    </div>
  );
}
