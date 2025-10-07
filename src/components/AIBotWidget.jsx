import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';

// Main AIBotWidget Component
export default function AIBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Use the custom chat hook
  const {
    messages,
    input,
    setInput,
    isLoading,
    isOnline,
    pendingCount,
    notificationsEnabled,
    handleSend,
    handleKeyPress,
    handleToggleNotifications
  } = useChat();

  // Scroll to the bottom of the chat window whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
          <ChatHeader
            isOnline={isOnline}
            pendingCount={pendingCount}
            notificationsEnabled={notificationsEnabled}
            onClose={() => setIsOpen(false)}
            onToggleNotifications={handleToggleNotifications}
          />

          {/* Message History */}
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />

          {/* Input Area */}
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
            isOnline={isOnline}
          />
        </div>
      )}
    </div>
  );
}