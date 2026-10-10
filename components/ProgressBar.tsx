import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  variant?: 'default' | 'gradient' | 'glow';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  variant = 'gradient',
  showPercentage = false,
  className = ''
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  // Updated variant styles for orange/amber theme
  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return {
          bar: 'bg-gradient-to-r from-amber-500 to-orange-600', // amber to orange
          glow: 'shadow-[0_0_20px_var(--primary-amber),0_0_40px_var(--primary-orange)]', // Using theme vars for glow
          container: 'bg-gray-800/50 backdrop-blur-sm'
        };
      case 'gradient':
        return {
          bar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-200% animate-gradient', // amber-orange-amber gradient
          glow: 'shadow-[0_0_15px_var(--orange-glow)]', // Using theme var for glow
          container: 'bg-gray-900/70'
        };
      default:
        return {
          bar: 'bg-amber-600', // Solid amber
          glow: '',
          container: 'bg-gray-800'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`progress-bar-container ${className}`}>
      {/* Progress label if enabled */}
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-semibold text-amber-400">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      {/* Progress bar */}
      <div className={`relative h-2 rounded-full overflow-hidden ${styles.container}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
        </div>
        
        {/* Progress fill */}
        <motion.div
          className={`h-full rounded-full relative ${styles.bar} ${styles.glow}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                           -skew-x-12 animate-shine" />
          </div>
          
          {/* Leading edge glow */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4">
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-60 animate-pulse" />
          </div>
        </motion.div>
        
        {/* Progress particles */}
        {clampedProgress > 0 && clampedProgress < 100 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: `${clampedProgress}%`,
                  top: '50%'
                }}
                animate={{
                  x: [-5, 5, -5],
                  y: [-2, 2, -2],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .bg-200\\% { background-size: 200% 100%; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-shine { animation: shine 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
