import React from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const FooterModern = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-gray-300 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">Smart City</span>
                <span className="text-xs text-gray-400 font-medium">Municipal Corporation</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Committed to providing efficient, transparent, and citizen-friendly civic services to build a sustainable future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaFacebookF size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaTwitter size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaInstagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaLinkedinIn size={14} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Our Services</a></li>
              <li><a href="#departments" className="hover:text-accent transition-colors">Departments</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors">Ongoing Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Pay Property Tax</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Water Bill Payment</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Birth/Death Certificate</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trade License Renewal</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Register Complaint</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <HiOutlinePhone className="text-xl text-accent flex-shrink-0 mt-0.5" />
                <span>1800-123-4567<br/>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineMail className="text-xl text-accent flex-shrink-0 mt-0.5" />
                <span>support@smartcity.gov<br/>info@smartcity.gov</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Smart City Municipal Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
