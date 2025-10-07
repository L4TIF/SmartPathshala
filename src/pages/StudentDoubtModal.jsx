import React, { useState } from "react";

const StudentDoubtModal = ({setIsOpen}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    doubt: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.doubt) {
      alert("Please fill all required fields!");
      return;
    }
    console.log("Doubt Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", doubt: "" });

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
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
              <button onClick={()=>setIsOpen(false)}>X</button>
              </div>
            <p className="text-sm text-center text-gray-500 mb-5">
              Have a question? Submit your doubt below and your teacher will respond soon.
            </p>

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
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Submit Doubt
              </button>

              {submitted && (
                <p className="text-green-600 text-center mt-3">
                  ✅ Your doubt has been submitted successfully!
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
