import React, { useState } from 'react';
import { FAQItemData } from '../../types';

export const FAQItem: React.FC<FAQItemData> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-embossed overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-4 p-5 sm:p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-black tracking-tight text-[var(--primary-text)]">{question}</span>
        <span className={`transform transition-transform duration-200 ease-out text-[var(--accent-primary)] flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="recessed rounded-2xl p-4 sm:p-5">
            <p className="text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
