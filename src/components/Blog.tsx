// src/components/Blog.tsx
import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import frontMatter from 'front-matter';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const Blog: React.FC = () => {
  const theme = useTheme(); // Access the current theme object
  const posts = [
    { title: 'Understanding Streams in Programming', slug: 'sample-post' },
    { title: 'Lambda Expressions in Java', slug: 'lambda' },
    // Add more posts here
  ];

  const [metadata, setMetadata] = useState<{ [key: string]: { uploadDate: string } }>({});

  useEffect(() => {
    posts.forEach((post) => {
      // Dynamically import markdown files
      // Note: This relies on webpack's ability to handle dynamic imports for static assets.
      // Ensure your webpack config (or create-react-app setup) supports this.
      import(`../blog/${post.slug}.md`)
        .then((res) => {
          // Fetch the content of the markdown file
          fetch(res.default)
            .then((response) => response.text().then((text) => {
              // Use front-matter to parse metadata from the markdown file
              const { attributes } = frontMatter<{ uploadDate: string }>(text);
              setMetadata((prevMetadata) => ({
                ...prevMetadata,
                [post.slug]: {
                  uploadDate: attributes.uploadDate,
                },
              }));
            }))
            .catch((err) => console.error("Error fetching markdown content:", err));
        })
        .catch((err) => console.error("Error importing markdown module:", err));
    });
  }, [posts]); // Dependency array: re-run effect if 'posts' array changes

  return (
    <Box
      sx={{
        // Apply themed background and text colors to the main container
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: { xs: theme.spacing(2), sm: theme.spacing(3) }, // Responsive padding using theme spacing
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content horizontally
        borderRadius: theme.shape.borderRadius, // Apply theme's border radius
        boxShadow: theme.shadows[3], // Apply a subtle shadow from the theme
        my: theme.spacing(4), // Margin top and bottom using theme spacing
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: theme.spacing(4), // Margin bottom using theme spacing
          color: theme.palette.text.primary, // Themed text color
        }}
      >
        Blog Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.slug}
            component={RouterLink} // Use RouterLink for navigation
            to={`/blog/${post.slug}`}
            sx={{
              padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.25, 2.5) }, // Responsive padding using theme spacing
              borderRadius: theme.shape.borderRadius, // Apply theme's border radius
              marginBottom: theme.spacing(1), // Add spacing between items using theme spacing
              transition: 'background-color 0.3s ease', // Smooth hover effect
              '&:hover': {
                backgroundColor: theme.palette.action.hover, // Themed hover background color
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
                      color: theme.palette.text.primary, // Themed text color for post title
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.title}
                  </Typography>
                  {metadata[post.slug] && (
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: theme.spacing(1.25), // Margin left using theme spacing
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Responsive font size
                        color: theme.palette.text.secondary, // Themed text color for upload date
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
