import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineTrash, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineHealthAndSafety, MdOutlinePark } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';

export const Services = () => {
  const allServices = [
    { id: 1, title: 'Street Lighting', icon: <HiOutlineLightBulb />, desc: 'Report faulty lights or request new installations in your area.' },
    { id: 2, title: 'Waste Management', icon: <HiOutlineTrash />, desc: 'Schedule pickups, report missed collections, or learn about recycling.' },
    { id: 3, title: 'Town Planning', icon: <BiBuildingHouse />, desc: 'Apply for building permits and view zoning regulations.' },
    { id: 4, title: 'Public Health', icon: <MdOutlineHealthAndSafety />, desc: 'Information on municipal clinics, vaccinations, and health drives.' },
    { id: 5, title: 'Parks & Recreation', icon: <MdOutlinePark />, desc: 'Book community halls or explore public parks.' },
    { id: 6, title: 'Trade Licenses', icon: <HiOutlineOfficeBuilding />, desc: 'Apply or renew licenses for your local business.' },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
            Comprehensive Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How can we help you today?
          </h2>
          <p className="text-gray-600">
            Explore our wide range of citizen-centric services designed to make your interactions with the municipality seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-primary group transition-colors duration-300 cursor-pointer border border-gray-100"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl text-primary group-hover:text-accent mb-6 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors line-clamp-2">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
