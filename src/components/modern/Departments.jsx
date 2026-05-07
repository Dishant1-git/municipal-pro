import React from 'react';
import { motion } from 'framer-motion';

export const Departments = () => {
  const departments = [
    { name: "Engineering", count: "12 Projects", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Health & Sanitation", count: "8 Facilities", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Revenue & Tax", count: "3 Services", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Education", count: "24 Schools", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <section id="departments" className="py-20 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              City Departments
            </h2>
            <p className="text-gray-600 max-w-xl">
              Our various administrative wings working tirelessly to maintain and upgrade the city's infrastructure.
            </p>
          </div>
          <button className="text-primary font-semibold hover:text-accent transition-colors mt-4 md:mt-0 w-fit flex-shrink-0 whitespace-nowrap">
            View All Directory →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-md"
            >
              <img src={dept.img} alt={dept.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-3">
                  {dept.count}
                </span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{dept.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
