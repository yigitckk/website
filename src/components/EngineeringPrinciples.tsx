// src/components/EngineeringPrinciples.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const principles = [
  {
    title: '1. Çıkış Kodu Doğrular (Exit Code Verifies)',
    desc: '"Kuruldu" iddiası yetmez; aracın kendi çıkış kodu ve zaman damgası doğrulamalıdır.',
  },
  {
    title: '2. Silme, Dondur (Freeze, Don\'t Delete)',
    desc: 'Yön değiştiren kod parked/ klasörüne kaldırılır; karar ucuza alınır.',
  },
  {
    title: '3. Ölüm Şartı Olmayan Plan Dilektir',
    desc: 'Her büyüme aşaması neyin onu öldüreceğini en baştan tanımlar.',
  },
];

const EngineeringPrinciples: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: 2, display: 'block' }}
      >
        Mühendislik İradem & Çalışma İlkelerim
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {principles.map((p) => (
          <Box
            key={p.title}
            sx={{
              pl: 2,
              borderLeft: `3px solid ${theme.palette.primary.main}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {p.title}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {p.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EngineeringPrinciples;
