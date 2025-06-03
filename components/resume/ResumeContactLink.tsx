
import React from 'react';
import { ResumeContactItem } from '../../types';

export const ResumeContactLink: React.FC<ResumeContactItem> = ({ icon: Icon, text, href, ariaLabel }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : "noopener noreferrer"}
      aria-label={ariaLabel}
      className="flex items-center gap-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 hover:text-yellow-500 dark:hover:text-amber-400 transition-colors duration-300 group"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
      <span>{text}</span>
    </a>
  );
};
