import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { MapPin, Calendar, ArrowLeft, User, Tag, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const IssueDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const { data } = await api.get(`/tasks/${id}`);
                setIssue(data.data || data);
            } catch (error) {
                console.error("Failed to fetch issue", error);
                toast.error("Issue not found");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center pt-20">
            <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-lg">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg font-medium">Loading issue details...</p>
            </div>
        </div>
    );

    if (!issue) return null;

    const statusColors = {
        completed: 'bg-green-100 text-green-700 border-green-200',
        'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
        pending: 'bg-orange-100 text-orange-700 border-orange-200',
        rejected: 'bg-red-100 text-red-700 border-red-200'
    };

    return (
        <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 sm:mb-8 font-medium transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Image Gallery */}
                    {issue.images && issue.images.length > 0 && (
                        <div className="w-full bg-gray-50 border-b border-gray-100">
                            <div className="flex overflow-x-auto p-4 sm:p-6 gap-3 sm:gap-4 snap-x">
                                {issue.images.map((img, idx) => (
                                    <motion.img
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        src={img}
                                        alt={`Issue ${idx + 1}`}
                                        className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto flex-shrink-0 object-cover rounded-xl sm:rounded-2xl shadow-sm snap-center border border-white"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
                            <div className="flex-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{issue.title}</h1>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 text-sm sm:text-base">
                                    <span className="flex items-center gap-2">
                                        <MapPin size={16} className="sm:w-4.5 sm:h-4.5 text-primary" />
                                        {issue.city}, {issue.area}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Calendar size={16} className="sm:w-4.5 sm:h-4.5 text-primary" />
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className={`self-start px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold uppercase border ${statusColors[issue.status.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                {issue.status}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Description</h3>
                            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                    {issue.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Tag size={18} className="sm:w-5 sm:h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Category</p>
                                        <p className="text-gray-900 font-semibold text-sm sm:text-base">{issue.category}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Hash size={18} className="sm:w-5 sm:h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Pincode</p>
                                        <p className="text-gray-900 font-semibold text-sm sm:text-base">{issue.pincode}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <User size={18} className="sm:w-5 sm:h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Reported By</p>
                                        <p className="text-gray-900 font-semibold text-sm sm:text-base">
                                            {issue.isAnonymous ? "Anonymous Citizen" : issue.user?.name || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default IssueDetail;
