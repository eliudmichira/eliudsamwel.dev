export interface Project {
  id: string
  title: string
  description: string
  image: string
  images: string[]
  technologies: {
    frontend: string[]
    backend: string[]
    database: string[]
    devops: string[]
  }
  keyMetrics: string[]
  achievements: string[]
  testimonials: {
    author: string
    role: string
    quote: string
  }[]
  links: {
    label: string
    url: string
  }[]
  priority: 'high' | 'medium' | 'low'
} 
