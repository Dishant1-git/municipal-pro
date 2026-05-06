import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineDocumentSearch, HiOutlineExclamationCircle, HiOutlineDocumentText } from 'react-icons/hi';
import { MdWaterDrop } from 'react-icons/md';

export const QuickServices = () => {
  const services = [
    {
      id: 1,
      title: "Property Tax",
      icon: <HiOutlineHome className="text-3xl" />,
      desc: "Pay your property tax online easily.",
      color: "bg-blue-50 text-blue-600",
      delay: 0.1
    },
    {
      id: 2,
      title: "Water Bill",
      icon: <MdWaterDrop className="text-3xl" />,
      desc: "Check and pay your water utility bills.",
      color: "bg-cyan-50 text-cyan-600",
      delay: 0.2
    },
    {
      id: 3,
      title: "File Complaint",
      icon: <HiOutlineExclamationCircle className="text-3xl" />,
      desc: "Register and track civic issues.",
      color: "bg-orange-50 text-orange-600",
      delay: 0.3
    },
    {
      id: 4,
      title: "Certificates",
      icon: <HiOutlineDocumentText className="text-3xl" />,
      desc: "Apply for birth & death certificates.",
      color: "bg-purple-50 text-purple-600",
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 bg-white relative -mt-16 z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: service.delay }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.color} group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
              <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                <span>Access Service</span>
                <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
