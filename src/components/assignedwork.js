import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClipboardList, HiOutlineClock } from 'react-icons/hi'
import { useSelector } from 'react-redux'

export const Assigned = () => {
    const [allcomp, setallcomp] = useState([])
    const { Role } = useSelector((state) => state.userslice) || { Role: "" }

    useEffect(() => {
        get()
    }, [Role])

    const get = async () => {
        try {
            let url = "http://localhost:9000/api/assignwork";
            if (Role === "worker") {
                const info = JSON.parse(sessionStorage.getItem("info"));
                if (info && info.id) {
                    url += `?workerId=${info.id}`;
                }
            }
            const result = await fetch(url, {
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
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">Assigned Complaints</h1>
                        <p className="text-gray-600 mt-2">Active complaints currently under resolution</p>
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
                                        className="group block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
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
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                                        <HiOutlineClock />
                                                        In Progress
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
                                                <p className="text-gray-500 text-sm line-clamp-2">
                                                    {a.Detail || 'Processing assignment details...'}
                                                </p>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                                    <HiOutlineClipboardList className="text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
                                <HiOutlineClipboardList className="text-4xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No active assignments</h3>
                                <p className="text-gray-500">Currently there are no complaints assigned to workers.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}