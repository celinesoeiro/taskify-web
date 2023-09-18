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

    if (selectedTask) {
      const data = {
        title: formData.title !== selectedTask?.title && formData.title ? formData.title : selectedTask.title,
        description: formData.description !== selectedTask?.description && formData.description ? formData.description : selectedTask.description
      }

      if (typeof selectedTask.id === 'string') {
        const response = await handleUpdateTask(selectedTask?.id, data)

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
          <Button onClick={closeViewTaskModal}>Close</Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Modal>
  )
}