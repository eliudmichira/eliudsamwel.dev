import React, { useState, useCallback, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import {
  FaImage,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaShare,
  FaHeart,
  FaPlay,
  FaPause,
  FaTh,
  FaThLarge,
  FaList,
  FaSearch,
  FaPalette,
  FaCode,
  FaDesktop,
  FaMobile,
  FaTabletAlt,
  FaArrowsAlt,
  FaCompress,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo,
  FaInfo
} from 'react-icons/fa';

interface GalleryImageData {
  src: string;
  alt: string;
  caption?: string;
  type?: 'screenshot' | 'demo' | 'code' | 'feature' | 'ui' | 'mobile';
  tags?: string[];
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  device?: 'desktop' | 'mobile' | 'tablet';
  width?: number;
  height?: number;
  priority?: boolean;
}

interface ModernGalleryProps {
  images: string[];
  gallery?: GalleryImageData[];
  projectTitle: string;
  className?: string;
}

// Memoized image component for better performance
const GalleryImage = memo(({
  imageData,
  index,
  isVisible,
  onClick,
  onLoad,
  onError,
  hoveredIndex,
  onMouseEnter,
  onMouseLeave,
  likedImages,
  toggleLike,
  viewMode
}: {
  imageData: GalleryImageData;
  index: number;
  isVisible: boolean;
  onClick: () => void;
  onLoad: (index: number) => void;
  onError: (index: number) => void;
  hoveredIndex: number | null;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  likedImages: Set<number>;
  toggleLike: (index: number, e?: React.MouseEvent) => void;
  viewMode: 'grid' | 'masonry' | 'carousel';
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Performance optimization: Only load images when visible
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad(index);
  }, [index, onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onError(index);
  }, [index, onError]);

  // Optimized image sources with WebP support
  const optimizedSources = useMemo(() => {
    const webpSrc = imageData.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return {
      webp: webpSrc,
      fallback: imageData.src
    };
  }, [imageData.src]);

  const aspectRatioClass = useMemo(() => {
    switch (imageData.aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      default: return 'aspect-[16/9]';
    }
  }, [imageData.aspectRatio]);

  const gridColumnClass = useMemo(() => {
    if (viewMode !== 'masonry') return '';
    switch (imageData.aspectRatio) {
      case 'portrait': return 'col-span-1 row-span-2';
      case 'square': return 'col-span-1 row-span-1';
      default: return 'col-span-2 row-span-1';
    }
  }, [imageData.aspectRatio, viewMode]);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-[var(--color-bg-surface)] shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer ${gridColumnClass}`}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={imageData.alt}
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className={`${aspectRatioClass} bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
        </div>
      )}

      {/* Optimized image with WebP support */}
      {!imageError && isVisible ? (
        <picture>
          <motion.img
            ref={imageRef}
            src={imageData.src}
            alt={imageData.alt}
            className={`w-full ${aspectRatioClass} object-cover transition-transform duration-700`}
            loading={imageData.priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </picture>
      ) : imageError ? (
        // Error fallback
        <div className={`${aspectRatioClass} bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center`}>
          <div className="text-gray-400 text-center">
            <FaImage className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      ) : (
        // Placeholder for non-visible images
        <div className={`${aspectRatioClass} bg-gray-800`} />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Type badge */}
        <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-xs font-medium border border-white/20">
          {imageData.type || 'screenshot'}
        </div>

        {/* Device badge */}
        {imageData.device && (
          <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-xs font-medium border border-white/20 flex items-center gap-1">
            {imageData.device === 'mobile' && <FaMobile className="w-3 h-3" />}
            {imageData.device === 'tablet' && <FaTabletAlt className="w-3 h-3" />}
            {imageData.device === 'desktop' && <FaDesktop className="w-3 h-3" />}
            {imageData.device}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => toggleLike(index, e)}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors pointer-events-auto ${likedImages.has(index)
              ? 'bg-red-500/80 text-white'
              : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          aria-label={likedImages.has(index) ? "Unlike image" : "Like image"}
        >
          <FaHeart className="w-3 h-3" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors pointer-events-auto"
          aria-label="Expand image"
        >
          <FaExpand className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
          {imageData.caption || imageData.alt}
        </h4>
        {imageData.tags && imageData.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {imageData.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={`tag-${index}-${tagIndex}`}
                className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {imageData.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                +{imageData.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

GalleryImage.displayName = 'GalleryImage';

export const ModernGallery = memo(React.forwardRef<HTMLDivElement, ModernGalleryProps>(({
  images,
  gallery,
  projectTitle,
  className = ''
}, ref) => {
  // State management
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'carousel'>('masonry');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<'all' | 'desktop' | 'mobile' | 'tablet'>('all');
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxRotation, setLightboxRotation] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  // Refs
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance optimization: Check for reduced motion preference
  const prefersReducedMotion = useMemo(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches, []
  );

  // Gallery data processing with memoization
  const galleryData: GalleryImageData[] = useMemo(() =>
    images.map((image, index) => ({
      src: image,
      alt: gallery?.[index]?.alt || `${projectTitle} - Image ${index + 1}`,
      caption: gallery?.[index]?.caption || `Gallery image ${index + 1}`,
      type: gallery?.[index]?.type || 'screenshot',
      tags: gallery?.[index]?.tags || ['design', 'ui'],
      aspectRatio: gallery?.[index]?.aspectRatio || 'landscape',
      device: gallery?.[index]?.device || 'desktop',
      priority: index < 6 // Mark first 6 images as priority
    })), [images, gallery, projectTitle]
  );

  // Filter images based on search and filters with memoization
  const filteredImages = useMemo(() =>
    galleryData.filter(item => {
      const matchesFilter = filter === 'all' || item.type === filter;
      const matchesDevice = selectedDevice === 'all' || item.device === selectedDevice;
      const matchesSearch = !searchTerm ||
        item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesFilter && matchesDevice && matchesSearch;
    }), [galleryData, filter, selectedDevice, searchTerm]
  );

  // Get unique filters with memoization
  const availableFilters = useMemo(() =>
    ['all', ...new Set(galleryData.map(item => item.type))], [galleryData]
  );

  // Virtual scrolling for better performance
  useEffect(() => {
    const updateVisibleRange = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const itemHeight = 300; // Estimated item height
      const bufferSize = 5; // Number of items to render outside viewport

      const startIndex = Math.max(0, Math.floor(containerRect.top / itemHeight) - bufferSize);
      const endIndex = Math.min(
        filteredImages.length,
        Math.ceil((containerRect.bottom - containerRect.top) / itemHeight) + startIndex + bufferSize
      );

      setVisibleRange({ start: startIndex, end: endIndex });
    };

    const observer = new IntersectionObserver(updateVisibleRange, {
      root: null,
      rootMargin: '200px',
      threshold: 0
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', updateVisibleRange, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateVisibleRange);
    };
  }, [filteredImages.length]);

  // Handle image loading with performance tracking
  const handleImageLoad = useCallback((index: number) => {
    setImageLoadingStates(prev => ({ ...prev, [index]: true }));

    // Performance monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log(`Image ${index} loaded successfully`);
    }
  }, []);

  const handleImageError = useCallback((index: number) => {
    console.warn(`Failed to load image at index ${index}`);
  }, []);

  // Lightbox navigation with keyboard support
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setActiveImageIndex(prev => {
      const totalImages = filteredImages.length;
      if (direction === 'prev') {
        return prev === 0 ? totalImages - 1 : prev - 1;
      }
      return prev === totalImages - 1 ? 0 : prev + 1;
    });

    // Reset zoom and rotation
    setLightboxZoom(1);
    setLightboxRotation(0);
  }, [filteredImages.length]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;

      switch (e.key) {
        case 'Escape':
          setShowLightbox(false);
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setLightboxZoom(prev => Math.min(prev * 1.2, 5));
          break;
        case '-':
          e.preventDefault();
          setLightboxZoom(prev => Math.max(prev / 1.2, 0.5));
          break;
        case 'r':
          e.preventDefault();
          setLightboxRotation(prev => (prev + 90) % 360);
          break;
        case '0':
          e.preventDefault();
          setLightboxZoom(1);
          setLightboxRotation(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, isPlaying, navigateImage]);

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying || !showLightbox) return;

    const interval = setInterval(() => {
      navigateImage('next');
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, showLightbox, navigateImage]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Handle like/unlike with performance optimization
  const toggleLike = useCallback((index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Share image with error handling
  const shareImage = useCallback(async (image: GalleryImageData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: projectTitle,
          text: image.caption || image.alt,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  }, [projectTitle]);

  // Download image
  const downloadImage = useCallback(async (image: GalleryImageData) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectTitle}-${image.alt}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, [projectTitle]);

  // Optimized filter change handler
  const handleFilterChange = useCallback((filterType: string | undefined) => {
    setFilter(filterType || 'all');
    setVisibleRange({ start: 0, end: 20 }); // Reset visible range
  }, []);

  // Optimized device filter change
  const handleDeviceFilterChange = useCallback((deviceType: 'all' | 'desktop' | 'mobile' | 'tablet') => {
    setSelectedDevice(deviceType);
    setVisibleRange({ start: 0, end: 20 }); // Reset visible range
  }, []);

  return (
    <div className={`modern-gallery ${className}`} ref={ref || containerRef}>
      {/* Gallery Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-6 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border)]">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)] w-4 h-4" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-amber)] focus:border-transparent w-48"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === filterType
                    ? 'bg-[var(--primary-amber)] text-black'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                  }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFilterChange(filterType);
                  }
                }}
                aria-label={`Filter by ${filterType}`}
              >
                {filterType ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : 'All'}
              </button>
            ))}
          </div>

          {/* Device Filter */}
          <div className="flex gap-2">
            {(['all', 'desktop', 'mobile', 'tablet'] as const).map((deviceType) => (
              <button
                key={deviceType}
                onClick={() => handleDeviceFilterChange(deviceType)}
                className={`p-2 rounded-lg transition-colors ${selectedDevice === deviceType
                    ? 'bg-[var(--primary-amber)] text-black'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                  }`}
                aria-label={`Filter by ${deviceType} device`}
                title={`Show ${deviceType} images`}
              >
                {deviceType === 'all' && <FaTh className="w-4 h-4" />}
                {deviceType === 'desktop' && <FaDesktop className="w-4 h-4" />}
                {deviceType === 'mobile' && <FaMobile className="w-4 h-4" />}
                {deviceType === 'tablet' && <FaTabletAlt className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-[var(--color-bg-secondary)] rounded-lg p-1">
          {([
            { mode: 'masonry' as const, icon: FaTh, label: 'Masonry' },
            { mode: 'grid' as const, icon: FaThLarge, label: 'Grid' },
            { mode: 'carousel' as const, icon: FaList, label: 'List' }
          ]).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-2 rounded transition-colors ${viewMode === mode
                  ? 'bg-[var(--primary-amber)] text-black'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                }`}
              aria-label={`Switch to ${label} view`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-[var(--color-text-secondary)] text-sm">
        Showing {filteredImages.length} of {galleryData.length} images
        {searchTerm && ` for "${searchTerm}"`}
        {filter !== 'all' && ` in ${filter}`}
        {selectedDevice !== 'all' && ` on ${selectedDevice}`}
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="gallery-container">
        {filteredImages.length > 0 ? (
          <motion.div
            className={`gallery-grid ${viewMode === 'masonry'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max'
                : viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'flex flex-col gap-6'
              }`}
            layout={!prefersReducedMotion}
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((imageData, index) => {
                const originalIndex = galleryData.indexOf(imageData);
                const isVisible = index >= visibleRange.start && index <= visibleRange.end;

                return (
                  <GalleryImage
                    key={`${originalIndex}-${filter}-${selectedDevice}`}
                    imageData={imageData}
                    index={originalIndex}
                    isVisible={isVisible}
                    onClick={() => {
                      setActiveImageIndex(index);
                      setShowLightbox(true);
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    hoveredIndex={hoveredIndex}
                    onMouseEnter={setHoveredIndex}
                    onMouseLeave={() => setHoveredIndex(null)}
                    likedImages={likedImages}
                    toggleLike={toggleLike}
                    viewMode={viewMode}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <FaImage className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">No images found</h3>
            <p className="text-[var(--color-text-secondary)]">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {showLightbox && filteredImages[activeImageIndex] && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowLightbox(false);
            }}
          >
            {/* ── Top bar ── */}
            <div
              className="relative z-10 flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
            >
              {/* Left: close + counter */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setShowLightbox(false)}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                  }}
                  aria-label="Close lightbox"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </motion.button>

                <div className="text-white">
                  <p className="text-sm font-semibold leading-tight line-clamp-1 max-w-[160px] sm:max-w-xs">
                    {filteredImages[activeImageIndex]?.caption || filteredImages[activeImageIndex]?.alt}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {activeImageIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </div>

              {/* Right: action buttons */}
              <div className="flex items-center gap-1.5">
                {/* Zoom out */}
                <motion.button
                  onClick={() => setLightboxZoom(prev => Math.max(prev / 1.25, 0.5))}
                  whileTap={{ scale: 0.9 }}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Zoom out"
                >
                  <FaSearchMinus className="w-3 h-3" />
                </motion.button>

                {lightboxZoom !== 1 && (
                  <span className="text-white/60 text-xs px-1 hidden sm:block">
                    {Math.round(lightboxZoom * 100)}%
                  </span>
                )}

                {/* Zoom in */}
                <motion.button
                  onClick={() => setLightboxZoom(prev => Math.min(prev * 1.25, 4))}
                  whileTap={{ scale: 0.9 }}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Zoom in"
                >
                  <FaSearchPlus className="w-3 h-3" />
                </motion.button>

                {/* Rotate */}
                <motion.button
                  onClick={() => setLightboxRotation(prev => (prev + 90) % 360)}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Rotate image"
                >
                  <FaRedo className="w-3 h-3" />
                </motion.button>

                {/* Slideshow */}
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isPlaying ? 'text-[#f5a623]' : 'text-white/80 hover:text-white'}`}
                  style={{ background: isPlaying ? 'rgba(245,166,35,0.20)' : 'rgba(255,255,255,0.10)', border: `1px solid ${isPlaying ? 'rgba(245,166,35,0.40)' : 'rgba(255,255,255,0.15)'}` }}
                  aria-label={isPlaying ? 'Pause slideshow' : 'Start slideshow'}
                >
                  {isPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
                </motion.button>

                {/* Download */}
                <motion.button
                  onClick={() => downloadImage(filteredImages[activeImageIndex])}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Download image"
                >
                  <FaDownload className="w-3 h-3" />
                </motion.button>

                {/* Fullscreen (desktop only) */}
                <motion.button
                  onClick={toggleFullscreen}
                  whileTap={{ scale: 0.9 }}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <FaCompress className="w-3 h-3" /> : <FaArrowsAlt className="w-3 h-3" />}
                </motion.button>
              </div>
            </div>

            {/* ── Image area ── */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: lightboxZoom, rotate: lightboxRotation }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="w-full h-full flex items-center justify-center p-4 sm:p-10"
                >
                  <picture>
                    <source
                      srcSet={`${filteredImages[activeImageIndex]?.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 1x`}
                      type="image/webp"
                    />
                    <img
                      src={filteredImages[activeImageIndex]?.src}
                      alt={filteredImages[activeImageIndex]?.alt}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                      style={{ maxHeight: 'calc(100vh - 180px)' }}
                      draggable={false}
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              {/* ── Prev / Next nav buttons ── */}
              {filteredImages.length > 1 && (
                <>
                  <motion.button
                    onClick={() => navigateImage('prev')}
                    whileTap={{ scale: 0.88 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={() => navigateImage('next')}
                    whileTap={{ scale: 0.88 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}
                    aria-label="Next image"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </motion.button>
                </>
              )}
            </div>

            {/* ── Bottom strip: dots + tags ── */}
            <div
              className="flex-shrink-0 px-4 pt-2 pb-5"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)' }}
            >
              {/* Dot / pill indicators */}
              {filteredImages.length > 1 && filteredImages.length <= 20 && (
                <div className="flex items-center justify-center gap-1.5 mb-2.5">
                  {filteredImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveImageIndex(i); setLightboxZoom(1); setLightboxRotation(0); }}
                      className={`rounded-full transition-all duration-200 ${i === activeImageIndex
                          ? 'w-5 h-1.5 bg-[#f5a623]'
                          : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Tags */}
              {filteredImages[activeImageIndex]?.tags && filteredImages[activeImageIndex].tags!.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {filteredImages[activeImageIndex].tags!.slice(0, 4).map((tag, ti) => (
                    <span
                      key={`lb-tag-${ti}`}
                      className="px-2.5 py-0.5 text-white/70 text-xs rounded-full"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .gallery-grid {
          contain: layout style paint;
        }
        
        .gallery-container {
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @supports (backdrop-filter: blur(10px)) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
          }
        }
      `}</style>
    </div>
  );
}));

ModernGallery.displayName = 'ModernGallery';
