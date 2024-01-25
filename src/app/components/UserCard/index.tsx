import { Banknote, Computer, DollarSign, RailSymbol, User } from "lucide-react"
import { Tech } from "./Tech"

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

export function Card({ name, avatar_url, price_per_hour, occupation_area, techs, ...props }: CardProps) {
  return (
    <div {...props} className="flex flex-col p-2 flex-1 gap-3">
      <div className="flex gap-4 items-start justify-center mb-2">
        { 
          avatar_url ? 
            (<img src={avatar_url} alt="" />) 
            : 
            ( <User className="h-8 w-8 p-1 bg-violet-300 rounded-full text-zinc-800" /> ) 
        }
        
        <span className="font-semibold text-zinc-700 hover:border-b hover:border-zinc-400 hover:text-zinc-800">{name}</span>
      </div>

      <div className="flex justify-between">
        <span className="bg-zinc-500/70 py-0.5 px-1.5 rounded-md text-violet-200 flex items-center gap-1 text-sm">
          <Computer className="w-4 h-4"/>
          {occupation_area}
          </span>
        <span className="bg-zinc-500/70 py-0.5 px-1 rounded-md text-violet-200 flex items-center gap-1 text-sm">
          R$: {price_per_hour?.toFixed(2)}
        </span>
      </div>


      <div className="flex flex-col m-auto gap-1 bg-violet-400/20 p-1 rounded-md mt-1">
        <span  className="text-zinc-700 font-semibold text-sm">Habilidades</span>
        <ul className="flex flex-wrap justify-around gap-1">
          {
            techs.length > 0 && techs.map((tech) => 
              <Tech techName={tech.name} key={tech.id}/>
            )
          }
        </ul>
      </div>

    </div>
  )
}