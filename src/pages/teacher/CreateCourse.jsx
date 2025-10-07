import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createModule, createSubModule, getSubModules } from '../../appwrite/db';
import { account } from '../../lib/appwrite';

const CreateCourse = () => {
    const [moduleForm, setModuleForm] = useState({ title: '', description: '', coverImage: '' });
    const [subForm, setSubForm] = useState({ title: '', content: '', imageUrl: '', codeSnippet: '' });
    const [subPreview, setSubPreview] = useState([]);
    const [createdModuleId, setCreatedModuleId] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const me = await account.get();
                setTeacherName(me.name || me.email);
            } catch (_) { }
        })();
    }, []);

    const handleCreateModule = async (e) => {
        e.preventDefault();
        if (!moduleForm.title.trim()) return;
        try {
            const created = await createModule({
                moduleName: moduleForm.title,
                description: moduleForm.description,
                coverImage: moduleForm.coverImage,
                teacherName
            });
            setCreatedModuleId(created.$id);
            setError('');
        } catch (e) {
            setError(e?.message || 'Failed to create module');
        }
    };

    const handleCreateSubmodule = async (e) => {
        e.preventDefault();
        if (!createdModuleId || !subForm.title.trim()) return;
        try {
            const resourceName = subForm.title.toLowerCase().replace(/ /g, '-') + '.html';
            await createSubModule({
                title: subForm.title,
                content: subForm.content,
                image: subForm.imageUrl || '',
                codeSnippets: subForm.codeSnippet.trim(),
                resourceName: resourceName,
                moduleId: createdModuleId,
            });
            const list = await getSubModules(createdModuleId);
            setSubPreview(list);
            setSubForm({ title: '', content: '', imageUrl: '', codeSnippet: '' });
            setError('');
        } catch (e) {
            setError(e?.message || 'Failed to add submodule');
        }
    };

    const handleFinish = () => {
        navigate('/teacher-dashboard/courses');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Course</h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {!createdModuleId ? (
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Course Details</h2>
                        <form onSubmit={handleCreateModule} className="space-y-4">
                            <input
                                name="title"
                                value={moduleForm.title}
                                onChange={(e) => setModuleForm({ ...moduleForm, [e.target.name]: e.target.value })}
                                placeholder="Course title"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                            <textarea
                                name="description"
                                value={moduleForm.description}
                                onChange={(e) => setModuleForm({ ...moduleForm, [e.target.name]: e.target.value })}
                                placeholder="Course description"
                                className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                            />
                            <input
                                name="coverImage"
                                value={moduleForm.coverImage}
                                onChange={(e) => setModuleForm({ ...moduleForm, [e.target.name]: e.target.value })}
                                placeholder="Cover image URL (optional)"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Create Course
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Add Lessons</h2>
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
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add Lesson
                                </button>
                            </form>
                        </div>

                        {subPreview.length > 0 && (
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Added Lessons</h3>
                                <div className="space-y-2">
                                    {subPreview.map((sub) => (
                                        <div key={sub.$id} className="flex items-center justify-between border rounded-lg p-3">
                                            <div>
                                                <div className="font-medium text-gray-800 text-sm">{sub.title}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1">{sub.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleFinish}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Finish and Go to Courses
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCourse;
