import { ReactNode } from 'react'

export interface SectionProps {
  title: string
  children: ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="m-auto w-full min-w-80">
      <h2 className="text-md mb-2 font-semibold text-zinc-700">{title}</h2>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 z-10 w-3 rounded-sm bg-violet-300/60 shadow-lg shadow-violet-400" />
        <div className="absolute inset-y-0 right-0 z-10 w-3 rounded-sm bg-violet-300/60 shadow-lg shadow-violet-400" />
        {children}
      </div>
    </section>
  )
}
