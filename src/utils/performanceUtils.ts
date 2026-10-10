// Performance monitoring and optimization utilities
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  imageLoadTimes: Map<string, number>;
  userInteractions: number;
  memoryUsage?: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics;
  private startTime: number;

  private constructor() {
    this.startTime = performance.now();
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      imageLoadTimes: new Map(),
      userInteractions: 0
    };
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  trackImageLoad(imageUrl: string, loadTime: number): void {
    this.metrics.imageLoadTimes.set(imageUrl, loadTime);
  }

  trackUserInteraction(): void {
    this.metrics.userInteractions++;
  }

  trackPageLoad(): void {
    this.metrics.loadTime = performance.now() - this.startTime;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  log(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log(`Page Load Time: ${this.metrics.loadTime.toFixed(2)}ms`);
      console.log(`User Interactions: ${this.metrics.userInteractions}`);
      console.log(`Images Loaded: ${this.metrics.imageLoadTimes.size}`);
      
      if (this.metrics.imageLoadTimes.size > 0) {
        const avgImageLoad = Array.from(this.metrics.imageLoadTimes.values())
          .reduce((acc, time) => acc + time, 0) / this.metrics.imageLoadTimes.size;
        console.log(`Average Image Load Time: ${avgImageLoad.toFixed(2)}ms`);
      }
      
      console.groupEnd();
    }
  }
}

// Image optimization utilities
export interface OptimizedImageSources {
  webp: string;
  avif?: string;
  fallback: string;
  placeholder?: string;
}

export const generateOptimizedImageSources = (originalSrc: string): OptimizedImageSources => {
  if (!originalSrc || typeof originalSrc !== 'string') {
    return {
      webp: '',
      fallback: originalSrc || '',
    };
  }

  const baseUrl = originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '');
  const extension = originalSrc.match(/\.(jpg|jpeg|png|gif)$/i)?.[1] || 'jpg';

  return {
    webp: `${baseUrl}.webp`,
    avif: `${baseUrl}.avif`,
    fallback: originalSrc,
    placeholder: `${baseUrl}_placeholder.${extension}`
  };
};

// Lazy loading utilities
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Virtual scrolling utilities
export interface VirtualScrollConfig {
  itemHeight: number;
  containerHeight: number;
  totalItems: number;
  overscan?: number;
}

export const calculateVisibleRange = (
  scrollTop: number,
  config: VirtualScrollConfig
): { startIndex: number; endIndex: number; totalHeight: number } => {
  const { itemHeight, containerHeight, totalItems, overscan = 5 } = config;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(totalItems - 1, startIndex + visibleItems + overscan * 2);
  
  return {
    startIndex,
    endIndex,
    totalHeight: totalItems * itemHeight
  };
};

// Memory optimization utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Bundle size optimization
export const loadComponentAsync = <T>(
  importFunc: () => Promise<{ default: T }>
): Promise<T> => {
  return importFunc().then(module => module.default);
};

// Performance tips for users
export const getPerformanceTips = (): string[] => {
  const connection = (navigator as any).connection;
  const tips: string[] = [];

  if (connection) {
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      tips.push('Slow connection detected. Consider viewing fewer images at once.');
    }
    
    if (connection.saveData) {
      tips.push('Data saver mode detected. Optimized content is being served.');
    }
  }

  const memory = (performance as any).memory;
  if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
    tips.push('High memory usage detected. Try refreshing the page.');
  }

  return tips;
};

// Preloading utilities
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async (imageSources: string[]): Promise<void> => {
  const criticalImages = imageSources.slice(0, 6); // First 6 images
  
  try {
    await Promise.all(criticalImages.map(preloadImage));
    console.log(`✅ Preloaded ${criticalImages.length} critical images`);
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};

// Service Worker helpers for caching
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
};

// Analytics and tracking
export const trackPerformanceMetrics = (): void => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const metrics = PerformanceMonitor.getInstance();
      metrics.trackPageLoad();
      
      // Track Core Web Vitals
      if ('web-vitals' in window) {
        // This would integrate with web-vitals library if available
        console.log('Web Vitals tracking enabled');
      }
      
      // Log metrics after page load
      setTimeout(() => metrics.log(), 1000);
    });
  }
};

export default {
  PerformanceMonitor,
  generateOptimizedImageSources,
  createIntersectionObserver,
  calculateVisibleRange,
  debounce,
  throttle,
  loadComponentAsync,
  getPerformanceTips,
  preloadImage,
  preloadCriticalImages,
  registerServiceWorker,
  trackPerformanceMetrics
}; 
