import React, { useState } from 'react';

// PERF: Memoize Toast to prevent unnecessary re-renders when form state changes
const Toast = React.memo(({ message, onClose }: { message: string; onClose: () => void }) => (
  <div
    className="toast slide-up fixed bottom-4 right-4 bg-text text-bg p-4 rounded shadow-lg max-w-xs flex items-center justify-between"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <span>{message}</span>
    <button
      onClick={onClose}
      aria-label="Dismiss notification"
      className="ml-4 text-bg hover:text-accent-alt focus:outline-none focus:ring-2 focus:ring-bg rounded-full p-1"
    >
      ×
    </button>
  </div>
));

Toast.displayName = 'Toast';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastVisible, setToastVisible] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (botField) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
      return;
    }

    if (!validateForm()) return;

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // In a real app, log to Sentry
      setErrors({ submit: 'Something went wrong. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'message') setMessage(value);
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section id="contact" className="py-16" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-8 slide-up">
          Get In Touch
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto slide-up"
          style={{ animationDelay: '0.2s' }}
          noValidate
        >
          {/* Honeypot field - hidden from users, catches bots */}
          <input
            type="text"
            name="bot-field"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-dim">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus-glow"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-dim">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus-glow"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-dim">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              required
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus-glow"
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="mb-6">
              <p className="text-red-500 text-sm" role="alert">
                {errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitted}
            className="bg-accent text-white px-6 py-3 rounded hover:bg-opacity-90 transition pulse-hover disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-accent-alt focus:ring-offset-2"
          >
            {isSubmitted ? 'Sent!' : 'Send Message'}
          </button>
        </form>

        {/* Toast Notification */}
        {toastVisible && (
          <Toast
            message="Message sent successfully!"
            onClose={() => {
              setToastVisible(false);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ContactForm;