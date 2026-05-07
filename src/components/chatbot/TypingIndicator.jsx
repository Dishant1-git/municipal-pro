import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
    const dotVariants = {
        start: { y: 0 },
        end: { y: -5 }
    };

    const containerVariants = {
        start: { transition: { staggerChildren: 0.2 } },
        end: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="flex justify-start mb-4">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm inline-flex gap-1.5 items-center">
                <motion.div
                    variants={containerVariants}
                    initial="start"
                    animate="end"
                    className="flex gap-1 items-center h-4"
                >
                    {[0, 1, 2].map((dot) => (
                        <motion.span
                            key={dot}
                            variants={dotVariants}
                            transition={{
                                duration: 0.4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            className="w-2 h-2 bg-blue-400 rounded-full inline-block"
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TypingIndicator;
