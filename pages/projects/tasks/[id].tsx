import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import type { Task, Project, IParams } from '../../../types/types'

interface TaskShowProps {
  task: Task
}

const TaskShow: FC<TaskShowProps> = ({ task }) => {
  const router = useRouter()
  const [toggleForm, setToggleForm] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [projectId, setProjectId] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])

  const handleDelete = (e: React.MouseEvent) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('task deleted')
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

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()
    console.log(projectId)

    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, project_id: projectId }),
    }).then(() => {
      console.log('task updated')
    })
    router.reload()
  }

  const markAsCompleted = () => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(() => {
      console.log('task updated')
    })
    router.reload()
  }

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col space-y-4">
          <Link href={`/projects/${task.project.id}`}>
            <a>
              <Button>Go back</Button>
            </a>
          </Link>

          <h2>Title: {task.title}</h2>
          <p>Description: {task.description}</p>
          <h3>Project: {task.project.title}</h3>
          <h3>Completed: {task.completed ? 'Yes' : 'Not yet'}</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => setToggleForm(!toggleForm)}>Update</Button>
            <Button onClick={markAsCompleted}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </Button>
          </div>
          {toggleForm && (
            <form
              onSubmit={handleUpdate}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-4xl">Task Create</h2>
                <label>Task title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                />
                <label>Task Description:</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                ></textarea>
                <label>Task Project:</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(Number(e.target.value))}
                  className="input-field"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                <Button>Update Task</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams
  const response = await fetch(`http://localhost:3000/tasks/${id}`)
  const task = await response.json()
  return { props: { task } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/tasks')
  const tasks = await response.json()

  const paths = tasks.map((task: Task) => {
    return {
      params: { id: task.id.toString() },
    }
  })

  return {
    // paths: paths, which is the same as
    paths,
    fallback: false,
  }
}

export default TaskShow
