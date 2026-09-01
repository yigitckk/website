// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';
import SovereignSigil from './SovereignSigil';

interface NavBarProps {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

const navItems = [
  { to: '/blog', label: 'Writing' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
];

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, themeMode }) => {
  const theme = useTheme();
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === '/blog') return location.pathname.startsWith('/blog');
    if (to === '/#contact') return location.hash === '#contact';
    if (to === '/#projects') return location.hash === '#projects';
    return false;
  };

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: { xs: 56, sm: 60 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(13, 15, 20, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar + 10,
      }}
    >
      {/* Brand & Custom Sovereign Sigil */}
      <Box
        component={Link}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.25 },
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <SovereignSigil size={22} color={theme.palette.primary.main} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '0.95rem' },
            color: theme.palette.text.primary,
            letterSpacing: '-0.02em',
            fontFamily: 'monospace',
          }}
        >
          yigitc.dev
        </Typography>
      </Box>

      {/* Nav links (Horizontal, minimal) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
        {navItems.map(({ to, label }) => (
          <Typography
            key={to}
            component={Link}
            to={to}
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              fontWeight: isActive(to) ? 600 : 400,
              color: isActive(to) ? theme.palette.text.primary : theme.palette.text.secondary,
              textDecoration: 'none',
              transition: 'color 0.15s ease',
              '&:hover': { color: theme.palette.primary.main },
            }}
          >
            {label}
          </Typography>
        ))}

        <IconButton size="small" onClick={toggleTheme} sx={{ color: theme.palette.text.secondary, ml: { xs: 0.25, sm: 0.5 } }}>
          {themeMode === 'dark' ? <LightModeIcon sx={{ fontSize: 16 }} /> : <DarkModeIcon sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
