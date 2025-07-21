// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Material-UI imports for theming and layout
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Provides a baseline for CSS and applies theme colors to body
import Box from '@mui/material/Box'; // A flexible layout component

// Import your application components
import NavBar from './components/NavBar';
import HomePage from './pages/index'; // Assuming index.tsx in pages/ is your home page
import About from './components/About'; // Keep for direct routing if needed, but HomePage will render it
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Blog from './components/Blog';
import MarkdownPage from './components/MarkdownPage';

// Import your custom CSS (if you have any global styles not handled by MUI)
import './styles/main.css';

const App: React.FC = () => {
  // Function to determine the initial theme mode
  // It checks localStorage first, then the user's system preference
  const getInitialThemeMode = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode as 'light' | 'dark';
    }
    // Check if the user's system prefers dark mode
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // State to hold the current theme mode ('light' or 'dark')
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialThemeMode());

  // useEffect to persist the theme mode in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]); // Dependency array: runs when 'mode' changes

  // Function to toggle between light and dark mode
  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoized theme object creation
  // useMemo prevents the theme object from being recreated on every render
  // It only recreates when 'mode' changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // This property is crucial: it tells MUI to apply light or dark palette
          primary: {
            main: mode === 'light' ? '#007bff' : '#82b1ff', // Lighter blue for dark mode for better visibility
            contrastText: '#ffffff', // White text on primary buttons
          },
          secondary: {
            main: mode === 'light' ? '#6c757d' : '#bbdefb', // Lighter grey/blue for dark mode
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#121212', // Much darker background for true dark mode
            paper: mode === 'light' ? '#f8f9fa' : '#1e1e1e', // Slightly lighter than default for cards/drawers
          },
          text: {
            primary: mode === 'light' ? '#333333' : '#e0e0e0', // Slightly softer white for primary text
            secondary: mode === 'light' ? '#666666' : '#b0b0b0', // Slightly softer grey for secondary text
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)', // Themed dividers
        },
        typography: {
            // Apply the new font family globally
            fontFamily: '"Open Sans", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
            // You can define other typography variants here (h1, h2, body1, etc.)
        },
        components: {
            // Global style overrides for specific Material-UI components
            MuiButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        // Default text color for variant="text" buttons
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover, // MUI's default hover color
                        },
                    }),
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: ({ theme }) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }),
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.text.primary,
                    }),
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.text.primary,
                    }),
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        // Default color for list items, can be inherited by ListItemText
                    }),
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.primary.main, // Links use primary color
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }),
                },
            },
        },
      }),
    [mode], // Recreate theme only when 'mode' changes
  );

  return (
    // ThemeProvider makes the 'theme' object available to all MUI components
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies global CSS resets and sets body background/text colors based on theme */}
      <CssBaseline />
      <Router>
        {/*
          NavBar is rendered outside the main content Box because it's a fixed/permanent sidebar
          Pass the toggleThemeMode function and current themeMode to NavBar
        */}
        <NavBar toggleTheme={toggleThemeMode} themeMode={mode} />

        {/*
          Main content area that will display different pages via React Router.
          It needs margin/padding to account for the fixed/permanent NavBar.
        */}
        <Box
          component="main" // Semantic HTML for main content
          sx={{
            flexGrow: 1, // Allows this Box to take up available space
            // Adjusted padding: py for vertical, px for horizontal
            py: { xs: 0, sm: 0 }, // Vertical padding (top/bottom) - Retained user's 0
            // Further reduced horizontal padding for wider content on small and up screens
            px: { xs: 1, sm: 1 }, // Horizontal padding (left/right) - Retained user's 1
            // Margin-left to push content away from the permanent sidebar on larger screens
            ml: { xs: 0, sm: '400px' }, // Retained user's 400px
            // Padding-top to push content away from the fixed mobile header on small screens
            pt: { xs: '56px', sm: '0' }, // 56px (mobile header height) on xs, 0 on sm and up
            backgroundColor: 'background.default', // Background color from theme palette
            color: 'text.primary', // Text color from theme palette
            minHeight: '100vh', // Ensure main content takes at least full viewport height
            transition: 'margin-left 0.3s ease, background-color 0.3s ease, color 0.3s ease', // Smooth transitions
          }}
        >
          <Routes>
            {/* Correctly render HomePage for the root path */}
            <Route path="/" element={<HomePage />} />
            {/* Other routes can remain as direct components if they don't have nested NavBars */}
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            {/* Route for individual blog posts, assuming slug as parameter */}
            <Route path="/blog/:slug" element={<MarkdownPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
