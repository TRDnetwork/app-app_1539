import { ReactElement } from 'react';

const HeroSection = (): ReactElement => {
  return (
    <section id="hero" className="py-24 md:py-32 slide-up">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#1a2e1a]">Alex Morgan</h1>
        <p className="text-xl md:text-2xl text-dim max-w-3xl mx-auto">
          Digital Product Designer & Frontend Developer crafting intuitive experiences with code and
          care.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;