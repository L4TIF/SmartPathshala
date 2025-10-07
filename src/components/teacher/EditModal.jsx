import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, onSave, type, data }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        codeSnippet: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                content: data.content || '',
                imageUrl: data.image || '',
                codeSnippet: data.codeSnippets || ''
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Edit {type === 'module' ? 'Course' : 'Lesson'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {type === 'module' ? 'Course' : 'Lesson'} Title
                            </label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description/Content
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder={type === 'module' ? 'Course description' : 'Lesson content'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Optional image URL"
                            />
                        </div>

                        {type === 'submodule' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Code Snippet
                                </label>
                                <textarea
                                    name="codeSnippet"
                                    value={formData.codeSnippet}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 min-h-[100px] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Optional code snippet"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
