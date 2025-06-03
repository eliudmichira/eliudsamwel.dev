import React, { useState } from 'react';
import { BlogPostProps } from '../../types';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaEye, FaArrowRight, FaStar, FaFire } from 'react-icons/fa';

interface BlogCardProps {
  post: BlogPostProps;
  onClick: () => void;
  index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <motion.article
      className="group relative h-full cursor-pointer blog-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card Container */}
      <div className="relative h-full bg-[var(--glass-card-bg)] backdrop-blur-md rounded-lg border border-[var(--glass-card-border)] overflow-hidden transition-all duration-300 hover:border-[var(--primary-amber)]/50 shadow-sm hover:shadow-md">
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black text-xs font-bold flex items-center gap-1 shadow-sm">
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
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--secondary-bg)] to-[var(--tertiary-bg)]"></div>
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium border border-white/10">
              {post.category}
            </span>
          </div>
          
          {/* Reading time on image */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
              <FaClock className="w-3 h-3" />
              {calculateReadingTime()} min read
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-[var(--primary-text)] line-clamp-2 group-hover:text-[var(--primary-amber)] transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-[var(--secondary-text)] text-sm line-clamp-3 mb-5 leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--glass-card-border)]">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-[var(--secondary-text)]">
              <FaCalendar className="w-3 h-3 text-[var(--primary-amber)]" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            {/* Views & Trending */}
            <div className="flex items-center gap-3">
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