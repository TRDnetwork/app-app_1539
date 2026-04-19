import React from 'react';
import { motion } from 'framer-motion';
import ProjectSection from './components/ProjectCard';
import ContactForm from './components/ContactForm';

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-bg px-4 py-2 rounded z-50"
  >
    Skip to content
  </a>
);

const App = () => {
  return (
    <>
      <SkipLink />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col"
      >
        <section
          id="hero"
          className="flex-1 flex items-center justify-center py-20"
          aria-labelledby="hero-heading"
        >
          <div className="container text-center">
            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Alex Rivera
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-dim"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Product Designer & Developer
            </motion.p>
          </div>
        </section>

        <section
          id="about"
          className="py-16 bg-surface"
          aria-labelledby="about-heading"
        >
          <div className="container max-w-prose">
            <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-6 slide-up">
              About Me
            </h2>
            <motion.p
              className="text-dim text-lg slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              I’m a passionate designer and developer focused on creating intuitive, accessible digital experiences. With over 8 years in the industry, I blend clean aesthetics with robust functionality to build products that people love to use.
            </motion.p>
          </div>
        </section>

        <ProjectSection />

        <ContactForm />
      </motion.div>
    </>
  );
};

export default App;