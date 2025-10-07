import React from 'react';
import { BookOpen, X, Wifi, WifiOff, Clock, Bell, BellOff } from 'lucide-react';

const ChatHeader = ({
    isOnline,
    pendingCount,
    notificationsEnabled,
    onClose,
    onToggleNotifications
}) => {
    return (
        <div className="flex items-center justify-between p-4 bg-blue-600 rounded-t-xl text-white shadow-md">
            <div className="flex items-center">
                <h2 className="text-lg font-bold flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    StudyBuddy
                </h2>
                <div className="ml-3 flex items-center space-x-2">
                    {/* Connection Status */}
                    <div className="flex items-center text-xs">
                        {isOnline ? (
                            <Wifi className="w-3 h-3 text-green-300" />
                        ) : (
                            <WifiOff className="w-3 h-3 text-red-300" />
                        )}
                        <span className="ml-1">
                            {isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>

                    {/* Pending Messages Badge */}
                    {pendingCount > 0 && (
                        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {pendingCount} pending
                        </div>
                    )}

                    {/* Notification Toggle */}
                    <button
                        onClick={onToggleNotifications}
                        className={`p-1 rounded-full transition-colors ${notificationsEnabled
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gray-500 hover:bg-gray-600'
                            }`}
                        aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
                        title={notificationsEnabled ? "Notifications enabled" : "Click to enable notifications"}
                    >
                        {notificationsEnabled ? (
                            <Bell className="w-3 h-3" />
                        ) : (
                            <BellOff className="w-3 h-3" />
                        )}
                    </button>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                aria-label="Close chat window"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ChatHeader;
