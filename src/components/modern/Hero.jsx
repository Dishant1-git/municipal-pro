import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineDocumentText } from 'react-icons/hi';

export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-100 opacity-50 blur-3xl mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary font-medium text-sm mb-6 border border-blue-200">
                Welcome to Smart City Portal
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Serving Citizens with <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Transparency & Efficiency
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Access municipal services online, stay updated with the latest city projects, and participate in making our city cleaner, greener, and smarter.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group">
                Explore Services 
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2 group bg-white">
                <HiOutlineDocumentText className="text-xl" />
                File Complaint
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200"
            >
              <div>
                <h4 className="text-3xl font-bold text-gray-900">24/7</h4>
                <p className="text-sm text-gray-500">Support</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">50+</h4>
                <p className="text-sm text-gray-500">Online Services</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">1M+</h4>
                <p className="text-sm text-gray-500">Citizens Served</p>
              </div>
            </motion.div>
          </div>
          
          {/* Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Dummy Image Placeholder using generic unstyled div if real image is not available, but let's use a nice gradient or a realistic placeholder */}
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 w-full h-[400px] object-cover relative">
                 <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="City View" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-card p-4 flex items-center justify-between">
                       <div>
                          <p className="text-sm font-semibold text-gray-800">Air Quality Index</p>
                          <p className="text-xs text-green-600 font-medium">Good (42 AQI)</p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xl">🍃</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
