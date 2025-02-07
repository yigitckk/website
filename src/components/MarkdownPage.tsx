import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import frontMatter from 'front-matter';

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

  useEffect(() => {
    import(`../blog/${slug}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to load Markdown file');
            }
            return response.text();
          })
          .then((text) => {
            const { attributes, body } = frontMatter<{ title: string; uploadDate: string }>(text);
            setMetadata({ title: attributes.title, uploadDate: attributes.uploadDate });
            setContent(body);
          })
          .catch((err) => {
            console.error(err);
            setError('Error loading the content. Please try again later.');
          });
      })
      .catch((err) => {
        console.error(err);
        setError('Error loading the content. Please try again later.');
      });
  }, [slug]);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        mt: { xs: '50px', sm: '80px' },
        overflowWrap: 'break-word',
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
          mb: 3,
        }}
      >
        {metadata.title}
      </Typography>

      {/* Upload Date */}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' },
          textAlign: 'center',
          mb: 4,
        }}
      >
        Uploaded: {new Date(metadata.uploadDate).toLocaleDateString()}
      </Typography>

      {/* Markdown Content */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Box sx={{ overflowX: 'auto', borderRadius: '6px', mb: 3 }}>
                <SyntaxHighlighter {...props} style={materialDark} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Typography
                component="code"
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: '2px 6px',
                  borderRadius: '4px',
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
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.4rem', sm: '1.7rem' } }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" color="primary">
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
                margin: '20px auto',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ listStyleType: 'disc', pl: 4, fontSize: { xs: '1rem', sm: '1.2rem' } }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ listStyleType: 'decimal', pl: 4, fontSize: { xs: '1rem', sm: '1.2rem' } }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Box
              sx={{
                borderLeft: '4px solid #ccc',
                pl: 3,
                mt: 2,
                mb: 2,
                backgroundColor: '#f9f9f9',
                borderRadius: '6px',
                fontStyle: 'italic',
                p: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
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
