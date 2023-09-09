'use client';

import { PropsWithChildren } from 'react'

interface ModalProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const Modal = ({ title, isOpen, setIsOpen, children }: ModalProps) => {
  return (
    <div id="dialog-wrapper" className='absolute top-[20%] left-[45%]'>
      <dialog
        id="dialog"
        open={isOpen}
        className="bg-orange-200 border-2 border-black shadow-retro justify-center min-w-max"
      >
        <div className="flex flex-row justify-between p-6 font-semibold text-lg border-b-2 border-black">
          <p>{title}</p>
          <button
            className="font-bold text-xl"
            onClick={setIsOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div className='bg-orange-200 p-6 '>
          {children}
        </div>
      </dialog>
    </div>
  )
}