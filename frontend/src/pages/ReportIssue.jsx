import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, MapPin, Send, Camera, AlertTriangle } from 'lucide-react';
import Input from '../components/Input';

const categories = ['Pothole', 'Street Light', 'Waste Management', 'Water Leakage', 'Road Damage', 'Others'];

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Pothole',
        city: '',
        area: '',
        pincode: '',
        isAnonymous: false,
    });
    const [images, setImages] = useState([]); // For displaying previews
    const [imageFiles, setImageFiles] = useState([]); // For real upload
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        imageFiles.forEach((file) => {
            data.append('images', file);
        });

        try {
            await api.post('/tasks', data);
            toast.success('Issue reported successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Failed to report issue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-8 sm:pb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-repeat opacity-3"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23374151' stroke-width='0.5' stroke-opacity='0.1'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3Cg fill='%23374151' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-200 relative overflow-hidden"
                >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gray-50 rounded-full blur-[80px] pointer-events-none opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-blue-50 rounded-full blur-[60px] pointer-events-none opacity-30" />

                    <div className="text-center mb-8 sm:mb-10 relative z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-gray-200 shadow-sm">
                            <AlertTriangle size={28} className="sm:w-9 sm:h-9 text-gray-600" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">Report a Civic Issue</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Help us improve your city by providing details below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <Input
                                id="title"
                                name="title"
                                label="Issue Title"
                                placeholder="e.g., Deep Pothole on Main St."
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />

                            <div className="w-full space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Category</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <MapPin size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <Input
                                id="city"
                                name="city"
                                label="City"
                                placeholder="e.g., New York"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                id="area"
                                name="area"
                                label="Area / Neighborhood"
                                placeholder="e.g., Downtown"
                                value={formData.area}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                id="pincode"
                                name="pincode"
                                label="Pincode"
                                placeholder="e.g., 10001"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="w-full space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all resize-none shadow-sm hover:shadow-md text-sm sm:text-base"
                                placeholder="Describe the issue in detail..."
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="w-full space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">Evidence (Photos)</label>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-gray-50 transition-colors relative group bg-gray-50/50">
                                <AnimatePresence>
                                    {images.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                            {images.map((src, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="relative inline-block"
                                                >
                                                    <img src={src} alt={`Preview ${index}`} className="h-24 sm:h-32 w-full rounded-lg sm:rounded-xl object-cover shadow-md border border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveImage(index);
                                                        }}
                                                        className="absolute -top-2 -right-2 p-1 sm:p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"
                                                    >
                                                        <X size={12} className="sm:w-4 sm:h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 sm:py-8 group-hover:scale-105 transition-transform">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-gray-500 border border-gray-200 shadow-sm">
                                                <Camera size={28} className="sm:w-9 sm:h-9" />
                                            </div>
                                            <p className="text-gray-700 font-semibold text-base sm:text-lg mb-2">Click to upload or drag and drop</p>
                                            <p className="text-gray-500 text-sm sm:text-base">SVG, PNG, JPG or GIF (max. 5MB per file)</p>
                                        </div>
                                    )}
                                </AnimatePresence>

                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200">
                            <input
                                type="checkbox"
                                id="isAnonymous"
                                name="isAnonymous"
                                checked={formData.isAnonymous}
                                onChange={handleInputChange}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 bg-white text-gray-600 focus:ring-gray-300 cursor-pointer"
                            />
                            <label htmlFor="isAnonymous" className="text-gray-700 font-medium cursor-pointer text-sm sm:text-base">
                                Submit anonymously (Hide my identity)
                            </label>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-lg flex items-center justify-center gap-3 transition-all ${loading
                                ? 'bg-gray-400 cursor-not-allowed opacity-70 text-white'
                                : 'bg-gray-900 hover:bg-gray-800 text-white shadow-gray-900/20 hover:shadow-gray-900/30'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="text-base sm:text-xl">Submitting Report...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-base sm:text-xl">Submit Report</span>
                                    <Send size={20} className="sm:w-6 sm:h-6" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ReportIssue;
