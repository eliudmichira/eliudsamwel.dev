// Mobile utility functions for better mobile experience

export class MobileUtils {
  // Check if device supports haptic feedback
  static supportsHaptics(): boolean {
    return 'vibrate' in navigator;
  }

  // Trigger haptic feedback
  static triggerHapticFeedback(pattern: number | number[] = 10): void {
    if (this.supportsHaptics()) {
      navigator.vibrate(pattern);
    }
  }

  // Check if device is mobile
  static isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Check if device supports touch
  static supportsTouch(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // Get device pixel ratio for image optimization
  static getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1;
  }

  // Check if device is low-end (for performance optimizations)
  static isLowEndDevice(): boolean {
    const memory = (navigator as any).deviceMemory;
    const cores = (navigator as any).hardwareConcurrency;
    
    return memory < 4 || cores < 4;
  }

  // Optimize images for mobile
  static getOptimizedImageUrl(url: string, width: number): string {
    const pixelRatio = this.getDevicePixelRatio();
    const optimizedWidth = Math.round(width * pixelRatio);
    
    // If using a CDN that supports image optimization
    if (url.includes('unsplash.com')) {
      return `${url}?w=${optimizedWidth}&q=80&fit=crop`;
    }
    
    return url;
  }

  // Add mobile-specific event listeners
  static addMobileEventListeners(element: HTMLElement): void {
    if (!this.supportsTouch()) return;

    // Prevent double-tap zoom on buttons
    element.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.triggerHapticFeedback();
    }, { passive: false });

    // Add touch feedback
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.98)';
    });

    element.addEventListener('touchend', () => {
      element.style.transform = 'scale(1)';
    });
  }

  // Optimize scroll performance
  static optimizeScroll(container: HTMLElement): void {
    (container.style as any).webkitOverflowScrolling = 'touch';
    container.style.scrollBehavior = 'smooth';
  }

  // Prevent zoom on input focus
  static preventInputZoom(): void {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
      });

      input.addEventListener('blur', () => {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
      });
    });
  }

  // Add pull-to-refresh functionality
  static addPullToRefresh(container: HTMLElement, onRefresh: () => void): void {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    container.addEventListener('touchstart', (e) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    });

    container.addEventListener('touchmove', (e) => {
      if (!isPulling) return;
      
      currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;
      
      if (pullDistance > 0 && container.scrollTop === 0) {
        e.preventDefault();
        container.style.transform = `translateY(${Math.min(pullDistance * 0.5, 100)}px)`;
      }
    });

    container.addEventListener('touchend', () => {
      if (!isPulling) return;
      
      const pullDistance = currentY - startY;
      
      if (pullDistance > 100) {
        onRefresh();
        this.triggerHapticFeedback([50, 50, 50]);
      }
      
      container.style.transform = '';
      isPulling = false;
    });
  }

  // Optimize animations for mobile
  static optimizeAnimations(): void {
    if (this.isLowEndDevice()) {
      // Reduce motion for low-end devices
      document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
      document.documentElement.style.setProperty('--transition-fast', 'all 0.1s ease');
    }
  }

  // Initialize mobile optimizations
  static init(): void {
    this.preventInputZoom();
    this.optimizeAnimations();
    
    // Add mobile-specific classes
    if (this.isMobile()) {
      document.body.classList.add('mobile-device');
    }
    
    if (this.supportsTouch()) {
      document.body.classList.add('touch-device');
    }
  }
} 
