import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Menu, X, Bell, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Brand with unique design */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors">
                                CivicTrack
                            </span>
                            <span className="text-xs text-gray-600 font-medium -mt-1">Community First</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {token ? (
                            <>
                                {/* Navigation Links */}
                                <div className="flex items-center gap-6">
                                    <Link 
                                        to="/dashboard" 
                                        className="text-gray-800 hover:text-purple-600 font-medium transition-colors relative group"
                                    >
                                        Dashboard
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                    <Link 
                                        to="/report" 
                                        className="text-gray-800 hover:text-purple-600 font-medium transition-colors relative group"
                                    >
                                        Report Issue
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </div>

                                {/* User Actions */}
                                <div className="flex items-center gap-4">
                                    <button className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all">
                                        <Search size={20} />
                                    </button>
                                    <button className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all relative">
                                        <Bell size={20} />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>
                                    
                                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                                <User size={16} className="text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">Welcome back!</span>
                                        </div>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg hover:shadow-red-500/25"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/login" 
                                    className="px-6 py-2.5 text-gray-800 hover:text-purple-600 font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-800 hover:text-purple-600 hover:bg-gray-50 rounded-xl transition-all"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
                        <div className="px-4 py-6 space-y-4">
                            {token ? (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        className="block px-4 py-3 text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-medium transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/report" 
                                        className="block px-4 py-3 text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-medium transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Report Issue
                                    </Link>
                                    <div className="border-t border-gray-200 pt-4">
                                        <button 
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="block px-4 py-3 text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-medium transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="block px-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-xl font-medium text-center transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
