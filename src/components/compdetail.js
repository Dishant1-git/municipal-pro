import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClipboardCheck, HiOutlineChatAlt2 } from 'react-icons/hi'
import { useSelector } from 'react-redux'

export const Compdetail = () => {
    const { Role } = useSelector((state) => state.userslice)
    const [allworker, setallworker] = useState([])
    const [assignedtoo, setassignedto] = useState("")
    const [name, setname] = useState("")
    const [addon, setaddon] = useState("")
    const [pro, setpro] = useState("")
    const [dtl, setdtl] = useState("")
    const [adrs, setadrs] = useState("")
    const [pic, setpic] = useState("")
    const [message, setmessage] = useState("")
    const [priority, setpriority] = useState("")

    // Worker states
    const [workerStatus, setWorkerStatus] = useState("")
    const [workerMessage, setWorkerMessage] = useState("")

    const [params] = useSearchParams()
    const navigate = useNavigate()
    const idd = params.get("id")

    useEffect(() => {
        if (idd) {
            show()
            workers()
        }
    }, [idd])

    const show = async () => {
        try {
            const result = await fetch(`http://localhost:9000/api/detail/${idd}`, {
                method: "Get"
            })
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setname(res.comp.Name)
                    setpro(res.comp.Problem)
                    setdtl(res.comp.Detail)
                    setadrs(res.comp.Adress)
                    setpic(res.comp.Pic)
                    setaddon(res.comp.AddOn)
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const workers = async () => {
        try {
            const all = await fetch("http://localhost:9000/api/workers", {
                method: "Get"
            })
            if (all.ok) {
                const list = await all.json()
                if (list.statuscode === 1) {
                    setallworker(list.worker)
                }
            }
        } catch (error) {
            console.error("Workers fetch error:", error);
        }
    }

    const WorkerUpdate = async (e) => {
        e.preventDefault()
        const data = { status: workerStatus, message: workerMessage }
        try {
            const up = await fetch(`http://localhost:9000/api/compupworker/${idd}`, {
                method: "Put",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            if (up.ok) {
                const result = await up.json()
                if (result.statuscode === 1) {
                    alert("Task status successfully updated")
                    navigate("/assigned")
                } else {
                    alert("Error occurred while updating")
                }
            }
        } catch (error) {
            console.error("Worker update error:", error);
            alert("Failed to connect to server");
        }
    }

    const Assign = async (e) => {
        e.preventDefault()
        const data = { assignedtoo, message, priority }
        try {
            const up = await fetch(`http://localhost:9000/api/compupdate/${idd}`, {
                method: "Put",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            if (up.ok) {
                const result = await up.json()
                if (result.statuscode === 1) {
                    alert("Complaint successfully assigned to worker")
                    navigate("/Compshowadmin")
                } else {
                    alert("Error occurred while assigning")
                }
            }
        } catch (error) {
            console.error("Assign error:", error);
            alert("Failed to connect to server");
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        {/* Main Image */}
                        <div className="aspect-video relative overflow-hidden bg-gray-900">
                            <img 
                                src={`/uploads/${pic}`} 
                                alt={pro}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <h1 className="text-3xl font-bold text-white mb-2">{pro}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
                                        <HiOutlineUser className="text-accent" />
                                        {name}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
                                        <HiOutlineCalendar className="text-accent" />
                                        {addon || 'Recently'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            {/* Details Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Complaint Detail</h4>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {dtl || "No detailed description provided."}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-start gap-3">
                                            <HiOutlineLocationMarker className="text-2xl text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-gray-900">Location Address</h4>
                                                <p className="text-gray-600 mt-1">{adrs || "Location not specified."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {Role === "worker" && (
                                    <div className="lg:col-span-1 space-y-6">
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                                            <div className="flex items-center gap-3 mb-6">
                                                <HiOutlineClipboardCheck className="text-2xl text-primary" />
                                                <h3 className="text-lg font-bold text-gray-900">Update Task Status</h3>
                                            </div>
                                            <form onSubmit={WorkerUpdate} className="space-y-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Change</label>
                                                    <select
                                                        value={workerStatus}
                                                        onChange={(e) => setWorkerStatus(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                                                        required
                                                    >
                                                        <option value="" disabled>Select new status</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="Revert to admin">Revert to admin</option>
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason / Addon Message</label>
                                                    <div className="relative">
                                                        <HiOutlineChatAlt2 className="absolute top-3.5 left-4 text-gray-400 text-xl" />
                                                        <textarea
                                                            value={workerMessage}
                                                            onChange={(e) => setWorkerMessage(e.target.value)}
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 min-h-[120px] resize-none"
                                                            placeholder="Add reason or completion details..."
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                                                >
                                                    Submit Update
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {Role === "admin" && (
                                    <div className="lg:col-span-1 space-y-6">
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                                            <div className="flex items-center gap-3 mb-6">
                                                <HiOutlineClipboardCheck className="text-2xl text-primary" />
                                                <h3 className="text-lg font-bold text-gray-900">Assign Worker</h3>
                                            </div>
                                            <form onSubmit={Assign} className="space-y-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Worker</label>
                                                    <select
                                                        value={assignedtoo}
                                                        onChange={(e) => setassignedto(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                                                        required
                                                    >
                                                        <option value="" disabled>Choose a worker</option>
                                                        {allworker.map((worker) => (
                                                            <option key={worker._id} value={worker._id}>{worker.Name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                                                    <select
                                                        value={priority}
                                                        onChange={(e) => setpriority(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                                                        required
                                                    >
                                                        <option value="" disabled>Select priority</option>
                                                        <option value="High">High</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Low">Low</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message / Instructions</label>
                                                    <div className="relative">
                                                        <HiOutlineChatAlt2 className="absolute top-3.5 left-4 text-gray-400 text-xl" />
                                                        <textarea
                                                            value={message}
                                                            onChange={(e) => setmessage(e.target.value)}
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 min-h-[120px] resize-none"
                                                            placeholder="Add specific instructions for the worker..."
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                                                >
                                                    Assign Task
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}