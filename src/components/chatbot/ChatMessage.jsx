import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineSparkles } from 'react-icons/hi';

const ChatMessage = ({ message, isBot }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            <div className={`flex max-w-[85%] gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-auto">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        isBot ? 'bg-gradient-to-br from-blue-500 to-primary text-white shadow-sm' 
                              : 'bg-gray-200 text-gray-600'
                    }`}>
                        {isBot ? <HiOutlineSparkles /> : <HiOutlineUser />}
                    </div>
                </div>

                {/* Message Bubble */}
                <div className={`px-4 py-2.5 shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                    isBot 
                    ? 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-sm' 
                    : 'bg-gradient-to-r from-blue-600 to-primary text-white rounded-2xl rounded-tr-sm'
                }`}>
                    {message}
                </div>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
