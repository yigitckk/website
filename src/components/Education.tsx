// src/components/Education.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const Education: React.FC = () => {
  const theme = useTheme(); // Access the current theme object

  const educations = [
    {
      title: 'Industrial Engineering and Management',
      institution: 'Pamukkale University',
      duration: '2022 – 2025',
      description:
        'At Pamukkale University, I pursued a diverse and challenging curriculum that honed my technical and analytical skills. I took courses such as Introduction to Programming with Python, Introduction to Databases with MySQL, Linear Algebra, Calculus 1 & 2, Physics, Operations Research, and Financial Optimization, while also working on numerous projects involving C, Python, and SQL.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Pamukkale_University_logo.svg/200px-Pamukkale_University_logo.svg.png',
    },
    {
      title: 'Computer Science and Engineering Management (Exchange Student)',
      institution: 'Białystok University of Technology',
      duration: '2024 & 2025',
      description:
        'At Białystok University of Technology, I embraced a diverse and advanced academic curriculum. I took courses such as Data Mining, Mathematical Statistics, Internet of Things (IoT), Mathematical Calculations with MATLAB, and Object-Oriented Programming with C#, which provided me with a strong foundation in data analysis, statistical modeling, programming, and modern technologies like IoT. Additionally, I am looking forward to expanding my knowledge further with upcoming courses in Artificial Intelligence (AI), Excel VBA, Methods of Optimization, Marketing Research, and Survival Polish.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/cd/PoBia.png',
    },


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
        Education
      </Typography>
      {educations.map((edu, index) => (
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
          <CardContent sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}>
            <CardMedia
              component="img"
              sx={{
                width: { xs: 100, sm: 151 }, // Responsive width for images
                height: { xs: 100, sm: 151 }, // Responsive height
                objectFit: 'contain', // Ensure the image fits within the container
                mr: { xs: theme.spacing(2), sm: theme.spacing(3) }, // Margin right for spacing
                // Add a subtle border to images if desired, themed
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
              }}
              image={edu.logo}
              alt={edu.institution}
              // Fallback for broken images
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = `https://placehold.co/151x151/${theme.palette.grey[300].substring(1)}/${theme.palette.grey[700].substring(1)}?text=Logo`;
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                  fontWeight: 'bold',
                  color: theme.palette.text.primary, // Themed text color
                }}
              >
                {edu.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: theme.spacing(1), // Margin top using theme spacing
                  color: theme.palette.text.secondary, // Themed secondary text color
                }}
              >
                {edu.institution}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                  mt: theme.spacing(1), // Margin top using theme spacing
                  color: theme.palette.text.secondary, // Themed secondary text color
                }}
              >
                {edu.duration}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: theme.spacing(2), // Margin top using theme spacing
                  lineHeight: 1.6, // Improve readability
                  color: theme.palette.text.primary, // Themed primary text color
                }}
              >
                {edu.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Education;
