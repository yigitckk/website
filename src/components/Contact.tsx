import React from 'react';
import { Box, Typography, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contact: React.FC = () => {
  return (
    <Box
      id="contact"
      sx={{
        p: { xs: 2, sm: 3 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: 4,
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
          mb: 4,
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
            padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
            borderRadius: '8px',
            transition: 'background-color 0.3s ease', // Smooth hover effect
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)', // Light background on hover
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
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
            padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
            borderRadius: '8px',
            transition: 'background-color 0.3s ease', // Smooth hover effect
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)', // Light background on hover
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
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
            padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
            borderRadius: '8px',
            transition: 'background-color 0.3s ease', // Smooth hover effect
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)', // Light background on hover
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
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