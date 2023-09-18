import { useState } from 'react'

import { StoredTaskProps } from '@/types/tasks'

export function useLocalTasksManager() {
  const [tasks, setTasks] = useState<StoredTaskProps[]>([])
  const [selectedTask, setSelectedTask] = useState<StoredTaskProps>()
  const [loading, setLoading] = useState(true)

  const handleGetTasks = () => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }

  const handleAddTask = (task: StoredTaskProps) => {
    setTasks([...tasks, task])
    setLoading(false)
  }

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)

    setTasks(updatedTasks)
    setLoading(false)
  }

  const handleCheckTask = (id: number) => {
    const updatedTasks: StoredTaskProps[] = tasks.map((task) => {
      return task.id === id ? { ...task, completed_at: new Date() } : task
    })

    setTasks(updatedTasks)
    setLoading(false)
  }

  const handleUpdateTask = (id: number, updatedTask: StoredTaskProps) => {
    const updatedTasks: StoredTaskProps[] = tasks.map((task) => {
      return task.id === id ? { ...task, ...updatedTask } : task
    })

    setTasks(updatedTasks)
    setLoading(false)
  }

  const handleGetTaskInfo = (id: number) => {
    const selectedTask = tasks.find(task => task.id === id)
    setSelectedTask(selectedTask)
  }

  return {
    loading,
    tasks,
    selectedTask,
    handleGetTaskInfo,
    handleGetTasks,
    handleAddTask,
    handleDeleteTask,
    handleCheckTask,
    handleUpdateTask
  }
}