import React from 'react'

const SubmoduleSection = ({ modules, subForm, subPreview, onChange, onSubmit, onEdit, onDelete }) => {
    const selectedModule = modules.find(m => m.$id === subForm.moduleId)
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-1">Add Submodule</h3>
            <p className="text-sm text-gray-600 mb-3">{selectedModule ? `For module: ${selectedModule.moduleName}` : 'Select a module to add its submodules.'}</p>
            <form onSubmit={onSubmit} className="space-y-3">
                <input name="title" value={subForm.title} onChange={onChange} placeholder="Submodule title" className="w-full border rounded-lg px-3 py-2" required />
                <textarea name="content" value={subForm.content} onChange={onChange} placeholder="Content (supports new lines)" className="w-full border rounded-lg px-3 py-2 min-h-[120px]" />
                <input name="imageUrl" value={subForm.imageUrl} onChange={onChange} placeholder="Image URL" className="w-full border rounded-lg px-3 py-2" />
                <textarea name="codeSnippet" value={subForm.codeSnippet} onChange={onChange} placeholder="Code snippet" className="w-full border rounded-lg px-3 py-2 min-h-[100px] font-mono" />
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
                                        <button onClick={() => onEdit(s)} className="px-2 py-1 text-gray-700 border rounded hover:bg-gray-50 text-xs">Edit</button>
                                        <button onClick={() => onDelete(s)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SubmoduleSection


