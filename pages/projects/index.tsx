import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
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
        <Link href="/">
          <a>
            <div className="space-y-4 rounded-lg bg-yellow-400 py-8 px-20">
              <h1 className="text-7xl">Tatami</h1>
              <h3 className="text-3xl">Project Manager</h3>
            </div>
          </a>
        </Link>
      </div>
      <h2 className="text-4xl text-white">Projects</h2>
      <div className="mt-10 grid grid-cols-3 gap-3">
        {projects.map((project) => (
          <div
            className="space-y-3 rounded-lg bg-yellow-400 p-8"
            key={project.id}
          >
            <Link href={`/projects/${project.id}`}>
              <a className="text-4xl">{project.title}</a>
            </Link>
            <ul className="flex flex-col">
              {project.tasks.map((task) => (
                <Link href={`/projects/tasks/${task.id}`} key={task.id}>
                  <a>
                    <li>{task.title}</li>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="my-10"></div>
      <Link href="/projects/create">
        <a>
          <Button>Create Project</Button>
        </a>
      </Link>
      <Link href="/tasks/create">
        <a>
          <Button>Create Task</Button>
        </a>
      </Link>
    </>
  )
}

export default ProjectsPage
