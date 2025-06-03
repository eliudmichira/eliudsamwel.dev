
import { useEffect, useState, RefObject, useRef } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {}

export function useIntersectionObserver<T extends HTMLElement,>(
  elementRef: RefObject<T>,
  options: IntersectionObserverOptions,
  unobserveOnIntersect: boolean = true // New parameter
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null); // To store the observer instance

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Clean up previous observer if options or element change
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (unobserveOnIntersect && observerRef.current && element) {
          observerRef.current.unobserve(element);
        }
      } else {
        // Optional: If you want to re-trigger when it leaves and re-enters (if unobserveOnIntersect is false)
        if (!unobserveOnIntersect) {
             setIsIntersecting(false);
        }
      }
    }, options);

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        // Check if observerRef.current is not null before calling unobserve
        observerRef.current.unobserve(element);
      }
      // Also disconnect on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, options.root, options.rootMargin, options.threshold, unobserveOnIntersect]);

  return isIntersecting;
}
