import { memo, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaDesktop } from 'react-icons/fa'
import type { Project } from '../../types/project'

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
}

const ProjectDetailModal = memo(({ project, onClose }: ProjectDetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  const handleImageClick = useCallback((index: number) => {
    setActiveImageIndex(index)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={handleClose}
        onKeyPress={handleKeyPress}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg-surface)] rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)]"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="p-6">
            <h2 id="project-title" className="text-3xl font-bold mb-4">
              {project.title}
            </h2>

            <div className="aspect-video relative mb-6">
              <img
                src={project.images[activeImageIndex]}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {project.images.map((image, index) => (
                <button
                  key={`${project.id}-thumbnail-${index}`}
                  onClick={() => handleImageClick(index)}
                  className={`aspect-video rounded-lg overflow-hidden ${
                    index === activeImageIndex ? 'ring-2 ring-[var(--primary-amber)]' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">{project.description}</p>

              <h3 className="text-xl font-semibold mb-4">Technologies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {Object.entries(project.technologies).map(([category, techs]) => (
                  <div key={`${project.id}-tech-category-${category}`}>
                    <h4 className="font-medium mb-2 capitalize">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={`${project.id}-${category}-tech-${tech}`}
                          className="px-3 py-1 bg-[var(--color-bg-secondary)] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
              <ul className="list-disc list-inside mb-8">
                {project.keyMetrics.map((metric, index) => (
                  <li key={`${project.id}-metric-${metric}`} className="mb-2">
                    {metric}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              <ul className="list-disc list-inside mb-8">
                {project.achievements.map((achievement, index) => (
                  <li key={`${project.id}-achievement-${achievement}`} className="mb-2">
                    {achievement}
                  </li>
                ))}
              </ul>

              {project.testimonials.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4">Testimonials</h3>
                  <div className="space-y-4 mb-8">
                    {project.testimonials.map((testimonial, index) => (
                      <blockquote
                        key={`${project.id}-testimonial-${testimonial.author}-${testimonial.quote.slice(0, 20)}`}
                        className="border-l-4 border-[var(--primary-amber)] pl-4"
                      >
                        <p className="italic mb-2">{testimonial.quote}</p>
                        <footer className="text-sm">
                          <strong>{testimonial.author}</strong>
                          <span className="text-[var(--color-text-secondary)]">
                            {' '}
                            - {testimonial.role}
                          </span>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </>
              )}

              <div className="flex flex-wrap gap-4">
                {project.links?.map((link, linkIndex) => (
                  <motion.a
                    key={`${project.id}-link-${link.url}-${linkIndex}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
})

ProjectDetailModal.displayName = 'ProjectDetailModal'

export default ProjectDetailModal 
