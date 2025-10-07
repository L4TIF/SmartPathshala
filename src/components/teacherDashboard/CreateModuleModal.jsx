import React from 'react'

const CreateModuleModal = ({ open, moduleForm, onChange, onClose, onSubmit }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Module</h3>
                <form onSubmit={onSubmit} className="space-y-3">
                    <input name="title" value={moduleForm.title} onChange={onChange} placeholder="Module name" className="w-full border rounded-lg px-3 py-2" required />
                    <textarea name="description" value={moduleForm.description} onChange={onChange} placeholder="Module description" className="w-full border rounded-lg px-3 py-2 min-h-[90px]" />
                    <input name="coverImage" value={moduleForm.coverImage} onChange={onChange} placeholder="Cover image URL (optional)" className="w-full border rounded-lg px-3 py-2" />
                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateModuleModal


