export interface TechProps {
  techName: string
}

export function Tech({ techName, ...props }: TechProps) {
  return (
    <div {...props} className="flex bg-violet-400/60 justify-center p-1 text-zinc-700 font-semibold text-xs rounded-md">
      {techName}
    </div>
  )
}