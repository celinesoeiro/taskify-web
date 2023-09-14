'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'

import { Banner } from "./Banner"
import { CreateTaskModal } from "./CreateTaskModal"
import { Tabs } from "./Tabs"
import { ViewTaskModal } from './ViewTaskModal'
import { Button } from './Button'
import { TabContent } from './TabContent'

// import { deleteTask, listTasks, markAsDone } from "@/api"

import { useModal } from '@/contexts/ModalContext'

import { Task, StoredTaskProps } from '@/types/tasks'

export const TasksPanel = () => {
  const { openViewTaskModal, openCreateTaskModal } = useModal()

  /** FOR LOCALSTORAGE API PURPOSES */
  const [storedTasks, setStoredTasks] = useState<StoredTaskProps[]>([])

  /** FOR NODEJS LOCAL API PURPOSES */
  const [loading, setLoading] = useState(true)
  const [updatingTasks, setUpdatingTasks] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | StoredTaskProps>()

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
  }, [storedTasks])

  const getTasks = async (id?: string) => {
    try {
      /** Uncomment this lines if you are using the nodejs API of Taskify */
      // const response = await listTasks(id ?? '')
      // const { allTasks, selectedTask } = await response.json()
      // setSelectedTask(selectedTask[0])

      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
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

  const handleCheck = async (id: string | number) => {
    try {
      setUpdatingTasks(true)

      const storedTask = storedTasks.find(task => task.id === id)
      if (storedTask) {
        storedTask.completed_at = new Date()
      }
      const updatedStoredTasks: StoredTaskProps[] = storedTasks.map((task) => {
        return task.id === id ? { ...task, completed_at: new Date() } : task
      })
      setStoredTasks(updatedStoredTasks)

      /** Uncomment this lines if you are using the nodejs API of Taskify */
      // if (typeof id === 'string') {
      //   await markAsDone(id)
      // }

      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }

  const handleDelete = async (id: string | number) => {
    try {
      const updatedStoredTasks = storedTasks.filter((task) => task.id !== id)
      setStoredTasks(updatedStoredTasks)

      setUpdatingTasks(true)
      /** Uncomment this lines if you are using the nodejs API of Taskify */
      // if (typeof id === 'string') {
      //   await deleteTask(id)
      // }

      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }

  const handleShowTask = useCallback(async (id: string | number) => {
    try {
      setUpdatingTasks(true)
      const storedTask = storedTasks.find(task => task.id === id)
      /** Uncomment this lines if you are using the nodejs API of Taskify */
      // if (typeof id === 'string') {
      //   await getTasks(id)
      // }
      setSelectedTask(storedTask)
      openViewTaskModal()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }, [openViewTaskModal, storedTasks])

  return (
    <>
      <section className='col-start-2 col-end-12 py-12 flex flex-col gap-10 justify-center lg:col-start-7'>
        <h1 className='font-alt text-6xl text-center'>Taskify</h1>
        <h3 className='font-alt text-4xl mb-6'>Hello, Friend</h3>

        {loading ? (
          <div className='flex justify-center align-middle'>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
          </div>
        ) : (
          <>
            <Banner>
              <div className="flex flex-row gap-4 p-4 items-baseline justify-center">
                <h2 className="font-alt text-4xl">{completedTasks.length}/{tasks.length}</h2>
                <span className="text-xl font-semibold">Tasks done</span>
              </div>
            </Banner>

            <Tabs tabs={[
              {
                label: 'TASKS',
                content: <TabContent
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                  handleShowTask={handleShowTask}
                  tasks={tasks}
                  isLoading={updatingTasks}
                />
              },
            ]} />
          </>
        )}

        <div className="flex flex-row gap-4 justify-center">
          <Button onClick={openCreateTaskModal}>Add new task</Button>
        </div>

      </section>

      <CreateTaskModal
        fetchData={getTasks}
        setStoredTasks={setStoredTasks}
        storedTasks={storedTasks}
      />

      <ViewTaskModal
        task={selectedTask}
        fetchData={getTasks}
        storedTasks={storedTasks}
        setStoredTasks={setStoredTasks}
      />
    </>
  )
}