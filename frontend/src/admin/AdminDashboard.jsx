import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Users, CheckSquare, Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import { cn } from '../lib/utils';

const ActivityChart = ({ data }) => {
    // Fill in missing dates with zero counts for a continuous graph
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    const chartData = last7Days.map(date => {
        const found = data.find(d => d._id === date);
        return {
            date: date.split('-').slice(1).join('/'), // format MM/DD
            count: found ? found.count : 0
        };
    });

    const maxCount = Math.max(...chartData.map(d => d.count), 5); // min scale of 5
    const width = 100;
    const height = 100;
    const padding = 10;

    const points = chartData.map((d, i) => {
        const x = (i / (chartData.length - 1)) * (width - 2 * padding) + padding;
        const y = height - ((d.count / maxCount) * (height - 2 * padding) + padding);
        return { x, y };
    });

    const pathD = points.reduce((acc, p, i) => {
        return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");

    return (
        <div className="w-full h-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((level, i) => (
                    <line
                        key={i}
                        x1={padding}
                        y1={height - (level * (height - 2 * padding) + padding)}
                        x2={width - padding}
                        y2={height - (level * (height - 2 * padding) + padding)}
                        stroke="#f1f5f9"
                        strokeWidth="0.5"
                    />
                ))}

                {/* The Path */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#1e3a8a" // primary
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <g key={i}>
                        <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r="1.5"
                            fill="white"
                            stroke="#1e3a8a"
                            strokeWidth="0.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        />
                        <text
                            x={p.x}
                            y={height - 2}
                            textAnchor="middle"
                            fontSize="3"
                            fill="#94a3b8"
                            className="font-bold"
                        >
                            {chartData[i].date}
                        </text>
                        {chartData[i].count > 0 && (
                            <text
                                x={p.x}
                                y={p.y - 4}
                                textAnchor="middle"
                                fontSize="3.5"
                                fill="#1e3a8a"
                                className="font-bold"
                            >
                                {chartData[i].count}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/dashboard');
                setStats(data.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Loader fullScreen />;

    const statCards = [
        {
            label: 'Total Users',
            count: stats?.totalUsers || 0,
            icon: <Users className="text-blue-600" size={24} />,
            color: 'bg-blue-50',
            trend: '+5% from last month'
        },
        {
            label: 'Total Tasks',
            count: stats?.totalTasks || 0,
            icon: <CheckSquare className="text-indigo-600" size={24} />,
            color: 'bg-indigo-50',
            trend: '+12% from last week'
        },
        {
            label: 'Pending Tasks',
            count: stats?.pendingTasks || 0,
            icon: <Clock className="text-amber-600" size={24} />,
            color: 'bg-amber-50',
            trend: 'Needs attention'
        },
        {
            label: 'Completed Tasks',
            count: stats?.completedTasks || 0,
            icon: <CheckCircle2 className="text-emerald-600" size={24} />,
            color: 'bg-emerald-50',
            trend: 'Optimized efficiency'
        },
    ];

    return (
        <div className="space-y-6 sm:space-y-8 bg-white min-h-screen">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Platform Overview</h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's what's happening on your platform today.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${card.color}`}>
                                {card.icon}
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-semibold">
                                <TrendingUp size={10} className="sm:w-3 sm:h-3" />
                                <span className="hidden sm:inline">12%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs sm:text-sm font-medium">{card.label}</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{card.count}</h2>
                        </div>
                        <p className="text-xs text-gray-400 font-medium hidden sm:block">{card.trend}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 min-h-[300px] sm:min-h-[400px] flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Issue Activity</h3>
                            <p className="text-xs text-gray-400 font-medium">Reports received over the last 7 days</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reports</span>
                        </div>
                    </div>

                    <div className="flex-1 relative min-h-[200px] sm:min-h-[250px] w-full mt-4">
                        <ActivityChart data={stats?.activity || []} />
                    </div>
                </div>
                <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Recent Alerts</h3>
                    <div className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto max-h-[300px] sm:max-h-[350px] pr-2 custom-scrollbar">
                        {stats?.recentTasks && stats.recentTasks.length > 0 ? (
                            stats.recentTasks.map((task, i) => (
                                <motion.div
                                    key={task._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => navigate(`/admin/issues/${task._id}`)}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group"
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                        task.status === 'pending' ? "bg-red-50 text-red-500" :
                                            task.status === 'in-progress' ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"
                                    )}>
                                        <AlertCircle size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{task.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{task.area}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                            <p className="text-[10px] text-slate-400">{new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10">
                                <Clock size={32} className="mb-2 opacity-20" />
                                <p className="text-sm font-medium">No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
