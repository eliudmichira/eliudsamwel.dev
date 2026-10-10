import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  Zap, Star, Bell, Menu, X, Loader, 
  Grid, Edit, Eye, Mail, ToggleRight,
  Check, Search, ShoppingCart, User, ChevronDown,
  Home, Plus, FileText, Settings, ArrowRight,
  Play, EyeOff, Minus, Calendar, ImageIcon, Bookmark,
  Trash2, Send, Share2, Phone, Info, ChevronRight,
  ChevronLeft, ChevronUp, Upload, Filter, Heart, Palette
} from 'lucide-react';

// Import the new LoginLayoutsShowcase
import LoginLayoutsShowcase from './LoginLayoutsShowcase';
// Import the DesignLanguageShowcase
import DesignLanguageShowcase from './DesignLanguageShowcase';
// Import styles for creative toggles
import '../../styles/showcase-toggles.css';

// Enhanced component metadata interface
interface ComponentMetadata {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  useCase: string[];
  dependencies: string[];
  accessibility: 'excellent' | 'good' | 'needs-improvement';
  responsive: boolean;
  popular: boolean;
  new: boolean;
}

// Enhanced section interface with metadata
interface EnhancedSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'essentials' | 'interactive' | 'specialized' | 'experimental';
  metadata: ComponentMetadata;
  description: string;
}

// Helper function to get difficulty color
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    case 'intermediate': return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20';
    case 'advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
  }
};

// Helper function to get accessibility color
const getAccessibilityColor = (accessibility: string) => {
  switch (accessibility) {
    case 'excellent': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    case 'good': return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20';
    case 'needs-improvement': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
  }
};

// Enhanced component metadata display component
const ComponentMetadataDisplay: React.FC<{ section: EnhancedSection }> = ({ section }) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl flex items-center justify-center text-white text-xl">
          {section.icon}
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">{section.name}</h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
            {section.description}
          </p>
        </div>
      </div>
      
      {/* Metadata Pills */}
      <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(section.metadata.difficulty)}`}>
          {section.metadata.difficulty.charAt(0).toUpperCase() + section.metadata.difficulty.slice(1)}
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          ⏱️ {section.metadata.estimatedTime}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessibilityColor(section.metadata.accessibility)}`}>
          ♿ {section.metadata.accessibility === 'needs-improvement' ? 'Fair A11y' : `${section.metadata.accessibility} A11y`}
        </span>
        {section.metadata.responsive && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
            📱 Responsive
          </span>
        )}
        {section.metadata.popular && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
            ⭐ Popular
          </span>
        )}
        {section.metadata.new && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            ✨ New
          </span>
        )}
      </div>
      
      {/* Use Cases */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        <span className="text-sm text-[var(--color-text-muted)]">Best for:</span>
        {section.metadata.useCase.map((useCase, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm dark:bg-gray-800 dark:text-gray-400">
            {useCase}
          </span>
        ))}
      </div>
      
      {/* Dependencies */}
      {section.metadata.dependencies.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-sm text-[var(--color-text-muted)]">Dependencies:</span>
          {section.metadata.dependencies.map((dep, index) => (
            <code key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono dark:bg-gray-800 dark:text-gray-300">
              {dep}
            </code>
          ))}
        </div>
      )}
    </div>
  );
};

