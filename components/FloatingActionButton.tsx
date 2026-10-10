import React, { JSX, useState, useEffect } from 'react';

interface FABProps {
  onNavigate: (pageId: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface FABMenuItem {
  id: string;
  label: string;
  pageId: string; // For App.tsx navigation state
  icon: JSX.Element;
  actionType: 'navigate' | 'function';
  actionValue?: string; // pageId for navigate, or function name
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const XIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// New Icons
const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ComponentLibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 16v-2m8-6h2M4 12H2m16.938 4.938l-1.414-1.414M5.062 6.5H6.5m12.5 12.5l-1.414-1.414M5.062 17.438L6.5 16M12 18a6 6 0 100-12 6 6 0 000 12zm0-3a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

// Theme toggle icon
const ThemeToggleIcon = ({ theme }: { theme: 'light' | 'dark' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    {theme === 'dark' ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    )}
  </svg>
);

export const FloatingActionButton: React.FC<FABProps> = ({ onNavigate, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const menuItems: FABMenuItem[] = [
    { id: 'fab-about', label: 'About', pageId: 'About', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, actionType: 'navigate' },
    { id: 'fab-resume', label: 'Resume', pageId: 'Resume', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, actionType: 'navigate' },
    { id: 'fab-projects', label: 'Projects', pageId: 'Projects', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, actionType: 'navigate' },
    { id: 'fab-blog', label: 'Blog', pageId: 'Blog', icon: <BlogIcon />, actionType: 'navigate' },
    { id: 'fab-contact', label: 'Contact', pageId: 'Contact', icon: <ContactIcon />, actionType: 'navigate' },
  ];

  // Add theme toggle for mobile only
  if (isMobile) {
    menuItems.push({ 
      id: 'fab-theme-toggle', 
      label: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 
      pageId: '', 
      icon: <ThemeToggleIcon theme={theme} />, 
      actionType: 'function', 
      actionValue: 'toggleTheme' 
    });
  }

  const handleFabClick = () => setIsOpen(!isOpen);
  const handleItemClick = (item: FABMenuItem) => {
    if (item.actionType === 'navigate') {
      onNavigate(item.pageId);
    } else if (item.actionType === 'function' && item.actionValue === 'toggleTheme') {
      toggleTheme();
    }
    setIsOpen(false);
  };

  // Desktop only: on smaller screens the header menu already covers these shortcuts
  return (
    <div className="hidden lg:block fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[999]">
      <div 
        className={`floating-menu absolute bottom-[calc(100%_+_10px)] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => handleItemClick(item)}
            className="lifted pill w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer text-[var(--accent-primary)] magnetic cursor-interactive"
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <button
        id="floating-action-button"
        onClick={handleFabClick}
        className="lifted-primary pill w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer magnetic cursor-interactive"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
      >
        {isOpen ? <XIcon/> : <PlusIcon/>}
      </button>
    </div>
  );
};
