import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

const Modal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    type = 'info', // 'info', 'warning', 'error', 'success', 'confirm'
    confirmText = 'OK',
    cancelText = 'Cancel',
    showCancel = false
}) => {
    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'warning':
                return <AlertTriangle size={24} className="text-gray-700" />;
            case 'error':
                return <AlertCircle size={24} className="text-gray-700" />;
            case 'success':
                return <CheckCircle size={24} className="text-gray-700" />;
            case 'confirm':
                return <AlertTriangle size={24} className="text-gray-700" />;
            default:
                return <Info size={24} className="text-gray-700" />;
        }
    };

    const getIconBg = () => {
        switch (type) {
            case 'warning':
                return 'bg-orange-100';
            case 'error':
                return 'bg-red-100';
            case 'success':
                return 'bg-green-100';
            case 'confirm':
                return 'bg-blue-100';
            default:
                return 'bg-blue-100';
        }
    };

    const getConfirmButtonStyle = () => {
        switch (type) {
            case 'warning':
                return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500';
            case 'error':
                return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
            case 'success':
                return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
            default:
                return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="p-6">
                                {/* Icon */}
                                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${getIconBg()} mb-4`}>
                                    {getIcon()}
                                </div>

                                {/* Title */}
                                {title && (
                                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                                        {title}
                                    </h3>
                                )}

                                {/* Message */}
                                <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
                                    {message}
                                </p>

                                {/* Buttons */}
                                <div className={`flex gap-3 ${showCancel ? 'flex-row-reverse' : 'justify-center'}`}>
                                    <button
                                        onClick={onConfirm || onClose}
                                        className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getConfirmButtonStyle()}`}
                                    >
                                        {confirmText}
                                    </button>
                                    
                                    {showCancel && (
                                        <button
                                            onClick={onClose}
                                            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            {cancelText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;