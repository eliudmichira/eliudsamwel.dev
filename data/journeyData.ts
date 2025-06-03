export interface TimelineItem {
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

export interface ConstellationStar {
  id: string;
  x: number;
  y: number;
  year: string;
  title: string;
  description: string;
}

export interface ConstellationLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Constellation {
  id: string;
  name: string;
  description: string;
  stars: ConstellationStar[];
  lines: ConstellationLine[];
}

export const constellations: Constellation[] = [
  {
    id: 'orion',
    name: 'Orion - The Foundation',
    description: 'Laying the groundwork: core software development skills, early professional experiences, and a commitment to innovative problem-solving.',
    stars: [
      {
        id: 'orion-1',
        x: 120,
        y: 90,
        year: '2020',
        title: 'Building Software Foundations',
        description: 'Developed a strong foundation in software development'
      },
      {
        id: 'orion-2',
        x: 360,
        y: 300,
        year: '2021',
        title: 'Internship: Neverest/TAWA',
        description: 'Enhanced UIs, integrated real-time updates'
      },
      {
        id: 'orion-3',
        x: 560,
        y: 480,
        year: '2021',
        title: 'Innovative Problem Solving',
        description: 'Focused on solving real-world problems'
      }
    ],
    lines: [
      { x1: 120, y1: 90, x2: 360, y2: 300 },
      { x1: 360, y1: 300, x2: 560, y2: 480 }
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia - The Craftsman',
    description: 'Focusing on quality and user experience: championing user-centric design, mastering key technologies, and adhering to clean and ethical coding principles.',
    stars: [
      {
        id: 'cassiopeia-1',
        x: 160,
        y: 180,
        year: '2021',
        title: 'User-Centric Design Focus',
        description: 'Championed user-friendly design and development'
      },
      {
        id: 'cassiopeia-2',
        x: 400,
        y: 180,
        year: '2022',
        title: 'Tech Stack Proficiency',
        description: 'Mastered versatile tech stack'
      },
      {
        id: 'cassiopeia-3',
        x: 280,
        y: 330,
        year: '2022',
        title: 'Clean & Ethical Coding',
        description: 'Committed to clean, maintainable code'
      }
    ],
    lines: [
      { x1: 160, y1: 180, x2: 400, y2: 180 },
      { x1: 400, y1: 180, x2: 280, y2: 330 },
      { x1: 280, y1: 330, x2: 160, y2: 180 }
    ]
  },
  {
    id: 'ursamajor',
    name: 'Ursa Major - The Innovator',
    description: 'Spearheading innovation: developing a decentralized voting system, exploring blockchain synergies, and committing to continuous learning and impactful solutions.',
    stars: [
      {
        id: 'ursamajor-1',
        x: 560,
        y: 150,
        year: '2023',
        title: 'Decentralized Voting System',
        description: 'Blockchain-based voting solution'
      },
      {
        id: 'ursamajor-2',
        x: 480,
        y: 210,
        year: '2023',
        title: 'Voting System: Tech Deep Dive',
        description: 'Smart contracts and real-time updates'
      },
      {
        id: 'ursamajor-3',
        x: 400,
        y: 252,
        year: '2024',
        title: 'Blockchain & Web Synergy',
        description: 'Innovation in decentralized systems'
      },
      {
        id: 'ursamajor-4',
        x: 320,
        y: 210,
        year: '2024',
        title: 'Continuous Learning & Growth',
        description: 'Expanding skills through practice'
      },
      {
        id: 'ursamajor-5',
        x: 200,
        y: 120,
        year: '2024',
        title: 'Focus on Impactful Solutions',
        description: 'Building for positive change'
      }
    ],
    lines: [
      { x1: 560, y1: 150, x2: 480, y2: 210 },
      { x1: 480, y1: 210, x2: 400, y2: 252 },
      { x1: 400, y1: 252, x2: 320, y2: 210 },
      { x1: 320, y1: 210, x2: 200, y2: 120 }
    ]
  }
]; 