import React, { useState, useEffect, useRef } from 'react';
import { StatItemProps } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const StatsCard: React.FC<StatItemProps> = ({ icon, targetCount, label, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  // Cast cardRef to RefObject<HTMLElement> to satisfy the hook's expected type.
  const isVisible = useIntersectionObserver(cardRef as React.RefObject<HTMLElement>, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }, true);
  const animationTriggered = useRef(false);

  useEffect(() => {
    if (isVisible && !animationTriggered.current && cardRef.current) {
      animationTriggered.current = true; // Mark as triggered
      let start = 0;
      const end = targetCount;
      if (start === end && end === 0) { // If target is 0, set immediately
        setCount(0);
        return;
      }
      if (start === end) return;


      const incrementTime = 30; // ms
      const totalSteps = Math.max(1, duration / incrementTime);
      const increment = (end - start) / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if ( (increment > 0 && start >= end) || (increment < 0 && start <= end) ) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, targetCount, duration]);

  // Updated base classes for glassmorphic style and new orange/amber accents
  const baseClasses = `text-center p-6 sm:p-8 
                 bg-[var(--glass-card-bg)] backdrop-blur-md 
                 border border-[var(--glass-card-border)] 
                 rounded-[var(--border-radius-lg)] shadow-2xl 
                 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                 hover:transform hover:translate-y-[var(--hover-lift)] hover:scale-[var(--hover-scale)] 
                 hover:shadow-[var(--orange-glow)] /* Use new --orange-glow variable */
                 relative overflow-hidden group`;

  // Animation classes to be applied based on visibility
  const animationClasses = isVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10';
  
  return (
    <div 
      ref={cardRef}
      className={`${baseClasses} ${animationClasses}`}
    >
      {/* Updated top border gradient to amber/orange */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
      {/* Updated icon color to use amber */}
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-80 text-[var(--primary-amber)]" aria-hidden="true">{icon}</div>
      {/* Updated count gradient text to amber/orange (using .gradient-text which now maps to new theme) */}
      <div className="text-[clamp(2.2rem,5vw,3rem)] font-extrabold mb-2 sm:mb-3 gradient-text">
        {count}
      </div>
      <div className="text-[var(--secondary-text)] font-semibold text-sm sm:text-base">
        {label}
      </div>
    </div>
  );
};
