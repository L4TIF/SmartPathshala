import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is SmartPathshala?",
    answer:
      "SmartPathshala is an online educational platform designed to help students learn, grow, and achieve their academic goals through interactive modules and guided lessons.",
  },
  {
    question: "Is SmartPathshala free to use?",
    answer:
      "Yes! Most of our learning resources are free. However, we also offer premium modules and teacher-led sessions for advanced learners.",
  },
  {
    question: "How can I access the learning modules?",
    answer:
      "You can access the learning modules by navigating to the ‘Modules’ section in the top menu. Simply select a subject or topic you want to learn.",
  },
  {
    question: "Do you provide certificates for completed courses?",
    answer:
      "Yes, we provide completion certificates for certain courses. You can view and download them from your profile dashboard after finishing a module.",
  },
  {
    question: "Can teachers join and upload their content?",
    answer:
      "Absolutely! Teachers can register using the 'Teacher Login' option and share their educational content to help learners across the platform.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-600">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-3">
          Find answers to common questions about SmartPathshala, learning modules, and more.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl border border-gray-200 transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left px-5 py-4 focus:outline-none"
            >
              <span className="text-lg font-semibold text-gray-800">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 border-t border-gray-100 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
