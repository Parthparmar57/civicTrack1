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
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-2xl">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">Loading issue details...</p>
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
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-medium transition-colors bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
                >
                    {/* Image Gallery */}
                    {issue.images && issue.images.length > 0 && (
                        <div className="w-full bg-white/10 border-b border-white/20">
                            <div className="flex overflow-x-auto p-6 gap-4 snap-x">
                                {issue.images.map((img, idx) => (
                                    <motion.img
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        src={img}
                                        alt={`Issue ${idx + 1}`}
                                        className="h-64 sm:h-80 md:h-96 w-auto flex-shrink-0 object-cover rounded-2xl shadow-xl snap-center border border-white/20"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-8">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-white mb-4">{issue.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-white/80">
                                    <span className="flex items-center gap-2">
                                        <MapPin size={18} className="text-pink-300" />
                                        {issue.city}, {issue.area}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Calendar size={18} className="text-blue-300" />
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-sm font-bold uppercase border ${statusColors[issue.status.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                {issue.status}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                                <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
                                    {issue.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                        <Tag size={20} className="text-purple-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Category</p>
                                        <p className="text-white font-semibold">{issue.category}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                        <Hash size={20} className="text-orange-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Pincode</p>
                                        <p className="text-white font-semibold">{issue.pincode}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                                        <User size={20} className="text-green-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Reported By</p>
                                        <p className="text-white font-semibold">
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
