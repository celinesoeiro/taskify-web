'use client'

import { useState, FormEvent, useCallback, ChangeEvent } from 'react'

import { Modal } from "./Modal"
import { Button } from './Button';
import { Input } from './Input';
import { DragAndDrop } from './DragAndDrop';

import { useModal, useTasks } from '@/contexts'

export const CreateTaskModal = () => {
  const { closeCreateTaskModal, isCreateTaskModalOpen } = useModal()
  const { handleAddTask } = useTasks()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [file, setFile] = useState<File | string>('')
  const [fileName, setFileName] = useState('')

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    let fieldValue: FileList | string = event.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
      setFileName(event.target.files[0].name)
    }
  }

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!file && formData.title === '') {
      alert('Please select either a file to upload or insert a title to create a task')
      return;
    }

    const fileFormData = new FormData()
    fileFormData.append('file', file)

    const response = await handleAddTask(formData, fileFormData)

    if (response?.status === 201) {
      closeCreateTaskModal()
    }
  }, [closeCreateTaskModal, file, formData, handleAddTask])

  return (
    <div>
      <Modal
        title="Add new task"
        isOpen={isCreateTaskModalOpen}
        setIsOpen={closeCreateTaskModal}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className='flex justify-center'>You can add a single task</p>

          <Input
            type='text'
            name='title'
            id="title"
            label="Title"
            onChange={handleInput}
            value={formData.title}
          />

          <Input
            type='text'
            name='description'
            id="description"
            label="Description"
            onChange={handleInput}
            value={formData.description}
          />

          <p className='flex justify-center'>OR upload many tasks using CSV</p>

          <DragAndDrop id="csv" name="csv" file={fileName} onChange={handleFileInput} />

          <Button type="submit">Add</Button>
        </form>
      </Modal>
    </div>
  )
}