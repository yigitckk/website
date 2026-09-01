// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import NavBar from './components/NavBar';
import HomePage from './pages/index';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Blog from './components/Blog';
import MarkdownPage from './components/MarkdownPage';

import './styles/main.css';

const App: React.FC = () => {
  const getInitialThemeMode = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode as 'light' | 'dark';
    }
    return 'dark';
  };

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialThemeMode());

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#f59e0b' : '#d97706', // Warm Copper Amber / Gold
            contrastText: '#000000',
          },
          secondary: {
            main: mode === 'dark' ? '#38bdf8' : '#0284c7', // Sky Blue Accent
          },
          background: {
            default: mode === 'dark' ? '#0d0f14' : '#f8fafc', // Rich Deep Slate Charcoal (Not cold pitch black)
            paper: mode === 'dark' ? '#141822' : '#ffffff', // Card surface
          },
          text: {
            primary: mode === 'dark' ? '#f8fafc' : '#0f172a', // Slate Warm White
            secondary: mode === 'dark' ? '#94a3b8' : '#64748b', // Muted Slate Silver
          },
          divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        },
        typography: {
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 6,
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar toggleTheme={toggleThemeMode} themeMode={mode} />
        <Box
          component="main"
          sx={{
            maxWidth: 720,
            mx: 'auto',
            px: { xs: 2.5, sm: 3 },
            pt: { xs: '76px', sm: '88px' },
            pb: 10,
            minHeight: '100vh',
            backgroundColor: 'transparent', // Inherit body radial gradient
            color: 'text.primary',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<MarkdownPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
