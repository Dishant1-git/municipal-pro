import React, { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi';

const ChatInput = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex items-center gap-2 rounded-b-2xl">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="w-11 h-11 flex-shrink-0 bg-gradient-to-r from-blue-600 to-primary text-white rounded-full flex items-center justify-center shadow-md disabled:opacity-50 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Send message"
            >
                <HiPaperAirplane className="transform rotate-90 text-lg ml-0.5" />
            </button>
        </form>
    );
};

export default ChatInput;
