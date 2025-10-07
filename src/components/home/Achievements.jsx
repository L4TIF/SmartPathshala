import React from "react";
import { Award, Users, BookOpen, Star } from "lucide-react";

const achievements = [
  {
    icon: <Award className="w-10 h-10 text-yellow-500" />,
    number: "10K+",
    title: "Certificates Awarded",
    description: "Students have earned official certificates for completing various learning modules.",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-500" />,
    number: "25K+",
    title: "Active Learners",
    description: "Engaged students learning daily across multiple subjects and skill levels.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-green-500" />,
    number: "500+",
    title: "Courses Available",
    description: "Comprehensive and well-structured courses designed by top educators.",
  },
  {
    icon: <Star className="w-10 h-10 text-pink-500" />,
    number: "4.9/5",
    title: "Average Rating",
    description: "Loved by our learners for our easy-to-understand and engaging lessons.",
  },
];

const Achievements = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-indigo-600">Our Achievements</h2>
        <p className="text-gray-600 mt-3">
          We’re proud of what our learners and educators have accomplished together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-3xl font-extrabold text-gray-800">{item.number}</h3>
            <p className="text-lg font-semibold text-indigo-600 mt-1">{item.title}</p>
            <p className="text-gray-500 text-sm mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
