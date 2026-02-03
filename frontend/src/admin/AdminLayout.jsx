import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="h-screen bg-white overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden md:flex h-full">
                <AdminSidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <AdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col h-full">
                <AdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 overflow-y-auto p-4 bg-white pb-20">
                    <Outlet />
                </main>
                <AdminSidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} isMobile={true} />
            </div>
        </div>
    );
};

export default AdminLayout;
