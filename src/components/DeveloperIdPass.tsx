// src/components/DeveloperIdPass.tsx
import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DeveloperIdPass: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        p: 3,
        mb: 4,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.37)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: `0 0 20px ${theme.palette.primary.main}66`,
              fontFamily: 'monospace',
            }}
          >
            YÇ
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Yiğit Çelik
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace' }}>
              Sovereign Systems & AI Engineer
            </Typography>
          </Box>
        </Stack>

        <Chip
          label="VERIFIED DEV"
          size="small"
          sx={{
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            fontWeight: 700,
            fontSize: '0.7rem',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justify-content: 'space-between',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          color: theme.palette.text.secondary,
          pt: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <span>DOMAIN: <strong>yigitc.dev</strong></span>
        <span>PAU IND ENG · 2026</span>
        <span>LOC: <strong>TURKEY</strong></span>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 1.2,
          borderRadius: 1.5,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.04)',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: theme.palette.text.secondary,
          wordBreak: 'break-all',
        }}
      >
        PGP FINGERPRINT: 4F92 B7A1 9902 C118 8201 :: SOVEREIGN_KEY_VERIFIED
      </Box>
    </Box>
  );
};

export default DeveloperIdPass;
