import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header Bar for Small Screens */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'flex-end',
          position: 'fixed', // Fix the position
          top: 0, // Align to top
          right: 0, // Align to right
          left: 0, // Stretch across full width
          padding: '10px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          zIndex: 1100, // Ensure it stays above other content
        }}
      >
        <IconButton 
          onClick={toggleMobileMenu} 
          sx={{ 
            color: '#333',
            marginRight: '8px', // Add some right margin
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '70%',
            boxSizing: 'border-box',
            marginTop: '56px', // Add margin top to account for the fixed header
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
          }}
        >
          {/* Profile Image and Name in Mobile Drawer */}
          <Box
            component="img"
            src="https://github.com/yigitckk/aboutMe/blob/main/ChatGPT%20Image%2012%20Tem%202025%2000_02_17.png"
            alt="Yiğit Çelik"
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              margin: '20px auto',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              textAlign: 'center',
              color: '#333',
              marginBottom: 2,
            }}
          >
            Yiğit Çelik
          </Typography>

          {/* Navigation Links */}
          <List>
            {[
              { to: '/', label: 'About' },
              { to: '/blog', label: 'Blog' },
              { to: '/experience', label: 'Experience' },
              { to: '/education', label: 'Education' },
              { to: '/certifications', label: 'Certifications' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <ListItem key={to} component="a" href={to} sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    padding: '10px 20px',
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <ListItemText primary={label} />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Permanent Sidebar for Larger Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Profile Image and Name in Permanent Sidebar */}
          <Box
            component="img"
            src="https://github.com/yigitckk/aboutMe/blob/main/ChatGPT%20Image%2012%20Tem%202025%2000_02_17.png"
            alt="Yiğit Çelik"
            sx={{
              width: 150,
              height: 150,
              borderRadius: '70%',
              display: 'block',
              margin: '0 auto 16px auto',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontWeight: 600,
              fontSize: '1.2rem',
              textAlign: 'center',
              color: '#333',
              marginBottom: 2,
            }}
          >
            Yiğit Çelik
          </Typography>

          {/* Navigation Links */}
          <List>
            {[
              { to: '/', label: 'About' },
              { to: '/blog', label: 'Blog' },
              { to: '/experience', label: 'Experience' },
              { to: '/education', label: 'Education' },
              { to: '/certifications', label: 'Certifications' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <ListItem key={to} component="a" href={to} sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    padding: '10px 20px',
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <ListItemText primary={label} />
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