import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export interface CandidatureCardProps {
  companyName: string
  title: string
  status: string
  updatedAt: Date
  createdAt: Date
}

export function CandidatureCard({
  companyName,
  title,
  status,
  updatedAt,
  createdAt,
}: CandidatureCardProps) {
  const updatedAtFormatted = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    locale: ptBR,
  })

  const createdAtFormatted = format(
    new Date(createdAt),
    "dd 'de' MMMM 'de' yyyy",
    {
      locale: ptBR,
    },
  )

  return (
    <div className="flex w-full flex-col items-center gap-1.5 rounded-md bg-violet-600/80 p-2">
      <div className="flex w-full gap-4">
        <div className="flex h-10 w-full max-w-12 flex-col items-center justify-center rounded-md bg-violet-700/70 pb-1 font-mirza text-2xl font-bold text-zinc-300">
          <span className="-ml-3 text-xl">
            E<span className="text-sm font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4 text-xl">
            W<span className="text-sm font-normal">ork</span>
          </span>
        </div>
        <div className="flex w-full flex-col divide-y divide-dashed text-center">
          <h2 className="font-mirza text-xl font-semibold text-white">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
          <p className="text-sm font-semibold text-zinc-200">{companyName}</p>
        </div>
      </div>

      <p className="max-w-72 truncate text-white">
        <strong>Status -</strong> {status}
      </p>
      <div className="ml-auto flex flex-col">
        <span
          title="última atualização"
          className="flex justify-end gap-1 text-xs text-zinc-300"
        >
          Atualizado <span className="font-bold"> {updatedAtFormatted}</span>
        </span>

        <span
          title="data da inscrição"
          className="flex justify-end gap-1 text-xs text-zinc-300"
        >
          Inscrição feita em{' '}
          <span className="font-bold"> {createdAtFormatted}</span>
        </span>
      </div>
    </div>
  )
}
