import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'

export const Signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setcpass] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault();
        if (pass !== cpass) {
            alert("Passwords do not match");
            return;
        }
        const data = { name, email, pass }
        try {
            const res = await fetch("http://localhost:9000/api/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode == 1) {
                    alert("Registered successfully")
                }
                else {
                    alert("Email already exists")
                }
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Failed to connect to server");
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full"
            >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    {/* Left Side - Info */}
                    <div className="md:w-5/12 bg-primary p-10 text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <span className="text-white font-bold text-2xl">MC</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                            <p className="text-blue-100 text-sm leading-relaxed mb-8">
                                Create an account to access online municipal services, track your complaints, and stay updated with city developments.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-accent">✓</div>
                                    <span className="text-sm">Easy Online Payments</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-accent">✓</div>
                                    <span className="text-sm">Instant Complaint Tracking</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-accent">✓</div>
                                    <span className="text-sm">Digital Certificates</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="md:w-7/12 p-10 bg-white">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h3>
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <HiOutlineUser size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        style={{ paddingLeft: '3.5rem' }}
                                        placeholder="John Doe"
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <HiOutlineMail size={18} />
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        style={{ paddingLeft: '3.5rem' }}
                                        placeholder="john@example.com"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <HiOutlineLockClosed size={18} />
                                        </div>
                                        <input 
                                            type="password" 
                                            required
                                            className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            style={{ paddingLeft: '3.5rem' }}
                                            placeholder="••••••••"
                                            onChange={(e) => setpass(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <HiOutlineLockClosed size={18} />
                                        </div>
                                        <input 
                                            type="password" 
                                            required
                                            className="w-full pl-14 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            style={{ paddingLeft: '3.5rem' }}
                                            placeholder="••••••••"
                                            onChange={(e) => setcpass(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-primary hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Register Account
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary font-bold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}