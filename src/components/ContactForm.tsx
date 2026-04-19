import { useState } from 'react';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '', honeypot: '' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-16 slide-up">
      <div className="container">
        <h2 className="text-3xl md:text-4xl text-center mb-4">Get In Touch</h2>
        <p className="text-dim text-center max-w-2xl mx-auto mb-12">
          Have a project in mind? Let’s talk.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.name ? 'border-red-500' : 'border-[#e9e5dd]'
                } rounded focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow`}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.email ? 'border-red-500' : 'border-[#e9e5dd]'
                } rounded focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className={`w-full p-3 border ${
                errors.message ? 'border-red-500' : 'border-[#e9e5dd]'
              } rounded focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus-glow`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="honeypot" className="block mb-2 text-sm font-medium sr-only">
              Leave this blank
            </label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formState.honeypot}
              onChange={handleChange}
              className="absolute left-full top-full w-px h-px overflow-hidden opacity-0"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-[#e66000] text-white rounded hover:bg-[#ff8c42] transition-colors pulse-hover focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 min-h-11 flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        {showToast && (
          <div className="toast" role="status" aria-live="polite">
            <span>Message sent successfully!</span>
            <button onClick={() => setShowToast(false)} aria-label="Close toast">
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;