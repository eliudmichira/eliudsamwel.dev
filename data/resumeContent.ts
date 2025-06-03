import React from 'react';
import { ResumeData } from '../types';

// SVG Icon Components
// FIX: Convert JSX to React.createElement to resolve parsing and type errors, and explicitly type return as JSX.Element
const LocationIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
  )
);

// FIX: Convert JSX to React.createElement to resolve parsing and type errors
const EmailIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" })
  )
);

// FIX: Convert JSX to React.createElement to resolve parsing and type errors
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
  )
);

// FIX: Convert JSX to React.createElement to resolve parsing and type errors
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" })
  )
);

// Add GitHub icon
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" })
  )
);

// Add Portfolio icon
const PortfolioIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" })
  )
);


export const resumeData: ResumeData = {
  fullName: "Eliud Samwel",
  accentName: "Michira",
  jobTitle: "Full Stack Developer & Blockchain Specialist",
  location: {
    icon: LocationIcon,
    text: "Kenya (Available for Remote/Hybrid/Relocation opportunities)"
  },
  contactInfo: [
    { icon: EmailIcon, text: "eliudmichira7@gmail.com", href: "mailto:eliudmichira7@gmail.com", ariaLabel: "Email Eliud Michira" },
    { icon: PhoneIcon, text: "+254 705 893 137", href: "tel:+254705893137", ariaLabel: "Call Eliud Michira" },
    { icon: LinkedInIcon, text: "linkedin.com/in/eliudmichira", href: "https://www.linkedin.com/in/eliudmichira", ariaLabel: "Eliud Michira's LinkedIn Profile"},
    { icon: GitHubIcon, text: "github.com/eliudmichira", href: "https://github.com/eliudmichira", ariaLabel: "Eliud Michira's GitHub Profile"},
    { icon: PortfolioIcon, text: "eliudsamwel.dev", href: "https://eliudsamwel.dev", ariaLabel: "Eliud Michira's Portfolio Website"}
  ],
  professionalSummary: "Full Stack Developer with a strong focus on blockchain technology and modern web development. I specialize in creating efficient, accessible, and scalable applications that solve real-world problems. My expertise spans frontend (React, TypeScript) and backend (Node.js, Express) development, with additional experience in blockchain technology using Solidity and Web3.js. I'm passionate about leveraging technology to create impactful solutions, particularly in areas like fintech, secure voting systems, and user-centered web applications.",
  coreCompetencies: {
    skills: [
      { name: "React.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Solidity", level: 78 },
      { name: "Web3.js", level: 75 },
      { name: "Express.js", level: 85 },
      { name: "TailwindCSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 80 },
      { name: "RESTful APIs", level: 90 },
      { name: "Git/GitHub", level: 88 },
      { name: "AWS", level: 65 },
      { name: "Docker", level: 60 },
      { name: "UI/UX Design", level: 75 }
    ],
    detailed: [
      { category: "Frontend", items: "React.js, TypeScript, JavaScript, TailwindCSS, Framer Motion, HTML5, CSS3, SASS, Redux, Context API" },
      { category: "Backend", items: "Node.js, Express.js, REST APIs, GraphQL, WebSockets, JWT Auth" },
      { category: "Blockchain", items: "Solidity, Ethereum, Web3.js, Smart Contracts, DApps, MetaMask Integration" },
      { category: "Database", items: "MongoDB, PostgreSQL, Firebase, Redis" },
      { category: "DevOps & Tools", items: "Git, GitHub, Docker, AWS, CI/CD, VS Code, Postman" },
      { category: "Design & UI", items: "Figma, Adobe XD, Responsive Design, Accessibility, Material UI, Component Libraries" },
      { category: "Soft Skills", items: "Problem Solving, Technical Communication, Team Collaboration, Agile Methodologies, Time Management" }
    ]
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "Freelance & Personal Projects",
      dates: "January 2023 – Present",
      responsibilities: [
        "Developed a blockchain-based electoral management system with Ethereum smart contracts, providing transparent and secure voting processes",
        "Created an AI-integrated portfolio website using React, TypeScript, and TailwindCSS with advanced animations and accessibility features",
        "Built a mobile-responsive e-commerce platform with integrated payment solutions and real-time inventory management",
        "Implemented modern authentication flows including JWT, OAuth, and blockchain wallet verification across multiple projects"
      ]
    },
    {
      role: "Software Developer Intern",
      company: "Neverest Ltd under TAWA INNOVATE LIMITED",
      dates: "June 2023 – December 2023",
      responsibilities: [
        "Enhanced TinyPesa mobile payment solution with improved transaction flows and security features, resulting in 25% increased user adoption",
        "Redesigned UzaKitu e-commerce platform dashboard with D3.js visualizations, helping small businesses track performance metrics",
        "Implemented WebSocket-based real-time order updates, reducing support queries by 40% and improving customer satisfaction",
        "Collaborated in an agile development environment, participating in code reviews, daily standups, and sprint planning"
      ]
    },
    {
      role: "Blockchain Developer",
      company: "Independent Research & Development",
      dates: "January 2022 – Present",
      responsibilities: [
        "Researched and developed decentralized applications focusing on digital identity, secure voting, and financial inclusion",
        "Created smart contracts with Solidity for transparent voting systems with verifiable results and tamper-proof records",
        "Built frontend interfaces for blockchain applications using React and Web3.js to interact with Ethereum network",
        "Implemented security best practices including proper access control, input validation, and protection against common smart contract vulnerabilities"
      ]
    },
    {
      role: "Web Development Consultant",
      company: "Self-employed",
      dates: "January 2021 – Present",
      responsibilities: [
        "Consulted with small businesses and startups to develop strategic web presences and digital platforms",
        "Designed and built performant, SEO-optimized websites tailored to client needs and industry requirements",
        "Provided technical guidance on technology stack selection and implementation strategies",
        "Maintained ongoing client relationships, delivering updates and feature enhancements as needed"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Business Computing",
      institution: "Jomo Kenyatta University of Agriculture and Technology",
      dates: "September 2021 – Present (Expected graduation 2025)",
      details: "Focusing on software development, database management, and business analysis. Maintaining a strong academic record while actively working on practical projects."
    },
    {
      degree: "Kenya Certificate of Secondary Education",
      institution: "Starehe Boys Centre",
      dates: "Completed 2020",
      details: "Achieved excellent academic results with particular strength in Mathematics, Physics, and Computer Studies."
    }
  ],
  professionalDevelopment: [
    { item: "Advanced React & TypeScript Patterns", source: "Frontend Masters", date: "March 2024" },
    { item: "Blockchain Developer Certification", source: "Ethereum Foundation", date: "June 2023" },
    { item: "Full Stack Web Development", source: "Udacity", date: "March 2022" },
    { item: "Modern JavaScript: ES6+", source: "Zero To Mastery Academy", date: "January 2022" },
    { item: "UI/UX Design Fundamentals", source: "Designlab", date: "November 2021" },
    { item: "Continuous Learning", source: "Actively staying updated on emerging technologies through online resources, documentation, technical blogs, and open source contributions" }
  ],
  references: [
    {
      name: "Professional references available upon request",
      title: "",
      contacts: []
    }
  ]
};
