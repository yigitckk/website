// src/components/Contact.tsx
import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
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
    handle: 'yigitckk',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yigitck/',
    icon: <LinkedInIcon fontSize="small" />,
    handle: 'yigitck',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/yigit_celik7',
    icon: <TwitterIcon fontSize="small" />,
    handle: 'yigit_celik7',
  },
  {
    label: 'Email',
    href: 'mailto:yigitcik55@gmail.com',
    icon: <EmailIcon fontSize="small" />,
    handle: 'yigitcik55@gmail.com',
  },
];

const Contact: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(1), display: 'block' }}
      >
        Contact
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: theme.spacing(3) }}>
        Best reached via GitHub or email.
      </Typography>

      <Stack spacing={2}>
        {links.map(({ label, href, icon, handle }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': { color: theme.palette.primary.main },
              transition: 'color 0.2s ease',
            }}
          >
            <Box sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>{icon}</Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {handle}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default Contact;
