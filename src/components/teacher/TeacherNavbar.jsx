import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../../lib/appwrite'

const TeacherNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [checking, setChecking] = useState(true)
    const [isAuthed, setIsAuthed] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        account.get()
            .then(() => { if (mounted) { setIsAuthed(true); setChecking(false) } })
            .catch(() => { if (mounted) { setIsAuthed(false); setChecking(false) } })
        return () => { mounted = false }
    }, [])

    const handleLogout = async () => {
        await account.deleteSession('current')
        navigate('/')
    }

    return (
        <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/teacher-dashboard" className="text-2xl font-bold">SmartPathshala • Teacher</Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/teacher-dashboard" className="hover:underline">Dashboard</Link>
                        {/* <Link to="/modules" className="hover:underline">Modules</Link> */}
                        {!checking && (
                            isAuthed ? (
                                <button onClick={handleLogout} className="px-4 py-1.5 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition">Logout</button>
                            ) : (
                                <Link to="/teacher-auth" className="px-4 py-1.5 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition">Login</Link>
                            )
                        )}
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">{isOpen ? '✖' : '☰'}</button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-indigo-700">
                    <Link to="/teacher-dashboard" className="block px-4 py-2 hover:bg-indigo-800">Dashboard</Link>
                    <Link to="/modules" className="block px-4 py-2 hover:bg-indigo-800">Modules</Link>
                    {!checking && (
                        isAuthed ? (
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-indigo-800">Logout</button>
                        ) : (
                            <Link to="/teacher-auth" className="block px-4 py-2 hover:bg-indigo-800">Login</Link>
                        )
                    )}
                </div>
            )}
        </nav>
    )
}

export default TeacherNavbar


