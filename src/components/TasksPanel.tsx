'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'

import { Banner } from "./Banner"
import { Checkbox } from "./Checkbox"
import { CreateTaskModal } from "./CreateTaskModal"
import { Tabs } from "./Tabs"

import { deleteTask, listTasks, markAsDone } from "@/api"

import { useModal } from '@/contexts/ModalContext'

import { Task } from '@/types/tasks'
import { ViewTaskModal } from './ViewTaskModal'
import { Button } from './Button'

export const TasksPanel = () => {
  const { openViewTaskModal, openCreateTaskModal } = useModal()

  const [loading, setLoading] = useState(true)
  const [updatingTasks, setUpdatingTasks] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task>()

  const getTasks = async (id?: string) => {
    try {
      const response = await listTasks(id ?? '')
      const { allTasks, selectedTask } = await response.json()

      setTasks(allTasks)
      setSelectedTask(selectedTask[0])
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
      setUpdatingTasks(true)
      await markAsDone(id)
      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setUpdatingTasks(true)
      await deleteTask(id)
      getTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }

  const handleShowTask = useCallback(async (id: string) => {
    try {
      setUpdatingTasks(true)
      await getTasks(id)
      openViewTaskModal()
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingTasks(false)
    }
  }, [openViewTaskModal])

  return (
    <>
      <section className='col-start-7 col-end-12 py-12 flex flex-col gap-10'>
        <h1 className='font-alt text-5xl mb-6'>Hello, Stranger</h1>

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
                content: <div className="gap-4 flex flex-col">
                  {updatingTasks ? (
                    <div className='flex justify-center items-center'>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                    </div>
                  ) : (
                    <>
                      {tasks.length > 0 ? tasks.map((task) => (
                        <div className="flex flex-row justify-between" key={task.id}>
                          <Checkbox
                            label={task.title}
                            checked={Boolean(task.completed_at)}
                            handleClick={() => handleCheck(task.id)}
                          />
                          <div className="flex flex-row gap-x-2 items-baseline">
                            <button
                              onClick={() => handleShowTask(task.id)}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-tool"><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
                            </button>
                            <button
                              className="font-bold text-xl flex flex-end"
                              onClick={() => handleDelete(task.id)}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className='flex flex-col justify-center items-center'>
                          <p className='font-bold'>You don&apos;t have any task. </p>
                          <p>This means either you nailed them all or you haven&apos;t start working yet.</p>
                        </div>
                      )}
                    </>
                  )}

                </div>
              },
            ]} />
          </>
        )}

        <div className="flex flex-row gap-4 justify-center">
          <Button onClick={openCreateTaskModal}>Add new task</Button>
        </div>

      </section>

      <CreateTaskModal fetchData={getTasks} />

      <ViewTaskModal task={selectedTask} fetchData={getTasks} />
    </>
  )
}