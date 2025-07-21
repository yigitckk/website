// src/components/Experience.tsx
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const Experience: React.FC = () => {
  const theme = useTheme(); // Access the current theme object

  const experiences = [

    {
      title: 'TÜBİTAK 1001 Project Bachelor\'s Scholar',
      organization: 'TÜBİTAK',
      date: '01/10/2024 – 1/02/2025',
      description:
        'I was taking part in an academic optimization project that will last until 2026.I was experiencing the research environment and had a responsibility for recording and summarizing meeting notes, as well as learning how optimization programs are used and problems are solved throughout the process.',
    },
    // Add more experiences here in the future
  ];

  return (
    <Box
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
        Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Card
          key={index}
          sx={{
            mb: theme.spacing(3), // Margin bottom using theme spacing
            transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effects
            backgroundColor: theme.palette.background.paper, // Themed background for the card
            boxShadow: theme.shadows[3], // Themed shadow for the card
            borderRadius: theme.shape.borderRadius, // Themed border radius
            '&:hover': {
              transform: 'scale(1.02)', // Slightly enlarge on hover
              boxShadow: theme.shadows[6], // Stronger shadow on hover
            },
          }}
        >
          <CardContent sx={{ color: theme.palette.text.primary }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                fontWeight: 'bold',
                color: theme.palette.text.primary, // Themed text color
              }}
            >
              {exp.title}
            </Typography>
            {exp.organization && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: theme.spacing(1), // Margin top using theme spacing
                  color: theme.palette.text.secondary, // Themed secondary text color
                }}
              >
                {exp.organization}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                mt: theme.spacing(1), // Margin top using theme spacing
                color: theme.palette.text.secondary, // Themed secondary text color
              }}
            >
              {exp.date}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                mt: theme.spacing(2), // Margin top using theme spacing
                lineHeight: 1.6, // Improve readability
                color: theme.palette.text.primary, // Themed primary text color
              }}
            >
              {exp.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Experience;
