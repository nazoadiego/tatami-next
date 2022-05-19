import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Project } from '../../types/types'

const ProjectsPage: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <div className="space-y-4 rounded-lg bg-[#ffef77] py-8 px-20">
          <h1 className="text-7xl">Tatami</h1>
          <h3 className="text-3xl">Project Manager</h3>
        </div>
      </div>
      <h2 className="text-4xl text-white">Projects</h2>
      <div className="mt-10 grid grid-cols-3 gap-3">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <a>
              <div className="space-y-3 rounded-lg bg-[#ffef77] p-8">
                <h5 className="text-4xl">{project.title}</h5>
                <div className="flex flex-col">
                  {project.tasks.map((task) => (
                    <Link href={`/tasks/${task.id}`}>
                      <a>{task.title}</a>
                    </Link>
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="my-10"></div>
      <Link href="/projects/create">
        <button className="rounded-lg bg-yellow-400 py-4 px-6 text-xl">
          Create Project
        </button>
      </Link>
      <Link href="/tasks/create">
        <button className="rounded-lg bg-yellow-400 py-4 px-6 text-xl">
          Create Task
        </button>
      </Link>
    </>
  )
}

export default ProjectsPage
