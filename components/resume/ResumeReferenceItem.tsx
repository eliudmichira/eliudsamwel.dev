
import React from 'react';
import { ResumeReference, ResumeReferenceContact } from '../../types';

const ReferenceContactDetail: React.FC<ResumeReferenceContact> = ({ icon: Icon, text, href }) => (
  <div className="flex items-center gap-2 mt-1">
    <Icon className="w-4 h-4 fill-current text-yellow-500 dark:text-amber-400" />
    {href ? (
      <a 
        href={href} 
        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-amber-300 transition-colors"
        target="_blank" 
        rel={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : "noopener noreferrer"}
      >
        {text}
      </a>
    ) : (
      <span className="text-sm text-neutral-600 dark:text-neutral-400">{text}</span>
    )}
  </div>
);

export const ResumeReferenceItem: React.FC<ResumeReference> = ({ name, title, contacts }) => {
  return (
    <div className="p-1">
      <h4 className="text-md sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">{name}</h4>
      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 italic mb-1">{title}</p>
      {contacts.map((contact, index) => (
        <ReferenceContactDetail key={index} {...contact} />
      ))}
    </div>
  );
};
