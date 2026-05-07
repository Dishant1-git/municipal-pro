import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClipboardList, HiOutlineSearch } from 'react-icons/hi'

export const Compadmin = () => {
    const [allcomp, setallcomp] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const result = await fetch("http://localhost:9000/api/allcomp", {
                method: "get"
            })

            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setallcomp(res.compdata)
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const filteredComp = allcomp.filter(c => 
        c.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.Problem?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">All Complaints</h1>
                            <p className="text-gray-600 mt-2">Manage and assign citizen reported issues</p>
                        </div>
                        
                        <div className="relative w-full md:w-80">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input 
                                type="text"
                                placeholder="Search by name or problem..."
                                className="w-full pl-14 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                                style={{ paddingLeft: '3.5rem' }}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Complaints List */}
                    <div className="space-y-6">
                        {filteredComp.length > 0 ? (
                            filteredComp.map((a, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link 
                                        to={`/detail?id=${a._id}`}
                                        className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            {/* Thumbnail */}
                                            <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={`/uploads/${a.Pic}`} 
                                                    alt="Complaint"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-4 mb-3">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                                                        <HiOutlineUser className="text-primary" />
                                                        {a.Name}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                                                        <HiOutlineCalendar className="text-primary" />
                                                        {a.AddOn || 'Recently'}
                                                    </div>
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                                        a.Status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                    }`}>
                                                        {a.Status || 'Pending'}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                                    {a.Problem}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                                    {a.Detail || "No additional details provided for this complaint."}
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                    <HiOutlineClipboardList className="text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <HiOutlineClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No complaints found</h3>
                                <p className="text-gray-500">Try adjusting your search term.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}