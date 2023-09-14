import Image from "next/image"

import bg from '../../public/bg-6.png';

import { ModalProvider } from '@/contexts/ModalContext';

import { TasksPanel } from "@/components/TasksPanel"

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-12 ">
      <section className=' bg-[#8666B0] justify-center flex-col items-center gap-4 hidden lg:col-span-5 lg:flex'>
        <Image src={bg} alt="checklist" className="px-4" />
      </section>

      <ModalProvider>
        <TasksPanel />
      </ModalProvider>
    </main>
  )
}
