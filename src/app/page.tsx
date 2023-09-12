import Image from "next/image"

import tasksImg from '../../public/tasks-image.svg'

import { ModalProvider } from '@/contexts/ModalContext';

import { TasksPanel } from "@/components/TasksPanel"

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-12">
      <section className='col-span-5 bg-violet-600 justify-center flex flex-col items-center'>
        <Image src={tasksImg} alt="checklist" />
        <h3 className='font-alt text-4xl text-center'>Taskify</h3>
      </section>

      <ModalProvider>
        <TasksPanel />
      </ModalProvider>
    </main>
  )
}
