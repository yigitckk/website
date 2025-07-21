// src/pages/index.tsx
import React from 'react';
// Box and useTheme imports are no longer needed if the outer Box is removed
// import { Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

import About from '../components/About';
// Education, Experience, and Contact are now rendered on their own dedicated routes
// and should not be directly imported or rendered here if this is meant to be the 'About' page.

// HomePage now serves primarily as the container for the 'About' page content.
const HomePage: React.FC = () => {
    // theme is no longer needed if the outer Box is removed
    // const theme = useTheme();

    return (
        // The main content Box in App.tsx already handles layout offsets,
        // background color, and text color for the entire content area.
        // The About component itself handles its internal centering and styling.
        <>
            <About />
        </>
    );
};

export default HomePage;
