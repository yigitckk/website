import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Experience: React.FC = () => {
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
        Experience
      </Typography>
      {experiences.map((exp, index) => (
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
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                fontWeight: 'bold',
              }}
            >
              {exp.title}
            </Typography>
            {exp.organization && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: 1,
                }}
              >
                {exp.organization}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                mt: 1,
              }}
            >
              {exp.date}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                mt: 2,
                lineHeight: 1.6, // Improve readability
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