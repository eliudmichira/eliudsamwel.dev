import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaCalendar, FaClock, FaEye, FaStar, FaFire, FaHeart } from 'react-icons/fa';
import { LikeManager } from '../../src/utils/likeUtils';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: number;
  category: string;
  tags: string[];
  author: string;
  image: string;
  featured?: boolean;
  trending?: boolean;
  content?: string;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Calculate reading time (assuming 200 words per minute)
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = post.content ? post.content.split(' ').length : 500; // Fallback estimate
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Get like data for this post
  useEffect(() => {
    const likeData = LikeManager.getLikeData(post.id.toString());
    setLikeCount(likeData.count);
    setIsLiked(likeData.isLiked);
  }, [post.id]);

  return (
    <motion.article
      className="group relative h-full cursor-pointer blog-card touch-manipulation"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      style={{ willChange: "transform" }}
    >
      {/* Card Container */}
      <div className="card-embossed relative h-full w-full overflow-hidden transition-shadow duration-200 ease-out">
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-[var(--color-text-on-accent)] text-xs font-bold flex items-center gap-1 shadow-sm">
            <FaStar className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
        
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
          
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
              style={{ willChange: "transform" }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--secondary-bg)] to-[var(--tertiary-bg)]"></div>
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/60 dark:bg-black/60 backdrop-blur-md text-[var(--color-text-on-accent)] text-xs font-medium border border-white/20 dark:border-white/20">
              {post.category}
            </span>
          </div>
          
          {/* Reading time on image */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/60 dark:bg-black/60 backdrop-blur-md text-[var(--color-text-on-accent)] text-xs font-medium flex items-center gap-1.5">
              <FaClock className="w-3 h-3" />
              {calculateReadingTime()} min read
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 sm:p-6 w-full">
          {/* Title */}
          <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight mb-3 text-[var(--primary-text)] group-hover:text-[var(--accent-primary)] transition-colors duration-200 leading-tight break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-[var(--secondary-text)] text-sm sm:text-base mb-5 leading-relaxed break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">
            {post.excerpt}
          </p>
          
          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-auto pt-3 sm:pt-4 border-t border-[var(--glass-card-border)] w-full">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-[var(--secondary-text)] min-w-0 flex-1">
              <FaCalendar className="w-3 h-3 text-[var(--primary-amber)] flex-shrink-0" />
              <span className="break-words overflow-wrap-anywhere">{formatDate(post.date)}</span>
            </div>
            
            {/* Views, Likes & Trending */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <span 
                className="flex items-center gap-1 text-xs text-[var(--secondary-text)] cursor-pointer hover:text-[var(--primary-amber)] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLiking) return;
                  
                  setIsLiking(true);
                  const result = LikeManager.toggleLike(post.id.toString());
                  setLikeCount(result.count);
                  setIsLiked(result.isLiked);
                  
                  setTimeout(() => setIsLiking(false), 200);
                }}
                style={{ touchAction: "manipulation" }}
              >
                <FaHeart className={`w-3 h-3 ${isLiked ? 'text-red-500' : 'text-[var(--primary-amber)]'} ${isLiking ? 'animate-pulse' : ''}`} />
                {likeCount > 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
              </span>
              
              {post.views && (
                <span className="flex items-center gap-1 text-xs text-[var(--secondary-text)]">
                  <FaEye className="w-3 h-3 text-[var(--primary-amber)]" />
                  {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                </span>
              )}
              
              {post.trending && (
                <span className="flex items-center gap-1 text-xs font-medium text-[var(--primary-orange)]">
                  <FaFire className="w-3 h-3" />
                  Hot
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Read More Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </motion.article>
  );
};
