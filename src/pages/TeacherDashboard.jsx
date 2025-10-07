import React, { useEffect, useState } from 'react'
import TeacherNavbar from '../components/teacher/TeacherNavbar'
import TabsHeader from '../components/teacherDashboard/TabsHeader'
import CoursesGrid from '../components/teacherDashboard/CoursesGrid'
import CreateModuleModal from '../components/teacherDashboard/CreateModuleModal'
import SubmoduleSection from '../components/teacherDashboard/SubmoduleSection'
import Footer from '../components/home/Footer'
import { createModule, createSubModule, getModules, getSubModules, updateModule, deleteModule, updateSubModule, deleteSubModule } from '../appwrite/db'
import { account } from '../lib/appwrite'
import { ID } from 'appwrite'

const TeacherDashboard = () => {
    const [moduleForm, setModuleForm] = useState({ title: '', description: '', coverImage: '' })
    const [subForm, setSubForm] = useState({ moduleId: '', title: '', content: '', imageUrl: '', codeSnippet: '' })
    const [modules, setModules] = useState([])
    const [subPreview, setSubPreview] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('courses') // courses | create | analytics | doubts
    const [teacherName, setTeacherName] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)

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
        refreshModules();
        (async () => {
            try {
                const me = await account.get()
                setTeacherName(me.name || me.email)
            } catch (_) { }
        })()
    }, [])

    const handleCreateModule = async (e) => {
        e.preventDefault()
        console.log(teacherName)
        if (!moduleForm.title.trim()) return
        try {
            const created = await createModule({ moduleName: moduleForm.title, description: moduleForm.description, coverImage: moduleForm.coverImage, teacherName })
            await refreshModules()
            setModuleForm({ title: '', description: '', coverImage: '' })
            setSubForm(prev => ({ ...prev, moduleId: created.$id }))
            setActiveTab('create')
            setShowCreateModal(false)
        } catch (e) {
            setError(e?.message || 'Failed to create module')
        }
    }

    const handleCreateSubmodule = async (e) => {
        e.preventDefault()
        const resourceName = subForm.title.toLowerCase().replace(/ /g, '-') + '.html'
        if (!subForm.moduleId || !subForm.title.trim()) return
        try {
            await createSubModule({
                title: subForm.title,
                content: subForm.content,
                image: subForm.imageUrl || '',
                codeSnippets: subForm.codeSnippet.trim(),
                resourceName: resourceName,
                moduleId: subForm.moduleId,
            })
            const list = await getSubModules(subForm.moduleId)
            setSubPreview(list)
            setSubForm({ moduleId: subForm.moduleId, title: '', content: '', imageUrl: '', codeSnippet: '' })
        } catch (e) {
            setError(e?.message || 'Failed to add submodule')
        }
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
            await updateSubModule(s.$id, { title, content, image: imageUrl, codeSnippets: codeSnippet })
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

                    {activeTab !== 'create' && (
                        <TabsHeader
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onOpenCreateModal={() => { setModuleForm({ title: '', description: '', coverImage: '' }); setShowCreateModal(true) }}
                        />
                    )}

                    {activeTab === 'courses' && (
                        <CoursesGrid
                            modules={modules}
                            loading={loading}
                            onOpen={(m) => setActiveTab('create') || setSubForm(prev => ({ ...prev, moduleId: m.$id }))}
                            onEdit={(m) => handleEditModule(m)}
                            onDelete={(m) => handleDeleteModule(m)}
                        />
                    )}

                    {activeTab === 'create' && (
                        <div className="space-y-6">

                            <SubmoduleSection
                                modules={modules}
                                subForm={subForm}
                                subPreview={subPreview}
                                onChange={handleSubChange}
                                onSubmit={handleCreateSubmodule}
                                onEdit={(s) => handleEditSub(s)}
                                onDelete={(s) => handleDeleteSub(s)}
                            />

                            <div className="flex items-center justify-end">
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Save and Go to Dashboard
                                </button>
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
            <CreateModuleModal
                open={showCreateModal}
                moduleForm={moduleForm}
                onChange={handleModuleChange}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateModule}
            />
            {/* <div><Footer /></div> */}
        </>
    )
}

export default TeacherDashboard


