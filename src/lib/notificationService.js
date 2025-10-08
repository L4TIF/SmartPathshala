// Enhanced Notification Service
// Handles various types of notifications including doubt responses

class NotificationService {
    constructor() {
        this.NOTIFICATION_KEY = 'smartpathshala_notifications';
        this.DOUBT_NOTIFICATIONS_KEY = 'smartpathshala_doubt_notifications';
    }

    // Request notification permission
    async requestPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    // Send basic notification
    async sendNotification(title, options = {}) {
        const hasPermission = await this.requestPermission();

        if (!hasPermission) {
            console.log('Notification permission denied');
            return false;
        }

        const notification = new Notification(title, {
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            ...options
        });

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000);

        return notification;
    }

    // Send doubt answered notification
    async sendDoubtAnsweredNotification(studentName, doubtSubject) {
        const title = '🎉 Your Doubt Has Been Answered!';
        const body = `Hi ${studentName}! Your question about "${doubtSubject}" has been answered by your teacher. Check it out now!`;

        const notification = await this.sendNotification(title, {
            body,
            tag: 'doubt-answered',
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: 'View Response'
                }
            ]
        });

        // Store notification in local storage
        this.storeDoubtNotification({
            type: 'doubt_answered',
            studentName,
            doubtSubject,
            timestamp: new Date().toISOString(),
            read: false
        });

        return notification;
    }

    // Store doubt notification locally
    storeDoubtNotification(notification) {
        const notifications = this.getDoubtNotifications();
        notifications.unshift(notification);

        // Keep only last 50 notifications
        const limitedNotifications = notifications.slice(0, 50);

        localStorage.setItem(this.DOUBT_NOTIFICATIONS_KEY, JSON.stringify(limitedNotifications));
    }

    // Get stored doubt notifications
    getDoubtNotifications() {
        const notifications = localStorage.getItem(this.DOUBT_NOTIFICATIONS_KEY);
        return notifications ? JSON.parse(notifications) : [];
    }

    // Mark notification as read
    markNotificationAsRead(index) {
        const notifications = this.getDoubtNotifications();
        if (notifications[index]) {
            notifications[index].read = true;
            localStorage.setItem(this.DOUBT_NOTIFICATIONS_KEY, JSON.stringify(notifications));
        }
    }

    // Get unread notification count
    getUnreadCount() {
        const notifications = this.getDoubtNotifications();
        return notifications.filter(n => !n.read).length;
    }

    // Clear all notifications
    clearAllNotifications() {
        localStorage.removeItem(this.DOUBT_NOTIFICATIONS_KEY);
    }

    // Send welcome notification for new students
    async sendWelcomeNotification(studentName) {
        const title = '👋 Welcome to SmartPathshala!';
        const body = `Hi ${studentName}! Welcome to your learning journey. Start exploring modules and don't hesitate to ask questions!`;

        return await this.sendNotification(title, {
            body,
            tag: 'welcome',
            requireInteraction: false
        });
    }

    // Send course completion notification
    async sendCourseCompletionNotification(courseName) {
        const title = '🎓 Course Completed!';
        const body = `Congratulations! You've completed "${courseName}". Great job on your learning journey!`;

        return await this.sendNotification(title, {
            body,
            tag: 'course-completed',
            requireInteraction: false
        });
    }

    // Send learning streak notification
    async sendStreakNotification(streakDays) {
        const title = '🔥 Learning Streak!';
        const body = `Amazing! You've maintained a ${streakDays}-day learning streak. Keep it up!`;

        return await this.sendNotification(title, {
            body,
            tag: 'learning-streak',
            requireInteraction: false
        });
    }

    // Check for new doubt responses (to be called periodically)
    async checkForNewDoubtResponses(studentEmail) {
        try {
            // This would typically check with your backend
            // For now, we'll use a simple polling mechanism
            const lastCheck = localStorage.getItem('lastDoubtCheck');
            const now = new Date().toISOString();

            if (!lastCheck || new Date(now) - new Date(lastCheck) > 300000) { // 5 minutes
                localStorage.setItem('lastDoubtCheck', now);
                // In a real app, you'd fetch from your API here
                return false;
            }

            return false;
        } catch (error) {
            console.error('Error checking for new doubt responses:', error);
            return false;
        }
    }
}

// Export singleton instance
export const notificationService = new NotificationService();