import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineDownload } from 'react-icons/hi';

export const Notices = () => {
  const notices = [
    { date: "Oct 24, 2026", title: "Public Hearing for New Zoning Laws", type: "Announcement" },
    { date: "Oct 18, 2026", title: "Scheduled Water Supply Interruption in Sector 4", type: "Alert" },
    { date: "Oct 12, 2026", title: "Quarterly Municipal Financial Report Published", type: "Document" },
    { date: "Oct 05, 2026", title: "City-wide Cleanliness Drive Registration Open", type: "Event" },
  ];

  return (
    <section id="notices" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates & Notices</h2>
            <p className="text-gray-600 mb-8">Stay informed about the latest city announcements, alerts, and upcoming civic events.</p>
            <button className="btn-secondary w-full lg:w-auto">View All Notices</button>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {notices.map((notice, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-gray-50 group"
                >
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                      <HiOutlineCalendar className="text-2xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider">{notice.type}</span>
                        <span className="text-xs text-gray-400">• {notice.date}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{notice.title}</h4>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-primary p-2 transition-colors self-start sm:self-auto">
                    <HiOutlineDownload className="text-xl" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
