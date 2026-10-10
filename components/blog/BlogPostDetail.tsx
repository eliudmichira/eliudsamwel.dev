import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPostProps } from '../../types';
import { blogPosts } from '../../data/blogData';
import { motion, useScroll, useTransform } from 'motion/react';
import { getOptimalImageSources } from '../../src/utils/imageUtils';
import { LikeManager } from '../../src/utils/likeUtils';
import { FaArrowLeft, FaCalendar, FaClock, FaEye, FaShare, FaBookmark, FaHeart, FaLinkedin, FaFacebook, FaLink, FaCheck, FaWhatsapp, FaEnvelope, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiWhatsapp, SiTelegram } from 'react-icons/si';

interface BlogPostDetailProps {
  post: BlogPostProps;
  onBack: () => void;
  onSelectPost: (post: BlogPostProps) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onSelectPost }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  
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

  // Set up meta tags for better social sharing
  useEffect(() => {
    const url = generateShareUrl();
    
    // Update meta tags for social sharing
    const metaTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.excerpt },
      { property: 'og:image', content: post.image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.excerpt },
      { name: 'twitter:image', content: post.image },
      { name: 'description', content: post.excerpt },
    ];

    // Update or create meta tags
    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        } else if (name) {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    });

    // Cleanup function to restore original meta tags if needed
    return () => {
      // You could restore original meta tags here if needed
    };
  }, [post]);

  // Initialize like state from localStorage
  useEffect(() => {
    const likeData = LikeManager.getLikeData(post.id);
    setIsLiked(likeData.isLiked);
    setLikesCount(likeData.count);
  }, [post.id]);

  // Handle likes with persistence
  const handleLike = async () => {
    if (isLiking) return; // Prevent rapid clicking
    
    setIsLiking(true);
    
    try {
      const result = LikeManager.toggleLike(post.id);
      setIsLiked(result.isLiked);
      setLikesCount(result.count);
      
      // Optional: Send to analytics or backend
      // await trackLike(post.id, result.isLiked ? 'like' : 'unlike');
      
    } catch (error) {
      console.error('Error handling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Generate share URL with proper blog post ID
  const generateShareUrl = () => {
    // Use production domain for sharing, fallback to current origin
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'https://eliudsamwel.dev' 
      : window.location.origin;
    return `${baseUrl}/blog/${post.id}`;
  };

  // Handle share with enhanced functionality
  const handleShare = async (platform: string) => {
    const url = generateShareUrl();
    const title = post.title;
    const excerpt = post.excerpt;
    const hashtags = post.tags.join(',');
    
    // Try native Web Share API first (mobile devices)
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: url,
        });
        setShowShareMenu(false);
        return;
      } catch (error) {
        console.log('Native sharing cancelled or failed');
      }
    }
    
    switch (platform) {
      case 'twitter':
        const twitterText = `${title} - ${excerpt}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        const whatsappText = `${title}%0A%0A${excerpt}%0A%0A${url}`;
        window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
        break;
      case 'telegram':
        const telegramText = `${title}%0A%0A${excerpt}%0A%0A${url}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        const emailSubject = `Check out this article: ${title}`;
        const emailBody = `Hi,%0A%0AI thought you might be interested in this article:%0A%0A${title}%0A%0A${excerpt}%0A%0ARead more: ${url}`;
        window.open(`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopiedLink(true);
          setShowNotification(true);
          setTimeout(() => {
            setCopiedLink(false);
            setShowNotification(false);
          }, 2000);
        } catch (error) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopiedLink(true);
          setShowNotification(true);
          setTimeout(() => {
            setCopiedLink(false);
            setShowNotification(false);
          }, 2000);
        }
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
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }
  
    return headings;
  };

  // Handle smooth scroll to heading
  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  const headings = extractHeadings(post.content);

  const related = (() => {
    const sameCategory = blogPosts
      .filter(article => article.id !== post.id && article.category === post.category)
      .slice(0, 3);
    if (sameCategory.length > 0) return sameCategory;
    // Fallback: show most popular posts (excluding current)
    return blogPosts
      .filter(article => article.id !== post.id)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
  })();

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pb-16"
    >
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ transform: `scaleX(${readingProgress / 100})` }} />
      
      {/* Copy Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-[var(--color-text-on-accent)] px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <FaCheck className="w-4 h-4" />
          <span>Link copied to clipboard!</span>
        </motion.div>
      )}
      
      {/* Floating Action Bar */}
      <motion.div
        className="fixed z-40 bottom-6 right-6 md:top-24 md:bottom-auto md:right-8 flex flex-row md:flex-col gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: isLiking ? 1 : 1.1 }}
          whileTap={{ scale: isLiking ? 1 : 0.9 }}
          onClick={handleLike}
          disabled={isLiking}
          className={`w-12 h-12 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500/20 border-red-500 text-red-500' 
              : 'bg-[var(--glass-card-bg)] border-[var(--glass-card-border)] text-[var(--secondary-text)] hover:text-[var(--primary-amber)]'
          } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Like this article"
        >
          <FaHeart className={`w-5 h-5 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''} ${isLiking ? 'animate-pulse' : ''}`} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-12 h-12 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 ${
            isBookmarked 
              ? 'bg-[var(--primary-amber)]/20 border-[var(--primary-amber)] text-[var(--primary-amber)]' 
              : 'bg-[var(--glass-card-bg)] border-[var(--glass-card-border)] text-[var(--secondary-text)] hover:text-[var(--primary-amber)]'
          }`}
          aria-label="Bookmark this article"
        >
          <FaBookmark className="w-5 h-5 md:w-5 md:h-5 ${isBookmarked ? 'fill-current' : ''}" />
        </motion.button>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-[var(--glass-card-bg)] backdrop-blur-md border border-[var(--glass-card-border)] flex items-center justify-center text-[var(--secondary-text)] hover:text-[var(--primary-amber)] transition-all duration-200"
            aria-label="Share this article"
          >
            <FaShare className="w-5 h-5 md:w-5 md:h-5" />
          </motion.button>
          
          {/* Share Menu */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showShareMenu ? 1 : 0, opacity: showShareMenu ? 1 : 0 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
            className={`absolute md:right-14 md:top-0 bottom-20 md:bottom-auto right-0 md:right-auto bg-[var(--glass-card-bg)] backdrop-blur-md border border-[var(--glass-card-border)] rounded-xl p-4 shadow-lg origin-bottom-right md:origin-top-right z-50`}
          >
                          <div className="flex flex-col gap-3">
                {/* Native Share (Mobile) */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare('native')}
                    className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[var(--primary-amber)] transition-colors touch-manipulation"
                    aria-label="Share natively"
                  >
                    <FaShare className="w-6 h-6" />
                  </motion.button>
                )}
              
              {/* Twitter/X */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('twitter')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#1DA1F2] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share on X"
              >
                <FaXTwitter className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* LinkedIn */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('linkedin')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#0A66C2] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* Facebook */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('facebook')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#1877F2] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* WhatsApp */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('whatsapp')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#25D366] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share on WhatsApp"
              >
                <SiWhatsapp className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* Telegram */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('telegram')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[#0088cc] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share on Telegram"
              >
                <SiTelegram className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* Email */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('email')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[var(--secondary-text)] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Share via Email"
              >
                <FaEnvelope className="w-6 h-6 fill-current" />
              </motion.button>
              
              {/* Copy Link */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare('copy')}
                className="w-12 h-12 rounded-lg hover:bg-[var(--primary-amber)]/10 flex items-center justify-center text-[var(--secondary-text)] transition-all duration-200 hover:shadow-md touch-manipulation"
                aria-label="Copy link"
              >
                {copiedLink ? <FaCheck className="w-6 h-6 text-green-500 fill-current" /> : <FaLink className="w-6 h-6 fill-current" />}
              </motion.button>
            </div>
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
          {/* Strong overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 blog-hero-gradient" />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <motion.div 
            className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-10 md:pb-16 w-full"
            style={{ y: titleParallax }}
          >
            {/* Back Button */}
            <motion.button
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: -5 }}
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[var(--color-text-on-accent)]/80 hover:text-[var(--color-text-on-accent)] mb-6 transition-colors font-medium"
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
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-[var(--color-text-on-accent)] text-sm font-medium">
                  Featured Article
                </span>
              )}
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="blog-title-large text-[var(--color-text-on-accent)] dark:text-[var(--color-text-on-accent)] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {post.title}
            </motion.h1>
            
            {/* Meta Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-[var(--color-text-on-accent)]/80 text-sm"
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
                <FaHeart className={`w-3.5 h-3.5 ${isLiked ? 'text-red-500' : ''}`} />
                {likesCount.toLocaleString()} likes
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Content Section */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
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
                      <button 
                        onClick={() => scrollToHeading(heading.id)}
                        className="block py-1.5 hover:text-[var(--primary-amber)] transition-colors text-left w-full bg-transparent border-none cursor-pointer text-[var(--secondary-text)]"
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          )}
        
        {/* Main Content */}
        <motion.div
            ref={contentRef} 
            className="lg:col-span-9 xl:col-span-8 blog-content-wrapper w-full min-w-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Render Markdown content */}
            <div className="prose prose-lg dark:prose-invert max-w-none w-full min-w-0 overflow-hidden">
              <ReactMarkdown
                components={{
                  h1: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                    return (
                      <h1
                        id={id}
                        className="text-3xl font-bold text-[var(--primary-text)] dark:text-[var(--primary-text)] mb-6 mt-8"
                        {...props}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                    return (
                      <h2
                        id={id}
                        className="text-2xl font-bold text-[var(--primary-text)] dark:text-[var(--primary-text)] mb-4 mt-8"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                    return (
                      <h3
                        id={id}
                        className="text-xl font-bold text-[var(--primary-text)] dark:text-[var(--primary-text)] mb-2 mt-6"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
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
                  {blogPosts
                    .filter(article => article.id !== post.id) // Exclude current post
                    .sort((a, b) => (b.views || 0) - (a.views || 0)) // Sort by views
                    .slice(0, 3) // Take top 3
                    .map((article) => (
                    <div key={article.id} className="group cursor-pointer" onClick={() => onSelectPost(article)}>
                      <h4 className="text-sm font-medium text-[var(--primary-text)] group-hover:text-[var(--primary-amber)] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[var(--secondary-text)] mt-1">
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {article.views && (
                        <p className="text-xs text-[var(--secondary-text)] opacity-70 mt-0.5">
                          {article.views.toLocaleString()} views
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
        
        {/* Related Articles */}
        {related.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-[var(--color-border)] hover:border-[var(--primary-amber)]/30 transition-all duration-300 bg-[var(--color-bg-surface)]"
                  onClick={() => onSelectPost(article)}
                >
                  <div className="aspect-video bg-[var(--color-bg-muted)] relative overflow-hidden">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--secondary-bg)] to-[var(--tertiary-bg)] group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--primary-text)] mb-2 group-hover:text-[var(--primary-amber)] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--secondary-text)] line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-[var(--secondary-text)]">
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};
