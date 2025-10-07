import React from 'react';
import { BotMessage, UserMessage, LoadingMessage } from './MessageComponents';

const ROLE_USER = 'user';
const ROLE_BOT = 'bot';

const ChatMessages = ({ messages, isLoading, messagesEndRef }) => {
    return (
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

            {isLoading && <LoadingMessage />}

            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;
