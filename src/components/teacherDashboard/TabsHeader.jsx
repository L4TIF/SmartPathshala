import React from 'react'

const TabsHeader = ({ activeTab, setActiveTab, onOpenCreateModal }) => {
    return (
        <div className="mb-6 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveTab('courses')} className={`px-4 py-2 rounded-lg border ${activeTab === 'courses' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Your Courses</button>
                <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg border ${activeTab === 'analytics' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Analytics</button>
                <button onClick={() => setActiveTab('doubts')} className={`px-4 py-2 rounded-lg border ${activeTab === 'doubts' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Doubts</button>
            </div>
            <button
                onClick={onOpenCreateModal}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50"
                title="Create Module"
                aria-label="Create Module"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712z" />
                    <path d="M3 17.25V21h3.75L19.128 8.622l-3.712-3.712L3 17.25z" />
                </svg>
                <span className="hidden sm:inline">Create Course</span>
            </button>
        </div>
    )
}

export default TabsHeader


