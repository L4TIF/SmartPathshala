import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { account } from "../../lib/appwrite";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // ✅ Google Translate setup (works for both desktop & mobile)
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,ta,te,bn,gu,pa,ml,mr,fr",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };

    // Basic styling for dropdown
    const interval = setInterval(() => {
      const frame = document.querySelector(".goog-te-menu-value");
      if (frame) {
        frame.style.background = "white";
        frame.style.border = "1px solid #d1d5db"; // gray-300
        frame.style.borderRadius = "8px";
        frame.style.padding = "3px 8px";
        frame.style.fontSize = "14px";
        frame.style.fontFamily = "Inter, sans-serif";
        clearInterval(interval);
      }
    }, 1200);
  }, []);

  // ✅ Authentication check
  useEffect(() => {
    let mounted = true;
    const localRole = (() => {
      try {
        return localStorage.getItem("role");
      } catch {
        return null;
      }
    })();
    account
      .get()
      .then(() => {
        if (mounted) {
          setIsAuthed(true);
          setChecking(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsAuthed(!!localRole);
          setChecking(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsAuthed(false);
      localStorage.removeItem("role");
      navigate("/");
    } catch (_) {}
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-indigo-600 leading-tight text-center">
              Smart
              <br />
              <span className="text-gray-800">Pathshala</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/modules" className="text-gray-700 hover:text-indigo-600 transition">
              Modules
            </Link>

            {/* Auth Buttons */}
            {!checking &&
              (isAuthed ? (
                isHome ? (
                  <Link
                    to="/teacher-dashboard"
                    className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Teacher Login
                </Link>
              ))}
          </div>

          {/* Search + Google Translate */}
          <div className="hidden md:flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
              Search
            </button>

            {/* 🌐 Google Translate Dropdown (visible on all screens via responsive classes) */}
            <div
              id="google_translate_element"
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

          {/* ✅ Google Translate visible on mobile too */}
          <div className="px-4 py-3 flex justify-center">
            <div
              id="google_translate_element"
              className="translate-element"
              style={{
                transform: "scale(0.9)",
                transformOrigin: "center",
              }}
            ></div>
          </div>

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
