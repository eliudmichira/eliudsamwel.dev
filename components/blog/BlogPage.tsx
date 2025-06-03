import React, { useState, useEffect } from 'react';
import { BlogCard } from './BlogCard';
import { BlogPostDetail } from './BlogPostDetail';
import { BlogPostProps } from '../../types';
import { blogPosts } from '../../data/blogData';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaFire, FaClock, FaStar, FaFilter, FaRss } from 'react-icons/fa';
import '../../styles/blog-page.css';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostProps | null>(null);
  const [posts, setPosts] = useState<BlogPostProps[]>(blogPosts);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Extract unique categories from blog posts
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Check for direct blog post opening from localStorage
  useEffect(() => {
    const openBlogPostId = localStorage.getItem('openBlogPost');
    if (openBlogPostId) {
      const postToOpen = blogPosts.find(post => post.id === openBlogPostId);
      if (postToOpen) {
        setSelectedPost(postToOpen);
      }
      // Clear the localStorage item
      localStorage.removeItem('openBlogPost');
    }
  }, []);
  
  // Filter and sort posts
  useEffect(() => {
    let filtered = blogPosts.filter((post) => {
      const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
      const searchMatch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });
    
    // Sort posts based on selected option
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });
    
    setPosts(filtered);
  }, [activeCategory, searchTerm, sortBy]);
  
  // Handle post selection
  const handleSelectPost = (post: BlogPostProps) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle back to blog list
  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 bg-[var(--primary-bg)] bg-opacity-80">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <BlogPostDetail post={selectedPost} onBack={handleBackToBlog} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Blog Header */}
              <div className="text-center mb-10 md:mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  <span className="bg-gradient-to-r from-[var(--primary-amber)] via-[var(--accent-yellow)] to-[var(--primary-orange)] bg-clip-text text-transparent animate-gradient-x">
                    Tech Insights
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[var(--secondary-text)] max-w-2xl mx-auto text-lg"
                >
                  Deep dives into web development, blockchain innovation, and the future of technology
                </motion.p>
                
                {/* Newsletter Signup */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 max-w-md mx-auto"
                >
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-3 rounded-l-lg border-y border-l border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--primary-text)]"
                    />
                    <button className="px-4 py-3 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black font-medium rounded-r-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                      <FaRss className="w-4 h-4" />
                      <span>Subscribe</span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--secondary-text)] mt-2">
                    Get weekly updates on new articles and tech trends
                  </p>
                </motion.div>
              </div>
              
              {/* Filters & Search */}
              <div className="mb-10">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  {/* Mobile Filter Toggle */}
                  <button 
                    className="md:hidden flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] rounded-lg text-[var(--secondary-text)] bg-[var(--color-bg-surface)]"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <FaFilter className="w-3.5 h-3.5" />
                    <span>Filters</span>
                  </button>
                  
                  {/* Desktop Filters */}
                  <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            activeCategory === category
                              ? 'bg-[var(--primary-amber)] text-black font-medium'
                              : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] hover:border-[var(--primary-amber)]/50'
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                          <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded-full text-xs bg-black/10 text-[var(--secondary-text)]">
                            {category === 'all' ? blogPosts.length : blogPosts.filter(p => p.category === category).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-[var(--secondary-text)]" />
                    </div>
                      <input
                        type="text"
                      className="w-full pl-10 pr-10 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--primary-text)] placeholder-[var(--secondary-text)]"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setSearchTerm('')}
                      >
                        <FaTimes className="w-4 h-4 text-[var(--secondary-text)] hover:text-[var(--primary-text)]" />
                      </button>
                    )}
                  </div>
                    </div>
                
                {/* Sort Options */}
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-[var(--secondary-text)]">
                    <span className="font-medium">{posts.length}</span> article{posts.length !== 1 ? 's' : ''}
                    {activeCategory !== 'all' && <span> in <span className="text-[var(--primary-amber)]">{activeCategory}</span></span>}
                    {searchTerm && <span> matching "<span className="text-[var(--primary-amber)]">{searchTerm}</span>"</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--secondary-text)]">Sort by:</span>
                    <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden">
                      <button
                        className={`px-3 py-1.5 ${sortBy === 'recent' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('recent')}
                      >
                        Recent
                      </button>
                      <button
                        className={`px-3 py-1.5 border-x border-[var(--color-border)] ${sortBy === 'popular' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('popular')}
                      >
                        Popular
                      </button>
                      <button
                        className={`px-3 py-1.5 ${sortBy === 'featured' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('featured')}
                      >
                        Featured
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                
              {/* Featured Post */}
              {posts.find(post => post.featured) && sortBy !== 'popular' && activeCategory === 'all' && !searchTerm && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-10"
                >
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaStar className="text-[var(--primary-amber)]" />
                    Featured Article
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg-surface)] hover:border-[var(--primary-amber)]/30 transition-colors cursor-pointer"
                    onClick={() => handleSelectPost(posts.find(post => post.featured)!)}
                  >
                    <div className="lg:col-span-2 h-60 lg:h-auto overflow-hidden relative">
                      <img 
                        src={posts.find(post => post.featured)?.image || ''} 
                        alt={posts.find(post => post.featured)?.title || ''} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="lg:col-span-3 p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-[var(--primary-amber)]/10 text-[var(--primary-amber)] rounded-full">
                          {posts.find(post => post.featured)?.category}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-[var(--primary-amber)] text-black rounded-full">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-[var(--primary-text)]">
                        {posts.find(post => post.featured)?.title}
                      </h3>
                      <p className="text-[var(--secondary-text)] mb-6 flex-grow">
                        {posts.find(post => post.featured)?.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-[var(--secondary-text)]">
                        <div className="flex items-center gap-1">
                          <img 
                            src={posts.find(post => post.featured)?.author?.avatar || ''} 
                            alt={posts.find(post => post.featured)?.author?.name || ''} 
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{posts.find(post => post.featured)?.author?.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            {posts.find(post => post.featured)?.readTime}
                      </span>
                          <span>{new Date(posts.find(post => post.featured)?.date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Blog Posts Grid */}
              {posts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {posts.map((post, index) => (
                    <BlogCard
                      key={post.id}
                        post={post}
                        onClick={() => handleSelectPost(post)}
                        index={index}
                      />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="text-5xl mb-4 text-[var(--secondary-text)] opacity-20">😕</div>
                  <h3 className="text-xl font-medium mb-2 text-[var(--primary-text)]">No articles found</h3>
                  <p className="text-[var(--secondary-text)]">
                    Try changing your search or filter criteria
                  </p>
                  <button 
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="mt-4 px-4 py-2 text-sm text-[var(--primary-amber)] border border-[var(--primary-amber)] rounded-lg hover:bg-[var(--primary-amber)]/10 transition-colors"
                  >
                    Reset filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};