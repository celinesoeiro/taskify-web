'use client'

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import tasksImg from '../../public/tasks-image.svg'

import { Banner } from "@/components/Banner"
import { Tabs } from "@/components/Tabs"
import { Checkbox } from "@/components/Checkbox"
import { ModalManager } from "@/components/ModalManager"

import { deleteTask, listTasks, markAsDone } from "@/api"

interface Task {
  title: string;
  description: string;
  id: string;
  completed: boolean;
  completed_at: Date;
  updated_at: Date;
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks = async () => {
    try {
      const response = await listTasks()
  
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false) 
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.completed_at !== null)
  }, [tasks])

  const handleCheck = async (id: string) => {
    try {
      await markAsDone(id)

      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false) 
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false) 
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-12">
      <section className='col-span-5 bg-violet-600 justify-center flex flex-col items-center'>
        <Image src={tasksImg} alt="checklist" />
        <h3 className='font-alt text-4xl text-center'>Taskify</h3>
      </section>

      <section className='col-start-7 col-end-12 py-12 flex flex-col gap-10'>
        <h1 className='font-alt text-5xl mb-6'>Hello, Stranger</h1>

        <Banner>
          <div className="flex flex-row gap-4 p-4 items-baseline justify-center">
            <h2 className="font-alt text-4xl">{completedTasks.length}/{tasks.length}</h2>
            <span className="text-xl font-semibold">Tasks done</span>
          </div>
        </Banner>

        <Tabs tabs={[
          {
            label: 'TASKS',
            content: <div className="gap-4 flex flex-col">
              {tasks.map((task) => (
              <div className="flex flex-row justify-between">
                <Checkbox 
                  label={task.title} 
                  checked={Boolean(task.completed_at)} 
                  handleClick={() => handleCheck(task.id)}
                />
                <button
                  className="font-bold text-xl flex flex-end"
                  onClick={() => handleDelete(task.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              ))}
            </div>
          },
        ]} />

        <ModalManager fetchData={getTasks} />

      </section>
    </main>
  )
}
