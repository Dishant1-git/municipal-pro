import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClipboardList, HiOutlineCloudUpload } from 'react-icons/hi'

export const Postcom = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [problem, setproblem] = useState("")
    const [adress, setadress] = useState("")
    const [msg, setmsg] = useState("")
    const [pic, setpic] = useState("")
    const [id, setid] = useState("")

    const navigate = useNavigate()
    const { LoggedIn } = useSelector((state) => {
        return state.userslice
    })

    useEffect(() => {
        if (LoggedIn) {
            const udata = JSON.parse(sessionStorage.getItem("info"))
            if (udata) setid(udata.id)
        }
    }, [LoggedIn])

    useEffect(() => {
        const udata = JSON.parse(sessionStorage.getItem("info"))
        if (!udata) {
            navigate("/login")
        }
    }, [LoggedIn, navigate])

    const submitt = async (e) => {
        if (e) e.preventDefault()
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("phone", phone)
        formdata.append("problem", problem)
        formdata.append("adress", adress)
        formdata.append("msg", msg)
        formdata.append("pic", pic)
        formdata.append("id", id)

        try {
            const result = await fetch("http://localhost:9000/api/complaint", {
                method: "post",
                body: formdata
            })

            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    Sendmail()
                    alert("Complaint posted successfully")
                    navigate("/compshow")
                }
                else if (res.statuscode === 2) {
                    alert("Upload an image of site")
                }
                else {
                    alert("Error occurred")
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit complaint");
        }
    }

    const Sendmail = async () => {
        const data = { email, name }
        try {
            const result = await fetch("http://localhost:9000/api/nodemail", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            if (result.ok) {
                const res = await result.json()
                alert(res.message)
            }
        } catch (error) {
            console.error("Mail error:", error);
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div className="flex flex-col lg:flex-row">
                            {/* Left Side - Info */}
                            <div className="lg:w-1/3 bg-primary p-10 text-white">
                                <h2 className="text-3xl font-bold mb-6">File a Complaint</h2>
                                <p className="text-blue-100 text-sm mb-10 leading-relaxed">
                                    Your feedback helps us build a better city. Please provide accurate details and an image of the site to help our team resolve the issue faster.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <HiOutlinePhone className="text-xl text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Helpline</h4>
                                            <p className="text-xs text-blue-100 mt-1">1800-123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <HiOutlineMail className="text-xl text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Email Support</h4>
                                            <p className="text-xs text-blue-100 mt-1">support@smartcity.gov</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <HiOutlineLocationMarker className="text-xl text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Main Office</h4>
                                            <p className="text-xs text-blue-100 mt-1">Smart City Municipal Building, Sector 1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="lg:w-2/3 p-10 bg-white">
                                <form onSubmit={submitt} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Your Name</label>
                                            <div className="relative">
                                                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    type="text" required
                                                    className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    style={{ paddingLeft: '3.5rem' }}
                                                    placeholder="John Doe"
                                                    onChange={(e) => setname(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                            <div className="relative">
                                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    type="email" required
                                                    className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    style={{ paddingLeft: '3.5rem' }}
                                                    placeholder="john@example.com"
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                                            <div className="relative">
                                                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    type="tel" required
                                                    className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    style={{ paddingLeft: '3.5rem' }}
                                                    placeholder="9876543210"
                                                    onChange={(e) => setphone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Type of Problem</label>
                                            <div className="relative">
                                                <HiOutlineClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    type="text" required
                                                    className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    style={{ paddingLeft: '3.5rem' }}
                                                    placeholder="e.g. Water Leakage, Pothole"
                                                    onChange={(e) => setproblem(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Address/Location of Issue</label>
                                        <textarea 
                                            required
                                            rows="2"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter full address or landmark"
                                            onChange={(e) => setadress(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                                        <textarea 
                                            rows="3"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Describe the issue in detail"
                                            onChange={(e) => setmsg(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Upload Site Image</label>
                                        <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-primary transition-colors cursor-pointer text-center">
                                            <input 
                                                type="file" required
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => setpic(e.target.files[0])}
                                            />
                                            <HiOutlineCloudUpload className="mx-auto text-3xl text-gray-400 group-hover:text-primary transition-colors mb-2" />
                                            <p className="text-sm text-gray-500">
                                                {pic ? <span className="text-primary font-bold">{pic.name}</span> : "Click to upload or drag and drop"}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (Max 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            type="submit"
                                            className="w-full py-4 bg-primary hover:bg-blue-900 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Submit Complaint
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}