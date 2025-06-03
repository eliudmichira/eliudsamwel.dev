import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaArrowUp } from 'react-icons/fa';

interface FooterProps {
  onNavLinkClick: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavLinkClick }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleInternalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    e.preventDefault();
    onNavLinkClick(pageId);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden pt-12 sm:pt-16 bg-transparent">
      {/* Animated background elements REMOVED */}
      {/* 
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ backgroundColor: 'var(--primary-orange)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" style={{ backgroundColor: 'var(--primary-amber)' }}></div>
        <div className="absolute top-20 left-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" style={{ backgroundColor: 'var(--accent-yellow)' }}></div>
      </div>
      */}

      {/* Glass morphism card for content remains */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl py-12 sm:py-16">
        <div className="backdrop-blur-md bg-[var(--card-bg)] dark:bg-white/5 rounded-3xl p-8 sm:p-12 border border-black/10 dark:border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-1">
            <a 
              href="#About"
              onClick={(e) => handleInternalLinkClick(e, 'About')}
                className="inline-block group"
                aria-label="Return to top of page"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-[var(--color-text)] dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:via-[var(--accent-secondary)] group-hover:to-[var(--accent-yellow)] transition-all duration-300">Eliud</span>
                  <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] bg-clip-text text-transparent">Samwel</span>
                </div>
              </a>
              <p className="text-[var(--color-text)] dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                Crafting digital experiences with passion and precision. Software Developer & Tech Innovator.
              </p>
              
              {/* Social links with hover effects */}
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/eliudmichira" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative p-3 bg-[var(--surface-raised)] dark:bg-white/5 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 hover:border-[var(--color-accent-start)]/50 hover:bg-[var(--color-accent-start)]/10 transition-all duration-300" 
                  aria-label="Visit Eliud's GitHub profile"
                >
                  <FaGithub className="h-5 w-5 text-[var(--color-text-muted)] dark:text-gray-400 group-hover:text-[var(--color-accent-start)] transition-colors" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--color-bg-surface)] dark:bg-gray-800 text-[var(--color-text)] dark:text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/eliudsamwel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative p-3 bg-[var(--surface-raised)] dark:bg-white/5 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 hover:border-[var(--color-accent-mid)]/50 hover:bg-[var(--color-accent-mid)]/10 transition-all duration-300" 
                  aria-label="Visit Eliud's LinkedIn profile"
                >
                  <FaLinkedin className="h-5 w-5 text-[var(--color-text-muted)] dark:text-gray-400 group-hover:text-[var(--color-accent-mid)] transition-colors" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--color-bg-surface)] dark:bg-gray-800 text-[var(--color-text)] dark:text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">LinkedIn</span>
                </a>
                <a 
                  href="https://x.com/mich_michira" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative p-3 bg-[var(--surface-raised)] dark:bg-white/5 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 hover:border-[var(--color-accent-end)]/50 hover:bg-[var(--color-accent-end)]/10 transition-all duration-300" 
                  aria-label="Visit Eliud's Twitter profile"
                >
                  <FaTwitter className="h-5 w-5 text-[var(--color-text-muted)] dark:text-gray-400 group-hover:text-[var(--color-accent-end)] transition-colors" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--color-bg-surface)] dark:bg-gray-800 text-[var(--color-text)] dark:text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">Twitter</span>
                </a>
                <a 
                  href="mailto:eliudmichira7@gmail.com" 
                  className="group relative p-3 bg-[var(--surface-raised)] dark:bg-white/5 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 hover:border-[var(--color-accent-mid)]/50 hover:bg-[var(--color-accent-mid)]/10 transition-all duration-300" 
                  aria-label="Email Eliud Michira"
                >
                  <FaEnvelope className="h-5 w-5 text-[var(--color-text-muted)] dark:text-gray-400 group-hover:text-[var(--color-accent-mid)] transition-colors" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--color-bg-surface)] dark:bg-gray-800 text-[var(--color-text)] dark:text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">Email</span>
                </a>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <h3 className="text-[var(--color-text)] dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#About" 
                      onClick={(e) => handleInternalLinkClick(e, 'About')} 
                      className="text-[var(--color-text-muted)] dark:text-gray-400 hover:text-[var(--color-text)] dark:hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="inline-block w-0 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#Resume" 
                      onClick={(e) => handleInternalLinkClick(e, 'Resume')} 
                      className="text-[var(--color-text-muted)] dark:text-gray-400 hover:text-[var(--color-text)] dark:hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="inline-block w-0 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      Resume
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[var(--color-text)] dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Work</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#Projects" 
                      onClick={(e) => handleInternalLinkClick(e, 'Projects')} 
                      className="text-[var(--color-text-muted)] dark:text-gray-400 hover:text-[var(--color-text)] dark:hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="inline-block w-0 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#Contact" 
                      onClick={(e) => handleInternalLinkClick(e, 'Contact')} 
                      className="text-[var(--color-text-muted)] dark:text-gray-400 hover:text-[var(--color-text)] dark:hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="inline-block w-0 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      Contact
                    </a>
                  </li>
                </ul>
          </div>
          
              <div className="sm:col-span-2">
                <h3 className="text-[var(--color-text)] dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h3>
                <p className="text-[var(--color-text)] dark:text-gray-400 text-sm mb-4">
                  Available for freelance projects and collaborations. Let's create something amazing together.
                </p>
                <a 
                  href="#Contact"
                  onClick={(e) => handleInternalLinkClick(e, 'Contact')}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] text-[var(--color-text-on-accent)] text-sm font-medium rounded-full hover:shadow-lg hover:shadow-[var(--color-accent-mid)]/25 transform hover:scale-105 transition-all duration-300"
                >
                  Start a Project
                </a>
              </div>
            </div>
        </div>
        
          {/* Copyright and back to top */}
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[var(--color-text-muted)] dark:text-gray-500 text-xs sm:text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Eliud Samwel Michira. All rights reserved.
          </p>
          
            {/* Back to top button */}
            {isVisible && (
              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 text-[var(--color-text-muted)] dark:text-gray-400 hover:text-[var(--color-text)] dark:hover:text-white transition-colors"
                aria-label="Scroll to top"
              >
                <span className="text-xs sm:text-sm">Back to top</span>
                <div className="p-2 bg-[var(--surface-raised)] dark:bg-white/5 backdrop-blur-sm rounded-lg border border-black/10 dark:border-white/10 group-hover:border-[var(--color-accent-mid)]/50 group-hover:bg-[var(--color-accent-mid)]/10 transition-all duration-300">
                  <FaArrowUp className="h-3 w-3" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};