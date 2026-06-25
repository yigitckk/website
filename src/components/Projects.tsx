// src/components/Projects.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Project {
  name: string;
  description: string;
  tags: string[];
  url?: string;
  status: 'live' | 'building' | 'done';
}

const projects: Project[] = [
  {
    name: 'plotpoint.space',
    description:
      'Jackbox-style multiplayer film party game using real Letterboxd data. 8 game modes including Classic Movie Roulette, Cinema Dilemma, Hot Takes, and Blind Ranking. Built with FastAPI + React Native, deployed on VPS.',
    tags: ['FastAPI', 'React Native', 'WebSocket', 'TypeScript'],
    url: 'https://plotpoint.space',
    status: 'live',
  },
  {
    name: 'Auth Service',
    description:
      'Production-grade standalone auth system. JWT issue/refresh/revoke, rate limiting, session management, Testcontainers test suite, VPS deployed with systemd + nginx + TLS.',
    tags: ['FastAPI', 'PostgreSQL', 'JWT', 'Alembic'],
    status: 'done',
  },
  {
    name: 'Async Job Queue',
    description:
      'PostgreSQL-backed async task queue with no Redis dependency. Push/pop/retry logic, dead-letter queue, structured logging. Built from scratch to understand queue semantics.',
    tags: ['FastAPI', 'PostgreSQL', 'Python'],
    status: 'done',
  },
  {
    name: 'Append-Only Event Log',
    description:
      'Event store with replay, snapshot, and idempotency. The foundation for event sourcing patterns — and for any stateful product that needs audit trails or time-travel.',
    tags: ['FastAPI', 'PostgreSQL', 'Event Sourcing'],
    status: 'building',
  },
];

const statusColors: Record<Project['status'], string> = {
  live: '#22c55e',
  building: '#f59e0b',
  done: '#64748b',
};

const statusLabels: Record<Project['status'], string> = {
  live: 'Live',
  building: 'Building',
  done: 'Done',
};

const Projects: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mb: theme.spacing(6) }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(2), display: 'block' }}
      >
        Projects
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
        {projects.map((project) => (
          <Card
            key={project.name}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <CardContent sx={{ p: theme.spacing(2.5), '&:last-child': { pb: theme.spacing(2.5) } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1.5), mb: theme.spacing(1) }}>
                {project.url ? (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    sx={{ fontWeight: 700, fontSize: '1rem', color: theme.palette.text.primary }}
                  >
                    {project.name}
                  </Link>
                ) : (
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: theme.palette.text.primary }}>
                    {project.name}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: statusColors[project.status],
                    }}
                  />
                  <Typography variant="caption" sx={{ color: statusColors[project.status], fontWeight: 600 }}>
                    {statusLabels[project.status]}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, mb: theme.spacing(1.5) }}
              >
                {project.description}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.secondary,
                      fontSize: '0.7rem',
                      height: 22,
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
