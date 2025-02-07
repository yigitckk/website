import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material';

const NavBar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
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
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Profile Image */}
        <Box
          component="img"
          src="https://media.licdn.com/dms/image/v2/D4D03AQGxhiie3LlbfA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698944242542?e=1744243200&v=beta&t=XMTEViUHZh-hfVRqzc9VFlxLZQVIiPvQEhtUcvDr_jE"
          alt="Yiğit Çelik"
          sx={{
            width: 150,
            height: 150,
            borderRadius: '70%',
            display: 'block',
            margin: '0 auto 16px auto', // Added bottom margin for spacing
          }}
        />
        {/* Name Typography */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Modern font
            fontWeight: 600, // Bold font weight
            fontSize: '1.2rem', // Slightly larger font size
            textAlign: 'center', // Center-align text
            color: '#333', // Dark gray for contrast
            marginBottom: 2, // Add spacing below the name
          }}
        >
          Yiğit Çelik
        </Typography>
        {/* Navigation List */}
        <List>
          {[
            { to: '/', label: 'About' },
            { to: '/blog', label: 'Blog' },
            { to: '/experience', label: 'Experience' },
            { to: '/education', label: 'Education' },
            { to: '/certifications', label: 'Certifications' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <ListItem key={to} component={RouterLink} to={to} sx={{ padding: 0 }}>
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
                  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Consistent font
                  fontSize: '0.9rem', // Smaller font size for buttons
                  fontWeight: 500, // Medium font weight
                }}
              >
                <ListItemText primary={label} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default NavBar;