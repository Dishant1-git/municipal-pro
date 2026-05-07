import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChatAlt2, HiX } from 'react-icons/hi';

const FloatingButton = ({ isOpen, toggleChat }) => {
    return (
        <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-primary rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center text-white z-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Toggle Chat"
        >
            {/* Simple pulse animation underneath the button */}
            {!isOpen && (
                <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-50 animate-ping" />
            )}
            
            {/* Icon swap with animation */}
            <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 text-3xl"
            >
                {isOpen ? <HiX /> : <HiOutlineChatAlt2 />}
            </motion.div>
        </motion.button>
    );
};

export default FloatingButton;
