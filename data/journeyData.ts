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
    name: 'Orion — The foundation',
    description: 'Early async discipline: QA rigor, first remote clients, and learning to document clearly, spot inconsistencies, and deliver reliably across time zones.',
    stars: [
      {
        id: 'orion-1',
        x: 120,
        y: 90,
        year: '2020',
        title: 'Systems thinking',
        description: 'From coursework and self-directed builds toward reliable delivery'
      },
      {
        id: 'orion-2',
        x: 360,
        y: 300,
        year: '2021',
        title: 'QA & annotation ground game',
        description: 'Structured testing and quality habits on Testlio and similar platforms'
      },
      {
        id: 'orion-3',
        x: 560,
        y: 480,
        year: '2021',
        title: 'Independent async path',
        description: 'First remote clients; documentation, edge-case reporting, async delivery'
      }
    ],
    lines: [
      { x1: 120, y1: 90, x2: 360, y2: 300 },
      { x1: 360, y1: 300, x2: 560, y2: 480 }
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia — Engineering depth',
    description: 'Full-stack development, API integrations, and live product engineering — building the system intuition that now sharpens annotation accuracy.',
    stars: [
      {
        id: 'cassiopeia-1',
        x: 160,
        y: 180,
        year: '2022',
        title: 'Integration mindset',
        description: 'OAuth2, REST, retries, fallbacks, quota-aware API batches'
      },
      {
        id: 'cassiopeia-2',
        x: 400,
        y: 180,
        year: '2023',
        title: 'Stack depth',
        description: 'React, TypeScript, Node, Firebase, payments (M-Pesa / IntaSend)'
      },
      {
        id: 'cassiopeia-3',
        x: 280,
        y: 330,
        year: '2023',
        title: 'Product-grade reliability',
        description: 'Shipped apps with edge-case handling and system-level consistency checks'
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
    name: 'Ursa Major — Annotation mastery',
    description: 'Innodata AI content evaluation, perfect calibration score, auditor promotion, and JKUAT graduation — the convergence of engineering depth and evaluation precision.',
    stars: [
      {
        id: 'ursamajor-1',
        x: 560,
        y: 150,
        year: '2023',
        title: 'Blockchain voting platform',
        description: 'Secure elections stack — JWT, contracts, real-time results'
      },
      {
        id: 'ursamajor-2',
        x: 480,
        y: 210,
        year: '2023',
        title: 'SoundSwapp & FlickCollection',
        description: 'High-volume APIs, caching, and AI-augmented discovery'
      },
      {
        id: 'ursamajor-3',
        x: 400,
        y: 252,
        year: '2024',
        title: 'Neverest engineering',
        description: 'TinyPesa, UzaKitu, Pickup Mtaani — fintech + data familiarity'
      },
      {
        id: 'ursamajor-4',
        x: 320,
        y: 210,
        year: '2025',
        title: 'JKUAT degree milestone',
        description: 'BSc Business Computing — tying engineering to data and systems'
      },
      {
        id: 'ursamajor-5',
        x: 200,
        y: 120,
        year: '2026',
        title: 'Innodata: 35/35 & auditor',
        description: 'Perfect score on Video Master Eval → promoted to annotation auditor'
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