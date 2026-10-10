import React, { useState, useRef, useMemo, memo, useCallback } from 'react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { 
  FaArrowRight, 
  FaGithub, 
  FaBolt,
  FaTrophy
} from 'react-icons/fa';

interface ProjectCardComponentProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  category: string;
  type: string;
  featured?: boolean;
  onClick: () => void;
  index: number;
}

// Initials for the branded tile shown when a project has no screenshot
const getInitials = (title: string) =>
  title
    .split(/[\s—–-]+/)
    .filter(word => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

// Memoized component for better performance
export const ProjectCard: React.FC<ProjectCardComponentProps> = memo(({
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
  const [imageLoaded, setImageLoaded] = useState(!image);
  const [imageError, setImageError] = useState(!image);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Performance optimization: Only animate if in viewport and reduce motion preference is not set
  const prefersReducedMotion = useMemo(() => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches, []
  );
  
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 // Trigger when 30% is visible for better performance
  });
  
  // Spring animations for smooth mouse tracking (only if not reduced motion)
  const springConfig = useMemo(() => ({ 
    stiffness: prefersReducedMotion ? 300 : 150, 
    damping: prefersReducedMotion ? 50 : 15 
  }), [prefersReducedMotion]);
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  
  // 3D rotation transforms (disabled for reduced motion)
  const rotateX = useTransform(y, [-20, 20], prefersReducedMotion ? [0, 0] : [5, -5]);
  const rotateY = useTransform(x, [-20, 20], prefersReducedMotion ? [0, 0] : [-5, 5]);
  const scale = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      if (prefersReducedMotion) return 1;
      const distance = Math.sqrt((latestX as number) * (latestX as number) + (latestY as number) * (latestY as number));
    return 1 + distance * 0.001;
    }
  );
  
  // Handle mouse movement for 3D effect (optimized with useCallback)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || prefersReducedMotion) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(mouseX * 20);
    y.set(mouseY * 20);
    setMousePosition({ x: mouseX, y: mouseY });
  }, [x, y, prefersReducedMotion]);
  
  const handleMouseLeave = useCallback(() => {
    if (!prefersReducedMotion) {
    x.set(0);
    y.set(0);
    }
    setIsHovered(false);
  }, [x, y, prefersReducedMotion]);
  
  // Truncate description with memoization
  const truncatedDescription = useMemo(() => {
    const maxLength = 120;
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  }, [description]);
  
  // Handle image loading with error fallback
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);
  
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);
  
  // Performance monitoring (only in development)
  const handleClick = useCallback(() => {
    // Track interaction for analytics
    if (process.env.NODE_ENV === 'development') {
      console.log(`Project card clicked: ${title}, Load time: ${imageLoaded ? 'Loaded' : 'Loading'}`);
    }
    onClick();
  }, [onClick, title, imageLoaded]);

  return (
    <>
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: prefersReducedMotion ? 0 : -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
            duration: prefersReducedMotion ? 0.3 : 0.8,
            delay: prefersReducedMotion ? 0 : index * 0.1,
          ease: [0.6, -0.05, 0.01, 0.99]
        }
      } : {}}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative cursor-pointer transition-shadow duration-300 shadow-sm hover:shadow-lg"
      aria-label={`${title} - ${category} project`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Glow effect container - Only show if not reduced motion */}
      <div className="card-embossed relative overflow-hidden transition-shadow duration-200 ease-out">
        
        {/* Animated background gradient - Only if motion is allowed */}
        {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, var(--primary-amber) 0%, transparent 50%)`,
            opacity: 0.05
          }}
        />
        )}
        
        {/* Top badge: Featured only, reserved for the top few projects */}
        {featured && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <motion.div
              initial={{ rotate: prefersReducedMotion ? 0 : -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                delay: prefersReducedMotion ? 0 : 0.3, 
                type: "spring" as const, 
                stiffness: prefersReducedMotion ? 300 : 200 
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <FaTrophy className="w-3 h-3 text-black" />
              <span className="text-black font-bold text-xs uppercase tracking-wider">Featured</span>
            </motion.div>
          </div>
        )}
        
        {/* Image container with optimized loading */}
        <div className="relative h-64 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          )}
          
          {/* Screenshot, or a branded tile when there is none */}
          {!imageError ? (
            <img
              ref={imageRef}
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                willChange: 'transform'
              }}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-surface)]"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255, 160, 0, 0.18), transparent 60%), radial-gradient(circle at 80% 90%, rgba(245, 124, 0, 0.14), transparent 55%)' }}
              role="img"
              aria-label={title}
            >
              <span className="text-5xl font-black tracking-tight gradient-text">{getInitials(title)}</span>
              <span className="emboss-meta">{category}</span>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {/* Content section */}
        <div className="p-6">
          {/* Category and type */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="recessed pill px-3 py-1 emboss-meta text-[var(--accent-primary)]">
              {category}
            </span>
            {type.toLowerCase() !== category.toLowerCase() && (
              <span className="recessed pill px-3 py-1 emboss-meta">
                {type}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-black tracking-tight text-[var(--primary-text)] mb-3 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 line-clamp-3">
            {truncatedDescription}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={`${index}-tag-${tagIndex}`}
                className="recessed pill px-3 py-1 emboss-meta"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-1 text-xs text-[var(--color-text-secondary)]">
                +{tags.length - 4} more
              </span>
            )}
          </div>
          
          {/* Details link */}
          <motion.div 
            whileHover={prefersReducedMotion ? {} : { x: 5 }}
            className="inline-flex items-center gap-1 text-[var(--primary-amber)] text-sm font-medium"
          >
            <span>View Details</span>
            <FaArrowRight className="w-3 h-3" />
          </motion.div>
          
          {/* Links */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
            {demoLink && demoLink !== '#' && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="lifted-primary pill flex-1 px-4 py-2 text-xs uppercase tracking-widest font-black text-center no-underline"
              >
                <FaBolt className="inline w-3 h-3 mr-1" />
                Live Site
              </a>
            )}

            {codeLink && codeLink !== '#' && (
              <a
                href={codeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="lifted pill flex-1 px-4 py-2 text-xs uppercase tracking-widest font-black text-center no-underline"
              >
                <FaGithub className="inline w-3 h-3 mr-1" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
      
             {/* Custom styles for better performance */}
       <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.article>
    </>
  );
});

ProjectCard.displayName = 'ProjectCard';
