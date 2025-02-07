import React from 'react';

import NavBar from '../components/NavBar';
import About from '../components/About';
import Education from '../components/Education';
import Experience from '../components/Experience';

import Contact from '../components/Contact';

const HomePage: React.FC = () => {
    return (
        <div>
            
            <NavBar />
            <About />
            <Education />
            <Experience />
            
            <Contact />
        </div>
    );
};

export default HomePage;
