import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { FC, FormEvent, useState } from 'react'
import type { IParams, Project } from '../../types/types'

interface ProjectShowProps {
  project: Project
}

const ProjectShow: FC<ProjectShowProps> = ({ project }) => {
  const router = useRouter()
  const [toggleForm, setToggleForm] = useState(false)
  const [title, setTitle] = useState(project.title)

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
    })
    router.reload()
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col space-y-4">
        <Link href="/projects">
          <button className="rounded-lg bg-yellow-500 py-4 px-6">
            Go back
          </button>
        </Link>

        <h2>Title: {project.title}</h2>
        <button
          className="rounded-lg bg-yellow-500 py-4 px-6"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="rounded-lg bg-yellow-500 py-4 px-6"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Update
        </button>
        {toggleForm && (
          <form
            onSubmit={handleUpdate}
            className="flex items-center justify-center"
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-4xl">project Create</h2>
              <label>Project title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black"
              />
              <button className="rounded-lg bg-yellow-500 py-4 px-6">
                Update project
              </button>
            </div>
          </form>
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
