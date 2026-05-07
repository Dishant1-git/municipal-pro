import React from 'react';
import { motion } from 'framer-motion';

const SuggestedQuestions = ({ onSelect }) => {
    const questions = [
        "How to apply for water connection?",
        "How to file a complaint about street lights?",
        "How long does it take to process a complaint?",
        "How do I check my complaint status?"
    ];

    return (
        <div className="flex flex-col gap-2 mt-2 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Suggested Questions</p>
            <div className="flex flex-wrap gap-2">
                {questions.map((q, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(q)}
                        className="text-xs bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-full transition-colors text-left"
                    >
                        {q}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SuggestedQuestions;
