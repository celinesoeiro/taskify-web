'use client'

import { useState, FormEvent, useCallback, ChangeEvent } from 'react'

import { Modal } from "./Modal"
import { Button } from './Button';
import { Input } from './Input';
import { DragAndDrop } from './DragAndDrop';
import { createTask, createTaskByCSV } from '@/api';

interface ModalManagerProps {
  fetchData: () => void
}

export const ModalManager = ({ fetchData }: ModalManagerProps) => {
  const [openIndividualTaskModal, setOpenIndividualTaskModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [fileData, setFileData] = useState()

  const handleOpenIndividualModal = () => {
    setOpenIndividualTaskModal(true)
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    let fieldValue: FileList | string = event.target.value
    const formData = new FormData()

    if (fieldName === "csv" && event.target.files) {
      formData.append('file', event.target.files[0])
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
      }))
    }
  }

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      if (event.target.files) {
        formData.append('file', event.target.files[0])

        const response = await createTaskByCSV(formData)
  
        console.log({response})
      }
    } catch (err) {
      console.error('Error on file upload: ', err)
    }
  }

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      
    } catch (e) {

    }
    const fileReader = new window.FileReader()
    console.log({ formData })

    const response = await createTask(formData)

    console.log({response, fileReader})

    if (response.status === 201){
      setOpenIndividualTaskModal(false)
      fetchData()
    }

  }, [formData])

  return (
    <div>
      <div className="flex flex-row gap-4 justify-center">
        <Button onClick={handleOpenIndividualModal}>Add new task</Button>
      </div>

      <Modal
        title="Add new task"
        isOpen={openIndividualTaskModal}
        setIsOpen={() => setOpenIndividualTaskModal(false)}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className='flex justify-center'>You can add a single task</p>

          <Input type='text' name='title' id="title" label="Title" onChange={handleInput} />

          <Input type='text' name='description' id="description" label="Description" onChange={handleInput} />

          <p className='flex justify-center'>OR upload many tasks using CSV</p>

          <DragAndDrop id="csv" allowed='CSV' name="csv" file={fileData} onChange={handleInput} />

          <Button type="submit">Add</Button>
        </form>
      </Modal>

    </div>

  )
}