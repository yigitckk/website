// src/components/BlogCoverBanner.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface BlogCoverBannerProps {
  title: string;
  category?: string;
}

/**
 * BlogCoverBanner — Custom Cinematic 35mm & Türk Tamga Vector Cover Art Box.
 * Renders a high-taste, bespoke banner with aperture frame lines and geometric motifs.
 */
export const BlogCoverBanner: React.FC<BlogCoverBannerProps> = ({ title, category = 'Postmortem & Architecture' }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 200, sm: 260 },
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        mb: 4,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #161a23 0%, #0d0f14 50%, #1c1524 100%)'
          : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        textAlign: 'center',
      }}
    >
      {/* Background Vector Motif: Geometric Tamga & 35mm Aperture Grid Overlay */}
      <Box
        component="svg"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
        viewBox="0 0 800 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 35mm Aspect Ratio Grid Lines */}
        <line x1="40" y1="20" x2="40" y2="280" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="760" y1="20" x2="760" y2="280" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="40" x2="780" y2="40" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="260" x2="780" y2="260" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />

        {/* Central Geometric Tamga Emblem Vectors */}
        <polygon points="400,50 450,150 400,250 350,150" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="400" cy="150" r="70" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 6" />
        <circle cx="400" cy="150" r="110" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.2" />

        {/* Corner 35mm Frame Markers */}
        <path d="M 20 50 L 50 50 L 50 20" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 780 50 L 750 50 L 750 20" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 20 250 L 50 250 L 50 280" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 780 250 L 750 250 L 750 280" stroke="#f59e0b" strokeWidth="2" />
      </Box>

      {/* Content Layer */}
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'monospace',
          color: theme.palette.primary.main,
          letterSpacing: 2,
          fontWeight: 700,
          mb: 1.5,
          zIndex: 1,
        }}
      >
        ◆ yigitc.dev // {category.toUpperCase()}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          maxWidth: 600,
          lineHeight: 1.3,
          fontSize: { xs: '1.25rem', sm: '1.65rem' },
          zIndex: 1,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default BlogCoverBanner;
