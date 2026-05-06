import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineChartPie, HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const AdminPage = () => {
    const { LoggedIn, Role } = useSelector((state) => {
        return state.userslice
    })
    
    const navigate = useNavigate()

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        assigned: 0,
        pending: 0
    });

    useEffect(() => {
        if (!LoggedIn || Role !== "admin") {
            navigate("/")
        } else {
            const fetchStats = async () => {
                try {
                    const res = await fetch("http://localhost:9000/api/allcomp");
                    const result = await res.json();
                    if (result.statuscode === 1) {
                        const data = result.compdata;
                        const completed = data.filter(item => item.Status === "completed").length;
                        const assigned = data.filter(item => item.Status === "Assigned to worker").length;
                        const pending = data.length - completed - assigned;

                        setStats({
                            total: data.length,
                            completed,
                            assigned,
                            pending
                        });
                    }
                } catch (error) {
                    console.error("Error fetching stats:", error);
                }
            };
            fetchStats();
        }
    }, [LoggedIn, Role, navigate]);

    const pieData = {
        labels: ['Completed', 'Assigned', 'Pending'],
        datasets: [
            {
                label: '# of Complaints',
                data: [stats.completed, stats.assigned, stats.pending],
                backgroundColor: [
                    'rgba(20, 184, 166, 0.7)', // Teal
                    'rgba(30, 58, 138, 0.7)', // Primary Blue
                    'rgba(239, 68, 68, 0.7)',  // Red
                ],
                borderColor: [
                    '#14B8A6',
                    '#1E3A8A',
                    '#EF4444',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ['Statistics'],
        datasets: [
            {
                label: 'Completed',
                data: [stats.completed],
                backgroundColor: 'rgba(20, 184, 166, 0.8)',
                borderRadius: 8,
            },
            {
                label: 'Assigned',
                data: [stats.assigned],
                backgroundColor: 'rgba(30, 58, 138, 0.8)',
                borderRadius: 8,
            },
            {
                label: 'Pending',
                data: [stats.pending],
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderRadius: 8,
            }
        ],
    };

    const statCards = [
        { title: 'Total Complaints', value: stats.total, icon: <HiOutlineClipboardList />, color: 'bg-primary shadow-blue-200' },
        { title: 'Completed', value: stats.completed, icon: <HiOutlineCheckCircle />, color: 'bg-accent shadow-teal-200' },
        { title: 'Assigned', value: stats.assigned, icon: <HiOutlineClock />, color: 'bg-blue-600 shadow-blue-200' },
        { title: 'Pending', value: stats.pending, icon: <HiOutlineClipboardList />, color: 'bg-red-500 shadow-red-200' },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Complaint statistics and performance overview</p>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {statCards.map((card, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`${card.color} p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden group`}
                            >
                                <div className="absolute top-0 right-0 p-4 text-white/10 group-hover:scale-110 transition-transform">
                                    <div className="text-6xl">{card.icon}</div>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">{card.title}</p>
                                    <h3 className="text-4xl font-bold">{card.value}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pie Chart */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center"
                        >
                            <div className="flex items-center gap-2 mb-8 self-start">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                                    <HiOutlineChartPie className="text-xl" />
                                </div>
                                <h4 className="font-bold text-gray-900">Status Distribution</h4>
                            </div>
                            <div className="w-full max-w-[250px]">
                                <Pie data={pieData} options={{ maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }} />
                            </div>
                        </motion.div>

                        {/* Bar Chart */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-accent">
                                    <HiOutlineClipboardList className="text-xl" />
                                </div>
                                <h4 className="font-bold text-gray-900">Performance Overview</h4>
                            </div>
                            <div className="h-[300px]">
                                <Bar 
                                    data={barData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                grid: { display: false },
                                                ticks: { stepSize: 1 }
                                            },
                                            x: { grid: { display: false } }
                                        }
                                    }} 
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <button 
                            onClick={() => navigate("/Compshowadmin")}
                            className="p-8 bg-white border border-gray-200 rounded-[2rem] hover:border-primary hover:shadow-lg transition-all group"
                        >
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Manage All Complaints</h4>
                            <p className="text-gray-500 text-sm mt-1">Assign and review citizen issues</p>
                        </button>
                        <button 
                            onClick={() => navigate("/notassign")}
                            className="p-8 bg-white border border-gray-200 rounded-[2rem] hover:border-red-500 hover:shadow-lg transition-all group"
                        >
                            <h4 className="font-bold text-gray-900 group-hover:text-red-500 transition-colors">View Unassigned Tasks</h4>
                            <p className="text-gray-500 text-sm mt-1">Check for critical pending complaints</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
