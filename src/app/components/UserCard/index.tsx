import { Computer, User, Wallet } from 'lucide-react'
import { Tech } from './Tech'
import Image from 'next/image'

interface CardProps {
  name: string
  avatarUrl: string | null
  price_per_hour?: number
  occupation_area: string
  available_for_contract: boolean
  techs: {
    name: string
    id: string
  }[]
}

export function Card({
  name,
  avatarUrl,
  price_per_hour,
  occupation_area,
  available_for_contract,
  techs,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className="flex h-full transform flex-col gap-3 transition-transform duration-200 lg:hover:scale-95"
    >
      <div className="mb-2 flex items-start justify-center gap-4">
        {avatarUrl ? (
          <Image
            src={`${process.env.URL_DOMAIN}/${avatarUrl}`}
            width={200}
            height={200}
            alt=""
            className="h-10 w-10 rounded-full text-zinc-800 md:h-12 md:w-12 lg:h-14 lg:w-14"
          />
        ) : (
          <User className="h-10 w-10 rounded-full bg-violet-300 p-1 text-zinc-800 md:h-12 md:w-12 lg:h-14 lg:w-14" />
        )}

        <span className="text-md flex  flex-col gap-0.5 truncate font-semibold ">
          <div className="max-w-24 truncate text-zinc-700 hover:border-b hover:border-zinc-400 hover:text-zinc-800 lg:max-w-28 lg:text-xl">
            {name && name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <span className="flex items-center justify-center gap-1 rounded-md bg-zinc-300 px-1.5 py-0.5 text-sm text-violet-600">
            <Computer className="h-4 w-4" />
            {occupation_area.charAt(0).toUpperCase() + occupation_area.slice(1)}
          </span>
        </span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="flex items-center justify-start gap-1 rounded-md border-b border-violet-500 px-1.5 py-0.5 text-sm text-violet-600">
          <Wallet className="h-4 w-4" />
          {available_for_contract ? 'Freela/Contrato' : 'Apenas freelancer'}
        </span>
        <span className="flex items-center gap-1 rounded-md border-b border-violet-500 px-1 py-0.5 text-sm text-violet-600">
          R$:{' '}
          {price_per_hour ? price_per_hour.toFixed(2) + '/hr' : 'N/Informado'}
        </span>
      </div>

      <ul className="mt-1 flex flex-wrap gap-1.5 lg:mt-3">
        {techs.length > 0 ? (
          <>
            <li className="flex w-full flex-wrap justify-evenly">
              {techs.slice(0, 2).map((tech) => (
                <Tech techName={tech.name} key={tech.id} />
              ))}
            </li>
            <li className="flex w-full flex-wrap justify-evenly">
              {techs.slice(2, 4).map((tech) => (
                <Tech techName={tech.name} key={tech.id} />
              ))}
            </li>
          </>
        ) : (
          <span className="whitespace-normal text-center text-sm font-semibold text-zinc-800">
            *Nenhuma habilidade adicionada
          </span>
        )}
      </ul>
    </div>
  )
}
