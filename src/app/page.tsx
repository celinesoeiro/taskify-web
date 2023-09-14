import Image from "next/image"

import bg from '../../public/bg-6.png';

import { ModalProvider } from '@/contexts/ModalContext';

import { TasksPanel } from "@/components/TasksPanel"

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-12">
      <section className='col-span-5 bg-[#8666B0] justify-center flex flex-col items-center gap-4'>

        <Image src={bg} alt="checklist" />

      </section>

      <ModalProvider>
        <TasksPanel />
      </ModalProvider>
    </main>
  )
}
