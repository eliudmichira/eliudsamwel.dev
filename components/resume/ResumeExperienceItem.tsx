
import React from 'react';
import { ResumeExperienceEntry } from '../../types';

export const ResumeExperienceItem: React.FC<ResumeExperienceEntry> = ({ role, company, dates, responsibilities }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 dark:text-amber-400">{role}</h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
        <p className="font-medium text-neutral-700 dark:text-neutral-300">{company}</p>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic">{dates}</p>
      </div>
      <ul className="list-disc list-outside ml-5 space-y-1 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
