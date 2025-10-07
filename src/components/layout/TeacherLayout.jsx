import React from 'react';
import TeacherNavbar from '../teacher/TeacherNavbar';
import Footer from '../home/Footer';

const TeacherLayout = ({ children }) => {
    return (
        <>
            <TeacherNavbar />
            {children}
            <Footer />
        </>
    );
};

export default TeacherLayout;
