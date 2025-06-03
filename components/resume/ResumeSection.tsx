import React, { useState } from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <div className="mb-8 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] overflow-hidden transition-all duration-300 hover:shadow-md">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-[var(--secondary-bg)] bg-opacity-30"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-xl font-bold text-[var(--primary-text)]">{title}</h2>
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--accent-gradient)] text-black transform transition-transform duration-300"
          aria-label={expanded ? "Collapse section" : "Expand section"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 border-t border-[var(--card-border)]">
          {children}
        </div>
      </div>
    </div>
  );
};
