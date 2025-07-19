import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About Yiğit Çelik
      </Typography>
      <Box
        component="img"
        src="https://media.licdn.com/dms/image/v2/D4D03AQGxhiie3LlbfA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698944242542?e=1744243200&v=beta&t=XMTEViUHZh-hfVRqzc9VFlxLZQVIiPvQEhtUcvDr_jE"
        alt="Yiğit Çelik"
        sx={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          display: 'block',
          margin: '0 auto 20px auto'
        }}
      />
      <Box textAlign="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/yigitckk/aboutMe/blob/main/YiğitÇelikcv.pdf"
          target="_blank"
          rel="noopener"
        >
          Download CV
        </Button>
      </Box>
      <Typography variant="body1" paragraph>
        Yiğit Çelik is a 21-year-old university student based in Türkiye, known for his passion for innovation and problem-solving. With a strong academic foundation and an insatiable curiosity, Yiğit has consistently demonstrated a commitment to personal and professional growth through active participation in both national and international projects. His areas of expertise include mathematics, programming, languages, and philosophy, which he leverages to approach challenges with a unique blend of analytical thinking and creative problem-solving.
      </Typography>
      <Typography variant="body1" paragraph>
        Professionally, Yiğit is skilled in multiple programming languages, including HTML, JavaScript, CSS, C, C#, and is currently expanding his proficiency in Java. His technical acumen, combined with his ability to quickly adapt and resolve complex issues, positions him as a dynamic contributor in any team environment. Beyond his technical skills, Yiğit brings a wealth of cross-cultural experience, having participated in over seven cultural, youth, and student exchange programs under the Erasmus+ initiative. These experiences have honed his interpersonal skills, enabling him to thrive in collaborative settings and engage in meaningful, interactive discussions with individuals from diverse backgrounds.
      </Typography>
      <Typography variant="body1" paragraph>
        Driven by a growth mindset and a desire to create impactful innovations, Yiğit is always eager to embrace new challenges and opportunities. His professional ethos centers on continuous learning and contributing value to the world through his work. Whether developing software solutions, engaging in philosophical discourse, or fostering connections with peers across the globe, Yiğit remains dedicated to making a positive and lasting impact in his field and beyond.
      </Typography>
    </Box>
  );
};

export default About;