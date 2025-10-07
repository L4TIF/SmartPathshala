import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    account.get()
      .then(() => { if (mounted) { setIsAuthed(true); setChecking(false); } })
      .catch(() => { if (mounted) { setIsAuthed(false); setChecking(false); } });
    return () => { mounted = false };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsAuthed(false);
      navigate('/');
    } catch (_) { }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SmartPathsala
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/modules" className="text-gray-700 hover:text-indigo-600 transition">
              Modules
            </Link>



            {/* Auth Action */}
            {!checking && (
              isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/teacher-auth"
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Teacher Login
                </Link>
              )
            )}
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
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
            Home
          </Link>
          <Link to="/modules" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">
            Modules
          </Link>



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

          {/* Auth Action (Mobile) */}
          <div className="px-4 py-3">
            {!checking && (
              isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/teacher-auth"
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Teacher Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
