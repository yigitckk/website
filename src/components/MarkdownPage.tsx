// src/components/MarkdownPage.tsx
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import frontMatter from 'front-matter';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  useEffect(() => {
    import(`../blog/${slug}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            return response.text();
          })
          .then((text) => {
            const { attributes, body } = frontMatter<{ title: string; uploadDate: string }>(text);
            setMetadata({ title: attributes.title, uploadDate: attributes.uploadDate });
            setContent(body);
          })
          .catch(() => setError('Error loading content.'));
      })
      .catch(() => setError('Post not found.'));
  }, [slug]);

  if (error) {
    return (
      <Box sx={{ py: theme.spacing(8), textAlign: 'center' }}>
        <Typography sx={{ color: theme.palette.text.secondary }}>{error}</Typography>
      </Box>
    );
  }

  const codeStyle = theme.palette.mode === 'dark' ? materialDark : materialLight;

  return (
    <Box sx={{ width: '100%', maxWidth: 720, py: theme.spacing(4) }}>
      <Typography
        sx={{ fontWeight: 700, fontSize: '1.6rem', color: theme.palette.text.primary, mb: 1, lineHeight: 1.3 }}
      >
        {metadata.title}
      </Typography>

      {metadata.uploadDate && (
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: theme.spacing(4) }}>
          {new Date(metadata.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Typography>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Box sx={{ overflowX: 'auto', borderRadius: 1, mb: 3 }}>
                <SyntaxHighlighter {...props} style={codeStyle} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Typography
                component="code"
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.text.primary,
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                  fontSize: '0.875em',
                  fontFamily: 'monospace',
                }}
                {...props}
              >
                {children}
              </Typography>
            );
          },
          h1: ({ children }) => (
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 1.5, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', mt: 2.5, mb: 0.75, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.8, mb: 2, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: theme.palette.primary.main }}>
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
                my: 3,
                display: 'block',
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 2, fontSize: '0.95rem', color: theme.palette.text.primary }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 2, fontSize: '0.95rem', color: theme.palette.text.primary }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" sx={{ fontSize: '0.95rem', lineHeight: 1.8, mb: 0.5, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Box
              sx={{
                borderLeft: `3px solid ${theme.palette.divider}`,
                pl: 2,
                my: 2,
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
              }}
            >
              {children}
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
