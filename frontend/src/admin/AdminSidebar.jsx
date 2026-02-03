import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    AlertCircle,
    LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const AdminSidebar = ({ isSidebarOpen, handleLogout, isMobile = false }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} className="text-gray-700" />, label: 'Dashboard', shortLabel: 'Home' },
        { path: '/admin/users', icon: <Users size={20} className="text-gray-700" />, label: 'Users Management', shortLabel: 'Users' },
        { path: '/admin/tasks', icon: <CheckSquare size={20} className="text-gray-700" />, label: 'Tasks Management', shortLabel: 'Tasks' },
        { path: '/admin/issues', icon: <AlertCircle size={20} className="text-gray-700" />, label: 'Issues & Reports', shortLabel: 'Issues' },
    ];

    const isActive = (path) => location.pathname === path;

    // Mobile Bottom Navigation
    if (isMobile) {
        return (
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 safe-area-pb">
                <div className="flex items-center justify-around max-w-md mx-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-0 flex-1",
                                isActive(item.path)
                                    ? "text-blue-600 bg-blue-100"
                                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                            )}
                        >
                            <span className={cn("transition-transform", isActive(item.path) ? "scale-110" : "")}>
                                {item.icon}
                            </span>
                            <span className="text-xs font-medium truncate w-full text-center">
                                {item.shortLabel}
                            </span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-all min-w-0 flex-1"
                    >
                        <LogOut size={20} className="text-gray-700" />
                        <span className="text-xs font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        );
    }

    // Desktop Sidebar
    return (
        <aside
            className={cn(
                "bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col",
                isSidebarOpen ? "w-64" : "w-20"
            )}
        >
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-600/20">
                    C
                </div>
                {isSidebarOpen && (
                    <span className="font-bold text-xl tracking-tight text-gray-900">CivicAdmin</span>
                )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                            isActive(item.path)
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        )}
                    >
                        <span className={cn("shrink-0", isActive(item.path) ? "text-white" : "group-hover:scale-110 transition-transform")}>
                            {item.icon}
                        </span>
                        {isSidebarOpen && (
                            <span className="font-medium text-sm">{item.label}</span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all group",
                        !isSidebarOpen && "justify-center"
                    )}
                >
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform text-gray-700" />
                    {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
