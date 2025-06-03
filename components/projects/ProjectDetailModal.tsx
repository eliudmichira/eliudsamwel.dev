import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ProjectCardProps } from '../../types';
import { getOptimalImageSources } from '../../src/utils/imageUtils';
import { 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCalendar,
  FaClock,
  FaUser,
  FaTools,
  FaLightbulb,
  FaCheckCircle,
  FaCode,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaCopy,
  FaCheck,
  FaExpand,
  FaShare,
  FaBookmark,
  FaHeart,
  FaEye,
  FaQuoteLeft,
  FaRocket,
  FaCog,
  FaChartLine,
  FaTimes
} from 'react-icons/fa';

interface ProjectDetailModalProps {
  project: ProjectCardProps;
  onClose: () => void;
  isOpen: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  onClose, 
  isOpen 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  
  // Use project gallery images if available, otherwise default to mock images
  const projectImages = project.details?.gallery 
    ? project.details.gallery.map(item => item.src)
    : [
        project.image,
        'https://placehold.co/1200x800/1a1a1a/cccccc?text=Desktop+View',
        'https://placehold.co/1200x800/1a1a1a/cccccc?text=Mobile+View',
        'https://placehold.co/1200x800/1a1a1a/cccccc?text=Dashboard',
        'https://placehold.co/1200x800/1a1a1a/cccccc?text=Features',
      ];
  
  // Use project details if available, otherwise use defaults
  const projectDetails = {
    duration: project.details?.projectDetails?.duration || '3 months',
    role: project.details?.projectDetails?.role || 'Full Stack Developer',
    year: project.details?.projectDetails?.timeline || '2024',
    status: project.details?.projectDetails?.status || 'Completed',
    team: project.details?.projectDetails?.team || '4 developers',
        views: 1234,
        likes: 89
      };
  
  // Use project key features if available, otherwise use defaults
  const features = project.details?.keyFeatures 
    ? project.details.keyFeatures.map(feature => ({
        icon: <FaCheckCircle />,
        title: feature.title,
        description: feature.description
      }))
    : [
        {
          icon: <FaCheckCircle />,
          title: 'Secure Authentication',
          description: 'JWT-based authentication system with role-based access control'
        },
        {
          icon: <FaChartLine />,
          title: 'Real-time Analytics',
          description: 'Live data visualization using WebSocket connections and D3.js'
        },
        {
          icon: <FaRocket />,
          title: 'High Performance',
          description: 'Optimized for speed with lazy loading and code splitting'
        },
        {
          icon: <FaCog />,
          title: 'Scalable Architecture',
          description: 'Microservices architecture designed to handle growth'
        }
      ];
  
  // Use project tech stack if available, otherwise use defaults
  const techStack = {
    frontend: project.details?.techStack?.frontend || ['React', 'TypeScript', 'Tailwind CSS'],
    backend: project.details?.techStack?.backend || ['Node.js', 'Express'],
    tools: project.details?.techStack?.developmentTools || ['Git', 'npm'],
    apis: project.details?.techStack?.apisAndServices || []
      };
  
