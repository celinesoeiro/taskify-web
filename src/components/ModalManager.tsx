'use client'

import { useState, FormEvent, useCallback } from 'react'

import { Modal } from "./Modal"
import { Button } from './Button';
import { Input } from './Input';
import { DragAndDrop } from './DragAndDrop';

export const ModalManager = () => {
  const [openIndividualTaskModal, setOpenIndividualTaskModal] = useState(false);
  const [formValidation, setFormValidation] = useState({
    title: '',
    description: '',
    csv: ''
  })
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    csv: '',
  })

  const handleOpenIndividualModal = () => {
    setOpenIndividualTaskModal(true)
  }

  const handleInput = (event: { target: { name: any; value: any; }; }) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.title === '' || formData.csv === '') {
      setFormValidation((previousState) => ({
        ...previousState,

      }))
    }

    console.log({ formData })

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

          <DragAndDrop id="csv" allowed='CSV' name="csv" onChange={handleInput} />

          <Button type="submit">Add</Button>
        </form>
      </Modal>

    </div>

  )
}