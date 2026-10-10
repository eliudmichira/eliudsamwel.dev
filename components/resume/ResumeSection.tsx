import React, { useState } from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <div className="card-embossed mb-6 sm:mb-8 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 sm:p-5 cursor-pointer min-h-[44px]"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg sm:text-xl font-black tracking-tight text-[var(--primary-text)] pr-2">{title}</h2>
        <button
          className="lifted-primary pill w-9 h-9 flex items-center justify-center flex-shrink-0"
          aria-label={expanded ? "Collapse section" : "Expand section"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
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
        <div className="p-3 sm:p-4 border-t border-[var(--card-border)]">
          {children}
        </div>
      </div>
    </div>
  );
};
