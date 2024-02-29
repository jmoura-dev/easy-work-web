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
import { Card } from './UserCard'

interface DialogJobProps {
  name: string
  avatar_url?: string
  price_per_hour: number
  occupation_area: string
  available_for_contract: boolean
  techs: {
    id: string
    name: string
  }[]
}

export function DialogUser({
  name,
  avatar_url,
  price_per_hour,
  occupation_area,
  available_for_contract,
  techs,
}: DialogJobProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-full w-full bg-violet-200 hover:bg-violet-200"
        >
          <Card
            name={name}
            techs={techs}
            available_for_contract={available_for_contract}
            occupation_area={occupation_area}
            price_per_hour={price_per_hour}
          />
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
            {name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 divide-y divide-violet-600">
          <div className="flex flex-col gap-2 pt-3 text-sm">
            <h2 className="text-base font-semibold text-black">
              Descrição da vaga
            </h2>
          </div>
          <DialogFooter className="pt-6">
            <JobAlert />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
