import React from 'react'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/Footer'
import TeacherAuth from '../components/home/TeacherAuth'

const TeacherAuthPage = () => {
    return (
        <>
            <div><Navbar /></div>
            <TeacherAuth />
            <div><Footer /></div>
        </>
    )
}

export default TeacherAuthPage


