import { Link } from 'react-router-dom';
import { LogIn, ArrowRight, ShieldCheck, Activity, Users, Zap, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Landing = () => {
    return (
        <div className="relative isolate text-text-main overflow-hidden bg-white min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 -z-20">
                {/* Civic Pattern Background */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='civic-pattern' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Cg fill='%236366f1' fill-opacity='0.08'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Cpath d='M20 20h10v10h-10z' fill='none' stroke='%236366f1' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Cpath d='M15 25h20M25 15v20' stroke='%236366f1' stroke-width='0.3' stroke-opacity='0.05'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23civic-pattern)'/%3E%3C/svg%3E")`
                    }}
                />
                
                {/* City Skyline SVG Background */}
                <div className="absolute bottom-0 left-0 right-0 h-64 opacity-8">
                    <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15"/>
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
                            </linearGradient>
                            <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2"/>
                            </linearGradient>
                        </defs>
                        
                        {/* Buildings with varying heights */}
                        <rect x="0" y="150" width="80" height="150" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="100" y="100" width="60" height="200" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="180" y="120" width="70" height="180" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="270" y="80" width="90" height="220" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="380" y="110" width="65" height="190" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="465" y="90" width="75" height="210" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="560" y="130" width="55" height="170" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="635" y="70" width="85" height="230" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="740" y="105" width="70" height="195" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="830" y="125" width="60" height="175" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="910" y="95" width="80" height="205" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="1010" y="140" width="65" height="160" fill="url(#buildingGradient)" rx="2"/>
                        <rect x="1095" y="115" width="75" height="185" fill="url(#buildingGradient)" rx="2"/>
                        
                        {/* Windows with warm glow */}
                        <g fill="url(#windowGradient)">
                            {/* Building 1 windows */}
                            <rect x="15" y="170" width="8" height="12" rx="1"/>
                            <rect x="35" y="170" width="8" height="12" rx="1"/>
                            <rect x="55" y="170" width="8" height="12" rx="1"/>
                            <rect x="15" y="200" width="8" height="12" rx="1"/>
                            <rect x="35" y="200" width="8" height="12" rx="1"/>
                            <rect x="55" y="200" width="8" height="12" rx="1"/>
                            <rect x="15" y="230" width="8" height="12" rx="1"/>
                            <rect x="35" y="230" width="8" height="12" rx="1"/>
                            <rect x="55" y="230" width="8" height="12" rx="1"/>
                            
                            {/* Building 2 windows */}
                            <rect x="115" y="130" width="6" height="10" rx="1"/>
                            <rect x="130" y="130" width="6" height="10" rx="1"/>
                            <rect x="145" y="130" width="6" height="10" rx="1"/>
                            <rect x="115" y="160" width="6" height="10" rx="1"/>
                            <rect x="130" y="160" width="6" height="10" rx="1"/>
                            <rect x="145" y="160" width="6" height="10" rx="1"/>
                            <rect x="115" y="190" width="6" height="10" rx="1"/>
                            <rect x="130" y="190" width="6" height="10" rx="1"/>
                            <rect x="145" y="190" width="6" height="10" rx="1"/>
                            
                            {/* Building 3 windows */}
                            <rect x="200" y="140" width="7" height="11" rx="1"/>
                            <rect x="220" y="140" width="7" height="11" rx="1"/>
                            <rect x="235" y="140" width="7" height="11" rx="1"/>
                            <rect x="200" y="170" width="7" height="11" rx="1"/>
                            <rect x="220" y="170" width="7" height="11" rx="1"/>
                            <rect x="235" y="170" width="7" height="11" rx="1"/>
                            <rect x="200" y="200" width="7" height="11" rx="1"/>
                            <rect x="220" y="200" width="7" height="11" rx="1"/>
                            <rect x="235" y="200" width="7" height="11" rx="1"/>
                            
                            {/* More buildings windows */}
                            <rect x="290" y="100" width="8" height="12" rx="1"/>
                            <rect x="310" y="100" width="8" height="12" rx="1"/>
                            <rect x="330" y="100" width="8" height="12" rx="1"/>
                            <rect x="290" y="130" width="8" height="12" rx="1"/>
                            <rect x="310" y="130" width="8" height="12" rx="1"/>
                            <rect x="330" y="130" width="8" height="12" rx="1"/>
                            
                            <rect x="485" y="110" width="7" height="10" rx="1"/>
                            <rect x="505" y="110" width="7" height="10" rx="1"/>
                            <rect x="520" y="110" width="7" height="10" rx="1"/>
                            <rect x="485" y="140" width="7" height="10" rx="1"/>
                            <rect x="505" y="140" width="7" height="10" rx="1"/>
                            <rect x="520" y="140" width="7" height="10" rx="1"/>
                            
                            <rect x="655" y="90" width="9" height="13" rx="1"/>
                            <rect x="675" y="90" width="9" height="13" rx="1"/>
                            <rect x="695" y="90" width="9" height="13" rx="1"/>
                            <rect x="655" y="120" width="9" height="13" rx="1"/>
                            <rect x="675" y="120" width="9" height="13" rx="1"/>
                            <rect x="695" y="120" width="9" height="13" rx="1"/>
                        </g>
                        
                        {/* Subtle clouds */}
                        <g fill="#ffffff" fillOpacity="0.1">
                            <ellipse cx="200" cy="50" rx="30" ry="15"/>
                            <ellipse cx="500" cy="40" rx="40" ry="20"/>
                            <ellipse cx="800" cy="60" rx="35" ry="18"/>
                            <ellipse cx="1000" cy="45" rx="25" ry="12"/>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Animated floating elements */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-purple-200/40 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-pink-200/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-60 left-1/3 w-3 h-3 bg-blue-200/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-purple-200/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pt-32 lg:pb-32">
                {/* Hero Background Pattern */}
                <div className="absolute inset-0 opacity-3">
                    <div 
                        className="absolute inset-0 bg-repeat"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236366f1' stroke-width='0.5' stroke-opacity='0.1'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                </div>
                
                <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold border border-purple-200 flex items-center gap-2 shadow-sm">
                                <Zap size={16} />
                                Empowering Communities Worldwide
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-none text-gray-900">
                            Transform Your <br className="hidden md:block" />
                            <span className="text-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Community</span> Today
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                            Join thousands of citizens making real change. Report issues, track progress, and collaborate with local authorities in real-time.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
                            <Link
                                to="/register"
                                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span className="hidden sm:inline">Start Making Impact</span>
                                <span className="sm:hidden">Get Started</span>
                                <ArrowRight size={20} className="sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 font-bold text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 text-gray-700 hover:text-purple-600 shadow-lg hover:shadow-xl"
                            >
                                <LogIn size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" /> 
                                Sign In
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { number: "50K+", label: "Issues Resolved", icon: <ShieldCheck size={32} className="text-emerald-600" /> },
                            { number: "25K+", label: "Active Citizens", icon: <Users size={32} className="text-pink-600" /> },
                            { number: "100+", label: "Cities Connected", icon: <Globe size={32} className="text-blue-600" /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-center mb-4">{stat.icon}</div>
                                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">How It Works</h2>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto">Three simple steps to create lasting change in your community.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck size={40} className="text-emerald-600" />,
                                title: "Report Instantly",
                                desc: "Snap a photo, add details, and submit issues in seconds. Your privacy is protected with anonymous reporting options.",
                                gradient: "from-emerald-50 to-emerald-100"
                            },
                            {
                                icon: <Activity size={40} className="text-pink-600" />,
                                title: "Track Progress",
                                desc: "Get real-time updates as authorities verify, assign, and resolve your reported issues. Stay informed every step of the way.",
                                gradient: "from-pink-50 to-pink-100"
                            },
                            {
                                icon: <Heart size={40} className="text-blue-600" />,
                                title: "Build Community",
                                desc: "See verified issues on a live map, support neighbors, and witness the collective impact of your community.",
                                gradient: "from-blue-50 to-blue-100"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white p-10 rounded-3xl relative group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border border-gray-100 group-hover:border-gray-200 transition-colors shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-6 group-hover:text-gray-900 transition-colors text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-12 rounded-3xl shadow-2xl text-white"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Make a Difference?</h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Join our growing community of changemakers and help build the future of civic engagement.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-white text-purple-600 font-bold text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                        >
                            Join the Movement <ArrowRight size={24} />
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Landing;
