import React from 'react';
import { BookOpen, Search, Clock } from 'lucide-react';

// Bot Message Component
export const BotMessage = ({ message }) => (
    <div className="flex items-start mb-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${message.isOffline ? 'bg-orange-500' : 'bg-blue-600'
            }`}>
            {message.isOffline ? <Clock className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
        </div>
        <div className={`p-3 rounded-xl max-w-[80%] shadow-sm ${message.isOffline ? 'bg-orange-50 border border-orange-200' : 'bg-gray-100'
            }`}>
            <p className={`text-sm whitespace-pre-wrap ${message.isOffline ? 'text-orange-800' : 'text-gray-800'
                }`}>{message.text}</p>
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

// User Message Component
export const UserMessage = ({ message }) => (
    <div className="flex justify-end mb-4">
        <div className="bg-blue-600 text-white p-3 rounded-xl max-w-[80%] shadow-lg">
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
    </div>
);

// Loading Message Component
export const LoadingMessage = () => (
    <div className="flex items-start mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
            <BookOpen className="w-4 h-4" />
        </div>
        <div className="bg-gray-100 p-3 rounded-xl max-w-[80%] shadow-sm flex items-center">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            <p className="text-gray-800 text-sm italic">StudyBuddy is thinking...</p>
        </div>
    </div>
);
