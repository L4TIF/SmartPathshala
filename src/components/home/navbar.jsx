import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setLoggedOut } from '../../store/slices/authSlice';
import { notificationService } from '../../lib/notificationService';
import { offlineDoubtService } from '../../lib/offlineDoubtService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthed = useSelector((s) => s.auth.isAuthenticated);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname !== '/teacher-dashboard';
  const [query, setQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  // ✅ Google Translate setup (works for both desktop & mobile)
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      // Initialize desktop translate element
      if (document.getElementById("google_translate_element_desktop")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ta,te,bn,gu,pa,ml,mr,fr",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          "google_translate_element_desktop"
        );
      }

      // Initialize mobile translate element
      if (document.getElementById("google_translate_element_mobile")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ta,te,bn,gu,pa,ml,mr,fr",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          "google_translate_element_mobile"
        );
      }
    };

    // Basic styling for dropdown
    const interval = setInterval(() => {
      const frames = document.querySelectorAll(".goog-te-menu-value");
      if (frames.length > 0) {
        frames.forEach(frame => {
          frame.style.background = "white";
          frame.style.border = "1px solid #d1d5db"; // gray-300
          frame.style.borderRadius = "8px";
          frame.style.padding = "3px 8px";
          frame.style.fontSize = "14px";
          frame.style.fontFamily = "Inter, sans-serif";
        });
        clearInterval(interval);
      }
    }, 1200);
  }, []);

  // ✅ Authentication check
  useEffect(() => {
    console.log(location.pathname)
    let mounted = true;
    account.get()
      .then(async () => { if (mounted) { try { const me = await account.get(); dispatch(setAuthenticated(me)); } catch { } setChecking(false); } })
      .catch(() => { if (mounted) { dispatch(setLoggedOut()); setChecking(false); } });
    return () => { mounted = false };
  }, []);

  // ✅ Check for unread notifications and offline doubts
  useEffect(() => {
    const checkCounts = () => {
      const unreadCount = notificationService.getUnreadCount();
      const offlineCount = offlineDoubtService.getPendingCount();
      setUnreadCount(unreadCount);
      setOfflineCount(offlineCount);
    };

    checkCounts();

    // Check every 30 seconds for new notifications and offline doubts
    const interval = setInterval(checkCounts, 30000);

    return () => clearInterval(interval);
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

          {/* Logo */}
          <Link to="/" className="flex mr-4 items-center space-x-1">
            <span className="text-2xl font-bold text-indigo-600 leading-tight text-center">
              Smart
              <br />
              <span className="text-gray-800">Pathshala</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center text-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/modules" className="text-gray-700 hover:text-indigo-600 transition">
              Modules
            </Link>
            <Link to="/my-doubts" className="text-gray-700 hover:text-indigo-600 transition relative">
              My Doubts
              {(unreadCount > 0 || offlineCount > 0) && (
                <div className="absolute -top-1 -right-1 flex gap-1">
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  {offlineCount > 0 && (
                    <span className="bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {offlineCount}
                    </span>
                  )}
                </div>
              )}
            </Link>

            {/* Auth Buttons */}
            {!checking &&
              (isAuthed ? (
                isHome ? (
                  <Link
                    to="/teacher-dashboard"
                    className="mx-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Go to Dashboard
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
                  className="ml-4 px-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Teacher Login
                </Link>
              ))}
          </div>

          {/* Search + Google Translate */}
          <div className="hidden ml-4 md:flex items-center space-x-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules"
              className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => navigate(`/modules?search=${encodeURIComponent(query.trim())}`)}
              className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            >
              Search
            </button>

            {/* 🌐 Google Translate Dropdown (visible on all screens via responsive classes) */}
            <div
              id="google_translate_element_desktop"
              className="ml-3 flex items-center h-8 translate-element"
              style={{
                transform: "scale(0.9)",
                transformOrigin: "right center",
              }}
            ></div>
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
          <Link to="/my-doubts" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 relative">
            My Doubts
            {(unreadCount > 0 || offlineCount > 0) && (
              <div className="absolute top-2 right-2 flex gap-1">
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                {offlineCount > 0 && (
                  <span className="bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {offlineCount}
                  </span>
                )}
              </div>
            )}
          </Link>



          {/* Search (Mobile) */}
          <div className="px-4 py-2 flex items-center space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules"
              className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => { setIsOpen(false); navigate(`/modules?search=${encodeURIComponent(query.trim())}`) }}
              className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            >
              Go
            </button>
          </div>

          {/* ✅ Google Translate visible on mobile too */}
          <div className="px-4 py-3 flex justify-center">
            <div
              id="google_translate_element_mobile"
              className="translate-element"
              style={{
                transform: "scale(1)",
                transformOrigin: "center",
              }}
            ></div>
          </div>

          {/* Auth (Mobile) */}
          <div className="px-4 py-3">
            {!checking &&
              (isAuthed ? (
                isHome ? (
                  <Link
                    to="/teacher-dashboard"
                    className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Go to Dashboard
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
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
