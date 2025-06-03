import React, { useState } from 'react';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form (optional, based on desired UX)
    setFormData({
      name: '', email: '', company: '', budget: '', services: [], timeline: '', message: '',
    });
  };

  const inputBaseClasses = "w-full p-3 sm:p-4 border-2 border-[var(--card-border)] rounded-[var(--border-radius)] bg-[var(--input-bg)] text-[var(--primary-text)] text-sm sm:text-base transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/30 focus:shadow-lg placeholder:text-[var(--secondary-text)]/70";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-[500px]">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label htmlFor="name" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Full Name *</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputBaseClasses} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputBaseClasses} placeholder="john@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="company" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Company/Organization</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputBaseClasses} placeholder="Your Company" />
          </div>
          <div className="form-group">
            <label htmlFor="budget" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Project Budget</label>
            <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={`${inputBaseClasses} appearance-none`}>
              <option value="">Select Budget Range</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-plus">$10,000+</option>
              <option value="discuss">Let's Discuss</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-6">
          <label className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Project Type</label>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
            {['Web Development', 'UI/UX Design', 'QA Testing', 'Consultation'].map(service => (
              <label key={service} className="flex items-center gap-2 cursor-pointer text-sm text-[var(--primary-text)]">
                <input type="checkbox" name="services" value={service.toLowerCase().replace(/\s+/g, '-')} 
                       checked={formData.services?.includes(service.toLowerCase().replace(/\s+/g, '-'))}
                       onChange={handleChange} 
                       className="w-4 h-4 accent-[var(--accent-color)] rounded border-[var(--card-border)] focus:ring-[var(--accent-color)]" />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group mb-6">
          <label htmlFor="timeline" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Project Timeline</label>
          <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={`${inputBaseClasses} appearance-none`}>
            <option value="">Select Timeline</option>
            <option value="asap">ASAP (Rush Job)</option>
            <option value="1-month">Within 1 Month</option>
            <option value="2-3-months">2-3 Months</option>
            <option value="3-plus-months">3+ Months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div className="form-group mb-8">
          <label htmlFor="message" className="block mb-1.5 text-sm font-semibold text-[var(--primary-text)]">Project Details *</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={`${inputBaseClasses} min-h-[150px]`} placeholder="Tell me about your project, goals, requirements..." required></textarea>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-0">
        <button
          type="submit"
          className="relative flex items-center justify-center gap-2 px-10 py-3.5 sm:px-12 sm:py-4 rounded-full \
            bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 bg-[length:200%_200%] animate-gradient-x \
            text-white font-bold text-base sm:text-lg no-underline border-2 border-amber-400/60 shadow-xl \
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] \
            hover:brightness-110 hover:shadow-[0_0_24px_4px_rgba(245,158,11,0.4)] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400/40"
        >
          <span className="inline-block text-lg sm:text-xl">
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className="w-6 h-6 mr-1 -ml-2 text-white drop-shadow">
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10l9-6 9 6-9 6-9-6zm0 0v6a2 2 0 002 2h3m10-8v6a2 2 0 01-2 2h-3' />
            </svg>
          </span>
          Send Message
        </button>
      </div>
    </form>
  );
};
