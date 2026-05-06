import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../reducer/userslice"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'

export const Login = () => {
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Log = async (e) => {
        const data = { email, pass }
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:9000/api/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode == 1) {
                    alert("Logged in successfully")
                    const decodedToken = JSON.parse(atob(result.authtoken.split('.')[1]));
                    const userRole = decodedToken.role;

                    if (userRole == "admin") {
                        dispatch(login({ userdata: result.memberdata, role: userRole }))
                        sessionStorage.setItem("info", JSON.stringify(result.memberdata))
                        localStorage.setItem("token", result.authtoken)
                        navigate("/admin-dashboard")
                    }
                    else if (userRole == "worker") {
                        dispatch(login({ userdata: result.memberdata, role: userRole }))
                        sessionStorage.setItem("info", JSON.stringify(result.memberdata))
                        localStorage.setItem("token", JSON.stringify(result.authtoken))
                        navigate("/")
                    }
                    else {
                        dispatch(login({ userdata: result.memberdata, role: userRole }))
                        sessionStorage.setItem("info", JSON.stringify(result.memberdata))
                        localStorage.setItem("token", JSON.stringify(result.authtoken))
                        navigate("/")
                    }
                }
                else if (result.statuscode == 2) {
                    alert("Kindly request admin for activation of your account")
                }
                else {
                    alert("Credentials don't match")
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to connect to server");
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <span className="text-white font-bold text-2xl">MC</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="text-blue-100 text-sm mt-1">Login to access citizen services</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={Log} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <HiOutlineMail size={20} />
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="your@email.com"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <HiOutlineLockClosed size={20} />
                                    </div>
                                    <input 
                                        type="password" 
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        onChange={(e) => setpass(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-3 bg-primary hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-primary font-bold hover:underline">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}