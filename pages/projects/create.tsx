import { useRouter } from 'next/router'
import { FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../components/Button'

interface TaskCreateProps {}

const TaskCreate: FC<TaskCreateProps> = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then(() => {
      console.log('New project added')
    })
    router.back()
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div className="flex flex-col space-y-4">
        <h2 className="text-4xl">Project Create</h2>
        <label>Project title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <Button>Add Project</Button>
      </div>
    </form>
  )
}

export default TaskCreate
