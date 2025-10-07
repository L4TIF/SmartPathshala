import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setLoggedOut } from '../../store/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthed = useSelector((s) => s.auth.isAuthenticated);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname !== '/teacher-dashboard';

  useEffect(() => {
    console.log(location.pathname)
    let mounted = true;
    account.get()
      .then(async () => { if (mounted) { try { const me = await account.get(); dispatch(setAuthenticated(me)); } catch { } setChecking(false); } })
      .catch(() => { if (mounted) { dispatch(setLoggedOut()); setChecking(false); } });
    return () => { mounted = false };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      dispatch(setLoggedOut());
      navigate('/');
    } catch (_) { }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo + Brand Name together */}
          <Link to="/" className="flex items-center space-x-1">
            {/* <img src="/logo.jpeg" alt="SmartPathshala Logo" className="h-10 w-auto" /> */}
            <span className="text-2xl font-bold text-indigo-600">SmartPathsala</span>
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
                isHome ? (
                  <Link
                    to="/teacher-dashboard"
                    className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Go to Teacher Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                )
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
                isHome ? (
                  <Link
                    to="/teacher-dashboard"
                    className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Go to Teacher Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                )
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

