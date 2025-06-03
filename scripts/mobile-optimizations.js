// Android and mobile device optimizations

// Function to detect Android device
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

// Function to detect mobile device
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Apply Android-specific optimizations
function applyAndroidOptimizations() {
  if (isAndroid()) {
    // Add android-specific class to body
    document.body.classList.add('android-device');
    
    // Fix viewport height issues on Android Chrome
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Fix for position:fixed elements in Android
    const fixedElements = document.querySelectorAll('.fixed, [class*="fixed"]');
    fixedElements.forEach(el => {
      el.classList.add('fixed-android');
    });
  }
}

// Apply general mobile optimizations
function applyMobileOptimizations() {
  if (isMobile()) {
    // Add mobile class to body
    document.body.classList.add('mobile-device');
    
    // Handle input focus to prevent viewport issues
    const inputElements = document.querySelectorAll('input, textarea, select');
    inputElements.forEach(input => {
      input.addEventListener('focus', () => {
        input.classList.add('input-focused');
        // Small delay to ensure proper scrolling
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      });
      
      input.addEventListener('blur', () => {
        input.classList.remove('input-focused');
      });
    });
    
    // Optimize images loading on mobile
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
    
    // Reduce animation complexity on lower-end devices
    if (isLowEndDevice()) {
      document.body.classList.add('reduced-motion');
    }
  }
}

// Detect low-end devices based on memory and CPU cores
function isLowEndDevice() {
  // Try to detect device capabilities
  const memory = navigator.deviceMemory; // in GB, only in Chrome
  const concurrency = navigator.hardwareConcurrency; // CPU cores
  
  // Consider devices with less than 4GB RAM or less than 4 cores as low-end
  return (memory !== undefined && memory < 4) || 
         (concurrency !== undefined && concurrency < 4);
}

// Apply fastclick to eliminate 300ms delay on Android browsers
function removeTapDelay() {
  if (isMobile()) {
    // Simple implementation to reduce tap delay
    document.addEventListener('touchstart', function() {}, { passive: true });
  }
}

// Apply optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  applyAndroidOptimizations();
  applyMobileOptimizations();
  removeTapDelay();
  
  // Enable dynamic font sizing based on screen width for extreme cases
  if (window.innerWidth <= 360) {
    document.documentElement.style.fontSize = '14px';
  }
});

// Handle orientation changes
window.addEventListener('orientationchange', function() {
  // Small timeout to let the orientation really change
  setTimeout(() => {
    // Reapply viewport height fix
    if (isAndroid()) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, 100);
}); 