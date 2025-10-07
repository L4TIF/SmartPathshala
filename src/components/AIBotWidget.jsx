import React, { useState, useCallback, useRef, useEffect } from 'react';
// Lucide icons are used for a modern look
import { MessageSquare, X, Send, Loader, BookOpen, Search } from 'lucide-react';

// --- CONSTANTS ---

// Use the specified model for text generation with Google Search grounding.
const GEMINI_MODEL = "gemini-2.5-flash-preview-05-20";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const API_KEY = "AIzaSyDWxWGIhmh_j03_XmiHJmvNasAz8b9nILc"; // Canvas will automatically populate this for the fetch call

const SYSTEM_PROMPT = {
  parts: [{
    text: "You are a friendly, knowledgeable, and patient educational assistant named 'StudyBuddy'. Your goal is to help students understand complex topics, solve doubts, and provide clear, accurate, and concise explanations. Always maintain an encouraging and supportive tone. If a question requires current information, use your knowledge. When providing factual information, try to be helpful and reference sources if available."
  }]
};

/**
 * Helper function to handle exponential backoff for API retries.
 * @param {Function} fn - The function to execute.
 * @param {number} maxRetries - Maximum number of retries.
 * @returns {Promise<any>}
 */
const withExponentialBackoff = async (fn, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Fetches the generated content from the Gemini API.
 * @param {string} prompt - The user's query.
 * @returns {Promise<{text: string, sources: Array<{uri: string, title: string}>}>}
 */
const askGemini = async (prompt) => {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    // Enable Google Search grounding for reliable, up-to-date information
    tools: [{ "google_search": {} }],
    systemInstruction: SYSTEM_PROMPT,
  };

  const fn = async () => {
    const response = await fetch(API_URL + `?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const text = candidate.content.parts[0].text;
      let sources = [];

      const groundingMetadata = candidate.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
          sources = groundingMetadata.groundingAttributions
              .map(attribution => ({
                  uri: attribution.web?.uri,
                  title: attribution.web?.title,
              }))
              .filter(source => source.uri && source.title); // Ensure sources are valid
      }

      return { text, sources };
    }

    return { text: "Sorry, StudyBuddy is unable to process that request right now. Please try rephrasing your doubt!", sources: [] };
  };

  try {
    return await withExponentialBackoff(fn);
  } catch (error) {
    console.error("Gemini API Error after retries:", error);
    return { text: "StudyBuddy encountered a persistent error. Please check your network connection or try again later.", sources: [] };
  }
};

// --- TYPES & INTERFACES ---

const ROLE_USER = 'user';
const ROLE_BOT = 'bot';

/**
 * @typedef {Object} Source
 * @property {string} uri
 * @property {string} title
 */

/**
 * @typedef {Object} Message
 * @property {'user' | 'bot'} role
 * @property {string} text
 * @property {Source[]} [sources]
 */

// --- MAIN COMPONENT ---

const initialMessages = [
  /** @type {Message} */
  {
    role: ROLE_BOT,
    text: "Hi there! I'm StudyBuddy, your AI teaching assistant. How can I help you understand a concept or solve a doubt today?",
  },
];

export default function AIBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  /** @type {[Message[], React.Dispatch<React.SetStateAction<Message[]>>]} */
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat window whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    // 1. Add user message immediately
    const newUserMessage = { role: ROLE_USER, text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // 2. Call the AI
    try {
      const { text, sources } = await askGemini(userMessage);

      // 3. Add bot response
      const botMessage = { role: ROLE_BOT, text, sources };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Failed to get response from AI:", error);
      const errorMessage = {
        role: ROLE_BOT,
        text: "I ran into an issue getting the answer. Please check your internet connection and try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const BotMessage = ({ message }) => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
        <BookOpen className="w-4 h-4" />
      </div>
      <div className="bg-gray-100 p-3 rounded-xl max-w-[80%] shadow-sm">
        <p className="text-gray-800 text-sm whitespace-pre-wrap">{message.text}</p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-blue-600 mb-1 flex items-center">
              <Search className="w-3 h-3 mr-1" /> Sources
            </p>
            <ul className="list-disc list-inside space-y-1">
              {message.sources.slice(0, 3).map((source, index) => (
                <li key={index} className="text-xs text-gray-600 truncate">
                  <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    {source.title || new URL(source.uri).hostname}
                  </a>
                </li>
              ))}
              {message.sources.length > 3 && (
                 <li className="text-xs text-gray-600 italic">
                    +{message.sources.length - 3} more sources
                 </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const UserMessage = ({ message }) => (
    <div className="flex justify-end mb-4">
      <div className="bg-blue-600 text-white p-3 rounded-xl max-w-[80%] shadow-lg">
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        aria-label={isOpen ? "Close chat" : "Open StudyBuddy Chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 mx-auto animate-in fade-in" />
        ) : (
          <MessageSquare className="w-6 h-6 mx-auto animate-in fade-in" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="
          fixed bottom-24 right-6
          w-full max-w-sm h-[80vh] max-h-[600px]
          bg-white rounded-2xl shadow-2xl flex flex-col
          md:w-[380px]
          transition-all duration-300 ease-in-out
          border border-gray-200
        ">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 rounded-t-xl text-white shadow-md">
            <h2 className="text-lg font-bold flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              StudyBuddy
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-blue-500 transition-colors"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {/* Custom scrollbar style */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f5f9;
              }
            `}</style>
            {messages.map((msg, index) =>
              msg.role === ROLE_USER ? (
                <UserMessage key={index} message={msg} />
              ) : (
                <BotMessage key={index} message={msg} />
              )
            )}
            {isLoading && (
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 p-3 rounded-xl max-w-[80%] shadow-sm flex items-center">
                  <Loader className="w-4 h-4 animate-spin text-blue-600 mr-2" />
                  <p className="text-gray-800 text-sm italic">StudyBuddy is thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder="Ask your doubt here (e.g., What is photosynthesis?)"
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-sm"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-full text-white transition-all duration-200
                  ${!input.trim() || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
