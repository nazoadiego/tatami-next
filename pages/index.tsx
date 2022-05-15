import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
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
        {tasks.map((task) => (
          <div key={task.id} className="space-y-3 rounded-lg bg-[#ffef77] p-8">
            <h5 className="text-4xl">{task.title}</h5>
            <p>{task.description}</p>
            <h5>Project: {task.project.title}</h5>
          </div>
        ))}
      </div>
      <div className="my-10"></div>
      <Link href="/tasks/create">
        <button className="rounded-lg bg-yellow-400 py-4 px-6 text-xl">
          Create Task
        </button>
      </Link>
    </>
  )
}

export default Home
