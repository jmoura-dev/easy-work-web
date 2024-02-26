import { Banknote, Clock9, Hourglass, Laptop } from 'lucide-react'
import { JobDetail } from './JobDetail'
import { JobAlert } from './JobAlert'

export interface JobCardProps {
  title: string
  company: string
  wage: number
  created_at: Date
}

export function JobCard({ title, company, wage, created_at }: JobCardProps) {
  return (
    <div className="3xl:max-w-none m-auto flex w-full max-w-xl flex-col justify-evenly gap-2 rounded-lg border border-violet-800/60 bg-violet-200 p-3 shadow-md shadow-violet-400 lg:h-64 xl:h-72 2xl:h-80">
      <div className="mb-5 flex gap-6">
        <div className="flex h-12 w-full max-w-14 flex-col items-center justify-center rounded-md bg-violet-600/70 pb-1 font-mirza text-2xl font-bold text-zinc-300">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <div className="flex w-full flex-col divide-y divide-dashed divide-violet-500">
          <h1 className="font-mirza text-2xl font-bold text-zinc-800 xl:text-3xl">
            {title}
          </h1>
          <p className="flex w-full justify-center text-sm font-semibold text-zinc-700 xl:text-base">
            {company}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <JobDetail icon={Laptop} name="Remoto" />
          <JobDetail icon={Banknote} name={`R$:${wage}`} />
        </div>
        <div className="flex justify-between">
          <JobDetail icon={Hourglass} name="Tempo integral" />
          <JobDetail icon={Clock9} name="40 horas/semana" />
        </div>
      </div>

      <footer className="mt-5 flex items-center justify-between">
        <JobAlert />
        <span className="text-minimum font-bold text-green-700 xl:text-xs">
          CRIADO HÁ 6H ATRÁS
        </span>
      </footer>
    </div>
  )
}
