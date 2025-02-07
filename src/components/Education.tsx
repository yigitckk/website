import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Education: React.FC = () => {
  return (
    <Box>
      <Card sx={{ display: 'flex', mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Pamukkale_University_logo.svg/200px-Pamukkale_University_logo.svg.png"
          alt="Pamukkale University"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography component="div" variant="h5">
              Industrial Engineering and Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Pamukkale University
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              2022 – 2025
            </Typography>
            <Typography>
            At Pamukkale University , I pursued a diverse and challenging curriculum that honed my technical and analytical skills. I took courses such as Introduction to Programming with Python , Introduction to Databases with MySQL , Linear Algebra , Calculus 1 & 2 , Physics , Operations Research , and Financial Optimization , while also working on numerous projects involving C , Python , and SQL .
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ display: 'flex', mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://upload.wikimedia.org/wikipedia/en/c/cd/PoBia.png"
          alt="Bialystok University of Technology"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography component="div" variant="h5">
              Computer Science and Engineering Management (Exchange Student)
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Bialystok University of Technology
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              2024 & 2025
            </Typography>
            <Typography>
            At Białystok University of Technology, I embraced a diverse and advanced academic curriculum.I took courses such as Data Mining , Mathematical Statistics , Internet of Things (IoT) , Mathematical Calculations with MATLAB , and Object-Oriented Programming with C# , which provided me with a strong foundation in data analysis, statistical modeling, programming, and modern technologies like IoT.

Additionally, I am looking forward to expanding my knowledge further with upcoming courses in Artificial Intelligence (AI) , Excel VBA , Methods of Optimization , Marketing Research , and Survival Polish .
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default Education;