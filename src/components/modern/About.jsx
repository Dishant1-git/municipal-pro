import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

export const About = () => {
  const features = [
    "Digital citizen services",
    "Transparent governance",
    "Sustainable urban planning",
    "24/7 civic assistance"
  ];

  return (
    <section id="about" className="py-20 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-w-4 aspect-h-4 lg:aspect-h-5 w-full max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1577493341514-fc562d9894e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="City Hall" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                  15+
                </div>
                <div>
                  <p className="font-bold text-gray-900">Years of</p>
                  <p className="text-sm text-gray-500">Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
              About Our City
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Building a smarter, <br className="hidden md:block" /> greener tomorrow.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our Municipal Corporation is dedicated to enhancing the quality of life for all citizens through efficient governance, sustainable development, and responsive public services. We leverage technology to bring the government closer to you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <HiCheckCircle className="text-accent text-xl flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="btn-primary">
              Learn More About Us
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
