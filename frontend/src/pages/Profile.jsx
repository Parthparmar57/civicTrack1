import { useAuth } from '../context/AuthContext';
import { Mail, Phone, LogOut, User, Shield, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-2xl">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">Loading profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-white/10 to-white/5 p-8 border-b border-white/20">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl font-black text-white border border-white/30 shadow-xl">
                                {user.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-black text-white mb-2">{user.username}</h1>
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <Shield size={18} className="text-white/80" />
                                    <span className="text-white/80 font-medium">
                                        {user.role === 'admin' ? 'Administrator' : 'Citizen Reporter'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        <Mail size={24} className="text-blue-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Email Address</p>
                                        <p className="text-white font-semibold text-lg">{user.email}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                        <Phone size={24} className="text-green-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Phone Number</p>
                                        <p className="text-white font-semibold text-lg">{user.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                        <User size={24} className="text-purple-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">User ID</p>
                                        <p className="text-white font-semibold text-lg">{user._id?.slice(-8) || 'N/A'}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                        <Calendar size={24} className="text-orange-200" />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">Member Since</p>
                                        <p className="text-white font-semibold text-lg">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Account Actions */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Account Actions</h3>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { logout(); navigate('/login'); }}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 text-red-200 hover:text-white rounded-2xl font-semibold transition-all backdrop-blur-sm"
                            >
                                <LogOut size={20} /> 
                                Logout from Account
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
