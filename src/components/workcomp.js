import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineStatusOnline, HiOutlineAnnotation } from 'react-icons/hi'

export const Compwoker = () => {
    const [status, setstatus] = useState("")
    const [name, setname] = useState("")
    const [addon, setaddon] = useState("")
    const [pro, setpro] = useState("")
    const [dtl, setdtl] = useState("")
    const [adrs, setadrs] = useState("")
    const [pic, setpic] = useState("")
    const [message, setmessage] = useState("")

    const [params] = useSearchParams()
    const navigate = useNavigate()
    const idd = params.get("id")

    useEffect(() => {
        if (idd) {
            show()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { status, message }
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
                    alert("Status successfully updated to: " + status)
                    navigate(-1) // Go back to assigned tasks
                } else {
                    alert("Error occurred while updating status")
                }
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to connect to server");
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100"
                    >
                        {/* Status Header */}
                        <div className="bg-primary p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Job Details</h1>
                                <p className="text-blue-100 text-sm mt-1">Review and update the status of this assignment</p>
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                Currently Active
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Left Side: Complaint Info */}
                                <div className="space-y-8">
                                    <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                                        <img 
                                            src={`/uploads/${pic}`} 
                                            alt={pro}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800'; }}
                                        />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-gray-900">{pro}</h2>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                                                <HiOutlineUser className="text-primary" />
                                                {name}
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                                                <HiOutlineCalendar className="text-primary" />
                                                {addon}
                                            </div>
                                        </div>
                                        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                                            <p className="text-gray-700 italic text-sm leading-relaxed">"{dtl}"</p>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <HiOutlineLocationMarker className="text-xl text-primary mt-0.5" />
                                            <span>{adrs}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Update Form */}
                                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col justify-center">
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <HiOutlineStatusOnline className="text-primary" />
                                            Update Work Progress
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-1">Submit the final status once work is completed</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">New Status</label>
                                            <select 
                                                required
                                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                                                onChange={(e) => setstatus(e.target.value)}
                                            >
                                                <option value="">Select current status</option>
                                                <option value="completed">✅ Mark as Completed</option>
                                                <option value="canceled">❌ Request Cancellation</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                                                <HiOutlineAnnotation />
                                                Work Report / Message
                                            </label>
                                            <textarea 
                                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-[150px] text-sm"
                                                placeholder="Provide details about the work done or reasons for cancellation..."
                                                onChange={(e) => setmessage(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <button 
                                            type="submit"
                                            className="w-full py-4 bg-primary hover:bg-blue-900 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:translate-y-0"
                                        >
                                            Submit Status Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}