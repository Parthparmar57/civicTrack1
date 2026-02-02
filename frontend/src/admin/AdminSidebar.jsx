import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    AlertCircle,
    LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const AdminSidebar = ({ isSidebarOpen, handleLogout }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users Management' },
        { path: '/admin/tasks', icon: <CheckSquare size={20} />, label: 'Tasks Management' },
        { path: '/admin/issues', icon: <AlertCircle size={20} />, label: 'Issues & Reports' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside
            className={cn(
                "bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col",
                isSidebarOpen ? "w-64" : "w-20"
            )}
        >
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-primary/20">
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
                                ? "bg-gradient-to-r from-primary via-secondary to-accent-orange text-white shadow-lg shadow-primary/20"
                                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
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
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
