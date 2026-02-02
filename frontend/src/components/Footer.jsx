import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                            <div className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-gray-900">CivicTrack</span>
                                    <span className="text-sm text-gray-600 font-medium -mt-1">Community First</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
                                Empowering citizens to build better communities through transparent reporting and efficient issue tracking. Together, we make cities smarter and safer.
                            </p>
                            
                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                        <Mail size={18} className="text-indigo-600" />
                                    </div>
                                    <span className="font-medium">contact@civictrack.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <Phone size={18} className="text-emerald-600" />
                                    </div>
                                    <span className="font-medium">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <MapPin size={18} className="text-orange-600" />
                                    </div>
                                    <span className="font-medium">123 Civic Center, Democracy Ave</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Platform</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Browse Issues</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/report" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Report Issue</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Citizen Login</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Join Community</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal & Support */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Support</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Help Center</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Privacy Policy</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Terms of Service</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group">
                                        <span>Community Guidelines</span>
                                        <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 py-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>&copy; {new Date().getFullYear()} CivicTrack. All rights reserved.</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline flex items-center gap-1">
                                Made with <Heart size={16} className="text-red-500 mx-1" /> for better cities
                            </span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 font-medium">Follow us:</span>
                            <div className="flex items-center gap-3">
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                                >
                                    <Facebook size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-sky-50 hover:bg-sky-100 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                                >
                                    <Twitter size={18} className="text-sky-600 group-hover:scale-110 transition-transform" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-pink-50 hover:bg-pink-100 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                                >
                                    <Instagram size={18} className="text-pink-600 group-hover:scale-110 transition-transform" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-indigo-50 hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                                >
                                    <Linkedin size={18} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Scroll to Top */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;