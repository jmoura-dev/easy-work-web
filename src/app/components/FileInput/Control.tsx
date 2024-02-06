'use client'

import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import { useFileInput } from './Root'

type ControlProps = InputHTMLAttributes<HTMLInputElement>

const Control = forwardRef<HTMLInputElement, ControlProps>((props, ref) => {
  const { id, onFilesSelected } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files)
  }

  return (
    <input
      ref={ref}
      type="file"
      className="sr-only"
      id={id}
      onChange={handleFilesSelected}
      {...props}
    />
  )
})

Control.displayName = 'Control'
export { Control }
