import Image from "next/image"

import tasksImg from '../../public/tasks-image.svg'
import { Banner } from "@/components/Banner"
import { Tabs } from "@/components/Tabs"
import { Checkbox } from "@/components/Checkbox"

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-12">
      <section className='col-span-5 bg-violet-600 justify-center flex flex-col items-center'>
        <Image src={tasksImg} alt="checklist" />
        <h3 className='font-alt text-4xl text-center'>Taskify</h3>
      </section>

      <section className='col-start-7 col-end-12 py-12 flex flex-col gap-10'>
        <h1 className='font-alt text-5xl mb-6'>Hello, Stranger</h1>

        <Banner>
          <div className="flex flex-row gap-4 p-4 items-baseline justify-center">
            <h2 className="font-alt text-4xl">4/10</h2>
            <span className="text-xl font-semibold">Tasks done</span>
          </div>
        </Banner>

        <Tabs tabs={[
          {
            label: 'ONGOING',
            content: <div className="gap-4 flex flex-col">
              <Checkbox label="Task 01" />
              <Checkbox label="Task 02" />
            </div>
          },
          {
            label: 'DONE',
            content: <div className="gap-4 flex flex-col">
              <Checkbox label="Task 03" />
              <Checkbox label="Task 04" />
            </div>
          },
        ]} />
      </section>
    </main>
  )
}
