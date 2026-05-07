import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClipboardList, HiOutlineExclamationCircle } from 'react-icons/hi'

export const Notassigned = () => {
    const [allcomp, setallcomp] = useState([])

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const result = await fetch("http://localhost:9000/api/notassign", {
                method: "get"
            })
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setallcomp(res.data)
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
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Unassigned Tasks</h1>
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                Priority issues waiting for worker assignment
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {allcomp.length > 0 ? (
                            allcomp.map((a, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Link 
                                        to={`/detail?id=${a._id}`}
                                        className="group block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            <div className="w-full md:w-44 aspect-video rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={`/uploads/${a.Pic}`} 
                                                    alt="Complaint"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                                                />
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-4 mb-3">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                                        <HiOutlineExclamationCircle />
                                                        Urgent Assignment
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <HiOutlineCalendar />
                                                        {a.AddOn || 'Recently'}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                    {a.Problem}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                                                    <HiOutlineUser className="text-primary" />
                                                    {a.Name}
                                                </div>
                                                <p className="text-gray-500 text-sm line-clamp-2 italic">
                                                    "{a.Detail || 'No additional details provided.'}"
                                                </p>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <div className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-100 group-hover:bg-blue-900 transition-colors">
                                                    Assign Now
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HiOutlineClipboardList className="text-4xl text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Queue is clear!</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">All complaints have been assigned to workers. Good job!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}