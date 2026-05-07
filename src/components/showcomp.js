import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineExclamationCircle, HiOutlineClock, HiOutlineCheckCircle, HiOutlineLocationMarker, HiOutlineClipboardList } from 'react-icons/hi'

export const Usercomp = () => {
    const [id, setid] = useState("")
    const [allcom, setallcomp] = useState([])
    const navigate = useNavigate()

    const { LoggedIn } = useSelector((state) => {
        return state.userslice
    })

    useEffect(() => {
        if (LoggedIn) {
            const user = JSON.parse(sessionStorage.getItem("info"))
            if (user) setid(user.id)
        }
    }, [LoggedIn])

    useEffect(() => {
        if (!LoggedIn) {
            navigate("/login")
        } else if (id) {
            show()
        }
    }, [LoggedIn, id, navigate])

    const show = async () => {
        try {
            const res = await fetch(`http://localhost:9000/api/compget/${id}`, {
                method: "Get"
            })
            if (res.ok) {
                const data = await res.json()
                if (data.statuscode === 1) {
                    setallcomp(data.compdata)
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return <HiOutlineClock className="text-lg" />;
            case 'completed': return <HiOutlineCheckCircle className="text-lg" />;
            case 'in progress': return <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><HiOutlineClock className="text-lg" /></motion.div>;
            default: return <HiOutlineExclamationCircle className="text-lg" />;
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
                            <p className="text-gray-600 mt-2">Track the status of your reported issues</p>
                        </div>
                        <button 
                            onClick={() => navigate("/complaint")}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            <HiOutlineExclamationCircle className="text-xl" />
                            File New Complaint
                        </button>
                    </div>

                    {allcom.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allcom.map((comp, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                                >
                                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                                        <img 
                                            src={`/uploads/${comp.Pic}`} 
                                            alt={comp.Problem}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                                        />
                                        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 backdrop-blur-md ${getStatusColor(comp.Status)}`}>
                                            {getStatusIcon(comp.Status)}
                                            {comp.Status}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {comp.Problem}
                                        </h3>
                                        <div className="flex items-start gap-2 text-gray-500 text-sm mb-4">
                                            <HiOutlineLocationMarker className="text-lg flex-shrink-0 mt-0.5 text-primary" />
                                            <p className="line-clamp-2 italic">{comp.adress}</p>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <span className="text-xs text-gray-400">ID: #{comp._id?.slice(-6).toUpperCase() || 'N/A'}</span>
                                            <button 
                                                onClick={() => navigate(`/detail?id=${comp._id}`)}
                                                className="text-sm font-bold text-primary hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <HiOutlineClipboardList className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No complaints found</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't filed any complaints yet. Your reported issues will appear here.</p>
                            <button 
                                onClick={() => navigate("/complaint")}
                                className="btn-primary"
                            >
                                File Your First Complaint
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}