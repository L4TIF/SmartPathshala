import React from "react";

const IntroSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Welcome to <span className="text-indigo-600">SmartPathshala</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Empower your learning journey with interactive lessons, expert
          guidance, and AI-powered personalized education. Start building your
          future — one smart path at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
          <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-600 hover:text-white transition duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center ">
        <img
          src="/hero1.png"
          alt="Smart Learning"
          className="max-w-xs md:max-w-md lg:max-w-lg drop-shadow-2xl scale-x-[-1]"
        />
      </div>
    </section>
  );
};

export default IntroSection;

