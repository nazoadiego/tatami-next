import { ParsedUrlQuery } from 'querystring'

export interface Task {
  completed: boolean
  id: number
  title: string
  description: string
  project: Project
}

export interface Project {
  id: number
  title: string
  description: string
  tasks: Task[]
}

export interface IParams extends ParsedUrlQuery {
  id: string
}
