import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import frontMatter from 'front-matter';

const Blog: React.FC = () => {
  const posts = [
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
    <Box
      sx={{
        padding: { xs: 2, sm: 3 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: 4,
        }}
      >
        Blog Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.slug}
            component={RouterLink}
            to={`/blog/${post.slug}`}
            sx={{
              padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
              borderRadius: '8px',
              marginBottom: '8px', // Add spacing between items
              transition: 'background-color 0.3s ease', // Smooth hover effect
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Light background on hover
              },
            }}
          >
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                      fontWeight: 'bold',
                      color: 'black',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.title}
                  </Typography>
                  {metadata[post.slug] && (
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: '10px',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Responsive font size
                        color: 'gray',
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