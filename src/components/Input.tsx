import { InputHTMLAttributes } from 'react'

interface InputProps {
  id: string;
  label: string;
}

export const Input = ({ id, label, ...props }: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <label
        htmlFor={id}
        className='font-semibold'
      >
        {label}
      </label>
      <input
        id={id}
        className='bg-orange-50 border-2 border-black hover:bg-orange-100 p-2 focus:ring-0 active:focus:ring-0 focus:bg-orange-100 focus:outline-none focus:shadow-retro w-full'
        {...props}
      />
    </div>
  )
}