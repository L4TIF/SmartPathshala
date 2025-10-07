import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubModules, createSubModule, updateSubModule, deleteSubModule } from '../../appwrite/db';
import EditModal from '../../components/teacher/EditModal';

const EditCourse = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [submodules, setSubmodules] = useState([]);
    const [subForm, setSubForm] = useState({ title: '', content: '', imageUrl: '', codeSnippet: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editModal, setEditModal] = useState({ isOpen: false, data: null });

    useEffect(() => {
        loadSubmodules();
    }, [moduleId]);

    const loadSubmodules = async () => {
        try {
            const subs = await getSubModules(moduleId);
            setSubmodules(subs);
        } catch (e) {
            setError(e?.message || 'Failed to load lessons');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSubmodule = async (e) => {
        e.preventDefault();
        if (!subForm.title.trim()) return;
        try {
            const resourceName = subForm.title.toLowerCase().replace(/ /g, '-') + '.html';
            await createSubModule({
                title: subForm.title,
                content: subForm.content,
                image: subForm.imageUrl || '',
                codeSnippets: subForm.codeSnippet.trim(),
                resourceName: resourceName,
                moduleId: moduleId,
            });
            loadSubmodules();
            setSubForm({ title: '', content: '', imageUrl: '', codeSnippet: '' });
            setError('');
        } catch (e) {
            setError(e?.message || 'Failed to add lesson');
        }
    };

    const handleEditSub = (sub) => {
        setEditModal({ isOpen: true, data: sub });
    };

    const handleSaveEdit = async (formData) => {
        try {
            await updateSubModule(editModal.data.$id, {
                title: formData.title,
                content: formData.content,
                image: formData.imageUrl,
                codeSnippets: formData.codeSnippet
            });
            loadSubmodules();
        } catch (e) {
            setError(e?.message || 'Failed to update lesson');
        }
    };

    const handleDeleteSub = async (sub) => {
        if (!window.confirm(`Are you sure you want to delete "${sub.title}"?`)) return;
        try {
            await deleteSubModule(sub.$id);
            loadSubmodules();
        } catch (e) {
            setError(e?.message || 'Failed to delete lesson');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">Loading course editor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(`/teacher-dashboard/courses/${moduleId}`)}
                        className="text-indigo-600 hover:text-indigo-700 transition"
                    >
                        ← Back to Course
                    </button>
                    <button
                        onClick={() => navigate('/teacher-dashboard/courses')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Save and Go to Courses
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Course</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Lesson</h2>
                        <form onSubmit={handleCreateSubmodule} className="space-y-3">
                            <input
                                name="title"
                                value={subForm.title}
                                onChange={(e) => setSubForm({ ...subForm, [e.target.name]: e.target.value })}
                                placeholder="Lesson title"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                            <textarea
                                name="content"
                                value={subForm.content}
                                onChange={(e) => setSubForm({ ...subForm, [e.target.name]: e.target.value })}
                                placeholder="Lesson content"
                                className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
                            />
                            <input
                                name="imageUrl"
                                value={subForm.imageUrl}
                                onChange={(e) => setSubForm({ ...subForm, [e.target.name]: e.target.value })}
                                placeholder="Image URL (optional)"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <textarea
                                name="codeSnippet"
                                value={subForm.codeSnippet}
                                onChange={(e) => setSubForm({ ...subForm, [e.target.name]: e.target.value })}
                                placeholder="Code snippet (optional)"
                                className="w-full border rounded-lg px-3 py-2 min-h-[100px] font-mono"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Add Lesson
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Lessons</h2>
                        {submodules.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No lessons added yet
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {submodules.map((sub) => (
                                    <div key={sub.$id} className="flex items-center justify-between border rounded-lg p-3">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800 text-sm">{sub.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{sub.content}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditSub(sub)}
                                                className="px-2 py-1 text-gray-700 border rounded hover:bg-gray-50 text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSub(sub)}
                                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal({ isOpen: false, data: null })}
                onSave={handleSaveEdit}
                type="submodule"
                data={editModal.data}
            />
        </div>
    );
};

export default EditCourse;
