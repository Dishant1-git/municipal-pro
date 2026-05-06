import React from 'react';
import { Hero } from './Hero';
import { QuickServices } from './QuickServices';
import { About } from './About';
import { Services } from './Services';
import { Departments } from './Departments';
import { Notices } from './Notices';
import { Projects } from './Projects';
import { Testimonials } from './Testimonials';
import { Contact } from './Contact';

export const LandingPage = () => {
  return (
    <div className="font-sans bg-light min-h-screen">
      <main>
        <Hero />
        <QuickServices />
        <About />
        <Services />
        <Departments />
        <Notices />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
};
