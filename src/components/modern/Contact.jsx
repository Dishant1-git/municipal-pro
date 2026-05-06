import React from 'react';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="flex-1">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We're here to help you.
            </h2>
            <p className="text-gray-600 mb-10">
              Have a question or need assistance? Reach out to us through the form or our contact information below.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiOutlineLocationMarker className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Head Office</h4>
                  <p className="text-gray-600">Smart City Municipal Building,<br />Sector 1, Central Plaza, 100001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiOutlinePhone className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Helpline Number</h4>
                  <p className="text-gray-600">1800-123-4567 (Toll Free)<br />+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiOutlineMail className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Email Support</h4>
                  <p className="text-gray-600">support@smartcity.gov<br />info@smartcity.gov</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full mt-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
