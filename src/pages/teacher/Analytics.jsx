import React from 'react';

const Analytics = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Performance</h2>
                    <p className="text-gray-600 mb-6">Track your course performance and student engagement.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <h3 className="font-semibold text-indigo-800">Total Courses</h3>
                            <p className="text-2xl font-bold text-indigo-600">0</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-semibold text-green-800">Total Students</h3>
                            <p className="text-2xl font-bold text-green-600">0</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-800">Completion Rate</h3>
                            <p className="text-2xl font-bold text-purple-600">0%</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="text-gray-500 text-center py-8">
                            No activity data available yet. Start creating courses to see analytics here.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
