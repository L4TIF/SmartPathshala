import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModules, deleteModule, updateModule } from '../../appwrite/db';
import EditModal from '../../components/teacher/EditModal';

const YourCourses = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editModal, setEditModal] = useState({ isOpen: false, data: null });

    const refreshModules = async () => {
        setError('');
        try {
            const docs = await getModules();
            setModules(docs);
        } catch (e) {
            setError(e?.message || 'Failed to load modules');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshModules();
    }, []);

    const handleEditModule = (module) => {
        setEditModal({ isOpen: true, data: module });
    };

    const handleSaveEdit = async (formData) => {
        try {
            await updateModule(editModal.data.$id, {
                moduleName: formData.title,
                description: formData.content,
                coverImage: formData.imageUrl
            });
            refreshModules();
        } catch (e) {
            setError(e?.message || 'Failed to update course');
        }
    };

    const handleDeleteModule = async (moduleId, moduleName) => {
        if (!window.confirm(`Are you sure you want to delete "${moduleName}"?`)) return;
        try {
            await deleteModule(moduleId);
            setModules(modules.filter(m => m.$id !== moduleId));
        } catch (e) {
            setError(e?.message || 'Failed to delete module');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">Loading your courses...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
                    <Link
                        to="/teacher-dashboard/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Create New Course
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {modules.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-4">No courses created yet</div>
                        <Link
                            to="/teacher-dashboard/create"
                            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Create Your First Course
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module) => (
                            <div key={module.$id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={module.coverImage || `https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(module.moduleName)}`}
                                        alt={module.moduleName}
                                        className="w-16 h-16 object-contain rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1 text-gray-800">{module.moduleName}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">{module.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">By {module.teacher || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link
                                        to={`/teacher-dashboard/courses/${module.$id}`}
                                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                                    >
                                        Open
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditModule(module)}
                                            className="px-3 py-1.5 text-gray-700 border rounded hover:bg-gray-50 transition text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteModule(module.$id, module.moduleName)}
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

                <EditModal
                    isOpen={editModal.isOpen}
                    onClose={() => setEditModal({ isOpen: false, data: null })}
                    onSave={handleSaveEdit}
                    type="module"
                    data={editModal.data}
                />
            </div>
        </div>
    );
};

export default YourCourses;
