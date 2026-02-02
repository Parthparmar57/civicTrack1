import { MapPin, Calendar, AlertCircle, ArrowUpRight, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const statusColors = {
    pending: 'bg-orange-100 text-orange-700 border-orange-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
};

const IssueCard = ({ issue: initialIssue }) => {
    const [issue, setIssue] = useState(initialIssue);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const toastId = toast.loading('Uploading evidence...');

        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            const { data } = await api.put(`/tasks/${issue._id}`, formData);
            setIssue(data.data);
            toast.success('Evidence updated!', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Upload failed. Try again.', { id: toastId });
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
        >
            <div className="relative h-40 sm:h-48 overflow-hidden">
                {issue.images && issue.images.length > 0 ? (
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={issue.images[0]}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <AlertCircle size={28} className="sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                )}
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent" />

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border ${statusColors[issue.status.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {issue.status}
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-6 relative">
                <div className="text-gray-500 text-xs font-bold tracking-wider uppercase mb-2">
                    {issue.category}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {issue.title}
                </h3>

                <div className="space-y-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <MapPin size={12} className="sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{issue.city}, {issue.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                        to={`/issues/${issue._id}`}
                        className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white border border-gray-200 hover:border-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                        <ArrowUpRight size={16} className="sm:w-4 sm:h-4" />
                    </Link>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="sm:flex-shrink-0 py-2.5 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-600 text-gray-600 transition-all duration-300 group/upload flex items-center justify-center"
                        disabled={uploading}
                        title="Upload Evidence"
                    >
                        <Upload size={16} className={`sm:w-4 sm:h-4 ${uploading ? 'animate-bounce' : 'group-hover/upload:scale-110 transition-transform'}`} />
                        <span className="ml-2 sm:hidden text-xs">Upload</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default IssueCard;
