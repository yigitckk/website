// src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
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

const RecentPosts: React.FC = () => {
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
        .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        .slice(0, 3);
      setPosts(sorted);
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <Box sx={{ mb: theme.spacing(6) }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: theme.spacing(2) }}>
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.secondary, letterSpacing: 2 }}
        >
          Recent Writing
        </Typography>
        <MuiLink
          component={RouterLink}
          to="/blog"
          sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}
        >
          All posts →
        </MuiLink>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1.5) }}>
        {posts.map((post) => (
          <Box
            key={post.slug}
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: theme.spacing(2),
            }}
          >
            <MuiLink
              component={RouterLink}
              to={`/blog/${post.slug}`}
              underline="hover"
              sx={{
                color: theme.palette.text.primary,
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            >
              {post.title}
            </MuiLink>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, flexShrink: 0 }}
            >
              {new Date(post.uploadDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <About />
      <Projects />
      <RecentPosts />
    </>
  );
};

export default HomePage;
