import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    AlertTriangle,
    MapPin,
    Eye,
    MessageSquare,
    Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { cn } from '../lib/utils';

const AdminIssues = () => {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const { data } = await api.get('/admin/tasks');
                setIssues(data.data);
            } catch (error) {
                console.error("Failed to fetch issues", error);
                toast.error("Failed to load issues");
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const { data } = await api.patch(`/admin/tasks/${id}/status`, { status });
            setIssues(issues.map(i => i._id === id ? data.data : i));
            toast.success(`Issue marked as ${status}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDeleteIssue = async (id) => {
        console.log("Attempting to delete issue:", id);
        if (!window.confirm("Are you sure you want to delete this issue?")) return;
        try {
            await api.delete(`/admin/tasks/${id}`);
            setIssues(issues.filter(i => i._id !== id));
            toast.success("Issue deleted successfully");
        } catch (error) {
            console.error("Delete issue error", error);
            toast.error("Failed to delete issue");
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 bg-white min-h-screen">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Issues & Reports</h1>
                <p className="text-sm sm:text-base text-gray-600">Review and resolve reported civic issues from citizens.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-2">
                {issues.map((issue) => (
                    <motion.div
                        key={issue._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                    >
                        {/* Image Section */}
                        <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-100 shrink-0 relative group">
                            {issue.images && issue.images.length > 0 ? (
                                <img
                                    src={issue.images[0]}
                                    alt={issue.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <AlertTriangle size={32} className="sm:w-12 sm:h-12" />
                                </div>
                            )}
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                <span className={cn(
                                    "px-2 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm",
                                    issue.status === 'completed' ? "bg-emerald-500 text-white" :
                                        issue.status === 'in-progress' ? "bg-primary text-white" : "bg-amber-500 text-white"
                                )}>
                                    <span className="hidden sm:inline">{issue.status}</span>
                                    <span className="sm:hidden">{issue.status.split('-')[0]}</span>
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-start gap-3 sm:gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight line-clamp-2">{issue.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                                            <MapPin size={10} className="sm:w-3 sm:h-3" />
                                            <span className="truncate">{issue.city}, {issue.area} ({issue.pincode})</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-semibold text-gray-500 truncate">{issue.category}</p>
                                        <p className="text-[10px] text-gray-400">{new Date(issue.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                    {issue.description}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <div className="flex items-center gap-1 group cursor-pointer hover:text-primary transition-colors">
                                        <MessageSquare size={12} className="sm:w-3.5 sm:h-3.5" />
                                        <span className="truncate">User: {issue.isAnonymous ? 'Anonymous' : issue.user?.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => updateStatus(issue._id, 'in-progress')}
                                    className="flex-1 px-3 sm:px-4 py-2 bg-gray-50 text-primary border border-primary/20 rounded-lg sm:rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all"
                                >
                                    <span className="hidden sm:inline">In Progress</span>
                                    <span className="sm:hidden">Progress</span>
                                </button>
                                <button
                                    onClick={() => updateStatus(issue._id, 'completed')}
                                    className="flex-1 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg sm:rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                >
                                    Resolve
                                </button>
                                <div className="flex gap-2 sm:gap-0 sm:ml-2">
                                    <button
                                        onClick={() => navigate(`/admin/issues/${issue._id}`)}
                                        className="flex-1 sm:flex-none p-2 bg-gray-50 text-gray-400 border border-gray-100 rounded-lg sm:rounded-xl hover:text-primary transition-colors"
                                        title="View Details"
                                    >
                                        <Eye size={16} className="sm:w-4.5 sm:h-4.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteIssue(issue._id)}
                                        className="flex-1 sm:flex-none p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg sm:rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                        title="Delete Issue"
                                    >
                                        <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {issues.length === 0 && (
                <div className="text-center py-16 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-gray-200">
                    <AlertTriangle className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-gray-400 font-medium tracking-wide text-sm sm:text-base">No issues reported yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminIssues;
