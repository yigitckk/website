// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Updated Imports for Theme Toggle Icons
import LightModeIcon from '@mui/icons-material/LightMode'; // New Sun icon for light mode
import DarkModeIcon from '@mui/icons-material/DarkMode';   // New Moon icon for dark mode
import { useTheme } from '@mui/material/styles'; // Import useTheme hook to access the theme

// Define props interface for NavBar, expecting toggleTheme and themeMode from App.tsx
interface NavBarProps {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, themeMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme(); // Access the current theme object provided by ThemeProvider in App.tsx

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Array of navigation items for easier mapping
  const navItems = [
    { to: '/', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/experience', label: 'Experience' }, // Removed leading slash from label
    { to: '/education', label: 'Education' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/contact', label: 'Contact' },
  ];

  // Function to handle image loading errors and provide a placeholder (kept for robustness, though image is removed)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop if placeholder also fails
    // Use a themed placeholder image
    target.src = `https://placehold.co/100x100/${theme.palette.grey[300].substring(1)}/${theme.palette.grey[700].substring(1)}?text=YC`;
  };

  return (
    <>
      {/* Header Bar for Small Screens (Fixed Top Bar) */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' }, // Only show on extra small screens
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed', // Fix the position at the top
          top: 0,
          right: 0,
          left: 0,
          height: '56px', // Standard mobile app bar height
          padding: theme.spacing(0, 2), // Padding on left/right using theme spacing
          backgroundColor: theme.palette.background.paper, // Themed background color
          boxShadow: theme.shadows[2], // Themed shadow for depth
          zIndex: theme.zIndex.appBar, // Ensure it stays on top of other content
        }}
      >
        {/* Title/Brand on Mobile Header */}
        <Typography
          variant="h6"
          component={Link} // Make the title a link to the home page
          to="/"
          sx={{
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 600,
            fontSize: '1.2rem',
            color: theme.palette.text.primary, // Themed text color
            textDecoration: 'none', // Remove default underline for links
          }}
        >
          Yiğit Çelik
        </Typography>
        {/* Right-aligned icons: Theme Toggle and Menu Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Theme Toggle Button for Mobile Header (Icon) */}
            <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
                {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />} {/* Updated Icons */}
            </IconButton>
            {/* Mobile Menu Toggle Icon */}
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ color: theme.palette.text.primary }} // Themed icon color
            >
              <MenuIcon />
            </IconButton>
        </Box>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right" // Drawer slides from the right
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)} // Close when clicking outside
        ModalProps={{
          keepMounted: true, // Optimizes performance by keeping children mounted
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, // Only show on extra small screens
          '& .MuiDrawer-paper': { // Styles for the actual drawer paper
            width: '70%', // Adjust width as needed for mobile
            boxSizing: 'border-box',
            marginTop: '56px', // Offset for the fixed mobile header bar
            backgroundColor: theme.palette.background.paper, // Themed background
            color: theme.palette.text.primary, // Themed text color
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: theme.spacing(3), // Padding using theme spacing
            color: theme.palette.text.primary, // Ensure content within drawer uses theme text color
          }}
        >
          {/* Profile Image and Name in Mobile Drawer - REMOVED IMAGE */}
          {/* <Box
            component="img"
            src="https://raw.githubusercontent.com/yigitckk/aboutMe/main/Gemini_Generated_Image_pw9wl8pw9wl8pw9w%20(1).png" // NEW IMAGE URL
            alt="Yiğit Çelik"
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              margin: '20px auto',
              border: `3px solid ${theme.palette.primary.main}`, // Themed border color
            }}
            onError={handleImageError} // Add error handler
          /> */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              textAlign: 'center',
              color: theme.palette.text.primary, // Themed text color
              marginBottom: theme.spacing(2), // Margin using theme spacing
            }}
          >
            Yiğit Çelik
          </Typography>

          {/* Navigation Links in Mobile Drawer */}
          <List sx={{ width: '100%' }}>
            {navItems.map(({ to, label }) => (
              <ListItem
                key={to}
                component={Link} // Use Link for routing
                to={to}
                onClick={() => setIsMobileMenuOpen(false)} // Close drawer on navigation
                sx={{ padding: 0 }}
              >
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    padding: theme.spacing(1, 2), // Padding using theme spacing
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <ListItemText primary={label} sx={{ color: 'inherit' }} /> {/* Inherit color from Button */}
                </Button>
              </ListItem>
            ))}
            {/* Theme Toggle Button in Mobile Drawer List (Text) */}
            <ListItem sx={{ padding: 0 }}>
                <Button
                    fullWidth
                    variant="text"
                    onClick={toggleTheme}
                    sx={{
                        textTransform: 'uppercase',
                        justifyContent: 'center',
                        padding: theme.spacing(1, 2),
                        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: theme.palette.text.primary, // Ensure text color is themed
                    }}
                >
                    <ListItemText primary={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'} sx={{ color: 'inherit' }} />
                </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Permanent Sidebar for Larger Screens */}
      <Drawer
        variant="permanent" // Always visible on larger screens
        sx={{
          display: { xs: 'none', sm: 'block' }, // Only show on small and larger screens
          width: 240, // Fixed width for the sidebar
          flexShrink: 0, // Prevents sidebar from shrinking
          '& .MuiDrawer-paper': { // Styles for the actual drawer paper
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper, // Themed background
            color: theme.palette.text.primary, // Themed text color
            boxShadow: theme.shadows[3], // Add a shadow to the sidebar
          },
        }}
      >
        {/* Header Box for Permanent Sidebar - Contains Name and Toggle only */}
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: theme.spacing(2, 2), // Padding for the header
                backgroundColor: theme.palette.background.paper, // Match sidebar background
                borderBottom: `1px solid ${theme.palette.divider}`, // Subtle divider
            }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontWeight: 600,
              fontSize: '1.2rem',
              color: theme.palette.text.primary,
            }}
          >
            Yiğit Çelik
          </Typography>
          {/* Theme Toggle Button for Desktop (Icon) */}
          <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />} {/* Updated Icons */}
          </IconButton>
        </Box>

        {/* Profile Image - Positioned between header and navigation - REMOVED */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: theme.spacing(4), // Increased vertical padding to move image further down
          }}
        >
          <Box
            component="img"
            src="https://raw.githubusercontent.com/yigitckk/aboutMe/main/Gemini_Generated_Image_pw9wl8pw9wl8pw9w%20(1).png" // NEW IMAGE URL
            alt="Yiğit Çelik"
            sx={{
              width: 100, // Image size
              height: 100,
              borderRadius: '50%',
              border: `3px solid ${theme.palette.primary.main}`, // Themed border
            }}
            onError={handleImageError} // Add error handler
          />
        </Box> */}

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center navigation links vertically
            padding: theme.spacing(2), // Padding around the navigation list
            color: theme.palette.text.primary,
          }}
        >
          {/* Navigation Links in Permanent Sidebar */}
          <List sx={{ width: '100%' }}>
            {navItems.map(({ to, label }) => (
              <ListItem key={to} component={Link} to={to} sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    padding: theme.spacing(1, 2),
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <ListItemText primary={label} sx={{ color: 'inherit' }} />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
