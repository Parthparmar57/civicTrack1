import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    Trash2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { cn } from '../lib/utils';

const AdminTasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/admin/tasks');
                setTasks(data.data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
                toast.error("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const { data } = await api.patch(`/admin/tasks/${id}/status`, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? data.data : t));
            toast.success(`Task status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDeleteTask = async (id) => {
        console.log("Attempting to delete task:", id);
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await api.delete(`/admin/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(t => t.status === filter);

    if (loading) return <Loader fullScreen />;

    const statusMap = {
        pending: { color: 'bg-amber-100 text-amber-700', icon: <Clock size={12} /> },
        'in-progress': { color: 'bg-blue-100 text-blue-700', icon: <AlertCircle size={12} /> },
        completed: { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={12} /> }
    };

    return (
        <div className="space-y-6 bg-white min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                    <p className="text-gray-600">Overview of all community tasks and reports.</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200">
                    {['all', 'pending', 'in-progress', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                                filter === f ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20" : "text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Task Details</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Created By</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredTasks.map((task) => (
                                <motion.tr
                                    layout
                                    key={task._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{task.title}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-xs">{task.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-700">{task.user?.name}</p>
                                        <p className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={task.status}
                                            onChange={(e) => updateStatus(task._id, e.target.value)}
                                            className={cn(
                                                "text-xs font-bold uppercase px-3 py-1.5 rounded-full border-none outline-none cursor-pointer",
                                                statusMap[task.status]?.color
                                            )}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/issues/${task._id}`)}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Task"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTasks.length === 0 && (
                    <div className="py-12 text-center text-gray-400">
                        No tasks found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTasks;
