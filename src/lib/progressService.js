// Progress Tracking Service
// Handles course progress, recently opened courses, and local storage

class ProgressService {
    constructor() {
        this.PROGRESS_KEY = 'smartpathshala_progress';
        this.RECENT_COURSES_KEY = 'smartpathshala_recent_courses';
        this.MAX_RECENT_COURSES = 6; // Maximum number of recent courses to store
    }

    // Track course opening
    trackCourseOpen(courseId, courseName, courseImage) {
        const recentCourses = this.getRecentCourses();

        // Remove if already exists
        const filteredCourses = recentCourses.filter(course => course.id !== courseId);

        // Add to beginning
        const newCourse = {
            id: courseId,
            name: courseName,
            image: courseImage,
            lastOpened: new Date().toISOString(),
            progress: this.getCourseProgress(courseId)
        };

        const updatedCourses = [newCourse, ...filteredCourses].slice(0, this.MAX_RECENT_COURSES);

        localStorage.setItem(this.RECENT_COURSES_KEY, JSON.stringify(updatedCourses));
        return updatedCourses;
    }

    // Get recent courses
    getRecentCourses() {
        const courses = localStorage.getItem(this.RECENT_COURSES_KEY);
        return courses ? JSON.parse(courses) : [];
    }

    // Track lesson completion
    trackLessonCompletion(courseId, lessonId) {
        const progress = this.getProgress();
        const courseProgress = progress[courseId] || { lessonsCompleted: [], lastAccessed: null };

        if (!courseProgress.lessonsCompleted.includes(lessonId)) {
            courseProgress.lessonsCompleted.push(lessonId);
            courseProgress.lastAccessed = new Date().toISOString();
            progress[courseId] = courseProgress;

            localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));

            // Update recent courses
            this.updateRecentCourseProgress(courseId);
        }

        return courseProgress;
    }

    // Get course progress
    getCourseProgress(courseId) {
        const progress = this.getProgress();
        const courseProgress = progress[courseId] || { lessonsCompleted: [], lastAccessed: null };

        return {
            completedLessons: courseProgress.lessonsCompleted.length,
            lastAccessed: courseProgress.lastAccessed,
            progressPercentage: 0 // Will be calculated based on total lessons
        };
    }

    // Get all progress
    getProgress() {
        const progress = localStorage.getItem(this.PROGRESS_KEY);
        return progress ? JSON.parse(progress) : {};
    }

    // Update recent course progress
    updateRecentCourseProgress(courseId) {
        const recentCourses = this.getRecentCourses();
        const updatedCourses = recentCourses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    progress: this.getCourseProgress(courseId)
                };
            }
            return course;
        });

        localStorage.setItem(this.RECENT_COURSES_KEY, JSON.stringify(updatedCourses));
    }

    // Get course statistics
    getCourseStats(courseId) {
        const progress = this.getProgress();
        const courseProgress = progress[courseId] || { lessonsCompleted: [], lastAccessed: null };

        return {
            totalLessonsCompleted: courseProgress.lessonsCompleted.length,
            lastAccessed: courseProgress.lastAccessed,
            isRecentlyAccessed: this.isRecentlyAccessed(courseProgress.lastAccessed)
        };
    }

    // Check if course was accessed recently (within 7 days)
    isRecentlyAccessed(lastAccessed) {
        if (!lastAccessed) return false;
        const lastAccessDate = new Date(lastAccessed);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return lastAccessDate > sevenDaysAgo;
    }

    // Clear all progress
    clearAllProgress() {
        localStorage.removeItem(this.PROGRESS_KEY);
        localStorage.removeItem(this.RECENT_COURSES_KEY);
    }

    // Clear specific course progress
    clearCourseProgress(courseId) {
        const progress = this.getProgress();
        delete progress[courseId];
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));

        // Remove from recent courses
        const recentCourses = this.getRecentCourses();
        const filteredCourses = recentCourses.filter(course => course.id !== courseId);
        localStorage.setItem(this.RECENT_COURSES_KEY, JSON.stringify(filteredCourses));
    }

    // Get learning streak (consecutive days with activity)
    getLearningStreak() {
        const progress = this.getProgress();
        const allDates = Object.values(progress)
            .map(course => course.lastAccessed)
            .filter(date => date)
            .map(date => new Date(date).toDateString())
            .sort();

        if (allDates.length === 0) return 0;

        let streak = 1;
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        // Check if user was active today or yesterday
        if (!allDates.includes(today) && !allDates.includes(yesterdayStr)) {
            return 0;
        }

        // Calculate consecutive days
        for (let i = allDates.length - 1; i > 0; i--) {
            const currentDate = new Date(allDates[i]);
            const previousDate = new Date(allDates[i - 1]);
            const diffTime = currentDate - previousDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }
}

// Export singleton instance
export const progressService = new ProgressService();
