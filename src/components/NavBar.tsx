// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';

interface NavBarProps {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

const navItems = [
  { to: '/blog', label: 'Writing' },
  { to: '/#projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, themeMode }) => {
  const theme = useTheme();
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === '/blog') return location.pathname.startsWith('/blog');
    if (to === '/contact') return location.pathname === '/contact';
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
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2.5, sm: 4 },
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(9, 9, 11, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar,
      }}
    >
      {/* Brand */}
      <Box
        component={Link}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)',
          }}
        />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '0.92rem',
            color: theme.palette.text.primary,
            letterSpacing: '-0.02em',
            fontFamily: 'monospace',
          }}
        >
          yigitc.dev
        </Typography>
      </Box>

      {/* Nav links (Clean horizontal without hamburger menu) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
        {navItems.map(({ to, label }) => (
          <Typography
            key={to}
            component={Link}
            to={to}
            sx={{
              fontSize: '0.85rem',
              fontWeight: isActive(to) ? 600 : 400,
              color: isActive(to) ? theme.palette.text.primary : theme.palette.text.secondary,
              textDecoration: 'none',
              transition: 'color 0.15s ease',
              '&:hover': { color: theme.palette.text.primary },
            }}
          >
            {label}
          </Typography>
        ))}

        <IconButton size="small" onClick={toggleTheme} sx={{ color: theme.palette.text.secondary, ml: 0.5 }}>
          {themeMode === 'dark' ? <LightModeIcon sx={{ fontSize: 16 }} /> : <DarkModeIcon sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
