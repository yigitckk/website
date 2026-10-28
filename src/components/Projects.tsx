// src/components/Projects.tsx
import React, { useMemo } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Chip, Stack, Tabs, Tab, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { categories, projects, getCategory, Project } from '../data/projects';

const ALL = 'all';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const theme = useTheme();
  const cat = getCategory(project.category);
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        height: '100%',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.08)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/projects/${project.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', backgroundColor: '#0d0f14' }}>
          <Box
            component="img"
            src={project.cover}
            alt={project.coverAlt}
            loading="lazy"
            decoding="async"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
        <CardContent sx={{ p: 2, flexGrow: 1, '&:last-child': { pb: 2 } }}>
          {cat && (
            <Typography
              variant="caption"
              sx={{ color: theme.palette.primary.main, fontFamily: 'monospace', fontWeight: 600, display: 'block', mb: 0.5 }}
            >
              {cat.label}
            </Typography>
          )}
          <Typography component="h3" sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35, color: theme.palette.text.primary, mb: 0.75 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6, mb: 1.5, fontSize: '0.83rem' }}>
            {project.summary}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {project.tags.slice(0, 4).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.secondary,
                  fontSize: '0.68rem',
                  height: 22,
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface ProjectsProps {
  /** Home-page variant: section heading + link to /projects. */
  compact?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ compact = false }) => {
  const theme = useTheme();
  const [params, setParams] = useSearchParams();
  const requested = params.get('category') || ALL;
  const active = requested === ALL || getCategory(requested) ? requested : ALL;

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const onChange = (_: React.SyntheticEvent, value: string) => {
    const next = new URLSearchParams(params);
    if (value === ALL) next.delete('category');
    else next.set('category', value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const activeCat = active === ALL ? undefined : getCategory(active);

  return (
    <Box sx={{ width: '100%', mb: theme.spacing(6) }}>
      {compact && (
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: theme.spacing(1) }}>
          <Typography variant="overline" sx={{ color: theme.palette.text.secondary, letterSpacing: 2, fontWeight: 700 }}>
            Projects
          </Typography>
          <MuiLink component={RouterLink} to="/projects" sx={{ fontSize: '0.8rem', color: theme.palette.primary.main, fontFamily: 'monospace' }}>
            All projects ({projects.length}) →
          </MuiLink>
        </Box>
      )}

      <Tabs
        value={active}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Project categories"
        sx={{
          minHeight: 40,
          mb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          '& .MuiTab-root': { textTransform: 'none', minHeight: 40, fontSize: '0.82rem', px: 1.5, color: theme.palette.text.secondary },
          '& .Mui-selected': { color: `${theme.palette.text.primary} !important`, fontWeight: 600 },
        }}
      >
        <Tab value={ALL} label={`All (${projects.length})`} />
        {categories.map((c) => (
          <Tab key={c.slug} value={c.slug} label={`${c.label} (${projects.filter((p) => p.category === c.slug).length})`} />
        ))}
      </Tabs>

      {activeCat && (
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          {activeCat.description}
        </Typography>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
