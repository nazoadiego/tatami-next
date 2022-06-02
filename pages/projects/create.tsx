import { useRouter } from 'next/router'
import { FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../components/Button'
import type { Project } from '../../types/types'

interface TaskCreateProps {}

const TaskCreate: FC<TaskCreateProps> = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projects, setProjects] = useState<Project[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newTask = { title, description, project_id: projectId }
    console.log(JSON.stringify(newTask))

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(() => {
      console.log('new blog added')
    })
    router.back()
  }

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
        setProjectId(data[0].id)
      })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div className="flex flex-col space-y-4">
        <h2 className="text-4xl">Task Create</h2>
        <label>Task title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black"
        />
        <label>Task Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black"
        ></textarea>
        <label>Task Project:</label>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="text-black"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <Button>Add Task</Button>
      </div>
    </form>
  )
}

export default TaskCreate
