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
import { Banknote, Wallet } from 'lucide-react'
import { JobDetail } from './JobCard/JobDetail'

interface DialogDeveloperDetailsProps {
  userName: string
  about: string
  available_for_contract: boolean
  occupation_area: string
  price_per_hour?: number
  techs: {
    name: string
    id: string
  }[]
  // onClick: () => void
}

export function DialogDeveloperDetails({
  userName,
  about,
  available_for_contract,
  occupation_area,
  price_per_hour,
  techs,
  // onClick,
}: DialogDeveloperDetailsProps) {
  const nameWithFirstLetterCapitalized =
    userName.charAt(0).toUpperCase() + userName.slice(1)
  const occupationAreaWithFirstLetterCapitalized =
    occupation_area.charAt(0).toUpperCase() + occupation_area.slice(1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="m-1 transform rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 text-xs font-bold text-white transition-transform duration-200 hover:scale-95 hover:bg-violet-700 hover:text-white"
        >
          EDITAR PERFIL
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
            {nameWithFirstLetterCapitalized}
          </DialogTitle>
          <p className="flex w-full justify-center text-xs font-semibold text-zinc-700 xl:text-sm">
            {occupationAreaWithFirstLetterCapitalized}
          </p>
        </DialogHeader>
        <div className="flex flex-col space-y-4 divide-y divide-violet-600">
          <div className="flex justify-between">
            <JobDetail
              icon={Wallet}
              name={
                available_for_contract ? 'Freela/Contrato' : 'Apenas freelancer'
              }
            />
            <JobDetail
              icon={Banknote}
              name={`R$:${price_per_hour ? price_per_hour.toFixed(2) : 'Não informado'}/HR`}
            />
          </div>

          <div className="flex flex-col gap-2 pt-3 text-sm">
            <h2 className="text-base font-semibold text-black">Sobre</h2>
            {about}
          </div>
          <DialogFooter className="pt-6">
            {/* <JobAlert onClick={onClick} /> */}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
