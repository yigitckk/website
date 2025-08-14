// src/components/Blog.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
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
            })
            .catch((err) => console.error('Error fetching markdown content:', err));
        })
        .catch((err) => console.error('Error importing markdown module:', err));
    });
  }, [posts]);

  // uploadDate'e göre sıralı liste (yeni en üstte)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = metadata[a.slug]?.uploadDate
        ? new Date(metadata[a.slug].uploadDate).getTime()
        : 0;
      const dateB = metadata[b.slug]?.uploadDate
        ? new Date(metadata[b.slug].uploadDate).getTime()
        : 0;
      return dateB - dateA; // Yeni tarih daha önce gelir
    });
  }, [posts, metadata]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: { xs: theme.spacing(2), sm: theme.spacing(3) },
        maxWidth: { xs: '100%', sm: '800px' },
        margin: '0 auto',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        my: theme.spacing(4),
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
          textAlign: 'center',
          mb: theme.spacing(4),
          color: theme.palette.text.primary,
        }}
      >
        Blog Posts
      </Typography>
      <List>
        {sortedPosts.map((post: Post) => (
          <ListItem
            key={post.slug}
            component={RouterLink}
            to={`/blog/${post.slug}`}
            sx={{
              padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.25, 2.5) },
              borderRadius: theme.shape.borderRadius,
              marginBottom: theme.spacing(1),
              transition: 'background-color 0.3s ease',
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
          >
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      textTransform: 'uppercase',
                    }}
                  >
                    {metadata[post.slug]?.title || post.title}
                  </Typography>
                  {metadata[post.slug]?.uploadDate && (
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: theme.spacing(1.25),
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        color: theme.palette.text.secondary,
                      }}
                    >
                      (Uploaded: {new Date(metadata[post.slug].uploadDate).toLocaleDateString()})
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Blog;
