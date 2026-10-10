import { useState, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import ProjectCard from './ProjectCard'
import type { Project } from '../../types/project'

interface ProjectGalleryProps {
  onProjectSelect: (project: Project) => void
}

const ProjectGallery = ({ onProjectSelect }: ProjectGalleryProps) => {
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Real projects data using available images
  const projects: Project[] = useMemo(() => [
    {
      id: 'flickcollection',
      title: 'FlickCollection: Reimagining Movie Discovery',
      description: 'A "Tinder for Movies" app solving choice paralysis through gamified discovery. Features AI-powered personalization, a custom "Halo" design system, and a hybrid-native architecture that bridges web and Android platforms.',
      image: '/images/projects/flickcollection login .png',
      images: [
        '/images/projects/flickcollection login .png',
        '/images/projects/flickcollection feed desktop.png',
        '/images/projects/flickcollection-desktop profie.png',
        '/images/projects/flickcollection-discover page.png',
        '/images/projects/flickcollection-desktop playlists.png',
        '/images/projects/flickcollection-mobile feed.png',
        '/images/projects/flickcollection-mobile social view .png',
        '/images/projects/flickcollection-social view discover.png',
        '/images/projects/flickcollection-discover page mobile.png',
        '/images/projects/flickcollection-mobile profile page.png'
      ],
      technologies: {
        frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Firebase Firestore', 'Firebase Auth', 'Google Gemini API', 'TMDB API'],
        database: ['Firestore'],
        devops: ['Capacitor.js', 'Kotlin', 'Android Native Modules']
      },
      keyMetrics: ['40% Increased Session Duration', '98/100 Lighthouse Score', 'Hybrid-Native Architecture'],
      achievements: [
        'Architected "Halo" design system with 5-layer visual depth',
        'Built custom native Android bridges for hardware integration',
        'Implemented intelligent offline fallback systems',
        'Integrated Google Gemini AI for hyper-personalized collections',
        'Optimized GPU-accelerated video playback'
      ],
      testimonials: [{
        author: 'User Review',
        role: 'Early Adopter',
        quote: 'FlickCollection isn\'t just a database; it\'s a personalized cinema concierge that sits in your pocket.'
      }],
      links: [{
        label: 'Live Web App',
        url: 'https://flickpool-50408.web.app'
      }],
      priority: 'high'
    },
    {
      id: 'homeske',
      title: "HomesKE — Kenya's Premier Real Estate Marketplace",
      description: "A full-stack real estate platform simplifying buying, selling, and renting properties across all 47 counties in Kenya. Trusted by 10,000+ property seekers with AI-powered matching, 60+ verified agents, M-Pesa integration, and 1,529+ live listings.",
      image: '/images/projects/homeske landing.png',
      images: [
        '/images/projects/homeske landing.png',
        '/images/projects/homes ke carrousel.png',
        '/images/projects/homeske properties.png',
        '/images/projects/homes ke landing next.png',
        '/images/projects/homes ke agents.png',
        '/images/projects/homeske blog.png',
        '/images/projects/homes ke desktop auth.png',
        '/images/projects/homeske mobile home.png',
        '/images/projects/homeske mobile auth.png',
        '/images/projects/homeske properties mobile.png'
      ],
      technologies: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
        backend: ['Firebase Hosting', 'Firebase Auth', 'Firebase Firestore'],
        database: ['Firebase Firestore'],
        devops: ['M-Pesa API', 'Google OAuth', 'Gemini AI', 'Firebase CLI']
      },
      keyMetrics: ['1,529+ Properties Listed', '10,000+ Property Seekers', '60+ Verified Agents', '98% Agent Response Rate'],
      achievements: [
        'Kenya-first real estate marketplace with M-Pesa payment integration',
        '1,529+ verified listings across 9+ counties',
        'AI-powered property matching engine',
        '60+ curated expert agents with 98% response rate',
        '500+ daily views on featured premium listings'
      ],
      testimonials: [{
        author: 'Property Seeker, Nairobi',
        role: 'Verified User',
        quote: 'HomesKE made finding my apartment in Nairobi so easy. The agent responded within minutes!'
      }],
      links: [{
        label: 'Live Platform',
        url: 'https://homeske--staging-ygtvdog1.web.app/desktop'
      }],
      priority: 'high'
    },
    {
      id: '1',
      title: 'Conison Construction Management Platform',
      description: 'A comprehensive construction management platform featuring client dashboards, project tracking, quote management, and integrated payment processing with IntaSend. Built with modern web technologies and deployed on Firebase.',
      image: '/images/projects/conison home page.png',
      images: [
        '/images/projects/conison home page.png',
        '/images/projects/conison full home page.png',
        '/images/projects/conison client dashboard.png',
        '/images/projects/conison admin page.png',
        '/images/projects/conison payment processing with intasend.png',
        '/images/projects/conison quotes page.png',
        '/images/projects/conison admin quotes management.png',
        '/images/projects/conison portfolio page.png',
        '/images/projects/conison services page.png',
        '/images/projects/conison about us.png',
        '/images/projects/conison contact us page (1).png'
      ],
      technologies: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express', 'Firebase Functions'],
        database: ['Firebase Firestore', 'MongoDB'],
        devops: ['Firebase Hosting', 'IntaSend API', 'CI/CD']
      },
      keyMetrics: ['Live Production App', '99.9% Uptime', '30+ Feature Pages', 'Payment Integration'],
      achievements: [
        'Full-stack construction management solution',
        'Integrated IntaSend payment processing',
        'Real-time project tracking and reporting',
        'Responsive design for mobile and desktop',
        'Admin dashboard with comprehensive analytics',
        'Client portal with project visibility'
      ],
      testimonials: [{
        author: 'Construction Manager',
        role: 'Project Lead',
        quote: 'This platform has revolutionized how we manage our construction projects and client relationships!'
      }],
      links: [{
        label: 'Live Application',
        url: 'https://conison-25ccd.firebaseapp.com/'
      }, {
        label: 'GitHub Repository',
        url: '#'
      }],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Bogani E-Commerce Platform',
      description: 'Modern e-commerce platform with admin dashboard, inventory management, and client order tracking.',
      image: '/images/projects/bogani home page.png',
      images: [
        '/images/projects/bogani home page.png',
        '/images/projects/bogani admin dashboard.png',
        '/images/projects/bogani client dashboard.png',
        '/images/projects/bogani admin inventory.png',
        '/images/projects/bogani produc page.png'
      ],
      technologies: {
        frontend: ['React', 'Next.js', 'TypeScript'],
        backend: ['Node.js', 'GraphQL'],
        database: ['PostgreSQL'],
        devops: ['Vercel', 'Docker']
      },
      keyMetrics: ['1000+ Products', '95% Customer Satisfaction', '40% Sales Increase'],
      achievements: ['Responsive design', 'Real-time inventory', 'Advanced analytics'],
      testimonials: [{
        author: 'Store Owner',
        role: 'Business Owner',
        quote: 'Our sales increased significantly after launching this platform!'
      }],
      links: [{
        label: 'GitHub',
        url: '#'
      }],
      priority: 'high'
    },
    {
      id: '3',
      title: 'Blockchain Voting System',
      description: 'Secure blockchain-based voting system with MetaMask integration and transparent result verification.',
      image: '/images/projects/main voting page blockchain.png',
      images: [
        '/images/projects/main voting page blockchain.png',
        '/images/projects/admin dashboard block chain.png',
        '/images/projects/vote verification interfeace blockchain.png',
        '/images/projects/login screen blockchain light mode.png',
        '/images/projects/results in the admin dashboard blockchain.png'
      ],
      technologies: {
        frontend: ['React', 'Web3.js', 'TypeScript'],
        backend: ['Solidity', 'Ethereum'],
        database: ['IPFS'],
        devops: ['Truffle', 'Ganache']
      },
      keyMetrics: ['100% Transparent', 'Immutable Records', '0 Security Breaches'],
      achievements: ['Blockchain integration', 'MetaMask authentication', 'Decentralized storage'],
      testimonials: [{
        author: 'Election Official',
        role: 'Government Official',
        quote: 'This system ensures complete transparency in our voting process!'
      }],
      links: [{
        label: 'GitHub',
        url: '#'
      }],
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Conison Commerce Hub - Full-Stack Digital Services Platform',
      description: 'A comprehensive digital commerce platform built for Conison Technologies, a Kenya-based tech company established in 2023. The platform serves as both a client portal and business management system, featuring quote request processing, payment integration, project tracking, and an extensive portfolio showcase for 7 core services.',
      image: '/images/projects/conison home page.png',
      images: [
        '/images/projects/conison full home page.png',
        '/images/projects/conison home page.png',
        '/images/projects/conison services page.png',
        '/images/projects/conison about us.png',
        '/images/projects/conison portfolio page.png',
        '/images/projects/conison  portfolio page 2.png',
        '/images/projects/conison portfolio page 3.png',
        '/images/projects/conison porfolio detail page 1.png',
        '/images/projects/conison client dashboard.png',
        '/images/projects/conison clients.png',
        '/images/projects/conison admin page.png',
        '/images/projects/conison admin projects.png',
        '/images/projects/conison admin quotes management.png',
        '/images/projects/conison user management.png',
        '/images/projects/conison reports.png',
        '/images/projects/conison quote request page.png',
        '/images/projects/conison quotes page.png',
        '/images/projects/conison rate card oage.png',
        '/images/projects/conison payments page.png',
        '/images/projects/conison contact us page (1).png',
        '/images/projects/conison contact us page (2).png',
        '/images/projects/conison footer.png',
        '/images/projects/contact page portfolio.png'
      ],
      technologies: {
        frontend: ['React.js 18.3.1', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'React Hook Form'],
        backend: ['Node.js', 'Express.js', 'Firebase Functions', 'Google Gemini AI', 'Firebase Admin SDK'],
        database: ['Firebase Firestore', 'Firebase Authentication', 'Secure API Endpoints'],
        devops: ['Firebase Hosting', 'IntaSend API', 'EmailJS', 'SSL Certificates', 'CDN Integration']
      },
      keyMetrics: [
        '7 Core Business Services',
        'Complete Client Portal System',
        'AI-Powered Customer Support',
        'IntaSend Payment Integration',
        'Admin Dashboard & Analytics',
        'Automated Quote Processing',
        'Multi-Service Rate Calculator',
        'Real-time Project Tracking',
        'Comprehensive Portfolio Showcase',
        'Email Notification System'
      ],
      achievements: [
        'Built complete client management system with secure Firebase authentication',
        'Integrated IntaSend payment gateway for seamless transaction processing',
        'Implemented AI-powered customer support using Google Gemini for intelligent assistance',
        'Created comprehensive admin dashboard for business operations and analytics',
        'Developed automated quote request and processing system with email notifications',
        'Built responsive design supporting all device types with optimal performance',
        'Established portfolio showcase with case studies and client testimonials',
        'Implemented secure data encryption and privacy compliance measures',
        'Created scalable cloud architecture suitable for growing technology business'
      ],
      testimonials: [{
        author: 'Eliud Samwels',
        role: 'CTO, Conison Technologies',
        quote: 'This commerce platform has revolutionized how we manage our clients and deliver our 7 core technology services. The automated quote system and payment integration have streamlined our entire business process!'
      }],
      links: [{
        label: 'Live Commerce Platform',
        url: 'https://conison-25ccd.firebaseapp.com/'
      }, {
        label: 'Client Portal Demo',
        url: 'https://conison-25ccd.firebaseapp.com/'
      }],
      priority: 'high'
    }
  ], [])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'all' || project.technologies[filter as keyof typeof project.technologies]?.length > 0
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [projects, filter, searchQuery])

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter)
  }, [])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
        />
        <div className="flex gap-2">
          {['all', 'frontend', 'backend', 'database', 'devops'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => handleFilterChange(filterType)}
              className={`px-4 py-2 rounded-lg ${filter === filterType
                  ? 'bg-[var(--primary-amber)] text-white'
                  : 'bg-[var(--color-bg-surface)] border border-[var(--color-border)]'
                }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectSelect(project)}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectGallery 
