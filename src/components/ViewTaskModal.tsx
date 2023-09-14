'use client'

import { useState, useCallback, FormEvent, ChangeEvent } from 'react'

import { Input } from "./Input"
import { Button } from "./Button"
import { Modal } from "./Modal"

import { useModal } from '@/contexts/ModalContext'
import { Task, StoredTaskProps } from '@/types/tasks'
// import { updateTask } from '@/api'

interface ViewTaskModalProps {
  task?: Task | StoredTaskProps;
  fetchData: () => void;
  setStoredTasks: (state: StoredTaskProps[]) => void;
  storedTasks: StoredTaskProps[];
}

export const ViewTaskModal = ({ task, fetchData, storedTasks, setStoredTasks }: ViewTaskModalProps) => {
  const { closeViewTaskModal, isViewTaskModalOpen } = useModal()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (task) {
      const data = {
        title: formData.title !== task?.title && formData.title ? formData.title : task.title,
        description: formData.description !== task?.description && formData.description ? formData.description : task.description
      }

      const toBeStoredTask = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        completed_at: task.completed_at
      }
      const updatedStoredTasks: StoredTaskProps[] = storedTasks.map((st) => {
        return st.id === task.id ? toBeStoredTask : st
      })

      setStoredTasks(updatedStoredTasks)
      fetchData()
      closeViewTaskModal()

      /** Uncomment this lines if you are using the nodejs API of Taskify */
      // if (typeof task.id === 'string') {
      //   const response = await updateTask(task?.id, data)

      //   if (response.status === 204) {
      //     fetchData()
      //     closeViewTaskModal()
      //   }
      // }
    }
  }, [closeViewTaskModal, fetchData, formData, setStoredTasks, storedTasks, task])

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    let fieldValue: FileList | string = event.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  return (
    <Modal
      title="View and update task"
      isOpen={isViewTaskModalOpen}
      setIsOpen={closeViewTaskModal}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type='text'
          name='title'
          id="title"
          label="Title"
          onChange={handleInput}
          placeholder={task ? task.title : ''}
        />

        <Input
          type='text'
          name='description'
          id="description"
          label="Description"
          placeholder={task ? task.description : ''}
          onChange={handleInput}
        />

        <div className='flex flex-row justify-between'>
          <Button onClick={closeViewTaskModal}>Close</Button>
          <Button type="submit">Update</Button>
        </div>

      </form>
    </Modal>
  )
}