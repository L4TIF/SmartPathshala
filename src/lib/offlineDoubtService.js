// Offline Doubt Service
// Handles storing doubts offline and syncing when online

class OfflineDoubtService {
    constructor() {
        this.OFFLINE_DOUBTS_KEY = 'smartpathshala_offline_doubts';
        this.SYNC_QUEUE_KEY = 'smartpathshala_sync_queue';
        this.SYNC_INTERVAL = 30000; // 30 seconds
        this.MAX_RETRIES = 3;
        this.syncInterval = null;
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
    }

    // Setup network status listeners
    setupNetworkListeners() {
        window.addEventListener('online', () => {
            console.log('Network: Online - Starting sync');
            this.isOnline = true;
            this.startSync();
        });

        window.addEventListener('offline', () => {
            console.log('Network: Offline - Storing doubts locally');
            this.isOnline = false;
            this.stopSync();
        });

        // Start sync if already online
        if (this.isOnline) {
            this.startSync();
        }
    }

    // Start automatic sync
    startSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }

        // Immediate sync attempt
        this.syncOfflineDoubts();

        // Periodic sync
        this.syncInterval = setInterval(() => {
            this.syncOfflineDoubts();
        }, this.SYNC_INTERVAL);
    }

    // Stop sync
    stopSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    // Store doubt offline
    storeDoubtOffline(doubtData) {
        const offlineDoubt = {
            id: this.generateId(),
            ...doubtData,
            status: 'offline_pending',
            createdAt: new Date().toISOString(),
            retryCount: 0,
            lastAttempt: null
        };

        const offlineDoubts = this.getOfflineDoubts();
        offlineDoubts.push(offlineDoubt);

        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(offlineDoubts));

        console.log('Doubt stored offline:', offlineDoubt);
        return offlineDoubt;
    }

    // Get offline doubts
    getOfflineDoubts() {
        const doubts = localStorage.getItem(this.OFFLINE_DOUBTS_KEY);
        return doubts ? JSON.parse(doubts) : [];
    }

    // Get pending sync queue
    getSyncQueue() {
        const queue = localStorage.getItem(this.SYNC_QUEUE_KEY);
        return queue ? JSON.parse(queue) : [];
    }

    // Add to sync queue
    addToSyncQueue(doubtId) {
        const queue = this.getSyncQueue();
        if (!queue.includes(doubtId)) {
            queue.push(doubtId);
            localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
        }
    }

    // Remove from sync queue
    removeFromSyncQueue(doubtId) {
        const queue = this.getSyncQueue();
        const updatedQueue = queue.filter(id => id !== doubtId);
        localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(updatedQueue));
    }

    // Sync offline doubts
    async syncOfflineDoubts() {
        if (!this.isOnline) {
            console.log('Offline - Skipping sync');
            return;
        }

        const offlineDoubts = this.getOfflineDoubts();
        const pendingDoubts = offlineDoubts.filter(doubt =>
            doubt.status === 'offline_pending' || doubt.status === 'sync_failed'
        );

        if (pendingDoubts.length === 0) {
            console.log('No offline doubts to sync');
            return;
        }

        console.log(`Syncing ${pendingDoubts.length} offline doubts...`);

        for (const doubt of pendingDoubts) {
            try {
                await this.syncSingleDoubt(doubt);
            } catch (error) {
                console.error('Error syncing doubt:', doubt.id, error);
                this.handleSyncError(doubt, error);
            }
        }
    }

    // Sync single doubt
    async syncSingleDoubt(doubt) {
        // Import createDoubt dynamically to avoid circular dependencies
        const { createDoubt } = await import('../appwrite/db');

        const doubtData = {
            name: doubt.name,
            email: doubt.email,
            subject: doubt.subject,
            doubt: doubt.doubt,
            status: 'pending'
        };

        try {
            const response = await createDoubt(doubtData);

            // Mark as synced
            this.markDoubtAsSynced(doubt.id, response.$id);

            console.log('Doubt synced successfully:', doubt.id, '->', response.$id);

            // Send success notification
            this.sendSyncNotification(doubt.name, 'success');

        } catch (error) {
            throw error;
        }
    }

    // Mark doubt as synced
    markDoubtAsSynced(offlineId, serverId) {
        const offlineDoubts = this.getOfflineDoubts();
        const updatedDoubts = offlineDoubts.map(doubt => {
            if (doubt.id === offlineId) {
                return {
                    ...doubt,
                    status: 'synced',
                    serverId: serverId,
                    syncedAt: new Date().toISOString()
                };
            }
            return doubt;
        });

        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(updatedDoubts));
        this.removeFromSyncQueue(offlineId);
    }

    // Handle sync error
    handleSyncError(doubt, error) {
        const offlineDoubts = this.getOfflineDoubts();
        const updatedDoubts = offlineDoubts.map(d => {
            if (d.id === doubt.id) {
                return {
                    ...d,
                    status: 'sync_failed',
                    retryCount: (d.retryCount || 0) + 1,
                    lastAttempt: new Date().toISOString(),
                    lastError: error.message
                };
            }
            return d;
        });

        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(updatedDoubts));

        // Add to retry queue if under max retries
        if (doubt.retryCount < this.MAX_RETRIES) {
            this.addToSyncQueue(doubt.id);
        } else {
            console.error('Max retries reached for doubt:', doubt.id);
            this.sendSyncNotification(doubt.name, 'failed');
        }
    }

    // Send sync notification
    sendSyncNotification(studentName, type) {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        let title, body;

        switch (type) {
            case 'success':
                title = '✅ Doubt Synced Successfully!';
                body = `Hi ${studentName}! Your offline doubt has been submitted to your teacher.`;
                break;
            case 'failed':
                title = '❌ Sync Failed';
                body = `Hi ${studentName}! We couldn't sync your doubt. Please try again when you have a better connection.`;
                break;
            default:
                return;
        }

        new Notification(title, {
            body,
            icon: '/favicon.ico',
            tag: 'doubt-sync'
        });
    }

    // Get sync status
    getSyncStatus() {
        const offlineDoubts = this.getOfflineDoubts();
        const pending = offlineDoubts.filter(d => d.status === 'offline_pending').length;
        const failed = offlineDoubts.filter(d => d.status === 'sync_failed').length;
        const synced = offlineDoubts.filter(d => d.status === 'synced').length;

        return {
            pending,
            failed,
            synced,
            total: offlineDoubts.length,
            isOnline: this.isOnline
        };
    }

    // Clear synced doubts (cleanup)
    clearSyncedDoubts() {
        const offlineDoubts = this.getOfflineDoubts();
        const activeDoubts = offlineDoubts.filter(d => d.status !== 'synced');
        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(activeDoubts));
    }

    // Generate unique ID
    generateId() {
        return 'offline_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get offline doubt by ID
    getOfflineDoubtById(id) {
        const offlineDoubts = this.getOfflineDoubts();
        return offlineDoubts.find(doubt => doubt.id === id);
    }

    // Update offline doubt
    updateOfflineDoubt(id, updates) {
        const offlineDoubts = this.getOfflineDoubts();
        const updatedDoubts = offlineDoubts.map(doubt => {
            if (doubt.id === id) {
                return { ...doubt, ...updates };
            }
            return doubt;
        });
        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(updatedDoubts));
    }

    // Delete offline doubt
    deleteOfflineDoubt(id) {
        const offlineDoubts = this.getOfflineDoubts();
        const updatedDoubts = offlineDoubts.filter(doubt => doubt.id !== id);
        localStorage.setItem(this.OFFLINE_DOUBTS_KEY, JSON.stringify(updatedDoubts));
        this.removeFromSyncQueue(id);
    }

    // Force sync (manual)
    async forceSync() {
        if (!this.isOnline) {
            throw new Error('Cannot sync while offline');
        }

        await this.syncOfflineDoubts();
    }

    // Get pending doubts count
    getPendingCount() {
        const offlineDoubts = this.getOfflineDoubts();
        return offlineDoubts.filter(d =>
            d.status === 'offline_pending' || d.status === 'sync_failed'
        ).length;
    }
}

// Export singleton instance
export const offlineDoubtService = new OfflineDoubtService();
