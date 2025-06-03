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
        <div className={`relative backdrop-blur-xl 
                        bg-gradient-to-r from-[var(--color-bg-card)]/60 via-[var(--color-bg-surface)]/40 to-[var(--color-bg-card)]/60 
                        dark:bg-gradient-to-r dark:from-[var(--color-bg-card)]/50 dark:via-[var(--color-bg-surface)]/30 dark:to-[var(--color-bg-card)]/50 
                        border border-white/30 dark:border-white/20 
                        rounded-full px-3 py-2 shadow-lg`}>
          
          <ul className="flex list-none items-center gap-1 relative z-10">
            {navLinks.map((link) => (
              <li key={link.pageId}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.pageId); }}
                  className={`group relative block px-4 py-2 rounded-full 
                             transition-all duration-300 ease-out text-sm font-medium
                             ${link.current
                                 ? 'text-neutral-900 dark:text-neutral-100'
                                 : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                             }`}
                  aria-current={link.current ? 'page' : undefined}
                >
                  <span className={`absolute inset-0 rounded-full transition-all duration-300 ease-out
                                   ${link.current 
                                       ? 'bg-white dark:bg-neutral-700 shadow-sm opacity-100 scale-100'
                                       : 'opacity-0 scale-95 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/50 group-hover:opacity-100 group-hover:scale-100'
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
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-[1000] p-4 
                         backdrop-blur-xl 
                         bg-gradient-to-r from-[var(--color-bg-card)]/95 via-[var(--color-bg-surface)]/90 to-[var(--color-bg-card)]/95 
                         dark:bg-black/70
                         border-b border-black/10 dark:border-white/5
                         transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex justify-between items-center w-full">
          {/* Left Section: Logo - Takes 1/3 space */}
          <div className="flex-1 flex justify-start">
            <a
              href="#About"
              onClick={(e) => { e.preventDefault(); handleLinkClick('About');}}
              className="text-lg sm:text-xl font-black flex items-center space-x-1 group"
            >
              <span className="text-[var(--color-text)] dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-nav-active-start)] group-hover:to-[var(--color-nav-active-end)] transition-all duration-300">EliudSamwel</span>
              <span className="bg-gradient-to-r from-[var(--color-nav-active-start)] to-[var(--color-nav-active-end)] bg-clip-text text-transparent">.dev</span>
            </a>
          </div>
          
          {/* Right Section: Animated menu button - Takes 1/3 space and pushes content to end */}
          <div className="flex-1 flex justify-end">
            <button
              ref={menuButtonRef}
              id="mobile-menu-button"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 flex-shrink-0"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 relative">
                <span className={`absolute left-0 w-full h-0.5 bg-[var(--color-text)] dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}></span>
                <span className={`absolute left-0 top-1.5 w-full h-0.5 bg-[var(--color-text)] dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-[var(--color-text)] dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}></span>
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
          className={`relative w-4/5 max-w-sm h-full bg-[var(--color-bg-base)] dark:bg-neutral-900 shadow-xl flex flex-col transition-transform duration-300 ease-in-out transform 
                     ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Animated background elements (optional for drawer) */}
          <div className="absolute inset-0 overflow-hidden opacity-50">
            <div className={`absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-nav-active-end)]/30 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
            <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--color-nav-active-start)]/30 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-700 delay-100 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
          </div>
        
          {/* Menu content */}
          <div className="relative h-full flex flex-col pt-16 sm:pt-20 z-10">
            {/* Close button inside drawer */}
            <div className="absolute top-4 right-4">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg className="w-6 h-6 text-[var(--color-text)] dark:text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow px-4">
              <ul className="flex flex-col space-y-3 w-full">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.pageId}
                    className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`}
                    style={{ transitionDelay: `${isMobileMenuOpen ? (index * 70) + 100 : 0}ms` }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleLinkClick(link.pageId); }}
                      className={`group relative block w-full px-6 py-4 rounded-xl text-left transition-all duration-300
                                 ${link.current
                                     ? 'bg-[var(--nav-active-gradient)] text-[var(--color-text-on-accent)] shadow-lg shadow-[var(--color-nav-active-start)]/20'
                                     : 'text-[var(--color-text-muted)] dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--color-text)] dark:hover:text-white'
                                 }`}
                      aria-current={link.current ? 'page' : undefined}
                    >
                      <span className="text-md font-medium tracking-wide">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social links or additional info */}
              <div className={`mt-auto pb-8 pt-6 w-full transform transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                   style={{ transitionDelay: `${isMobileMenuOpen ? (navLinks.length * 70) + 200 : 0}ms` }}>
                <p className="text-[var(--color-text-muted)] dark:text-gray-500 text-xs text-center">Eliud Samwel © {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Only show ThemeToggle on desktop */}
      {!isMobile && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
};