import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import frontMatter from 'front-matter';

const MarkdownPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState<{ uploadDate: string }>({ uploadDate: '' });

  useEffect(() => {
    import(`../blog/${slug}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => {
            return response.text().then((text) => {
              const { attributes, body } = frontMatter<{ uploadDate: string }>(text);
              setMetadata({
                uploadDate: attributes.uploadDate,
              });
              setContent(body);
            });
          })
      })
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <Box>
      <p>Uploaded: {new Date(metadata.uploadDate).toLocaleDateString()}</p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className?: string, children?: React.ReactNode }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownPage;