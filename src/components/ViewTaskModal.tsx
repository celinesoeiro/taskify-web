'use client'

import { useState, useCallback, FormEvent, ChangeEvent } from 'react'

import { Input } from "./Input"
import { Button } from "./Button"
import { Modal } from "./Modal"

import { useModal, useTasks } from '@/contexts'

export const ViewTaskModal = () => {
  const { closeViewTaskModal, isViewTaskModalOpen } = useModal()
  const { selectedTask, handleUpdateTask } = useTasks()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    let fieldValue: FileList | string = event.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.title) {
      return alert("All tasks must have a title. Please insert a title.")
    }

    if (selectedTask) {
      let title = selectedTask.title
      let description = selectedTask.description

      if (formData.title !== selectedTask.title && formData.title) {
        title = formData.title
      }

      if (formData.description !== selectedTask?.description) {
        description = formData.description
      }

      if (typeof selectedTask.id === 'string') {
        const response = await handleUpdateTask(selectedTask?.id, { title, description })

        if (response?.status === 204) {
          closeViewTaskModal()
        }
      }
    }
  }, [closeViewTaskModal, formData, handleUpdateTask, selectedTask])

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
          placeholder={selectedTask ? selectedTask.title : ''}
        />

        <Input
          type='text'
          name='description'
          id="description"
          label="Description"
          placeholder={selectedTask ? selectedTask.description : ''}
          onChange={handleInput}
        />

        <div className='flex flex-row justify-between'>
          <Button type='button' onClick={closeViewTaskModal}>Close</Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Modal>
  )
}