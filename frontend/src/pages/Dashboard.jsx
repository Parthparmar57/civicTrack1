import { useState, useEffect } from 'react';
import api from '../services/api';
import IssueCard from '../components/IssueCard';
import { Plus, Filter, Loader2, BarChart3, Users, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const { data } = await api.get('/tasks');
                setIssues(data.data || data);
            } catch (error) {
                console.error("Failed to list issues", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    const filteredIssues = filter === 'all'
        ? issues
        : issues.filter(issue => issue.status.toLowerCase() === filter);

    const stats = {
        total: issues.length,
        pending: issues.filter(i => i.status.toLowerCase() === 'pending').length,
        inProgress: issues.filter(i => i.status.toLowerCase() === 'in-progress').length,
        completed: issues.filter(i => i.status.toLowerCase() === 'completed').length
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
                <Loader2 className="animate-spin text-black hover:text-black mb-4 mx-auto" size={48} />
                <p className="text-gray-700 text-lg font-medium animate-pulse">Loading civic issues...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <div 
                    className="absolute inset-0 bg-repeat opacity-3"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23374151' stroke-width='0.5' stroke-opacity='0.1'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3Cg fill='%23374151' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-6 mb-8 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2">Community Dashboard</h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600">Real-time overview of reported issues in your area.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
                            <div className="relative group flex-1 sm:flex-none">
                                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black hover:text-black group-hover:text-black transition-colors" />
                                <select
                                    className="w-full sm:w-auto pl-10 pr-8 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all cursor-pointer appearance-none shadow-sm hover:shadow-md min-w-[140px]"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <Link
                                to="/report"
                                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                            >
                                <Plus size={18} /> 
                                <span className="sm:hidden">Report Issue</span>
                                <span className="hidden sm:inline">Report Issue</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center shadow-sm">
                                <BarChart3 size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black hover:text-black" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide truncate">Total Issues</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-orange-100 rounded-lg lg:rounded-xl flex items-center justify-center shadow-sm">
                                <AlertCircle size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black hover:text-black" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide truncate">Pending</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{stats.pending}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center shadow-sm">
                                <Users size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black hover:text-black" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide truncate">In Progress</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{stats.inProgress}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center shadow-sm">
                                <BarChart3 size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black hover:text-black" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide truncate">Completed</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{stats.completed}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Issues Grid */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {filter === 'all' ? 'All Issues' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Issues`}
                        </h3>
                        <span className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 self-start sm:self-auto">
                            {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'}
                        </span>
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {issues.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center p-8 sm:p-12 lg:p-16 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <AlertCircle size={32} className="sm:w-10 sm:h-10 text-black hover:text-black" />
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No Issues Reported Yet</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
                                Be the first to make a difference in your community by reporting a civic issue.
                            </p>
                            <Link 
                                to="/report" 
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                <Plus size={18} className="sm:w-5 sm:h-5 text-black hover:text-black" />
                                Report First Issue
                            </Link>
                        </motion.div>
                    ) : filteredIssues.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center p-8 sm:p-12 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm"
                        >
                            <AlertCircle size={40} className="sm:w-12 sm:h-12 text-black hover:text-black mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No {filter} Issues Found</h3>
                            <p className="text-sm sm:text-base text-gray-500">Try selecting a different filter to see more issues.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        >
                            {filteredIssues.map(issue => (
                                <IssueCard key={issue._id} issue={issue} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dashboard;
