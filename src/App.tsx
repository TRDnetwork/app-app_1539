import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Accessibility: Add skip-to-content link for keyboard users
const SkipNavLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-white focus:p-2 focus:rounded-md z-50"
    aria-label="Skip to main content"
  >
    Skip to content
  </a>
);

// Reusable animation hook for scroll-triggered effects
const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (inView) {
    controls.start('visible');
  }

  return { ref, controls };
};

// Animated Section Wrapper
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="slide-up"
    >
      {children}
    </motion.section>
  );
};

// Project Card Component
const ProjectCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <motion.div
      className="bg-surface p-6 rounded-lg shadow-sm hover-lift transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      tabIndex={0}
      aria-label={`${title}. ${description} View project`}
      role="region"
    >
      <h3 className="text-xl font-semibold mb-2 text-[#1a2e1a]">{title}</h3>
      <p className="text-dim mb-4">{description}</p>
      <a
        href={link}
        className="inline-block text-accent font-medium hover:underline focus:underline focus:outline-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project
      </a>
    </motion.div>
  );
};

// Toast Notification Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onAnimationEnd={() => {
        const timer = setTimeout(() => onClose(), 4000);
        return () => clearTimeout(timer);
      }}
    >
      <span>{message}</span>
      <button
        type="button"
        aria-label="Close notification"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
      >
        ×
      </button>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';

    // Honeypot check
    if (formState.honeypot) {
      console.warn('Honeypot triggered — possible bot submission');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setShowToast(true);
      // Reset form
      setFormState({ name: '', email: '', message: '', honeypot: '' });
      // Auto-dismiss toast after 4s
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      noValidate
    >
      {/* Honeypot field — hidden from screen readers and sighted users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="honeypot">Don't fill this out</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formState.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1"
          aria-required="true"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow ${
            errors.name ? 'border-red-500' : 'border-[#e9e5dd]'
          }`}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          aria-required="true"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow ${
            errors.email ? 'border-red-500' : 'border-[#e9e5dd]'
          }`}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1"
          aria-required="true"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow ${
            errors.message ? 'border-red-500' : 'border-[#e9e5dd]'
          }`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-[#e66000] text-white px-6 py-2 rounded-md hover:bg-[#ff8c42] transition-colors duration-300 pulse-hover focus:ring-2 focus:ring-offset-2 focus:ring-[#e66000] focus:outline-none"
          aria-disabled={isSubmitted}
        >
          {isSubmitted ? 'Sent!' : 'Send Message'}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && <Toast message="Message sent successfully!" onClose={() => setShowToast(false)} />}
    </motion.form>
  );
};

// Main App Component
const App = () => {
  return (
    <>
      <SkipNavLink />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <AnimatedSection>
          <header className="text-center mb-16" role="banner">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-4">
              Jane Doe
            </h1>
            <p className="text-xl text-dim max-w-2xl mx-auto">
              Full-Stack Developer & UI Designer crafting meaningful digital experiences with code and creativity.
            </p>
          </header>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection delay={0.2}>
          <section
            id="main-content"
            className="mb-16"
            aria-labelledby="about-heading"
          >
            <h2
              id="about-heading"
              className="text-3xl font-semibold text-center mb-8 text-[#1a2e1a]"
            >
              About Me
            </h2>
            <div className="max-w-3xl mx-auto text-dim leading-relaxed">
              <p className="mb-4">
                I'm a passionate developer with over 5 years of experience building scalable web applications and intuitive user interfaces. My journey began in computer science, but I quickly fell in love with the creative side of development — turning complex problems into elegant solutions.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains, experimenting with analog photography, or brewing the perfect cup of coffee. I believe that great software starts with empathy — understanding users' needs and crafting experiences that feel both powerful and simple.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection delay={0.3}>
          <section
            className="mb-16"
            aria-labelledby="projects-heading"
          >
            <h2
              id="projects-heading"
              className="text-3xl font-semibold text-center mb-10 text-[#1a2e1a]"
            >
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="EcoTrack"
                description="A sustainability dashboard that visualizes carbon footprint data for households and small businesses."
                link="https://ecotrack.example.com"
              />
              <ProjectCard
                title="TaskFlow"
                description="A minimalist productivity app that helps teams manage workflows without distraction."
                link="https://taskflow.example.com"
              />
              <ProjectCard
                title="PaletteAI"
                description="An intelligent color system generator powered by machine learning, designed for designers and developers."
                link="https://paletteai.example.com"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection delay={0.4}>
          <section
            className="bg-surface p-8 rounded-lg shadow-sm"
            aria-labelledby="contact-heading"
          >
            <h2
              id="contact-heading"
              className="text-3xl font-semibold text-center mb-8 text-[#1a2e1a]"
            >
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
};

export default App;