import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/modern-journey.css';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  category: 'Experience' | 'Education' | 'Project';
  icon: string;
  location: string;
  description: string;
  achievement: {
    title: string;
    text: string;
  };
}

interface ConstellationStar {
  id: string;
  x: number;
  y: number;
  year: string;
  title: string;
  description: string;
}

interface ConstellationLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Constellation {
  id: string;
  name: string;
  description: string;
  stars: ConstellationStar[];
  lines: ConstellationLine[];
}

interface ModernTimelineProps {
  timelineItems: TimelineItem[];
  constellations: Constellation[];
}

const ModernTimeline: React.FC<ModernTimelineProps> = ({ timelineItems, constellations }) => {
  const [activeConstellation, setActiveConstellation] = useState<string>(constellations[0]?.id || 'orion');
  const [visibleStarInfo, setVisibleStarInfo] = useState<ConstellationStar | null>(null);
  const [starInfoPosition, setStarInfoPosition] = useState({ x: 0, y: 0 });
  const constellationCanvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Generate starfield
    const starfield = document.getElementById('starfield');
    if (starfield) {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (3 + Math.random() * 2) + 's';
        starfield.appendChild(star);
      }
    }

    // Scroll event listener for progress bar and timeline items
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      const progressFill = document.getElementById('progressFill');
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      
      // Timeline items visibility
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStarHover = (star: ConstellationStar, e: React.MouseEvent<SVGGElement>) => {
    if (constellationCanvasRef.current) {
      const rect = (e.target as SVGCircleElement).getBoundingClientRect();
      const canvasRect = constellationCanvasRef.current.getBoundingClientRect();
      
      setVisibleStarInfo(star);
      setStarInfoPosition({
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top
      });
    }
  };

  const handleStarLeave = () => {
    setVisibleStarInfo(null);
  };

  const scrollToTimeline = () => {
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
      timelineContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const switchConstellation = (constellationId: string) => {
    setActiveConstellation(constellationId);
  };

  const getActiveConstellation = () => {
    return constellations.find(c => c.id === activeConstellation) || constellations[0];
  };

  return (
    <>
      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-bg-pattern"></div>
        
        <div className="section-header fade-in-up">
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            Follow my professional path and milestones through time
          </p>
          
          <div className="scroll-indicator" onClick={scrollToTimeline}>
            <div className="scroll-indicator-text">Scroll to explore</div>
            <div className="scroll-indicator-icon">
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <div className="progress-fill" id="progressFill" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {timelineItems.map((item, index) => (
            <div className="timeline-item" key={item.id}>
              <div className="timeline-dot"></div>
              <div className="timeline-connector"></div>
              <div className="timeline-card">
                <div className="card-header">
                  <div className="card-category">
                    <div className="card-icon">{item.icon}</div>
                    <span className="category-label">{item.category}</span>
                  </div>
                  <span className="card-date">{item.year}</span>
                </div>
                
                <h3 className="card-title">{item.title}</h3>
                <div className="card-location">
                  <svg className="location-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>{item.location}</span>
                </div>
                
                <p className="card-description">
                  {item.description}
                </p>
                
                <div className="achievement-badge">
                  <div className="achievement-content">
                    <svg className="achievement-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <div>
                      <span className="achievement-title">{item.achievement.title}</span>
                      <span className="achievement-text">{item.achievement.text}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ModernTimeline; 