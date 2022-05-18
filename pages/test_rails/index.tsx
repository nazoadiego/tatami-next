import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TestsPage: NextPage = () => {
  const [tests, setTests] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/tests')
      .then((response) => response.json())
      .then((data) => setTests(data))
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <div className="space-y-4 rounded-lg bg-[#ffef77] py-8 px-20">
          <h1 className="text-7xl">Tatami</h1>
          <h3 className="text-3xl">Project Manager</h3>
        </div>
      </div>
      <h2 className="text-4xl text-white">Tasks</h2>
      <div className="mt-10 grid grid-cols-3 gap-3">
        {tests.map((test) => (
          <Link href={`test_rails/${test.id}`} key={test.id}>
            <a>
              <div className="space-y-3 rounded-lg bg-[#ffef77] p-8">
                <h5 className="text-4xl">{test.title}</h5>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="my-10"></div>
      <Link href="/test_rails/create">
        <button className="rounded-lg bg-yellow-400 py-4 px-6 text-xl">
          Create Test
        </button>
      </Link>
    </>
  )
}

export default TestsPage
