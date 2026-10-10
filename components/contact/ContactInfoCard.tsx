import React from 'react';
import { ContactInfoCardData } from '../../types';

export const ContactInfoCard: React.FC<ContactInfoCardData> = ({ icon, title, description, buttonText, buttonLink, isExternalLink }) => {
  return (
    <div className="card-embossed p-6 sm:p-8 text-center transition-transform duration-200 ease-out hover:-translate-y-1 group">
      <div className="lifted-primary pill w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-5 sm:mb-6 text-2xl sm:text-3xl">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3 text-[var(--primary-text)]">{title}</h3>
      <p className="text-sm text-[var(--secondary-text)] mb-5 sm:mb-6 leading-relaxed">{description}</p>
      <a
        href={buttonLink}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        className="lifted pill inline-block px-6 py-2.5 sm:px-7 sm:py-3 text-xs uppercase tracking-widest font-bold no-underline"
      >
        {buttonText}
      </a>
    </div>
  );
};
