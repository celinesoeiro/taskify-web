import { Task } from "@/types/tasks";
import { Checkbox } from "./Checkbox";

interface TabContentProps {
  isLoading: boolean;
  tasks: Task[];
  handleCheck: (id: string) => void;
  handleShowTask: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const TabContent = ({ isLoading, tasks, handleCheck, handleDelete, handleShowTask }: TabContentProps) => {
  return (
    <div className="gap-4 flex flex-col">
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin lucide lucide-loader-2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : (
        <>
          {tasks.length > 0 ? tasks.map((task) => (
            <div className="flex flex-row justify-between" key={task.id}>
              <Checkbox
                label={task.title}
                checked={Boolean(task.completed_at)}
                handleClick={() => handleCheck(task.id)}
              />
              <div className="flex flex-row gap-x-2 items-baseline">
                <button
                  onClick={() => handleShowTask(task.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pen-tool"
                  >
                    <path d="m12 19 7-7 3 3-7 7-3-3z" />
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="m2 2 7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </button>
                <button
                  className="font-bold text-xl flex flex-end"
                  onClick={() => handleDelete(task.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )) : (
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>You don&apos;t have any task. </p>
              <p>This means either you nailed them all or you haven&apos;t start working yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}