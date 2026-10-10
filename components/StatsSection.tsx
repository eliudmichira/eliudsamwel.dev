import React from 'react';
import { StatsCard } from './StatsCard';
import { StatItemProps } from '../types';

const statsData: StatItemProps[] = [
  { icon: '🎯', targetCount: 35, label: 'Out of 35 — Video Master Eval (perfect score)' },
  { icon: '🌐', targetCount: 5, label: 'Domains — business, finance, health, legal, STEM' },
  { icon: '✅', targetCount: 100, label: '% client retention — freelance & annotation work' },
  { icon: '💼', targetCount: 5, label: 'Years of remote async experience' },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="my-16 sm:my-24 py-12 sm:py-16">
      <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">
              Key <span className="gradient-text-multi">Metrics</span>
          </h2>
          <p className="text-lg text-[var(--secondary-text)] max-w-xl mx-auto">
              Operations, automation platforms, shipped work, and flagship builds—at a glance.
          </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
        {statsData.map((stat, index) => (
          // Each StatsCard already has its own intersection observer for staggered animation
          <StatsCard 
            key={index} 
            icon={stat.icon} 
            targetCount={stat.targetCount} 
            label={stat.label} 
          />
        ))}
      </div>
    </section>
  );
};
