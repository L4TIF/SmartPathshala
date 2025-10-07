// Offline Messaging Service for PWA
// Handles message storage, sync, and local persistence

class OfflineMessagingService {
    constructor() {
        this.MESSAGES_KEY = 'studybuddy_offline_messages';
        this.SYNC_QUEUE_KEY = 'studybuddy_sync_queue';
        this.isOnline = navigator.onLine;
        this.pendingCount = 0;
    }

    // Store message when offline
    storeOfflineMessage(message) {
        const messageData = {
            id: this.generateId(),
            content: message,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        const messages = this.getStoredMessages();
        messages.push(messageData);
        localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));

        const queue = this.getSyncQueue();
        queue.push(messageData);
        localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));

        this.pendingCount = queue.length;
        return messageData;
    }

    // Get stored messages
    getStoredMessages() {
        const messages = localStorage.getItem(this.MESSAGES_KEY);
        return messages ? JSON.parse(messages) : [];
    }

    // Get sync queue
    getSyncQueue() {
        const queue = localStorage.getItem(this.SYNC_QUEUE_KEY);
        return queue ? JSON.parse(queue) : [];
    }

    // Sync pending messages
    async syncPendingMessages() {
        if (!this.isOnline) return;

        const queue = this.getSyncQueue();
        if (queue.length === 0) return;

        console.log(`Syncing ${queue.length} pending messages...`);

        let processedCount = 0;
        for (const message of queue) {
            try {
                // Simulate API call (replace with your actual API)
                await this.sendToAPI(message);
                this.removeFromQueue(message.id);
                this.updateMessageStatus(message.id, 'sent');
                processedCount++;
            } catch (error) {
                console.error('Failed to sync message:', error);
                this.updateMessageStatus(message.id, 'failed');
            }
        }

        this.pendingCount = 0;
        return processedCount;
    }

    // Simulate API call (replace with your actual implementation)
    async sendToAPI(message) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate API response
        return {
            success: true,
            messageId: message.id
        };
    }

    // Remove from sync queue
    removeFromQueue(messageId) {
        const queue = this.getSyncQueue();
        const updatedQueue = queue.filter(msg => msg.id !== messageId);
        localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(updatedQueue));
    }

    // Update message status
    updateMessageStatus(messageId, status) {
        const messages = this.getStoredMessages();
        const message = messages.find(msg => msg.id === messageId);
        if (message) {
            message.status = status;
            localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Get pending count
    getPendingCount() {
        return this.getSyncQueue().length;
    }

    // Clear all messages
    clearMessages() {
        localStorage.removeItem(this.MESSAGES_KEY);
        localStorage.removeItem(this.SYNC_QUEUE_KEY);
        this.pendingCount = 0;
    }

    // Set online status
    setOnlineStatus(isOnline) {
        this.isOnline = isOnline;
    }
}

// Export singleton instance
export const offlineMessagingService = new OfflineMessagingService();
