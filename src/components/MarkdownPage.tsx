// src/components/MarkdownPage.tsx
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Link as MuiLink, Button, Chip } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
        <Button component={RouterLink} to="/blog" sx={{ mt: 2 }} variant="outlined">
          ← Back to Writing
        </Button>
      </Box>
    );
  }

  const codeStyle = theme.palette.mode === 'dark' ? materialDark : materialLight;

  return (
    <Box sx={{ width: '100%', maxWidth: 720, py: theme.spacing(4) }}>
      <Button
        component={RouterLink}
        to="/blog"
        size="small"
        sx={{
          mb: 3,
          color: theme.palette.text.secondary,
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          textTransform: 'none',
          '&:hover': { color: theme.palette.primary.main },
        }}
      >
        ← Back to Writing
      </Button>

      <Box sx={{ mb: 4, pb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Chip
          label="ENGINEERING_POSTMORTEM"
          size="small"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            fontWeight: 600,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(0, 123, 255, 0.08)',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}33`,
            mb: 1.5,
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1.5, lineHeight: 1.3 }}
        >
          {metadata.title}
        </Typography>

        {metadata.uploadDate && (
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace', display: 'block' }}>
            {new Date(metadata.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Typography>
        )}
      </Box>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Box sx={{ overflowX: 'auto', borderRadius: 2, mb: 3, border: `1px solid ${theme.palette.divider}` }}>
                <SyntaxHighlighter {...props} style={codeStyle} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Typography
                component="code"
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: theme.palette.primary.main,
                  px: 0.8,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: '0.85em',
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
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 3.5, mb: 1.2, color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', mt: 2.5, mb: 0.75, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body2" sx={{ fontSize: '0.96rem', lineHeight: 1.85, mb: 2, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
              {children}
            </MuiLink>
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
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 2, fontSize: '0.96rem', color: theme.palette.text.primary }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 2, fontSize: '0.96rem', color: theme.palette.text.primary }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" sx={{ fontSize: '0.96rem', lineHeight: 1.8, mb: 0.5, color: theme.palette.text.primary }}>
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Box
              sx={{
                borderLeft: `3px solid ${theme.palette.primary.main}`,
                pl: 2.5,
                py: 1,
                my: 2.5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.05)' : 'rgba(0, 123, 255, 0.03)',
                borderRadius: '0 8px 8px 0',
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
