import { useState, useCallback, useEffect } from 'react';
import { askGemini } from '../lib/geminiService';
import { offlineMessagingService } from '../lib/offlineMessagingService';
import { notificationService } from '../lib/notificationService';

const ROLE_USER = 'user';
const ROLE_BOT = 'bot';

const initialMessages = [
    {
        role: ROLE_BOT,
        text: "Hi there! I'm StudyBuddy, your AI teaching assistant. How can I help you understand a concept or solve a doubt today?",
    },
];

export const useChat = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingCount, setPendingCount] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    // Handle online/offline status and request notification permission
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            offlineMessagingService.setOnlineStatus(true);
            // Sync pending messages when coming back online
            offlineMessagingService.syncPendingMessages().then((processedCount) => {
                setPendingCount(offlineMessagingService.getPendingCount());

                // Send notification if messages were processed
                if (processedCount > 0 && notificationsEnabled) {
                    setTimeout(async () => {
                        try {
                            await notificationService.sendMessageProcessedNotification(processedCount);
                        } catch (error) {
                            console.error('Failed to send notification:', error);
                        }
                    }, 2000);
                }
            });
        };

        const handleOffline = () => {
            setIsOnline(false);
            offlineMessagingService.setOnlineStatus(false);
        };

        // Request notification permission on first use
        const requestNotificationPermission = async () => {
            if (!notificationService.canSendNotifications()) {
                try {
                    const granted = await notificationService.requestPermission();
                    setNotificationsEnabled(granted);
                } catch (error) {
                    console.log('Notification permission not granted:', error);
                    setNotificationsEnabled(false);
                }
            } else {
                setNotificationsEnabled(true);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check pending count on mount
        setPendingCount(offlineMessagingService.getPendingCount());

        // Request notification permission
        requestNotificationPermission();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [notificationsEnabled]);

    const handleSend = useCallback(async (userMessage) => {
        if (!userMessage.trim() || isLoading) return;

        // 1. Add user message immediately
        const newUserMessage = { role: ROLE_USER, text: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');

        // 2. Check if offline - store message and show offline response
        if (!isOnline) {
            offlineMessagingService.storeOfflineMessage(userMessage);
            setPendingCount(offlineMessagingService.getPendingCount());

            const offlineMessage = {
                role: ROLE_BOT,
                text: "📱 You're offline! Your message has been saved and will be sent when you're back online. I'll respond as soon as possible!",
                isOffline: true
            };
            setMessages(prev => [...prev, offlineMessage]);
            return;
        }

        // 3. Call the AI (online)
        setIsLoading(true);
        try {
            const { text, sources } = await askGemini(userMessage);

            // 4. Add bot response
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
    }, [isLoading, isOnline]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend(input);
        }
    };

    const handleToggleNotifications = async () => {
        if (notificationsEnabled) {
            setNotificationsEnabled(false);
        } else {
            const granted = await notificationService.requestPermission();
            setNotificationsEnabled(granted);
        }
    };

    return {
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
    };
};
