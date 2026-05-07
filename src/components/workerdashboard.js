import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { HiOutlineDocumentText, HiOutlineLocationMarker, HiOutlineExclamationCircle, HiOutlineClock } from 'react-icons/hi';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const WorkerDashboard = () => {
    const [allcomp, setallcomp] = useState([])
    const [stats, setStats] = useState({ assigned: 0, completed: 0, processed: 0 })

    useEffect(() => {
        getWorkerData()
    }, [])

    const getWorkerData = async () => {
        try {
            const info = JSON.parse(sessionStorage.getItem("info"));
            if (!info || !info.id) return;
            
            const result = await fetch(`http://localhost:9000/api/compwork/${info.id}`, {
                method: "get"
            })
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setallcomp(res.comp)
                    
                    // Calculate stats
                    let assigned = 0, completed = 0, processed = 0;
                    res.comp.forEach(c => {
                        if (c.Status === "Assigned to worker") assigned++;
                        else if (c.Status === "completed") completed++;
                        else if (c.Status === "Processed") processed++;
                    });
                    setStats({ assigned, completed, processed })
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const doughnutData = {
        labels: ['Assigned', 'Completed', 'Processed'],
        datasets: [
            {
                data: [stats.assigned, stats.completed, stats.processed],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderColor: ['#ffffff', '#ffffff', '#ffffff'],
                borderWidth: 2,
            },
        ],
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Assigned to worker': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Processed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityStyle = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-orange-600 bg-orange-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Worker Dashboard</h1>
                    <p className="text-gray-600 mt-2">Overview of your assigned tasks and performance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Stats Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                                    <HiOutlineClock />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Assigned</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.assigned}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl">
                                    <i className="fa-regular fa-circle-check"></i>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Completed</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.completed}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
                                    <HiOutlineDocumentText />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Processed</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.processed}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 w-full">Task Distribution</h3>
                        <div className="w-48 h-48">
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Your Complaints</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-sm">
                                    <th className="px-8 py-4 font-medium">Date AddOn</th>
                                    <th className="px-8 py-4 font-medium">Problem</th>
                                    <th className="px-8 py-4 font-medium">Address</th>
                                    <th className="px-8 py-4 font-medium">Priority</th>
                                    <th className="px-8 py-4 font-medium">Status</th>
                                    <th className="px-8 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {allcomp.map((comp, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-4 text-sm text-gray-600">
                                            {comp.AddOn ? new Date(comp.AddOn).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="text-sm font-bold text-gray-900">{comp.Problem}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-gray-400" />
                                                <span className="truncate max-w-[150px]">{comp.Adress}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityStyle(comp.Priority)}`}>
                                                {comp.Priority || 'Normal'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(comp.Status)}`}>
                                                {comp.Status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <Link 
                                                to={`/detail?id=${comp._id}`} 
                                                className="text-primary hover:text-blue-900 text-sm font-medium transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {allcomp.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-gray-500">
                                            You currently have no assigned complaints.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
