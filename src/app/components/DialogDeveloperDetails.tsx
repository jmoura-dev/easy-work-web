import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormChangeProfile } from './FormChangeProfile'

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
}

export function DialogDeveloperDetails({
  userName,
  about,
  available_for_contract,
  occupation_area,
  price_per_hour,
  techs,
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
          className="m-1 w-full transform rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 text-xs font-bold text-white transition-transform duration-200 hover:scale-95 hover:bg-violet-700 hover:text-white"
        >
          EDITAR PERFIL
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen animate-slideDownAndFade overflow-y-auto sm:rounded-none lg:max-w-3xl">
        <div className="mb-5 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <DialogHeader>
          <DialogTitle className="flex text-xl">Editar Perfil</DialogTitle>
          <DialogDescription>
            Faça alterações em seu perfil aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <FormChangeProfile
          userName={nameWithFirstLetterCapitalized}
          about={about}
          price_per_hour={price_per_hour}
          available_for_contract={available_for_contract}
          occupation_area={occupationAreaWithFirstLetterCapitalized}
          techs={techs}
        />
      </DialogContent>
    </Dialog>
  )
}
