import React, { useState } from 'react'
import { ID } from 'appwrite'
import { account } from '../../lib/appwrite'
import { useNavigate } from 'react-router-dom'

const TeacherAuth = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setLoading(true)
        try {
            if (mode === 'signup') {
                await account.create(ID.unique(), form.email, form.password, form.name || undefined)
                await account.createEmailPasswordSession(form.email, form.password)
                setMessage('Signup successful. You are now logged in.')
            } else {
                await account.createEmailPasswordSession(form.email, form.password)
                setMessage('Login successful.')
            }
            // Optional: redirect to modules after a short delay
            setTimeout(() => navigate('/teacher-dashboard'), 500)
        } catch (err) {
            setError(err?.message || 'Authentication failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="teacher-auth" className="bg-white py-12 px-6">
            <div className="max-w-2xl mx-auto bg-gray-50 border rounded-xl p-6 shadow-sm">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`px-4 py-2 rounded-l-lg border ${mode === 'login' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}
                    >
                        Teacher Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`px-4 py-2 rounded-r-lg border-t border-r border-b ${mode === 'signup' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}
                    >
                        Teacher Signup
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Your name"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Create Account')}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
                )}
                {message && (
                    <p className="mt-4 text-center text-green-600 text-sm">{message}</p>
                )}
            </div>
        </section>
    )
}

export default TeacherAuth


