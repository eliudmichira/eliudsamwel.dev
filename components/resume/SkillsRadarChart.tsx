import React, { useEffect, useRef } from 'react';
import { ResumeSkill } from '../../types';

interface SkillsRadarChartProps {
  skills: ResumeSkill[];
  size?: number;
}

export const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ 
  skills, 
  size = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get computed styles to match theme
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryText = computedStyle.getPropertyValue('--primary-text') || '#2d3748';
    const secondaryText = computedStyle.getPropertyValue('--secondary-text') || '#4a5568';
    const accentColor = computedStyle.getPropertyValue('--accent-color') || '#f59e0b';
    const cardBg = computedStyle.getPropertyValue('--card-bg') || '#ffffff';
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Calculate positions
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 30;
    const sides = skills.length;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw background
    ctx.fillStyle = cardBg;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw grid lines
    const levels = 5; // Number of concentric circles
    for (let i = 1; i <= levels; i++) {
      const gridRadius = (radius * i) / levels;
      ctx.beginPath();
      ctx.arc(centerX, centerY, gridRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(128, 128, 128, 0.2)`;
      ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = `rgba(128, 128, 128, 0.3)`;
      ctx.stroke();
      
      // Draw labels
      const labelRadius = radius + 20;
      const skill = skills[i];
      const textX = centerX + labelRadius * Math.cos(angle);
      const textY = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillStyle = primaryText;
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, textX, textY);
    }
    
    // Draw data points and polygon
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const skill = skills[i];
      const pointRadius = (radius * (skill.level || 50)) / 100; // Default to 50 if level is undefined
      const pointX = centerX + pointRadius * Math.cos(angle);
      const pointY = centerY + pointRadius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(245, 158, 11, 0.3)`; // Accent color with transparency
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw data points
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const skill = skills[i];
      const pointRadius = (radius * (skill.level || 50)) / 100; // Default to 50 if level is undefined
      const pointX = centerX + pointRadius * Math.cos(angle);
      const pointY = centerY + pointRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(pointX, pointY, 4, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.fill();
    }
  }, [skills, size]);
  
  return (
    <div className="flex justify-center items-center my-4">
      <canvas ref={canvasRef} width={size} height={size} className="max-w-full"></canvas>
    </div>
  );
}; 
