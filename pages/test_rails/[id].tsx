import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { FC, useState } from 'react'

interface TestShowProps {}

const TestShow: FC<TestShowProps> = ({ test }) => {
  const router = useRouter()
  const [toggleForm, setToggleForm] = useState(false)
  const [title, setTitle] = useState('')

  const handleDelete = (e) => {
    fetch(`http://localhost:3000/tests/${test.id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('test deleted')
    })
    router.push('/test_rails')
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/tests/${test.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then(() => {
      console.log('test updated')
    })
    router.reload()
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col space-y-4">
        <Link href="/test_rails">
          <button className="rounded-lg bg-yellow-500 py-4 px-6">
            Go back
          </button>
        </Link>

        <h2>Title: {test.title}</h2>
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
              <h2 className="text-4xl">Task Create</h2>
              <label>Test title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black"
              />
              <button className="rounded-lg bg-yellow-500 py-4 px-6">
                Add Test
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const response = await fetch(`http://localhost:3000/tests/${id}`)
  const test = await response.json()
  return { props: { test } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/tests')
  const tests = await response.json()

  const paths = tests.map((test) => {
    return {
      params: { id: test.id.toString() },
    }
  })

  return {
    // paths: paths, which is the same as
    paths,
    fallback: false,
  }
}

export default TestShow
