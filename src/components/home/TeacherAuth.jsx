import React, { useState } from 'react'

const TeacherAuth = () => {
    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (mode === 'login') {
            setMessage(`Logged in as ${form.email} (mock)`) // mock only
        } else {
            setMessage(`Account created for ${form.email} (mock)`) // mock only
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
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {mode === 'login' ? 'Login' : 'Create Account'}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-green-600 text-sm">{message}</p>
                )}
            </div>
        </section>
    )
}

export default TeacherAuth


