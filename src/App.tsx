import { useState } from 'react'
import ProjectGallery from './components/projects/ProjectGallery'
import ProjectDetailModal from './components/projects/ProjectDetailModal'
import type { Project } from './types/project'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">My Projects</h1>
        <ProjectGallery onProjectSelect={setSelectedProject} />
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App 
