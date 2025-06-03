import React, { useEffect, useState } from 'react';
// Use the profile image from the public directory instead
// import profileImage from '../profile.jpg';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaRocket, FaBrain, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PageHeaderSectionProps {
  onNavigate: (pageId: string) => void;
}

export const PageHeaderSection: React.FC<PageHeaderSectionProps> = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Simple scroll handler instead of using framer-motion's useScroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Compute transforms manually instead of using useTransform
  const yText = scrollY * -0.17; // Roughly equivalent to transform: [0, 300] -> [0, -50]
  const yImage = scrollY * -0.1; // Roughly equivalent to transform: [0, 300] -> [0, -30]
  const opacityValue = Math.max(0.7, 1 - (scrollY / 1000));

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Updated to use CSS variables from the theme for colors
  const floatingIcons = [
    { Icon: FaCode, color: "text-[var(--accent-secondary)]", position: { top: "20%", left: "10%" } },
    { Icon: FaRocket, color: "text-[var(--accent-yellow)]", position: { top: "70%", left: "15%" } },
    { Icon: FaBrain, color: "text-[var(--accent-primary)]", position: { top: "40%", right: "10%" } }
  ];
  
  // Inline styles for dynamic CSS variables or complex properties
  const profileRing1Style = { borderColor: 'color-mix(in srgb, var(--accent-secondary) 20%, transparent)' };
  const profileRing2Style = { borderColor: 'color-mix(in srgb, var(--accent-yellow) 10%, transparent)' };
  const profileRing3Style = { borderColor: 'color-mix(in srgb, var(--accent-secondary) 5%, transparent)' };
  const profileOrbStyle = { background: 'radial-gradient(ellipse at center, var(--accent-secondary) 0%, var(--accent-yellow) 100%)', opacity: 0.15, filter: 'blur(60px)'};
  const profileBorderGradient = { background: 'var(--accent-gradient-multi)'};

  // Add animation CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --glow-opacity-base: 0.6; /* Brighter base for light mode */
        --glow-opacity-peak: 0.85;  /* Brighter peak for light mode */
      }

      .dark {
        --glow-opacity-base: 0.5;
        --glow-opacity-peak: 0.75;
      }

      @keyframes blob {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      
      @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes scroll-down {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(8px); opacity: 0; }
      }

      @keyframes pulse-slow-opacity {
        0%, 100% { opacity: var(--glow-opacity-base); } 
        50% { opacity: var(--glow-opacity-peak); }    
      }
      
      .animate-blob { animation: blob 7s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }
      .animate-gradient { animation: gradient 3s ease infinite; }
      .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      .animate-scroll-down { animation: scroll-down 2s ease-in-out infinite; }
      .bg-300\\% { background-size: 300% 300%; }
      .animate-pulse-slow { animation: pulse-slow-opacity 3s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent">
      {/* Decorative elements like mesh gradients, floating icons, and grid pattern REMOVED/COMMENTED if they act as background */}
      {/* 
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-bg)] via-color-mix(in srgb, var(--accent-color-purple) 20%, var(--secondary-bg)) to-[var(--secondary-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                       from-color-mix(in srgb, var(--accent-color-purple) 30%, transparent) via-transparent to-transparent" />
      </div>
      */}

      {/* Floating icons are part of the foreground/midground decoration, can remain but ensure they don't create a background effect */}
      {/* If floating icons are purely decorative and not essential, they can also be removed for a cleaner black bg */}
      {/* For now, let's keep them but ensure their z-index and opacity don't interfere. */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-10 z-[-1]`} /* Kept opacity low and z-index low */
          style={item.position}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Responsive icon size: base 40px, sm 50px, lg 60px */}
          <item.Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" /> 
        </motion.div>
      ))}

      {/* Grid pattern REMOVED */}
      {/* <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 z-[-1]" /> */}

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex-1 text-center lg:text-left"
            style={{ y: yText, opacity: opacityValue }}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-[var(--accent-secondary)] dark:text-[var(--accent-secondary)] bg-[var(--accent-light)] dark:bg-color-mix(in srgb, var(--accent-secondary) 10%, transparent) rounded-full border border-[var(--accent-secondary)]/50 dark:border-color-mix(in srgb, var(--accent-secondary) 20%, transparent)">
                ✨ Available for new projects
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6"
              variants={itemVariants}
            >
              <span className="block text-[var(--color-text)] dark:text-[var(--primary-text)] mb-2">Hi, I'm</span>
              <span className="block">
                <span className="text-[var(--color-text)] dark:text-[var(--primary-text)]">Eliud Michira</span>{' '}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] bg-clip-text text-transparent bg-300% animate-gradient">
                    Samwel
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] blur-lg opacity-50 dark:opacity-30" />
                </span>
              </span>
            </motion.h1>

            <motion.h2 
              className="text-2xl sm:text-3xl font-semibold mb-6 text-[var(--color-text-secondary)] dark:text-[var(--secondary-text)]"
              variants={itemVariants}
            >
              Software Developer & Tech Innovator
            </motion.h2>

            <motion.p 
              className="text-base sm:text-lg text-[var(--color-text-secondary)] dark:text-[var(--secondary-text)] opacity-80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              Building impactful digital solutions at the intersection of web, mobile, and blockchain technology. 
              Passionate about creating experiences that make a difference.
            </motion.p>

            {/* Social links */}
            <motion.div 
              className="flex gap-4 mb-10 justify-center lg:justify-start"
              variants={itemVariants}
            >
              {[
                { href: "https://github.com/eliudmichira", Icon: FaGithub, label: "GitHub", hoverColor: "var(--accent-secondary)" },
                { href: "https://linkedin.com/in/eliudsamwel", Icon: FaLinkedin, label: "LinkedIn", hoverColor: "var(--accent-primary)" },
                { href: "https://x.com/mich_michira", Icon: FaTwitter, label: "Twitter", hoverColor: "var(--accent-yellow)" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Eliud's ${social.label} profile`}
                  className="group relative p-3 rounded-xl bg-[var(--glass-card-bg)] backdrop-blur-sm border border-[var(--glass-card-border)] hover:border-[var(--hoverColorVariable)] transition-all duration-300"
                  style={{ '--hoverColorVariable': social.hoverColor } as React.CSSProperties}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.Icon className="w-6 h-6 text-[var(--color-text-muted)] dark:text-[var(--secondary-text)] group-hover:text-[var(--hoverColorVariable)] transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-br from-color-mix(in srgb, var(--hoverColorVariable) 20%, transparent) to-color-mix(in srgb, var(--hoverColorVariable) 20%, transparent) rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => onNavigate('Projects')}
                className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden text-[var(--color-text-on-accent)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] transition-all duration-300 group-hover:scale-110" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] 
                                transition-transform duration-1000" />
                </div>
                
                <span className="relative z-10">View My Work</span>
              </motion.button>

              <motion.button
                onClick={() => onNavigate('Contact')}
                className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden text-[var(--color-text)] dark:text-[var(--primary-text)] bg-transparent hover:bg-[var(--color-hover-bg)] dark:hover:bg-color-mix(in srgb, var(--primary-text) 5%, transparent) border-2 border-[var(--color-text)] dark:border-[var(--primary-text)] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Let's Connect</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile image section */}
          <motion.div 
            className="flex-1 flex justify-center items-center"
            style={{ y: yImage }}
            variants={itemVariants}
          >
            <div 
              className="relative"
              style={{
                transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`
              }}
            >
              {/* Animated rings */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-[120%] h-[120%] border rounded-full" style={profileRing1Style} />
                <div className="absolute w-[140%] h-[140%] border rounded-full" style={profileRing2Style} />
                <div className="absolute w-[160%] h-[160%] border rounded-full" style={profileRing3Style} />
              </motion.div>

              {/* Image container */}
              <motion.div
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 floating-profile-img-container"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow effect behind profile image - Radial spotlight */}
                <div className="absolute inset-0 rounded-full z-0 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_transparent_40%,_var(--accent-yellow)_85%,_var(--accent-primary)_115%)] blur-xl animate-pulse-slow"
                  />
                </div>
                
                {/* Profile image - simplified to just use the public image directly */}
                <img 
                  src="/images/profile.jpg"
                  alt="Eliud Samwel Michira - Software Developer" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full z-10 floating-profile-img"
                  loading="lazy"
                />
              </motion.div>

              {/* Status indicator - updated color and z-index */}
              <motion.div 
                className="absolute bottom-8 right-8 flex items-center gap-2 px-3 py-1.5 z-30
                         bg-[var(--glass-card-bg)] backdrop-blur-sm rounded-full border border-green-500/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-[var(--secondary-text)]">Available</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
        variants={itemVariants}
        title="Scroll to learn more"
      >
        <span className="mb-2 text-sm text-[var(--color-text-muted)] dark:text-[var(--secondary-text)] animate-pulse">Scroll Down</span>
        <FaArrowDown className="text-2xl text-[var(--color-text-muted)] dark:text-[var(--secondary-text)] animate-scroll-down opacity-70" />
      </motion.div>
    </section>
  );
};

export default PageHeaderSection;