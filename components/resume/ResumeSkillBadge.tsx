import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeSkillBadgeProps {
  name: string;
  level?: number;
}

export const ResumeSkillBadge: React.FC<ResumeSkillBadgeProps> = ({ name, level }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Show tooltip on either hover or focus
  const showTooltip = isHovered || isFocused;
  
  // Determine skill level label if provided
  const getSkillLevelLabel = (level?: number) => {
    if (!level) return null;
    
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 25) return 'Familiar';
    return 'Beginner';
  };
  
  // Get color based on skill level
  const getSkillLevelColor = (level?: number) => {
    if (!level) return 'var(--accent-gradient)';
    
    if (level >= 90) return 'linear-gradient(135deg, #22c55e, #16a34a)'; // Green for Expert
    if (level >= 75) return 'linear-gradient(135deg, #f59e0b, #d97706)'; // Amber for Advanced
    if (level >= 50) return 'linear-gradient(135deg, #3b82f6, #2563eb)'; // Blue for Intermediate
    if (level >= 25) return 'linear-gradient(135deg, #8b5cf6, #7c3aed)'; // Purple for Familiar
    return 'linear-gradient(135deg, #94a3b8, #64748b)'; // Gray for Beginner
  };
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="button"
      aria-label={`Skill: ${name}, Level: ${getSkillLevelLabel(level) || 'Not specified'}`}
    >
      <motion.div 
        className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border 
          ${showTooltip ? 
            'border-transparent text-black shadow-md' : 
            'bg-[var(--secondary-bg)]/80 border-[var(--card-border)] text-[var(--primary-text)]'}`
        }
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ y: 0, scale: 0.95 }}
        style={showTooltip ? { background: getSkillLevelColor(level) } : {}}
      >
        {name}
      </motion.div>
      
      <AnimatePresence>
        {level && showTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-[var(--card-bg)] text-[var(--primary-text)] text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-[var(--card-border)] whitespace-nowrap z-10"
            style={{ minWidth: '120px' }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-semibold mb-1">{getSkillLevelLabel(level)}</span>
              <div className="w-full h-2 bg-[var(--secondary-bg)] rounded-full overflow-hidden">
              <div 
                  className="h-full rounded-full" 
                  style={{
                    width: `${level}%`,
                    background: getSkillLevelColor(level)
                  }}
              ></div>
              </div>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[var(--card-bg)]"></div>
          </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};
