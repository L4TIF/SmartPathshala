import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <a href="#" className="text-2xl font-bold text-indigo-600">
            SmartPathsala
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">
              Link
            </a>

            {/* Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 transition">
                Dropdown ▾
              </button>
              <div className="absolute hidden group-hover:block bg-white border rounded-lg mt-2 shadow-lg">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
                  Action
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
                  Another Action
                </a>
                <hr className="my-1" />
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
                  Something Else
                </a>
              </div>
            </div>

            <span className="text-gray-400 cursor-not-allowed">Disabled</span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
              Search
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
            Home
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
            Link
          </a>

          {/* Dropdown (Mobile) */}
          <details className="px-4 py-2">
            <summary className="cursor-pointer text-gray-700">Dropdown ▾</summary>
            <div className="pl-4">
              <a href="#" className="block py-1 text-gray-700 hover:text-indigo-600">
                Action
              </a>
              <a href="#" className="block py-1 text-gray-700 hover:text-indigo-600">
                Another Action
              </a>
              <a href="#" className="block py-1 text-gray-700 hover:text-indigo-600">
                Something Else
              </a>
            </div>
          </details>

          <span className="block px-4 py-2 text-gray-400">Disabled</span>

          {/* Search (Mobile) */}
          <div className="px-4 py-2 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
              Go
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
