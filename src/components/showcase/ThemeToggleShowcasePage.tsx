import React, { useState, useRef } from 'react';
import '../../styles/showcase-toggles.css'; // We will create this CSS file next

// Interface for individual toggle props if needed, for now, we'll manage state internally
// interface ToggleProps {
//   id: number;
//   title: string;
//   description: string;
//   initialActive?: boolean;
// }

export const ThemeToggleShowcasePage: React.FC = () => {
  // State for each of the 8 toggles [isActive, isActive, ...]
  const [toggleStates, setToggleStates] = useState<boolean[]>(Array(8).fill(false));
  // Specific ref for Toggle 8 (Particle Burst) which needs direct DOM manipulation
  const particleToggleRef = useRef<HTMLDivElement>(null);

  const createParticles = (toggleAnimationWrapper: HTMLDivElement | null) => {
    if (!toggleAnimationWrapper) return;
    if (toggleAnimationWrapper.classList.contains('animating')) return;

    toggleAnimationWrapper.classList.add('animating');
    
    const slider = toggleAnimationWrapper.querySelector('.slider') as HTMLElement;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 25 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      
      if (slider) {
        particle.style.left = `${slider.offsetLeft + slider.offsetWidth / 2 - 2}px`;
        particle.style.top = `${slider.offsetTop + slider.offsetHeight / 2 - 2}px`;
      } else {
        particle.style.left = `${toggleAnimationWrapper.offsetWidth / 2 - 2}px`;
        particle.style.top = `${toggleAnimationWrapper.offsetHeight / 2 - 2}px`;
      }
      
      toggleAnimationWrapper.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    }
    
    setTimeout(() => toggleAnimationWrapper.classList.remove('animating'), 700);
  };

  const handleToggleClick = (index: number) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    if (index === 7) { // Index 7 for Toggle 8 (Particle Burst)
      createParticles(particleToggleRef.current);
    }
  };

  // Placeholder for the 8 toggles. We will populate this with the actual HTML structure.
  const togglesData = [
    { id: 1, title: 'Day/Night Cycle', description: 'Smooth sun to moon transition with stars' },
    { id: 2, title: 'Morphing Shape', description: 'Shape-shifting with emoji icons' },
    { id: 3, title: 'Sliding Sky', description: 'Sky transition with clouds' },
    { id: 4, title: 'Eclipse Effect', description: 'Moon eclipsing the sun' },
    { id: 5, title: 'Liquid Morph', description: 'Fluid gradient transition' },
    { id: 6, title: '3D Flip', description: '3D rotating card effect' },
    { id: 7, title: 'Neon Glow', description: 'Cyberpunk neon effect' },
    { id: 8, title: 'Particle Burst', description: 'Explosive particle animation' },
  ];

  return (
    <div className="theme-toggle-showcase-container p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 gradient-text">
        Creative Theme Toggle Showcase
      </h1>
      
      <div className="toggles-grid">
        {togglesData.map((toggle, index) => (
          <div key={toggle.id} className="toggle-card showcase-card"> {/* Added showcase-card for specific styling */}
            <h3 className="text-xl font-semibold mb-3 text-center">{toggle.title}</h3>
            
            {/* Clickable area - this is the .toggle-placeholder from CSS */}
            <div 
              className={`toggle-placeholder toggle-${toggle.id} ${toggleStates[index] ? 'active' : ''}`}
              onClick={() => handleToggleClick(index)}
              role="button"
              tabIndex={0}
              aria-pressed={toggleStates[index]}
              aria-label={`Toggle ${toggle.title}`}
              onKeyDown={(e) => e.key === 'Enter' && handleToggleClick(index)}
            >
              {/* Actual toggle styling and structure */}
              {toggle.id === 1 && ( // Day/Night Cycle
                <div className={`toggle-1-actual ${toggleStates[index] ? 'active' : ''}`}>
                  <div className="stars">
                    <div className="star" style={{top: '10px', left: '60px', animationDelay: '0s'}}></div>
                    <div className="star" style={{top: '20px', left: '70px', animationDelay: '0.5s'}}></div>
                    <div className="star" style={{top: '30px', left: '80px', animationDelay: '1s'}}></div>
                    <div className="star" style={{top: '15px', left: '90px', animationDelay: '1.5s'}}></div>
                  </div>
                </div>
              )}
              {toggle.id === 2 && ( // Morphing Shape
                <div className={`toggle-2-actual ${toggleStates[index] ? 'active' : ''}`}></div>
              )}
              {toggle.id === 3 && ( // Sliding Sky
                <div className={`toggle-3-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="cloud cloud1"></div>
                    <div className="cloud cloud2"></div>
                    <div className="celestial"></div>
                </div>
              )}
              {toggle.id === 4 && ( // Eclipse
                <div className={`toggle-4-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="sun"></div>
                    <div className="moon"></div>
                </div>
              )}
              {toggle.id === 5 && ( // Liquid Morph
                <div className={`toggle-5-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="handle"></div>
                </div>
              )}
              {toggle.id === 6 && ( // 3D Flip
                <div className={`toggle-6-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="toggle-6-inner">
                        <div className="toggle-6-front">☀️</div>
                        <div className="toggle-6-back">🌙</div>
                    </div>
                </div>
              )}
              {toggle.id === 7 && ( // Neon Glow
                <div className={`toggle-7-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <span className="neon-text day-text">DAY</span>
                    <span className="neon-text night-text">NEON</span>
                </div>
              )}
              {toggle.id === 8 && ( // Particle Burst
                <div ref={particleToggleRef} className={`toggle-8-actual ${toggleStates[index] ? 'active' : ''}`}>
                    <div className="slider"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-center text-[var(--secondary-text)] mt-3">{toggle.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 