// src/components/Education.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const educations = [
  {
    degree: 'Industrial Engineering & Management',
    institution: 'Pamukkale University',
    duration: '2022 – 2026',
    note: 'Python, MySQL, Linear Algebra, Calculus, Operations Research, Financial Optimization.',
  },
  {
    degree: 'Computer Science & Engineering Management (Exchange)',
    institution: 'Białystok University of Technology',
    duration: '2024 – 2025',
    note: 'Data Mining, Mathematical Statistics, IoT, OOP with C#, MATLAB.',
  },
];

const Education: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(3), display: 'block' }}
      >
        Education
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(3) }}>
        {educations.map((edu, i) => (
          <Box key={i} sx={{ display: 'flex', gap: theme.spacing(3) }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.6 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  flexShrink: 0,
                }}
              />
              {i < educations.length - 1 && (
                <Box sx={{ width: 1, flexGrow: 1, backgroundColor: theme.palette.divider, mt: 1 }} />
              )}
            </Box>
            <Box sx={{ pb: theme.spacing(2) }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: theme.palette.text.primary }}>
                {edu.degree}
              </Typography>
              <Box sx={{ display: 'flex', gap: theme.spacing(1.5), mt: 0.5, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                  {edu.institution}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {edu.duration}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                {edu.note}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Education;
