import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubModules, updateSubModule, deleteSubModule } from '../../appwrite/db';
import EditModal from '../../components/teacher/EditModal';

const CourseDetail = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [submodules, setSubmodules] = useState([]);
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
                    <div className="text-center">Loading course details...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigate('/teacher-dashboard/courses')}
                            className="text-indigo-600 hover:text-indigo-700 transition"
                        >
                            ← Back to Courses
                        </button>
                        <Link
                            to={`/teacher-dashboard/courses/${moduleId}/edit`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Edit Course
                        </Link>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    )}

                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Course Lessons</h1>

                    {submodules.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-4">No lessons added yet</div>
                            <Link
                                to={`/teacher-dashboard/courses/${moduleId}/edit`}
                                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Add Lessons
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {submodules.map((sub) => (
                                <div key={sub.$id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{sub.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{sub.content}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Lesson</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditSub(sub)}
                                                className="px-3 py-1.5 text-gray-700 border rounded hover:bg-gray-50 transition text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSub(sub)}
                                                className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <EditModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal({ isOpen: false, data: null })}
                onSave={handleSaveEdit}
                type="submodule"
                data={editModal.data}
            />
        </>
        
    );
 };

export default CourseDetail;
