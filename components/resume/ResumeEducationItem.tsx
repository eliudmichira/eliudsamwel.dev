
import React from 'react';
import { ResumeEducationEntry } from '../../types';

export const ResumeEducationItem: React.FC<ResumeEducationEntry> = ({ degree, institution, dates }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 dark:text-amber-400">{degree}</h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="font-medium text-neutral-700 dark:text-neutral-300">{institution}</p>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic">{dates}</p>
      </div>
    </div>
  );
};
