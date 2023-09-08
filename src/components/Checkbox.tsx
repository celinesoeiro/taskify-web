'use client'

import { useState, InputHTMLAttributes } from "react"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, id }: CheckboxProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="relative flex flex-wrap items-center">
      <input
        className={`w-5 h-5 transition-colors bg-white border-2 rounded appearance-none cursor-pointer border-violet-700 focus-visible:outline-none peer checked:border-black checked:bg-violet-200 checked:hover:shadow-retro checked:hover:bg-violet-300 focus:outline-none checked:focus:shadow-retro checked:focus:bg-violet-400 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 ${checked ? "shadow-retro" : ''}`}
        type="checkbox"
        value=""
        id={id}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        className={`pl-2 cursor-pointer text-black peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 ${checked ? 'line-through' : ''} transition-all`}
        htmlFor={id}
      >
        {label}
      </label>
      <svg className="absolute left-0 w-5 h-5 pb-1 transition-all duration-300 -rotate-90 opacity-0 pointer-events-none top-1 fill-violet-500 stroke-violet-700 peer-hover:fill-violet-700 peer-hover:stroke-violet-700 peer-focus:fill-violet-700 peer-focus:stroke-violet-700 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" aria-labelledby="title-01 description-01" role="graphics-symbol">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z" />
      </svg>
    </div>
  )
}