// Content for the new "Creative Toggles" section
const CreativeTogglesSectionContent: React.FC = () => {
  // State for each of the 8 toggles [isActive, isActive, ...]
  const [toggleStates, setToggleStates] = useState<boolean[]>(Array(8).fill(false));
  // Specific ref for Toggle 8 (Particle Burst) which needs direct DOM manipulation
  const particleToggleRef = useRef<HTMLDivElement>(null);

  const createParticles = (toggleAnimationWrapper: HTMLDivElement | null) => {
    if (!toggleAnimationWrapper) return;
    if (toggleAnimationWrapper.classList.contains('animating')) return;

    toggleAnimationWrapper.classList.add('animating');
    
    const slider = toggleAnimationWrapper.querySelector('.slider') as HTMLElement;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 25 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      
      if (slider) {
        particle.style.left = `${slider.offsetLeft + slider.offsetWidth / 2 - 2}px`;
        particle.style.top = `${slider.offsetTop + slider.offsetHeight / 2 - 2}px`;
      } else {
        // Fallback if slider is not found (should not happen with correct HTML)
        particle.style.left = `${toggleAnimationWrapper.offsetWidth / 2 - 2}px`;
        particle.style.top = `${toggleAnimationWrapper.offsetHeight / 2 - 2}px`;
      }
      
      toggleAnimationWrapper.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    }
    
    setTimeout(() => toggleAnimationWrapper.classList.remove('animating'), 700);
  };

  const handleToggleClick = (index: number) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    if (index === 7) { // Index 7 for Toggle 8 (Particle Burst)
      createParticles(particleToggleRef.current);
    }
  };

  const togglesData = [
    { id: 1, title: 'Day/Night Cycle', description: 'Smooth sun to moon transition with stars' },
    { id: 2, title: 'Morphing Shape', description: 'Shape-shifting with emoji icons' },
    { id: 3, title: 'Sliding Sky', description: 'Sky transition with clouds' },
    { id: 4, title: 'Eclipse Effect', description: 'Moon eclipsing the sun' },
    { id: 5, title: 'Liquid Morph', description: 'Fluid gradient transition' },
    { id: 6, title: '3D Flip', description: '3D rotating card effect' },
    { id: 7, title: 'Neon Glow', description: 'Cyberpunk neon effect' },
    { id: 8, title: 'Particle Burst', description: 'Explosive particle animation' },
    // New creative toggles
    { id: 9, title: 'Aurora Switch', description: 'Animated aurora gradient toggle' },
    { id: 10, title: 'Emoji Parade', description: 'Toggle to unleash a parade of emojis' },
    { id: 11, title: 'Confetti Celebration', description: 'Confetti burst animation on toggle' },
    { id: 12, title: 'Firefly Night', description: 'Fireflies light up the toggle at night' },
  ];

  return (
    <div className="theme-toggle-showcase-container p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 gradient-text">
        Creative Theme Toggle Showcase
      </h1>
      
      <div className="toggles-grid">
        {togglesData.map((toggle, index) => (
          <div key={toggle.id} className="toggle-card showcase-card">
            <h3 className="text-xl font-semibold mb-3 text-center">{toggle.title}</h3>
            
            <div 
              className={`toggle-placeholder toggle-${toggle.id} ${toggleStates[index] ? 'active' : ''}`}
              onClick={() => handleToggleClick(index)}
              role="button"
              tabIndex={0}
              aria-pressed={toggleStates[index]}
              aria-label={`Toggle ${toggle.title}`}
              onKeyDown={(e) => e.key === 'Enter' && handleToggleClick(index)}
            >
              {toggle.id === 1 && (
                <div className={`toggle-1-actual ${toggleStates[index] ? 'active' : ''}`}>
                  <div className="stars">
                    <div className="star" style={{top: '10px', left: '60px', animationDelay: '0s'}}></div>
                    <div className="star" style={{top: '20px', left: '70px', animationDelay: '0.5s'}}></div>
                    <div className="star" style={{top: '30px', left: '80px', animationDelay: '1s'}}></div>
                    <div className="star" style={{top: '15px', left: '90px', animationDelay: '1.5s'}}></div>
                  </div>
                </div>
              )}
              {toggle.id === 2 && (
                <div className={`toggle-2-actual ${toggleStates[index] ? 'active' : ''}`}></div>
              )}
              {toggle.id === 3 && (
                <div className={`toggle-3-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="cloud cloud1"></div>
                    <div className="cloud cloud2"></div>
                    <div className="celestial"></div>
                </div>
              )}
              {toggle.id === 4 && (
                <div className={`toggle-4-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="sun"></div>
                    <div className="moon"></div>
                </div>
              )}
              {toggle.id === 5 && (
                <div className={`toggle-5-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="handle"></div>
                </div>
              )}
              {toggle.id === 6 && (
                <div className={`toggle-6-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="toggle-6-inner">
                        <div className="toggle-6-front">☀️</div>
                        <div className="toggle-6-back">🌙</div>
                    </div>
                </div>
              )}
              {toggle.id === 7 && (
                <div className={`toggle-7-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <span className="neon-text day-text">DAY</span>
                    <span className="neon-text night-text">NEON</span>
                </div>
              )}
              {toggle.id === 8 && (
                <div ref={particleToggleRef} className={`toggle-8-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="slider"></div>
                </div>
              )}
              {toggle.id === 9 && (
                <div className={`toggle-9-actual ${toggleStates[index] ? 'active' : ''}`} style={{position: 'relative', width: 100, height: 40, borderRadius: 20, overflow: 'hidden', background: toggleStates[index] ? 'linear-gradient(90deg, #7f7fd5, #86a8e7, #91eac9, #f9d29d, #ffdde1)' : 'linear-gradient(90deg, #232526, #414345)'}}>
                  {/* Aurora effect: animated gradient waves */}
                  <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
                    <motion.div
                      animate={{ x: toggleStates[index] ? [0, 40, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.2)', borderRadius: 10, filter: 'blur(4px)', position: 'absolute', top: 10 }}
                    />
                    <motion.div
                      animate={{ x: toggleStates[index] ? [0, -40, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      style={{ width: '100%', height: 10, background: 'rgba(0,255,255,0.15)', borderRadius: 10, filter: 'blur(6px)', position: 'absolute', top: 22 }}
                    />
                  </div>
                </div>
              )}
              {toggle.id === 10 && (
                <div className={`toggle-10-actual ${toggleStates[index] ? 'active' : ''}`} style={{position: 'relative', width: 100, height: 40, borderRadius: 20, background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {/* Emoji Parade: parade of emojis when active */}
                  {toggleStates[index] ? (
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ display: 'flex', gap: 4 }}>
                      <span role="img" aria-label="party">🎉</span>
                      <span role="img" aria-label="star">⭐</span>
                      <span role="img" aria-label="rocket">🚀</span>
                      <span role="img" aria-label="fire">🔥</span>
                      <span role="img" aria-label="sparkles">✨</span>
                    </motion.div>
                  ) : (
                    <span role="img" aria-label="smile">🙂</span>
                  )}
                </div>
              )}
              {toggle.id === 11 && (
                <div className={`toggle-11-actual ${toggleStates[index] ? 'active' : ''}`} style={{position: 'relative', width: 100, height: 40, borderRadius: 20, background: '#f9fafb', overflow: 'hidden'}}>
                  {/* Confetti: burst of confetti when toggled on */}
                  {toggleStates[index] && (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: [-10 - Math.random()*20, 40 + Math.random()*20], opacity: [1, 0] }}
                          transition={{ duration: 1.2, delay: i * 0.05 }}
                          style={{
                            position: 'absolute',
                            left: `${8 + i * 7}%`,
                            top: 10,
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            background: `hsl(${i * 30}, 80%, 60%)`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 18 }}>🎊</span>
                </div>
              )}
              {toggle.id === 12 && (
                <div className={`toggle-12-actual ${toggleStates[index] ? 'active' : ''}`} style={{position: 'relative', width: 100, height: 40, borderRadius: 20, background: toggleStates[index] ? '#232526' : '#111', overflow: 'hidden'}}>
                  {/* Firefly Night: animated fireflies when active */}
                  {toggleStates[index] && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5, x: 10 + i*12, y: 20 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [10 + i*12, 80 - i*10], y: [20, 5 + Math.random()*20, 30] }}
                          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.3 }}
                          style={{
                            position: 'absolute',
                            width: 8,
                            height: 8,
                            borderRadius: 8,
                            background: 'radial-gradient(circle, #fff700 60%, #fff0 100%)',
                            boxShadow: '0 0 8px 2px #fff700',
                          }}
                        />
                      ))}
                    </>
                  )}
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 18 }}>🌙</span>
                </div>
              )}
            </div>
            <p className="text-sm text-center text-[var(--secondary-text)] mt-3">{toggle.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
// End of CreativeTogglesSectionContent

export const CompleteUIShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  
  // Enhanced navigation state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Simulate progress for new progress indicators
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced sections with metadata
  const sections: EnhancedSection[] = [
    { 
      id: 'hero', 
      name: 'Hero Sections', 
      icon: <Zap className="w-4 h-4" />,
      category: 'essentials',
      description: 'Eye-catching landing page sections',
      metadata: {
        difficulty: 'beginner',
        estimatedTime: '15 minutes',
        useCase: ['landing-page', 'portfolio', 'marketing'],
        dependencies: ['framer-motion'],
        accessibility: 'excellent',
        responsive: true,
        popular: true,
        new: false
      }
    },
    { 
      id: 'design-languages', 
      name: 'Design Languages', 
      icon: <Palette className="w-4 h-4" />,
      category: 'essentials',
      description: 'Complete design system showcases with 14 unique styles',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '45 minutes',
        useCase: ['branding', 'portfolio', 'showcase', 'inspiration'],
        dependencies: ['tailwind', 'lucide-react'],
        accessibility: 'excellent',
        responsive: true,
        popular: true,
        new: true
      }
    },
    { 
      id: 'cards', 
      name: 'Card Designs', 
      icon: <Grid className="w-4 h-4" />,
      category: 'essentials',
      description: 'Flexible content containers',
      metadata: {
        difficulty: 'beginner',
        estimatedTime: '10 minutes',
        useCase: ['dashboard', 'portfolio', 'e-commerce'],
        dependencies: ['tailwind'],
        accessibility: 'excellent',
        responsive: true,
        popular: true,
        new: false
      }
    },
    { 
      id: 'navigation', 
      name: 'Navigation Bars', 
      icon: <Menu className="w-4 h-4" />,
      category: 'essentials',
      description: 'Website navigation components',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '25 minutes',
        useCase: ['website', 'dashboard', 'mobile-app'],
        dependencies: ['react-router', 'framer-motion'],
        accessibility: 'excellent',
        responsive: true,
        popular: true,
        new: false
      }
    },
    { 
      id: 'forms', 
      name: 'Form Elements', 
      icon: <Edit className="w-4 h-4" />,
      category: 'essentials',
      description: 'Interactive form components',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '20 minutes',
        useCase: ['contact', 'registration', 'checkout'],
        dependencies: ['react-hook-form'],
        accessibility: 'excellent',
        responsive: true,
        popular: true,
        new: false
      }
    },
    { 
      id: 'modals', 
      name: 'Modals & Popups', 
      icon: <Bell className="w-4 h-4" />,
      category: 'interactive',
      description: 'Overlay dialogs and notifications',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '30 minutes',
        useCase: ['notifications', 'confirmations', 'details'],
        dependencies: ['framer-motion', 'focus-trap'],
        accessibility: 'good',
        responsive: true,
        popular: true,
        new: false
      }
    },
    { 
      id: 'login-layouts', 
      name: 'Login Layouts', 
      icon: <User className="w-4 h-4" />,
      category: 'specialized',
      description: 'Authentication interface designs',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '35 minutes',
        useCase: ['authentication', 'dashboard', 'saas'],
        dependencies: ['react-hook-form', 'validation'],
        accessibility: 'excellent',
        responsive: true,
        popular: false,
        new: false
      }
    },
    { 
      id: 'preloaders', 
      name: 'Preloaders', 
      icon: <Loader className="w-4 h-4" />,
      category: 'specialized',
      description: 'Loading animations and indicators',
      metadata: {
        difficulty: 'beginner',
        estimatedTime: '10 minutes',
        useCase: ['loading', 'feedback', 'transitions'],
        dependencies: ['css-animations'],
        accessibility: 'good',
        responsive: true,
        popular: false,
        new: false
      }
    },
    { 
      id: 'footers', 
      name: 'Footer Designs', 
      icon: <Mail className="w-4 h-4" />,
      category: 'specialized',
      description: 'Website footer components',
      metadata: {
        difficulty: 'beginner',
        estimatedTime: '15 minutes',
        useCase: ['website', 'newsletter', 'links'],
        dependencies: ['react-router'],
        accessibility: 'excellent',
        responsive: true,
        popular: false,
        new: false
      }
    },
    { 
      id: 'creative-toggles', 
      name: 'Creative Toggles', 
      icon: <ToggleRight className="w-4 h-4" />,
      category: 'interactive',
      description: 'Animated theme and state toggles',
      metadata: {
        difficulty: 'advanced',
        estimatedTime: '45 minutes',
        useCase: ['theme-switching', 'settings', 'creative'],
        dependencies: ['css-animations', 'state-management'],
        accessibility: 'good',
        responsive: true,
        popular: false,
        new: true
      }
    },
    { 
      id: 'cursors', 
      name: 'Custom Cursors', 
      icon: <Eye className="w-4 h-4" />,
      category: 'experimental',
      description: 'Interactive cursor effects',
      metadata: {
        difficulty: 'advanced',
        estimatedTime: '40 minutes',
        useCase: ['creative', 'portfolio', 'interactive'],
        dependencies: ['mouse-events', 'animations'],
        accessibility: 'needs-improvement',
        responsive: false,
        popular: false,
        new: false
      }
    },
    { 
      id: 'misc', 
      name: 'Miscellaneous', 
      icon: <Star className="w-4 h-4" />,
      category: 'experimental',
      description: 'Various experimental components',
      metadata: {
        difficulty: 'intermediate',
        estimatedTime: '20 minutes',
        useCase: ['various', 'experimental', 'utility'],
        dependencies: ['various'],
        accessibility: 'good',
        responsive: true,
        popular: false,
        new: false
      }
    }
  ];

  // Filter sections based on search and filters
  const filteredSections = sections.filter(section => {
    const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.metadata.useCase.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || section.metadata.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const addNotification = () => {
    const id = Date.now();
    setNotifications(prev => [...prev, id]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== id));
    }, 3000);
  };

  const toggleFavorite = (sectionId: string) => {
    setFavorites(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories', count: sections.length },
    { id: 'essentials', name: 'Essentials', count: sections.filter(s => s.category === 'essentials').length },
    { id: 'interactive', name: 'Interactive', count: sections.filter(s => s.category === 'interactive').length },
    { id: 'specialized', name: 'Specialized', count: sections.filter(s => s.category === 'specialized').length },
    { id: 'experimental', name: 'Experimental', count: sections.filter(s => s.category === 'experimental').length }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  return (
    <div className={`complete-ui-showcase min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black ${activeSection === 'cursors' ? 'custom-cursor-active' : ''}`}>
      {/* Custom Cursor Preview */}
      {activeSection === 'cursors' && (
        <>
          <div 
            className="custom-cursor fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
            style={{ 
              left: cursorPosition.x - 16, 
              top: cursorPosition.y - 16,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
          </div>
          {/* Cursor trail effect */}
          <div 
            className="custom-cursor-trail fixed w-6 h-6 pointer-events-none z-40"
            style={{ 
              left: cursorPosition.x - 12, 
              top: cursorPosition.y - 12,
              opacity: 0.5,
              transition: 'all 0.3s ease-out'
            }}
          >
            <div className="w-full h-full bg-purple-400 rounded-full blur-sm"></div>
          </div>
          <div 
            className="custom-cursor-trail-2 fixed w-4 h-4 pointer-events-none z-30"
            style={{ 
              left: cursorPosition.x - 8, 
              top: cursorPosition.y - 8,
              opacity: 0.3,
              transition: 'all 0.5s ease-out'
            }}
          >
            <div className="w-full h-full bg-pink-400 rounded-full blur-md"></div>
          </div>
        </>
      )}

      {/* Enhanced Header with Search and Filters */}
      {/* Sticks below the site navigation (mobile header ~72px, desktop nav pill ~88px) */}
      <header className="sticky top-20 lg:top-24 z-40 rounded-2xl bg-[var(--color-bg-card)]/95 backdrop-blur-lg border border-[var(--color-border)]">
        <div className="container mx-auto px-4 py-4">
          {/* Main header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                UI Component Library
              </h1>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-muted)]">
                  {filteredSections.length} components
                </span>
                {favorites.length > 0 && (
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full dark:bg-red-900/20 dark:text-red-400">
                    {favorites.length} favorites
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="relative hidden md:block">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                  aria-label="Search components by name, description, or use case"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'hover:bg-[var(--color-hover-bg)]'}`}
                aria-label="Toggle filters"
                aria-expanded={showFilters}
              >
                <Filter className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--color-hover-bg)]"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-[var(--color-text-primary)]"
              />
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-[var(--color-text-primary)]"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-[var(--color-text-primary)]"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Quick Filters */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Quick Filters
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const popularSections = sections.filter(s => s.metadata.popular);
                        if (popularSections.length > 0) {
                          setActiveSection(popularSections[0].id);
                        }
                      }}
                      className="px-3 py-1 text-xs bg-[var(--accent-light)] text-[var(--accent-primary)] rounded-full hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      Popular
                    </button>
                    <button
                      onClick={() => {
                        const newSections = sections.filter(s => s.metadata.new);
                        if (newSections.length > 0) {
                          setActiveSection(newSections[0].id);
                        }
                      }}
                      className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors"
                    >
                      New
                    </button>
                    {favorites.length > 0 && (
                      <button
                        onClick={() => setActiveSection(favorites[0])}
                        className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                      >
                        Favorites
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {filteredSections.map(section => {
                const isActive = activeSection === section.id;
                const isFavorite = favorites.includes(section.id);
                
                return (
                  <div key={section.id} className="relative flex-shrink-0">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all magnetic cursor-interactive ${
                        isActive
                          ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold shadow-sm' 
                          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-hover-bg)] hover:text-[var(--color-text-primary)]'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {section.icon}
                      <span className="text-sm font-medium">{section.name}</span>
                      {section.metadata.new && (
                        <span className="ml-1 w-2 h-2 bg-green-500 rounded-full" aria-label="New component"></span>
                      )}
                      {section.metadata.popular && (
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-label="Popular component" />
                      )}
                    </button>
                    
                    {/* Favorite Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(section.id);
                      }}
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-colors magnetic cursor-interactive ${
                        isFavorite 
                          ? 'bg-red-500 text-white' 
                          : 'bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-red-500'
                      }`}
                      aria-label={isFavorite ? `Remove ${section.name} from favorites` : `Add ${section.name} to favorites`}
                    >
                      <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-[var(--color-bg-card)] shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Components</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-2 hover:bg-[var(--color-hover-bg)] rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Filters */}
              <div className="mb-6 space-y-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)]"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Component List */}
              <div className="space-y-2">
                {filteredSections.map(section => {
                  const isActive = activeSection === section.id;
                  const isFavorite = favorites.includes(section.id);
                  
                  return (
                    <div key={section.id} className="relative">
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex flex-col w-full p-3 rounded-lg text-left transition-all ${
                          isActive 
                            ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' 
                            : 'hover:bg-[var(--color-hover-bg)] text-[var(--color-text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {section.icon}
                          <span className="font-medium">{section.name}</span>
                          {section.metadata.new && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                          {section.metadata.popular && (
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          )}
                        </div>
                        
                        <p className="text-xs text-[var(--color-text-muted)] mb-2">
                          {section.description}
                        </p>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(section.metadata.difficulty)}`}>
                            {section.metadata.difficulty}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {section.metadata.estimatedTime}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getAccessibilityColor(section.metadata.accessibility)}`}>
                            {section.metadata.accessibility === 'needs-improvement' ? 'A11y: Fair' : `A11y: ${section.metadata.accessibility}`}
                          </span>
                        </div>
                      </button>
                      
                      {/* Mobile Favorite Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(section.id);
                        }}
                        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isFavorite 
                            ? 'bg-red-500 text-white' 
                            : 'bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {filteredSections.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[var(--color-text-muted)]">No components match your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                    }}
                    className="mt-2 text-[var(--accent-primary)] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 mt-24">
        {/* 
          Sections are rendered in order of popularity and usefulness:
          1. Hero Sections - Highest visual impact, first impression maker
          2. Card Designs - Most commonly used in modern web design
          3. Navigation Bars - Essential for every website, high practical value
          4. Form Elements - Critical for user interaction
          5. Modals & Popups - High user engagement, important UX flows
          6. Login Layouts - Important but specialized authentication UX
          7. Preloaders - Enhances UX, shows attention to detail
          8. Footer Designs - Necessary but lower visual priority
          9. Creative Toggles - Cool but niche appeal
          10. Custom Cursors - Fun novelty, often unnecessary
          11. Miscellaneous - Catch-all category
        */}
        {activeSection === 'preloaders' && (
          <section className="space-y-8">
            <ComponentMetadataDisplay section={sections.find(s => s.id === 'preloaders')!} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Existing Preloaders - Keeping all of them */}
              {/* Spinner Variations */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Classic Spinner</p>
              </div>

              {/* Dot Pulse */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm font-medium">Bouncing Dots</p>
              </div>

              {/* Bar Wave */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-12 bg-blue-500 animate-wave-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm font-medium">Wave Bars</p>
              </div>

              {/* Morphing Shapes */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 animate-morph"></div>
                <p className="text-sm font-medium">Morphing Shape</p>
              </div>

              {/* DNA Helix */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border-4 border-cyan-400 rounded-full animate-ping animation-delay-200"></div>
                  <div className="absolute inset-4 bg-cyan-300 rounded-full"></div>
                </div>
                <p className="text-sm font-medium">Ripple Effect</p>
              </div>

              {/* Progress Circle */}
              <div className="flex flex-col items-center space-y-4">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle 
                    cx="32" cy="32" r="28" 
                    stroke="#8B5CF6" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray="176"
                    strokeDashoffset="44"
                    className="animate-progress-circle"
                  />
                </svg>
                <p className="text-sm font-medium">Progress Circle</p>
              </div>

              {/* Skeleton Screen */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
                <p className="text-sm font-medium">Skeleton</p>
              </div>

              {/* Custom Logo Loader */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-rotate-scale"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">UI</div>
                </div>
                <p className="text-sm font-medium">Logo Loader</p>
              </div>

              {/* NEW: Infinity Loader */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-8">
                  <svg viewBox="0 0 64 32" className="w-full h-full">
                    <path 
                      d="M16 8 C 24 0, 40 0, 48 8 S 56 24, 48 24 C 40 32, 24 32, 16 24 S 0 8, 16 8"
                      fill="none"
                      stroke="url(#infinityGradient)"
                      strokeWidth="4"
                      strokeDasharray="200"
                      className="animate-draw-infinity"
                    />
                    <defs>
                      <linearGradient id="infinityGradient">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-sm font-medium">Infinity Loop</p>
              </div>

              {/* NEW: Clock Loader */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="w-16 h-16 border-4 border-gray-300 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-6 bg-purple-600 rounded-full animate-clock-hand" style={{ transformOrigin: 'center bottom' }}></div>
                    <div className="w-1 h-4 bg-pink-600 rounded-full animate-clock-hand-fast" style={{ transformOrigin: 'center bottom' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium">Clock Spinner</p>
              </div>

              {/* NEW: Glitch Text Loader */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="text-2xl font-bold text-purple-600 animate-glitch">Loading</div>
                  <div className="absolute inset-0 text-2xl font-bold text-pink-600 animate-glitch-2 opacity-50">Loading</div>
                </div>
                <p className="text-sm font-medium">Glitch Text</p>
              </div>

              {/* NEW: Particle Orbit */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-2 bg-purple-600 rounded-full z-10"></div>
                  <div className="absolute inset-0 animate-spin">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-3 h-3 bg-pink-500 rounded-full"
                        style={{ 
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 120}deg) translateX(24px) translateY(-6px)`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium">Particle Orbit</p>
              </div>
            </div>

            {/* Best Practices */}
            <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Best Practices for Preloaders</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Keep animations smooth and lightweight (under 3 seconds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Use skeleton screens for content-heavy pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Match loader style with brand identity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Provide progress indication for long operations</span>
                </li>
              </ul>
            </div>
          </section>
        )}
        {activeSection === 'navigation' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Navigation Bars</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Effective navigation is crucial for user experience. It should be intuitive, 
                accessible, and responsive across all devices.
              </p>
            </div>

            {/* Existing Navigation Bars - Keeping all */}
            {/* Classic Navbar */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Classic Navigation</h3>
              <nav className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-xl font-bold">Logo</span>
                    <div className="hidden md:flex items-center gap-6">
                      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">Home</a>
                      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">About</a>
                      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">Services</a>
                      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">Contact</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Search size={16} className="w-5 h-5 text-gray-600" />
                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </nav>
            </div>

            {/* Centered Logo Nav */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Centered Logo</h3>
              <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-purple-200 transition-colors">Shop</a>
                    <a href="#" className="hover:text-purple-200 transition-colors">Collections</a>
                  </div>
                  <span className="text-2xl font-bold">BRAND</span>
                  <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-purple-200 transition-colors">About</a>
                    <a href="#" className="hover:text-purple-200 transition-colors">Contact</a>
                  </div>
                </div>
              </nav>
            </div>

            {/* Mega Menu Preview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Mega Menu</h3>
              <nav className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 relative">
                <div className="flex items-center gap-8">
                  <span className="text-xl font-bold">MegaCorp</span>
                  <div className="group relative">
                    <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-purple-600">
                      Products <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Software</h4>
                          <ul className="space-y-1 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Analytics</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">CRM</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Marketing</a></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hardware</h4>
                          <ul className="space-y-1 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Devices</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Accessories</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Support</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Solutions</a>
                  <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Pricing</a>
                </div>
              </nav>
            </div>

            {/* NEW: Floating Action Nav */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Floating Action Navigation</h3>
              <nav className="relative h-20">
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl">
                  <div className="flex items-center gap-6">
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Home className="w-5 h-5" />
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Search size={16} className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6" />
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <User className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* NEW: Sidebar Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Vertical Sidebar</h3>
              <div className="flex gap-4">
                <nav className="w-64 bg-gray-900 text-white rounded-lg p-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-600 text-white">
                        <Home className="w-5 h-5" />
                        <span>Overview</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <FileText className="w-5 h-5" />
                        <span>Documents</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <p className="text-gray-600 dark:text-gray-400">Content area</p>
                </div>
              </div>
            </div>

            {/* NEW: Tab Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tab Navigation</h3>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <nav className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex">
                    {['Profile', 'Settings', 'Billing', 'Notifications'].map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(index)}
                        className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                          activeTab === index 
                            ? 'border-purple-600 text-purple-600' 
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </nav>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">Tab content for {['Profile', 'Settings', 'Billing', 'Notifications'][activeTab]}</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Navigation Design Principles</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Keep navigation items to 7 or fewer for cognitive ease</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Use clear, descriptive labels avoiding jargon</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Ensure mobile responsiveness with hamburger menus</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Highlight current page/section for orientation</span>
                </li>
              </ul>
            </div>
          </section>
        )}
        {activeSection === 'cursors' && (
          <section className="space-y-8" id="cursors-section">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Custom Cursors</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Custom cursors add personality and enhance interactivity. They should be subtle, 
                functional, and not interfere with usability.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Existing Cursor Examples - Enhanced */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-dot-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute w-4 h-4 bg-purple-600 rounded-full" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)',
                         boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Dot Cursor</span>
                </div>
                <h3 className="font-semibold mb-2">Minimal Dot</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clean and simple dot that follows mouse movement</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-blend-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute w-8 h-8 rounded-full mix-blend-difference bg-white" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)'
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Blend Mode</span>
                </div>
                <h3 className="font-semibold mb-2">Invert Cursor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uses mix-blend-mode for dynamic color inversion</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-magnetic-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute w-6 h-6 border-2 border-purple-600 rounded-full" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%) scale(1.5)',
                         transition: 'transform 0.3s ease'
                       }}>
                    <div className="absolute inset-2 bg-purple-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Interactive</span>
                </div>
                <h3 className="font-semibold mb-2">Magnetic Cursor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attracted to interactive elements with smooth animation</p>
              </div>

              {/* NEW: Trail Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-trail-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}
                         className="absolute w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                         style={{ 
                           top: '50%', 
                           left: `${40 + i * 5}%`, 
                           transform: 'translate(-50%, -50%)',
                           opacity: 1 - (i * 0.2),
                           scale: 1 - (i * 0.15)
                         }}>
                    </div>
                  ))}
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Trail Effect</span>
                </div>
                <h3 className="font-semibold mb-2">Comet Trail</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Leaves a fading trail as you move</p>
              </div>

              {/* NEW: Emoji Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-emoji-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute text-2xl" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%) rotate(-15deg)'
                       }}>
                    👆
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">👆 Emoji</span>
                </div>
                <h3 className="font-semibold mb-2">Emoji Cursor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fun emoji that changes based on context</p>
              </div>

              {/* NEW: Spotlight Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-spotlight-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/50">
                  <div className="absolute w-32 h-32 rounded-full"
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)',
                         background: 'radial-gradient(circle, transparent 30%, black 70%)',
                         boxShadow: '0 0 0 1000px rgba(0,0,0,0.5)'
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Spotlight</span>
                </div>
                <h3 className="font-semibold mb-2">Spotlight Effect</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Creates a spotlight that reveals content</p>
              </div>

              {/* NEW: Ripple Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-ripple-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute w-12 h-12 rounded-full border-2 border-blue-500 animate-ping" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)'
                       }}>
                  </div>
                  <div className="absolute w-8 h-8 rounded-full border-2 border-blue-400 animate-ping" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)',
                         animationDelay: '0.2s'
                       }}>
                  </div>
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)'
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Ripple</span>
                </div>
                <h3 className="font-semibold mb-2">Water Ripple</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Creates ripple effect on movement</p>
              </div>

              {/* NEW: Glow Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-glow-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute w-4 h-4 bg-white rounded-full" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)',
                         boxShadow: `
                           0 0 20px rgba(255, 255, 255, 0.8),
                           0 0 40px rgba(147, 51, 234, 0.6),
                           0 0 60px rgba(236, 72, 153, 0.4)
                         `
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Glow</span>
                </div>
                <h3 className="font-semibold mb-2">Neon Glow</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vibrant glow effect that follows cursor</p>
              </div>

              {/* NEW: Text Cursor */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 cursor-example hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="cursor-text-preview absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute text-xs font-bold text-purple-600" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -150%)'
                       }}>
                    CLICK
                  </div>
                  <div className="absolute w-1 h-6 bg-purple-600" 
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         transform: 'translate(-50%, -50%)'
                       }}>
                  </div>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium">Text</span>
                </div>
                <h3 className="font-semibold mb-2">Text Cursor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Displays contextual text near cursor</p>
              </div>
            </div>

            {/* Live Cursor Demo Area */}
            <div className="mt-12 bg-gray-900 rounded-xl p-8 relative overflow-hidden cursor-demo-area" 
                 style={{ minHeight: '300px' }}
                 onMouseMove={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const y = e.clientY - rect.top;
                   const cursor = e.currentTarget.querySelector('.demo-cursor') as HTMLElement;
                   if (cursor) {
                     cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
                     
                     // Check if hovering over interactive elements
                     const target = e.target as HTMLElement;
                     if (target.classList.contains('cursor-demo-btn') || target.closest('.cursor-demo-btn')) {
                       cursor.style.width = '40px';
                       cursor.style.height = '40px';
                       cursor.style.marginLeft = '-10px';
                       cursor.style.marginTop = '-10px';
                       cursor.style.background = 'rgba(236, 72, 153, 0.3)';
                       cursor.style.borderColor = '#ec4899';
                     } else if (target.classList.contains('cursor-demo-card') || target.closest('.cursor-demo-card')) {
                       cursor.style.width = '30px';
                       cursor.style.height = '30px';
                       cursor.style.marginLeft = '-5px';
                       cursor.style.marginTop = '-5px';
                       cursor.style.background = 'rgba(59, 130, 246, 0.3)';
                       cursor.style.borderColor = '#3b82f6';
                       cursor.style.borderRadius = '30%';
                     } else {
                       cursor.style.width = '20px';
                       cursor.style.height = '20px';
                       cursor.style.marginLeft = '0';
                       cursor.style.marginTop = '0';
                       cursor.style.background = 'rgba(147, 51, 234, 0.5)';
                       cursor.style.borderColor = '#9333ea';
                       cursor.style.borderRadius = '50%';
                     }
                   }
                 }}
                 onMouseLeave={(e) => {
                   const cursor = e.currentTarget.querySelector('.demo-cursor') as HTMLElement;
                   if (cursor) {
                     cursor.style.opacity = '0';
                   }
                 }}
                 onMouseEnter={(e) => {
                   const cursor = e.currentTarget.querySelector('.demo-cursor') as HTMLElement;
                   if (cursor) {
                     cursor.style.opacity = '1';
                   }
                 }}>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Cursor Demo</h3>
              <p className="text-gray-400 mb-8">Move your mouse around this area to see the cursor effect</p>
              
              {/* Demo Interactive Elements */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-demo-btn">
                  Hover Me
                </button>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-demo-btn">
                  Click Me
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-demo-btn">
                  Interact
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <div className="p-4 bg-gray-800 rounded-lg cursor-demo-card">
                  <h4 className="text-white font-semibold mb-2">Card Hover</h4>
                  <p className="text-gray-400 text-sm">The cursor adapts to different elements</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg cursor-demo-card">
                  <h4 className="text-white font-semibold mb-2">Interactive</h4>
                  <p className="text-gray-400 text-sm">Watch the cursor change on hover</p>
                </div>
              </div>

              {/* Custom Cursor that follows mouse in demo area */}
              <div 
                className="demo-cursor"
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(147, 51, 234, 0.5)',
                  border: '2px solid #9333ea',
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease-out',
                  mixBlendMode: 'screen',
                  top: 0,
                  left: 0,
                  opacity: 0
                }}
              />
            </div>

            {/* Implementation Tips */}
            <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Custom Cursor Guidelines</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Keep cursor size between 20-40 pixels for visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Ensure contrast with all backgrounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Add hover states for interactive elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Provide option to disable for accessibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Use CSS transforms for smooth performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Consider touch devices where cursors aren't visible</span>
                </li>
              </ul>
            </div>

            {/* Code Example */}
            <div className="mt-8 bg-gray-900 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">Implementation Example</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Basic Custom Cursor
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);
  
  return (
    <div 
      className="custom-cursor"
      style={{
        left: position.x - 10,
        top: position.y - 10,
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};`}</code>
              </pre>
            </div>
          </section>
        )}
        {activeSection === 'hero' && (
          <section className="space-y-8">
            <ComponentMetadataDisplay section={sections.find(s => s.id === 'hero')!} />

            {/* Hero Examples */}
            <div className="space-y-12">
              {/* Existing Heroes - Keeping all */}
              {/* Classic Hero */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
                <div className="max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">Welcome to the Future</h1>
                  <p className="text-xl mb-8 text-purple-100">Build amazing experiences with our comprehensive UI library</p>
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                      Get Started
                    </button>
                    <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Split Hero */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">Split Layout Hero</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Perfect for showcasing products with visual emphasis</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow self-start">
                      Explore Features
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-12 flex items-center justify-center">
                    <div className="w-48 h-48 bg-white/50 rounded-2xl animate-float"></div>
                  </div>
                </div>
              </div>

              {/* Video Background Hero */}
              <div className="relative bg-black rounded-2xl overflow-hidden h-96">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative z-10 h-full flex items-center justify-center text-center px-12">
                  <div>
                    <h2 className="text-5xl font-bold text-white mb-4">Immersive Experience</h2>
                    <p className="text-xl text-gray-300 mb-8">Video backgrounds create emotional connection</p>
                    <button className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2">
                      <Play className="w-5 h-5" /> Watch Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW: Animated Text Hero */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 text-white overflow-hidden">
                <div className="max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">
                    <span className="inline-block animate-slide-up">Create.</span>{' '}
                    <span className="inline-block animate-slide-up animation-delay-200">Design.</span>{' '}
                    <span className="inline-block animate-slide-up animation-delay-400">Inspire.</span>
                  </h1>
                  <p className="text-xl mb-8 text-gray-300 animate-fade-in animation-delay-600">
                    Transform your ideas into reality with powerful tools
                  </p>
                  <div className="flex gap-4 animate-fade-in animation-delay-800">
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                      Start Creating
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW: Parallax Hero */}
              <div className="relative bg-gradient-to-b from-indigo-900 to-purple-900 rounded-2xl overflow-hidden h-96">
                <div className="absolute inset-0">
                  {/* Parallax layers */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-float animation-delay-1000"></div>
                  </div>
                </div>
                <div className="relative z-10 h-full flex items-center justify-center text-center px-12">
                  <div>
                    <h2 className="text-5xl font-bold text-white mb-4">Depth & Motion</h2>
                    <p className="text-xl text-indigo-200 mb-8">Multi-layered parallax creates visual depth</p>
                    <button className="px-8 py-3 bg-white text-indigo-900 rounded-lg font-semibold hover:scale-105 transition-transform">
                      Explore Layers
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW: Minimal Hero */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-16">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                      New Release
                    </span>
                  </div>
                  <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    Less is More
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                    A minimalist approach to design that focuses on what truly matters. Clean, simple, powerful.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:scale-105 transition-transform">
                      Get Started
                    </button>
                    <button className="px-8 py-4 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="mt-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Hero Section Best Practices</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Keep headline concise and benefit-focused (6-12 words)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Include clear CTA buttons with contrasting colors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Use high-quality visuals that support your message</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Ensure text remains readable on all screen sizes</span>
                </li>
              </ul>
            </div>
          </section>
        )}
        {activeSection === 'forms' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Form Elements</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Well-designed forms improve conversion rates. Focus on clarity, 
                validation feedback, and reducing cognitive load.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Existing Form Elements - Keeping all */}
              {/* Modern Input Fields */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Modern Inputs</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder=" " 
                      className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <label className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm bg-white dark:bg-gray-900 px-1 pointer-events-none">
                      Floating Label
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Email with icon" 
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Submit
                  </button>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Interactive Elements</h3>
                
                {/* Toggle Switch */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Enable notifications</span>
                    <button className="relative w-14 h-8 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                      <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 transform"></span>
                    </button>
                  </div>

                  {/* Radio Buttons */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Plan</p>
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
                      <input type="radio" name="plan" className="w-4 h-4 text-purple-600" />
                      <span>Basic Plan</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-lg cursor-pointer">
                      <input type="radio" name="plan" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span>Pro Plan</span>
                    </label>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate Experience</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="text-2xl transition-colors"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</p>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-purple-500 transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-purple-500 transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW: Search & Filter Forms */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Search & Filters</h3>
                <div className="space-y-4">
                  {/* Search with suggestions */}
                  <div className="relative">
                    <input 
                      type="search" 
                      placeholder="Search products..." 
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 hidden">
                      <div className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">Recent search 1</div>
                      <div className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">Recent search 2</div>
                    </div>
                  </div>

                  {/* Date Range Picker */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Multi-select Dropdown */}
                  <div className="relative">
                    <button className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-purple-500 transition-colors">
                      <span>Select categories</span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW: File Upload Forms */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Advanced Uploads</h3>
                <div className="space-y-4">
                  {/* Image Upload with Preview */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drop images here or click to upload</p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Choose Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                  </div>

                  {/* Progress Upload */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">document.pdf</span>
                      <span className="text-purple-600">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'design-languages' && (
          <section className="space-y-8">
            <ComponentMetadataDisplay section={sections.find(s => s.id === 'design-languages')!} />
            <DesignLanguageShowcase />
          </section>
        )}
        {activeSection === 'cards' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Card Designs</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Cards organize content into digestible chunks. They should be scannable, 
                interactive, and maintain visual hierarchy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Existing Cards - Keeping all */}
              {/* Product Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -20%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Product Card</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for e-commerce with pricing and actions</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold">$79</span>
                      <span className="text-gray-500 line-through ml-2">$99</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Profile Card */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-blue-100">UI/UX Designer</p>
                  </div>
                </div>
                <p className="text-blue-50 mb-6">Creating beautiful digital experiences with attention to detail and user needs.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Analytics</h3>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">+12%</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Visitors</span>
                      <span className="font-semibold">8,420</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Conversions</span>
                      <span className="font-semibold">2,340</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-600 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold">$12,480</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW: Testimonial Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "This product has completely transformed how we work. Incredible results in just weeks!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">CEO at TechCorp</p>
                  </div>
                </div>
              </div>

              {/* NEW: Feature Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Optimized performance with sub-second load times
                </p>
                <a href="#" className="text-purple-600 font-medium hover:text-purple-700 transition-colors inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* NEW: Blog Post Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">Tutorial</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>March 15, 2024</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    Getting Started with Modern CSS
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Learn the latest CSS features and techniques for building modern interfaces...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">Alex Chen</span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'modals' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Modals & Popups</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Modals focus user attention on important tasks. Use them sparingly 
                and ensure they're easily dismissible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Existing Modals - Keeping all */}
              {/* Confirmation Modal */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Delete Item?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">This action cannot be undone. This will permanently delete your item and remove it from our servers.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              {/* Success Modal */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Success!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Your changes have been saved successfully.</p>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Continue
                  </button>
                </div>
              </div>

              {/* NEW: Feature Announcement Modal */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">New Features!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We've added amazing new capabilities to enhance your experience.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                      Later
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow">
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW: Newsletter Subscription Modal */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get the latest news and exclusive offers delivered to your inbox.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookie Banner */}
            <div className="mt-8 bg-gray-900 text-white rounded-lg p-6 max-w-4xl mx-auto">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">🍪 Cookie Notice</h4>
                  <p className="text-gray-300 text-sm">We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                    Decline
                  </button>
                  <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                    Accept
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: Notification Toasts */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Notification Toasts</h3>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={addNotification}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors self-start"
                >
                  Show Notification
                </button>
                
                {/* Notification Container */}
                <div className="fixed top-20 right-4 space-y-2 z-50">
                  {notifications.map((id) => (
                    <div
                      key={id}
                      className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 flex items-center gap-3 animate-slide-in-right min-w-[300px] border-l-4 border-green-500"
                    >
                      <Check className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">Success!</p>
                        <p className="text-sm text-gray-600">Action completed successfully.</p>
                      </div>
                      <button 
                        onClick={() => setNotifications(prev => prev.filter(n => n !== id))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'footers' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Footer Designs</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Footers provide crucial navigation and information. They should be 
                organized, accessible, and complement your site's design.
              </p>
            </div>

            {/* Existing Footers - Keeping all */}
            {/* Minimal Footer */}
            <footer className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">Logo</span>
                  <span className="text-gray-500">© 2024 All rights reserved</span>
                </div>
                <div className="flex gap-6">
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy</a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Terms</a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
                </div>
              </div>
            </footer>

            {/* Detailed Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-12">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Brand</h3>
                  <p className="text-gray-400">Creating amazing digital experiences for modern businesses.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Products</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Newsletter</h4>
                  <p className="text-gray-400 mb-4">Stay updated with our latest news</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Email" className="px-4 py-2 bg-gray-700 rounded-lg flex-1" />
                    <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8 flex items-center justify-between">
                <span className="text-gray-400">© 2024 Brand. All rights reserved.</span>
                <div className="flex gap-4">
                  {/* Social Icons */}
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </footer>

            {/* NEW: Modern Split Footer */}
            <footer className="bg-black text-white rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-12 bg-gradient-to-br from-purple-600 to-pink-600">
                  <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
                  <p className="text-purple-100 mb-6">Join thousands of satisfied customers today.</p>
                  <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Start Free Trial
                  </button>
                </div>
                <div className="p-12">
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold mb-4">Quick Links</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Support</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </footer>

            {/* NEW: Centered Footer */}
            <footer className="bg-gray-50 dark:bg-gray-900 rounded-lg p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Follow us on social media for updates, tips, and community highlights.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                  {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                    <button
                      key={social}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {social}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                  <p className="text-sm text-gray-500">
                    © 2024 Your Company. Made with ❤️ by the team.
                  </p>
                </div>
              </div>
            </footer>
          </section>
        )}
        {activeSection === 'creative-toggles' && <CreativeTogglesSectionContent />}
        {activeSection === 'login-layouts' && ( 
          <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, right:0, bottom:0, zIndex: 2000, background: 'var(--primary-bg, white)', overflow: 'auto' }}>
            <LoginLayoutsShowcase />
          </div>
        )}
        {activeSection === 'misc' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Additional UI Elements</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Complete your UI toolkit with these essential components for 
                enhanced user interaction and feedback.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Existing Miscellaneous Items - Keeping all */}
              {/* Tooltips */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Tooltips</h3>
                <div className="flex gap-4 justify-center">
                  <div className="relative group">
                    <button className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Info className="w-5 h-5 text-purple-600" />
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                      Helpful information
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Badges & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">New</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Important</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">Premium</span>
                </div>
              </div>

              {/* Breadcrumbs */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Breadcrumbs</h3>
                <nav className="flex items-center gap-2 text-sm">
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Home</a>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Products</a>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100 font-medium">UI Kit</span>
                </nav>
              </div>

              {/* Pagination */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Pagination</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-purple-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">2</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">3</button>
                  <span className="px-2">...</span>
                  <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">10</button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Accordions */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Accordion</h3>
                <div className="space-y-2">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <span className="font-medium">What is this?</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="border border-purple-500 rounded-lg">
                    <button className="w-full px-4 py-3 flex items-center justify-between bg-purple-50 dark:bg-purple-900/20">
                      <span className="font-medium text-purple-700 dark:text-purple-400">Features</span>
                      <ChevronUp className="w-5 h-5 text-purple-700 dark:text-purple-400" />
                    </button>
                    <div className="px-4 py-3 border-t border-purple-200 dark:border-purple-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive list of features...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">File Upload</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Drag & drop files here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>

              {/* NEW: Progress Steps */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Progress Steps</h3>
                <div className="relative">
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300"></div>
                  <div className="absolute top-5 left-0 w-2/3 h-0.5 bg-purple-600"></div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">1</div>
                      <span className="text-xs mt-2">Start</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">2</div>
                      <span className="text-xs mt-2">Process</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">3</div>
                      <span className="text-xs mt-2">Complete</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW: Avatar Groups */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Avatar Groups</h3>
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">A</div>
                  <div className="w-10 h-10 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">B</div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">C</div>
                  <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 font-semibold text-sm">+5</div>
                </div>
              </div>

              {/* NEW: Code Blocks */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Code Block</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-400">{`// Example code`}</div>
                  <div className="text-purple-400">{`const`} <span className="text-white">greeting</span> <span className="text-gray-400">=</span> <span className="text-green-400">"Hello"</span><span className="text-gray-400">;</span></div>
                  <div className="text-blue-400">{`console`}<span className="text-gray-400">.</span><span className="text-yellow-400">log</span><span className="text-gray-400">(</span><span className="text-white">greeting</span><span className="text-gray-400">);</span></div>
                </div>
              </div>

              {/* NEW: Timeline */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg col-span-full">
                <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                <div className="space-y-4">
                  {['Event 1', 'Event 2', 'Event 3'].map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                        {index < 2 && <div className="w-0.5 h-16 bg-gray-300"></div>}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold">{event}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Description of the event goes here.</p>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompleteUIShowcase;
