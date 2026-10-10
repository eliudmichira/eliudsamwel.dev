import React, { useEffect, useRef } from 'react';

// Assuming SkyThemeToggle is loaded globally via scripts/themeToggle.js
declare var SkyThemeToggle: any;

// Augment the Window interface to include our custom global property
declare global {
  interface Window {
    skyThemeToggle: any;
  }
}

interface ThemeToggleProps {
  theme: 'light' | 'dark'; // Current theme from App
  toggleTheme: () => void; // Function to call when App needs to update theme state
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const skyToggleInstanceRef = useRef<any>(null);
  const hasInitializedRef = useRef(false); // Prevent re-initialization on fast HMR
  const toggleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Import the SkyThemeToggle script dynamically
    const script = document.createElement('script');
    script.src = '/scripts/themeToggle.js';
    script.async = true;
    script.onload = () => {
      if (window.skyThemeToggle) {
        window.skyThemeToggle.mount();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
      if (window.skyThemeToggle) {
        window.skyThemeToggle.unmount();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof SkyThemeToggle === 'undefined') {
      console.warn('SkyThemeToggle script not loaded.');
      return;
    }

    // Initialize only once
    if (!hasInitializedRef.current) {
      // Destroy any pre-existing instance from script's auto-init (if it somehow ran)
      // or from previous HMR before this instance was properly set up.
      if (window.skyThemeToggle && window.skyThemeToggle.destroy) {
         window.skyThemeToggle.destroy();
         window.skyThemeToggle = null;
      }
      // Also attempt to destroy based on the default ID if an orphaned one exists
      const existingDomElement = document.getElementById('sky-theme-toggle');
      if (existingDomElement && (existingDomElement as any)._skyToggleInstance && (existingDomElement as any)._skyToggleInstance.destroy) {
        (existingDomElement as any)._skyToggleInstance.destroy();
      }

      const instance = new SkyThemeToggle({
        // Use default size and isStandalone: true from the script
        // The script handles its own DOM creation and appending to body for standalone
        // We need a way for the script's button click to call our `toggleTheme` from React.
        // Let's modify the script or assume it dispatches a specific event we can listen to,
        // or provide a callback. For now, we will rely on the themeChanged event it already dispatches.
      });
      skyToggleInstanceRef.current = instance;
      hasInitializedRef.current = true;
       // Attach the instance to the DOM element it creates for easier cleanup if needed
      if (instance.toggleElement) {
        (instance.toggleElement as any)._skyToggleInstance = instance;
      }
    }

    // Listener for theme changes initiated by SkyThemeToggle itself
    // (e.g., if it syncs with system preference directly initially)
    const handleThemeChangedByScript = (event: CustomEvent) => {
      if (event.detail.theme && event.detail.theme !== theme) {
        // This call synchronizes the parent (App.tsx) state
        // if the script changed the theme for any reason other than a direct click handled by React.
        toggleTheme(); // This will cause a re-render and update the `theme` prop
      }
    };

    window.addEventListener('themeChanged', handleThemeChangedByScript as EventListener);

    return () => {
      // Don't destroy here if we want it to persist across typical React HMR for App state changes.
      // Destroying only on true component unmount is tricky if it's globally positioned.
      // The script itself is designed to be fairly standalone.
      // For now, let's keep it simple: if ThemeToggle component unmounts, destroy its instance.
      // if (skyToggleInstanceRef.current && skyToggleInstanceRef.current.destroy) {
      //   skyToggleInstanceRef.current.destroy();
      //   skyToggleInstanceRef.current = null;
      // }
      window.removeEventListener('themeChanged', handleThemeChangedByScript as EventListener);
    };
  // Adding `toggleTheme` to dependencies to ensure the event listener always has the latest version.
  }, [theme, toggleTheme]); 

  useEffect(() => {
    // Synchronize SkyThemeToggle instance with theme prop changes from App.tsx
    if (skyToggleInstanceRef.current && skyToggleInstanceRef.current.getTheme() !== theme) {
      skyToggleInstanceRef.current.setTheme(theme);
    }
  }, [theme]);
  
  // This React component doesn't render any DOM itself for the toggle.
  // SkyThemeToggle creates and manages its own DOM element, positioned globally.
  return null;
};

export default ThemeToggle;
