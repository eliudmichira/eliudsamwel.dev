import { memo, useCallback } from 'react'
import { motion } from 'motion/react'
import type { Project } from '../../types/project'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick()
    }
  }, [onClick])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] cursor-pointer magnetic cursor-interactive"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className="aspect-video relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {project.priority === 'high' && (
          <div className="absolute top-2 right-2 bg-[var(--primary-amber)] text-white px-2 py-1 rounded-full text-sm">
            Priority
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-[var(--color-text-secondary)] line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(project.technologies).map(([category, techs]) => (
            techs.map((tech) => (
              <span
                key={`${category}-${tech}`}
                className="px-2 py-1 bg-[var(--color-bg-secondary)] rounded-full text-sm"
              >
                {tech}
              </span>
            ))
          ))}
        </div>
      </div>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard 
