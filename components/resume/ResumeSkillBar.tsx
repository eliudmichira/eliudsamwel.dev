import React, { useState, useEffect, useRef } from 'react';

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  color?: string;
}

export const ResumeSkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  level, 
  color = 'var(--accent-gradient)'
}) => {
  const [animated, setAnimated] = useState(false);
  const skillBarRef = useRef<HTMLDivElement>(null);
  
  // Function to determine level text based on percentage
  const getLevelText = (percentage: number) => {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 75) return 'Advanced';
    if (percentage >= 50) return 'Intermediate';
    if (percentage >= 25) return 'Basic';
    return 'Beginner';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillBarRef.current) {
      observer.observe(skillBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={skillBarRef} className="mb-4 last:mb-0 transition-all duration-300">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-[var(--primary-text)]">{name}</span>
        <span className="text-xs text-[var(--secondary-text)]">{getLevelText(level)}</span>
      </div>
      <div className="w-full bg-[var(--secondary-bg)] rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full"
          style={{ 
            background: color,
            width: animated ? `${level}%` : '0%',
            transition: 'width 1s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  );
}; 