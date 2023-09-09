'use client'

import { useState } from 'react'

import { Modal } from "./Modal"
import { Button } from './Button';

export const ModalManager = () => {
  const [openIndividualTaskModal, setOpenIndividualTaskModal] = useState(false);

  const handleOpenIndividualModal = () => {
    setOpenIndividualTaskModal(true)
  }

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
        <form className="flex flex-col gap-4">
          <p className='flex justify-center'>You can add a single task</p>
          <label
            htmlFor="title"
            className='flex flex-col items-start justify-center w-full'
          >
            <p className='font-semibold'>Title</p>
            <input
              id="title"
              className='bg-orange-50 border-2 border-black hover:bg-orange-100 p-2 focus:ring-0 active:focus:ring-0 focus:bg-orange-100 focus:outline-none focus:shadow-retro w-full'
            />
          </label>

          <label
            htmlFor="description"
            className='flex flex-col items-start justify-center w-full'
          >
            <p className='font-semibold'>Description</p>
            <input
              id="description"
              className='bg-orange-50 border-2 border-black hover:bg-orange-100 p-2 focus:ring-0 active:focus:ring-0 focus:bg-orange-100 focus:outline-none focus:shadow-retro w-full'
            />
          </label>

          <p className='flex justify-center'>OR upload many tasks using CSV</p>

          <div className="flex items-center justify-center w-full  mb-2">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 p-2 border-2 bg-orange-50  border-black cursor-pointer hover:bg-orange-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-from-line"><path d="m18 9-6-6-6 6" /><path d="M12 3v14" /><path d="M5 21h14" />
                </svg>
                <p className="my-2 text-gray-500 text-md">
                  <span className="font-semibold text-md">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  (CSV)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <Button type="submit">Add</Button>
        </form>
      </Modal>

    </div>

  )
}