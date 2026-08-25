// src/components/Blog.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';
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
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(3), display: 'block' }}
      >
        Writing
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sortedPosts.map((post, i) => (
          <Box
            key={post.slug}
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: theme.spacing(2),
              py: theme.spacing(1.75),
              borderBottom: i < sortedPosts.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
            }}
          >
            <Link
              component={RouterLink}
              to={`/blog/${post.slug}`}
              underline="hover"
              sx={{ fontWeight: 500, fontSize: '0.9rem', color: theme.palette.text.primary }}
            >
              {metadata[post.slug]?.title || post.title}
            </Link>
            {metadata[post.slug]?.uploadDate && (
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, flexShrink: 0 }}>
                {new Date(metadata[post.slug].uploadDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
