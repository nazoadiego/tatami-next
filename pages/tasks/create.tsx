import { FC, useEffect, useState } from 'react'

interface TaskCreateProps {}

const TaskCreate: FC<TaskCreateProps> = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projects, setProjects] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const projectTitle = projects.find(
      (project) => project.id === projectId
    ).title

    const project_attributes = { id: projectId, title: projectTitle }
    const newTask = { title, description, project_attributes }
    console.log(JSON.stringify(newTask))

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(() => {
      console.log('new blog added')
    })
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
        <button className="rounded-lg bg-yellow-500 py-4 px-6">Add Task</button>
      </div>
    </form>
  )
}

export default TaskCreate
