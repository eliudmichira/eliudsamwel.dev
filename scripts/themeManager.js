/**
 * Theme Manager Script
 * Adds theme switching capabilities to any page
 */

// Initialize theme based on saved preference or system setting
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
    
    // Listen to system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (localStorage.getItem('theme')) return; // Don't override user preference
      
      if (event.matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    });
  }
}

// Create and insert theme toggle
function insertThemeToggle() {
  // Remove any existing theme toggle first to avoid duplicates
  const existingToggle = document.querySelector('.theme-toggle');
  if (existingToggle) {
    existingToggle.remove();
  }
  
  // Create toggle container
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'theme-toggle';
  toggleContainer.style.cssText = 'width: 60px !important; height: 60px !important; position: fixed !important; top: 20px !important; right: 20px !important; z-index: 99999 !important; cursor: pointer !important; display: block !important; pointer-events: auto !important;';
  
  // Create toggle button and inner structure  
  toggleContainer.innerHTML = `
    <div class="theme-toggle-inner" style="width: 100% !important; height: 100% !important; background: linear-gradient(135deg, #1a1e3f, #2c3e50) !important; border-radius: 50% !important; position: relative !important; overflow: hidden !important; box-shadow: 0 0 15px rgba(0,0,0,0.3) !important; display: flex !important; align-items: center !important; justify-content: center !important;">
      <div class="sun" style="position: absolute !important; width: 32px !important; height: 32px !important; background: #FFD700 !important; border-radius: 50% !important; top: 14px !important; left: 14px !important; box-shadow: 0 0 15px rgba(255, 215, 0, 0.7) !important; z-index: 1 !important; display: block !important; pointer-events: none !important;"></div>
      <div class="moon" style="position: absolute !important; width: 32px !important; height: 32px !important; background: #121621 !important; border-radius: 50% !important; top: 14px !important; right: ${document.documentElement.classList.contains('dark') ? '14px' : '-40px'} !important; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) !important; box-shadow: 0 0 10px rgba(0, 0, 0, 0.7) !important; z-index: 2 !important; display: block !important; pointer-events: none !important;"></div>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(toggleContainer);
  
  // Add event listener to toggle
  toggleContainer.addEventListener('click', () => {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggleContainer.querySelector('.moon').style.right = '14px';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      toggleContainer.querySelector('.moon').style.right = '-40px';
    }
  });
  
  // Make sure toggle is visible after a delay
  setTimeout(() => {
    toggleContainer.style.display = 'block';
    toggleContainer.style.opacity = '1';
    toggleContainer.style.visibility = 'visible';
  }, 500);
}

// Run on document load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  insertThemeToggle();
});

// Run immediately if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initializeTheme();
  insertThemeToggle();
} 