import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const Input = forwardRef(({ label, error, className, id, type = "text", ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-semibold text-gray-700 ml-1"
                >
                    {label}
                </label>
            )}
            <motion.div
                whileTap={{ scale: 0.995 }}
                className="relative"
            >
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    className={cn(
                        "w-full px-4 py-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md",
                        error && "border-red-400 focus:ring-red-500/30 focus:border-red-500",
                        className
                    )}
                    {...props}
                />
            </motion.div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 ml-1 font-medium"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
