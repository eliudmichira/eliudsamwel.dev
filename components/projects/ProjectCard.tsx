import React, { useState } from 'react';
import { ProjectCardProps } from '../../types';
import { motion } from 'framer-motion';
import { FaClock, FaStar, FaArrowRight } from 'react-icons/fa';

interface ProjectCardComponentProps extends ProjectCardProps {
  onClick: () => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardComponentProps> = ({
  title,
  description,
  image,
  tags,
  demoLink,
  codeLink,
  category,
  type,
  featured,
  onClick,
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative h-full cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary-amber)]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      aria-label={`Project: ${title} - ${category} ${type}`}
    >
      <div className="card-glow relative h-full bg-[var(--color-bg-surface)] rounded-lg overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--primary-amber)]/50">
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <FaStar className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
        
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-[var(--color-bg-muted)]">
          {image && (
            <img
                src={image}
                alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                onLoad={() => setImageLoaded(true)}
            />
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                {category}
              </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-[var(--primary-text)] line-clamp-2 group-hover:text-[var(--primary-amber)] transition-colors duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[var(--secondary-text)] text-sm line-clamp-3 mb-6 leading-relaxed">
            {truncateDescription(description)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[var(--primary-amber)]/10 text-[var(--primary-amber)] text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-[var(--secondary-text)] text-xs">
                +{tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--secondary-text)]">
              <FaClock className="w-3 h-3 text-[var(--primary-amber)]" />
              <span>2 months ago</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[var(--primary-amber)] text-sm font-medium">
              <span>View Details</span>
              <FaArrowRight className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </motion.article>
  );
};