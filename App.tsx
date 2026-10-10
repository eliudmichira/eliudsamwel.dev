import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import PageHeaderSection from './components/PageHeaderSection';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { useThemeManager } from './hooks/useThemeManager';
import { NavLinkItem } from './types';
import { ResumePage } from './components/resume/ResumePage';
import { ContactPage } from './components/contact/ContactPage';
import { ContactAdminDashboard } from './components/contact/ContactAdminDashboard';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { BlogPage } from './components/blog/BlogPage';
import { CompleteUIShowcase } from './src/components/showcase/CompleteUIShowcase';
import JourneyPage from './src/components/Journey/JourneyPage';
import CustomCursor from './src/components/CustomCursor';
// import LoginLayoutsShowcase from './src/components/showcase/LoginLayoutsShowcase'; // Removed import, will be used in CompleteUIShowcase
import './styles/theme.css';
import './styles/animations.css';
import './styles/gallery.css';
import { constellations, TimelineItem as JourneyTimelineItem } from './data/journeyData';

declare var particlesJS: any; 
declare var pJSDom: any; 

const initialNavLinksData: Omit<NavLinkItem, 'current'>[] = [
    { name: 'About', pageId: 'About', href: '#about' }, 
    { name: 'Resume', pageId: 'Resume', href: '#resume' },
    { name: 'Projects', pageId: 'Projects', href: '#projects' },
    { name: 'Blog', pageId: 'Blog', href: '#blog' },
    { name: 'Contact', pageId: 'Contact', href: '#contact' },
    { name: 'UI Showcase', pageId: 'UIShowcase', href: '#ui-showcase' },
    // { name: 'Login Layouts', pageId: 'LoginLayouts', href: '#login-layouts' }, // Removed nav link
];

