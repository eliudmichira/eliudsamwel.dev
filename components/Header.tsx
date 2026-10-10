import React, { useState, useEffect, useRef } from 'react';
import { NavLinkItem } from '../types';
import { ThemeToggle } from './ThemeToggle';
import '../styles/header.css'; // Import the new CSS file

interface HeaderProps {
  navLinks: NavLinkItem[];
  onNavLinkClick: (pageId: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navLinks, onNavLinkClick, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll effect (simplified, only for scrolled state if needed elsewhere, or remove if not)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if on mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleLinkClick = (pageId: string) => {
    onNavLinkClick(pageId);
    closeMobileMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        closeMobileMenu();
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation - Redesigned */}
      <nav 
        ref={navRef}
        className={`fixed top-6 sm:top-8 left-1/2 transform -translate-x-1/2 z-[1000] 
                   hidden lg:block`}
      >
        {/* Main Navbar Container */}
        <div className="lifted pill backdrop-blur-xl px-3 py-2">
          
          <ul className="flex list-none items-center gap-1 relative z-10">
            {navLinks.map((link) => (
              <li key={link.pageId}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.pageId); }}
                  className={`group relative block px-4 py-2 rounded-full magnetic cursor-interactive
                             transition-all duration-300 ease-out text-sm font-medium
                             ${link.current
                                 ? 'text-[var(--color-text)] dark:text-[var(--color-text)]'
                                 : 'text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary)] hover:text-[var(--color-text)] dark:hover:text-[var(--color-text)]'
                             }`}
                  aria-current={link.current ? 'page' : undefined}
                >
                  <span className={`absolute inset-0 rounded-full transition-all duration-300 ease-out
                                   ${link.current 
                                       ? 'bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card)] shadow-sm opacity-100 scale-100'
                                       : 'opacity-0 scale-95 group-hover:bg-[var(--color-hover-bg)] dark:group-hover:bg-[var(--color-hover-bg)] group-hover:opacity-100 group-hover:scale-100'
                                   }`}></span>
                  
                  <span className="relative z-10 block">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Header with glassmorphism - Updated light theme background gradient */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-[1000] px-3 sm:px-4 
                         backdrop-blur-xl 
                         bg-gradient-to-r from-[var(--color-bg-card)]/95 via-[var(--color-bg-surface)]/90 to-[var(--color-bg-card)]/95 
                         dark:bg-[var(--color-bg-base)]/80
                         border-b border-[var(--color-border)]/30 dark:border-[var(--color-border)]/30
                         transition-all duration-300 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}>
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Left Section: Logo - Takes 1/3 space */}
          <div className="flex-1 flex justify-start">
            <a
              href="#About"
              onClick={(e) => { e.preventDefault(); handleLinkClick('About');}}
              className="text-base sm:text-lg md:text-xl font-black flex items-center space-x-1 group min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <span className="text-[var(--color-text)] dark:text-[var(--color-text)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-nav-active-start)] group-hover:to-[var(--color-nav-active-end)] transition-all duration-300">EliudSamwel</span>
              <span className="bg-gradient-to-r from-[var(--color-nav-active-start)] to-[var(--color-nav-active-end)] bg-clip-text text-transparent">.dev</span>
            </a>
          </div>
          
          {/* Right Section: Animated menu button - Takes 1/3 space and pushes content to end */}
          <div className="flex-1 flex justify-end">
            <button
              ref={menuButtonRef}
              id="mobile-menu-button"
              className="lifted pill relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 magnetic cursor-interactive touch-manipulation"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-5 relative">
                <span className={`absolute left-0 w-full h-0.5 bg-[var(--color-text)] dark:bg-[var(--color-text)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
                <span className={`absolute left-0 top-2 w-full h-0.5 bg-[var(--color-text)] dark:bg-[var(--color-text)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-[var(--color-text)] dark:bg-[var(--color-text)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Modern Full Screen with animations */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[999] lg:hidden flex justify-end ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop for the main content area */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMobileMenu}
        />
        
        {/* Drawer Container */}
        <div 
          className={`relative w-4/5 max-w-sm h-full bg-[var(--color-bg-base)] dark:bg-[var(--color-bg-base)] shadow-xl flex flex-col transition-transform duration-300 ease-in-out transform 
                     ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Animated background elements (optional for drawer) */}
          <div className="absolute inset-0 overflow-hidden opacity-50">
            <div className={`absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-nav-active-end)]/30 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
            <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--color-nav-active-start)]/30 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-700 delay-100 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
          </div>
        
          {/* Menu content */}
          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-[var(--color-text)] dark:text-[var(--color-text)]">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="lifted pill w-11 h-11 flex items-center justify-center text-[var(--color-text)] touch-manipulation"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1">
              <ul className="flex flex-col space-y-2 w-full">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.pageId}
                    className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`}
                    style={{ transitionDelay: `${isMobileMenuOpen ? (index * 70) + 100 : 0}ms` }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleLinkClick(link.pageId); }}
                      className={`block w-full px-6 py-4 text-left min-h-[56px] flex items-center touch-manipulation pill
                                 ${link.current
                                     ? 'lifted-primary font-black tracking-tight'
                                     : 'lifted text-[var(--color-text-secondary)]'
                                 }`}
                      aria-current={link.current ? 'page' : undefined}
                    >
                      <span className="text-lg font-medium tracking-wide">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Social links or additional info */}
            <div className={`mt-auto pb-8 pt-6 w-full transform transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                 style={{ transitionDelay: `${isMobileMenuOpen ? (navLinks.length * 70) + 200 : 0}ms` }}>
              <p className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted)] text-sm text-center">Eliud Samwel © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Only show ThemeToggle on desktop */}
      {!isMobile && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
};
