import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import PageHeaderSection from './components/PageHeaderSection';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { useThemeManager } from './hooks/useThemeManager';
import { NavLinkItem } from './types';
import { ResumePage } from './components/resume/ResumePage';
import { ContactPage } from './components/contact/ContactPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { BlogPage } from './components/blog/BlogPage';
import { CompleteUIShowcase } from './src/components/showcase/CompleteUIShowcase';
import JourneyPage from './src/components/Journey/JourneyPage';
import './styles/theme.css';
import './styles/animations.css';
import { constellations, TimelineItem as JourneyTimelineItem } from './data/journeyData';
import { HashRouter as Router } from 'react-router-dom';

declare var particlesJS: any; 
declare var pJSDom: any; 

const initialNavLinksData: Omit<NavLinkItem, 'current'>[] = [
    { name: 'About', pageId: 'About', href: '#about' }, 
    { name: 'Resume', pageId: 'Resume', href: '#resume' },
    { name: 'Projects', pageId: 'Projects', href: '#projects' },
    { name: 'Blog', pageId: 'Blog', href: '#blog' },
    { name: 'Contact', pageId: 'Contact', href: '#contact' },
    { name: 'UI Showcase', pageId: 'UIShowcase', href: '#ui-showcase' },
];

// Consolidate timelineEventsData with JourneyTimelineItem structure
const consolidatedTimelineData: JourneyTimelineItem[] = [
    {
        id: 'bio',
        year: 'Ongoing',
        category: 'Experience',
        icon: '👤',
        title: 'About Me',
        location: 'Kenya',
        description: "I'm a passionate software developer from Kenya, focused on building efficient, scalable, and user-friendly applications. My experience spans web development, mobile platforms, and decentralized systems, with a strong emphasis on solving real-world problems using innovative tech solutions.",
        achievement: {
            title: '🌟 Core Values',
            text: 'Innovation through simplicity, clean and maintainable code, data-driven decision-making, ethical and user-focused development.',
        },
    },
    {
        id: 'experience',
        year: '2021',
        category: 'Experience',
        icon: '💼',
        title: 'Professional Experience',
        location: 'Neverest Ltd',
        description: "I interned at Neverest Ltd under TAWA INNOVATE LIMITED, where I contributed to the development of digital platforms like TinyPesa (a mobile payment solution) and UzaKitu (an e-commerce system for small businesses). My work improved usability, system performance, and analytics-driven decision-making.",
        achievement: {
            title: '🚀 Key Contributions',
            text: 'Enhanced user interfaces, integrated real-time updates, and built analytics dashboards for better business intelligence.',
        },
    },
    {
        id: 'projects',
        year: '2023',
        category: 'Project',
        icon: '🛠️',
        title: 'Notable Projects',
        location: 'Remote',
        description: "I'm the developer of a Decentralized Voting Management System, designed to promote trust and transparency in digital elections using blockchain technology. The system features voter authentication with JWT, eligibility checks via smart contract, real-time vote counting, and WebSocket integration for instant updates.",
        achievement: {
            title: '🏆 Project Impact',
            text: 'Created secure, transparent voting solutions that enhance trust in digital democratic processes.',
        },
    },
    {
        id: 'skills',
        year: 'Ongoing',
        category: 'Experience',
        icon: '💻',
        title: 'Tech Stack & Skills',
        location: 'Self-taught & Project-based',
        description: "My technical toolkit includes: Languages (JavaScript, Solidity, Python, SQL), Frontend (HTML, CSS, React.js), Backend (Node.js, Express.js, Flask), Blockchain (Ethereum, Truffle, Web3.js), Database (PostgreSQL, MongoDB), and various development tools.",
        achievement: {
            title: '📚 Continuous Learning',
            text: 'Constantly expanding my skills through self-directed learning and practical application in diverse projects.',
        },
    },
    {
        id: 'future',
        year: 'Present & Beyond',
        category: 'Experience',
        icon: '🔮',
        title: 'Looking Forward',
        location: 'Global',
        description: "I'm passionate about building solutions that make a real difference. I'm particularly interested in the intersection of blockchain and traditional web technologies, and I'm always open to new collaborations and learning opportunities.",
        achievement: {
            title: '🌱 Growth Mindset',
            text: 'Committed to continuous improvement and staying at the forefront of emerging technologies.',
        },
    },
      {
        id: 'timeline-1',
        year: '2020',
        title: 'Building Software Foundations',
        category: 'Experience',
        icon: '💼',
        location: 'Remote',
        description: 'Developed a strong foundation in software development, focusing on efficient, scalable, and user-friendly applications across web and mobile platforms.',
        achievement: {
          title: 'Key Achievement:',
          text: 'Built foundation for scalable applications'
        }
      },
      {
        id: 'timeline-2',
        year: '2021',
        title: 'Internship: Neverest/TAWA',
        category: 'Education',
        icon: '🎓',
        location: 'Neverest Ltd',
        description: 'Contributed to TinyPesa (mobile payments) & UzaKitu (e-commerce) at Neverest Ltd via TAWA INNOVATE. Enhanced UIs, integrated real-time updates, built analytics dashboards.',
        achievement: {
          title: 'Impact:',
          text: 'Enhanced UI/UX for 10K+ users'
        }
      },
      {
        id: 'timeline-3',
        year: '2023',
        title: 'Decentralized Voting System',
        category: 'Project',
        icon: '🚀',
        location: 'Blockchain Innovation',
        description: 'Developer of a Decentralized Voting Management System using blockchain (Ethereum, Solidity) to promote trust and transparency in digital elections.',
        achievement: {
          title: 'Innovation:',
          text: 'Pioneered blockchain voting solution'
        }
      }
];

