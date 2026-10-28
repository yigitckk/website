// src/pages/ProjectsPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Projects from '../components/Projects';
import Seo from '../components/Seo';
import { projects, SITE_URL } from '../data/projects';

const ProjectsPage: React.FC = () => {
  const theme = useTheme();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects — Yiğit Çelik',
    url: `${SITE_URL}/projects`,
    hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE_URL}/projects/${p.slug}` })),
  };
  return (
    <Box sx={{ py: theme.spacing(4) }}>
      <Seo
        title="Projects — Yiğit Çelik"
        description="Sign design & parametric CAD, applied AI / decision science and backend systems projects by Yiğit Çelik."
        path="/projects"
        jsonLd={jsonLd}
      />
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem' }, mb: 1 }}>
        Projects
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
        3D sign design, applied AI &amp; decision science, and backend systems — each with a write-up of the problem, the approach
        and the result.
      </Typography>
      <Projects />
    </Box>
  );
};

export default ProjectsPage;
