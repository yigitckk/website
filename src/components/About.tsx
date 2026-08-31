// src/components/About.tsx
import React from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>

      {/* Hero */}
      <Box sx={{ mb: theme.spacing(5) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Chip
            label="SOVEREIGN_ENGINEER // PAU_IE_2026"
            size="small"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              fontWeight: 600,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(0, 123, 255, 0.08)',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}33`,
            }}
          />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace' }}>
            yigitc.dev
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.5rem' },
            color: theme.palette.text.primary,
            mb: theme.spacing(1),
          }}
        >
          Yiğit Çelik
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 400,
            mb: theme.spacing(3),
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          Sovereign Systems & AI Engineer · Product Builder
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            lineHeight: 1.9,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            maxWidth: '680px',
            mb: theme.spacing(2),
          }}
        >
          I build autonomous AI agent memory systems, local-first cinema engines, and sovereign backend infrastructure.
          Industrial engineering background synthesizing Endüstri 5.0 systems thinking with high-taste visual aesthetic frameworks.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.9,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            maxWidth: '680px',
            mb: theme.spacing(4),
          }}
        >
          I'm building toward a life where engineering skill, indie products, and genuine
          curiosity all compound together. Global in scope. Specific in taste.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
          <Button
            variant="contained"
            href="https://github.com/yigitckk"
            target="_blank"
            rel="noopener"
            sx={{ fontWeight: 600 }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            href="https://github.com/yigitckk/aboutMe/blob/main/YiğitÇelikcv.pdf"
            target="_blank"
            rel="noopener"
          >
            CV
          </Button>
        </Stack>
      </Box>

      {/* Stack */}
      <Box sx={{ mb: theme.spacing(5) }}>
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(1.5), display: 'block' }}
        >
          Current Stack
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {['Python', 'FastAPI', 'PyTorch', 'C++', 'PostgreSQL', 'TypeScript', 'React', 'Linux', 'Docker', 'Graph RAG'].map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Path */}
      <Box>
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(2), display: 'block' }}
        >
          Path
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1.5) }}>
          {[
            { label: 'Backend Engineering', status: 'active', note: 'Auth · Job Queue · Event Log' },
            { label: 'Data Engineering', status: 'next', note: 'Pipelines · dbt · Airflow' },
            { label: 'ML Engineering', status: 'later', note: 'Feature stores · Model serving · not notebooks' },
          ].map(({ label, status, note }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1.5) }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    status === 'active'
                      ? theme.palette.primary.main
                      : status === 'next'
                      ? theme.palette.text.secondary
                      : theme.palette.divider,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: status === 'active' ? 600 : 400 }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                — {note}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default About;
