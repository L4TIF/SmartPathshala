import React, { useEffect, useState } from 'react'
import TeacherNavbar from '../components/teacher/TeacherNavbar'
import Footer from '../components/home/Footer'
import { createModule, createSubModule, getModules, getSubModules, updateModule, deleteModule, updateSubModule, deleteSubModule } from '../appwrite/db'

const TeacherDashboard = () => {
    const [moduleForm, setModuleForm] = useState({ title: '', description: '' })
    const [subForm, setSubForm] = useState({ moduleId: '', title: '', content: '', imageUrl: '', codeSnippet: '' })
    const [modules, setModules] = useState([])
    const [subPreview, setSubPreview] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('courses') // courses | create | analytics | doubts

    const refreshModules = async () => {
        setError('')
        try {
            const docs = await getModules()
            setModules(docs)
        } catch (e) {
            setError(e?.message || 'Failed to load modules')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshModules()
    }, [])

    const handleCreateModule = async (e) => {
        e.preventDefault()
        if (!moduleForm.title.trim()) return
        try {
            const created = await createModule({ moduleName: moduleForm.title, description: moduleForm.description })
            await refreshModules()
            setModuleForm({ title: '', description: '' })
            setSubForm(prev => ({ ...prev, moduleId: created.$id }))
        } catch (e) {
            setError(e?.message || 'Failed to create module')
        }
    }

    const handleCreateSubmodule = async (e) => {
        e.preventDefault()
        if (!subForm.moduleId || !subForm.title.trim()) return
        try {
            await createSubModule({
                moduleId: subForm.moduleId,
                title: subForm.title,
                content: subForm.content,
                imageUrl: subForm.imageUrl,
                codeSnippet: subForm.codeSnippet,
                resourceName: `${subForm.title}.html`,
            })
            const list = await getSubModules(subForm.moduleId)
            setSubPreview(list)
            setSubForm({ moduleId: subForm.moduleId, title: '', content: '', imageUrl: '', codeSnippet: '' })
        } catch (e) {
            setError(e?.message || 'Failed to add submodule')
        }

        const handleEditModule = async (m) => {
            const moduleName = prompt('Edit module title', m.moduleName)
            if (moduleName === null) return
            const description = prompt('Edit description', m.description || '')
            try {
                await updateModule(m.$id, { moduleName, description })
                await refreshModules()
            } catch (e) { setError(e?.message || 'Failed to update module') }
        }

        const handleDeleteModule = async (m) => {
            if (!confirm('Delete this module?')) return
            try {
                await deleteModule(m.$id)
                await refreshModules()
                if (subForm.moduleId === m.$id) setSubPreview([])
            } catch (e) { setError(e?.message || 'Failed to delete module') }
        }

        const handleEditSub = async (s) => {
            const title = prompt('Edit submodule title', s.title)
            if (title === null) return
            const content = prompt('Edit content', s.content || '')
            const imageUrl = prompt('Edit image URL', s.imageUrl || '')
            const codeSnippet = prompt('Edit code snippet', s.codeSnippet || '')
            try {
                await updateSubModule(s.$id, { title, content, imageUrl, codeSnippet })
                if (subForm.moduleId) setSubPreview(await getSubModules(subForm.moduleId))
            } catch (e) { setError(e?.message || 'Failed to update submodule') }
        }

        const handleDeleteSub = async (s) => {
            if (!confirm('Delete this submodule?')) return
            try {
                await deleteSubModule(s.$id)
                if (subForm.moduleId) setSubPreview(await getSubModules(subForm.moduleId))
            } catch (e) { setError(e?.message || 'Failed to delete submodule') }
        }
    }

    const handleModuleChange = (e) => {
        const { name, value } = e.target
        setModuleForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubChange = (e) => {
        const { name, value } = e.target
        setSubForm(prev => ({ ...prev, [name]: value }))
        if (name === 'moduleId' && value) {
            ; (async () => {
                try { setSubPreview(await getSubModules(value)) } catch (_) { }
            })()
        }
    }

    return (
        <>
            <div><TeacherNavbar /></div>
            <section className="h-auto bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Dashboard</h1>
                    <p className="text-gray-600 mb-6">Manage your courses, create content, view analytics, and handle doubts.</p>

                    {error && (<div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded">{error}</div>)}

                    <div className="mb-6 flex flex-wrap gap-2">
                        <button onClick={() => setActiveTab('courses')} className={`px-4 py-2 rounded-lg border ${activeTab === 'courses' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Your Courses</button>
                        <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded-lg border ${activeTab === 'create' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Create Course</button>
                        <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg border ${activeTab === 'analytics' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Analytics</button>
                        <button onClick={() => setActiveTab('doubts')} className={`px-4 py-2 rounded-lg border ${activeTab === 'doubts' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Doubts</button>
                    </div>

                    {activeTab === 'courses' && (
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Your Courses</h3>
                            {loading ? (
                                <p className="text-gray-600">Loading…</p>
                            ) : modules.length === 0 ? (
                                <p className="text-gray-600">No courses yet. Create one in the Create Course tab.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {modules.map(m => (
                                        <div key={m.$id} className="border rounded-xl p-4 hover:shadow transition flex flex-col gap-3">
                                            <div>
                                                <div className="font-semibold text-gray-800">{m.moduleName}</div>
                                                <div className="text-sm text-gray-600 line-clamp-3 mt-1">{m.description}</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-auto">
                                                <button onClick={() => setActiveTab('create') || setSubForm(prev => ({ ...prev, moduleId: m.$id }))} className="px-3 py-1.5 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 text-sm">Open</button>
                                                <button onClick={() => handleEditModule(m)} className="px-3 py-1.5 text-gray-700 border rounded-lg hover:bg-gray-50 text-sm">Edit</button>
                                                <button onClick={() => handleDeleteModule(m)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'create' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Create Module</h3>
                                <form onSubmit={handleCreateModule} className="space-y-3">
                                    <input name="title" value={moduleForm.title} onChange={handleModuleChange} placeholder="Module title" className="w-full border rounded-lg px-3 py-2" required />
                                    <textarea name="description" value={moduleForm.description} onChange={handleModuleChange} placeholder="Module description" className="w-full border rounded-lg px-3 py-2 min-h-[90px]" />
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Create Module</button>
                                </form>
                            </div>

                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Add Submodule</h3>
                                <form onSubmit={handleCreateSubmodule} className="space-y-3">
                                    <select name="moduleId" value={subForm.moduleId} onChange={handleSubChange} className="w-full border rounded-lg px-3 py-2" required>
                                        <option value="">Select module</option>
                                        {modules.map(m => (<option key={m.$id} value={m.$id}>{m.moduleName}</option>))}
                                    </select>
                                    <input name="title" value={subForm.title} onChange={handleSubChange} placeholder="Submodule title" className="w-full border rounded-lg px-3 py-2" required />
                                    <textarea name="content" value={subForm.content} onChange={handleSubChange} placeholder="Content (supports new lines)" className="w-full border rounded-lg px-3 py-2 min-h-[120px]" />
                                    <input name="imageUrl" value={subForm.imageUrl} onChange={handleSubChange} placeholder="Image URL" className="w-full border rounded-lg px-3 py-2" />
                                    <textarea name="codeSnippet" value={subForm.codeSnippet} onChange={handleSubChange} placeholder="Code snippet" className="w-full border rounded-lg px-3 py-2 min-h-[100px] font-mono" />
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Add Submodule</button>
                                </form>

                                {subForm.moduleId && (
                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-800 mb-2">Submodules for selected module</h4>
                                        <div className="space-y-2">
                                            {subPreview.length === 0 ? (
                                                <p className="text-sm text-gray-500">No submodules yet.</p>
                                            ) : (
                                                subPreview.map(s => (
                                                    <div key={s.$id} className="flex items-center justify-between border rounded-lg p-3">
                                                        <div>
                                                            <div className="font-medium text-gray-800 text-sm">{s.title}</div>
                                                            <div className="text-xs text-gray-500 line-clamp-1">{s.content}</div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button onClick={() => handleEditSub(s)} className="px-2 py-1 text-gray-700 border rounded hover:bg-gray-50 text-xs">Edit</button>
                                                            <button onClick={() => handleDeleteSub(s)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Delete</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Analytics</h3>
                            <p className="text-gray-600">Coming soon: course views, lesson completion, exam stats.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                <div className="border rounded-xl p-4">
                                    <div className="text-sm text-gray-500">Total Courses</div>
                                    <div className="text-2xl font-bold">{modules.length}</div>
                                </div>
                                <div className="border rounded-xl p-4">
                                    <div className="text-sm text-gray-500">Students</div>
                                    <div className="text-2xl font-bold">-</div>
                                </div>
                                <div className="border rounded-xl p-4">
                                    <div className="text-sm text-gray-500">Avg. Score</div>
                                    <div className="text-2xl font-bold">-</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'doubts' && (
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Doubts</h3>
                            <p className="text-gray-600">Coming soon: list of student doubts and replies.</p>
                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                <li className="border rounded-lg p-3">No doubts yet.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </section>
            <div><Footer /></div>
        </>
    )
}

export default TeacherDashboard


