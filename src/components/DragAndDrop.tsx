import { InputHTMLAttributes } from 'react'

interface InputProps {
  id: string;
  file?: string;
}

export const DragAndDrop = ({ id, file, ...props }: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex items-center justify-center w-full  mb-2">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full h-48 p-2 border-2 bg-orange-50  border-black cursor-pointer hover:bg-orange-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-from-line"><path d="m18 9-6-6-6 6" /><path d="M12 3v14" /><path d="M5 21h14" />
          </svg>
          <p className="my-2 text-gray-500 text-md">
            {file ? (
              <span>{file}</span>
            ) : (
              <>
                <span className="font-semibold text-md">Click to upload</span> or drag and drop
              </>
            )}

          </p>
          <p className="text-xs text-gray-500 ">
            (CSV)
          </p>
        </div>
        <input id={id} type="file" className="hidden" accept='.csv' {...props} />
      </label>
    </div>
  )
}