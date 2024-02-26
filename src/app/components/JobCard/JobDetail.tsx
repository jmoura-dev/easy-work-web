import { ElementType } from 'react'

export interface JobDetailProps {
  icon: ElementType
  name: string
}

export function JobDetail({ icon: Icon, name }: JobDetailProps) {
  return (
    <span className="flex items-center gap-0.5 text-sm">
      <Icon className="w-5 text-zinc-700" />
      {name}
    </span>
  )
}
