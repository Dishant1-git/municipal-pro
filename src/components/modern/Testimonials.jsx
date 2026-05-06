import React from 'react';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  const testimonials = [
    {
      text: "The new online tax payment system is incredibly fast and user-friendly. Saved me a trip to the municipal office!",
      name: "Rahul Verma",
      role: "Local Business Owner",
      initials: "RV"
    },
    {
      text: "I reported a streetlight issue through the portal, and it was fixed within 48 hours. Excellent service by the city.",
      name: "Sneha Patel",
      role: "Resident, Sector 12",
      initials: "SP"
    },
    {
      text: "Getting my trade license renewed used to be a hassle, but the new digital process is transparent and efficient.",
      name: "Amit Kumar",
      role: "Retailer",
      initials: "AK"
    }
  ];

  return (
    <section className="py-20 bg-light overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-32 w-64 h-64 bg-teal-100 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
            Citizen Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hear from our community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="text-4xl text-blue-100 absolute top-4 right-6 font-serif">"</div>
              <p className="text-gray-600 mb-8 relative z-10 italic">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
