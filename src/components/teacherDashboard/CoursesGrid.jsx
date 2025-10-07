import React from 'react'

const CoursesGrid = ({ modules, loading, onOpen, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Your Courses</h3>
            {loading ? (
                <p className="text-gray-600">Loading…</p>
            ) : modules.length === 0 ? (
                <p className="text-gray-600">No courses yet. Create one with the button above.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map(m => (
                        <div key={m.$id} className="border rounded-xl p-4 hover:shadow transition flex flex-col gap-3">
                            <div>
                                <div className="font-semibold text-gray-800">{m.moduleName}</div>
                                <div className="text-xs text-gray-500">By {m.teacherName || 'Unknown'}</div>
                                {m.coverImage && (<img src={m.coverImage} alt="cover" className="mt-2 w-full h-28 object-cover rounded" />)}
                                <div className="text-sm text-gray-600 line-clamp-3 mt-2">{m.description}</div>
                            </div>
                            <div className="flex items-center gap-2 mt-auto">
                                <button onClick={() => onOpen(m)} className="px-3 py-1.5 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 text-sm">Open</button>
                                <button onClick={() => onEdit(m)} className="px-3 py-1.5 text-gray-700 border rounded-lg hover:bg-gray-50 text-sm">Edit</button>
                                <button onClick={() => onDelete(m)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CoursesGrid