// New particles.js configuration from contact.html
const particlesConfig = {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 1000 } },
        "color": { "value": ["#ffca28", "#ffa000", "#f57c00", "#ff8c1a"] }, // Default (dark theme)
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }},
        "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false }},
        "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 3, "size_min": 0.1, "sync": false }},
        "line_linked": { "enable": true, "distance": 180, "color": "#ffca28", "opacity": 0.5, "width": 1.5 }, // Default (dark theme)
        "move": { "enable": true, "speed": 2.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 800, "rotateY": 1200 }}
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { 
            "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } },
            "bubble": { "distance": 300, "size": 8, "duration": 2, "opacity": 0.8, "speed": 3 },
            "repulse": { "distance": 120, "duration": 0.4 },
            "push": { "particles_nb": 6 },
            "remove": { "particles_nb": 2 }
        }
    },
    "retina_detect": true
};

const FuturisticAIAssistant = lazy(() => import('./src/components/AI/FuturisticAIAssistant'));

const App: React.FC = () => {
  const [theme, toggleThemeInternal] = useThemeManager();
  const getPageIdFromHash = (hash: string) => {
    const pageId = hash.replace('#', '');
    const navLink = initialNavLinksData.find(link => link.href === hash || link.pageId.toLowerCase() === pageId.toLowerCase());
    return navLink ? navLink.pageId : 'About';
  };
  const [activePage, setActivePage] = useState<string>(() => getPageIdFromHash(window.location.hash)); 
  const [loading, setLoading] = useState(true);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const updateParticlesTheme = useCallback((currentTheme: 'light' | 'dark') => {
    if (typeof pJSDom !== 'undefined' && pJSDom[0]?.pJS) {
        const pJSInstance = pJSDom[0].pJS;
        if (currentTheme === 'light') {
            pJSInstance.particles.color.value = ["#ffa000", "#f57c00", "#ff8c1a", "#ffb74d"];
            pJSInstance.particles.line_linked.color = "#f57c00";
            pJSInstance.particles.line_linked.opacity = 0.6;
            pJSInstance.particles.opacity.value = 0.4;
        } else { // dark
            pJSInstance.particles.color.value = ["#ffca28", "#ffa000", "#f57c00", "#ff8c1a"];
            pJSInstance.particles.line_linked.color = "#ffca28";
            pJSInstance.particles.line_linked.opacity = 0.5;
            pJSInstance.particles.opacity.value = 0.6;
        }
        pJSInstance.fn.particlesRefresh();
    }
  }, []);
  
  const toggleTheme = () => {
    toggleThemeInternal(); 
  };

  useEffect(() => { // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setLoading(false);
      }, 1500); 
    } else {
        setLoading(false);
    }
  }, []);

  useEffect(() => { // Particles.js
    if (!loading && typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', particlesConfig);
      updateParticlesTheme(theme);
    }
  }, [loading, theme, updateParticlesTheme]);
  
  useEffect(() => { // Custom Cursor
    const dot = cursorDotRef.current || document.getElementById('cursor-dot') as HTMLDivElement;
    const outline = cursorOutlineRef.current || document.getElementById('cursor-outline') as HTMLDivElement;
    if (!dot || !outline) return;
    document.body.classList.add('cursor-ready');
    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;
      dot.style.transform = `translate(${posX}px, ${posY}px)`;
      outline.style.transform = `translate(${posX - outline.offsetWidth / 2 + dot.offsetWidth / 2}px, ${posY - outline.offsetHeight / 2 + dot.offsetHeight / 2}px)`;
    };
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .magnetic');
    const addHoverClass = () => outline.classList.add('hover');
    const removeHoverClass = () => outline.classList.remove('hover');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
    });
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', addHoverClass);
          el.removeEventListener('mouseleave', removeHoverClass);
      });
      document.body.classList.remove('cursor-ready');
    };
  }, [loading]); 
  
  useEffect(() => { // Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    if (!scrollProgressBar) return;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) { 
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;
      } else {
        scrollProgressBar.style.width = `0%`; 
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { // Hash change listener
    const handleHashChange = () => {
      const pageId = getPageIdFromHash(window.location.hash);
      setActivePage(pageId);
      if (pageId === 'Blog' && localStorage.getItem('openBlogPost')) {
        // The BlogPage component itself handles opening the specific post.
        // We just need to ensure the BlogPage is rendered.
      }
      // Smooth scroll to top for all hash changes that result in a page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange, false);
    // Initial page load is handled by useState initializer
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  const handleNavLinkClick = (pageId: string) => {
    const navLink = initialNavLinksData.find(link => link.pageId === pageId);
    if (navLink && window.location.hash !== navLink.href) {
      window.location.hash = navLink.href; 
    } else if (navLink && window.location.hash === navLink.href) {
      // If already on the page (hash matches), just scroll to top
      setActivePage(pageId); // Ensure activePage is set if called directly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback for direct pageId calls not matching a known hash, though less likely now
      setActivePage(pageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks: NavLinkItem[] = initialNavLinksData.map(link => ({
    ...link,
    current: link.pageId === activePage,
  }));
  
  return (
    <Router>
      <div className="App font-sans antialiased text-[var(--primary-text)] bg-[var(--primary-bg)] min-h-screen flex flex-col">
        <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading ARIA...</div>}>
          <FuturisticAIAssistant />
        </Suspense>
        
        <Header navLinks={navLinks} onNavLinkClick={handleNavLinkClick} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 flex-1 max-w-7xl relative z-[5]">
          {activePage === 'About' && (
            <>
              <PageHeaderSection onNavigate={handleNavLinkClick} />
              <StatsSection />
              <JourneyPage timelineItems={consolidatedTimelineData} constellations={constellations} />
            </>
          )}
          {activePage === 'Resume' && <ResumePage />}
          {activePage === 'Projects' && <ProjectsPage />}
          {activePage === 'Blog' && <BlogPage />}
          {activePage === 'Contact' && <ContactPage />}
          {activePage === 'UIShowcase' && <CompleteUIShowcase />}
        </main>
        
        <Footer onNavLinkClick={handleNavLinkClick} />
        <FloatingActionButton 
          onNavigate={handleNavLinkClick} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>
    </Router>
  );
};

export default App;