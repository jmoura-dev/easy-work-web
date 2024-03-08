'use client'

import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import { useFileInput } from './Root'

type ControlProps = InputHTMLAttributes<HTMLInputElement>

const Control = forwardRef<HTMLInputElement, ControlProps>((props, ref) => {
  const { id, onFileSelected } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const file = event.target.files[0]

    onFileSelected(file)
    return file
  }

  return (
    <input
      ref={ref}
      type="file"
      id={id}
      className="sr-only"
      onChangeCapture={handleFilesSelected}
      {...props}
    />
  )
})

Control.displayName = 'Control'
export { Control }
