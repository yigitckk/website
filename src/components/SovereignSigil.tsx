// src/components/SovereignSigil.tsx
import React from 'react';
import { Box } from '@mui/material';

interface SovereignSigilProps {
  size?: number;
  color?: string;
}

/**
 * SovereignSigil — Bespoke YÇ Monogram & Damga Symbol.
 * Synthesizes Selçuklu 8-Pointed Star geometry, Turkish Tamga line art, 
 * and 35mm Cinema Aperture Frame lines.
 */
export const SovereignSigil: React.FC<SovereignSigilProps> = ({ size = 28, color = '#f59e0b' }) => {
  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ flexShrink: 0, display: 'block' }}
    >
      {/* Outer 35mm Aperture Frame & Geometric Ticks */}
      <rect x="2" y="2" width="36" height="36" rx="4" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
      
      {/* Corner Tamga Ticks */}
      <path d="M 2 10 L 8 10 M 10 2 L 10 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 38 10 L 32 10 M 30 2 L 30 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 2 30 L 8 30 M 10 38 L 10 32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 38 30 L 32 30 M 30 38 L 30 32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />

      {/* Central YÇ Monogram Motif */}
      {/* Y - Upper Arms & Stem */}
      <path d="M 12 12 L 20 20 L 28 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 20 20 L 20 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      
      {/* Ç - Crescent Arc & Dot */}
      <path d="M 25 22 C 27 24, 27 27, 24 29 C 21 31, 16 30, 15 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="32" r="1.2" fill={color} />
    </Box>
  );
};

export default SovereignSigil;
