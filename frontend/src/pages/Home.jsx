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

const Home = () => {
    return (
        <div className="relative isolate text-text-main overflow-hidden bg-white min-h-screen">
            {/* Main Background Image */}
            <div className="absolute inset-0 -z-20">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/civic landing.jpeg')`
                    }}
                />
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Subtle animated floating elements with better visibility */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-white/60 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-white/50 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-60 left-1/3 w-3 h-3 bg-white/70 rounded-full animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-white/55 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pt-32 lg:pb-32">
                <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                            <span className="px-6 py-2 rounded-full bg-white/90 backdrop-blur-sm text-purple-700 text-sm font-semibold border border-white/50 flex items-center gap-2 shadow-lg">
                                <Zap size={16} className="text-black hover:text-black" />
                                Welcome to CivicTrack
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-none text-white drop-shadow-lg">
                            Your Civic <br className="hidden md:block" />
                            <span className="text-blue-300 drop-shadow-lg">Engagement</span> Hub
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-md">
                            Connect with your community, report issues, and track progress. Make your voice heard and create positive change in your neighborhood.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
                            <Link
                                to="/dashboard"
                                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg sm:text-xl shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span className="hidden sm:inline">Go to Dashboard</span>
                                <span className="sm:hidden">Dashboard</span>
                                <ArrowRight size={20} className="sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform text-black hover:text-black" />
                            </Link>
                            <Link
                                to="/report"
                                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-white/50 hover:border-white font-bold text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 shadow-lg hover:shadow-xl"
                            >
                                <ShieldCheck size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform text-black hover:text-black" /> 
                                Report Issue
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats Section */}
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
                            { number: "Active", label: "Community Hub", icon: <Activity size={32} className="text-black hover:text-black" /> },
                            { number: "Connected", label: "Citizens", icon: <Users size={32} className="text-black hover:text-black" /> },
                            { number: "Real-time", label: "Issue Tracking", icon: <Globe size={32} className="text-black hover:text-black" /> }
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
                                <div className="text-2xl font-black text-gray-900 mb-2">{stat.number}</div>
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
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">Your Civic Tools</h2>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto">Everything you need to engage with your community and make a difference.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck size={40} className="text-black hover:text-black" />,
                                title: "Report Issues",
                                desc: "Quickly report civic issues in your area with photos and detailed descriptions. Help improve your community.",
                                gradient: "from-emerald-50 to-emerald-100",
                                link: "/report"
                            },
                            {
                                icon: <Activity size={40} className="text-black hover:text-black" />,
                                title: "Track Progress",
                                desc: "Monitor the status of reported issues and see real-time updates from local authorities.",
                                gradient: "from-pink-50 to-pink-100",
                                link: "/dashboard"
                            },
                            {
                                icon: <Heart size={40} className="text-black hover:text-black" />,
                                title: "Community Impact",
                                desc: "View your community's collective impact and see how your contributions make a difference.",
                                gradient: "from-blue-50 to-blue-100",
                                link: "/dashboard"
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
                                <div className={`absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border border-gray-100 group-hover:border-gray-200 transition-colors shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-6 group-hover:text-gray-900 transition-colors text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        {feature.desc}
                                    </p>
                                    <Link
                                        to={feature.link}
                                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                                    >
                                        Get Started <ArrowRight size={16} className="text-black hover:text-black" />
                                    </Link>
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
                        className="bg-blue-600 hover:bg-blue-700 p-12 rounded-3xl shadow-2xl text-white"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Start Making an Impact Today</h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Your community needs your voice. Join thousands of citizens who are already making a difference.
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-white text-blue-600 hover:text-blue-700 font-bold text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                        >
                            Access Dashboard <ArrowRight size={24} className="text-black hover:text-black" />
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Home;
