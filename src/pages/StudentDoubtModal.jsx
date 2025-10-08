import React, { useState, useEffect } from "react";
import { createDoubt } from "../appwrite/db";
import { offlineDoubtService } from "../lib/offlineDoubtService";

const StudentDoubtModal = ({ setIsOpen, onDoubtSubmitted }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    doubt: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineCount, setOfflineCount] = useState(0);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check offline doubts count
    const updateOfflineCount = () => {
      const count = offlineDoubtService.getPendingCount();
      setOfflineCount(count);
    };

    updateOfflineCount();
    const interval = setInterval(updateOfflineCount, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.doubt) {
      setError("Please fill all required fields!");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isOnline) {
        // Online: Submit directly to server
        await createDoubt({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          doubt: formData.doubt,
          status: 'pending'
        });

        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", doubt: "" });

        // Call the callback if provided
        if (onDoubtSubmitted) {
          onDoubtSubmitted();
        }

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // Offline: Store locally for later sync
        const offlineDoubt = offlineDoubtService.storeDoubtOffline({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          doubt: formData.doubt
        });

        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", doubt: "" });

        // Update offline count
        setOfflineCount(prev => prev + 1);

        // Call the callback if provided
        if (onDoubtSubmitted) {
          onDoubtSubmitted();
        }

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error('Error submitting doubt:', err);
      setError('Failed to submit doubt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      {/* Open Modal Button */}


      {/* Modal */}
      {(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Modal Header */}
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-2">
              Ask Your Doubt
            </h2>
            <div className="w-full flex justify-end">
              <button onClick={() => setIsOpen(false)}>X</button>
            </div>
            <p className="text-sm text-center text-gray-500 mb-5">
              Have a question? Submit your doubt below and your teacher will respond soon.
            </p>

            {/* Network Status Indicator */}
            <div className={`mb-4 p-3 rounded-lg text-sm ${isOnline
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
              }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                <span className="font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                {!isOnline && (
                  <span className="text-xs">
                    - Your doubt will be saved locally and submitted when you're back online
                  </span>
                )}
              </div>
              {offlineCount > 0 && (
                <div className="mt-2 text-xs">
                  📱 {offlineCount} doubt{offlineCount > 1 ? 's' : ''} pending sync
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full border rounded-md p-2 mt-1"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-md p-2 mt-1"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject (e.g. Python Basics)"
                  className="w-full border rounded-md p-2 mt-1"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Your Doubt *
                </label>
                <textarea
                  name="doubt"
                  placeholder="Describe your doubt in detail..."
                  rows={4}
                  className="w-full border rounded-md p-2 mt-1"
                  value={formData.doubt}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed ${isOnline
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
              >
                {isLoading
                  ? (isOnline ? 'Submitting...' : 'Saving Offline...')
                  : (isOnline ? 'Submit Doubt' : 'Save Offline & Submit Later')
                }
              </button>

              {error && (
                <p className="text-red-600 text-center mt-3">
                  ❌ {error}
                </p>
              )}

              {submitted && (
                <p className={`text-center mt-3 ${isOnline
                  ? 'text-green-600'
                  : 'text-yellow-600'
                  }`}>
                  {isOnline
                    ? '✅ Your doubt has been submitted successfully! Your teacher will respond soon.'
                    : '📱 Your doubt has been saved offline! It will be submitted automatically when you\'re back online.'
                  }
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDoubtModal;
