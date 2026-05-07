import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClipboardList, HiOutlineCheckCircle } from 'react-icons/hi'

export const Compassigned = () => {
    const [allcomp, setallcomp] = useState([])
    const { LoggedIn } = useSelector((state) => {
        return state.userslice
    })
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const id = params.get("id")

    useEffect(() => {
        if (LoggedIn) {
            get()
        } else {
            navigate("/login")
        }
    }, [LoggedIn, id, navigate])

    const get = async () => {
        try {
            const result = await fetch(`http://localhost:9000/api/compwork/${id}`, {
                method: "get"
            })
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setallcomp(res.comp)
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Assigned Tasks</h1>
                        <p className="text-gray-600 mt-2 italic">Your current active work assignments</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {allcomp.length > 0 ? (
                            allcomp.map((a, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link 
                                        to={`/detailwork?id=${a._id}`}
                                        className="group block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 items-center">
                                            {/* Thumbnail */}
                                            <div className="w-full md:w-40 aspect-video rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={`/uploads/${a.Pic}`} 
                                                    alt="Complaint"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <span className="px-3 py-1 bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
                                                        Active Task
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <HiOutlineCalendar />
                                                        {a.AddOn || 'Recently'}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                    {a.Problem}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2">
                                                    {a.Detail || "No additional instructions provided."}
                                                </p>
                                            </div>

                                            {/* Action */}
                                            <div className="flex-shrink-0 flex items-center gap-3">
                                                <div className="flex flex-col items-end md:items-center">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</span>
                                                    <span className="text-xs font-bold text-yellow-600 px-3 py-1 bg-yellow-50 rounded-full border border-yellow-100 italic">
                                                        {a.Status || 'In Progress'}
                                                    </span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                                                    <HiOutlineCheckCircle className="text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HiOutlineClipboardList className="text-4xl text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks assigned</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">Great job! You've completed all your assigned tasks. New assignments will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}