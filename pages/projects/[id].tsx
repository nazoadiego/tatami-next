import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { FC, FormEvent, useState } from 'react'
import Button from '../../components/Button'
import type { IParams, Project } from '../../types/types'

interface ProjectShowProps {
  project: Project
}

const ProjectShow: FC<ProjectShowProps> = ({ project }) => {
  const router = useRouter()
  const [toggleUpdate, setToggleUpdate] = useState(false)
  const [toggleCreateTask, setToggleCreateTask] = useState(false)
  const [title, setTitle] = useState(project.title)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const handleDelete = (e: React.MouseEvent) => {
    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('project deleted')
    })
    router.back()
  }

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()

    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then(() => {
      console.log('project updated')
      router.reload()
    })
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      project_id: project.id,
    }

    fetch(`http://localhost:3000/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(() => {
      console.log('Task created')
    })
    router.reload()
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex w-[50vw] flex-col space-y-4">
        <Link href="/projects">
          <a>
            <Button>Go back</Button>
          </a>
        </Link>

        <h2>Title: {project.title}</h2>
        <h2>Tasks</h2>
        <div className="grid grid-cols-3 gap-2">
          {project.tasks.map((task) => (
            <div
              className={`rounded-lg py-6 px-4 ${
                task.completed ? 'bg-yellow-400' : 'bg-red-500'
              }`}
              key={task.id}
            >
              <Link href={`/projects/tasks/${task.id}`}>
                <a>{task.title}</a>
              </Link>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setToggleUpdate(!toggleUpdate)}>Update</Button>
          <Button onClick={() => setToggleCreateTask(!toggleCreateTask)}>
            Create new Task
          </Button>
        </div>
        {toggleUpdate && (
          <AnimatePresence exitBeforeEnter>
            <motion.form
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleUpdate}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-4xl">Update Project</h2>
                <label>Project title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                />
                <Button>Update project</Button>
              </div>
            </motion.form>
          </AnimatePresence>
        )}
        {toggleCreateTask && (
          <AnimatePresence exitBeforeEnter>
            <motion.form
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleCreate}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-4xl">project Create</h2>
                <label>Task title:</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="input-field"
                />
                <label>Task Description:</label>
                <textarea
                  required
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="input-field"
                />
                <Button>Create new task</Button>
              </div>
            </motion.form>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams
  const response = await fetch(`http://localhost:3000/projects/${id}`)
  const project = await response.json()
  return { props: { project } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/projects')
  const projects = await response.json()

  const paths = projects.map((project: Project) => {
    return {
      params: { id: project.id.toString() },
    }
  })

  return {
    // paths: paths, which is the same as
    paths,
    fallback: false,
  }
}

export default ProjectShow
