// src/components/Blog.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Link as MuiLink, Card, CardContent, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import frontMatter from 'front-matter';
import { useTheme } from '@mui/material/styles';

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
}

interface Metadata {
  [key: string]: {
    uploadDate: string;
    title?: string;
  };
}

const Blog: React.FC = () => {
  const theme = useTheme();

  const posts: Post[] = markdownFiles.keys().map((fileName: string) => {
    const slug = fileName.replace('./', '').replace('.md', '');
    return { slug, title: slug.replace(/-/g, ' ') };
  });

  const [metadata, setMetadata] = useState<Metadata>({});

  useEffect(() => {
    posts.forEach((post: Post) => {
      import(`../blog/${post.slug}.md`)
        .then((res) => {
          fetch(res.default)
            .then((response) => response.text())
            .then((text) => {
              const { attributes } = frontMatter<{ uploadDate: string; title?: string }>(text);
              setMetadata((prev) => ({
                ...prev,
                [post.slug]: {
                  uploadDate: attributes.uploadDate,
                  title: attributes.title || post.title,
                },
              }));
            });
        });
    });
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = metadata[a.slug]?.uploadDate ? new Date(metadata[a.slug].uploadDate).getTime() : 0;
      const dateB = metadata[b.slug]?.uploadDate ? new Date(metadata[b.slug].uploadDate).getTime() : 0;
      return dateB - dateA;
    });
  }, [posts, metadata]);

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Box sx={{ mb: theme.spacing(4) }}>
        <Chip
          label="ENGINEERING LOGS & POSTMORTEMS"
          size="small"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            fontWeight: 600,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(0, 123, 255, 0.08)',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}33`,
            mb: 1.5,
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}
        >
          Writing & Case Studies
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Documented architectural decisions, production postmortems, and system design notes.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
        {sortedPosts.map((post) => (
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
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.1)',
                transform: 'translateY(-2px)',
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
                    fontSize: '1.05rem',
                    color: theme.palette.text.primary,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  {metadata[post.slug]?.title || post.title}
                </MuiLink>

                {metadata[post.slug]?.uploadDate && (
                  <Chip
                    label={new Date(metadata[post.slug].uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    size="small"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.secondary,
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
