import React from 'react';

const Doubts = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Doubts</h1>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Questions</h2>
                    <p className="text-gray-600 mb-6">Answer student questions and help them learn better.</p>

                    <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts yet</h3>
                        <p className="text-gray-500">When students ask questions, they'll appear here for you to answer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doubts;
