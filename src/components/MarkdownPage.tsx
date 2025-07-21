// src/components/MarkdownPage.tsx
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import both dark and light themes for syntax highlighting
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import frontMatter from 'front-matter';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

// Define types for the code component
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const MarkdownPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<{ title: string; uploadDate: string }>({ title: '', uploadDate: '' });
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme(); // Access the current theme object

  useEffect(() => {
    // Dynamically import markdown files based on the slug
    import(`../blog/${slug}.md`)
      .then((res) => {
        // Fetch the content of the markdown file
        fetch(res.default)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load Markdown file: ${response.statusText}`);
            }
            return response.text();
          })
          .then((text) => {
            // Use front-matter to parse metadata (title, uploadDate) and body
            const { attributes, body } = frontMatter<{ title: string; uploadDate: string }>(text);
            setMetadata({ title: attributes.title, uploadDate: attributes.uploadDate });
            setContent(body);
          })
          .catch((err) => {
            console.error("Error fetching markdown content:", err);
            setError('Error loading the content. Please try again later.');
          });
      })
      .catch((err) => {
        console.error("Error importing markdown module:", err);
        setError('Error loading the content. Please try again later. (Check slug or file path)');
      });
  }, [slug]); // Dependency array: re-run effect if 'slug' changes

  if (error) {
    return (
      <Box sx={{
        p: theme.spacing(3),
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.error.main, // Use theme's error color
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        margin: 'auto',
        maxWidth: '600px',
        my: theme.spacing(4),
      }}>
        <Typography variant="h5" color="inherit"> {/* Inherit color from Box */}
          {error}
        </Typography>
      </Box>
    );
  }

  // Determine which syntax highlighter style to use based on the current theme mode
  const codeStyle = theme.palette.mode === 'dark' ? materialDark : materialLight;

  return (
    <Box
      sx={{
        // Apply themed background and text colors to the main container
        backgroundColor: theme.palette.background.paper, // Use paper background for the content area
        color: theme.palette.text.primary, // Primary text color from theme
        p: { xs: theme.spacing(2), sm: theme.spacing(4) }, // Responsive padding using theme spacing
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto', // Center the content horizontally
        my: theme.spacing(4), // Margin top and bottom using theme spacing
        overflowWrap: 'break-word', // Ensures long words break to prevent horizontal scrolling
        borderRadius: theme.shape.borderRadius, // Apply theme's border radius
        boxShadow: theme.shadows[3], // Apply a subtle shadow from the theme
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2.2rem' },
          textAlign: 'center',
          fontWeight: 'bold',
          mb: theme.spacing(3), // Margin bottom using theme spacing
          color: theme.palette.text.primary, // Themed text color
        }}
      >
        {metadata.title}
      </Typography>

      {/* Upload Date */}
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' },
          textAlign: 'center',
          mb: theme.spacing(4), // Margin bottom using theme spacing
          color: theme.palette.text.secondary, // Themed secondary text color
        }}
      >
        Uploaded: {new Date(metadata.uploadDate).toLocaleDateString()}
      </Typography>

      {/* Markdown Content */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Plugin for GitHub Flavored Markdown
        rehypePlugins={[rehypeRaw]} // Plugin to parse raw HTML inside markdown
        components={{
          // Custom rendering for HTML elements within Markdown
          code: ({ inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              // Block code (with syntax highlighting)
              <Box sx={{
                overflowX: 'auto',
                borderRadius: theme.shape.borderRadius, // Themed border radius
                mb: theme.spacing(3), // Margin bottom using theme spacing
                // SyntaxHighlighter's style prop controls its background/text.
                // We ensure the surrounding Box doesn't interfere.
              }}>
                <SyntaxHighlighter {...props} style={codeStyle} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              // Inline code
              <Typography
                component="code"
                sx={{
                  backgroundColor: theme.palette.action.hover, // Themed background for inline code
                  color: theme.palette.text.primary, // Themed text color
                  padding: theme.spacing(0.25, 0.75), // Padding using theme spacing
                  borderRadius: theme.shape.borderRadius, // Themed border radius
                  fontSize: '0.95rem',
                  fontFamily: 'monospace',
                }}
                {...props}
              >
                {children}
              </Typography>
            );
          },
          h1: ({ children }) => (
            <Typography variant="h4" gutterBottom sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
              color: theme.palette.text.primary, // Themed text color
              mt: theme.spacing(4), // Margin top for headings
              mb: theme.spacing(2), // Margin bottom for headings
            }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" gutterBottom sx={{
              fontSize: { xs: '1.6rem', sm: '2rem' },
              color: theme.palette.text.primary, // Themed text color
              mt: theme.spacing(3),
              mb: theme.spacing(1.5),
            }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" gutterBottom sx={{
              fontSize: { xs: '1.4rem', sm: '1.7rem' },
              color: theme.palette.text.primary, // Themed text color
              mt: theme.spacing(2),
              mb: theme.spacing(1),
            }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: theme.palette.text.primary, // Themed text color
            }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" sx={{
              color: theme.palette.primary.main, // Link color from theme's primary
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
              {children}
            </Link>
          ),
          img: ({ src, alt }) => (
            <Box
              component="img"
              src={src}
              alt={alt}
              sx={{
                maxWidth: '100%',
                height: 'auto',
                margin: '20px auto', // Center the image
                display: 'block',
                borderRadius: theme.shape.borderRadius, // Themed border radius
                border: `1px solid ${theme.palette.divider}`, // Themed border
                boxShadow: theme.shadows[2], // Subtle shadow for images
              }}
              // Fallback for broken images
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                // Use themed placeholder colors
                target.src = `https://placehold.co/600x400/${theme.palette.grey[300].substring(1)}/${theme.palette.grey[700].substring(1)}?text=Image+Not+Found`;
              }}
            />
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{
              listStyleType: 'disc',
              pl: theme.spacing(4), // Padding left using theme spacing
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: theme.palette.text.primary, // Themed text color
            }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{
              listStyleType: 'decimal',
              pl: theme.spacing(4), // Padding left using theme spacing
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: theme.palette.text.primary, // Themed text color
            }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" paragraph sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: theme.palette.text.primary, // Themed text color
            }}>
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Box
              sx={{
                borderLeft: `4px solid ${theme.palette.primary.main}`, // Themed border color
                pl: theme.spacing(3), // Padding left using theme spacing
                mt: theme.spacing(2), // Margin top using theme spacing
                mb: theme.spacing(2), // Margin bottom using theme spacing
                backgroundColor: theme.palette.action.hover, // Themed background for blockquote
                borderRadius: theme.shape.borderRadius, // Themed border radius
                fontStyle: 'italic',
                p: theme.spacing(2), // Padding using theme spacing
                color: theme.palette.text.primary, // Themed text color
              }}
            >
              <Typography variant="body1" sx={{
                fontSize: { xs: '1rem', sm: '1.2rem' },
                color: 'inherit', // Inherit color from parent Box
              }}>
                {children}
              </Typography>
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownPage;
