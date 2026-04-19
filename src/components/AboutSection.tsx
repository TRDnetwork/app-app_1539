import { ReactElement } from 'react';

const AboutSection = (): ReactElement => {
  return (
    <section id="about" className="py-16 slide-up">
      <div className="container max-w-3xl">
        <h2 className="text-3xl md:text-4xl text-center mb-8">About Me</h2>
        <p className="text-dim text-lg leading-relaxed">
          I’m a designer and developer based in Portland, with over 8 years of experience building
          digital products that balance aesthetics and functionality. My approach blends thoughtful
          user research with clean, maintainable code.
        </p>
        <p className="text-dim text-lg leading-relaxed mt-6">
          When I’m not at the keyboard, you’ll find me hiking in the Cascades or experimenting with
          sourdough recipes. I believe great work starts with curiosity — and ends with impact.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;