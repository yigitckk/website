// src/components/Experience.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const experiences = [
  {
    title: 'Research Scholar — Optimization Project',
    organization: 'TÜBİTAK 1001',
    date: 'Oct 2024 – Feb 2025',
    description:
      'Contributed to an academic operations research project. Responsibilities included recording and synthesizing meeting notes, learning how optimization solvers are applied to real problems, and participating in the research process end-to-end.',
  },
];

const Experience: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(3), display: 'block' }}
      >
        Experience
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(3) }}>
        {experiences.map((exp, i) => (
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
              <Box sx={{ width: 1, flexGrow: 1, backgroundColor: theme.palette.divider, mt: 1 }} />
            </Box>
            <Box sx={{ pb: theme.spacing(2) }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: theme.palette.text.primary }}>
                {exp.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: theme.spacing(1.5), mt: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                  {exp.organization}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {exp.date}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.75 }}>
                {exp.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
