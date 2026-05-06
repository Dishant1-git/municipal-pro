import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Logout } from "../reducer/userslice"
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

export const User = () => {
    const [flag, setflag] = useState("false")
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const { LoggedIn } = useSelector((state) => {
        return state.userslice
    })

    const dispatch = useDispatch()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (LoggedIn) {
            setflag("true")
        } else {
            setflag("false")
        }
    }, [LoggedIn])

    const logout = () => {
        dispatch(Logout())
        sessionStorage.clear()
        localStorage.clear()
        setflag("false")
        setMobileMenuOpen(false)
    }

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'File Complaint', path: '/complaint' },
        { name: 'My Complaints', path: '/compshow' },
        { name: 'About', path: '/#about' },
        { name: 'Services', path: '/#services' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/30">
                            <span className="text-white font-bold text-2xl">MC</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl leading-tight text-primary">
                                Smart City
                            </span>
                            <span className="text-sm text-gray-500 font-medium tracking-wide">Municipal Corporation</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path} 
                                        className="text-base font-medium text-gray-600 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-5 border-l border-gray-200 pl-6">
                            {flag !== "true" ? (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-primary hover:text-blue-900 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="btn-accent text-sm py-2 px-5">
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                                    Logout
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden text-2xl text-primary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute top-full left-0 right-0 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.path} 
                                            className="block text-base font-medium text-gray-800 hover:text-primary transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                                {flag !== "true" ? (
                                    <>
                                        <Link 
                                            to="/login" 
                                            className="w-full text-center py-3 bg-gray-50 text-primary font-medium rounded-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/signup"
                                            className="w-full btn-accent text-center py-3"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <button 
                                        onClick={logout} 
                                        className="w-full text-center py-3 bg-red-50 text-red-600 font-medium rounded-lg"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}