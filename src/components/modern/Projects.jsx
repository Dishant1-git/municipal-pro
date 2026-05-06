import React from 'react';
import { motion } from 'framer-motion';

export const Projects = () => {
  const projects = [
    {
      title: "Smart Traffic Management System",
      category: "Infrastructure",
      progress: 75,
      image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Green Energy Solar Park",
      category: "Environment",
      progress: 40,
      image: "https://images.unsplash.com/photo-1509391366360-1f9e9cf22c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Public Library Renovation",
      category: "Community",
      progress: 90,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
            City Development
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ongoing Projects
          </h2>
          <p className="text-gray-400">
            Track the progress of key initiatives aimed at transforming our city into a modern metropolis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 rounded-2xl overflow-hidden group border border-slate-700 hover:border-slate-500 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-100">{project.title}</h3>
                
                {/* Progress Bar */}
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">Project Progress</span>
                  <span className="text-accent font-bold">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-accent h-2 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
