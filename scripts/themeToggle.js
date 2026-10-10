/**
 * Sky Theme Toggle - Clean, Reliable & Beautiful
 * A performant theme toggle with smooth sky transitions
 * @version 3.0
 */

if (typeof window !== 'undefined' && typeof window.SkyThemeToggle === 'undefined') {
  class SkyThemeToggle {
    constructor(options = {}) {
      // Configuration
      this.config = {
        storageKey: 'theme-preference',
        toggleId: 'sky-theme-toggle',
        position: { top: '20px', right: '20px' },
        originalSize: 60, // Default original size
        mobileSize: 48,   // Default mobile size
        animationDuration: 800,
        zIndex: 999999,
        isStandalone: true,
        ...options
      };

      // Initialize current size based on screen width
      if (typeof window !== 'undefined') {
        this.config.size = window.innerWidth < 768 ? this.config.mobileSize : this.config.originalSize;
      } else {
        this.config.size = this.config.originalSize; // Fallback for non-browser environments
      }

      // State
      this.state = {
        theme: null,
        isAnimating: false,
        mounted: false
      };

      // Cloud positions (fixed values to prevent drift)
      this.cloudPositions = {
        light: [
          { width: 25, height: 12, top: 15, left: 10 },
          { width: 20, height: 10, top: 35, left: 35 },
          { width: 30, height: 14, top: 25, left: 50 }
        ],
        dark: [
          { width: 25, height: 12, top: 15, left: 10 },
          { width: 20, height: 10, top: 35, left: 35 },
          { width: 30, height: 14, top: 25, left: 50 }
        ]
      };

      // Initialize
      this.init();
    }

    init() {
      // Initialize theme
      this.initializeTheme();

      // Mount when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.mount());
      } else {
        this.mount();
      }

      // Listen for system theme changes
      this.setupSystemThemeListener();
    }

    initializeTheme() {
      try {
        // Check saved preference
        const savedTheme = localStorage.getItem(this.config.storageKey);

        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
          this.state.theme = savedTheme;
        } else {
          // Use system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.state.theme = prefersDark ? 'dark' : 'light';
        }

        this.applyTheme(this.state.theme, false);
      } catch (error) {
        console.error('Theme initialization error:', error);
        this.state.theme = 'light';
        this.applyTheme('light', false);
      }
    }

    applyTheme(theme, animate = true) {
      const root = document.documentElement;

      // Remove old classes
      root.classList.remove('light', 'dark');

      // Add new theme
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = theme;

      // Apply to body as well for better compatibility
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);

      // Save preference
      try {
        localStorage.setItem(this.config.storageKey, theme);
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }

      // Dispatch event
      const event = new CustomEvent('themeChanged', {
        detail: { theme, animated: animate },
        bubbles: true
      });

      window.dispatchEvent(event);
      document.dispatchEvent(event);

      // Update CSS variables
      this.updateCSSVariables(theme);

      // Apply more aggressive style overrides
      this.injectThemeOverride(theme);

      // Force repaint to ensure changes take effect
      void document.documentElement.offsetHeight;
    }

    updateCSSVariables(theme) {
      const root = document.documentElement;

      // Define theme colors
      const themes = {
        dark: {
          '--bg-primary': '#0a0a0a',
          '--bg-secondary': '#1a1a1a',
          '--text-primary': '#ffffff',
          '--text-secondary': '#a0a0a0',
          '--border-color': 'rgba(255, 255, 255, 0.1)',
          // Add these for compatibility with existing styles
          '--primary-bg': '#0a0a0a',
          '--secondary-bg': '#1a1a1a',
          '--card-bg': '#1a1a1a',
          '--primary-text': '#ffffff',
          '--secondary-text': '#a0a0a0',
          '--color-scheme': 'dark'
        },
        light: {
          '--bg-primary': '#ffffff',
          '--bg-secondary': '#f5f5f5',
          '--text-primary': '#0a0a0a',
          '--text-secondary': '#666666',
          '--border-color': 'rgba(0, 0, 0, 0.1)',
          // Add these for compatibility with existing styles
          '--primary-bg': '#ffffff',
          '--secondary-bg': '#f5f5f5',
          '--card-bg': '#ffffff',
          '--primary-text': '#0a0a0a',
          '--secondary-text': '#666666',
          '--color-scheme': 'light'
        }
      };

      // Apply theme variables
      Object.entries(themes[theme]).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Apply directly to body as well for better coverage
      document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#ffffff';
      document.body.style.color = theme === 'dark' ? '#ffffff' : '#0a0a0a';
    }

    // Add method to inject theme override styles
    injectThemeOverride(theme) {
      // Remove any existing theme override
      const existingOverride = document.getElementById('theme-override');
      if (existingOverride) existingOverride.remove();

      // Create style element
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-override';

      if (theme === 'dark') {
        styleEl.textContent = `
        /* Dark theme overrides */
        html.dark,
        html[data-theme="dark"],
        body.dark,
        body[data-theme="dark"] {
          background-color: #0a0a0a !important;
          color: #ffffff !important;
        }
        
        /* Target common containers */
        .app-container,
        #root,
        #app,
        .main-content,
        main {
          background-color: #0a0a0a !important;
          color: #ffffff !important;
        }
      `;
      } else {
        styleEl.textContent = `
        /* Light theme overrides */
        html.light,
        html[data-theme="light"],
        body.light,
        body[data-theme="light"] {
          background-color: #ffffff !important;
          color: #0a0a0a !important;
        }
        
        /* Target common containers */
        .app-container,
        #root,
        #app,
        .main-content,
        main {
          background-color: #ffffff !important;
          color: #0a0a0a !important;
        }
      `;
      }

      // Add to document
      document.head.appendChild(styleEl);

      // Also apply theme to common container elements
      ['main', 'header', 'footer', '.app-container', '#root', '#app'].forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(el => {
            el.classList.remove('light', 'dark');
            el.classList.add(theme);
            el.setAttribute('data-theme', theme);
          });
        } catch (e) {
          // Ignore errors for selectors that don't exist
        }
      });
    }

    setupSystemThemeListener() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e) => {
        // Only update if no saved preference
        if (!localStorage.getItem(this.config.storageKey)) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.state.theme = newTheme;
          this.applyTheme(newTheme);
          this.updateToggleState();
        }
      };

      // Modern way to add listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) { // Deprecated but fallback
        mediaQuery.addListener(handleChange);
      }

      // Store the handler to remove it later if needed
      this._themeChangeHandler = handleChange;
    }

    mount(parentElement = null) {
      if (this.state.mounted && document.getElementById(this.config.toggleId)) {
        // console.warn("SkyThemeToggle already mounted or element exists.");
        this.updateToggleState(); // Ensure state is fresh if re-mounting logic is hit
        return;
      }

      this.element = this.createElement();

      if (parentElement) {
        parentElement.appendChild(this.element);
      } else if (this.config.isStandalone) {
        document.body.appendChild(this.element);
      }

      this.updateDimensions(this.config.size); // Set initial dimensions via CSS vars

      this.state.mounted = true;
      this.updateToggleState();
      this.applyTheme(this.state.theme, false);

      // Add resize listener to adjust position and size for mobile if needed
      this._resizeListener = () => {
        const isMobile = window.innerWidth < 768;
        const newSize = isMobile ? this.config.mobileSize : this.config.originalSize;

        if (this.config.size !== newSize) {
          this.config.size = newSize; // Update the central size config
          this.updateDimensions(newSize); // Apply new dimensions
        }

        // Position adjustments
        if (isMobile) { // md breakpoint in Tailwind
          this.element.style.top = '100px';
          this.element.style.left = 'auto';
          this.element.style.right = '20px';
        } else {
          this.element.style.top = this.config.position.top || '20px';
          this.element.style.left = 'auto'; // Ensure it's on the right for desktop too
          this.element.style.right = this.config.position.right || '20px';
        }
      };
      window.addEventListener('resize', this._resizeListener);
      this._resizeListener(); // Initial check
    }

    cleanup() {
      if (this._resizeListener) {
        window.removeEventListener('resize', this._resizeListener);
      }
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (this._themeChangeHandler) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', this._themeChangeHandler);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(this._themeChangeHandler);
        }
      }
    }

    injectStyles() {
      if (document.getElementById('sky-theme-toggle-styles')) return;

      const css = `
      #${this.config.toggleId} {
        position: fixed;
          top: ${this.config.position.top || 'auto'};
          bottom: ${this.config.position.bottom || 'auto'};
          left: ${this.config.position.left || 'auto'};
          right: ${this.config.position.right || 'auto'};
          width: var(--sky-toggle-current-size, ${this.config.originalSize}px);
          height: var(--sky-toggle-current-size, ${this.config.originalSize}px);
        border-radius: 50%;
        overflow: hidden;
          cursor: pointer;
          z-index: ${this.config.zIndex};
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        /* Default shadow replaced by theme-specific glow */
        -webkit-tap-highlight-color: transparent;
          outline: none;
      }
      #${this.config.toggleId}:hover {
            transform: scale(1.1);
            /* Default hover shadow replaced by theme-specific glow hover */
        }
        #${this.config.toggleId}:focus-visible {
            /* Keep a consistent, accessible focus ring using a distinct color */
            box-shadow: 0 0 0 3px var(--primary-accent, #FFA000);
        }

        /* Light mode specific glow */
        html.light #${this.config.toggleId} {
          box-shadow: 0 0 12px 3px rgba(255, 200, 0, 0.6); /* Sunny glow */
        }
        html.light #${this.config.toggleId}:hover {
          box-shadow: 0 0 18px 4px rgba(255, 210, 50, 0.75); /* Enhanced sunny glow on hover */
      }
        html.light #${this.config.toggleId}:focus-visible {
            box-shadow: 0 0 0 3px var(--primary-accent, #FFA000), 0 0 12px 3px rgba(255, 200, 0, 0.6);
        }

        /* Dark mode specific glow */
        html.dark #${this.config.toggleId} {
          box-shadow: 0 0 12px 3px rgba(220, 230, 255, 0.6); /* Ethereal white/blue glow */
      }
        html.dark #${this.config.toggleId}:hover {
          box-shadow: 0 0 18px 4px rgba(225, 235, 255, 0.75); /* Enhanced ethereal glow on hover */
        }
        html.dark #${this.config.toggleId}:focus-visible {
            box-shadow: 0 0 0 3px var(--primary-accent, #FFA000), 0 0 12px 3px rgba(220, 230, 255, 0.6);
      }

        .sky-background {
          width: 100%;
          height: 100%;
        position: absolute;
          transition: background-color ${this.config.animationDuration}ms ease-in-out;
      }
        .sun, .moon, .cloud, .star {
        position: absolute;
          transition: transform ${this.config.animationDuration}ms ease-in-out, opacity ${this.config.animationDuration}ms ease-in-out;
          will-change: transform, opacity;
      }
      .sun {
          width: var(--sky-toggle-sun-size, ${this.config.originalSize * 0.4}px);
          height: var(--sky-toggle-sun-size, ${this.config.originalSize * 0.4}px);
          background-color: #FFD700; /* Bright Gold */
          border-radius: 50%;
          top: 50%;
          left: 50%;
          box-shadow: 0 0 15px #FFD700, 0 0 25px #FFD700;
      }
      .moon {
          width: var(--sky-toggle-moon-size, ${this.config.originalSize * 0.35}px);
          height: var(--sky-toggle-moon-size, ${this.config.originalSize * 0.35}px);
          background-color: #E0E0E0; /* Light Gray */
        border-radius: 50%;
          top: 50%;
          left: 50%;
          box-shadow: inset -5px 2px 0px #C0C0C0, 0 0 10px #E0E0E0; /* Silver, Moon Glow */
        }
      .cloud {
          background-color: #ffffff;
          border-radius: 50%; /* Simplified cloud shape */
          opacity: 0.7;
      }
      .star {
        width: 2px;
        height: 2px;
          background-color: #ffffff;
        border-radius: 50%;
          opacity: 0; /* Base opacity, hidden by default */
          animation: none; /* No animation by default */
        }
      @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1); }
      }
        /* Light theme (day) */
        .sky-background.light {
          background: linear-gradient(to bottom, #87CEEB 0%, #ADD8E6 100%);
        }
        .sun.light { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        .moon.light { transform: translate(-50%, -150%) scale(0.5); opacity: 0; }
        .cloud.light { opacity: 0.6; }
        .star.light {
          opacity: 0 !important; /* Ensure hidden in light mode */
          animation: none !important; /* Ensure no animation in light mode */
        }
        /* Dark theme (night) */
        .sky-background.dark {
          background: linear-gradient(to bottom, #000030 0%, #202060 100%);
        }
        .sun.dark { transform: translate(-50%, 150%) scale(0.5); opacity: 0; }
        .moon.dark { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        .cloud.dark { opacity: 0.2; }
        .star.dark {
          /* opacity: 1; Removed - let animation control visibility */
          animation: twinkle 3s infinite ease-in-out;
      }
    `;
      const styleElement = document.createElement('style');
      styleElement.id = 'sky-theme-toggle-styles';
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }

    createElement() {
      this.injectStyles();

      const toggle = document.createElement('div');
      toggle.id = this.config.toggleId;
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('aria-label', 'Toggle theme');
      toggle.setAttribute('tabindex', '0');

      const sky = document.createElement('div');
      sky.className = 'sky-background';
      this.skyElement = sky;

      const sun = document.createElement('div');
      sun.className = 'sun';
      this.sunElement = sun;

      const moon = document.createElement('div');
      moon.className = 'moon';
      this.moonElement = moon;

      this.cloudElements = [];
      for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        this.cloudElements.push(cloud);
        sky.appendChild(cloud);
      }

      this.starElements = [];
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        this.starElements.push(star);
        sky.appendChild(star);
      }

      sky.appendChild(sun);
      sky.appendChild(moon);
      toggle.appendChild(sky);

      toggle.addEventListener('click', () => this.handleClick());
      toggle.addEventListener('keydown', (e) => this.handleKeyboard(e));

      return toggle;
    }

    createSky(isDark) {
      this.skyElement.className = `sky-background ${isDark ? 'dark' : 'light'}`;
    }

    createSun(isDark) {
      this.sunElement.className = `sun ${isDark ? 'dark' : 'light'}`;
    }

    createMoon(isDark) {
      this.moonElement.className = `moon ${isDark ? 'dark' : 'light'}`;
    }

    createClouds(isDark) {
      const positions = isDark ? this.cloudPositions.dark : this.cloudPositions.light;
      this.cloudElements.forEach((cloud, i) => {
        const pos = positions[i % positions.length];
        cloud.className = `cloud ${isDark ? 'dark' : 'light'}`;
        cloud.style.width = `${this.config.size * (pos.width / 100)}px`;
        cloud.style.height = `${this.config.size * (pos.height / 100)}px`;
        cloud.style.top = `${this.config.size * (pos.top / 100)}px`;
        cloud.style.left = `${this.config.size * (pos.left / 100)}px`;
        // cloud.style.opacity = isDark ? '0.2' : '0.6'; // Opacity is handled by CSS classes .cloud.light/dark
      });
    }

    createStars() {
      const isDark = this.state.theme === 'dark';
      this.starElements.forEach(star => {
        star.className = `star ${isDark ? 'dark' : 'light'}`;
      });
    }

    handleClick() {
      if (this.state.isAnimating) return;
      this.state.isAnimating = true;

      const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
      this.state.theme = newTheme;

      this.applyTheme(newTheme, true);
      this.updateToggleState();

      setTimeout(() => {
        this.state.isAnimating = false;
      }, this.config.animationDuration);
    }

    handleKeyboard(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleClick();
      }
    }

    updateToggleState() {
      if (!this.element || !this.state.mounted) return;
      const isDark = this.state.theme === 'dark';

      this.element.setAttribute('aria-pressed', isDark.toString());
      this.updateSkyBackground(isDark);
      this.updateSunMoon(isDark);
      this.updateStars(isDark);
      this.updateClouds(isDark);
    }

    updateSkyBackground(isDark) {
      if (this.skyElement) this.skyElement.className = `sky-background ${isDark ? 'dark' : 'light'}`;
    }

    updateSunMoon(isDark) {
      if (this.sunElement) this.sunElement.className = `sun ${isDark ? 'dark' : 'light'}`;
      if (this.moonElement) this.moonElement.className = `moon ${isDark ? 'dark' : 'light'}`;
    }

    updateStars(isDark) {
      if (this.starElements) {
        this.starElements.forEach(star => star.className = `star ${isDark ? 'dark' : 'light'}`);
      }
    }

    updateClouds(isDark) {
      if (this.cloudElements) {
        const positions = isDark ? this.cloudPositions.dark : this.cloudPositions.light;
        this.cloudElements.forEach((cloud, i) => {
          const pos = positions[i % positions.length];
          cloud.className = `cloud ${isDark ? 'dark' : 'light'}`;
          // Cloud positions are relative to the toggle size, ensure they are applied correctly
          cloud.style.width = `${this.config.size * (pos.width / 100)}px`;
          cloud.style.height = `${this.config.size * (pos.height / 100)}px`;
          cloud.style.top = `${this.config.size * (pos.top / 100)}px`;
          cloud.style.left = `${this.config.size * (pos.left / 100)}px`;
        });
      }
    }

    updateDimensions(size) {
      if (!this.element) return;

      this.element.style.setProperty('--sky-toggle-current-size', `${size}px`);
      this.element.style.setProperty('--sky-toggle-sun-size', `${size * 0.4}px`);
      this.element.style.setProperty('--sky-toggle-moon-size', `${size * 0.35}px`);

      const isDark = this.state.theme === 'dark';
      // this.config.size should have been updated by the caller (_resizeListener or constructor)
      this.updateClouds(isDark);
    }

    // Public methods
    getTheme() {
      return this.state.theme;
    }

    setTheme(theme) {
      if (!['light', 'dark'].includes(theme)) {
        console.warn('Invalid theme specified for setTheme. Use "light" or "dark".');
        return;
      }
      this.state.theme = theme;
      this.applyTheme(theme);
      this.updateToggleState();
    }

    destroy() {
      if (this.element && this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
      this.cleanup();
      this.state.mounted = false;
      // Remove global instance if this is the one
      if (window.skyThemeToggleInstance === this) {
        window.skyThemeToggleInstance = null;
      }
    }
  }

  // Expose class to window if not already exposed by a module system
  if (typeof window !== 'undefined' && typeof window.SkyThemeToggle === 'undefined') {
    window.SkyThemeToggle = SkyThemeToggle;
  }

  // Auto-initialize for standalone usage, ensuring only one instance
  if (typeof window !== 'undefined' && !window.skyThemeToggleInstance && window.SkyThemeToggle) {
    window.skyThemeToggleInstance = new window.SkyThemeToggle();
  }
}