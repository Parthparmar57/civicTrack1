import { Loader2 } from 'lucide-react';

const Loader = ({ size = 24, className = '', fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-white bg-opacity-80 absolute top-0 left-0 z-50">
                <Loader2 className={`animate-spin text-primary ${className}`} size={48} />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-4">
            <Loader2 className={`animate-spin text-primary ${className}`} size={size} />
        </div>
    );
};

export default Loader;
