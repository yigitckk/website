// src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Link as MuiLink, Card, CardContent, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import frontMatter from 'front-matter';

import About from '../components/About';
import Projects from '../components/Projects';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

const markdownFiles = require.context('../blog', false, /\.md$/);

interface Post {
  slug: string;
  title: string;
  uploadDate: string;
}

const RecentWritingSection: React.FC = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const slugs: string[] = markdownFiles.keys().map((f: string) =>
      f.replace('./', '').replace('.md', '')
    );

    Promise.all(
      slugs.map((slug) =>
        import(`../blog/${slug}.md`).then((res) =>
          fetch(res.default)
            .then((r) => r.text())
            .then((text) => {
              const { attributes } = frontMatter<{ uploadDate?: string; title?: string }>(text);
              return {
                slug,
                title: attributes.title || slug.replace(/-/g, ' '),
                uploadDate: attributes.uploadDate || '',
              };
            })
        )
      )
    ).then((results) => {
      const sorted = results
        .filter((p) => p.uploadDate)
        .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      setPosts(sorted);
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <Box id="writing" sx={{ mb: theme.spacing(8) }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: theme.spacing(3) }}>
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.secondary, letterSpacing: 2, fontWeight: 700 }}
        >
          Writing
        </Typography>
        <MuiLink
          component={RouterLink}
          to="/blog"
          sx={{ fontSize: '0.8rem', color: theme.palette.primary.main, fontFamily: 'monospace' }}
        >
          All posts ({posts.length}) →
        </MuiLink>
      </Box>

      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: theme.spacing(3) }}>
        Thoughts on backend architecture, local LLMs, and systems engineering.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
        {posts.map((post) => (
          <Card
            key={post.slug}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <CardContent sx={{ p: theme.spacing(2.5), '&:last-child': { pb: theme.spacing(2.5) } }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <MuiLink
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  underline="none"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  {post.title}
                </MuiLink>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label="TR"
                    size="small"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.65rem',
                      height: 18,
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace' }}
                  >
                    {new Date(post.uploadDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

const SovereignFooter: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        pt: theme.spacing(6),
        pb: theme.spacing(4),
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          Yiğit Çelik
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.5 }}>
          Backend Systems & AI Architect · Industrial Engineering
        </Typography>
      </Box>

      <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace', display: 'block' }}>
          37.7749°N · 29.0875°E
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace', display: 'block', mt: 0.25 }}>
          MMXXVI · yigitc.dev
        </Typography>
      </Box>
    </Box>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <About />
      <RecentWritingSection />
      <Box id="projects">
        <Projects />
      </Box>
      <SovereignFooter />
    </>
  );
};

export default HomePage;
