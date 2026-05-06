import React from 'react';
import { Hero } from './modern/Hero';
import { QuickServices } from './modern/QuickServices';
import { About } from './modern/About';
import { Services } from './modern/Services';
import { Departments } from './modern/Departments';
import { Notices } from './modern/Notices';
import { Projects } from './modern/Projects';
import { Testimonials } from './modern/Testimonials';
import { Contact } from './modern/Contact';

export const Index = () => {
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