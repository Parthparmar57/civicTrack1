import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Trash2,
    ShieldAlert,
    User as UserIcon,
    MoreVertical,
    Search,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { cn } from '../lib/utils';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/admin/users');
                setUsers(data.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
                toast.error("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const toggleRole = async (user) => {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
        try {
            const { data } = await api.patch(`/admin/users/${user._id}/role`, { role: newRole });
            setUsers(users.map(u => u._id === user._id ? data.data : u));
            toast.success(`User role updated to ${newRole}`);
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) return;

        try {
            await api.delete(`/admin/users/${user._id}`);
            setUsers(users.filter(u => u._id !== user._id));
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader fullScreen />;

    return (
        <div className="space-y-4 sm:space-y-6 bg-white min-h-screen">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-sm sm:text-base text-gray-600">Manage your platform's users and their permissions.</p>
                </div>

                <div className="w-full">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {filteredUsers.map((user) => (
                    <motion.div
                        layout
                        key={user._id}
                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                                    {user.name?.charAt(0) || <UserIcon size={20} className="text-gray-700" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className={cn(
                                "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold",
                                user.role === 'ADMIN' ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
                            )}>
                                {user.role === 'ADMIN' && <Shield size={10} className="text-gray-700" />}
                                {user.role}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleRole(user)}
                                className="flex-1 py-2 px-3 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-xs font-medium border border-indigo-200"
                            >
                                Change Role
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user)}
                                className="py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium border border-red-200"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">User</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Role</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <motion.tr
                                    layout
                                    key={user._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                                                {user.name?.charAt(0) || <UserIcon size={20} className="text-gray-700" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                            user.role === 'ADMIN' ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
                                        )}>
                                            {user.role === 'ADMIN' && <Shield size={12} className="text-gray-700" />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => toggleRole(user)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Change Role"
                                            >
                                                <Shield size={18} className="text-gray-700" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} className="text-gray-700" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-gray-400 italic">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
