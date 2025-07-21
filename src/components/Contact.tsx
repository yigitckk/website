// src/components/Contact.tsx
import React from 'react';
import { Box, Typography, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const Contact: React.FC = () => {
  const theme = useTheme(); // Access the current theme object

  return (
    <Box
      id="contact"
      sx={{
        // Apply themed background and text colors to the main container
        backgroundColor: theme.palette.background.paper, // Use paper background for a card-like effect
        color: theme.palette.text.primary, // Primary text color from theme
        p: { xs: theme.spacing(2), sm: theme.spacing(3) }, // Responsive padding using theme spacing
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content horizontally
        my: theme.spacing(4), // Margin top and bottom using theme spacing
        borderRadius: theme.shape.borderRadius, // Apply theme's border radius
        boxShadow: theme.shadows[3], // Apply a subtle shadow from the theme
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: theme.spacing(4), // Margin bottom using theme spacing
          color: theme.palette.text.primary, // Themed text color
        }}
      >
        Contact
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
          textAlign: 'center',
          mb: theme.spacing(4), // Margin bottom using theme spacing
          color: theme.palette.text.primary, // Themed text color
        }}
      >
        You can reach Yiğit Çelik via the following platforms:
      </Typography>

      {/* Contact List */}
      <List>
        <ListItem
          component={Link}
          href="https://www.linkedin.com/in/yigitck/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.25, 2.5) }, // Responsive padding
            borderRadius: theme.shape.borderRadius, // Themed border radius
            transition: 'background-color 0.3s ease', // Smooth hover effect
            color: theme.palette.text.primary, // Ensure link text color is themed
            '&:hover': {
              backgroundColor: theme.palette.action.hover, // Themed background on hover
              textDecoration: 'none', // Remove underline on hover if not desired
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: theme.spacing(5), color: theme.palette.primary.main }}> {/* Themed icon color */}
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
                  color: 'inherit', // Inherit color from ListItem
                }}
              >
                LinkedIn
              </Typography>
            }
          />
        </ListItem>

        <ListItem
          component={Link}
          href="https://github.com/yigitckk"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.25, 2.5) }, // Responsive padding
            borderRadius: theme.shape.borderRadius, // Themed border radius
            transition: 'background-color 0.3s ease', // Smooth hover effect
            color: theme.palette.text.primary, // Ensure link text color is themed
            '&:hover': {
              backgroundColor: theme.palette.action.hover, // Themed background on hover
              textDecoration: 'none',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: theme.spacing(5), color: theme.palette.primary.main }}> {/* Themed icon color */}
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
                  color: 'inherit', // Inherit color from ListItem
                }}
              >
                GitHub
              </Typography>
            }
          />
        </ListItem>

        <ListItem
          component={Link}
          href="https://x.com/yigit_celik7"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.25, 2.5) }, // Responsive padding
            borderRadius: theme.shape.borderRadius, // Themed border radius
            transition: 'background-color 0.3s ease', // Smooth hover effect
            color: theme.palette.text.primary, // Ensure link text color is themed
            '&:hover': {
              backgroundColor: theme.palette.action.hover, // Themed background on hover
              textDecoration: 'none',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: theme.spacing(5), color: theme.palette.primary.main }}> {/* Themed icon color */}
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
                  color: 'inherit', // Inherit color from ListItem
                }}
              >
                Twitter
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Contact;
