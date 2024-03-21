import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormChangeCompanyProfile } from './FormChangeCompanyProfile'

interface DialogCompanyDetailsProps {
  userName: string
  avatarUrl: string | null
  about: string
  state?: string
  city?: string
  site_url?: string
}

export function DialogCompanyDetails({
  userName,
  avatarUrl,
  about,
  state,
  city,
  site_url,
}: DialogCompanyDetailsProps) {
  const nameWithFirstLetterCapitalized =
    userName.charAt(0).toUpperCase() + userName.slice(1)

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
      <DialogContent className="max-h-screen animate-slideDownAndFade overflow-y-auto sm:rounded-none lg:max-h-[98%] lg:max-w-3xl">
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
        <FormChangeCompanyProfile
          userName={nameWithFirstLetterCapitalized}
          avatarUrl={avatarUrl}
          about={about}
          state={state}
          city={city}
          site_url={site_url}
        />
      </DialogContent>
    </Dialog>
  )
}
