import React, { useState } from 'react';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void | Promise<void>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    services: [],
    timeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        services: checkbox.checked
          ? [...(prev.services || []), value]
          : (prev.services || []).filter(service => service !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setSubmitted(true);
      setFormData({
        name: '', email: '', company: '', budget: '', services: [], timeline: '', message: '',
      });
      setTimeout(() => setSubmitted(false), 2500);
    } catch {
      // Parent shows the error; keep the form filled so the visitor can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses = "recessed pill w-full px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-[var(--primary-text)] placeholder:text-[var(--secondary-text)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/40";
  const textareaClasses = "recessed w-full px-5 py-4 rounded-2xl text-sm sm:text-base text-[var(--primary-text)] placeholder:text-[var(--secondary-text)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/40";

  const labelClasses = "block mb-2 emboss-meta";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-[400px]">
      <div className="flex-1">
        {/* Essential Fields */}
        <div className="space-y-6 mb-6">
          <div className="form-group">
            <label htmlFor="name" className={labelClasses}>
              Your Name <span className="text-[var(--accent-primary)]">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={inputBaseClasses} 
              placeholder="John Doe" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className={labelClasses}>
              Email Address <span className="text-[var(--accent-primary)]">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={inputBaseClasses} 
              placeholder="john@example.com" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="company" className={labelClasses}>
              Company <span className="normal-case tracking-normal text-[10px] text-[var(--secondary-text)]">(optional)</span>
            </label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              className={inputBaseClasses} 
              placeholder="Your Company (optional)" 
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="form-group mb-6">
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${textareaClasses} min-h-[180px]`}
            placeholder="Tell me about the role or project — what you need, the timeline, and anything else that helps." 
            required
          />
          <p className="mt-2 text-xs text-[var(--secondary-text)]">
            For roles, a link to the job post helps. For projects, include scope and timeline.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-0">
        <button
          type="submit"
          disabled={isSubmitting || submitted}
          className={`pill flex items-center justify-center gap-2 px-10 py-3.5 sm:px-12 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-black focus:outline-none focus:ring-4 focus:ring-[var(--accent-primary)]/40 disabled:cursor-not-allowed min-w-[220px] ${submitted ? 'lifted-safe' : 'lifted-primary'}`}
        >
          {isSubmitting ? (
            <>
              <span className="emboss-dots" aria-hidden="true">
                <span /><span /><span />
              </span>
              <span>Sending</span>
            </>
          ) : submitted ? (
            <>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className="w-5 h-5">
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
              </svg>
              <span>Sent</span>
            </>
          ) : (
            <>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className="w-5 h-5">
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
              </svg>
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
