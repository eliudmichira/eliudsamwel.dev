
import React, { useState } from 'react';
import { FAQItemData } from '../../types';

export const FAQItem: React.FC<FAQItemData> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--border-radius)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-md hover:shadow-[var(--card-glow)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)] rounded-[var(--border-radius)]"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-[var(--primary-text)]">{question}</span>
        <span className={`transform transition-transform duration-300 ease-in-out text-[var(--accent-color)] ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <p className="text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};