  // Track scroll position for reading progress
  useEffect(() => {
    if (!contentRef.current) return;
    
    const updateReadingProgress = () => {
      const element = contentRef.current;
      if (!element) return;
          
      const windowHeight = window.innerHeight;
      const documentHeight = element.scrollHeight;
      const scrollTop = window.scrollY;
      
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, [contentRef]);
  
  // Set focus on the close button when modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
          onClose();
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // Handle code copy
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  
  // Handle image navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
          ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[var(--primary-bg)] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
      >
          {/* Skip to content for accessibility */}
          <a 
            href="#project-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[var(--primary-bg)] focus:text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-amber)]"
          >
            Skip to project content
          </a>
          
          {/* Reading Progress Bar */}
          <div 
            className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] z-50 origin-left"
            style={{ transform: `scaleX(${readingProgress / 100})` }}
          />
        
          {/* Header with Back Button */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <motion.button
                  ref={closeButtonRef}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                  className="flex items-center gap-2.5 text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-amber)]"
                  aria-label="Close project details and return to projects list"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Projects</span>
              </motion.button>
              
                {/* Social Actions */}
                <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isLiked 
                        ? 'bg-red-500/20 text-red-500 border border-red-500' 
                        : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] hover:text-[var(--primary-amber)]'
                  }`}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label={isLiked ? "Unlike this project" : "Like this project"}
                >
                    <FaHeart className="w-4 h-4" />
                </motion.button>
                  
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isBookmarked 
                        ? 'bg-[var(--primary-amber)]/20 text-[var(--primary-amber)] border border-[var(--primary-amber)]' 
                        : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] hover:text-[var(--primary-amber)]'
                  }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this project"}
                >
                    <FaBookmark className="w-4 h-4" />
                </motion.button>
                  
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] flex items-center justify-center hover:text-[var(--primary-amber)] transition-colors"
                    aria-label="Share this project"
                >
                    <FaShare className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>
        
        <div ref={contentRef} className="pt-20">
          {/* Hero Section */}
          <motion.section
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
                <img
                  src={project.image}
                  alt={`${project.title} - Hero image showing project overview for ${project.category} ${project.type} project`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
            </motion.div>
              <div className="absolute inset-0 blog-hero-gradient" />
            
              <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">
              <div className="max-w-7xl mx-auto">
                  {/* Category & Type */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-3 mb-6"
                >
                    <span className="px-4 py-1.5 rounded-full bg-[var(--primary-amber)]/20 backdrop-blur-md text-[var(--primary-amber)] text-sm font-medium border border-[var(--primary-amber)]/30">
                    {project.category}
                  </span>
                    <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-sm font-medium">
                    {project.type}
                  </span>
                    {project.featured && (
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black text-sm font-medium">
                        Featured Project
                      </span>
                    )}
                </motion.div>
                
                  {/* Project Title */}
                <motion.h1
                    id="project-title"
                    className="blog-title-large text-white mb-8"
                    initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                  {project.title}
                </motion.h1>
                
                  {/* Project Links */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--primary-amber)] focus:ring-offset-2"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  </motion.div>
              </div>
            </div>
          </motion.section>
          
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Main Content - Left Column */}
                <div id="project-content" className="lg:col-span-2 space-y-16">
                {/* Project Overview */}
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                    className="prose prose-lg max-w-none"
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-text)] mb-8 flex items-center gap-3">
                    <FaLightbulb className="text-[var(--primary-amber)]" />
                    Project Overview
                  </h2>
                    <div className="text-[var(--secondary-text)] space-y-5 leading-relaxed">
                    <p>
                        {project.description}
                    </p>
                    <p>
                      Throughout the development process, we focused on three key areas: 
                      performance optimization, user experience, and security. Each decision 
                      was carefully considered to ensure the final product exceeded expectations 
                      while maintaining clean, maintainable code.
                    </p>
                  </div>
                </motion.section>
                
                {/* Key Features */}
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-text)] mb-8">
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div 
                        key={index}
                          className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-surface)] rounded-lg"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-[var(--primary-amber)] p-2 rounded-full bg-[var(--primary-amber)]/10">
                          {feature.icon}
                        </div>
                            <h3 className="text-xl font-bold text-[var(--primary-text)]">
                          {feature.title}
                        </h3>
                          </div>
                          <p className="text-[var(--secondary-text)] text-sm leading-relaxed">
                          {feature.description}
                        </p>
                  </div>
                    ))}
                  </div>
                </motion.section>
                
                  {/* Technology Stack */}
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <h2 className="text-3xl font-bold text-[var(--primary-text)] mb-8 flex items-center gap-3">
                      <FaTools className="text-[var(--primary-amber)]" />
                      Technology Stack
                  </h2>
                    <div className="grid sm:grid-cols-2 gap-10">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-text)] mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--primary-amber)]"></span>
                          Frontend
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {techStack.frontend.map((tech, index) => (
                            <span 
                        key={index}
                              className="px-3.5 py-1.5 rounded-md bg-[var(--color-bg-muted)] text-[var(--secondary-text)] text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                            </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-text)] mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--primary-amber)]"></span>
                          Backend
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {techStack.backend.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3.5 py-1.5 rounded-md bg-[var(--color-bg-muted)] text-[var(--secondary-text)] text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-text)] mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--primary-amber)]"></span>
                          Tools & Infrastructure
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {techStack.tools.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3.5 py-1.5 rounded-md bg-[var(--color-bg-muted)] text-[var(--secondary-text)] text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      {techStack.apis.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--primary-text)] mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--primary-amber)]"></span>
                            APIs & Services
                          </h3>
                          <div className="flex flex-wrap gap-2.5">
                            {techStack.apis.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-3.5 py-1.5 rounded-md bg-[var(--color-bg-muted)] text-[var(--secondary-text)] text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.section>
                
                  {/* Project Gallery */}
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-text)] mb-8 flex items-center gap-3">
                      <FaImage className="text-[var(--primary-amber)]" />
                      Project Gallery
                  </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                      {projectImages.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video relative rounded-lg overflow-hidden border border-[var(--color-border)] cursor-pointer"
                          onClick={() => {
                            setActiveImageIndex(index);
                            setShowLightbox(true);
                          }}
                        >
                          <img
                            src={image}
                            alt={`Project screenshot ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <FaExpand className="text-white w-6 h-6" />
                          </div>
                    </div>
                      ))}
                  </div>
                </motion.section>
                
                  {/* Results Section */}
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-text)] mb-8">
                    Results & Impact
                  </h2>
                    <div className="grid sm:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-8 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg">
                        <div className="text-4xl font-bold text-[var(--primary-amber)] mb-3">
                        300%
                      </div>
                      <div className="text-[var(--secondary-text)]">
                        Performance Improvement
                      </div>
                    </div>
                      <div className="text-center p-8 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg">
                        <div className="text-4xl font-bold text-[var(--primary-amber)] mb-3">
                        50K+
                      </div>
                      <div className="text-[var(--secondary-text)]">
                        Active Users
                      </div>
                    </div>
                      <div className="text-center p-8 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg">
                        <div className="text-4xl font-bold text-[var(--primary-amber)] mb-3">
                        99.9%
                      </div>
                      <div className="text-[var(--secondary-text)]">
                        Uptime
                      </div>
                    </div>
                  </div>
                    
                    {/* Testimonial */}
                    <div className="p-8 border border-[var(--color-border)] bg-[var(--color-bg-muted)] rounded-lg">
                      <div className="flex items-start">
                        <FaQuoteLeft className="text-[var(--primary-amber)] w-10 h-10 opacity-50 flex-shrink-0 mr-6" />
                        <div>
                          <p className="text-[var(--secondary-text)] italic mb-5 text-lg">
                            "This project stands out for its exceptional attention to detail, performance optimization, and intuitive user experience. The implementation exceeded our expectations and has significantly improved our operational efficiency."
                    </p>
                          <div className="font-medium text-[var(--primary-text)]">
                            Project Stakeholder
                          </div>
                        </div>
                      </div>
                    </div>
                </motion.section>
              </div>
              
              {/* Sidebar - Right Column */}
              <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-10">
                  {/* Project Info Card */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                      className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold text-[var(--primary-text)] mb-6">
                      Project Details
                    </h3>
                      <div className="space-y-5">
                      <div className="flex items-center justify-between">
                          <span className="text-[var(--secondary-text)] flex items-center gap-2.5">
                          <FaCalendar className="w-4 h-4" />
                          Year
                        </span>
                        <span className="text-[var(--primary-text)] font-medium">
                          {projectDetails.year}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-[var(--secondary-text)] flex items-center gap-2.5">
                          <FaClock className="w-4 h-4" />
                          Duration
                        </span>
                        <span className="text-[var(--primary-text)] font-medium">
                          {projectDetails.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-[var(--secondary-text)] flex items-center gap-2.5">
                          <FaUser className="w-4 h-4" />
                          Role
                        </span>
                        <span className="text-[var(--primary-text)] font-medium">
                          {projectDetails.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-[var(--secondary-text)] flex items-center gap-2.5">
                          <FaEye className="w-4 h-4" />
                          Views
                        </span>
                        <span className="text-[var(--primary-text)] font-medium">
                          {projectDetails.views.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-[var(--secondary-text)] flex items-center gap-2.5">
                          <FaHeart className="w-4 h-4" />
                          Likes
                        </span>
                        <span className="text-[var(--primary-text)] font-medium">
                          {projectDetails.likes}
                        </span>
                      </div>
                    </div>
                    </motion.div>
                    
                    {/* Tags */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold text-[var(--primary-text)] mb-5">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3.5 py-1.5 rounded-md bg-[var(--primary-amber)]/10 text-[var(--primary-amber)] text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Project Actions */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-4"
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black font-medium hover:opacity-90 transition-opacity"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        <span>View Live Demo</span>
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-lg border border-[var(--color-border)] text-[var(--primary-text)] bg-[var(--color-bg-surface)] hover:border-[var(--primary-amber)] transition-colors"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>View Source Code</span>
                      </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          {/* Image Lightbox */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setShowLightbox(false)}
            >
                <button
                  className="absolute top-6 right-6 text-white/70 hover:text-white z-[70]"
                  onClick={() => setShowLightbox(false)}
                >
                  <FaTimes className="w-7 h-7" />
                </button>
                
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center z-[70] hover:bg-black/70 transition-colors"
                  onClick={handlePrevImage}
              >
                  <FaChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center z-[70] hover:bg-black/70 transition-colors"
                  onClick={handleNextImage}
              >
                  <FaChevronRight className="w-5 h-5" />
              </button>
                
                <div className="relative max-w-full max-h-full">
                  <img
                    src={projectImages[activeImageIndex]}
                    alt={`Project image ${activeImageIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white text-center">
                    Image {activeImageIndex + 1} of {projectImages.length}
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      )}
    </AnimatePresence>
  );
};