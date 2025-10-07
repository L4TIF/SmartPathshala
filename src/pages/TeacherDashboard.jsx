import React from 'react'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/Footer'

const TeacherDashboard = () => {
    return (
        <>
            <div><Navbar /></div>
            <section className="h-auto bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Dashboard</h1>
                    <p className="text-gray-600 mb-6">Welcome! This is a placeholder dashboard. You can put class management, content upload, and analytics here.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow p-5">
                            <h3 className="font-semibold text-gray-800">Your Courses</h3>
                            <p className="text-sm text-gray-600 mt-1">Manage modules and lessons.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-5">
                            <h3 className="font-semibold text-gray-800">Assignments</h3>
                            <p className="text-sm text-gray-600 mt-1">Create and review assignments.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-5">
                            <h3 className="font-semibold text-gray-800">Analytics</h3>
                            <p className="text-sm text-gray-600 mt-1">Track student progress.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div><Footer /></div>
        </>
    )
}

export default TeacherDashboard


