export interface TechProps {
  techName: string
}

export function Tech({ techName, ...props }: TechProps) {
  return (
    <div
      {...props}
      className="flex justify-center rounded-md bg-violet-400/60 p-1 text-xs font-semibold text-zinc-700"
    >
      {techName}
    </div>
  )
}
