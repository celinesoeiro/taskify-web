'use client'
import { createContext, useContext, PropsWithChildren, useState, useEffect, useMemo } from 'react'

import { createTask, createTaskByCSV, deleteTask, listTasks, markAsDone, updateTask } from '@/api';
import { CreateTaskProps, Task } from '@/types/tasks';
import { useModal } from '@/contexts/ModalContext'

interface TasksContextProps {
  tasks: Task[];
  loading: boolean;
  selectedTask?: Task;
  completedTasks: Task[];
  loadingTask: boolean;
  handleGetTasks: () => void;
  handleAddTask: (task: CreateTaskProps, file: FormData) => Promise<Response | undefined>;
  handleDeleteTask: (id: string) => Promise<void>;
  handleCheckTask: (id: string) => Promise<void>;
  handleUpdateTask: (id: string, updatedTask: CreateTaskProps) => Promise<Response | undefined>;
  handleShowTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined)

export function useTasks() {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context;
}

interface TasksProviderProps extends PropsWithChildren { }

export function TasksProvider({ children }: TasksProviderProps) {
  const { openViewTaskModal } = useModal()

  const [loading, setLoading] = useState(true)
  const [loadingTask, setLoadingTask] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task>()

  useEffect(() => {
    handleGetTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.completed_at !== null)
  }, [tasks])

  const handleGetTasks = async (id?: string) => {
    try {
      const response = await listTasks(id ?? '')
      const { allTasks, selectedTask } = await response.json()

      setTasks(allTasks)
      setSelectedTask(selectedTask[0])
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (task: CreateTaskProps, file: FormData) => {
    try {
      let response: Response
      const isFileEmpty = file.get('file') === ''

      if (!isFileEmpty) {
        response = await createTaskByCSV(file)
      } else {

        response = await createTask(task)
      }

      if (response.status === 201 || response.status === 200) {
        handleGetTasks()
      }
      return response
    } catch (err) {
      console.error('Error on task creation: ', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      setLoadingTask(true)
      const response = await deleteTask(id)

      if (response.status === 204) {
        handleGetTasks()
      }
    } catch (err) {
      console.error('Error on delete task: ', err)
    } finally {
      setLoadingTask(false)
    }
  }

  const handleCheckTask = async (id: string) => {
    try {
      setLoadingTask(true)
      const response = await markAsDone(id)

      if (response.status === 200) {
        handleGetTasks()
      }
    } catch (err) {
      console.error('Error on checking task: ', err)
    } finally {
      setLoadingTask(false)
    }
  }

  const handleUpdateTask = async (id: string, updatedTask: CreateTaskProps) => {
    try {
      setLoadingTask(true)
      const response = await updateTask(id, updatedTask)

      if (response.status === 204) {
        handleGetTasks()
      }

      return response
    } catch (err) {
      console.error('Error on updating task: ', err)
    } finally {
      setLoadingTask(false)
    }
  }

  const handleShowTask = async (id: string) => {
    try {
      setLoadingTask(true)
      await handleGetTasks(id)

      openViewTaskModal()
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTask(false)
    }
  }


  return (
    <TasksContext.Provider
      value={{
        loading,
        tasks,
        selectedTask,
        completedTasks,
        loadingTask,
        handleGetTasks,
        handleAddTask,
        handleDeleteTask,
        handleCheckTask,
        handleUpdateTask,
        handleShowTask
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}