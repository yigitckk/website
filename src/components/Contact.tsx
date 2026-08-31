// src/components/Contact.tsx
import React from 'react';
import { Box, Typography, Link, Stack, Card, CardContent, Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/yigitckk',
    icon: <GitHubIcon fontSize="small" />,
    handle: 'github.com/yigitckk',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yigitck/',
    icon: <LinkedInIcon fontSize="small" />,
    handle: 'linkedin.com/in/yigitck',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/yigitopt',
    icon: <TwitterIcon fontSize="small" />,
    handle: '@yigitopt',
  },
  {
    label: 'Academic Email (PAU)',
    href: 'mailto:ycelik221@posta.pau.edu.tr',
    icon: <EmailIcon fontSize="small" />,
    handle: 'ycelik221@posta.pau.edu.tr',
  },
  {
    label: 'Personal Email',
    href: 'mailto:yigitcelik798@gmail.com',
    icon: <EmailIcon fontSize="small" />,
    handle: 'yigitcelik798@gmail.com',
  },
];

const Contact: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Box sx={{ mb: theme.spacing(4) }}>
        <Chip
          label="GET_IN_TOUCH"
          size="small"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            fontWeight: 600,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(0, 123, 255, 0.08)',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}33`,
            mb: 1.5,
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}
        >
          Contact & Credentials
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Best reached via GitHub or academic email. Always open for engineering collaboration.
        </Typography>
      </Box>

      <Stack spacing={2}>
        {links.map(({ label, href, icon, handle }) => (
          <Card
            key={label}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                boxShadow: '0 4px 16px rgba(56, 189, 248, 0.1)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent sx={{ p: theme.spacing(2), '&:last-child': { pb: theme.spacing(2) } }}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: theme.palette.text.primary,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>{icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
                    {label}
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace' }}>
                  {handle}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Contact;
