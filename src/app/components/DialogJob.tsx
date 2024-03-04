import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { JobAlert } from './JobCard/JobAlert'
import { Laptop, Banknote, Hourglass, Clock9 } from 'lucide-react'
import { JobDetail } from './JobCard/JobDetail'

interface DialogJobProps {
  title: string
  company: string
  workMode: string
  workSchedule: string
  hoursPerWeek: number
  remuneration: number
  description: string
  created_at: Date
  onClick: () => void
}

export function DialogJob({
  title,
  company,
  workMode,
  workSchedule,
  hoursPerWeek,
  remuneration,
  description,
  onClick,
}: DialogJobProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="m-1 h-full transform rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 text-xs font-bold text-white transition-transform duration-200 hover:scale-95 hover:bg-violet-700 hover:text-white"
        >
          MAIS DETALHES
        </Button>
      </DialogTrigger>
      <DialogContent className="animate-slideDownAndFade">
        <div className="mb-5 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <DialogHeader className="mb-2 divide-y divide-dashed divide-violet-500">
          <DialogTitle className="flex justify-center text-xl">
            {title}
          </DialogTitle>
          <p className="flex w-full justify-center text-xs font-semibold text-zinc-700 xl:text-sm">
            {company}
          </p>
        </DialogHeader>
        <div className="flex flex-col space-y-4 divide-y divide-violet-600">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <JobDetail icon={Laptop} name={workMode} />
              <JobDetail icon={Banknote} name={`R$:${remuneration}`} />
            </div>
            <div className="flex justify-between">
              <JobDetail icon={Hourglass} name={workSchedule} />
              <JobDetail icon={Clock9} name={`${hoursPerWeek} horas/semana`} />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-3 text-sm">
            <h2 className="text-base font-semibold text-black">
              Descrição da vaga
            </h2>
            {description}
          </div>
          <DialogFooter className="pt-6">
            <JobAlert onClick={onClick} />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
