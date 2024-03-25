import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Banknote, Clock9, Hourglass, Laptop } from 'lucide-react'

export interface CandidatureCardProps {
  title: string
  description: string
  workMode: string
  workSchedule: string
  remuneration: number
  hoursPerWeek: number
  createdAt: Date
  candidaturesAmount: number
}

export function MyJobCard({
  title,
  description,
  createdAt,
  workMode,
  workSchedule,
  remuneration,
  hoursPerWeek,
  candidaturesAmount,
}: CandidatureCardProps) {
  const createdAtFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

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
        <h2 className="w-full border-b border-dashed text-center font-mirza text-xl font-semibold text-white">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
      </div>

      <div className="grid-cols-jobCard grid w-full px-2">
        <p className="line-clamp-4 max-h-24 text-white">{description}</p>
        <div className="ml-auto flex flex-col text-sm font-semibold text-zinc-200">
          <span className="flex items-center gap-1">
            <Laptop width={16} />
            {workMode.charAt(0).toUpperCase() + workMode.slice(1)}
          </span>
          <span className="flex items-center gap-1">
            <Hourglass width={16} />
            {workSchedule}
          </span>
          <span className="flex items-center gap-1">
            <Banknote width={16} />
            {`R$: ${remuneration}`}
          </span>
          <span className="flex items-center gap-1">
            <Clock9 width={16} />
            {`${hoursPerWeek}h/semana`}
          </span>
        </div>
      </div>

      <div className="mt-2 flex w-full justify-between px-2 gap-2">
        <div className="flex w-full max-w-xl flex-col items-start gap-1 lg:flex-row lg:justify-between">
          <span
            title="última atualização"
            className="flex justify-end gap-1 text-xs text-zinc-300"
          >
            Criada <span className="font-bold"> {createdAtFormatted}</span>
          </span>
          <span
            title="candidaturas"
            className="flex justify-end gap-1 text-sm font-semibold text-zinc-200"
          >
            <span className="border-b text-white">
              {candidaturesAmount === 0 ? 'Sem' : candidaturesAmount}
            </span>
            <span className="font-semibold">candidatura(s) nesta vaga</span>
          </span>
        </div>
        <div className="flex">
          <button className="m-1 ml-auto flex h-full w-28 transform items-center rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 px-2 text-xs font-bold text-white transition-transform duration-200 hover:scale-95 hover:bg-violet-700 hover:text-white">
            Ver candidatos
          </button>
        </div>
      </div>
    </div>
  )
}
