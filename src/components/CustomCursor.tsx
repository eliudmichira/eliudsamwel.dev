import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const targetPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  // Smooth cursor movement with improved interpolation and scaling
  const updateCursorPosition = () => {
    if (!cursorRef.current || !outlineRef.current) return;

    const cursor = cursorRef.current;
    const outline = outlineRef.current;
    const text = textRef.current;

    // Smooth interpolation for natural movement
    const lerpFactor = 0.22; // Faster response for cursor dot (increased for snappier movement)
    const outlineLerpFactor = 0.13; // Slightly faster for outline (increased for snappier movement)

    // Base dimensions
    const baseDotSize = 4; // 8px width/height, so center offset is 4px
    const baseOutlineSize = 20; // 40px width/height, so center offset is 20px

    // Calculate scaling based on interaction state
    let dotScale = 1;
    let outlineScale = 1;

    if (isClicking) {
      dotScale = 0.6;
      outlineScale = 0.8;
    } else if (cursorType === 'button' || cursorType === 'link' || cursorType === 'interactive') {
      dotScale = 1.1;
      outlineScale = 1.2;
    } else if (cursorType === 'magnetic') {
      dotScale = 1.2;
      outlineScale = 1.4;
    } else if (cursorType === 'text') {
      dotScale = 1;
      outlineScale = 0.8;
    } else if (isHovering) {
      outlineScale = 1.3;
    }

    // Apply scaling to dimensions
    const dotSize = baseDotSize * dotScale;
    const outlineSize = baseOutlineSize * outlineScale;

    // Update cursor dot position and size
    const currentX = parseFloat(cursor.style.left) || 0;
    const currentY = parseFloat(cursor.style.top) || 0;
    
    const targetDotX = targetPositionRef.current.x - dotSize;
    const targetDotY = targetPositionRef.current.y - dotSize;
    
    const newX = currentX + (targetDotX - currentX) * lerpFactor;
    const newY = currentY + (targetDotY - currentY) * lerpFactor;

    cursor.style.left = `${newX}px`;
    cursor.style.top = `${newY}px`;
    cursor.style.width = `${dotSize * 2}px`;
    cursor.style.height = `${dotSize * 2}px`;

    // Special handling for text cursor
    if (cursorType === 'text') {
      cursor.style.width = '2px';
      cursor.style.height = '20px';
    }

    // Update outline position and size
    const outlineCurrentX = parseFloat(outline.style.left) || 0;
    const outlineCurrentY = parseFloat(outline.style.top) || 0;
    
    const targetOutlineX = targetPositionRef.current.x - outlineSize;
    const targetOutlineY = targetPositionRef.current.y - outlineSize;
    
    const outlineNewX = outlineCurrentX + (targetOutlineX - outlineCurrentX) * outlineLerpFactor;
    const outlineNewY = outlineCurrentY + (targetOutlineY - outlineCurrentY) * outlineLerpFactor;

    outline.style.left = `${outlineNewX}px`;
    outline.style.top = `${outlineNewY}px`;
    outline.style.width = `${outlineSize * 2}px`;
    outline.style.height = `${outlineSize * 2}px`;

    // Update text position (follows cursor closely)
    if (text && hoverText) {
      text.style.left = `${newX + 20}px`;
      text.style.top = `${newY - 30}px`;
    }

    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
  };

  // Mouse move handler with optimized performance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY };
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
        // Initialize positions to prevent jump - center both elements on mouse
        if (cursorRef.current && outlineRef.current) {
          cursorRef.current.style.left = `${e.clientX - 4}px`;
          cursorRef.current.style.top = `${e.clientY - 4}px`;
          cursorRef.current.style.width = '8px';
          cursorRef.current.style.height = '8px';
          outlineRef.current.style.left = `${e.clientX - 20}px`;
          outlineRef.current.style.top = `${e.clientY - 20}px`;
          outlineRef.current.style.width = '40px';
          outlineRef.current.style.height = '40px';
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      createRipple(mousePositionRef.current.x, mousePositionRef.current.y);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Create ripple effect
    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = `${x - 30}px`;
      ripple.style.top = `${y - 30}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 800);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, hoverText]);

  // Handle interactive elements with improved detection
  useEffect(() => {
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);

      // Enhanced element detection
      if (target.tagName === 'BUTTON') {
        setCursorType('button');
        setHoverText('CLICK');
      } else if (target.tagName === 'A') {
        setCursorType('link');
        const href = target.getAttribute('href');
        setHoverText(href?.startsWith('http') ? 'VISIT' : 'GO');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('text');
        setHoverText('TYPE');
      } else if (target.classList.contains('magnetic')) {
        setCursorType('magnetic');
        setHoverText('INTERACT');
      } else if (target.classList.contains('cursor-interactive')) {
        setCursorType('interactive');
        setHoverText('VIEW');
      } else {
        setCursorType('hover');
        setHoverText('');
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorType('default');
      setHoverText('');
    };

    // Add listeners to interactive elements with improved selector
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .magnetic, .cursor-interactive, [data-cursor="interactive"]'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''} ${cursorType} ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          left: 0,
          top: 0,
        }}
      />

      {/* Cursor Outline */}
      <div
        ref={outlineRef}
        className={`cursor-outline ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''} ${cursorType} ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          left: -20,
          top: -20,
        }}
      />

      {/* Cursor Text */}
      {hoverText && (
        <div
          ref={textRef}
          className={`cursor-text ${isHovering && hoverText ? 'visible' : ''}`}
          style={{
            left: 20,
            top: -30,
          }}
        >
          {hoverText}
        </div>
      )}
    </>
  );
};

export default CustomCursor; 
