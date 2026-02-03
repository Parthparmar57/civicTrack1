import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { MapPin, Calendar, Trash2, CheckCircle2, Clock, AlertCircle, ChevronLeft, ShieldAlert } from 'lucide-react';
import Loader from '../components/Loader';
import { cn } from '../lib/utils';

const AdminIssueDetail = () => {
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
                navigate('/admin/issues');
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id, navigate]);

    const updateStatus = async (newStatus) => {
        try {
            const { data } = await api.patch(`/admin/tasks/${id}/status`, { status: newStatus });
            setIssue(data.data);
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this issue? This action cannot be undone.")) return;
        try {
            await api.delete(`/admin/tasks/${id}`);
            toast.success("Issue deleted successfully");
            navigate('/admin/issues');
        } catch (error) {
            toast.error("Failed to delete issue");
        }
    };

    if (loading) return <Loader fullScreen />;
    if (!issue) return null;

    const statusColors = {
        pending: 'bg-amber-100 text-amber-700 border-amber-200',
        'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
        completed: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };

    const statusIcons = {
        pending: <Clock size={16} />,
        'in-progress': <AlertCircle size={16} />,
        completed: <CheckCircle2 size={16} />
    };

    return (
        <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto bg-white min-h-screen p-4 sm:p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm sm:text-base"
            >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" /> Back to Issues
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Image Gallery */}
                        {issue.images && issue.images.length > 0 ? (
                            <div className="bg-gray-50 border-b border-gray-100">
                                <div className="flex overflow-x-auto p-4 sm:p-6 gap-3 sm:gap-4 snap-x">
                                    {issue.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Evidence ${idx + 1}`}
                                            className="h-60 sm:h-80 w-auto flex-shrink-0 object-cover rounded-xl sm:rounded-2xl shadow-sm snap-center border border-white"
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 sm:h-64 bg-gray-50 flex flex-col items-center justify-center text-gray-400 border-b border-gray-100">
                                <AlertCircle size={32} className="sm:w-12 sm:h-12 mb-2 opacity-20" />
                                <p className="text-sm sm:text-base">No images provided</p>
                            </div>
                        )}

                        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div className="flex-1">
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">{issue.title}</h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm">
                                        <span className="flex items-center gap-1.5"><MapPin size={14} className="sm:w-4 sm:h-4 text-primary" /> {issue.city}, {issue.area} ({issue.pincode})</span>
                                        <span className="flex items-center gap-1.5"><Calendar size={14} className="sm:w-4 sm:h-4 text-primary" /> {new Date(issue.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase border flex items-center gap-1.5 sm:gap-2 self-start",
                                    statusColors[issue.status.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200'
                                )}>
                                    {statusIcons[issue.status.toLowerCase()]}
                                    <span className="hidden sm:inline">{issue.status}</span>
                                    <span className="sm:hidden">{issue.status.split('-')[0]}</span>
                                </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Description</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                    {issue.description || "No description provided for this report."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">Category</p>
                                    <p className="font-semibold text-gray-700 capitalize text-sm sm:text-base">{issue.category}</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">Reporter</p>
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base">
                                        {issue.isAnonymous ? "Anonymous Citizen" : issue.user?.name || "Unknown User"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-4 sm:space-y-6">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Admin Actions</h3>

                        <div className="space-y-3">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Change Status</p>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => updateStatus('in-progress')}
                                    disabled={issue.status === 'in-progress'}
                                    className={cn(
                                        "w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all",
                                        issue.status === 'in-progress'
                                            ? "bg-blue-50 text-blue-400 cursor-not-allowed"
                                            : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                                    )}
                                >
                                    <span className="hidden sm:inline">Mark as In Progress</span>
                                    <span className="sm:hidden">In Progress</span>
                                </button>
                                <button
                                    onClick={() => updateStatus('completed')}
                                    disabled={issue.status === 'completed'}
                                    className={cn(
                                        "w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shadow-emerald-500/10",
                                        issue.status === 'completed'
                                            ? "bg-emerald-50 text-emerald-400 cursor-not-allowed"
                                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                                    )}
                                >
                                    <span className="hidden sm:inline">Mark as Resolved</span>
                                    <span className="sm:hidden">Resolved</span>
                                </button>
                                <button
                                    onClick={() => updateStatus('pending')}
                                    disabled={issue.status === 'pending'}
                                    className={cn(
                                        "w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all",
                                        issue.status === 'pending'
                                            ? "bg-amber-50 text-amber-400 cursor-not-allowed"
                                            : "bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                                    )}
                                >
                                    <span className="hidden sm:inline">Reset to Pending</span>
                                    <span className="sm:hidden">Pending</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 sm:pt-6 border-t border-gray-100">
                            <button
                                onClick={handleDelete}
                                className="w-full py-2.5 sm:py-3 bg-red-50 text-red-600 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" /> 
                                <span className="hidden sm:inline">Delete Report</span>
                                <span className="sm:hidden">Delete</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg shadow-indigo-200 text-white space-y-3 sm:space-y-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                            <ShieldAlert size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="font-bold text-base sm:text-lg">System Audit</h4>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                            Changes made to this report are logged in the audit trail for accountability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminIssueDetail;
