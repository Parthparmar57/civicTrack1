import { Menu, ChevronRight, Bell, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const AdminNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useAuth();
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/users', label: 'Users Management' },
        { path: '/admin/tasks', label: 'Tasks Management' },
        { path: '/admin/issues', label: 'Issues & Reports' },
    ];

    const currentLabel = menuItems.find(i => i.path === location.pathname)?.label || 'Admin';

    return (
        <header className="h-16 sm:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Desktop Menu Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden md:flex p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>
                
                {/* Mobile Logo */}
                <div className="md:hidden flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                        C
                    </div>
                    <span className="font-bold text-lg text-gray-900">CivicAdmin</span>
                </div>

                {/* Desktop Breadcrumb */}
                <div className="hidden sm:flex items-center text-sm text-gray-500 gap-2">
                    <span>Admin</span>
                    <ChevronRight size={14} />
                    <span className="font-medium text-gray-900">
                        {currentLabel}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                    <Bell size={18} className="sm:w-5 sm:h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>

                <div className="hidden sm:block h-8 w-px bg-gray-200" />

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">System Administrator</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.charAt(0) || <UserIcon size={16} className="sm:w-5 sm:h-5" />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
