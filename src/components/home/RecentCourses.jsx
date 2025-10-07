import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { progressService } from '../../lib/progressService';

const RecentCourses = () => {
    const recentCourses = progressService.getRecentCourses();
    const learningStreak = progressService.getLearningStreak();

    if (recentCourses.length === 0) {
        return null; // Don't show section if no recent courses
    }

    const formatLastOpened = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <section className="py-10 px-6 bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Header with Learning Streak */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Continue Learning</h2>
                        <p className="text-gray-600">Pick up where you left off</p>
                    </div>

                    {/* Learning Streak Badge */}
                    {learningStreak > 0 && (
                        <div className="flex items-center bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span className="font-semibold">{learningStreak} day streak!</span>
                        </div>
                    )}
                </div>

                {/* Recent Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentCourses.map((course) => (
                        <Link
                            key={course.id}
                            to={`/lesson/${course.id}`}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* Course Image */}
                            <div className="relative h-32 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-white opacity-80" />
                                    </div>
                                )}

                                {/* Progress Badge */}
                                {course.progress.completedLessons > 0 && (
                                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                                        {course.progress.completedLessons} completed
                                    </div>
                                )}
                            </div>

                            {/* Course Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                    {course.name}
                                </h3>

                                {/* Progress Bar */}
                                {course.progress.completedLessons > 0 && (
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{course.progress.completedLessons} lessons</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${Math.min((course.progress.completedLessons / 10) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Last Opened */}
                                <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>Last opened {formatLastOpened(course.lastOpened)}</span>
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </Link>
                    ))}
                </div>

                {/* View All Courses Link */}
                <div className="text-center mt-8">
                    <Link
                        to="/modules"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        View All Courses
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecentCourses;
