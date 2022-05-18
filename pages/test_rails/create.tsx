import { FC, useState } from 'react'
import { useRouter } from 'next/router'

interface TestCreateProps {}

const TestCreate: FC<TestCreateProps> = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newTest = { title }
    console.log(newTest)

    fetch('http://localhost:3000/tests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTest),
    }).then(() => {
      console.log('new blog added')
      router.push('/test_rails')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div className="flex flex-col space-y-4">
        <h2 className="text-4xl">Task Create</h2>
        <label>Test title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black"
        />
        <button className="rounded-lg bg-yellow-500 py-4 px-6">Add Test</button>
      </div>
    </form>
  )
}

export default TestCreate
