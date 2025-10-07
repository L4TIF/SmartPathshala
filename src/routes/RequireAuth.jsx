import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { account } from '../lib/appwrite'

const RequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isAuthed, setIsAuthed] = useState(false)

    useEffect(() => {
        let mounted = true
        account.get()
            .then(() => { if (mounted) { setIsAuthed(true); setLoading(false) } })
            .catch(() => { if (mounted) { setIsAuthed(false); setLoading(false) } })
        return () => { mounted = false }
    }, [])

    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-gray-600">Checking session…</div>
        )
    }

    if (!isAuthed) {
        return <Navigate to="/teacher-auth" replace />
    }

    return children
}

export default RequireAuth


