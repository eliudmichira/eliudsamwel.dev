import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPostProps } from '../../types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getOptimalImageSources } from '../../src/utils/imageUtils';
import { FaArrowLeft, FaCalendar, FaClock, FaEye, FaShare, FaBookmark, FaHeart, FaTwitter, FaLinkedin, FaFacebook, FaLink, FaCheck } from 'react-icons/fa';

interface BlogPostDetailProps {
  post: BlogPostProps;
  onBack: () => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress for parallax effects
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleParallax = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Calculate reading time
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = post.content ? post.content.split(' ').length : 500;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Update reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle likes
  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev: number) => prev + 1);
    } else {
      setIsLiked(false);
      setLikesCount((prev: number) => prev - 1);
    }
  };

  // Handle share
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  // Extract headings for table of contents
  const extractHeadings = (content: string) => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings = [];
    let match;
  
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text });
    }
  
    return headings;
  };
  
  const headings = extractHeadings(post.content);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pb-16"
    >
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ scaleX: readingProgress / 100 }} />
      
      {/* Floating Action Bar */}
      <motion.div
        className="fixed z-40 bottom-6 right-6 md:top-24 md:bottom-auto md:right-8 flex flex-row md:flex-col gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500/20 border-red-500 text-red-500' 
              : 'bg-[var(--glass-card-bg)] border-[var(--glass-card-border)] text-[var(--secondary-text)] hover:text-[var(--primary-amber)]'
          }`}
          aria-label="Like this article"
        >
          <FaHeart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 ${
            isBookmarked 
              ? 'bg-[var(--primary-amber)]/20 border-[var(--primary-amber)] text-[var(--primary-amber)]' 
              : 'bg-[var(--glass-card-bg)] border-[var(--glass-card-border)] text-[var(--secondary-text)] hover:text-[var(--primary-amber)]'
          }`}
          aria-label="Bookmark this article"
        >
          <FaBookmark className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </motion.button>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--glass-card-bg)] backdrop-blur-md border border-[var(--glass-card-border)] flex items-center justify-center text-[var(--secondary-text)] hover:text-[var(--primary-amber)] transition-all duration-200"
            aria-label="Share this article"
          >
            <FaShare className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
          
          {/* Share Menu */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showShareMenu ? 1 : 0, opacity: showShareMenu ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`absolute md:right-14 md:top-0 bottom-14 md:bottom-auto right-0 md:right-auto bg-[var(--glass-card-bg)] backdrop-blur-md border border-[var(--glass-card-border)] rounded-xl p-2 flex gap-2 origin-bottom-right md:origin-top-right`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('twitter')}
              className="w-10 h-10 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#1DA1F2] transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('linkedin')}
              className="w-10 h-10 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#0A66C2] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#1877F2] transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('copy')}
              className="w-10 h-10 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[var(--secondary-text)] transition-colors"
              aria-label="Copy link"
            >
              {copiedLink ? <FaCheck className="w-5 h-5 text-green-500" /> : <FaLink className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Hero Section */}
      <motion.div 
        className="relative h-[50vh] md:h-[65vh] min-h-[400px] overflow-hidden"
        style={{ y: heroParallax }}
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          {post.image ? (
              <img 
              src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--secondary-bg)] to-[var(--tertiary-bg)]" />
          )}
          <div className="absolute inset-0 blog-hero-gradient" />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <motion.div 
            className="container mx-auto px-4 pb-10 md:pb-16 w-full"
            style={{ y: titleParallax }}
          >
            {/* Back Button */}
            <motion.button
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: -5 }}
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium"
              aria-label="Back to articles"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </motion.button>
            
            {/* Category & Featured Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="px-4 py-1.5 rounded-full bg-[var(--primary-amber)]/20 backdrop-blur-md text-[var(--primary-amber)] text-sm font-medium border border-[var(--primary-amber)]/30">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black text-sm font-medium">
                  Featured Article
                </span>
              )}
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="blog-title-large text-white mb-6"
            >
              {post.title}
            </motion.h1>
            
            {/* Meta Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-sm"
            >
              <span className="flex items-center gap-2">
                  <img 
                  src={post.author?.avatar || '/default-avatar.png'}
                    alt={post.author?.name || 'Author'}
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                    loading="lazy"
                  />
                <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FaCalendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="w-3.5 h-3.5" />
                {calculateReadingTime()} min read
              </span>
              {post.views && (
                <span className="flex items-center gap-1.5">
                  <FaEye className="w-3.5 h-3.5" />
                  {post.views.toLocaleString()} views
              </span>
              )}
              <span className="flex items-center gap-1.5">
                <FaHeart className="w-3.5 h-3.5" />
                {likesCount.toLocaleString()} likes
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents - Desktop */}
          {headings.length > 2 && (
            <motion.aside 
              className="hidden lg:block lg:col-span-3 xl:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
            >
              <div className="table-of-contents">
                <h2 className="text-lg font-semibold mb-4 text-[var(--primary-text)]">Table of Contents</h2>
                <ul>
                  {headings.map((heading, index) => (
                    <li key={index} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                      <a 
                        href={`#${heading.text.toLowerCase().replace(/[^\w]+/g, '-')}`}
                        className="block py-1.5 hover:text-[var(--primary-amber)] transition-colors"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          )}
        
        {/* Main Content */}
        <motion.div
            ref={contentRef} 
            className="lg:col-span-9 xl:col-span-8 blog-content-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Render Markdown content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            
            {/* Tags Section */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
              <h3 className="text-[var(--primary-text)] font-medium mb-3">Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md bg-[var(--color-bg-muted)] text-[var(--secondary-text)] text-sm hover:bg-[var(--primary-amber)]/10 hover:text-[var(--primary-amber)] transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
        
        {/* Author Bio */}
            <div className="author-card mt-10">
              <img 
                src={post.author?.avatar || '/default-avatar.png'} 
                alt={post.author?.name || 'Author'}
                className="author-avatar"
              />
              <div className="author-info">
                <h3 className="author-name text-[var(--primary-text)]">
                  {post.author?.name || 'Anonymous'}
              </h3>
                <p className="author-bio">
                  {post.author?.bio || 'A passionate writer sharing insights and experiences in the world of development.'}
              </p>
                <div className="mt-2 flex gap-4">
                  <a href="#" className="text-sm text-[var(--primary-amber)] hover:underline">
                  View Profile
                </a>
                  <a href="#" className="text-sm text-[var(--primary-amber)] hover:underline">
                  More Articles
                </a>
              </div>
            </div>
          </div>
        </motion.div>
          
          {/* Sidebar/Ads - Desktop */}
          <motion.aside 
            className="hidden xl:block xl:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="sticky top-24">
              <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)]">
                <h3 className="text-lg font-semibold mb-4 text-[var(--primary-text)]">Popular Articles</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group cursor-pointer">
                      <h4 className="text-sm font-medium text-[var(--primary-text)] group-hover:text-[var(--primary-amber)] transition-colors">
                        Popular Article Title {item}
                      </h4>
                      <p className="text-xs text-[var(--secondary-text)] mt-1">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
        
        {/* Related Articles */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for related articles - would be dynamically loaded */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group cursor-pointer overflow-hidden rounded-lg border border-[var(--color-border)] hover:border-[var(--primary-amber)]/30 transition-all duration-300 bg-[var(--color-bg-surface)]"
              >
                <div className="aspect-video bg-[var(--color-bg-muted)] relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--secondary-bg)] to-[var(--tertiary-bg)] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--primary-text)] mb-2 group-hover:text-[var(--primary-amber)] transition-colors">
                  Related Article Title {item}
                </h3>
                  <p className="text-sm text-[var(--secondary-text)] line-clamp-2 mb-3">
                  Brief description of the related article that provides context and encourages further reading.
                </p>
                  <div className="flex justify-between items-center text-xs text-[var(--secondary-text)]">
                    <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};