import React, { useState, useEffect } from 'react';
import { BlogCard } from './BlogCard';
import { BlogPostDetail } from './BlogPostDetail';
import { BlogPostProps } from '../../types';
import { blogPosts } from '../../data/blogData';
import { motion, AnimatePresence } from 'motion/react';
import { FaSearch, FaTimes, FaFire, FaClock, FaStar, FaFilter, FaRss } from 'react-icons/fa';
import { sendNewsletterSignup, isValidNewsletterEmail } from '../../utils/newsletterWebhook';
import '../../styles/blog-page.css';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostProps | null>(null);
  const [posts] = useState<BlogPostProps[]>(blogPosts);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');
  const [filterOpen, setFilterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  // Debounce search term for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Filter and sort posts with useMemo for performance
  const filteredPosts = React.useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
      const searchMatch = !debouncedSearchTerm || 
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });
    
    // Sort posts based on selected option
    return [...filtered].sort((a, b) => {
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
  }, [activeCategory, debouncedSearchTerm, sortBy]);

  const featuredPost = posts.find(post => post.featured);
  const showFeaturedBanner = !!featuredPost && sortBy !== 'popular' && activeCategory === 'all' && !searchTerm;
  
  // Handle post selection
  const handleSelectPost = (post: BlogPostProps) => {
    setSelectedPost(post);
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  
  // Handle back to blog list
  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterStatus === 'loading') return;
    if (!isValidNewsletterEmail(newsletterEmail)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('loading');
    const ok = await sendNewsletterSignup({
      email: newsletterEmail,
      source: 'Blog — Tech Insights',
    });
    if (ok) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      window.setTimeout(() => setNewsletterStatus('idle'), 6000);
    } else {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 bg-[var(--primary-bg)] bg-opacity-80">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 mt-20 sm:mt-24">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <BlogPostDetail post={selectedPost} onBack={handleBackToBlog} onSelectPost={handleSelectPost} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Blog Header */}
              <div className="text-center mb-8 sm:mb-10 md:mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
                >
                  <span className="title-gradient animate-gradient-x">
                    Tech Insights
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[var(--secondary-text)] max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2"
                >
                  Write-ups from building and shipping: mobile apps, automation pipelines, and the debugging stories in between.
                </motion.p>
                
                {/* Newsletter Signup → n8n (HubSpot + Telegram + Gmail welcome) */}
                <motion.form
                  onSubmit={handleNewsletterSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 sm:mt-8 max-w-md mx-auto px-2"
                  aria-busy={newsletterStatus === 'loading'}
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="blog-newsletter-email" className="sr-only">
                      Email for newsletter
                    </label>
                    <input
                      id="blog-newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={newsletterEmail}
                      onChange={(ev) => {
                        setNewsletterEmail(ev.target.value);
                        if (newsletterStatus === 'error' || newsletterStatus === 'success') {
                          setNewsletterStatus('idle');
                        }
                      }}
                      placeholder="Enter your email"
                      disabled={newsletterStatus === 'loading'}
                      className="flex-1 px-3 sm:px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--primary-text)] text-base min-h-[44px] disabled:opacity-70"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === 'loading'}
                      className="px-4 py-3 bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-[var(--color-text-on-accent)] font-medium rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <FaRss className="w-4 h-4" aria-hidden />
                      <span className="text-sm sm:text-base">
                        {newsletterStatus === 'loading'
                          ? 'Sending…'
                          : newsletterStatus === 'success'
                            ? 'Subscribed'
                            : 'Subscribe'}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--secondary-text)] mt-2 text-center sm:text-left">
                    Get updates on new articles. No spam — unsubscribe anytime.
                  </p>
                  {newsletterStatus === 'success' && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center sm:text-left" role="status">
                      You’re in — check your inbox for a welcome note.
                    </p>
                  )}
                  {newsletterStatus === 'error' && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center sm:text-left" role="alert">
                      Please enter a valid email, or try again in a moment.
                    </p>
                  )}
                </motion.form>
              </div>
              
              {/* Filters & Search */}
              <div className="mb-6 sm:mb-8 md:mb-10">
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-start md:items-center">
                  {/* Mobile Filter Toggle */}
                  <button 
                    className="md:hidden flex items-center gap-3 px-3 sm:px-4 py-3 border border-[var(--color-border)] rounded-lg text-[var(--secondary-text)] bg-[var(--color-bg-surface)] min-h-[44px] touch-manipulation w-full sm:w-auto"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <FaFilter className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Filters</span>
                  </button>
                  
                  {/* Desktop Filters */}
                  <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-colors min-h-[44px] touch-manipulation ${
                            activeCategory === category
                              ? 'bg-[var(--primary-amber)] text-[var(--color-text-on-accent)] font-medium'
                              : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] hover:border-[var(--primary-amber)]/50'
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                          <span className="ml-2 inline-block px-2 py-1 rounded-full text-sm bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted)] text-[var(--secondary-text)]">
                            {category === 'all' ? blogPosts.length : blogPosts.filter(p => p.category === category).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-[var(--secondary-text)]" />
                    </div>
                      <input
                        type="text"
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--primary-text)] placeholder-[var(--secondary-text)] min-h-[44px] text-base"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center min-h-[44px] min-w-[44px] justify-center"
                        onClick={() => setSearchTerm('')}
                      >
                        <FaTimes className="w-4 h-4 text-[var(--secondary-text)] hover:text-[var(--primary-text)]" />
                      </button>
                    )}
                  </div>
                    </div>
                
                {/* Sort Options */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="text-xs sm:text-sm text-[var(--secondary-text)]">
                    <span className="font-medium">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
                    {activeCategory !== 'all' && <span> in <span className="text-[var(--primary-amber)]">{activeCategory}</span></span>}
                    {searchTerm && <span> matching "<span className="text-[var(--primary-amber)]">{searchTerm}</span>"</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-[var(--secondary-text)]">Sort by:</span>
                    <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden">
                      <button
                        className={`px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] text-xs sm:text-sm ${sortBy === 'recent' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('recent')}
                      >
                        Recent
                      </button>
                      <button
                        className={`px-3 sm:px-4 py-2 sm:py-3 border-x border-[var(--color-border)] min-h-[44px] text-xs sm:text-sm ${sortBy === 'popular' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('popular')}
                      >
                        Popular
                      </button>
                      <button
                        className={`px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] text-xs sm:text-sm ${sortBy === 'featured' ? 'bg-[var(--primary-amber)]/10 text-[var(--primary-amber)]' : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)]'}`}
                        onClick={() => setSortBy('featured')}
                      >
                        Featured
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                
              {/* Featured Post */}
              {showFeaturedBanner && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 sm:mb-10"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <FaStar className="text-[var(--primary-amber)]" />
                    Featured Article
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg-surface)] hover:border-[var(--primary-amber)]/30 transition-colors cursor-pointer"
                    onClick={() => handleSelectPost(posts.find(post => post.featured)!)}
                  >
                    <div className="lg:col-span-2 h-48 sm:h-60 lg:h-auto overflow-hidden relative">
                      <img 
                        src={posts.find(post => post.featured)?.image || ''} 
                        alt={posts.find(post => post.featured)?.title || ''} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="lg:col-span-3 p-4 sm:p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-[var(--primary-amber)]/10 text-[var(--primary-amber)] rounded-full">
                          {posts.find(post => post.featured)?.category}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-[var(--primary-amber)] text-[var(--color-text-on-accent)] rounded-full">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--primary-text)]">
                        {posts.find(post => post.featured)?.title}
                      </h3>
                      <p className="text-[var(--secondary-text)] mb-4 sm:mb-6 flex-grow text-sm sm:text-base">
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
              {filteredPosts.length > 0 ? (
                <motion.div 
                  className="w-full blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {filteredPosts
                    // The featured post already has its own banner above the grid
                    .filter(post => !(showFeaturedBanner && post.featured && post.id === featuredPost?.id))
                    .map((post) => (
                    <BlogCard
                      key={post.id}
                      post={{
                        ...post,
                        id: parseInt(post.id.toString()),
                        views: post.views || 0,
                        author: typeof post.author === 'string' ? post.author : post.author.name
                      }}
                      onClick={() => handleSelectPost(post)}
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
