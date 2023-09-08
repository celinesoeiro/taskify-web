import { PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren { }

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className='bg-orange-400 border-2 border-black shadow-retro px-4 py-2 font-semibold text-lg hover:bg-orange-300 active:bg-orange-500'>
      {children}
    </button>
  )
}