// Journey timeline — aligned with annotation, evaluation & engineering narrative
const consolidatedTimelineData: JourneyTimelineItem[] = [
  {
    id: 'bio',
    year: 'Ongoing',
    category: 'Experience',
    icon: '👤',
    title: 'Today — Data annotation & AI content evaluation',
    location: 'Nairobi, Kenya · Fully remote',
    description:
      'Data annotator and AI content evaluator: labeling and scoring AI outputs across business, finance, healthcare, legal, and STEM domains. Promoted into auditing at Innodata after a perfect 35/35 on the Content Understanding Video Master eval. Full-stack developer background sharpens the eye for inconsistency in datasets and systems.',
    achievement: {
      title: '🎯 Focus',
      text: 'Accurate, well-documented annotation — edge cases flagged, ambiguities resolved, rubrics improved.',
    },
  },
  {
    id: 'innodata-2025',
    year: 'Aug 2025 – May 2026',
    category: 'Experience',
    icon: '🤖',
    title: 'AI Content & Data Annotator / Evaluator · Innodata Inc.',
    location: 'Remote · Global time zones',
    description:
      'Annotated and scored AI-generated text, image, and video outputs against client rubrics. Scored 35/35 (perfect) on the Content Understanding Video Master evaluation — the project\'s strictest calibration test. Promoted into auditing: checked other annotators\' labels against guidelines and flagged inconsistent judgments. Documented edge cases that fed rubric refinement.',
    achievement: {
      title: '📈 Impact',
      text: '35/35 perfect score on Video Master Eval → promoted to auditor. High-volume async delivery across every batch.',
    },
  },
  {
    id: 'neverest-2024',
    year: 'May 2024 – Aug 2025',
    category: 'Experience',
    icon: '💼',
    title: 'Software Engineer Intern · Neverest Ltd (TAWA INNOVATE)',
    location: 'Nairobi, Kenya · Hybrid',
    description:
      'Fintech and e-commerce: TinyPesa transaction workflows and UzaKitu\'s reseller dashboard — direct familiarity with structured data, edge cases, and system logic in live products. UzaKitu dashboards with WebSockets and D3.js; Pickup Mtaani logistics with CRM-style order state.',
    achievement: {
      title: '⚙️ Outcome',
      text: 'Hands-on system logic experience that now sharpens annotation accuracy for technical and structured-data tasks.',
    },
  },
  {
    id: 'independent-2021',
    year: '2021 – Present',
    category: 'Experience',
    icon: '🌐',
    title: 'Full-Stack Developer · Independent / Freelance',
    location: 'Remote — async',
    description:
      'Built and shipped SoundsSwapp, FlickCollection, and other products end to end. 100% client retention and 4.9/5 average project rating. Workflow automations across Spotify, YouTube, Google APIs, and Firebase. M-Pesa/Daraja and IntaSend payment flows with resilient orchestration.',
    achievement: {
      title: '✅ Track record',
      text: '100% client retention; full-stack background that contextualises datasets and system outputs during evaluation work.',
    },
  },
  {
    id: 'education-2025',
    year: '2025',
    category: 'Education',
    icon: '🎓',
    title: 'BSc, Business Computing · JKUAT',
    location: 'Nairobi, Kenya',
    description:
      'Software engineering, distributed systems, database optimization, business analysis, and data visualization — bridging engineering depth with practical understanding of how systems and datasets are structured.',
    achievement: {
      title: '📚 Credentials',
      text: 'Innodata 35/35 Video Master Eval (2026), Critical Thinking 100th percentile, English C2 94th percentile, Versant Passed, Testlio Conduct 100% (July 2025).',
    },
  },
  {
    id: 'projects-flagship',
    year: '2023 – Present',
    category: 'Project',
    icon: '🚀',
    title: 'Flagship builds · voting, fintech & discovery',
    location: 'Remote',
    description:
      'Blockchain Electoral Management System; SoundSwapp (quota-aware Spotify↔YouTube orchestration); FlickCollection (AI discovery with caching and fallbacks); Sanarix (ops dashboards, Google Auth, real-time messaging).',
    achievement: {
      title: '🏗️ Pattern',
      text: 'Engineering practice that builds intuition for structured data, edge cases, and system-level inconsistencies.',
    },
  },
  {
    id: 'future',
    year: 'Present & beyond',
    category: 'Experience',
    icon: '🔮',
    title: "What's next",
    location: 'Global · Async-first',
    description:
      'Continuing to grow in AI content evaluation, data annotation, and RLHF-adjacent work — while staying hands-on in engineering when projects call for it.',
    achievement: {
      title: '🌱 Invitation',
      text: 'Open to annotation, evaluation, and QA roles where attention to detail, domain breadth, and calm async execution matter.',
    },
  },
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
    const pageId = hash.replace('#', '').toLowerCase();
    
    // Handle admin routes
    if (pageId === 'admin' || pageId === 'contact-admin') {
      return 'Admin';
    }
    
    const navLink = initialNavLinksData.find(link => 
      link.href === hash || link.pageId.toLowerCase() === pageId
    );
    return navLink ? navLink.pageId : 'About';
  };
  const [activePage, setActivePage] = useState<string>(() => getPageIdFromHash(window.location.hash)); 
  const [loading, setLoading] = useState(true);

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
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('loaded');
      }
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { // Particles.js
    if (!loading && typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', particlesConfig);
      updateParticlesTheme(theme);
    }
  }, [loading, theme, updateParticlesTheme]);
  
  // Custom cursor is now handled by the CustomCursor component
  
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
  
  const renderPage = () => {
    switch (activePage) {
      case 'About':
        return (
          <div className="page-content fade-in">
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}></div>
            <PageHeaderSection onNavigate={handleNavLinkClick} />
            <JourneyPage timelineItems={consolidatedTimelineData} constellations={constellations} />
            <StatsSection />
          </div>
        );
      case 'Resume':
        return <ResumePage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Blog':
        return <BlogPage />;
      case 'Contact':
        return <ContactPage />;
      case 'Admin':
      case 'ContactAdmin':
        return <ContactAdminDashboard />;
      case 'UIShowcase':
        return <CompleteUIShowcase />;
      // case 'LoginLayouts': // Removed case for LoginLayouts
      //   return <LoginLayoutsShowcase />;
      default:
        return (
          <div className="page-content fade-in">
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}></div>
            <PageHeaderSection onNavigate={handleNavLinkClick} />
            <JourneyPage timelineItems={consolidatedTimelineData} constellations={constellations} />
            <StatsSection />
          </div>
        );
    }
  };

  return (
    <div className="App font-sans antialiased text-[var(--primary-text)] bg-[var(--primary-bg)] min-h-screen flex flex-col">
      <CustomCursor />
      <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading ARIA...</div>}>
        <FuturisticAIAssistant />
      </Suspense>
      
      <Header navLinks={navLinks} onNavLinkClick={handleNavLinkClick} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 flex-1 max-w-7xl relative z-[5]">
        {renderPage()}
      </main>
      
      {/* Only show footer on pages that need it */}
      {(['About', 'Contact', 'Blog'].includes(activePage)) && (
        <Footer onNavLinkClick={handleNavLinkClick} />
      )}
      <FloatingActionButton 
        onNavigate={handleNavLinkClick} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;