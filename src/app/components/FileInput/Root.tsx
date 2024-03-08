'use client'

import {
  ComponentProps,
  createContext,
  useContext,
  useId,
  useState,
} from 'react'

type RootProps = ComponentProps<'div'>

type FileInputContextType = {
  id: string
  file: File | undefined
  onFileSelected: (files: File) => void
}
export const FileInputContext = createContext({} as FileInputContextType)

export function Root(props: RootProps) {
  const id = useId()
  const [file, setFile] = useState<File>()

  function onFileSelected(file: File) {
    setFile(file)
  }

  return (
    <FileInputContext.Provider value={{ id, file, onFileSelected }}>
      <div {...props} />
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => useContext(FileInputContext)
