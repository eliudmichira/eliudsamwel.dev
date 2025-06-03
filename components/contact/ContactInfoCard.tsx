import React from 'react';
import { ContactInfoCardData } from '../../types';

export const ContactInfoCard: React.FC<ContactInfoCardData> = ({ icon, title, description, buttonText, buttonLink, isExternalLink }) => {
  return (
    <div className="p-6 sm:p-8 text-center 
                    bg-[var(--card-bg)] border border-[var(--card-border)] 
                    rounded-[var(--border-radius-lg)] shadow-[var(--card-shadow)] 
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    hover:transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--card-glow)]
                    relative group overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--accent-gradient)] rounded-full flex items-center justify-center 
                      mx-auto mb-5 sm:mb-6 text-2xl sm:text-3xl text-black dark:text-white shadow-lg 
                      transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--primary-text)]">{title}</h3>
      <p className="text-sm sm:text-base text-[var(--secondary-text)] mb-5 sm:mb-6 leading-relaxed">{description}</p>
      <a
        href={buttonLink}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 rounded-full 
                   bg-[var(--accent-gradient)] text-black dark:text-white 
                   font-semibold text-sm sm:text-base no-underline
                   transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                   hover:brightness-110 hover:shadow-lg transform hover:scale-105"
      >
        {buttonText}
      </a>
    </div>
  );
};
