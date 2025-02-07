import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Link } from '@mui/material';

const Education: React.FC = () => {
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
        p: { xs: 2, sm: 3 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content
        mt: { xs: '60px', sm: '80px' }, // Add margin top to account for the fixed header
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: 4,
        }}
      >
        Education
      </Typography>
      {educations.map((edu, index) => (
        <Card
          key={index}
          sx={{
            mb: 3,
            transition: 'transform 0.3s ease', // Smooth hover effect
            '&:hover': {
              transform: 'scale(1.02)', // Slightly enlarge on hover
            },
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{
                width: { xs: 100, sm: 151 }, // Responsive width for images
                height: { xs: 100, sm: 151 }, // Responsive height
                objectFit: 'contain', // Ensure the image fits within the container
                mr: { xs: 2, sm: 3 }, // Margin right for spacing
              }}
              image={edu.logo}
              alt={edu.institution}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                  fontWeight: 'bold',
                }}
              >
                {edu.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: 1,
                }}
              >
                {edu.institution}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                  mt: 1,
                }}
              >
                {edu.duration}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: 2,
                  lineHeight: 1.6, // Improve readability
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