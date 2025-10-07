import React from 'react';
import Navbar from '../home/navbar';
import Footer from '../home/Footer';

const StudentLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default StudentLayout;
