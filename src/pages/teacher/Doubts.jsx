import React, { useState, useEffect } from 'react';
import { getDoubts, updateDoubtStatus } from '../../appwrite/db';
import { MessageCircle, Clock, CheckCircle, X, Send } from 'lucide-react';

const Doubts = () => {
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoubt, setSelectedDoubt] = useState(null);
    const [response, setResponse] = useState('');
    const [responding, setResponding] = useState(false);

    useEffect(() => {
        fetchDoubts();
    }, []);

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

    const handleRespond = async (doubtId) => {
        if (!response.trim()) {
            alert('Please enter a response');
            return;
        }

        try {
            setResponding(true);
            await updateDoubtStatus(doubtId, {
                status: 'answered',
                teacherResponse: response
            });

            // Update local state
            setDoubts(doubts.map(doubt =>
                doubt.$id === doubtId
                    ? { ...doubt, status: 'answered', teacherResponse: response }
                    : doubt
            ));

            setSelectedDoubt(null);
            setResponse('');
        } catch (error) {
            console.error('Error responding to doubt:', error);
            alert('Failed to respond. Please try again.');
        } finally {
            setResponding(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'answered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
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

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Doubts</h1>

                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Student Questions</h2>
                            <p className="text-gray-600">Answer student questions and help them learn better.</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            Total: {doubts.length} | Pending: {doubts.filter(d => d.status === 'pending').length}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Loading doubts...</p>
                        </div>
                    ) : doubts.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">
                                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts yet</h3>
                            <p className="text-gray-500">When students ask questions, they'll appear here for you to answer.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {doubts.map((doubt) => (
                                <div key={doubt.$id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-800">{doubt.name}</h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doubt.status)}`}>
                                                    {getStatusIcon(doubt.status)}
                                                    {doubt.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{doubt.email}</p>
                                            {doubt.subject && (
                                                <p className="text-sm text-indigo-600 font-medium">{doubt.subject}</p>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500">{formatDate(doubt.createdAt)}</span>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-gray-700">{doubt.doubt}</p>
                                    </div>

                                    {doubt.status === 'answered' && doubt.teacherResponse && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                            <h4 className="font-medium text-green-800 mb-1">Your Response:</h4>
                                            <p className="text-green-700">{doubt.teacherResponse}</p>
                                        </div>
                                    )}

                                    {doubt.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedDoubt(doubt)}
                                                className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
                                            >
                                                <Send className="w-3 h-3" />
                                                Respond
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Response Modal */}
            {selectedDoubt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setSelectedDoubt(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Respond to {selectedDoubt.name}
                        </h3>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Question:</p>
                            <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{selectedDoubt.doubt}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Response *
                            </label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Enter your response to help the student..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedDoubt(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleRespond(selectedDoubt.$id)}
                                disabled={responding || !response.trim()}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {responding ? 'Sending...' : 'Send Response'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doubts;
