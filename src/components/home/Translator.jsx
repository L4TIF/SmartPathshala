import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Add Google Translate script dynamically
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    // Initialize Google Translate after script loads
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // default language
          includedLanguages: "en,hi,ta,te,bn,gu,pa,ml,mr,fr", // add any languages you want
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="App text-center mt-10">
      <Outlet />
      <AIBotWidget className="fixed bottom-4 right-4 z-50" />
      <h1 className="text-3xl font-bold text-indigo-600">
        Welcome to SmartPathshala
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        Learn, Grow, and Succeed with us.
      </p>
      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl">
        Start Learning
      </button>

      {/* 🌐 Google Translate dropdown */}
      <div id="google_translate_element" className="mt-6"></div>
    </div>

     
  );
};

export default Translator;