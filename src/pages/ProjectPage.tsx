// src/pages/ProjectPage.tsx — blog-style detail page for one project
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Button, Chip, Stack, Link as MuiLink } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import Seo from '../components/Seo';
import { ProjectCard } from '../components/Projects';
import { getProject, getCategory, projects, SITE_URL, Project } from '../data/projects';

const SECTION_TITLES: [keyof Project['sections'], string][] = [
  ['problem', 'Problem'],
  ['approach', 'Approach'],
  ['result', 'Result'],
];

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const theme = useTheme();
  const project = getProject(slug);

  if (!project) {
    return (
      <Box sx={{ py: theme.spacing(8), textAlign: 'center' }}>
        <Seo title="Project not found — yigitc.tech" description="This project does not exist." path={`/projects/${slug ?? ''}`} />
        <Typography sx={{ color: theme.palette.text.secondary }}>Project not found.</Typography>
        <Button component={RouterLink} to="/projects" sx={{ mt: 2 }} variant="outlined">
          ← All projects
        </Button>
      </Box>
    );
  }

  const cat = getCategory(project.category);
  const isCode = project.links.some((l) => l.url.includes('github.com'));
  const url = `${SITE_URL}/projects/${project.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isCode ? 'SoftwareSourceCode' : 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.summary,
    url,
    image: `${SITE_URL}${project.ogImage || project.cover}`,
    keywords: project.tags.join(', '),
    genre: cat?.label,
    ...(project.date ? { dateCreated: project.date } : {}),
    author: { '@type': 'Person', name: 'Yiğit Çelik', url: SITE_URL },
    ...(isCode ? { codeRepository: project.links.find((l) => l.url.includes('github.com'))?.url } : {}),
  };

  const gallery = project.gallery.filter((g) => g.src !== project.cover);
  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 2);

  const mdSx = {
    color: theme.palette.text.secondary,
    lineHeight: 1.8,
    fontSize: '0.95rem',
    '& p': { mb: 1.5 },
    '& ul, & ol': { pl: 3, mb: 1.5 },
    '& li': { mb: 0.5 },
    '& strong': { color: theme.palette.text.primary },
    '& code': {
      fontFamily: 'monospace',
      fontSize: '0.85em',
      px: 0.5,
      borderRadius: 0.5,
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    },
    '& blockquote': {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      pl: 2,
      my: 2,
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    '& a': { color: theme.palette.primary.main },
  } as const;

  return (
    <Box component="article" sx={{ width: '100%', py: theme.spacing(4) }}>
      <Seo
        title={`${project.title} — Yiğit Çelik`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        image={project.ogImage || project.cover}
        type="article"
        jsonLd={jsonLd}
      />

      <Button
        component={RouterLink}
        to={cat ? `/projects?category=${cat.slug}` : '/projects'}
        size="small"
        sx={{ mb: 3, color: theme.palette.text.secondary, fontFamily: 'monospace', fontSize: '0.8rem', '&:hover': { color: theme.palette.primary.main } }}
      >
        ← {cat ? cat.label : 'All projects'}
      </Button>

      {/* Hero */}
      <Box
        component="img"
        src={project.cover}
        alt={project.coverAlt}
        fetchPriority="high"
        sx={{
          width: '100%',
          display: 'block',
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
          maxHeight: 460,
          objectFit: 'cover',
          backgroundColor: '#0d0f14',
        }}
      />

      <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontFamily: 'monospace', fontWeight: 600 }}>
        {cat?.label}
        {project.status ? ` · ${project.status}` : ''}
        {project.date ? ` · ${project.date.replace(/-/g, '.')}` : ''}
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem' }, lineHeight: 1.25, mt: 1, mb: 1.5 }}>
        {project.title}
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2.5, fontSize: '1.05rem' }}>
        {project.summary}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2.5 }}>
        {project.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.secondary, fontSize: '0.72rem', height: 24 }}
          />
        ))}
      </Stack>

      {project.links.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
          {project.links.map((l) => {
            const external = l.url.startsWith('http');
            const icon = l.url.includes('github.com') ? <GitHubIcon sx={{ fontSize: 16 }} /> : <LaunchIcon sx={{ fontSize: 16 }} />;
            return external ? (
              <Button key={l.url} href={l.url} target="_blank" rel="noopener" variant="outlined" size="small" startIcon={icon}>
                {l.label}
              </Button>
            ) : (
              <Button key={l.url} component={RouterLink} to={l.url} variant="outlined" size="small" startIcon={icon}>
                {l.label}
              </Button>
            );
          })}
        </Stack>
      )}

      {SECTION_TITLES.map(([key, label]) => (
        <Box component="section" key={key} sx={{ mb: 4 }}>
          <Typography variant="overline" component="h2" sx={{ color: theme.palette.text.secondary, letterSpacing: 2, fontWeight: 700, display: 'block', mb: 1 }}>
            {label}
          </Typography>
          <Box sx={mdSx}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.sections[key]}</ReactMarkdown>
          </Box>
        </Box>
      ))}

      {gallery.length > 0 && (
        <Box component="section" sx={{ mb: 5 }}>
          <Typography variant="overline" component="h2" sx={{ color: theme.palette.text.secondary, letterSpacing: 2, fontWeight: 700, display: 'block', mb: 1.5 }}>
            Gallery
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: gallery.length > 1 ? '1fr 1fr' : '1fr' }, gap: 2 }}>
            {gallery.map((g) => (
              <Box component="figure" key={g.src} sx={{ m: 0 }}>
                <MuiLink href={g.src} target="_blank" rel="noopener">
                  <Box
                    component="img"
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    sx={{ width: '100%', display: 'block', borderRadius: 1.5, border: `1px solid ${theme.palette.divider}`, maxHeight: 520, objectFit: 'contain', backgroundColor: '#0d0f14' }}
                  />
                </MuiLink>
                {g.caption && (
                  <Typography component="figcaption" variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.75 }}>
                    {g.caption}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {related.length > 0 && (
        <Box component="section" sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 4 }}>
          <Typography variant="overline" component="h2" sx={{ color: theme.palette.text.secondary, letterSpacing: 2, fontWeight: 700, display: 'block', mb: 1.5 }}>
            More in {cat?.label}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProjectPage;
