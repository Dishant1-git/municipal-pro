import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineTrash, HiX } from 'react-icons/hi';
import FloatingButton from './FloatingButton';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am the Municipal AI Assistant. How can I help you today?", isBot: true }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const clearChat = () => {
        setMessages([{ text: "Hello! I am the Municipal AI Assistant. How can I help you today?", isBot: true }]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // Add user message
        const newMessages = [...messages, { text, isBot: false }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:9000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: text })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessages([...newMessages, { text: data.answer, isBot: true }]);
            } else {
                setMessages([...newMessages, { text: data.answer || "Sorry, I couldn't process your request.", isBot: true }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([...newMessages, { text: "Network error. Please try again later.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <FloatingButton isOpen={isOpen} toggleChat={toggleChat} />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 w-[360px] h-[550px] max-h-[80vh] bg-gray-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-primary p-4 flex items-center justify-between text-white shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                    <HiOutlineSparkles className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">AI Assistant</h3>
                                    <p className="text-[10px] text-blue-100 uppercase tracking-wider">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Clear Chat">
                                    <HiOutlineTrash className="text-lg" />
                                </button>
                                <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block" title="Close">
                                    <HiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} message={msg.text} isBot={msg.isBot} />
                            ))}
                            
                            {messages.length === 1 && (
                                <SuggestedQuestions onSelect={handleSendMessage} />
                            )}
                            
                            {isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
