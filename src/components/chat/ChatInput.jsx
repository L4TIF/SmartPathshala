import React from 'react';
import { Send, WifiOff } from 'lucide-react';

const ChatInput = ({
    input,
    setInput,
    onSend,
    onKeyPress,
    isLoading,
    isOnline
}) => {
    return (
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            {/* Offline Status Message */}
            {!isOnline && (
                <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center text-orange-800 text-xs">
                        <WifiOff className="w-3 h-3 mr-2" />
                        <span>You're offline. Messages will be saved and sent when you're back online.</span>
                    </div>
                </div>
            )}

            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={onKeyPress}
                    disabled={isLoading}
                    placeholder={isOnline
                        ? "Ask your doubt here (e.g., What is photosynthesis?)"
                        : "Type your message (will be saved offline)"
                    }
                    className={`flex-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-sm ${!isOnline ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
                        }`}
                />
                <button
                    onClick={() => onSend(input)}
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-full text-white transition-all duration-200
            ${!input.trim() || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : isOnline
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                : 'bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl'
                        }`}
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
