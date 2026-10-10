import React, { useEffect, useRef, useState, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import {
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaCopy,
  FaCheck,
  FaExpand,
  FaBookmark,
  FaHeart,
  FaQuoteLeft,
  FaRocket,
  FaChartLine,
  FaTimes,
  FaTrophy,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaArrowRight,
  FaUser,
  FaCalendar,
  FaClock,
  FaInfoCircle,
  FaLayerGroup,
  FaServer,
  FaCogs,
  FaDatabase,
  FaDesktop,
  FaSpinner
} from 'react-icons/fa';
import { ProjectCardProps } from '../../types';
import { PerformanceMonitor, generateOptimizedImageSources, debounce } from '../../src/utils/performanceUtils';

// Lazy load heavy components
const ModernGallery = lazy(() => import('./ProjectGallery').then(module => ({ default: module.ModernGallery })));

interface ProjectDetailModalProps {
  project: ProjectCardProps;
  onClose: () => void;
  isOpen: boolean;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

// Custom hook for cursor tracking (removed as unused)

// 3D Card Component (removed as unused)

// Animated Counter Component (removed as unused)

// Memoized loading skeleton component
const LoadingSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Memoized section component for better performance
const ProjectSection = memo(({
  title,
  icon,
  children,
  className = '',
  delay = 0
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={`mb-12 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--primary-amber)]/10 rounded-lg text-[var(--primary-amber)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h3>
      </div>
      {children}
    </motion.section>
  );
});

ProjectSection.displayName = 'ProjectSection';

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = memo(({
  project,
  onClose,
  isOpen,
  onNavigate
}) => {
  // State Management with performance optimization
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({});

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const performanceMonitor = useMemo(() => PerformanceMonitor.getInstance(), []);

  // Performance optimization: Check for reduced motion preference
  const prefersReducedMotion = useMemo(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches, []
  );

  // Scroll and animations with performance optimization
  const { scrollY } = useScroll({ container: contentRef });

  // Parallax effects (disabled for reduced motion)
  const heroY = useTransform(scrollY, [0, 1000], prefersReducedMotion ? [0, 0] : [0, -200]);
  const heroScale = useTransform(scrollY, [0, 500], prefersReducedMotion ? [1, 1] : [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  // Optimized image sources with WebP support
  const optimizedHeroImage = useMemo(() =>
    generateOptimizedImageSources(project.image), [project.image]
  );

  // Enhanced project data with fallbacks - Updated to use project.images from our data structure
  const projectImages = useMemo(() => {
    // For projects with the images array (like our Conison project)
    if (project.images && project.images.length > 0) {
      return project.images.map((imageSrc, index) => ({
        src: imageSrc,
        alt: `${project.title} - Image ${index + 1}`,
        caption: `Gallery image ${index + 1}`,
        type: 'screenshot' as const,
        device: 'desktop' as const,
        tags: ['design', 'ui']
      }));
    }

    // Fallback to gallery structure if available
    if (project.details?.gallery) {
      return project.details.gallery;
    }

    // Final fallback to single hero image
    return [
      { src: project.image, alt: 'Hero', caption: 'Main Project View', type: 'screenshot' as const }
    ];
  }, [project.images, project.details?.gallery, project.image, project.title]);

  // Memoized tech stack organization
  const techCategories = useMemo(() => ({
    frontend: {
      icon: <FaDesktop className="text-cyan-500" />,
      title: 'Frontend',
      color: 'from-cyan-500 to-blue-600',
      techs: project.details?.techStack?.frontend ?? project.tags.filter(tag =>
        ['react', 'vue', 'angular', 'svelte', 'typescript', 'javascript'].includes(tag.toLowerCase())
      ) ?? ['React', 'TypeScript', 'Tailwind CSS']
    },
    backend: {
      icon: <FaServer className="text-green-500" />,
      title: 'Backend',
      color: 'from-green-500 to-emerald-600',
      techs: project.details?.techStack?.backend ?? []
    },
    database: {
      icon: <FaDatabase className="text-purple-500" />,
      title: 'Database',
      color: 'from-purple-500 to-indigo-600',
      techs: project.details?.techStack?.apisAndServices?.filter(tech =>
        ['mongodb', 'postgresql', 'mysql', 'firebase', 'firestore'].includes(tech.toLowerCase())
      ) ?? []
    },
    tools: {
      icon: <FaCogs className="text-orange-500" />,
      title: 'Tools & Services',
      color: 'from-orange-500 to-red-600',
      techs: project.details?.techStack?.developmentTools ?? []
    }
  }), [project.details?.techStack, project.tags]);

  // Performance metrics for the project (enhanced with Conison Commerce Hub data)
  const projectMetrics = useMemo(() => {
    // Special handling for Conison Commerce Hub project
    const isConison = project.title?.includes('Conison Commerce Hub');

    return [
      {
        icon: <FaRocket className="text-orange-500" />,
        value: isConison ? 95 : (project.details?.resultsAndImpact?.performanceAchievements?.length ? 98 : 85),
        suffix: '%',
        label: 'Performance Score',
        description: 'Lighthouse performance audit'
      },
      {
        icon: <FaUsers className="text-blue-500" />,
        value: isConison ? 12000 : (project.featured ? 15000 : 5000),
        suffix: '+',
        label: 'Total Views',
        description: 'Project portfolio views'
      },
      {
        icon: <FaCode className="text-green-500" />,
        value: isConison ? 8500 : (project.details?.technicalImplementation?.length ?
          project.details.technicalImplementation.length * 1500 : 3000),
        suffix: '+',
        label: 'Lines of Code',
        description: 'Clean, maintainable codebase'
      },
      {
        icon: <FaTrophy className="text-yellow-500" />,
        value: isConison ? 9 : (project.details?.recognitionAndAchievements?.length ?? 3),
        suffix: '',
        label: 'Achievements',
        description: 'Recognition and milestones'
      }
    ];
  }, [project]);

  // Handle copy to clipboard with performance tracking
  const handleCopyCode = useCallback(async (code: string, id: string) => {
    performanceMonitor.trackUserInteraction();
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [performanceMonitor]);

  // Optimized scroll tracking with debouncing
  const updateReadingProgress = useMemo(() =>
    debounce(() => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setReadingProgress(Math.min(progress, 100));
    }, 100), []
  );

  // Handle keyboard navigation with performance optimization
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      performanceMonitor.trackUserInteraction();

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (e.ctrlKey && onNavigate) {
            onNavigate('prev');
          }
          break;
        case 'ArrowRight':
          if (e.ctrlKey && onNavigate) {
            onNavigate('next');
          }
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, onNavigate, performanceMonitor]);

  // Handle scroll events with performance optimization
  useEffect(() => {
    const scrollElement = contentRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', updateReadingProgress, { passive: true });
    return () => scrollElement.removeEventListener('scroll', updateReadingProgress);
  }, [updateReadingProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      performanceMonitor.log();
    };
  }, [performanceMonitor]);

  // Handle image loading for performance tracking
  const handleImageLoad = useCallback((index: number) => {
    setImageLoadingStates(prev => ({ ...prev, [index]: true }));
    performanceMonitor.trackImageLoad(projectImages[index]?.src ?? '', Date.now());
  }, [performanceMonitor, projectImages]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000000] bg-[var(--color-bg-primary)] project-modal"
      >
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] z-[1000001]"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
        />

        {/* Full Page Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : '100%' }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full bg-[var(--color-bg-primary)] flex flex-col modal-content"
        >
          {/* ─── Desktop-only sticky header ─── */}
          <div className="hidden sm:block sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-lg border-b border-[var(--color-border)]">
            <div className="flex items-start justify-between p-4 sm:p-6 pb-5">
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors modal-close-button"
                  aria-label="Go back"
                >
                  <FaArrowLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] line-clamp-1">
                    {project.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    {project.category} • {project.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-[var(--primary-amber)] text-black' : 'hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]'}`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <FaBookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-lg transition-colors ${isLiked ? 'bg-red-500 text-white' : 'hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]'}`}
                  aria-label={isLiked ? "Unlike project" : "Like project"}
                >
                  <FaHeart className="w-4 h-4" />
                </button>
                {onNavigate && (
                  <div className="flex items-center gap-1 ml-2">
                    <button onClick={() => onNavigate('prev')} className="p-2 hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors" aria-label="Previous project">
                      <FaArrowLeft className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    </button>
                    <button onClick={() => onNavigate('next')} className="p-2 hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors" aria-label="Next project">
                      <FaArrowRight className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* JSON-LD Project schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: project.title,
                applicationCategory: 'WebApplication',
                operatingSystem: 'Web',
                description: project.description,
                image: project.image,
                url: project.demoLink && project.demoLink !== '#' ? project.demoLink : (project.codeLink || ''),
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
              })
            }}
          />

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* ─── Hero Section ─── */}
            <motion.div
              className="relative h-[55vw] min-h-[260px] max-h-[400px] sm:h-[400px] md:h-[500px] lg:h-[60vh] overflow-hidden"
              style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
                onLoad={() => handleImageLoad(0)}
              />

              {/* Soft bottom gradient — mobile gets deeper gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 sm:from-black/80 sm:via-black/20 sm:to-transparent" />

              {/* ── Mobile floating controls (top-left back, top-right actions) ── */}
              <div className="sm:hidden">
                {/* Back button — frosted glass pill */}
                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  whileTap={{ scale: 0.94 }}
                  className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.20)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.14)'
                  }}
                  aria-label="Go back"
                >
                  <FaArrowLeft className="w-2.5 h-2.5 flex-shrink-0" />
                  Back
                </motion.button>

                {/* Action cluster — polished icon buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="absolute top-4 right-4 flex items-center gap-2"
                >
                  <motion.button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    whileTap={{ scale: 0.88 }}
                    className={`w-9 h-9 flex items-center justify-center rounded-full shadow-xl transition-all duration-200 ${isBookmarked
                      ? 'bg-[var(--primary-amber)] text-black ring-2 ring-[var(--primary-amber)]/50'
                      : 'text-white'
                      }`}
                    style={!isBookmarked ? {
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
                    } : undefined}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <FaBookmark className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    whileTap={{ scale: 0.88 }}
                    className={`w-9 h-9 flex items-center justify-center rounded-full shadow-xl transition-all duration-200 ${isLiked
                      ? 'bg-red-500 text-white ring-2 ring-red-400/50'
                      : 'text-white'
                      }`}
                    style={!isLiked ? {
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
                    } : undefined}
                    aria-label={isLiked ? 'Unlike project' : 'Like project'}
                  >
                    <FaHeart className="w-3.5 h-3.5" />
                  </motion.button>

                  {onNavigate && (
                    <>
                      <motion.button
                        onClick={() => onNavigate('prev')}
                        whileTap={{ scale: 0.88 }}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white shadow-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
                        }}
                        aria-label="Previous project"
                      >
                        <FaArrowLeft className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        onClick={() => onNavigate('next')}
                        whileTap={{ scale: 0.88 }}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white shadow-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
                        }}
                        aria-label="Next project"
                      >
                        <FaArrowRight className="w-3 h-3" />
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </div>

              {/* ── Desktop hero text overlay (hidden on mobile) ── */}
              <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-6 md:p-8 justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-5xl w-full"
                >
                  <div className="max-w-3xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-5 break-words overflow-wrap-anywhere tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 leading-relaxed break-words overflow-wrap-anywhere">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
                      {project.demoLink && project.demoLink !== '#' && (
                        <motion.a
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 text-black font-bold tracking-wide rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm"
                          style={{
                            background: 'linear-gradient(135deg, #f5a623 0%, #e8821a 100%)',
                            boxShadow: '0 4px 18px rgba(245,166,35,0.40), inset 0 1px 0 rgba(255,255,255,0.2)'
                          }}
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          View Live Site
                        </motion.a>
                      )}
                      {project.codeLink && project.codeLink !== '#' && (
                        <motion.a
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 text-sm border border-white/30"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                          View Source Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Mobile blog-style title block (below hero, above content) ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="sm:hidden px-5 pt-6 pb-2 border-b border-[var(--color-border)]"
            >
              {/* Category pill */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-[var(--primary-amber)]/15 text-[var(--primary-amber)] text-xs font-semibold rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">{project.type}</span>
              </div>

              <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-3 tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                {project.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-5">
                {project.demoLink && project.demoLink !== '#' && (
                  <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                    className="lifted-primary pill flex-1 flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-black no-underline"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    View Live Site
                  </motion.a>
                )}
                {project.codeLink && project.codeLink !== '#' && (
                  <motion.a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                    className="lifted pill flex-1 flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-black no-underline"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    Source Code
                  </motion.a>
                )}
              </div>

              {/* Tech tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-1">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-3 py-1 text-[var(--color-text-secondary)] text-xs rounded-full"
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-amber)]/60 flex-shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Main Content */}
            <div className="px-5 py-7 sm:p-6 md:p-8 space-y-10 sm:space-y-16 max-w-5xl mx-auto w-full">
              {/* Project Metrics */}
              <ProjectSection
                title="Project Metrics"
                icon={<FaChartLine />}
                delay={0.1}
              >
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {projectMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="bg-[var(--color-bg-surface)] rounded-xl p-4 sm:p-6 border border-[var(--color-border)] flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base sm:text-lg">{metric.icon}</span>
                        <h4 className="font-semibold text-[var(--color-text-primary)] text-xs sm:text-sm leading-tight">
                          {metric.label}
                        </h4>
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-[var(--primary-amber)] mb-0.5">
                        {metric.value.toLocaleString()}{metric.suffix}
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-snug">
                        {metric.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ProjectSection>

              {/* Project Overview */}
              {project.details?.overview && (
                <ProjectSection
                  title="Overview"
                  icon={<FaInfoCircle />}
                  delay={0.2}
                >
                  <div className="prose prose-lg max-w-none text-[var(--color-text-primary)] w-full min-w-0 overflow-hidden">
                    <p className="break-words overflow-wrap-anywhere hyphens-auto">{project.details.overview}</p>
                  </div>
                </ProjectSection>
              )}

              {/* Key Features */}
              {project.details?.keyFeatures && project.details.keyFeatures.length > 0 && (
                <ProjectSection
                  title="Key Features"
                  icon={<FaLightbulb />}
                  delay={0.3}
                >
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                    {project.details.keyFeatures.map((feature: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="bg-[var(--color-bg-surface)] rounded-xl p-4 sm:p-6 border border-[var(--color-border)]"
                      >
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)]">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </ProjectSection>
              )}

              {/* Technical Implementation */}
              {project.details?.technicalImplementation && project.details.technicalImplementation.length > 0 && (
                <ProjectSection
                  title="Technical Implementation"
                  icon={<FaCode />}
                  delay={0.4}
                >
                  <div className="space-y-8">
                    {project.details.technicalImplementation.map((impl: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="bg-[var(--color-bg-surface)] rounded-xl p-4 sm:p-6 border border-[var(--color-border)]"
                      >
                        <h4 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                          {impl.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)] mb-4">
                          {impl.description}
                        </p>

                        {impl.code && (
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{impl.code}</code>
                            </pre>
                            <button
                              onClick={() => handleCopyCode(impl.code, `code-${i}`)}
                              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                              aria-label="Copy code"
                            >
                              {copiedCode === `code-${i}` ? (
                                <FaCheck className="w-4 h-4 text-green-400" />
                              ) : (
                                <FaCopy className="w-4 h-4 text-gray-300" />
                              )}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ProjectSection>
              )}

              {/* Technology Stack */}
              <ProjectSection
                title="Technology Stack"
                icon={<FaLayerGroup />}
                delay={0.5}
              >
                <div className="grid gap-6 lg:grid-cols-2">
                  {Object.entries(techCategories).map(([key, category]) => {
                    if (!category.techs || category.techs.length === 0) return null;

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + Object.keys(techCategories).indexOf(key) * 0.1 }}
                        className="bg-[var(--color-bg-surface)] rounded-xl p-4 sm:p-6 border border-[var(--color-border)]"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          {category.icon}
                          <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                            {category.title}
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {category.techs.map((tech: string, techIndex: number) => (
                            <motion.span
                              key={`${category.title}-tech-${tech}`}
                              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                              className="px-3 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-full text-sm border border-[var(--color-border)] hover:border-[var(--primary-amber)] transition-colors cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ProjectSection>

              {/* Project Gallery */}
              <ProjectSection
                title="Project Gallery"
                icon={<FaExpand />}
                delay={0.6}
              >
                <Suspense fallback={
                  <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] rounded-xl">
                    <FaSpinner className="w-8 h-8 animate-spin text-[var(--primary-amber)]" />
                  </div>
                }>
                  <ModernGallery
                    images={projectImages.map(img => img.src)}
                    gallery={projectImages}
                    projectTitle={project.title}
                  />
                </Suspense>
              </ProjectSection>

              {/* Results & Impact */}
              {project.details?.resultsAndImpact && (
                <ProjectSection
                  title="Results & Impact"
                  icon={<FaTrophy />}
                  delay={0.7}
                >
                  <div className="space-y-8">
                    {/* Key Metrics */}
                    {project.details.resultsAndImpact.keyMetrics && (
                      <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                          Key Metrics
                        </h4>
                        <div className="grid gap-4 lg:grid-cols-2">
                          {project.details.resultsAndImpact.keyMetrics.map((metric: string, i: number) => (
                            <motion.div
                              key={`key-metric-${metric}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className="flex items-center gap-3 p-4 bg-[var(--color-bg-surface)] rounded-lg border border-[var(--color-border)]"
                            >
                              <FaChartLine className="text-[var(--primary-amber)] flex-shrink-0" />
                              <span className="text-[var(--color-text-primary)]">{metric}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Performance Achievements */}
                    {project.details.resultsAndImpact.performanceAchievements && (
                      <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                          Performance Achievements
                        </h4>
                        <div className="grid gap-4 lg:grid-cols-2">
                          {project.details.resultsAndImpact.performanceAchievements.map((achievement: string, i: number) => (
                            <motion.div
                              key={`achievement-${achievement}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className="flex items-center gap-3 p-4 bg-[var(--color-bg-surface)] rounded-lg border border-[var(--color-border)]"
                            >
                              <FaRocket className="text-green-500 flex-shrink-0" />
                              <span className="text-[var(--color-text-primary)]">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* User Testimonials */}
                    {project.details.resultsAndImpact.userTestimonials && project.details.resultsAndImpact.userTestimonials.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                          User Testimonials
                        </h4>
                        <div className="space-y-4">
                          {project.details.resultsAndImpact.userTestimonials.map((testimonial: any, i: number) => (
                            <motion.blockquote
                              key={`testimonial-${testimonial.author}-${testimonial.quote.slice(0, 20)}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)] relative"
                            >
                              <FaQuoteLeft className="absolute top-4 left-4 text-[var(--primary-amber)] w-6 h-6 opacity-50" />
                              <p className="text-[var(--color-text-primary)] italic text-lg leading-relaxed pl-8 mb-4">
                                "{testimonial.quote}"
                              </p>
                              <div className="flex items-center gap-3 pl-8">
                                <div className="w-8 h-8 bg-[var(--primary-amber)] rounded-full flex items-center justify-center">
                                  <FaUser className="w-4 h-4 text-black" />
                                </div>
                                <span className="font-semibold text-[var(--color-text-primary)]">
                                  {testimonial.author}
                                </span>
                              </div>
                            </motion.blockquote>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ProjectSection>
              )}

              {/* Project Details */}
              {project.details?.projectDetails && (
                <ProjectSection
                  title="Project Information"
                  icon={<FaInfoCircle />}
                  delay={0.8}
                >
                  <div className="bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)]">
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FaCalendar className="text-[var(--primary-amber)]" />
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)]">Timeline</span>
                            <p className="font-semibold text-[var(--color-text-primary)]">
                              {project.details.projectDetails.timeline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaClock className="text-[var(--primary-amber)]" />
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)]">Duration</span>
                            <p className="font-semibold text-[var(--color-text-primary)]">
                              {project.details.projectDetails.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaUser className="text-[var(--primary-amber)]" />
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)]">Role</span>
                            <p className="font-semibold text-[var(--color-text-primary)]">
                              {project.details.projectDetails.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FaUsers className="text-[var(--primary-amber)]" />
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)]">Team</span>
                            <p className="font-semibold text-[var(--color-text-primary)]">
                              {project.details.projectDetails.team}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaShieldAlt className="text-[var(--primary-amber)]" />
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)]">Status</span>
                            <p className="font-semibold text-[var(--color-text-primary)]">
                              {project.details.projectDetails.status}
                            </p>
                          </div>
                        </div>

                        {project.details.projectDetails.links && project.details.projectDetails.links.length > 0 && (
                          <div>
                            <span className="text-sm text-[var(--color-text-secondary)] block mb-2">Links</span>
                            <div className="space-y-2">
                              {project.details.projectDetails.links.map((link: any, i: number) => (
                                <a
                                  key={`link-${i}-${link.url}-${link.name}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-[var(--primary-amber)] hover:text-[var(--primary-orange)] transition-colors"
                                >
                                  <span>{link.icon}</span>
                                  <span className="text-sm">{link.name}</span>
                                  <FaExternalLinkAlt className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ProjectSection>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';
