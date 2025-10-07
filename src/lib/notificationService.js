// Push Notification Service for PWA
// Handles notification permissions and sending

class NotificationService {
    constructor() {
        this.permission = Notification.permission;
        this.isSupported = 'Notification' in window;
    }

    // Request notification permission
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('Notifications not supported');
            return false;
        }

        if (this.permission === 'granted') {
            return true;
        }

        if (this.permission === 'denied') {
            console.warn('Notification permission denied');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            return permission === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    // Send notification
    async sendNotification(title, options = {}) {
        if (!this.isSupported || this.permission !== 'granted') {
            console.warn('Notifications not available');
            return;
        }

        const defaultOptions = {
            body: 'Your message has been processed!',
            icon: '/icon-192x192.png',
            badge: '/icon-72x72.png',
            tag: 'studybuddy-response',
            requireInteraction: true,
            actions: [
                {
                    action: 'open',
                    title: 'Open StudyBuddy',
                    icon: '/icon-72x72.png'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss',
                    icon: '/icon-72x72.png'
                }
            ]
        };

        const notificationOptions = { ...defaultOptions, ...options };

        try {
            const notification = new Notification(title, notificationOptions);

            // Handle notification click
            notification.onclick = (event) => {
                event.preventDefault();
                window.focus();
                notification.close();

                // Handle action clicks
                if (event.action === 'open') {
                    // Focus on the chat widget
                    const chatButton = document.querySelector('[aria-label*="StudyBuddy"]');
                    if (chatButton) {
                        chatButton.click();
                    }
                }
            };

            // Auto-close after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10000);

            return notification;
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }

    // Send message processed notification
    async sendMessageProcessedNotification(messageCount = 1) {
        const title = 'StudyBuddy Response Ready!';
        const body = messageCount > 1
            ? `${messageCount} of your offline messages have been processed!`
            : 'Your offline message has been processed!';

        return await this.sendNotification(title, {
            body,
            data: {
                type: 'message_processed',
                count: messageCount,
                timestamp: new Date().toISOString()
            }
        });
    }

    // Send sync notification
    async sendSyncNotification(count) {
        const title = 'Messages Synced';
        const body = `${count} message${count > 1 ? 's' : ''} sent successfully`;

        return await this.sendNotification(title, {
            body,
            icon: '/icon-192x192.png'
        });
    }

    // Check if notifications are supported and permitted
    canSendNotifications() {
        return this.isSupported && this.permission === 'granted';
    }

    // Get permission status
    getPermissionStatus() {
        return {
            isSupported: this.isSupported,
            permission: this.permission,
            canSend: this.canSendNotifications()
        };
    }
}

// Export singleton instance
export const notificationService = new NotificationService();
