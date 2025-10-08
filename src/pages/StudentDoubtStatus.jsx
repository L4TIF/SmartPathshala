import React, { useState, useEffect } from 'react';
import { getDoubts, deleteDoubt } from '../appwrite/db';
import { MessageCircle, Clock, CheckCircle, Mail, User, Calendar, Trash2, X } from 'lucide-react';

const StudentDoubtStatus = () => {
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emailFilter, setEmailFilter] = useState('');
    const [filteredDoubts, setFilteredDoubts] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchDoubts();
    }, []);

    useEffect(() => {
        if (emailFilter.trim()) {
            const filtered = doubts.filter(doubt =>
                doubt.email.toLowerCase().includes(emailFilter.toLowerCase())
            );
            setFilteredDoubts(filtered);
        } else {
            setFilteredDoubts(doubts);
        }
    }, [doubts, emailFilter]);

    const fetchDoubts = async () => {
        try {
            setLoading(true);
            const doubtsData = await getDoubts();
            setDoubts(doubtsData);
        } catch (error) {
            console.error('Error fetching doubts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDoubt = async (doubtId) => {
        try {
            setDeleting(true);
            await deleteDoubt(doubtId);

            // Update local state
            setDoubts(doubts.filter(doubt => doubt.$id !== doubtId));
            setDeleteConfirm(null);

            alert('Your doubt has been deleted successfully!');
        } catch (error) {
            console.error('Error deleting doubt:', error);
            alert('Failed to delete doubt. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'answered': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'answered': return <CheckCircle className="w-4 h-4" />;
            default: return <MessageCircle className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 'pending': return 'Your question is being reviewed by your teacher';
            case 'answered': return 'Your teacher has responded to your question!';
            default: return 'Status unknown';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">My Doubt Status</h1>
                    <p className="text-gray-600">Check the status of your submitted questions and see teacher responses.</p>
                </div>

                {/* Email Filter */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Find Your Doubts</h2>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                            placeholder="Enter your email address to find your doubts"
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={fetchDoubts}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Doubts List */}
                <div className="bg-white rounded-lg shadow-md">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="text-gray-500 mt-4">Loading your doubts...</p>
                        </div>
                    ) : filteredDoubts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {emailFilter ? 'No doubts found' : 'No doubts submitted yet'}
                            </h3>
                            <p className="text-gray-500">
                                {emailFilter
                                    ? 'Try a different email address or check if you have submitted any doubts.'
                                    : 'Submit your first doubt to get help from your teachers.'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Your Questions</h2>
                                <div className="text-sm text-gray-500">
                                    Total: {filteredDoubts.length} |
                                    Answered: {filteredDoubts.filter(d => d.status === 'answered').length} |
                                    Pending: {filteredDoubts.filter(d => d.status === 'pending').length}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredDoubts.map((doubt) => (
                                    <div key={doubt.$id} className={`border-2 rounded-lg p-6 ${getStatusColor(doubt.status)}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <User className="w-4 h-4 text-gray-600" />
                                                    <span className="font-semibold">{doubt.name}</span>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doubt.status)}`}>
                                                        {getStatusIcon(doubt.status)}
                                                        {doubt.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                    <Mail className="w-3 h-3" />
                                                    <span>{doubt.email}</span>
                                                </div>
                                                {doubt.subject && (
                                                    <div className="text-sm text-indigo-600 font-medium mb-2">
                                                        Subject: {doubt.subject}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>Submitted: {formatDate(doubt.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-800 mb-2">Your Question:</h4>
                                            <p className="text-gray-700 bg-white bg-opacity-50 p-3 rounded-lg">{doubt.doubt}</p>
                                        </div>

                                        {doubt.status === 'answered' && doubt.teacherResponse && (
                                            <div className="bg-white bg-opacity-80 border border-green-300 rounded-lg p-4">
                                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Teacher's Response:
                                                </h4>
                                                <p className="text-green-700">{doubt.teacherResponse}</p>
                                            </div>
                                        )}

                                        {doubt.status === 'pending' && (
                                            <div className="bg-white bg-opacity-50 border border-yellow-300 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-yellow-800">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-medium">{getStatusMessage(doubt.status)}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Delete Button */}
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => setDeleteConfirm(doubt)}
                                                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Check Your Doubts</h3>
                    <div className="text-blue-700 space-y-2">
                        <p>1. <strong>Enter your email address</strong> in the search box above</p>
                        <p>2. <strong>Click "Refresh"</strong> to get the latest updates</p>
                        <p>3. <strong>Check the status</strong> of your questions:
                            <ul className="ml-4 mt-2 space-y-1">
                                <li>🟡 <strong>Pending:</strong> Your teacher is reviewing your question</li>
                                <li>🟢 <strong>Answered:</strong> Your teacher has responded!</li>
                            </ul>
                        </p>
                        <p>4. <strong>Read the response</strong> when your doubt is answered</p>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Delete Your Doubt</h3>
                                <p className="text-sm text-gray-600">This action cannot be undone</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-3">Are you sure you want to delete this doubt?</p>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1"><strong>Subject:</strong> {deleteConfirm.subject || 'General'}</p>
                                <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {deleteConfirm.status}</p>
                                <p className="text-sm text-gray-800"><strong>Your Question:</strong> {deleteConfirm.doubt}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteDoubt(deleteConfirm.$id)}
                                disabled={deleting}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deleting ? 'Deleting...' : 'Delete Doubt'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDoubtStatus;
