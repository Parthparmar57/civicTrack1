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
        <div className="flex h-screen bg-white overflow-hidden">
            <AdminSidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-8 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
