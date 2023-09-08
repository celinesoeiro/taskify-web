import { PropsWithChildren } from 'react'

interface BannerProps extends PropsWithChildren {

}

export const Banner = ({ children }: BannerProps) => {
  return (
    <div className='bg-violet-400 border-2 border-black shadow-retro'>
      {children}
    </div>
  )
}