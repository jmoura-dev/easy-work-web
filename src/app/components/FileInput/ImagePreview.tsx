'use client'

import { User } from 'lucide-react'
import { useFileInput } from './Root'
import { useMemo } from 'react'

interface ImagePreviewProps {
  initialImageUrl?: string
}

export function ImagePreview({ initialImageUrl }: ImagePreviewProps) {
  const { file } = useFileInput()

  const previewURL = useMemo(() => {
    if (!file) {
      return initialImageUrl
    }

    return URL.createObjectURL(file)
  }, [file, initialImageUrl])

  if (!initialImageUrl && !file) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10">
        <User className="h-8 w-8 text-violet-500 dark:text-violet-300" />
      </div>
    )
  } else {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={previewURL}
        alt=""
        className="h-16 w-16 rounded-full object-cover"
      />
    )
  }
}
