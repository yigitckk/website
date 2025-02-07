import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import frontMatter from 'front-matter';

const Blog: React.FC = () => {
  const posts: { title: string, slug: string }[] = [
    { title: 'Understanding Streams in Programming', slug: 'sample-post' },
    { title: 'Lambda Expressions in Java', slug: 'lambda' },
    // Add more posts here
  ];

  const [metadata, setMetadata] = useState<{ [key: string]: { uploadDate: string } }>({});

  useEffect(() => {
    posts.forEach((post) => {
      import(`../blog/${post.slug}.md`)
        .then((res) => {
          fetch(res.default)
            .then((response) => response.text().then((text) => {
              const { attributes } = frontMatter<{ uploadDate: string }>(text);
              setMetadata((prevMetadata) => ({
                ...prevMetadata,
                [post.slug]: {
                  uploadDate: attributes.uploadDate,
                },
              }));
            }))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    });
  }, [posts]);

  return (
    <Box sx={{ padding: 3 }}>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.slug}
            component={RouterLink}
            to={`/blog/${post.slug}`}
            sx={{
              padding: '10px 20px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemText
              primary={
                <>
                  {post.title}
                  {metadata[post.slug] && (
                    <span style={{ marginLeft: '10px', fontSize: '0.8em', color: 'gray' }}>
                      (Uploaded: {new Date(metadata[post.slug].uploadDate).toLocaleDateString()})
                    </span>
                  )}
                </>
              }
              primaryTypographyProps={{
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Blog;