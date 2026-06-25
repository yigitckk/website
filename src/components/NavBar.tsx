// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, Box, Typography, IconButton } from '@mui/material';
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

  const linkSx = (to: string) => ({
    display: 'block',
    width: '100%',
    px: theme.spacing(2),
    py: theme.spacing(0.75),
    fontSize: '0.875rem',
    fontWeight: location.pathname === to ? 600 : 400,
    color: location.pathname === to ? theme.palette.text.primary : theme.palette.text.secondary,
    textDecoration: 'none',
    borderRadius: 1,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
    transition: 'color 0.15s ease, background-color 0.15s ease',
  });

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <List disablePadding>
      {navItems.map(({ to, label }) => (
        <ListItem key={to} disablePadding>
          <Box component={Link} to={to} onClick={onNavigate} sx={linkSx(to)}>
            {label}
          </Box>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {/* Mobile top bar */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 56,
          px: 2,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{ fontWeight: 600, fontSize: '0.95rem', color: theme.palette.text.primary, textDecoration: 'none' }}
        >
          Yiğit Çelik
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" onClick={toggleTheme} sx={{ color: theme.palette.text.secondary }}>
            {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ color: theme.palette.text.secondary }}>
            <MenuIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '65%',
            mt: '56px',
            backgroundColor: theme.palette.background.paper,
            borderLeft: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
            pt: 2,
          },
        }}
      >
        <NavLinks onNavigate={() => setDrawerOpen(false)} />
      </Drawer>

      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
          },
        }}
      >
        <Box sx={{ px: 2, pt: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={Link}
            to="/"
            sx={{ fontWeight: 600, fontSize: '0.95rem', color: theme.palette.text.primary, textDecoration: 'none' }}
          >
            Yiğit Çelik
          </Typography>
          <IconButton size="small" onClick={toggleTheme} sx={{ color: theme.palette.text.secondary }}>
            {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
        </Box>

        <Box sx={{ px: 1, flexGrow: 1 }}>
          <NavLinks />
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
