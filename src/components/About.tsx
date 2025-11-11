// src/components/About.tsx
import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

const About: React.FC = () => {
  const theme = useTheme();

  // Function to handle image loading errors and provide a placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop if placeholder also fails
    // Use a themed placeholder image
    target.src = `https://placehold.co/300x300/${theme.palette.grey[300].substring(1)}/${theme.palette.grey[700].substring(1)}?text=YC`;
  };

  return (
    <Box
      sx={{
        // Full width container - remove centering flex and let it fill naturally
        width: '100%',
        py: theme.spacing(2),
        // Remove px padding since App.tsx already handles it
      }}
    >
      <Box
        sx={{
          // Content container - center this within the available space
          width: '100%',
          maxWidth: '1700px', // Increased max width since we have more space
          margin: '10 auto', // Center horizontally
          color: theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{
          color: theme.palette.text.primary,
          mb: theme.spacing(3),
        }}>
          About Yiğit Çelik
        </Typography>

        <Box
          component="img"
          src="" // NEW IMAGE URL
          alt="Yiğit Çelik"
          sx={{
            width: { xs: 200, sm: 250, md: 300 }, // Responsive image size
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: '50%',
            display: 'block',
            margin: '0 auto',
            mb: theme.spacing(3),
            
            boxShadow: theme.shadows[6],
          }}
          onError={handleImageError} // Add error handler
        />

        <Box textAlign="center" mb={theme.spacing(4)}>
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/yigitckk/aboutMe/blob/main/YiğitÇelikcv.pdf"
            target="_blank"
            rel="noopener"
            sx={{
              color: theme.palette.primary.contrastText,
              padding: theme.spacing(1.5, 3),
              fontSize: '1rem',
            }}
          >
            Download CV
          </Button>
        </Box>

        <Box sx={{ textAlign: 'left' }}> {/* Left-aligned text container */}
          <Typography variant="body1" paragraph sx={{
            color: theme.palette.text.primary,
            textAlign: 'justify',
            lineHeight: 1.8,
            mb: theme.spacing(3),
            fontSize: { xs: '0.95rem', sm: '1rem' }, // Responsive font size
          }}>
            Yiğit Çelik is a 21-year-old university student based in Türkiye, known for his passion for innovation and problem-solving. With a strong academic foundation and an insatiable curiosity, Yiğit has consistently demonstrated a commitment to personal and professional growth through active participation in both national and international projects. His areas of expertise include mathematics, programming, languages, and philosophy, which he leverages to approach challenges with a unique blend of analytical thinking and creative problem-solving.
          </Typography>

          <Typography variant="body1" paragraph sx={{
            color: theme.palette.text.primary,
            textAlign: 'justify',
            lineHeight: 1.8,
            mb: theme.spacing(3),
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}>
            Professionally, Yiğit is skilled in multiple programming languages, including HTML, JavaScript, CSS, C, C#, and is currently expanding his proficiency in Java. His technical acumen, combined with his ability to quickly adapt and resolve complex issues, positions him as a dynamic contributor in any team environment. Beyond his technical skills, Yiğit brings a wealth of cross-cultural experience, having participated in over seven cultural, youth, and student exchange programs under the Erasmus+ initiative. These experiences have honed his interpersonal skills, enabling him to thrive in collaborative settings and engage in meaningful, interactive discussions with individuals from diverse backgrounds.
          </Typography>

          <Typography variant="body1" paragraph sx={{
            color: theme.palette.text.primary,
            textAlign: 'justify',
            lineHeight: 1.8,
            mb: theme.spacing(0),
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}>
            Driven by a growth mindset and a desire to create impactful innovations, Yiğit is always eager to embrace new challenges and opportunities. His professional ethos centers on continuous learning and contributing value to the world through his work. Whether developing software solutions, engaging in philosophical discourse, or fostering connections with peers across the globe, Yiğit remains dedicated to making a positive and lasting impact in his field and beyond.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
