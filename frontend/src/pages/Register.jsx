import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: null });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const success = await register(formData);
            if (success) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden bg-cyan-50">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-white/40">
                    {/* Gradient Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/15"
                        >
                            <UserPlus size={36} className="text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-black text-gray-900 mb-3">Join the Movement</h2>
                        <p className="text-gray-600 text-lg">Create your account and start making a difference</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-cyan-50 rounded-lg flex items-center justify-center">
                                    <User size={16} className="text-cyan-600" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-14 pr-4 py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all backdrop-blur-sm shadow-sm"
                                />
                            </div>
                            {errors.name && <p className="text-error text-sm mt-2">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-orange-50 rounded-lg flex items-center justify-center">
                                    <Mail size={16} className="text-orange-600" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-14 pr-4 py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all backdrop-blur-sm shadow-sm"
                                />
                            </div>
                            {errors.email && <p className="text-error text-sm mt-2">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-emerald-50 rounded-lg flex items-center justify-center">
                                    <Lock size={16} className="text-emerald-600" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-14 pr-14 py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all backdrop-blur-sm shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} className="text-gray-600" /> : <Eye size={16} className="text-gray-600" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-error text-sm mt-2">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all mt-8 ${loading
                                ? 'bg-gray-400 cursor-not-allowed opacity-70'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                <>
                                    Get Started <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-primary hover:text-secondary transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
