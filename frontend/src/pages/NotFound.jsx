import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex flex-col items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-2xl max-w-md w-full"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30"
                >
                    <AlertTriangle size={40} className="text-white" />
                </motion.div>
                
                <h1 className="text-6xl font-black text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
                <p className="text-white/80 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                >
                    <Home size={20} /> Go to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
