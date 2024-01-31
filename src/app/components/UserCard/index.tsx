import { Computer, User } from 'lucide-react'
import { Tech } from './Tech'

interface CardProps {
  name: string
  avatar_url?: string
  price_per_hour?: number
  occupation_area: string
  techs: {
    name: string
    id: number
  }[]
}

export function Card({
  name,
  avatar_url,
  price_per_hour,
  occupation_area,
  techs,
  ...props
}: CardProps) {
  return (
    <div {...props} className="flex flex-1 flex-col gap-3 p-2">
      <div className="mb-2 flex items-start justify-center gap-4">
        {avatar_url ? (
          <img src={avatar_url} alt="" />
        ) : (
          <User className="h-10 w-10 rounded-full bg-violet-300 p-1 text-zinc-800" />
        )}

        <span className="font-semibold text-zinc-700 hover:border-b hover:border-zinc-400 hover:text-zinc-800">
          {name}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="flex items-center gap-1 rounded-md bg-zinc-500/70 px-1.5 py-0.5 text-sm text-violet-200">
          <Computer className="h-4 w-4" />
          {occupation_area}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-zinc-500/70 px-1 py-0.5 text-sm text-violet-200">
          R$: {price_per_hour?.toFixed(2)}
        </span>
      </div>

      <div className="m-auto mt-1 flex flex-col gap-1 rounded-md bg-violet-400/20 p-1">
        <span className="text-sm font-semibold text-zinc-700">Habilidades</span>
        <ul className="flex flex-wrap justify-around gap-1">
          {techs.length > 0 &&
            techs.map((tech) => <Tech techName={tech.name} key={tech.id} />)}
        </ul>
      </div>
    </div>
  )
}
