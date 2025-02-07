import React from 'react';
import { Box, Typography, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contact: React.FC = () => {
  return (
    <Box id="contact">
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body1">
        You can reach Yiğit Çelik via the following platforms:
      </Typography>
      <List>
        <ListItem component={Link} href="https://www.linkedin.com/in/yigitck/" target="_blank" rel="noopener noreferrer">
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </ListItem>
        <ListItem component={Link} href="https://github.com/yigitckk" target="_blank" rel="noopener noreferrer">
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItem>
        <ListItem component={Link} href="https://x.com/yigit_celik7" target="_blank" rel="noopener noreferrer">
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Contact;