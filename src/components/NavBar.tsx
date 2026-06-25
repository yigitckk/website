// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';

interface NavBarProps {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

const navItems = [
  { to: '/', label: 'About' },
  { to: '/blog', label: 'Writing' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/contact', label: 'Contact' },
];

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, themeMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar,
        }}
      >
        {/* Brand */}
        <Typography
          component={Link}
          to="/"
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: theme.palette.text.primary,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          Yiğit Çelik
        </Typography>

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {navItems.map(({ to, label }) => (
            <Box
              key={to}
              component={Link}
              to={to}
              sx={{
                px: 1.25,
                py: 0.5,
                fontSize: '0.825rem',
                fontWeight: isActive(to) ? 600 : 400,
                color: isActive(to) ? theme.palette.text.primary : theme.palette.text.secondary,
                textDecoration: 'none',
                borderRadius: 1,
                '&:hover': { color: theme.palette.text.primary, backgroundColor: theme.palette.action.hover },
                transition: 'color 0.15s ease, background-color 0.15s ease',
              }}
            >
              {label}
            </Box>
          ))}
          <IconButton size="small" onClick={toggleTheme} sx={{ ml: 1, color: theme.palette.text.secondary }}>
            {themeMode === 'dark' ? <LightModeIcon sx={{ fontSize: 17 }} /> : <DarkModeIcon sx={{ fontSize: 17 }} />}
          </IconButton>
        </Box>

        {/* Mobile right side */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" onClick={toggleTheme} sx={{ color: theme.palette.text.secondary }}>
            {themeMode === 'dark' ? <LightModeIcon sx={{ fontSize: 17 }} /> : <DarkModeIcon sx={{ fontSize: 17 }} />}
          </IconButton>
          <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ color: theme.palette.text.secondary }}>
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 200,
            mt: '52px',
            backgroundColor: theme.palette.background.default,
            borderLeft: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
            pt: 1,
          },
        }}
      >
        <List disablePadding>
          {navItems.map(({ to, label }) => (
            <ListItem key={to} disablePadding>
              <Box
                component={Link}
                to={to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  display: 'block',
                  width: '100%',
                  px: 2,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: isActive(to) ? 600 : 400,
                  color: isActive(to) ? theme.palette.text.primary : theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.text.primary, backgroundColor: theme.palette.action.hover },
                }}
              >
                {label}
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
