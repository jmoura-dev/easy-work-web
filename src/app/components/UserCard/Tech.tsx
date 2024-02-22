export interface TechProps {
  techName: string
}

export function Tech({ techName, ...props }: TechProps) {
  return (
    <div
      {...props}
      className="max-w-20 truncate rounded-md bg-violet-600/60 px-2 py-1 text-xs font-semibold text-zinc-200 lg:max-w-28 lg:px-3"
    >
      {techName}
    </div>
  )
}
