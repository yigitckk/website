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
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.4rem' },
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
          Backend Engineer · Product Builder
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
          I build backend systems from scratch and ship products I actually want to exist.
          Currently working through a structured engineering path — auth services, job queues,
          event stores — while learning how real production systems behave under load.
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
          {['Python', 'FastAPI', 'PostgreSQL', 'TypeScript', 'React', 'Linux', 'nginx', 'Docker'].map((tech) => (
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
